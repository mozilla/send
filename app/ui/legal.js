const html = require('choo/html');
const modal = require('./modal');

module.exports = function(state, emit) {
  return html`
    <main class="main">
      ${state.modal && modal(state, emit)}
      <div
        class="flex flex-col items-center bg-white m-4 px-6 py-8 border border-grey-light md:border-none md:px-12 md:py-16 shadow w-full md:h-full"
      >
        <h1 class="text-center">${state.translate('legalTitle')}</h1>
        <p class="mt-2">${state.translate('legalDateStamp')}</p>
        <div class="overflow-scroll py-8 px-12">
          <p class="leading-normal">
            <span
              >Send is a service from Mozilla that allows you to send electronic
              files through a safe, private, and encrypted link that
              automatically expires to ensure your stuff does not remain online
              forever. Send is also subject to our</span
            ><a
              href="https://www.mozilla.org/privacy/websites"
              target="__blank"
              rel="noopener noreferrer"
              class="text-blue-dark hover:underline"
              > Websites Privacy Policy</a
            ><span
              >. When you visit the Send website, information such as your IP
              address is temporarily retained as part of a standard server
              log.</span
            >
          </p>
          <br>
          <p>
            Here are the other key things you should know about what is
            happening when you use Send:
          <ul class="mt-6 leading-normal">
            <li class="mb-4">
              Mozilla receives an encrypted copy of the file you upload, and
              basic information about the file, such as filename, file hash, and
              file size. Mozilla does not have the ability to access the content
              of your encrypted file, and only keeps it for the time or number
              of downloads indicated.
            </li>
            <li class="mb-4">
              To allow you to see the status of your previously uploaded files,
              or delete them, basic information about your uploaded files are
              stored on your local device, such as Send’s identifier for the
              file, the filename, and the file’s unique download link. This is
              cleared if you delete your uploaded file or upon visiting Send
              after the file expires.
            </li>
            <li class="mb-4">
              Anyone you provide with the unique link (including the encryption
              key) to your encrypted file will be able to download and access
              that file. You should not provide the link to anyone you do not
              want to have access to your encrypted file.
            </li>
            <li class="mb-4">
              Send will also collect information about the performance and your
              use of the service, such as how often you upload files, how long
              your files remain with Mozilla before they expire, any errors
              related to file transfers, and what cryptographic protocols your
              browser supports.
            </li>
            <li class="mb-4">
              You can learn more about the data Send collects<a
                href="https://github.com/mozilla/send/blob/master/docs/metrics.md"
                target="__blank"
                rel="noopener noreferrer"
                class="text-blue-dark hover:underline"
                > here</a
              >.
            </li>
          </ul>
          </p>
        </div>
      </div>
    </main>
  `;
};
