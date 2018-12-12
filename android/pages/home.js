const html = require('choo/html');
const { list } = require('../../app/utils');
const archiveTile = require('../../app/ui/archiveTile');
const modal = require('../../app/ui/modal');
const intro = require('../../app/ui/intro');
const assets = require('../../common/assets');

module.exports = function(state, emit) {
  function onchange(event) {
    event.preventDefault();
    const newFiles = Array.from(event.target.files);

    emit('addFiles', { files: newFiles });
  }

  function onclick() {
    document.getElementById('file-upload').click();
  }

  const archives = state.storage.files
    .filter(archive => !archive.expired)
    .map(archive => archiveTile(state, emit, archive))
    .reverse();

  let content = '';
  let button = html`
    <div
      class="bg-blue rounded-full m-4 flex items-center justify-center shadow-lg"
      style="width: 56px; height: 56px"
      onclick="${onclick}"
    >
      <img src="${assets.get('add.svg')}" />
    </div>
  `;
  if (state.uploading) {
    content = archiveTile.uploading(state, emit);
  } else if (state.archive) {
    content = archiveTile.wip(state, emit);
    button = '';
  } else {
    content =
      archives.length < 1
        ? intro(state)
        : list(archives, 'list-reset h-full overflow-y-scroll', 'mb-3');
  }

  return html`
    <main class="flex relative h-full">
      ${state.modal && modal(state, emit)} ${content}
      <div class="fixed pin-r pin-b">
        ${button}
        <input
          id="file-upload"
          class="hidden"
          type="file"
          multiple
          onchange="${onchange}"
          onclick="${e => e.stopPropagation()}"
        />
      </div>
    </main>
  `;
};
