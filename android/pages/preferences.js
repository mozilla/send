const html = require('choo/html');

import { setFileProtocolWssUrl, getFileProtocolWssUrl } from '../../app/api';

export default function preferences(state, emit) {
  const wssURL = getFileProtocolWssUrl();

  function updateWssUrl(event) {
    state.wssURL = event.target.value;
    setFileProtocolWssUrl(state.wssURL);
    emit('render');
  }

  function clickDone(event) {
    event.preventDefault();
    emit('pushState', '/');
  }

  return html`
    <body>
      <div id="white">
        <div id="preferences">
          <a onclick="${clickDone}" href="#"> done </a>
          <dl>
            <dt>wss url:</dt>
            <dd>
              <input type="text" onchange="${updateWssUrl}" value="${wssURL}" />
            </dd>
          </dl>
        </div>
      </div>
    </body>
  `;
}
