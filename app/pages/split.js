const html = require('choo/html');
const title = require('../templates/title');
const signupPromo = require('../templates/signupPromo');

module.exports = function(state, a, b) {
  return html`
    <div class="split">
      <div class="split__left">
        ${title(state)}
        ${a}
      </div>
      <div class="split__right">
        ${signupPromo(state)}
        ${b}
      </div>
    </div>
  `;
};
