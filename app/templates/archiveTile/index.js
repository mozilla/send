const html = require('choo/html');

module.exports = function(archive) {
  return html`
  <li id="${archive.id}" class="archiveTile">
    <a href="/share/${archive.id}">${archive.name}</a>
  </li>`;
};
