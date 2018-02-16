const html = require('choo/html');
const number = require('../../utils').number;

module.exports = function(selected, options, translate, changed) {
  const id = `select-${Math.random()}`;
  let x = selected;

  return html`
  <div class="selectbox">
    <div onclick=${toggle}>
      <span class="link">${translate(selected)}</span>
      <svg width="32" height="32">
        <polygon points="8 18 17 28 26 18" fill="#0094fb"/>
      </svg>
    </div>
    <ul id="${id}" class="selectbox__options">
      ${options.map(
        i => html`
            <li
              class="selectbox__option"
              onclick=${choose}
              data-value="${i}">${number(i)}</li>`
      )}
    </ul>
  </div>`;

  function close() {
    const ul = document.getElementById(id);
    const body = document.querySelector('body');
    ul.classList.remove('selectbox__options--active');
    body.removeEventListener('click', close);
  }

  function toggle(event) {
    event.stopPropagation();
    const ul = document.getElementById(id);
    if (ul.classList.contains('selectbox__options--active')) {
      close();
    } else {
      ul.classList.add('selectbox__options--active');
      const body = document.querySelector('body');
      body.addEventListener('click', close);
    }
  }

  function choose(event) {
    event.stopPropagation();
    const target = event.target;
    const value = +target.dataset.value;
    target.parentNode.previousSibling.firstElementChild.textContent = translate(
      value
    );
    if (x !== value) {
      x = value;
      changed(value);
    }
    close();
  }
};
