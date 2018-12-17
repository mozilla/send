/* global DEFAULTS LIMITS */
import FileSender from './fileSender';
import FileReceiver from './fileReceiver';
import { copyToClipboard, delay, openLinksInNewTab, percent } from './utils';
import * as metrics from './metrics';
import Archive from './archive';
import { bytes } from './utils';
import okDialog from './ui/okDialog';
import copyDialog from './ui/copyDialog';

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

  emitter.on('render', () => {
    lastRender = Date.now();
  });

  emitter.on('login', email => {
    state.user.login(email);
  });

  emitter.on('logout', () => {
    state.user.logout();
    state.timeLimit = DEFAULTS.EXPIRE_SECONDS;
    state.downloadCount = 1;
    emitter.emit('pushState', '/');
  });

  emitter.on('changeLimit', async ({ file, value }) => {
    const ok = await file.changeLimit(value, state.user);
    if (!ok) {
      // TODO
      return;
    }
    state.storage.writeFile(file);
    metrics.changedDownloadLimit(file);
  });

  emitter.on('removeUpload', file => {
    state.archive.remove(file);
    if (state.archive.numFiles === 0) {
      state.archive = null;
    }
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
    render();
  });

  emitter.on('cancel', () => {
    state.transfer.cancel();
  });

  emitter.on('addFiles', async ({ files }) => {
    if (files.length < 1) {
      return;
    }
    const maxSize = state.user.maxSize;
    state.archive = state.archive || new Archive();
    try {
      state.archive.addFiles(files, maxSize);
    } catch (e) {
      state.modal = okDialog(
        state.translate(e.message, {
          size: bytes(maxSize),
          count: LIMITS.MAX_FILES_PER_ARCHIVE
        })
      );
      if (state.archive.numFiles === 0) {
        state.archive = null;
      }
    }
    render();
  });

  emitter.on('upload', async ({ type, dlimit, password }) => {
    if (!state.archive) return;
    if (state.storage.files.length >= LIMITS.MAX_ARCHIVES_PER_USER) {
      state.modal = okDialog(
        state.translate('tooManyArchives', {
          count: LIMITS.MAX_ARCHIVES_PER_USER
        })
      );
      return render();
    }
    const size = state.archive.size;
    if (!state.timeLimit) state.timeLimit = DEFAULTS.EXPIRE_SECONDS;
    const sender = new FileSender();

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

      const ownedFile = await sender.upload(
        state.archive,
        state.timeLimit,
        dlimit,
        state.user.bearerToken
      );
      ownedFile.type = type;
      state.storage.totalUploads += 1;
      metrics.completedUpload(ownedFile);

      state.storage.addFile(ownedFile);
      // TODO integrate password into /upload request
      if (password) {
        emitter.emit('password', { password, file: ownedFile });
      }
      state.modal = copyDialog(ownedFile.name, ownedFile.url);
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
      await state.user.syncFileList();
      openLinksInNewTab(links, false);
      state.archive = null;
      state.password = '';
      state.uploading = false;
      state.transfer = null;
      render();
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
      state.storage.totalDownloads += 1;
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
    // poll for updates of the upload list
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
