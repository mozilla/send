const html = require('choo/html');

module.exports = function(selected, options, translate, changed) {
  let x = selected;

  return html`
    <select class="appearance-none cursor-pointer border rounded-sm bg-blue-lightest hover:border-blue focus:border-blue px-2 py-1 mx-1 h-8" onchange=${choose}>
      ${options.map(
        i =>
          html`<option value="${i}" ${
            i === selected ? 'selected' : ''
          }>${translate(i)}</option>`
      )}
    </select>`;

  function choose(event) {
    const target = event.target;
    const value = +target.value;

    if (x !== value) {
      x = value;
      changed(value);
    }
  }
};
