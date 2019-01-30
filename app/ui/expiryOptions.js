/* globals DEFAULTS */
const html = require('choo/html');
const raw = require('choo/html/raw');
const { secondsToL10nId } = require('../utils');
const selectbox = require('./selectbox');
const signupDialog = require('./signupDialog');

module.exports = function(state, emit) {
  const el = html`
    <div class="px-4">
      ${raw(
        state.translate('frontPageExpireInfo', {
          downloadCount:
            '<span class="lg:inline-block md:block sm:inline-block block"></span><select id="dlCount"></select>',
          timespan: '<select id="timespan"></select>'
        })
      )}
    </div>
  `;
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
          state.modal = signupDialog();
          value = max;
        }
        state.downloadCount = value;
        emit('render');
      },
      'expire-after-dl-count-select'
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
      num => {
        const l10n = secondsToL10nId(num);
        return state.translate(l10n.id, l10n);
      },
      value => {
        const max = state.user.maxExpireSeconds;
        if (value > max) {
          state.modal = signupDialog();
          value = max;
        }
        state.timeLimit = value;
        emit('render');
      },
      'expire-after-time-select'
    ),
    timeSelect
  );

  return el;
};
