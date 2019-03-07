const html = require('choo/html');

module.exports = function(state, emit) {
  const fileInfo = state.fileInfo;
  const invalid = fileInfo.password === null;

  const div = html`
    <div
      class="h-full w-full flex flex-col items-center justify-center bg-white py-8 max-w-md mx-auto"
    >
      <h1 class="mb-4">${state.translate('downloadTitle')}</h1>
      <p class="w-full mb-4 text-center text-grey-darkest leading-normal">
        ${state.translate('downloadDescription')}
      </p>
      <form
        class="flex flex-row flex-no-wrap w-full md:w-4/5"
        onsubmit="${checkPassword}"
        data-no-csrf
      >
        <input
          id="password-input"
          class="w-full border-l border-t border-b rounded-l-lg rounded-r-none ${invalid
            ? 'border-red'
            : 'border-grey'} leading-loose px-2 py-1"
          maxlength="32"
          autocomplete="off"
          placeholder="${state.translate('unlockInputPlaceholder')}"
          oninput="${inputChanged}"
          type="password"
        />
        <input
          type="submit"
          id="password-btn"
          class="btn rounded-r-lg rounded-l-none ${invalid
            ? 'bg-red hover:bg-red focus:bg-red'
            : ''}"
          value="${state.translate('unlockButtonLabel')}"
          title="${state.translate('unlockButtonLabel')}"
        />
      </form>
      <label
        id="password-error"
        class="${invalid ? '' : 'invisible'} text-red my-4"
        for="password-input"
      >
        ${state.translate('passwordTryAgain')}
      </label>
    </div>
  `;

  if (!(div instanceof String)) {
    setTimeout(() => document.getElementById('password-input').focus());
  }

  function inputChanged(event) {
    event.stopPropagation();
    event.preventDefault();
    const label = document.getElementById('password-error');
    const input = document.getElementById('password-input');
    const btn = document.getElementById('password-btn');
    label.classList.add('invisible');
    input.classList.remove('border-red');
    btn.classList.remove('bg-red', 'hover:bg-red', 'focus:bg-red');
  }

  function checkPassword(event) {
    event.stopPropagation();
    event.preventDefault();
    const el = document.getElementById('password-input');
    const password = el.value;
    if (password.length > 0) {
      document.getElementById('password-btn').disabled = true;
      state.fileInfo.url = window.location.href;
      state.fileInfo.password = password;
      emit('getMetadata');
    }
    return false;
  }

  return div;
};
