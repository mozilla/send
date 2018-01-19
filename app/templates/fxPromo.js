const html = require('choo/html');
const assets = require('../../common/assets');

module.exports = function(state, emit) {
  function clicked() {
    emit('experiment', { cd3: 'promo' });
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
