const html = require('choo/html');
const raw = require('choo/html/raw');
const selectbox = require('../selectbox');
const timeLimitText = require('../timeLimitText');

module.exports = function(state) {
  const el = html`<div> ${raw(
    state.translate('frontPageExpireInfo', {
      downloadCount: '<select id=dlCount></select>',
      timespan: '<select id=timespan></select>'
    })
  )}
  </div>`;

  const dlCountSelect = el.querySelector('#dlCount');
  el.replaceChild(
    selectbox(
      state.downloadCount || 1,
      [1, 2, 3, 4, 5, 20],
      num => state.translate('downloadCount', { num }),
      value => {
        state.downloadCount = value;
      }
    ),
    dlCountSelect
  );

  const timeSelect = el.querySelector('#timespan');
  el.replaceChild(
    selectbox(
      state.timeLimit || 86400,
      [300, 3600, 86400, 604800, 1209600],
      num => timeLimitText(state.translate, num),
      value => {
        state.timeLimit = value;
      }
    ),
    timeSelect
  );

  return el;
};
