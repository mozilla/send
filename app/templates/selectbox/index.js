const html = require('choo/html');

module.exports = function(selected, options, translate, changed) {
  const id = `select-${Math.random()}`;
  let x = selected;

  return html`
  <div class="select">
    <select id="${id}" onchange=${choose}>
      ${options.map(
        i =>
          html`<option value="${i}" ${
            i === selected ? 'selected' : ''
          }>${translate(i)}</option>`
      )}
    </select>
  </div>`;

  function choose(event) {
    const target = event.target;
    const value = +target.value;

    if (x !== value) {
      x = value;
      changed(value);
    }
  }
};
