const html = require('choo/html');

module.exports = function(state) {
  return html`
    <div class="boxTitle">
      ${state.translate('uploadPageHeader')}
      <div class="boxSubtitle">
      ${state.translate('pageHeaderCredits')}
      </div>
    </div>`;
};
