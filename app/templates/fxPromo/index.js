const html = require('choo/html');
const assets = require('../../../common/assets');

module.exports = function(state, emit) {
  let classes = 'fxPromo';
  switch (state.promo) {
    case 'blue':
      classes = 'fxPromo fxPromo--blue';
      break;
    case 'pink':
      classes = 'fxPromo fxPromo--pink';
      break;
  }

  return html`
    <div class="${classes}">
      <div>
        <img
        src="${assets.get('firefox_logo-only.svg')}"
        class="fxPromo__logo"
        alt="Firefox"/>
        <span>Send is brought to you by the all-new Firefox.
        <a
          class="link"
          href="https://www.mozilla.org/firefox/new/?utm_campaign=send-acquisition&utm_medium=referral&utm_source=send.firefox.com"
          onclick=${clicked}
          >Download Firefox now ≫</a></span>
      </div>
    </div>`;

  function clicked() {
    emit('experiment', { cd3: 'promo' });
  }
};
