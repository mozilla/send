require('./common');
const FileReceiver = require('./fileReceiver');
const { notify, findMetric, gcmCompliant, sendEvent } = require('./utils');
const bytes = require('bytes');
const Storage = require('./storage');
const storage = new Storage(localStorage);

const $ = require('jquery');
require('jquery-circle-progress');

const Raven = window.Raven;

$(document).ready(function() {
  gcmCompliant().catch(err => {
    $('#download').attr('hidden', true);
    sendEvent('recipient', 'unsupported', {
      cd6: err
    }).then(() => {
      location.replace('/unsupported');
    });
  });
  //link back to homepage
  $('.send-new').attr('href', window.location.origin);

  $('.send-new').click(function(target) {
    target.preventDefault();
    sendEvent('recipient', 'restarted', {
      cd2: 'completed'
    }).then(() => {
      location.href = target.currentTarget.href;
    });
  });

  $('.legal-links a, .social-links a, #dl-firefox').click(function(target) {
    target.preventDefault();
    const metric = findMetric(target.currentTarget.href);
    // record exited event by recipient
    sendEvent('recipient', 'exited', {
      cd3: metric
    }).then(() => {
      location.href = target.currentTarget.href;
    });
  });

  $('#expired-send-new').click(function() {
    storage.referrer = 'errored-download';
  });

  const filename = $('#dl-filename').text();
  const bytelength = Number($('#dl-bytelength').text());
  const timeToExpiry = Number($('#dl-ttl').text());

  //initiate progress bar
  $('#dl-progress').circleProgress({
    value: 0.0,
    startAngle: -Math.PI / 2,
    fill: '#00C8D7',
    size: 158,
    animation: { duration: 300 }
  });
  $('#download-btn').click(download);
  function download() {
    storage.totalDownloads += 1;

    const fileReceiver = new FileReceiver();
    const unexpiredFiles = storage.numFiles;

    fileReceiver.on('progress', progress => {
      window.onunload = function() {
        storage.referrer = 'cancelled-download';
        // record download-stopped (cancelled by tab close or reload)
        sendEvent('recipient', 'download-stopped', {
          cm1: bytelength,
          cm5: storage.totalUploads,
          cm6: unexpiredFiles,
          cm7: storage.totalDownloads,
          cd2: 'cancelled'
        });
      };

      $('#download-page-one').attr('hidden', true);
      $('#download-progress').removeAttr('hidden');
      const percent = progress[0] / progress[1];
      // update progress bar
      $('#dl-progress').circleProgress('value', percent);
      $('.percent-number').text(`${Math.floor(percent * 100)}`);
      $('.progress-text').text(
        `${filename} (${bytes(progress[0], {
          decimalPlaces: 1,
          fixedDecimals: true
        })} of ${bytes(progress[1], { decimalPlaces: 1 })})`
      );
      //on complete
      if (percent === 1) {
        fileReceiver.removeAllListeners('progress');
        document.l10n
          .formatValues('downloadNotification', 'downloadFinish')
          .then(translated => {
            notify(translated[0]);
            $('.title').text(translated[1]);
          });
        window.onunload = null;
      }
    });

    let downloadEnd;
    fileReceiver.on('decrypting', isStillDecrypting => {
      // The file is being decrypted
      if (isStillDecrypting) {
        console.log('Decrypting');
      } else {
        console.log('Done decrypting');
        downloadEnd = Date.now();
      }
    });

    fileReceiver.on('hashing', isStillHashing => {
      // The file is being hashed to make sure a malicious user hasn't tampered with it
      if (isStillHashing) {
        console.log('Checking file integrity');
      } else {
        console.log('Integrity check done');
      }
    });

    const startTime = Date.now();

    // record download-started by recipient
    sendEvent('recipient', 'download-started', {
      cm1: bytelength,
      cm4: timeToExpiry,
      cm5: storage.totalUploads,
      cm6: unexpiredFiles,
      cm7: storage.totalDownloads
    });

    fileReceiver
      .download()
      .catch(err => {
        // record download-stopped (errored) by recipient
        sendEvent('recipient', 'download-stopped', {
          cm1: bytelength,
          cm5: storage.totalUploads,
          cm6: unexpiredFiles,
          cm7: storage.totalDownloads,
          cd2: 'errored',
          cd6: err
        });

        document.l10n.formatValue('expiredPageHeader').then(translated => {
          $('.title').text(translated);
        });
        $('#download-btn').attr('hidden', true);
        $('#expired-img').removeAttr('hidden');
        console.log('The file has expired, or has already been deleted.');
        return;
      })
      .then(([decrypted, fname]) => {
        const endTime = Date.now();
        const totalTime = endTime - startTime;
        const downloadTime = endTime - downloadEnd;
        const downloadSpeed = bytelength / (downloadTime / 1000);

        storage.referrer = 'completed-download';
        // record download-stopped (completed) by recipient
        sendEvent('recipient', 'download-stopped', {
          cm1: bytelength,
          cm2: totalTime,
          cm3: downloadSpeed,
          cm5: storage.totalUploads,
          cm6: unexpiredFiles,
          cm7: storage.totalDownloads,
          cd2: 'completed'
        });

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
      });
  }
});
