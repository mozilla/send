const html = require('choo/html');

module.exports = function(selected, options, translate, changed, htmlId) {
  let x = selected;

  return html`
    <select
      id="${htmlId}"
      class="appearance-none cursor-pointer border rounded bg-grey-lightest hover:border-blue-dark focus:border-blue-dark pl-1 pr-8 py-1 my-1 h-8"
      onchange="${choose}"
    >
      ${options.map(
        i =>
          html`
            <option value="${i}" ${i === selected ? 'selected' : ''}
              >${translate(i)}</option
            >
          `
      )}
    </select>
  `;

  function choose(event) {
    const target = event.target;
    const value = +target.value;

    if (x !== value) {
      x = value;
      changed(value);
    }
  }
};
