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
import $ from 'jquery/dist/jquery.slim';

const storage = new Storage();

$(() => {
  gcmCompliant()
    .then(function() {
      const $pageOne = $('#page-one');
      const $copyBtn = $('#copy-btn');
      const $link = $('#link');
      const $uploadWindow = $('.upload-window');
      const $uploadError = $('#upload-error');
      const $uploadProgress = $('#upload-progress');

      $pageOne.removeAttr('hidden');
      $('#file-upload').on('change', onUpload);

      $(document.body).on('dragover', allowDrop).on('drop', onUpload);

      // reset copy button
      $copyBtn.attr({
        disabled: !allowedCopy(),
        'data-l10n-id': 'copyUrlFormButton'
      });

      $link.attr('disabled', false);

      // copy link to clipboard
      $copyBtn.on('click', () => {
        if (allowedCopy() && copyToClipboard($link.attr('value'))) {
          metrics.copiedLink({ location: 'success-screen' });

          //disable button for 3s
          $copyBtn.attr('disabled', true);
          $link.attr('disabled', true);
          $copyBtn.html(
            '<img src="/resources/check-16.svg" class="icon-check"></img>'
          );
          setTimeout(() => {
            $copyBtn.attr({
              disabled: false,
              'data-l10n-id': 'copyUrlFormButton'
            });
            $link.attr('disabled', false);
          }, 3000);
        }
      });

      $uploadWindow
        .on('dragover', () => {
          $uploadWindow.addClass('ondrag');
        })
        .on('dragleave', () => {
          $uploadWindow.removeClass('ondrag');
        });

      // on file upload by browse or drag & drop
      function onUpload(event) {
        event.preventDefault();
        const clickOrDrop = event.type === 'drop' ? 'drop' : 'click';
        event.currentTarget.style.cursor = 'default';
        event.originalEvent.dataTransfer.effectAllowed = 'uninitialized';
        event.originalEvent.dataTransfer.dropEffect = 'all';
        // don't allow upload if not on upload page
        if ($pageOne.attr('hidden')) {
          return;
        }

        storage.totalUploads += 1;

        let file = '';
        if (clickOrDrop === 'drop') {
          if (!event.originalEvent.dataTransfer.files[0]) {
            $uploadWindow.removeClass('ondrag');
            return;
          }
          if (
            event.originalEvent.dataTransfer.files.length > 1 ||
            event.originalEvent.dataTransfer.files[0].size === 0
          ) {
            $uploadWindow.removeClass('ondrag');
            event.originalEvent.dataTransfer.dropEffect = 'none';
            event.currentTarget.style.cursor = 'no-drop';
            document.l10n
              .formatValue('uploadPageMultipleFilesAlert')
              .then(str => {
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

        $pageOne.attr('hidden', true);
        $uploadError.attr('hidden', true);
        $uploadProgress.removeAttr('hidden');
        document.l10n
          .formatValue('uploadingPageProgress', {
            size: bytes(file.size),
            filename: file.name
          })
          .then(str => {
            $('#upload-filename').text(str);
          });
        document.l10n.formatValue('importingFile').then(progress.setText);
        //don't allow drag and drop when not on page-one
        $(document.body).off('drop', onUpload);

        const fileSender = new FileSender(file);
        $('#cancel-upload').on('click', () => {
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

              $('#delete-file').on('click', () => {
                FileSender.delete(
                  fileData.fileId,
                  fileData.deleteToken
                ).then(() => {
                  const ttl =
                    ONE_DAY_IN_MS -
                    (Date.now() - fileData.creationDate.getTime());
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

              $pageOne.attr('hidden', true);
              $uploadProgress.attr('hidden', true);
              $uploadError.attr('hidden', true);
              $('#share-link').removeAttr('hidden');

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
              $pageOne.attr('hidden', true);
              $uploadProgress.attr('hidden', true);
              $uploadError.removeAttr('hidden');
              window.clearTimeout(t);

              metrics.stoppedUpload({
                size: file.size,
                type: clickOrDrop,
                err
              });
            });
        }, 10);
      }

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
