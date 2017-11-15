import hash from 'string-hash';

const experiments = {
  'SyI-hI7gT9agiH-f3f0BYg': {
    id: 'SyI-hI7gT9agiH-f3f0BYg',
    run: function(variant, state, emitter) {
      state.promo = variant === 1 ? 'body' : 'header';
      emitter.emit('render');
    },
    eligible: function() {
      return (
        !/firefox/i.test(navigator.userAgent) &&
        document.querySelector('html').lang === 'en-US'
      );
    },
    variant: function(state) {
      return this.luckyNumber(state) > 0.5 ? 1 : 0;
    },
    luckyNumber: function(state) {
      return luckyNumber(
        `${this.id}:${state.storage.get('testpilot_ga__cid')}`
      );
    }
  }
};

//Returns a number between 0 and 1
// eslint-disable-next-line no-unused-vars
function luckyNumber(str) {
  return hash(str) / 0xffffffff;
}

function checkExperiments(state, emitter) {
  const all = Object.keys(experiments);
  const id = all.find(id => experiments[id].eligible(state));
  if (id) {
    const variant = experiments[id].variant(state);
    state.storage.enroll(id, variant);
    experiments[id].run(variant, state, emitter);
  }
}

export default function initialize(state, emitter) {
  emitter.on('DOMContentLoaded', () => {
    const xp = experiments[state.query.x];
    if (xp) {
      xp.run(+state.query.v, state, emitter);
    }
  });

  if (!state.storage.get('testpilot_ga__cid')) {
    // first ever visit. check again after cid is assigned.
    emitter.on('DOMContentLoaded', () => {
      checkExperiments(state, emitter);
    });
  } else {
    const enrolled = state.storage.enrolled.filter(([id, variant]) => {
      const xp = experiments[id];
      if (xp) {
        xp.run(variant, state, emitter);
      }
      return !!xp;
    });
    // single experiment per session for now
    if (enrolled.length === 0) {
      checkExperiments(state, emitter);
    }
  }
}
