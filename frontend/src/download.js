const FileReceiver = require('./fileReceiver');
const { notify, findMetric } = require('./utils');
const $ = require('jquery');
require('jquery-circle-progress');

const Raven = window.Raven;

if (!localStorage.hasOwnProperty('totalDownloads')) {
  localStorage.setItem('totalDownloads', 0);
}

$(document).ready(function() {
  //link back to homepage
  $('.send-new').attr('href', window.location.origin);

  if (location.pathname.toString().includes('download')) {
    $('.send-new').click(function(target) {
      target.preventDefault();
      window.analytics
            .sendEvent('recipient', 'restarted', {
              cd2: 'completed'
            })
            .then(() => {
              location.href = target.currentTarget.href;
            });
    })


    $('.legal-links a, .social-links a, #dl-firefox').click(function(target) {
      target.preventDefault();
      let metric = findMetric(target.currentTarget.href);
      // record exited event by recipient
      window.analytics
            .sendEvent('recipient', 'exited', {
              cd3: metric
            })
            .then(() => {
              location.href = target.currentTarget.href;
            });
    })

    $('#expired-send-new').click(function() {
      localStorage.setItem('referrer', 'errored-download');
    })

  }

  const filename = $('#dl-filename').html();
  const bytelength = $('#dl-bytelength').html();
  const timeToExpiry = $('#dl-ttl').html();

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
    let totalDownloads = localStorage.getItem('totalDownloads');
    localStorage.setItem('totalDownloads', Number(totalDownloads) + 1);
    
    const fileReceiver = new FileReceiver();
    let unexpiredFiles = 0;

    for (let i = 0; i < localStorage.length; i++) {
      const id = localStorage.key(i);
      if (id != 'totalUploads' && 
          id != 'totalDownloads' &&
          id != 'referrer') {
          unexpiredFiles += 1;
      }
    }

    let totalUploads = 0;
    if (localStorage.hasOwnProperty('totalUploads')) {
      totalUploads = localStorage.getItem('totalUploads');
    }

    fileReceiver.on('progress', progress => {

      window.onunload = function() {
        localStorage.setItem('referrer', 'cancelled-download');
        // record download-stopped (cancelled by tab close or reload)
        window.analytics
              .sendEvent('recipient', 'download-stopped', {
                cm1: bytelength,
                cm5: totalUploads,
                cm6: unexpiredFiles,
                cm7: localStorage.getItem('totalDownloads'),
                cd2: 'cancelled'
              })
      }

      $('#download-page-one').attr('hidden', true);
      $('#download-progress').removeAttr('hidden');
      const percent = progress[0] / progress[1];
      // update progress bar
      $('#dl-progress').circleProgress('value', percent);
      $('.percent-number').html(`${Math.floor(percent * 100)}`);
      if (progress[1] < 1000000) {
        $('.progress-text').html(
          `${filename} (${(progress[0] / 1000).toFixed(1)}KB of
           ${(progress[1] / 1000).toFixed(1)}KB)`
        );
      } else if (progress[1] < 1000000000) {
        $('.progress-text').html(
          `${filename} (${(progress[0] / 1000000).toFixed(1)}MB of ${(progress[1] / 1000000).toFixed(1)}MB)`
        );
      } else {
        $('.progress-text').html(
          `${filename} (${(progress[0] / 1000000).toFixed(1)}MB of ${(progress[1] / 1000000000).toFixed(1)}GB)`
        );
      }
      //on complete
      if (percent === 1) {
        fileReceiver.removeAllListeners('progress');
        document.l10n.formatValues('downloadNotification', 'downloadFinish')
                     .then(translated => {
                       notify(translated[0]);
                       $('.title').html(translated[1]);
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
        downloadEnd = new Date().getTime();
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

    const startTime = new Date().getTime();

    // record download-started by recipient
    window.analytics
          .sendEvent('recipient', 'download-started', {
            cm1: bytelength,
            cm4: timeToExpiry,
            cm5: totalUploads,
            cm6: unexpiredFiles,
            cm7: localStorage.getItem('totalDownloads')
          });

    fileReceiver
      .download()
      .catch(err => {
        // record download-stopped (errored) by recipient
        window.analytics
              .sendEvent('recipient', 'download-stopped', {
                cm1: bytelength,
                cm5: totalUploads,
                cm6: unexpiredFiles,
                cm7: localStorage.getItem('totalDownloads'),
                cd2: 'errored',
                cd6: err
              });

        document.l10n.formatValue('expiredPageHeader')
                     .then(translated => {
                       $('.title').text(translated);
                     });
        $('#download-btn').attr('hidden', true);
        $('#expired-img').removeAttr('hidden');
        console.log('The file has expired, or has already been deleted.');
        return;
      })
      .then(([decrypted, fname]) => {
        const endTime = new Date().getTime();
        const totalTime = endTime - startTime;
        const downloadTime = endTime - downloadEnd;
        const downloadSpeed = bytelength / (downloadTime / 1000);

        localStorage.setItem('referrer', 'completed-download');
        // record download-stopped (completed) by recipient
        window.analytics
              .sendEvent('recipient', 'download-stopped', {
                cm1: bytelength,
                cm2: totalTime,
                cm3: downloadSpeed,
                cm5: totalUploads,
                cm6: unexpiredFiles,
                cm7: localStorage.getItem('totalDownloads'),
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
