const html = require('choo/html');
const assets = require('../common/assets');
const initScript = require('./initScript');

module.exports = function(state, body = '') {
  return html`
    <!DOCTYPE html>
    <html lang="${state.locale}">
      <head>
        <title>Factual SendPass</title>
        <base href="/" />
        <meta name="robots" content="${state.robots},noarchive" />
        <meta name="google" content="nositelinkssearchbox" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" content="Factual SendPass" />
        <meta name="twitter:title" content="Factual SendPass" />
        <meta name="description" content="Factual Re-branded of Firefox Send" />
        <meta property="og:description" content="Factual Re-branded of Firefox Send" />
        <meta name="twitter:description" content="Factual Re-branded of Firefox Send" />
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:image"
          content="https://www.factual.com/wp-content/uploads/2018/01/FB_metadata_image.png"
        />
        <meta
          name="twitter:image"
          content="http://factualinc.wpengine.com/wp-content/uploads/2017/09/twitter_metadata_image.png"
        />
        <meta property="og:url" content="${state.baseUrl}" />
        <meta name="theme-color" content="#220033" />
        <meta name="msapplication-TileColor" content="#220033" />

        <link rel="manifest" href="/app.webmanifest" />
        <link rel="stylesheet" type="text/css" href="/inter.css" />
        <link
          rel="stylesheet"
          type="text/css"
          href="${assets.get('app.css')}"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="${assets.get('apple-touch-icon.png')}"
        />
        <link rel="icon" href="https://www.factual.com/wp-content/themes/factualinc/assets/images/favicon.ico">
        <script defer src="${assets.get('app.js')}"></script>
      </head>
      <noscript>
        <div class="noscript">
          <h2>${state.translate('javascriptRequired')}</h2>
          <p>
            <a
              class="link"
              href="https://github.com/mozilla/send/blob/master/docs/faq.md#why-does-firefox-send-require-javascript"
            >
              ${state.translate('whyJavascript')}
            </a>
          </p>
          <p>${state.translate('enableJavascript')}</p>
        </div>
      </noscript>
      ${body} ${initScript(state)}
    </html>
  `;
};
