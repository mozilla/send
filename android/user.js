/* global Android */
import User from '../app/user';
import { deriveFileListKey } from '../app/fxa';

export default class AndroidUser extends User {
  constructor(storage) {
    super(storage);
  }

  async login() {
    Android.beginOAuthFlow();
  }

  async finishLogin(accountInfo) {
    const jwks = JSON.parse(accountInfo.keys);
    const ikm = jwks['https://identity.mozilla.com/apps/send'].k;
    const profile = {
      displayName: accountInfo.displayName,
      email: accountInfo.email,
      avatar: accountInfo.avatar,
      access_token: accountInfo.accessToken
    };
    profile.fileListKey = await deriveFileListKey(ikm);
    this.info = profile;
  }
}
