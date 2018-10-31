const html = require('choo/html');
const raw = require('choo/html/raw');
const assets = require('../../common/assets');
const { bytes, copyToClipboard, list, percent, timeLeft } = require('../utils');
const expiryOptions = require('./expiryOptions');

function expiryInfo(translate, archive) {
  const l10n = timeLeft(archive.expiresAt - Date.now());
  return raw(
    translate('frontPageExpireInfo', {
      downloadCount: translate('downloadCount', {
        num: archive.dlimit - archive.dtotal
      }),
      timespan: translate(l10n.id, l10n)
    })
  );
}

function password(state) {
  const MAX_LENGTH = 32;

  return html`
  <div class="my-2">
    <div class="checkbox">
      <input
        id="add-password"
        type="checkbox"
        ${state.password ? 'checked' : ''}
        autocomplete="off"
        onchange=${togglePasswordInput}/>
      <label for="add-password">
        ${state.translate('addPasswordMessage')}
      </label>
    </div>
    <input
      id="password-input"
      class="${
        state.password ? '' : 'invisible'
      } border rounded-sm focus:border-blue leading-normal mt-2"
      autocomplete="off"
      maxlength="${MAX_LENGTH}"
      type="password"
      oninput=${inputChanged}
      onfocus=${focused}
      placeholder="${state.translate('unlockInputPlaceholder')}"
      value="${state.password || ''}"
    >
    <label
      id="password-msg"
      for="password-input"
      class="block text-xs text-grey-darker mt-1"></label>
  </div>`;

  function togglePasswordInput(event) {
    event.stopPropagation();
    const checked = event.target.checked;
    const input = document.getElementById('password-input');
    if (checked) {
      input.classList.remove('invisible');
      input.focus();
    } else {
      input.classList.add('invisible');
      input.value = '';
      document.getElementById('password-msg').textContent = '';
      state.password = null;
    }
  }

  function inputChanged() {
    const passwordInput = document.getElementById('password-input');
    const pwdmsg = document.getElementById('password-msg');
    const password = passwordInput.value;
    const length = password.length;

    if (length === MAX_LENGTH) {
      pwdmsg.textContent = state.translate('maxPasswordLength', {
        length: MAX_LENGTH
      });
    } else {
      pwdmsg.textContent = '';
    }
    state.password = password;
  }

  function focused(event) {
    event.preventDefault();
    const el = document.getElementById('password-input');
    if (el.placeholder !== state.translate('unlockInputPlaceholder')) {
      el.placeholder = '';
    }
  }
}

function fileInfo(file, action) {
  return html`
    <article class="flex flex-row items-start p-3">
      <img class="" src="${assets.get('blue_file.svg')}"/>
      <p class="ml-3 w-full">
        <h1 class="text-base font-semibold">${file.name}</h1>
        <div class="text-sm font-light">${bytes(file.size)}</div>
        <div class="hidden">${file.type}</div>
      </p>
      ${action}
    </article>`;
}

function archiveDetails(translate, archive) {
  if (archive.manifest.files.length > 1) {
    return html`
    <details class="w-full pb-1 overflow-y-hidden" ${
      archive.open ? 'open' : ''
    } ontoggle=${toggled}>
      <summary>${translate('fileCount', {
        num: archive.manifest.files.length
      })}</summary>
      ${list(
        archive.manifest.files.map(f => fileInfo(f)),
        'list-reset h-full overflow-y-scroll'
      )}
    </details>`;
  }
  function toggled(event) {
    event.stopPropagation();
    archive.open = event.target.open;
  }
}

module.exports = function(state, emit, archive) {
  return html`
  <article
    id="${archive.id}"
    class="flex flex-col items-start border border-grey-light bg-white p-3">
    <p class="w-full">
      <img class="float-left mr-3" src="${assets.get('blue_file.svg')}"/>
      <input
        type="image"
        class="float-right self-center text-white"
        alt="Delete"
        src="${assets.get('close-16.svg')}"
        onclick=${del}/>
      <h1 class="text-base font-semibold">${archive.name}</h1>
      <div class="text-sm font-light">${bytes(archive.size)}</div>
    </p>
    <div class="text-xs text-grey-dark w-full mt-2 mb-2">
      ${expiryInfo(state.translate, archive)}
    </div>
    ${archiveDetails(state.translate, archive)}
    <hr class="w-full border-t">
    <button
      class="text-blue self-end"
      onclick=${copy}>
      <img src="${assets.get('copy-16.svg')}" class="mr-1"/>
      ${state.translate('copyUrlHover')}
    </button>
  </article>`;

  function copy(event) {
    event.stopPropagation();
    copyToClipboard(archive.url);
    const text = event.target.lastChild;
    text.textContent = state.translate('copiedUrl');
    setTimeout(
      () => (text.textContent = state.translate('copyUrlHover')),
      1000
    );
  }

  function del(event) {
    event.stopPropagation();
    emit('delete', { file: archive, location: 'success-screen' });
  }
};

module.exports.wip = function(state, emit) {
  return html`
  <article class="h-full flex flex-col bg-white border border-grey-light p-2 z-20">
    ${list(
      state.archive.files.map(f => fileInfo(f, remove(f))),
      'list-reset h-full overflow-y-scroll'
    )}
    <div class="flex-grow border border-dashed border-blue-light mb-2">
      <input
        id="file-upload"
        class="hidden"
        type="file"
        multiple
        onchange=${add} />
      <label
        for="file-upload"
        class="flex flex-row items-center w-full h-full text-blue p-2"
        title="${state.translate('addFilesButton')}">
          <img src="${assets.get('addfile.svg')}" class="w-6 h-6 mr-2"/>
          ${state.translate('addFilesButton')}
      </label>
    </div>
    ${expiryOptions(state, emit)}
    ${password(state, emit)}
    <button
      id="upload-btn"
      class="flex-none border rounded bg-blue text-white mt-2 py-2 px-6"
      title="${state.translate('uploadFilesButton')}"
      onclick=${upload}>
      ${state.translate('uploadFilesButton')}
    </button>
  </article>`;

  function upload(event) {
    event.preventDefault();
    event.target.disabled = true;
    if (!state.uploading) {
      emit('upload', {
        type: 'click',
        dlimit: state.downloadCount || 1,
        password: state.password
      });
    }
  }

  function add(event) {
    event.preventDefault();
    const newFiles = Array.from(event.target.files);

    emit('addFiles', { files: newFiles });
  }

  function remove(file) {
    return html`
    <input
      type="image"
      class="self-center text-white"
      alt="Delete"
      src="${assets.get('close-16.svg')}"
      onclick=${del}/>`;
    function del(event) {
      event.stopPropagation();
      emit('removeUpload', file);
    }
  }
};

module.exports.uploading = function(state, emit) {
  const progress = state.transfer.progressRatio;
  const progressPercent = percent(progress);
  const archive = state.archive;
  return html`
  <article
    id="${archive.id}"
    class="z-20 flex flex-col items-start border border-grey-light bg-white p-3">
    <p class="w-full">
      <img class="float-left mr-3" src="${assets.get('blue_file.svg')}"/>
      <h1 class="text-base font-semibold">${archive.name}</h1>
      <div class="text-sm font-light">${bytes(archive.size)}</div>
    </p>
    <div class="text-xs text-grey-dark w-full mt-2 mb-2">
      ${expiryInfo(state.translate, {
        dlimit: state.downloadCount || 1,
        dtotal: 0,
        expiresAt: Date.now() + 500 + state.timeLimit * 1000
      })}
    </div>
    <div class="text-blue text-sm font-medium">${progressPercent}</div>
    <progress class="mb-1" value="${progress}">${progressPercent}</progress>
    <button
      class="text-blue self-end"
      onclick=${cancel}>
      ${state.translate('uploadingPageCancel')}
    </button>
  </article>`;

  function cancel(event) {
    event.stopPropagation();
    event.target.disabled = true;
    emit('cancel');
  }
};

module.exports.empty = function(state, emit) {
  return html`
  <article class="flex flex-col items-center justify-center border border-dashed border-blue-light p-16 h-full">
    <div class="p-1">${state.translate('uploadDropDragMessage')}</div>
    <input
      id="file-upload"
      class="hidden"
      type="file"
      multiple
      onchange=${add} />
    <label
      for="file-upload"
      class="border rounded bg-blue text-white py-2 px-6"
      title="${state.translate('addFilesButton')}">
        ${state.translate('addFilesButton')}
    </label>
  </article>`;

  function add(event) {
    event.preventDefault();
    const newFiles = Array.from(event.target.files);

    emit('addFiles', { files: newFiles });
  }
};

module.exports.preview = function(state, emit) {
  const archive = state.fileInfo;
  if (archive.open === undefined) {
    archive.open = true;
  }
  return html`
  <article class="flex flex-col max-h-full bg-white border border-grey-light p-2 z-20">
    <p class="flex-none w-full mb-4">
      <img class="float-left mr-3" src="${assets.get('blue_file.svg')}"/>
      <h1 class="text-base font-semibold">${archive.name}</h1>
      <div class="text-sm font-light">${bytes(archive.size)}</div>
    </p>
    ${archiveDetails(state.translate, archive)}
    <hr class="w-full border-t">
    <button
      id="download-btn"
      class="flex-none border rounded bg-blue text-white mt-2 py-2 px-6"
      title="${state.translate('downloadButtonLabel')}"
      onclick=${download}>
      ${state.translate('downloadButtonLabel')}
    </button>
  </article>`;

  function download(event) {
    event.preventDefault();
    event.target.disabled = true;
    emit('download', archive);
  }
};

module.exports.downloading = function(state, emit) {
  const archive = state.fileInfo;
  const progress = state.transfer.progressRatio;
  const progressPercent = percent(progress);
  return html`
  <article class="flex flex-col bg-white border border-grey-light p-2 z-20">
    <p class="w-full mb-4">
      <img class="float-left mr-3" src="${assets.get('blue_file.svg')}"/>
      <h1 class="text-base font-semibold">${archive.name}</h1>
      <div class="text-sm font-light">${bytes(archive.size)}</div>
    </p>
    <div class="text-blue text-sm font-medium">${progressPercent}</div>
    <progress class="" value="${progress}">${progressPercent}</progress>
    <button
      class="border rounded bg-grey-dark text-white mt-2 py-2 px-6"
      title="${state.translate('downloadCancel')}"
      onclick=${cancel}>
      ${state.translate('downloadCancel')}
    </button>
  </article>`;

  function cancel(event) {
    event.preventDefault();
    event.target.disabled = true;
    emit('download', archive);
  }
};
