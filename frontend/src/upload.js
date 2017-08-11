/* global MAXFILESIZE EXPIRE_SECONDS */
import { Raven } from './common';
import FileSender from './fileSender';
import {
  bytes,
  copyToClipboard,
  notify,
  gcmCompliant,
  ONE_DAY_IN_MS
} from './utils';
import Storage from './storage';
import * as metrics from './metrics';
import * as progress from './progress';
import $ from 'jquery';

const storage = new Storage();

const allowedCopy = () => {
  const support = !!document.queryCommandSupported;
  return support ? document.queryCommandSupported('copy') : false;
};

$(() => {
  gcmCompliant()
    .then(function() {
      const $pageOne = $('#page-one');
      const $copyBtn = $('#copy-btn');
      const $link = $('#link');
      const $uploadWindow = $('.upload-window');
      const $uploadError = $('#upload-error');
      const $uploadProgress = $('#upload-progress');
      const $fileList = $('#file-list');

      $pageOne.removeAttr('hidden');
      $('#file-upload').on('change', onUpload);

      $(document.body).on('dragover', allowDrop).on('drop', onUpload);

      // reset copy button
      $copyBtn.attr({
        disabled: !allowedCopy(),
        'data-l10n-id': 'copyUrlFormButton'
      });

      $link.attr('disabled', false);

      const toggleHeader = () => {
        //hide table header if empty list
        if (document.querySelector('tbody').childNodes.length === 1) {
          $fileList.attr('hidden', true);
        } else {
          $fileList.removeAttr('hidden');
        }
      };

      const files = storage.files;
      if (files.length === 0) {
        toggleHeader();
      } else {
        // eslint-disable-next-line prefer-const
        for (let index in files) {
          const id = files[index].fileId;
          //check if file still exists before adding to list
          checkExistence(id, files[index], true);
        }
      }

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

              populateFileList(fileData);
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

      function checkExistence(id, file, populate) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              if (populate) {
                populateFileList(file);
              }
            } else if (xhr.status === 404) {
              storage.remove(id);
              if (storage.numFiles === 0) {
                toggleHeader();
              }
            }
          }
        };
        xhr.open('get', '/exists/' + id, true);
        xhr.send();
      }

      //update file table with current files in storage
      const populateFileList = file => {
        const row = document.createElement('tr');
        const name = document.createElement('td');
        const link = document.createElement('td');
        const $copyIcon = $('<img>', {
          src: '/resources/copy-16.svg',
          class: 'icon-copy',
          'data-l10n-id': 'copyUrlHover',
          disabled: !allowedCopy()
        });
        const expiry = document.createElement('td');
        const del = document.createElement('td');
        const $delIcon = $('<img>', {
          src: '/resources/close-16.svg',
          class: 'icon-delete',
          'data-l10n-id': 'deleteButtonHover'
        });
        const popupDiv = document.createElement('div');
        const $popupText = $('<div>', { class: 'popuptext' });
        const cellText = document.createTextNode(file.name);

        const url = file.url.trim() + `#${file.secretKey}`.trim();

        $link.attr('value', url);
        $('#copy-text')
          .attr('data-l10n-args', JSON.stringify({ filename: file.name }))
          .attr('data-l10n-id', 'copyUrlFormLabelWithName');

        $popupText.attr('tabindex', '-1');

        name.appendChild(cellText);

        // create delete button

        const delSpan = document.createElement('span');
        $(delSpan)
          .addClass('icon-cancel-1')
          .attr('data-l10n-id', 'deleteButtonHover');
        del.appendChild(delSpan);

        const linkSpan = document.createElement('span');
        $(linkSpan).addClass('icon-docs').attr('data-l10n-id', 'copyUrlHover');

        link.appendChild(linkSpan);
        link.style.color = '#0A8DFF';

        //copy link to clipboard when icon clicked
        $copyIcon.on('click', () => {
          // record copied event from upload list
          metrics.copiedLink({ location: 'upload-list' });
          copyToClipboard(url);
          document.l10n.formatValue('copiedUrl').then(translated => {
            link.innerHTML = translated;
          });
          setTimeout(() => {
            const linkImg = document.createElement('img');
            $(linkImg)
              .addClass('icon-copy')
              .attr('data-l10n-id', 'copyUrlHover')
              .attr('src', '/resources/copy-16.svg');

            $(link).html(linkImg);
          }, 500);
        });

        file.creationDate = new Date(file.creationDate);

        const future = new Date();
        future.setTime(file.creationDate.getTime() + file.expiry);

        let countdown = 0;
        countdown = future.getTime() - Date.now();
        let minutes = Math.floor(countdown / 1000 / 60);
        let hours = Math.floor(minutes / 60);
        let seconds = Math.floor(countdown / 1000 % 60);

        const poll = () => {
          countdown = future.getTime() - Date.now();
          minutes = Math.floor(countdown / 1000 / 60);
          hours = Math.floor(minutes / 60);
          seconds = Math.floor(countdown / 1000 % 60);
          let t;

          if (hours >= 1) {
            expiry.innerHTML = hours + 'h ' + minutes % 60 + 'm';
            t = setTimeout(() => {
              poll();
            }, 60000);
          } else if (hours === 0) {
            expiry.innerHTML = minutes + 'm ' + seconds + 's';
            t = window.setTimeout(() => {
              poll();
            }, 1000);
          }
          //remove from list when expired
          if (countdown <= 0) {
            storage.remove(file.fileId);
            $(expiry).parents('tr').remove();
            window.clearTimeout(t);
            toggleHeader();
          }
        };

        poll();

        // create popup
        popupDiv.classList.add('popup');
        const $popupMessage = $('<div>', { class: 'popup-message' });
        $popupMessage.attr('data-l10n-id', 'deletePopupText');
        const $popupAction = $('<div>', { class: 'popup-action' });
        const $popupNvmSpan = $('<span>', { class: 'popup-no' });
        $popupNvmSpan.attr('data-l10n-id', 'deletePopupCancel');
        const $popupDelSpan = $('<span>', { class: 'popup-yes' });
        $popupDelSpan.attr('data-l10n-id', 'deletePopupYes');

        $popupText.html([$popupMessage, $popupAction]);
        $popupAction.html([$popupNvmSpan, $popupDelSpan]);

        // add data cells to table row
        row.appendChild(name);
        $(link).append($copyIcon);
        row.appendChild(link);
        row.appendChild(expiry);
        $(popupDiv).append($popupText);
        $(del).append($delIcon);
        del.appendChild(popupDiv);
        row.appendChild(del);
        $('tbody').append(row); //add row to table

        // delete file
        $popupText.find('.popup-yes').on('click', e => {
          FileSender.delete(file.fileId, file.deleteToken).then(() => {
            $(e.target).parents('tr').remove();
            const ttl =
              ONE_DAY_IN_MS - (Date.now() - file.creationDate.getTime());
            metrics
              .deletedUpload({
                size: file.size,
                time: file.totalTime,
                speed: file.uploadSpeed,
                type: file.typeOfUpload,
                location: 'upload-list',
                ttl
              })
              .then(() => {
                storage.remove(file.fileId);
              });
            toggleHeader();
          });
        });

        // show popup
        $delIcon.on('click', () => {
          $popupText.addClass('show').focus();
        });

        // hide popup
        $popupText.find('.popup-no').on('click', e => {
          e.stopPropagation();
          $popupText.removeClass('show');
        });

        $popupText.on('click', e => {
          e.stopPropagation();
        });

        //close when popup loses focus
        $popupText.on('blur', () => {
          $popupText.removeClass('show');
        });

        toggleHeader();
      };
    })
    .catch(err => {
      metrics.unsupported({ err }).then(() => {
        location.replace('/unsupported/gcm');
      });
    });
});
