const html = require('choo/html');

export default function error(_state, _emit) {
  return html`
    <body>
      <div id="white">
        <h1>Error</h1>
        <p>Sorry, an error occurred.</p>
      </div>
    </body>
  `;
}
