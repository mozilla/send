const html = require('choo/html');

module.exports = function() {
  return html`
    <main class="main">
      <section
        class="h-full w-full p-6 z-10 md:flex md:flex-row md:rounded-lg md:shadow-big"
      >
        <div class="md:mr-6 md:w-1/2 w-full"></div>
        <div class="md:w-1/2 mt-6 md:mt-0 w-full"></div>
      </section>
    </main>
  `;
};
