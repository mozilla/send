const FileReceiver = require('./fileReceiver');
const { notify } = require('./utils');
const $ = require('jquery');
require('jquery-circle-progress');

const Raven = window.Raven;
$(document).ready(function() {
  $('#download-progress').hide();
  //link back to homepage
  $('.send-new').attr('href', window.location.origin);

  const filename = $('#dl-filename').html();

  //initiate progress bar
  $('#dl-progress').circleProgress({
    value: 0.0,
    startAngle: -Math.PI / 2,
    fill: '#00C8D7',
    size: 158
  });
  $('#download-btn').click(download);
  function download() {
    const fileReceiver = new FileReceiver();

    fileReceiver.on('progress', progress => {
      $('#download-page-one').hide();
      $('#download-progress').show();
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
                     })
      }
    });

    fileReceiver.on('decrypting', isStillDecrypting => {
      // The file is being decrypted
      if (isStillDecrypting) {
        console.log('Decrypting');
      } else {
        console.log('Done decrypting');
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

    fileReceiver
      .download()
      .catch(() => {
        document.l10n.formatValue('expiredPageHeader')
                     .then(translated => {
                       $('.title').text(translated);
                     })
        $('#download-btn').hide();
        $('#expired-img').show();
        console.log('The file has expired, or has already been deleted.');
        return;
      })
      .then(([decrypted, fname]) => {
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
