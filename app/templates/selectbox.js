const html = require('choo/html');

module.exports = function(selected, options, translate, changed) {
  const id = `select-${Math.random()}`;
  let x = selected;

  function close() {
    const ul = document.getElementById(id);
    const body = document.querySelector('body');
    ul.classList.remove('active');
    body.removeEventListener('click', close);
  }

  function toggle(event) {
    event.stopPropagation();
    const ul = document.getElementById(id);
    if (ul.classList.contains('active')) {
      close();
    } else {
      ul.classList.add('active');
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
  return html`
    <div class="selectbox">
      <div onclick=${toggle}>
        <span class="link">${translate(selected)}</span>
        <svg width="32" height="32">
          <polygon points="8 18 17 28 26 18" fill="#0094fb"/>
        </svg>
      </div>
      <ul id="${id}" class="selectOptions">
        ${options.map(
          i =>
            html`<li class="selectOption" onclick=${choose} data-value="${i}">${
              i
            }</li>`
        )}
      </ul>
    </div>`;
};
