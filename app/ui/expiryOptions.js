const html = require('choo/html');
const raw = require('choo/html/raw');
const { secondsToL10nId } = require('../utils');
const selectbox = require('./selectbox');

module.exports = function(state, emit) {
  const el = html`
    <div class="px-1">
      ${raw(
        state.translate('archiveExpiryInfo', {
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

  const counts = state.DEFAULTS.DOWNLOAD_COUNTS.filter(
    i => state.capabilities.account || i <= state.user.maxDownloads
  );

  const dlCountSelect = el.querySelector('#dlCount');
  el.replaceChild(
    selectbox(
      state.archive.dlimit,
      counts,
      num => state.translate('downloadCount', { num }),
      value => {
        const max = state.user.maxDownloads;
        state.archive.dlimit = Math.min(value, max);
        if (value > max) {
          emitter.emit('pushState', '/error');
        } else {
          emit('render');
        }
      },
      'expire-after-dl-count-select'
    ),
    dlCountSelect
  );

  const expires = state.DEFAULTS.EXPIRE_TIMES_SECONDS.filter(
    i => state.capabilities.account || i <= state.user.maxExpireSeconds
  );

  const timeSelect = el.querySelector('#timespan');
  el.replaceChild(
    selectbox(
      state.archive.timeLimit,
      expires,
      num => {
        const l10n = secondsToL10nId(num);
        return state.translate(l10n.id, l10n);
      },
      value => {
        const max = state.user.maxExpireSeconds;
        state.archive.timeLimit = Math.min(value, max);
        if (value > max) {
          emitter.emit('pushState', '/error');
        } else {
          emit('render');
        }
      },
      'expire-after-time-select'
    ),
    timeSelect
  );

  return el;
};
