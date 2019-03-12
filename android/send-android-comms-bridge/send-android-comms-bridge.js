/* global window, document, browser */

let first = true;

document.body.style.border = '5px solid red';
console.error('helloooooo');
const port = browser.runtime.connectBrowser();
port.onMessage.addListener(response => {
  if (first) {
    port.postMessage('we got the first message');
    first = false;
  }
  if (response.cmd === 'finishLogin') {
    window.finishLogin(response.accountInfo);
  }
  if (response.cmd === 'checkFiles') {
    //const upl = document.getElementById('file-upload');
    //upl.blur();
    //const newFiles = Array.from(upl.files);
    //console.error(`new files length ${newFiles.length}`);
    //if (newFiles.length) {
    //  emit('addFiles', { files: newFiles });
    //}
  }
  console.error(`Received: ${JSON.stringify(response)}`);
});

port.postMessage('Hello from WebExtension!');

window.beginOAuthFlow = function() {
  port.postMessage({ cmd: 'beginOAuthFlow' });
};

window.shareUrl = function(url) {
  port.postMessage({ cmd: 'shareUrl', url });
};
