const html = require('choo/html');
const assets = require('../../../common/assets');
const userAccount = require('../userAccount');

module.exports = function(state, emit) {
  const account = state.capabilities.account
    ? html`<li>
  ${userAccount(state, emit)}
</li>`
    : null;
  return html`
    <nav class="controlArea">
      <ul>
        ${account}
        <li>
          <a href="/">
            <img src="${assets.get('addfile.svg')}"/>
          </a>
        </li>
        <li>
          <a href="/uploads">
            <img src="${assets.get('blue_file.svg')}"/>
          </a>
        </li>
      </ul>
    </nav>
  `;
};
