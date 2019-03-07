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
            When Mozilla receives information from you, our
            <a
              href="https://www.mozilla.org/privacy/"
              target="__blank"
              rel="noopener noreferrer"
              >Mozilla Privacy Policy</a
            >
            describes how we handle that information. Below are the top things
            you should know about Firefox Send. You can also view the code
            <a
              href="https://github.com/mozilla/send/blob/master/docs/metrics.md"
              target="__blank"
              rel="noopener noreferrer"
              >here</a
            >.
          </p>
          <ul class="mt-6 leading-normal">
            <li class="mb-4">
              <b>Content</b>: Mozilla receives an encrypted copy of the file you
              upload but we cannot access the content or name of your encrypted
              file. By default, files are stored for a maximum of either 24
              hours or 7 days. If you choose a download cap, the file can be
              deleted from our server sooner.
            </li>
            <li class="mb-4">
              <b>Data on your device</b>: So that you can check status or delete
              files, basic information about your uploaded files is stored on
              your local device. This includes our identifier for the file, the
              filename, and the file’s unique download URL. This is cleared if
              you delete your uploaded file or upon visiting Send after the file
              expires. Note, however, that the URL will persist in your browsing
              history (and with whomever you shared it) until manually deleted.
            </li>
            <li class="mb-4">
              <b>Personal data</b>: The following is necessary to provide the
              service:
              <ul class="mt-6 leading-normal">
                <li class="mb-4">
                  <u>IP addresses</u>: We receive IP addresses of downloaders
                  and uploaders as part of our standard server logs. These are
                  retained for 90 days, and for that period, may be connected to
                  activity of a file’s download URL. Although we develop our
                  services in ways that minimize identification, you should know
                  that it may be possible to correlate the IP address of a Send
                  user to the IP address of other Mozilla services with
                  accounts; and if there is a match, this could identify the
                  account email address.
                </li>
                <li class="mb-4">
                  <u>Firefox Account</u>: This is required for authentication
                  only if you wish to upload larger file sizes. Your Firefox
                  Account record will retain aggregate data on your usage of
                  Send: for example, if you created a Firefox Account in
                  connection with Send, number of files sent and approximate
                  file sizes, and how many times you’ve used the service.
                </li>
              </ul>
            </li>
            <li class="mb-4">
              <b>Non-personal data</b>: We receive the following to improve our
              service and performance:
              <ul class="mt-6 leading-normal">
                <li class="mb-4">
                  <u>Interaction data</u>: This includes information such as
                  number of people sending and receiving files, number of files
                  uploaded and approximate file sizes, percentage of file
                  downloaders who become uploaders, how people engage with the
                  website (time spent, clicks, referrer information, site exit
                  path, use of passwords).
                </li>
                <li class="mb-4">
                  <u>Technical data</u>: This includes information such as
                  operating system, browser, language preference, country,
                  timestamps, duration for file transfer, reasons for errors,
                  reasons for file expiration.
                </li>
              </ul>
            </li>
            <li class="mb-4">
              <b>Third Party Services</b>: We use Google Cloud Platform.
            </li>
          </ul>
        </div>
      </div>
    </main>
  `;
};
