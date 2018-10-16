const html = require('choo/html');
const title = require('../templates/title');
const signupPromo = require('../templates/signupPromo');
const controlArea = require('../templates/controlArea');

module.exports = function(state, emit, a, b) {
  return html`
  <main class="main">
    ${controlArea(state, emit)}
    <div class="split__left">
      ${title(state)}
      ${a}
    </div>
    <div class="split__right">
      ${b}
    </div>
    ${signupPromo(state)}
  </main>
  `;
};
