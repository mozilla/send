import hash from 'string-hash';

const experiments = {
  '5YHCzn2CQTmBwWwTmZupBA': {
    id: '5YHCzn2CQTmBwWwTmZupBA',
    run: function(variant, state, emitter) {
      state.experiment = {
        xid: this.id,
        xvar: variant
      };
      // Beefy UI
      if (variant === 1) {
        state.config.uploadWindowStyle = 'upload-window upload-window-b';
        state.config.uploadButtonStyle = 'btn browse browse-b';
      } else {
        state.config.uploadWindowStyle = 'upload-window';
        state.config.uploadButtonStyle = 'btn browse';
      }
      emitter.emit('render');
    },
    eligible: function(state) {
      return this.luckyNumber(state) >= 0.5;
    },
    variant: function(state) {
      return this.luckyNumber(state) < 0.5 ? 0 : 1;
    },
    luckyNumber: function(state) {
      return luckyNumber(
        `${this.id}:${state.storage.get('testpilot_ga__cid')}`
      );
    }
  }
};

//Returns a number between 0 and 1
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
      xp.run(state.query.v, state, emitter);
    }
  });

  if (!state.storage.get('testpilot_ga__cid')) {
    // first ever visit. check again after cid is assigned.
    emitter.on('DOMContentLoaded', () => {
      checkExperiments(state, emitter);
    });
  } else {
    const enrolled = state.storage.enrolled;
    enrolled.forEach(([id, variant]) => {
      const xp = experiments[id];
      if (xp) {
        xp.run(variant, state, emitter);
      }
    });
    // single experiment per session for now
    if (enrolled.length === 0) {
      checkExperiments(state, emitter);
    }
  }
}
