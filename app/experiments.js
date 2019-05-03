import hash from 'string-hash';
import Account from './ui/account';

const experiments = {
  signin_button_color: {
    eligible: function() {
      return true;
    },
    variant: function() {
      return ['white-blue', 'blue', 'white-violet', 'violet'][
        Math.floor(Math.random() * 4)
      ];
    },
    run: function(variant, state) {
      const account = state.cache(Account, 'account');
      account.buttonClass = variant;
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
  const enrolled = state.storage.enrolled;
  // single experiment per session for now
  const id = Object.keys(enrolled)[0];
  if (Object.keys(experiments).includes(id)) {
    experiments[id].run(enrolled[id], state, emitter);
  } else {
    checkExperiments(state, emitter);
  }
}
