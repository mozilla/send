import { Raven } from './common';
import FileReceiver from './fileReceiver';
import { bytes, notify, gcmCompliant } from './utils';
import Storage from './storage';
import * as links from './links';
import * as metrics from './metrics';
import * as progress from './progress';

const storage = new Storage();
function onUnload(size) {
  metrics.cancelledDownload({ size });
}

async function download() {
  const downloadBtn = document.getElementById('download-btn');
  const downloadPanel = document.getElementById('download-page-one');
  const progressPanel = document.getElementById('download-progress');
  const file = document.getElementById('dl-file');
  const size = Number(file.getAttribute('data-size'));
  const ttl = Number(file.getAttribute('data-ttl'));
  const unloadHandler = onUnload.bind(null, size);
  const startTime = Date.now();
  const fileReceiver = new FileReceiver(
    '/assets' + location.pathname.slice(0, -1),
    location.hash.slice(1)
  );

  downloadBtn.disabled = true;
  downloadPanel.hidden = true;
  progressPanel.hidden = false;
  metrics.startedDownload({ size, ttl });
  links.setOpenInNewTab(true);
  window.addEventListener('unload', unloadHandler);

  fileReceiver.on('progress', data => {
    progress.setProgress({ complete: data[0], total: data[1] });
  });

  let downloadEnd;
  fileReceiver.on('decrypting', () => {
    downloadEnd = Date.now();
    window.removeEventListener('unload', unloadHandler);
    fileReceiver.removeAllListeners('progress');
    document.l10n.formatValue('decryptingFile').then(progress.setText);
  });

  try {
    const file = await fileReceiver.download();
    const endTime = Date.now();
    const time = endTime - startTime;
    const downloadTime = endTime - downloadEnd;
    const speed = size / (downloadTime / 1000);

    links.setOpenInNewTab(false);
    storage.totalDownloads += 1;
    metrics.completedDownload({ size, time, speed });
    progress.setText(' ');
    document.l10n
      .formatValues('downloadNotification', 'downloadFinish')
      .then(translated => {
        notify(translated[0]);
        document.getElementById('dl-title').textContent = translated[1];
        document.querySelector('#download-progress .description').textContent =
          ' ';
      });
    const dataView = new DataView(file.plaintext);
    const blob = new Blob([dataView], { type: file.type });
    const downloadUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = downloadUrl;
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, file.name);
      return;
    }
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(downloadUrl);
  } catch (err) {
    metrics.stoppedDownload({ size, err });

    if (err.message === 'notfound') {
      location.reload();
    } else {
      progressPanel.hidden = true;
      downloadPanel.hidden = true;
      document.getElementById('upload-error').hidden = false;
    }
    Raven.captureException(err);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const file = document.getElementById('dl-file');
  const filename = file.getAttribute('data-filename');
  const b = Number(file.getAttribute('data-size'));
  const size = bytes(b);
  document.l10n.formatValue('downloadFileSize', { size }).then(str => {
    document.getElementById('dl-filesize').textContent = str;
  });
  document.l10n
    .formatValue('downloadingPageProgress', { filename, size })
    .then(str => {
      document.getElementById('dl-title').textContent = str;
    });

  gcmCompliant()
    .then(() => {
      document
        .getElementById('download-btn')
        .addEventListener('click', download);
    })
    .catch(err => {
      metrics.unsupported({ err }).then(() => {
        location.replace('/unsupported/gcm');
      });
    });
});
