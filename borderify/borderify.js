/* global document, browser */

document.body.style.border = '5px solid red';
console.error('helloooooo');
const port = browser.runtime.connectBrowser();
port.onMessage.addListener(response => {
  console.error(`Received: ${JSON.stringify(response)}`);
});
port.postMessage('Hello from WebExtension!');
