const html = require('choo/html');
const QRious = require('qrious');

module.exports = function() {
  const qr = new QRious({
    value: 'https://oliverdvorski.com',
    size: 300
  });

  return html`
    <main class="main">
      <section
        class="h-full w-full p-6 md:p-8 flex flex-col md:rounded-xl md:shadow-big"
      >
        <div>
          <img class="max-w-100" src="${qr.toDataURL('image/jpeg')}" />
        </div>

        <div>column</div>
      </section>
    </main>
  `;
};
