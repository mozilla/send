const html = require('choo/html');

module.exports = function() {
  return html`
    <main class="main">
      <section
        class="h-full w-full p-6 md:p-8 md:flex md:flex-row md:rounded-xl md:shadow-big"
      >
        Here's a QR Code
      </section>
    </main>
  `;
};
