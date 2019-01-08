const html = require('choo/html');

module.exports = function() {
  return html`
    <main class="main relative">
      <section class="h-full w-full p-6 md:flex md:flex-row z-10">
        <div class="md:mr-6 md:w-1/2 w-full"></div>
        <div class="md:w-1/2 mt-6 md:mt-0 w-full"></div>
      </section>
    </main>
  `;
};
