const { Raven } = require('./common');
const FileReceiver = require('./fileReceiver');
const { notify, gcmCompliant } = require('./utils');
const bytes = require('bytes');
const Storage = require('./storage');
const storage = new Storage(localStorage);
const links = require('./links');
const metrics = require('./metrics');

const $ = require('jquery');
require('jquery-circle-progress');

$(() => {
  gcmCompliant()
    .then(() => {
      const $downloadBtn = $('#download-btn');
      const $dlProgress = $('#dl-progress');
      const $progressText = $('.progress-text');
      const $title = $('.title');

      const filename = $('#dl-filename').text();
      const size = Number($('#dl-size').text());
      const ttl = Number($('#dl-ttl').text());

      //initiate progress bar
      $dlProgress.circleProgress({
        value: 0.0,
        startAngle: -Math.PI / 2,
        fill: '#3B9DFF',
        size: 158,
        animation: { duration: 300 }
      });

      const download = () => {
        // Disable the download button to avoid accidental double clicks.
        $downloadBtn.attr('disabled', 'disabled');
        links.setOpenInNewTab(true);

        const fileReceiver = new FileReceiver();

        fileReceiver.on('progress', progress => {
          window.onunload = function() {
            metrics.cancelledDownload({ size });
          };

          $('#download-page-one').attr('hidden', true);
          $('#download-progress').removeAttr('hidden');
          const percent = progress[0] / progress[1];
          // update progress bar
          $dlProgress.circleProgress('value', percent);
          $('.percent-number').text(`${Math.floor(percent * 100)}`);
          $progressText.text(
            `${filename} (${bytes(progress[0], {
              decimalPlaces: 1,
              fixedDecimals: true
            })} of ${bytes(progress[1], { decimalPlaces: 1 })})`
          );
        });

        let downloadEnd;
        fileReceiver.on('decrypting', isStillDecrypting => {
          // The file is being decrypted
          if (isStillDecrypting) {
            fileReceiver.removeAllListeners('progress');
            window.onunload = null;
            document.l10n.formatValue('decryptingFile').then(decryptingFile => {
              $progressText.text(decryptingFile);
            });
          } else {
            downloadEnd = Date.now();
          }
        });

        fileReceiver.on('hashing', isStillHashing => {
          // The file is being hashed to make sure a malicious user hasn't tampered with it
          if (isStillHashing) {
            document.l10n.formatValue('verifyingFile').then(verifyingFile => {
              $progressText.text(verifyingFile);
            });
          } else {
            $progressText.text(' ');
            document.l10n
              .formatValues('downloadNotification', 'downloadFinish')
              .then(translated => {
                notify(translated[0]);
                $title.text(translated[1]);
              });
          }
        });

        const startTime = Date.now();

        metrics.startedDownload({ size, ttl });

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
          .then(([decrypted, fname]) => {
            const endTime = Date.now();
            const time = endTime - startTime;
            const downloadTime = endTime - downloadEnd;
            const speed = size / (downloadTime / 1000);
            storage.totalDownloads += 1;
            metrics.completedDownload({ size, time, speed });

            const dataView = new DataView(decrypted);
            const blob = new Blob([dataView]);
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
          })
          .catch(err => {
            Raven.captureException(err);
            return Promise.reject(err);
          })
          .then(() => links.setOpenInNewTab(false));
      };

      $downloadBtn.on('click', download);
    })
    .catch(err => {
      metrics.unsupported({ err }).then(() => {
        location.replace('/unsupported/gcm');
      });
    });
});
