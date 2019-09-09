const html = require('choo/html');

module.exports = function(selected, options, translate, changed, htmlId) {
  let x = selected;

  return html`
    <select
      id="${htmlId}"
      class="appearance-none cursor-pointer border rounded bg-grey-10 hover:border-blue-50 focus:border-blue-50 pl-1 pr-8 py-1 my-1 h-8 dark:bg-grey-80"
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
