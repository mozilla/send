/* eslint-disable no-console */

import User from '../user';
import storage from '../../app/storage';

export default function initialState(state, emitter) {
  const files = [];

  Object.assign(state, {
    prefix: '/android_asset',
    user: new User(storage),
    getAsset(name) {
      return `${state.prefix}/${name}`;
    },
    sentry: {
      captureException: e => {
        console.error('ERROR ' + e + ' ' + e.stack);
      }
    },
    storage: {
      files,
      remove: function(fileId) {
        console.log('REMOVE FILEID', fileId);
      },
      writeFile: function(file) {
        console.log('WRITEFILE', file);
      },
      addFile: function(file) {
        console.log('addfile' + JSON.stringify(file));
        files.push(file);
        emitter.emit('pushState', `/share/${file.id}`);
      },
      totalUploads: 0
    },
    transfer: null,
    uploading: false,
    settingPassword: false,
    passwordSetError: null,
    route: '/'
  });
}
