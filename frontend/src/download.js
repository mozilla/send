const FileReceiver = require('./fileReceiver');
const { notify } = require('./utils');
const $ = require('jquery');
require('jquery-circle-progress');

const Raven = window.Raven;

$(document).ready(function() {
  $('#download-progress').hide();
  $('.send-new').click(() => {
    window.location.replace(`${window.location.origin}`);
  });
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
    const name = document.createElement('p');

    fileReceiver.on('progress', progress => {
      $('#download-page-one').hide();
      $('#download-progress').show();
      const percent = progress[0] / progress[1];
      // update progress bar
      $('#dl-progress').circleProgress('value', percent);
      $('.percent-number').html(`${Math.floor(percent * 100)}`);
      $('.progress-text').append(
        ` (${(progress[0] / 1000000).toFixed(2)}MB of ${(progress[1] /
          1000000).toFixed(2)}MB)`
      );
      //on complete
      if (percent === 1) {
        fileReceiver.removeAllListeners('progress');
        notify('Your download has finished.');
        $('.title').html('Download Complete');
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
        $('.title').text(
          'This link has expired or never existed in the first place.'
        );
        $('#download-btn').hide();
        $('#expired-img').show();
        console.log('The file has expired, or has already been deleted.');
        return;
      })
      .then(([decrypted, fname]) => {
        name.innerText = fname;
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
