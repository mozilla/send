/* global document, browser */

let first = true;

document.body.style.border = '5px solid red';
console.error('helloooooo');
const port = browser.runtime.connectBrowser();
port.onMessage.addListener(response => {
  if (first) {
    port.postMessage('we got the first message');
    first = false;
  }
  console.error(`Received: ${JSON.stringify(response)}`);
});
port.postMessage('Hello from WebExtension!');
