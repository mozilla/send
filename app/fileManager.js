/* global EXPIRE_SECONDS */
import FileSender from './fileSender';
import FileReceiver from './fileReceiver';
import { copyToClipboard, delay, fadeOut, percent } from './utils';
import * as metrics from './metrics';

function saveFile(file) {
  const dataView = new DataView(file.plaintext);
  const blob = new Blob([dataView], { type: file.type });
  const downloadUrl = URL.createObjectURL(blob);

  if (window.navigator.msSaveBlob) {
    return window.navigator.msSaveBlob(blob, file.name);
  }
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(downloadUrl);
}

function openLinksInNewTab(links, should = true) {
  links = links || Array.from(document.querySelectorAll('a:not([target])'));
  if (should) {
    links.forEach(l => {
      l.setAttribute('target', '_blank');
      l.setAttribute('rel', 'noopener noreferrer');
    });
  } else {
    links.forEach(l => {
      l.removeAttribute('target');
      l.removeAttribute('rel');
    });
  }
  return links;
}

function exists(id) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
        resolve(xhr.status === 200);
      }
    };
    xhr.onerror = () => resolve(false);
    xhr.ontimeout = () => resolve(false);
    xhr.open('get', '/api/exists/' + id);
    xhr.timeout = 2000;
    xhr.send();
  });
}

export default function(state, emitter) {
  let lastRender = 0;
  let updateTitle = false;

  function render() {
    emitter.emit('render');
  }

  async function checkFiles() {
    const files = state.storage.files;
    let rerender = false;
    for (const file of files) {
      const ok = await exists(file.id);
      if (!ok) {
        state.storage.remove(file.id);
        rerender = true;
      }
    }
    if (rerender) {
      render();
    }
  }

  function updateProgress() {
    if (updateTitle) {
      emitter.emit('DOMTitleChange', percent(state.transfer.progressRatio));
    }
    render();
  }

  emitter.on('DOMContentLoaded', () => {
    document.addEventListener('blur', () => (updateTitle = true));
    document.addEventListener('focus', () => {
      updateTitle = false;
      emitter.emit('DOMTitleChange', 'Firefox Send');
    });
    checkFiles();
  });

  emitter.on('navigate', checkFiles);

  emitter.on('render', () => {
    lastRender = Date.now();
  });

  emitter.on('changeLimit', async ({ file, value }) => {
    await FileSender.changeLimit(file.id, file.ownerToken, value);
    file.dlimit = value;
    state.storage.writeFiles();
    metrics.changedDownloadLimit(file);
  });

  emitter.on('delete', async ({ file, location }) => {
    try {
      metrics.deletedUpload({
        size: file.size,
        time: file.time,
        speed: file.speed,
        type: file.type,
        ttl: file.expiresAt - Date.now(),
        location
      });
      state.storage.remove(file.id);
      await FileSender.delete(file.id, file.ownerToken);
    } catch (e) {
      state.raven.captureException(e);
    }
    state.fileInfo = null;
  });

  emitter.on('cancel', () => {
    state.transfer.cancel();
  });

  emitter.on('upload', async ({ file, type }) => {
    const size = file.size;
    const sender = new FileSender(file);
    sender.on('progress', updateProgress);
    sender.on('encrypting', render);
    state.transfer = sender;
    render();
    const links = openLinksInNewTab();
    await delay(200);
    try {
      const start = Date.now();
      metrics.startedUpload({ size, type });
      const info = await sender.upload();
      const time = Date.now() - start;
      const speed = size / (time / 1000);
      metrics.completedUpload({ size, time, speed, type });
      document.getElementById('cancel-upload').hidden = 'hidden';
      await delay(1000);
      await fadeOut('upload-progress');
      info.name = file.name;
      info.size = size;
      info.type = type;
      info.time = time;
      info.speed = speed;
      info.createdAt = Date.now();
      info.url = `${info.url}#${info.secretKey}`;
      info.expiresAt = Date.now() + EXPIRE_SECONDS * 1000;
      state.fileInfo = info;
      state.storage.addFile(state.fileInfo);
      openLinksInNewTab(links, false);
      state.transfer = null;
      state.storage.totalUploads += 1;
      emitter.emit('pushState', `/share/${info.id}`);
    } catch (err) {
      console.error(err);
      state.transfer = null;
      if (err.message === '0') {
        //cancelled. do nothing
        metrics.cancelledUpload({ size, type });
        return render();
      }
      state.raven.captureException(err);
      metrics.stoppedUpload({ size, type, err });
      emitter.emit('pushState', '/error');
    }
  });

  emitter.on('password', async ({ existingPassword, password, file }) => {
    try {
      await FileSender.setPassword(existingPassword, password, file);
      metrics.addedPassword({ size: file.size });
      file.password = password;
      state.storage.writeFiles();
    } catch (e) {
      console.error(e);
    }
    render();
  });

  emitter.on('preview', async () => {
    const file = state.fileInfo;
    const url = `/api/download/${file.id}`;
    const receiver = new FileReceiver(url, file);
    receiver.on('progress', updateProgress);
    receiver.on('decrypting', render);
    state.transfer = receiver;
    try {
      await receiver.getMetadata(file.nonce);
    } catch (e) {
      if (e.message === '401') {
        file.password = null;
        if (!file.pwd) {
          return emitter.emit('pushState', '/404');
        }
      }
    }
    render();
  });

  emitter.on('download', async file => {
    state.transfer.on('progress', render);
    state.transfer.on('decrypting', render);
    const links = openLinksInNewTab();
    const size = file.size;
    try {
      const start = Date.now();
      metrics.startedDownload({ size: file.size, ttl: file.ttl });
      const f = await state.transfer.download(file.nonce);
      const time = Date.now() - start;
      const speed = size / (time / 1000);
      await delay(1000);
      await fadeOut('download-progress');
      saveFile(f);
      state.storage.totalDownloads += 1;
      state.transfer = null;
      metrics.completedDownload({ size, time, speed });
      emitter.emit('pushState', '/completed');
    } catch (err) {
      console.error(err);
      // TODO cancelled download
      const location = err.message === 'notfound' ? '/404' : '/error';
      if (location === '/error') {
        state.raven.captureException(err);
        metrics.stoppedDownload({ size, err });
      }
      emitter.emit('pushState', location);
    } finally {
      state.transfer = null;
      openLinksInNewTab(links, false);
    }
  });

  emitter.on('copy', ({ url, location }) => {
    copyToClipboard(url);
    metrics.copiedLink({ location });
  });

  setInterval(() => {
    // poll for rerendering the file list countdown timers
    if (
      state.route === '/' &&
      state.storage.files.length > 0 &&
      Date.now() - lastRender > 30000
    ) {
      render();
    }
  }, 60000);
}
