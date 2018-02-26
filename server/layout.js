const html = require('choo/html');
const assets = require('../common/assets');
const locales = require('../common/locales');

module.exports = function(state, body = '') {
  const firaTag = state.fira
    ? html`<link rel="stylesheet" type="text/css" href="https://code.cdn.mozilla.net/fonts/fira.css" />`
    : '';
  return html`
  <!DOCTYPE html>
  <html lang="${state.locale}">
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta property="og:title" content="${state.title}"/>
    <meta name="twitter:title" content="${state.title}"/>
    <meta name="description" content="${state.description}"/>
    <meta property="og:description" content="${state.description}"/>
    <meta name="twitter:description" content="${state.description}"/>
    <meta name="twitter:card" content="summary"/>
    <meta property="og:image" content="${state.baseUrl}${assets.get(
    'send-fb.jpg'
  )}"/>
    <meta name="twitter:image" content="${state.baseUrl}${assets.get(
    'send-twitter.jpg'
  )}"/>
    <meta property="og:url" content="${state.baseUrl}"/>

    <title>${state.title}</title>

    <link rel="stylesheet" type="text/css" href="${assets.get('style.css')}" />

    <!-- generic favicons -->
    <link rel="icon" href="${assets.get('favicon-32.png')}" sizes="32x32">
    <link rel="icon" href="${assets.get('favicon-96.png')}" sizes="96x96">
    <link rel="icon" href="${assets.get('favicon-128.png')}" sizes="128x128">
    <link rel="icon" href="${assets.get('favicon-228.png')}" sizes="228x228">

    <!-- Android -->
    <link rel="shortcut icon" href="${assets.get(
      'favicon-196.png'
    )}" sizes="196x196">

    <!-- iOS -->
    <link rel="apple-touch-icon" href="${assets.get(
      'favicon-120.png'
    )}" sizes="120x120">
    <link rel="apple-touch-icon" href="${assets.get(
      'favicon-152.png'
    )}" sizes="152x152">
    <link rel="apple-touch-icon" href="${assets.get(
      'favicon-180.png'
    )}" sizes="180x180">

    <!-- Windows 8 IE 10-->
    <meta name="msapplication-TileColor" content="#FFFFFF">
    <meta name="msapplication-TileImage" content="${assets.get(
      'favicon-144.png'
    )}">

    <!-- Windows 8.1 + IE11 and above -->
    <meta name="msapplication-config" content="/browserconfig.xml"/>


    ${firaTag}
    <script defer src="/jsconfig.js"></script>
    <script defer src="${assets.get('runtime.js')}"></script>
    <script defer src="${assets.get('vendor.js')}"></script>
    <script defer src="${locales.get(state.locale)}"></script>
    <script defer src="${assets.get('app.js')}"></script>
  </head>
  ${body}
  </html>
  `;
};
