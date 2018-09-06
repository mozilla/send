const html = require('choo/html');

import { setFileProtocolWSSUrl, getFileProtocolWSSUrl } from '../../app/api';

export default function preferences(state, emit) {
  const wssURL = getFileProtocolWSSUrl();

  function updateWSSUrl(event) {
    state.wssURL = event.target.value;
    setFileProtocolWSSUrl(state.wssURL);
    emit('render');
  }

  function clickDone(event) {
    event.preventDefault();
    emit('pushState', '/');
  }

  return html`<body>
  <div id="white">
    <div id="preferences">
      <a onclick=${clickDone} href="#">
      done
      </a>
      <dl>
        <dt>
          wss url:
        </dt>
        <dd>
          <input type="text" onchange=${updateWSSUrl} value=${wssURL} />
        </dd>
      </dl>
    </div>
  </div>
</body>`;
}
