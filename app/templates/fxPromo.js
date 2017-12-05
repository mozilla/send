const html = require('choo/html');
const assets = require('../../common/assets');

// function replaceLinks(str, urls) {
//   let i = -1;
//   const s = str.replace(/<a>([^<]+)<\/a>/g, (m, v) => {
//     i++;
//     return `<a class="link" href="${urls[i]}">${v}</a>`;
//   });
//   return [`<span>${s}</span>`];
// }

module.exports = function(state, emit) {
  // function close() {
  //   document.querySelector('.banner').remove();
  // }

  function clicked(evt) {
    emit('exit', evt);
  }

  const classes = state.promo === 'blue' ? 'banner banner-blue' : 'banner';

  return html`
    <div class="${classes}">
      <div>
        <img
        src="${assets.get('firefox_logo-only.svg')}"
        class="firefox-logo-small"
        alt="Firefox"/>
        <span>Send is brought to you by the all-new Firefox.
        <a
          class="link"
          href="https://www.mozilla.org/firefox/new/?utm_campaign=send-acquisition&utm_medium=referral&utm_source=send.firefox.com"
          onclick=${clicked}
          >Download Firefox now ≫</a></span>
      </div>
    </div>`;
};

/*
<img
  src="${assets.get('close-16.svg')}"
  class="icon-delete"
  onclick=${close}>
*/
