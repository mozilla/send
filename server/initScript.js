const html = require('choo/html');
const raw = require('choo/html/raw');

module.exports = function(state) {
  // return '';
  return state.cspNonce
    ? html`
        <script nonce="${state.cspNonce}">
          const downloadMetadata = ${
            state.downloadMetadata
              ? raw(JSON.stringify(state.downloadMetadata))
              : '{}'
          };
        </script>
      `
    : '';
};
