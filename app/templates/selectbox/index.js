const html = require('choo/html');

module.exports = function(selected, options, translate, changed) {
  const id = `select-${Math.random()}`;
  let x = selected;

  return html`
  <span class="select">
    <select id="${id}" onchange=${choose}>
      ${options.map(
        i =>
          html`<option value="${i}" ${
            i === selected ? 'selected' : ''
          }>${translate(i)}</option>`
      )}
    </select>
    
    <svg id="arrow" width="32" height="32">
      <polygon points="8 18 17 28 26 18" fill="#0094fb"/>
    </svg>
  </span>`;

  function choose(event) {
    const target = event.target;
    const value = +target.value;

    if (x !== value) {
      x = value;
      changed(value);
    }
  }
};
