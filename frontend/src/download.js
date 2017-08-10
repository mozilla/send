import { Raven } from './common';
import FileReceiver from './fileReceiver';
import { bytes, notify, gcmCompliant } from './utils';
import Storage from './storage';
import * as links from './links';
import * as metrics from './metrics';
import * as progress from './progress';
import $ from 'jquery';

const storage = new Storage();
function onUnload(size) {
  metrics.cancelledDownload({ size });
}

function download() {
  const $downloadBtn = $('#download-btn');
  const $title = $('.title');
  const $file = $('#dl-file');
  const size = Number($file.attr('data-size'));
  const ttl = Number($file.attr('data-ttl'));
  const unloadHandler = onUnload.bind(null, size);
  const startTime = Date.now();
  const fileReceiver = new FileReceiver();

  $downloadBtn.attr('disabled', 'disabled');
  $('#download-page-one').attr('hidden', true);
  $('#download-progress').removeAttr('hidden');
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

  fileReceiver
    .download()
    .catch(err => {
      metrics.stoppedDownload({ size, err });

      if (err.message === 'notfound') {
        location.reload();
      } else {
        document.l10n.formatValue('errorPageHeader').then(translated => {
          $title.text(translated);
        });
        $downloadBtn.attr('hidden', true);
        $('#expired-img').removeAttr('hidden');
      }
      throw err;
    })
    .then(([decrypted, file]) => {
      const fname = file.name;
      const endTime = Date.now();
      const time = endTime - startTime;
      const downloadTime = endTime - downloadEnd;
      const speed = size / (downloadTime / 1000);
      storage.totalDownloads += 1;
      metrics.completedDownload({ size, time, speed });
      progress.setText(' ');
      document.l10n
        .formatValues('downloadNotification', 'downloadFinish')
        .then(translated => {
          notify(translated[0]);
          $title.text(translated[1]);
        });

      const dataView = new DataView(decrypted);
      const blob = new Blob([dataView], { type: file.type });
      const downloadUrl = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = downloadUrl;
      if (window.navigator.msSaveBlob) {
        // if we are in microsoft edge or IE
        window.navigator.msSaveBlob(blob, fname);
        return;
      }
      a.download = fname;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(downloadUrl);
    })
    .catch(err => {
      Raven.captureException(err);
      return Promise.reject(err);
    })
    .then(() => links.setOpenInNewTab(false));
}

$(() => {
  const $file = $('#dl-file');
  const filename = $file.attr('data-filename');
  const b = Number($file.attr('data-size'));
  const size = bytes(b);
  document.l10n
    .formatValue('downloadFileSize', { size })
    .then(str => $('#dl-filesize').text(str));
  document.l10n
    .formatValue('downloadingPageProgress', { filename, size })
    .then(str => $('#dl-title').text(str));

  gcmCompliant()
    .then(() => {
      $('#download-btn').on('click', download);
    })
    .catch(err => {
      metrics.unsupported({ err }).then(() => {
        location.replace('/unsupported/gcm');
      });
    });
});
