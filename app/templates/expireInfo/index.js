/* globals DEFAULTS */
const html = require('choo/html');
const raw = require('choo/html/raw');
const selectbox = require('../selectbox');
const timeLimitText = require('../timeLimitText');
const okDialog = require('../okDialog');

module.exports = function(state, emit) {
  const el = html`<div> ${raw(
    state.translate('frontPageExpireInfo', {
      downloadCount: '<select id=dlCount></select>',
      timespan: '<select id=timespan></select>'
    })
  )}
  </div>`;
  if (el.__encoded) {
    // we're rendering on the server
    return el;
  }

  const counts = DEFAULTS.DOWNLOAD_COUNTS.filter(
    i => state.capabilities.account || i <= state.user.maxDownloads
  );

  const dlCountSelect = el.querySelector('#dlCount');
  el.replaceChild(
    selectbox(
      state.downloadCount || 1,
      counts,
      num => state.translate('downloadCount', { num }),
      value => {
        const max = state.user.maxDownloads;
        if (value > max) {
          state.modal = okDialog('todo: this setting requires an account');
          value = max;
        }
        state.downloadCount = value;
        emit('render');
      }
    ),
    dlCountSelect
  );

  const expires = DEFAULTS.EXPIRE_TIMES_SECONDS.filter(
    i => state.capabilities.account || i <= state.user.maxExpireSeconds
  );

  const timeSelect = el.querySelector('#timespan');
  el.replaceChild(
    selectbox(
      state.timeLimit || 86400,
      expires,
      num => timeLimitText(state.translate, num),
      value => {
        const max = state.user.maxExpireSeconds;
        if (value > max) {
          state.modal = okDialog('todo: this setting requires an account');
          value = max;
        }
        state.timeLimit = value;
        emit('render');
      }
    ),
    timeSelect
  );

  return el;
};
