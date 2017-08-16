/* global MAXFILESIZE EXPIRE_SECONDS */
import { Raven } from './common';
import FileSender from './fileSender';
import {
  allowedCopy,
  bytes,
  copyToClipboard,
  notify,
  gcmCompliant,
  ONE_DAY_IN_MS
} from './utils';
import Storage from './storage';
import * as metrics from './metrics';
import * as progress from './progress';
import * as fileList from './fileList';

const storage = new Storage();

async function upload(event) {
  event.preventDefault();
  const pageOne = document.getElementById('page-one');
  const link = document.getElementById('link');
  const uploadWindow = document.querySelector('.upload-window');
  const uploadError = document.getElementById('upload-error');
  const uploadProgress = document.getElementById('upload-progress');
  const clickOrDrop = event.type === 'drop' ? 'drop' : 'click';

  // don't allow upload if not on upload page
  if (pageOne.hidden) {
    return;
  }

  storage.totalUploads += 1;

  let file = '';
  if (clickOrDrop === 'drop') {
    if (!event.originalEvent.dataTransfer.files[0]) {
      uploadWindow.classList.remove('ondrag');
      return;
    }
    if (
      event.originalEvent.dataTransfer.files.length > 1 ||
      event.originalEvent.dataTransfer.files[0].size === 0
    ) {
      uploadWindow.classList.remove('ondrag');
      document.l10n.formatValue('uploadPageMultipleFilesAlert').then(str => {
        alert(str);
      });
      return;
    }
    file = event.originalEvent.dataTransfer.files[0];
  } else {
    file = event.target.files[0];
  }

  if (file.size > MAXFILESIZE) {
    return document.l10n
      .formatValue('fileTooBig', { size: bytes(MAXFILESIZE) })
      .then(alert);
  }

  pageOne.hidden = true;
  uploadError.hidden = true;
  uploadProgress.hidden = false;
  document.l10n
    .formatValue('uploadingPageProgress', {
      size: bytes(file.size),
      filename: file.name
    })
    .then(str => {
      document.getElementById('upload-filename').textContent = str;
    });
  document.l10n.formatValue('importingFile').then(progress.setText);
  //don't allow drag and drop when not on page-one
  document.body.removeEventListener('drop', upload);

  const fileSender = new FileSender(file);
  document.getElementById('cancel-upload').addEventListener('click', () => {
    fileSender.cancel();
    metrics.cancelledUpload({
      size: file.size,
      type: clickOrDrop
    });
    location.reload();
  });

  let uploadStart;
  fileSender.on('progress', data => {
    uploadStart = uploadStart || Date.now();
    progress.setProgress({
      complete: data[0],
      total: data[1]
    });
  });

  fileSender.on('encrypting', () => {
    document.l10n.formatValue('encryptingFile').then(progress.setText);
  });

  let t;
  const startTime = Date.now();
  metrics.startedUpload({
    size: file.size,
    type: clickOrDrop
  });
  // For large files we need to give the ui a tick to breathe and update
  // before we kick off the FileSender
  setTimeout(() => {
    fileSender
      .upload()
      .then(info => {
        const endTime = Date.now();
        const time = endTime - startTime;
        const uploadTime = endTime - uploadStart;
        const speed = file.size / (uploadTime / 1000);
        const expiration = EXPIRE_SECONDS * 1000;

        link.setAttribute('value', `${info.url}#${info.secretKey}`);

        metrics.completedUpload({
          size: file.size,
          time,
          speed,
          type: clickOrDrop
        });

        const fileData = {
          name: file.name,
          size: file.size,
          fileId: info.fileId,
          url: info.url,
          secretKey: info.secretKey,
          deleteToken: info.deleteToken,
          creationDate: new Date(),
          expiry: expiration,
          totalTime: time,
          typeOfUpload: clickOrDrop,
          uploadSpeed: speed
        };

        document.getElementById('delete-file').addEventListener('click', () => {
          FileSender.delete(fileData.fileId, fileData.deleteToken).then(() => {
            const ttl =
              ONE_DAY_IN_MS - (Date.now() - fileData.creationDate.getTime());
            metrics
              .deletedUpload({
                size: fileData.size,
                time: fileData.totalTime,
                speed: fileData.uploadSpeed,
                type: fileData.typeOfUpload,
                location: 'success-screen',
                ttl
              })
              .then(() => {
                storage.remove(fileData.fileId);
                location.reload();
              });
          });
        });

        storage.addFile(info.fileId, fileData);

        pageOne.hidden = true;
        uploadProgress.hidden = true;
        uploadError.hidden = true;
        document.getElementById('share-link').hidden = false;

        fileList.addFile(fileData);
        document.l10n.formatValue('notifyUploadDone').then(str => {
          notify(str);
        });
      })
      .catch(err => {
        // err is 0 when coming from a cancel upload event
        if (err === 0) {
          return;
        }
        // only show error page when the error is anything other than user cancelling the upload
        Raven.captureException(err);
        pageOne.hidden = true;
        uploadProgress.hidden = true;
        uploadError.hidden = false;
        window.clearTimeout(t);

        metrics.stoppedUpload({
          size: file.size,
          type: clickOrDrop,
          err
        });
      });
  }, 10);
}

document.addEventListener('DOMContentLoaded', function() {
  gcmCompliant()
    .then(function() {
      const pageOne = document.getElementById('page-one');
      const copyBtn = document.getElementById('copy-btn');
      const link = document.getElementById('link');
      const uploadWindow = document.querySelector('.upload-window');

      pageOne.hidden = false;
      document.getElementById('file-upload').addEventListener('change', upload);

      document.body.addEventListener('dragover', allowDrop);
      document.body.addEventListener('drop', upload);

      // reset copy button
      copyBtn.disabled = !allowedCopy();
      copyBtn.setAttribute('data-l10n-id', 'copyUrlFormButton');

      link.disabled = false;

      // copy link to clipboard
      copyBtn.addEventListener('click', () => {
        if (allowedCopy() && copyToClipboard(link.getAttribute('value'))) {
          metrics.copiedLink({ location: 'success-screen' });

          //disable button for 3s
          copyBtn.disabled = true;
          link.disabled = true;
          copyBtn.innerHtml =
            '<img src="/resources/check-16.svg" class="icon-check"></img>';
          setTimeout(() => {
            copyBtn.disabled = !allowedCopy();
            copyBtn.setAttribute('data-l10n-id', 'copyUrlFormButton');
            link.disabled = false;
          }, 3000);
        }
      });

      uploadWindow.addEventListener('dragover', () =>
        uploadWindow.classList.add('ondrag')
      );
      uploadWindow.addEventListener('dragleave', () =>
        uploadWindow.classList.remove('ondrag')
      );

      // on file upload by browse or drag & drop

      function allowDrop(ev) {
        ev.preventDefault();
      }
    })
    .catch(err => {
      metrics.unsupported({ err }).then(() => {
        location.replace('/unsupported/gcm');
      });
    });
});
