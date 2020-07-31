const html = require('choo/html');
const raw = require('choo/html/raw');
const assets = require('../../common/assets');

const REPORTABLES = ['Malware', 'Pii', 'Abuse'];

module.exports = function(state, emit) {
  let submitting = false;
  const file = state.fileInfo;
  if (!file) {
    return html`
      <main class="main">
        <section
          class="flex flex-col items-center justify-center h-full w-full p-6 md:p-8 overflow-hidden md:rounded-xl md:shadow-big"
        >
          <p class="text-xl text-center mb-4 leading-normal">
            ${state.translate('reportUnknownDescription')}
          </p>
          <p class="text-center">
            ${raw(
              replaceLinks(state.translate('reportReasonCopyright'), [
                'https://www.mozilla.org/about/legal/report-infringement/'
              ])
            )}
          </p>
        </section>
      </main>
    `;
  }
  if (file.reported) {
    return html`
      <main class="main">
        <section
          class="flex flex-col items-center justify-center h-full w-full p-6 md:p-8 overflow-hidden md:rounded-xl md:shadow-big"
        >
          <h1 class="text-center text-3xl font-bold my-2">
            ${state.translate('reportedTitle')}
          </h1>
          <p class="max-w-md text-center leading-normal">
            ${state.translate('reportedDescription')}
          </p>
          <img src="${assets.get('notFound.svg')}" class="my-12" />
          <p class="my-5">
            <a href="/" class="btn rounded-lg flex items-center" role="button"
              >${state.translate('okButton')}</a
            >
          </p>
        </section>
      </main>
    `;
  }
  return html`
    <main class="main">
      <section
        class="relative h-full w-full p-6 md:p-8 md:rounded-xl md:shadow-big"
      >
        <div
          class="flex flex-col w-full max-w-sm h-full mx-auto items-center justify-center"
        >
          <h1 class="text-2xl font-bold mb-4">
            ${state.translate('reportFile')}
          </h1>
          <p class="mb-4 leading-normal font-semibold">
            ${state.translate('reportDescription')}
          </p>
          <form onsubmit="${report}" data-no-csrf>
            <fieldset onchange="${optionChanged}">
              <ul
                class="list-none p-4 mb-6 rounded-sm bg-grey-10 dark:bg-black"
              >
                ${REPORTABLES.map(
                  reportable =>
                    html`
                      <li class="mb-2 leading-normal">
                        <label
                          for="${reportable.toLowerCase()}"
                          class="flex items-center"
                        >
                          <input
                            type="radio"
                            name="reason"
                            id="${reportable.toLowerCase()}"
                            value="${reportable.toLowerCase()}"
                            class="mr-2 my-2 w-4 h-4"
                          />
                          ${state.translate(`reportReason${reportable}`)}
                        </label>
                      </li>
                    `
                )}
                <li class="mt-4 mb-2 leading-normal">
                  ${raw(
                    replaceLinks(state.translate('reportReasonCopyright'), [
                      'https://www.mozilla.org/about/legal/report-infringement/'
                    ])
                  )}
                </li>
              </ul>
            </fieldset>
            <input
              type="submit"
              disabled
              class="btn rounded-lg w-full flex-shrink-0 focus:outline"
              title="${state.translate('reportButton')}"
              value="${state.translate('reportButton')}"
            />
          </form>
        </div>
      </section>
    </main>
  `;

  function optionChanged(event) {
    event.stopPropagation();
    const button = event.currentTarget.nextElementSibling;
    button.disabled = false;
  }

  function report(event) {
    event.stopPropagation();
    event.preventDefault();
    if (submitting) {
      return;
    }
    submitting = true;
    state.fileInfo.reported = true;
    const form = event.target;
    emit('report', { reason: form.reason.value });
  }

  function replaceLinks(str, urls) {
    let i = 0;
    const s = str.replace(
      /<a>([^<]+)<\/a>/g,
      (m, v) => `<a class="text-blue" href="${urls[i++]}">${v}</a>`
    );
    return `<p>${s}</p>`;
  }
};
