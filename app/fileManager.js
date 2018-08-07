/* global DEFAULTS LIMITS */
import FileSender from './fileSender';
import FileReceiver from './fileReceiver';
import { copyToClipboard, delay, openLinksInNewTab, percent } from './utils';
import * as metrics from './metrics';
import Archive from './archive';
import { bytes } from './utils';
import { prepareWrapKey } from './fxa';

export default function(state, emitter) {
  let lastRender = 0;
  let updateTitle = false;

  function render() {
    emitter.emit('render');
  }

  async function checkFiles() {
    const changes = await state.user.syncFileList();
    const rerender = changes.incoming || changes.downloadCount;
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

  emitter.on('login', async () => {
    const k = await prepareWrapKey(state.storage);
    location.assign(`/api/fxa/login?keys_jwk=${k}`);
  });

  emitter.on('logout', () => {
    state.user.logout();
    render();
  });

  emitter.on('changeLimit', async ({ file, value }) => {
    await file.changeLimit(value);
    state.storage.writeFile(file);
    metrics.changedDownloadLimit(file);
  });

  emitter.on('removeUpload', async ({ index }) => {
    state.archive.remove(index);
    render();
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
      await file.del();
    } catch (e) {
      state.raven.captureException(e);
    }
  });

  emitter.on('cancel', () => {
    state.transfer.cancel();
  });

  emitter.on('addFiles', async ({ files }) => {
    const maxSize = state.user.maxSize;
    state.archive = state.archive || new Archive();
    try {
      state.archive.addFiles(files, maxSize);
    } catch (e) {
      alert(
        state.translate(e.message, {
          size: bytes(maxSize),
          count: LIMITS.MAX_FILES_PER_ARCHIVE
        })
      );
    }
    render();
  });

  emitter.on('upload', async ({ type, dlCount, password }) => {
    if (!state.archive) return;
    if (state.storage.files.length >= LIMITS.MAX_ARCHIVES_PER_USER) {
      return alert(
        state.translate('tooManyArchives', {
          count: LIMITS.MAX_ARCHIVES_PER_USER
        })
      );
    }
    const size = state.archive.size;
    if (!state.timeLimit) state.timeLimit = DEFAULTS.EXPIRE_SECONDS;
    const sender = new FileSender(
      state.archive,
      state.timeLimit,
      state.user.bearerToken
    );

    sender.on('progress', updateProgress);
    sender.on('encrypting', render);
    sender.on('complete', render);
    state.transfer = sender;
    state.uploading = true;
    render();

    const links = openLinksInNewTab();
    await delay(200);
    try {
      metrics.startedUpload({ size, type });

      const ownedFile = await sender.upload();
      ownedFile.type = type;
      state.storage.totalUploads += 1;
      metrics.completedUpload(ownedFile);

      state.storage.addFile(ownedFile);
      if (password) {
        emitter.emit('password', { password, file: ownedFile });
      }
      emitter.emit('changeLimit', { file: ownedFile, value: dlCount });

      const cancelBtn = document.getElementById('cancel-upload');
      if (cancelBtn) {
        cancelBtn.hidden = 'hidden';
      }
      if (document.querySelector('.page')) {
        await delay(1000);
      }
      emitter.emit('pushState', `/share/${ownedFile.id}`);
    } catch (err) {
      if (err.message === '0') {
        //cancelled. do nothing
        metrics.cancelledUpload({ size, type });
        render();
      } else {
        // eslint-disable-next-line no-console
        console.error(err);
        state.raven.captureException(err);
        metrics.stoppedUpload({ size, type, err });
        emitter.emit('pushState', '/error');
      }
    } finally {
      openLinksInNewTab(links, false);
      state.archive = null;
      state.password = '';
      state.uploading = false;
      state.transfer = null;
    }
  });

  emitter.on('password', async ({ password, file }) => {
    try {
      state.settingPassword = true;
      render();
      await file.setPassword(password);
      state.storage.writeFile(file);
      metrics.addedPassword({ size: file.size });
      await delay(1000);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      state.passwordSetError = err;
    } finally {
      state.settingPassword = false;
    }
    render();
  });

  emitter.on('getMetadata', async () => {
    const file = state.fileInfo;

    const receiver = new FileReceiver(file);
    try {
      await receiver.getMetadata();
      state.transfer = receiver;
    } catch (e) {
      if (e.message === '401' || e.message === '404') {
        file.password = null;
        if (!file.requiresPassword) {
          return emitter.emit('pushState', '/404');
        }
      }
    }

    render();
  });

  emitter.on('download', async file => {
    state.transfer.on('progress', updateProgress);
    state.transfer.on('decrypting', render);
    state.transfer.on('complete', render);
    const links = openLinksInNewTab();
    const size = file.size;
    try {
      const start = Date.now();
      metrics.startedDownload({ size: file.size, ttl: file.ttl });
      const dl = state.transfer.download({
        stream: state.capabilities.streamDownload
      });
      render();
      await dl;
      const time = Date.now() - start;
      const speed = size / (time / 1000);
      if (document.querySelector('.page')) {
        await delay(1000);
      }
      state.storage.totalDownloads += 1;
      state.transfer.reset();
      metrics.completedDownload({ size, time, speed });
    } catch (err) {
      if (err.message === '0') {
        // download cancelled
        state.transfer.reset();
        render();
      } else {
        // eslint-disable-next-line no-console
        console.error(err);
        state.transfer = null;
        const location = err.message === '404' ? '/404' : '/error';
        if (location === '/error') {
          state.raven.captureException(err);
          metrics.stoppedDownload({ size, err });
        }
        emitter.emit('pushState', location);
      }
    } finally {
      openLinksInNewTab(links, false);
    }
  });

  emitter.on('copy', ({ url, location }) => {
    copyToClipboard(url);
    metrics.copiedLink({ location });
  });

  setInterval(() => {
    // poll for updates of the download counts
    // TODO something for the share page: || state.route === '/share/:id'
    if (state.route === '/') {
      checkFiles();
    }
  }, 2 * 60 * 1000);

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
