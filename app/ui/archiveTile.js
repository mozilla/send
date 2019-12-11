/* global Android */
const html = require('choo/html');
const raw = require('choo/html/raw');
const assets = require('../../common/assets');
const {
  bytes,
  copyToClipboard,
  list,
  percent,
  platform,
  timeLeft
} = require('../utils');
const expiryOptions = require('./expiryOptions');
const { passwordValidate } = require('../passwordValidator');

function expiryInfo(translate, archive) {
  const l10n = timeLeft(archive.expiresAt - Date.now());
  return raw(
    translate('archiveExpiryInfo', {
      downloadCount: translate('downloadCount', {
        num: archive.dlimit - archive.dtotal
      }),
      timespan: translate(l10n.id, l10n)
    })
  );
}

function passwordToggle(state) {
  return html`
    <div class="checkbox inline-block mr-3">
      <input
        id="add-password"
        type="checkbox"
        ${state.archive.password ? 'checked' : ''}
        autocomplete="off"
        onchange="${togglePasswordInput}"
      />
      <label for="add-password">
        ${state.translate('addPassword')}
      </label>
    </div>
  `;

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
      state.archive.password = null;
    }
  }
}

function passwordLabel(state) {
  return html`
    <div class="inline-block mr-3">
      <label for="password-input">
        ${state.translate('addPassword')}
      </label>
    </div>
  `;
}

function password(state, emit) {
  return html`
    <div class="mb-2 px-1">
      ${state.LIMITS.PASSWORD_REQUIRED
        ? passwordLabel(state)
        : passwordToggle(state)}
      <input
        id="password-input"
        class="${state.LIMITS.PASSWORD_REQUIRED || state.archive.password
          ? ''
          : 'invisible'} border rounded focus:border-blue-60 leading-normal my-1 py-1 px-2 h-8 dark:bg-grey-80"
        autocomplete="off"
        maxlength="32"
        type="password"
        oninput="${inputChanged}"
        onfocus="${focused}"
        placeholder="${state.translate('unlockInputPlaceholder')}"
        value="${state.archive.password || ''}"
      />
      <label
        id="password-msg"
        for="password-input"
        class="block text-xs text-grey-70"
        style="white-space: pre"
      ></label>
    </div>
  `;

  function inputChanged() {
    const passwordInput = document.getElementById('password-input');
    const pwdmsg = document.getElementById('password-msg');
    const uploadBtn = document.getElementById('upload-btn');
    const password = passwordInput.value;

    const errors = passwordValidate(
      password,
      state.LIMITS.PASSWORD_REQUIREMENTS_LIST
    );
    const errorMsg = errors
      .map(error => state.translate(error.translationKey, error.args))
      .reduce((current, next) => current + '\r\n' + next, '');
    if (errorMsg != '') {
      pwdmsg.textContent = errorMsg;
      uploadBtn.classList.add('btn-inactive');
      uploadBtn.onclick = null;
    } else {
      pwdmsg.textContent = '';
      uploadBtn.classList.remove('btn-inactive');
      uploadBtn.onclick = clickUpload(state, emit);
    }

    state.archive.password = password;
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
    <send-file class="flex flex-row items-center p-3 w-full">
      <svg class="h-8 w-8 text-white dark:text-grey-90">
        <use xlink:href="${assets.get('blue_file.svg')}#icon"/>
      </svg>
      <p class="ml-4 w-full">
        <h1 class="text-base font-medium word-break-all">${file.name}</h1>
        <div class="text-sm font-normal opacity-75 pt-1">${bytes(
          file.size
        )}</div>
      </p>
      ${action}
    </send-file>`;
}

function archiveInfo(archive, action) {
  return html`
    <p class="w-full flex items-center">
      <svg class="h-8 w-6 mr-3 flex-shrink-0 text-white dark:text-grey-90">
        <use xlink:href="${assets.get('blue_file.svg')}#icon"/>
      </svg>
      <p class="flex-grow">
        <h1 class="text-base font-medium word-break-all">${archive.name}</h1>
        <div class="text-sm font-normal opacity-75 pt-1">${bytes(
          archive.size
        )}</div>
      </p>
      ${action}
    </p>`;
}

function archiveDetails(translate, archive) {
  if (archive.manifest.files.length > 1) {
    return html`
      <details
        class="w-full pb-1"
        ${archive.open ? 'open' : ''}
        ontoggle="${toggled}"
      >
        <summary
          class="flex items-center link-blue text-sm cursor-pointer outline-none"
        >
          <svg
            class="fill-current w-4 h-4 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"
            />
          </svg>
          ${translate('fileCount', {
            num: archive.manifest.files.length
          })}
        </summary>
        ${list(archive.manifest.files.map(f => fileInfo(f)))}
      </details>
    `;
  }
  function toggled(event) {
    event.stopPropagation();
    archive.open = event.target.open;
  }
}

module.exports = function(state, emit, archive) {
  const copyOrShare =
    state.capabilities.share || platform() === 'android'
      ? html`
          <button
            class="link-blue self-end flex items-start"
            onclick=${share}
            title="Share link"
          >
            <svg class="h-4 w-4 mr-2">
              <use xlink:href="${assets.get('share-24.svg')}#icon" />
            </svg>
            Share link
          </button>
        `
      : html`
          <button
            class="link-blue focus:outline self-end flex items-center"
            onclick=${copy}
            title="${state.translate('copyLinkButton')}"
          >
            <svg class="h-4 w-4 mr-2">
              <use xlink:href="${assets.get('copy-16.svg')}#icon" />
            </svg>
            ${state.translate('copyLinkButton')}
          </button>
        `;
  const dl =
    platform() === 'web'
      ? html`
          <a
            class="flex items-baseline link-blue"
            href="${archive.url}"
            title="${state.translate('downloadButtonLabel')}"
            tabindex="0"
          >
            <svg class="h-4 w-3 mr-2">
              <use xlink:href="${assets.get('dl.svg')}#icon" />
            </svg>
            ${state.translate('downloadButtonLabel')}
          </a>
        `
      : html`
          <div></div>
        `;
  return html`
    <send-archive
      id="archive-${archive.id}"
      class="flex flex-col items-start rounded shadow-light bg-white p-4 w-full dark:bg-grey-90 dark:border dark:border-grey-70"
    >
      ${archiveInfo(
        archive,
        html`
          <input
            type="image"
            class="self-start flex-shrink-0 text-white hover:opacity-75 focus:outline"
            alt="${state.translate('deleteButtonHover')}"
            title="${state.translate('deleteButtonHover')}"
            src="${assets.get('close-16.svg')}"
            onclick=${del}
          />
        `
      )}
      <div class="text-sm opacity-75 w-full mt-2 mb-2">
        ${expiryInfo(state.translate, archive)}
      </div>
      ${archiveDetails(state.translate, archive)}
      <hr class="w-full border-t my-4 dark:border-grey-70" />
      <div class="flex justify-between w-full">
        ${dl} ${copyOrShare}
      </div>
    </send-archive>
  `;

  function copy(event) {
    event.stopPropagation();
    copyToClipboard(archive.url);
    const text = event.target.lastChild;
    text.textContent = state.translate('copiedUrl');
    setTimeout(
      () => (text.textContent = state.translate('copyLinkButton')),
      1000
    );
  }

  function del(event) {
    event.stopPropagation();
    emit('delete', archive);
  }

  async function share(event) {
    event.stopPropagation();
    if (platform() === 'android') {
      Android.shareUrl(archive.url);
    } else {
      try {
        await navigator.share({
          title: state.translate('-send-brand'),
          text: `Download "${archive.name}" with Firefox Send: simple, safe file sharing`,
          //state.translate('shareMessage', { name }),
          url: archive.url
        });
      } catch (e) {
        // ignore
      }
    }
  }
};

function clickUpload(state, emit) {
  return function(event) {
    window.scrollTo(0, 0);
    event.preventDefault();
    event.target.disabled = true;
    if (!state.uploading) {
      emit('upload');
    }
  };
}

module.exports.wip = function(state, emit) {
  return html`
    <send-upload-area
      class="flex flex-col bg-white h-full w-full dark:bg-grey-90"
      id="wip"
    >
      ${list(
        Array.from(state.archive.files)
          .reverse()
          .map(f =>
            fileInfo(f, remove(f, state.translate('deleteButtonHover')))
          ),
        'flex-shrink bg-grey-10 rounded-t overflow-y-auto px-6 py-4 md:h-full md:max-h-half-screen dark:bg-black',
        'bg-white px-2 my-2 shadow-light rounded dark:bg-grey-90 dark:border dark:border-grey-80'
      )}
      <div
        class="flex-shrink-0 flex-grow flex items-end p-4 bg-grey-10 rounded-b mb-1 font-medium dark:bg-grey-90"
      >
        <input
          id="file-upload"
          class="opacity-0 w-0 h-0 appearance-none absolute overflow-hidden"
          type="file"
          multiple
          onfocus="${focus}"
          onblur="${blur}"
          onchange="${add}"
        />
        <div
          for="file-upload"
          class="flex flex-row items-center justify-between w-full p-2"
        >
          <label
            for="file-upload"
            class="flex items-center cursor-pointer"
            title="${state.translate('addFilesButton')}"
          >
            <svg class="w-6 h-6 mr-2 link-blue">
              <use xlink:href="${assets.get('addfiles.svg')}#plus" />
            </svg>
            ${state.translate('addFilesButton')}
          </label>
          <div class="font-normal text-sm text-grey-70 dark:text-grey-40">
            ${state.translate('totalSize', {
              size: bytes(state.archive.size)
            })}
          </div>
        </div>
      </div>
      ${expiryOptions(state, emit)} ${password(state, emit)}
      <button
        id="upload-btn"
        class="btn rounded-lg flex-shrink-0 focus:outline
        ${state.LIMITS.PASSWORD_REQUIRED ? 'btn-inactive' : ''}"
        title="${state.translate('uploadButton')}"
        onclick="${state.LIMITS.PASSWORD_REQUIRED
          ? ''
          : clickUpload(state, emit)}"
      >
        ${state.translate('uploadButton')}
      </button>
    </send-upload-area>
  `;

  function focus(event) {
    event.target.nextElementSibling.firstElementChild.classList.add('outline');
  }

  function blur(event) {
    event.target.nextElementSibling.firstElementChild.classList.remove(
      'outline'
    );
  }

  function add(event) {
    event.preventDefault();
    const newFiles = Array.from(event.target.files);

    emit('addFiles', { files: newFiles });
    setTimeout(() => {
      document
        .querySelector('#wip > ul > li:first-child')
        .scrollIntoView({ block: 'center' });
    });
  }

  function remove(file, desc) {
    return html`
      <input
        type="image"
        class="self-center text-white ml-4 h-4 hover:opacity-75 focus:outline"
        alt="${desc}"
        title="${desc}"
        src="${assets.get('close-16.svg')}"
        onclick="${del}"
      />
    `;
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
    <send-upload-area
      id="${archive.id}"
      class="flex flex-col items-start rounded shadow-light bg-white p-4 w-full dark:bg-grey-90"
    >
      ${archiveInfo(archive)}
      <div class="text-xs opacity-75 w-full mt-2 mb-2">
        ${expiryInfo(state.translate, {
          dlimit: state.archive.dlimit,
          dtotal: 0,
          expiresAt: Date.now() + 500 + state.archive.timeLimit * 1000
        })}
      </div>
      <div class="link-blue text-sm font-medium mt-2">
        ${progressPercent}
      </div>
      <progress class="my-3" value="${progress}">${progressPercent}</progress>
      <button
        class="link-blue self-end font-medium"
        onclick=${cancel}
        title="${state.translate('deletePopupCancel')}"
      >
        ${state.translate('deletePopupCancel')}
      </button>
    </send-upload-area>
  `;

  function cancel(event) {
    event.stopPropagation();
    event.target.disabled = true;
    emit('cancel');
  }
};

module.exports.empty = function(state, emit) {
  const upsell =
    state.user.loggedIn || !state.capabilities.account
      ? ''
      : html`
          <button
            class="center font-medium text-sm link-blue mt-4 mb-2"
            onclick="${event => {
              event.stopPropagation();
              emit('signup-cta', 'drop');
            }}"
          ></button>
        `;
  return html`
    <send-upload-area
      class="flex flex-col items-center justify-center border-2 border-dashed border-grey-transparent rounded px-6 py-16 h-full w-full dark:border-grey-60"
      onclick="${e => {
        if (e.target.tagName !== 'LABEL') {
          document.getElementById('file-upload').click();
        }
      }}"
    >
      <svg class="w-10 h-10 link-blue">
        <use xlink:href="/${assets.get('addfiles.svg')}#plus" />
      </svg>
      <div class="pt-6 pb-2 text-center text-lg font-bold tracking-wide">
        ${state.translate('dragAndDropFiles')}
      </div>
      <div class="pb-6 text-center text-base">
        ${state.translate('orClickWithSize', {
          size: bytes(state.user.maxSize)
        })}
      </div>
      <input
        id="file-upload"
        class="opacity-0 w-0 h-0 appearance-none absolute overflow-hidden"
        type="file"
        multiple
        onfocus="${focus}"
        onblur="${blur}"
        onchange="${add}"
        onclick="${e => e.stopPropagation()}"
      />
      <label
        for="file-upload"
        role="button"
        class="btn rounded-lg flex items-center mt-4"
        title="${state.translate('addFilesButton', {
          size: bytes(state.user.maxSize)
        })}"
      >
        ${state.translate('addFilesButton')}
      </label>
      ${upsell}
    </send-upload-area>
  `;

  function focus(event) {
    event.target.nextElementSibling.classList.add('bg-blue-70', 'outline');
  }

  function blur(event) {
    event.target.nextElementSibling.classList.remove('bg-blue-70', 'outline');
  }

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
  const single = archive.manifest.files.length === 1;
  const details = single
    ? ''
    : html`
        <div class="mt-4 h-full md:h-48 overflow-y-auto">
          ${archiveDetails(state.translate, archive)}
        </div>
      `;
  return html`
    <send-archive
      class="flex flex-col max-h-full bg-white p-4 w-full md:w-128 dark:bg-grey-90"
    >
      <div class="border rounded py-3 px-6 dark:border-grey-70">
        ${archiveInfo(archive)} ${details}
      </div>
      <button
        id="download-btn"
        class="btn rounded-lg mt-4 w-full flex-shrink-0 focus:outline"
        title="${state.translate('downloadButtonLabel')}"
        onclick=${download}
      >
        ${state.translate('downloadButtonLabel')}
      </button>
    </send-archive>
  `;

  function download(event) {
    event.preventDefault();
    event.target.disabled = true;
    emit('download', archive);
  }
};

module.exports.downloading = function(state) {
  const archive = state.fileInfo;
  const progress = state.transfer.progressRatio;
  const progressPercent = percent(progress);
  return html`
    <send-archive
      class="flex flex-col bg-white rounded shadow-light p-4 w-full max-w-sm md:w-128 dark:bg-grey-90"
    >
      ${archiveInfo(archive)}
      <div class="link-blue text-sm font-medium mt-2">
        ${progressPercent}
      </div>
      <progress class="my-3" value="${progress}">${progressPercent}</progress>
    </send-archive>
  `;
};
