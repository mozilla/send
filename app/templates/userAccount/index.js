const html = require('choo/html');
const assets = require('../../../common/assets');

// eslint-disable-next-line no-unused-vars
module.exports = function(state) {
  return html`
    <div class="account">
      <img
      src="${assets.get('user.svg')}"
      onclick=${onclick}
      alt="account"/>

      <ul class=account_dropdown>
        <li class=account_dropdown__item>Placeholder</li>
        <li class=account_dropdown__item>Placeholder</li>
      </ul>
    </div>`;

  function onclick(event) {
    event.preventDefault();
    const dropdown = document.querySelector('.account_dropdown');
    dropdown.classList.toggle('visible');
  }
};
