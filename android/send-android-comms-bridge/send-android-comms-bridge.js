/* global window, document, browser */

let first = true;

document.body.style.border = '5px solid red';
window.beginOAuthFlow = function() {
  console.error('BEGINOUAUTH FLOW');
  port.postMessage({ cmd: 'beginOAuthFlow' });
};

window.shareUrl = function(url) {
  console.error('SHAREURL');
  port.postMessage({ cmd: 'shareUrl', url });
};

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
  console.error(`Received: ${JSON.stringify(response)}`);
});
