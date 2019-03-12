const html = require('choo/html');
const { list } = require('../../app/utils');
const archiveTile = require('../../app/ui/archiveTile');
const modal = require('../../app/ui/modal');
const intro = require('../../app/ui/intro');
const assets = require('../../common/assets');

module.exports = function(state, emit) {
  function onchange(event) {
    console.error('ONCHANGE');
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
    button = '';
  } else if (state.archive.numFiles > 0) {
    content = archiveTile.wip(state, emit);
    button = '';
  } else {
    content =
      archives.length < 1
        ? intro(state)
        : list(
            archives,
            'list-reset h-full overflow-y-auto w-full',
            'mb-3 w-full'
          );
  }

  return html`
    <main class="main">
      ${state.modal && modal(state, emit)}
      <section
        class="h-full w-full p-6 z-10 overflow-hidden md:flex md:flex-row md:rounded-lg md:shadow-big"
      >
        ${content}
      </section>
      <div class="fixed pin-r pin-b z-20">
        ${button}
        <input
          class="hidden"
          id="file-upload"
          name="file-upload"
          type="file"
          onchange="${onchange}"
          onclick="${e => e.stopPropagation()}"
        />
      </div>
    </main>
  `;
};
