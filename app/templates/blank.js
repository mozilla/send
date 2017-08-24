const html = require('choo/html');

module.exports = function(state) {
  const div = html`<div id="page-one"></div>`;
  if (state.layout) {
    return state.layout(state, div);
  }
  return div;
};
