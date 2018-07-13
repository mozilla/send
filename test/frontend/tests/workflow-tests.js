import assert from 'assert';
import FileSender from '../../../app/fileSender';
import FileReceiver from '../../../app/fileReceiver';

const headless = /Headless/.test(navigator.userAgent);
const noSave = !headless; // only run the saveFile code if headless

// FileSender uses a File in real life but a Blob works for testing
const blob = new Blob(['hello world!'], { type: 'text/plain' });
blob.name = 'test.txt';

describe('Upload / Download flow', function() {
  it('can only download once by default', async function() {
    const fs = new FileSender(blob);
    const file = await fs.upload();
    const fr = new FileReceiver({
      secretKey: file.toJSON().secretKey,
      id: file.id,
      nonce: file.keychain.nonce,
      requiresPassword: false
    });
    await fr.getMetadata();
    await fr.download(noSave);
    try {
      await fr.download(noSave);
      assert.fail('downloaded again');
    } catch (e) {
      assert.equal(e.message, '404');
    }
  });

  it('downloads with the correct password', async function() {
    const fs = new FileSender(blob);
    const file = await fs.upload();
    await file.setPassword('magic');
    const fr = new FileReceiver({
      secretKey: file.toJSON().secretKey,
      id: file.id,
      url: file.url,
      nonce: file.keychain.nonce,
      requiresPassword: true,
      password: 'magic'
    });
    await fr.getMetadata();
    await fr.download(noSave);
    assert.equal(fr.state, 'complete');
  });

  it('blocks invalid passwords from downloading', async function() {
    const fs = new FileSender(blob);
    const file = await fs.upload();
    await file.setPassword('magic');
    const fr = new FileReceiver({
      secretKey: file.toJSON().secretKey,
      id: file.id,
      url: file.url,
      nonce: file.keychain.nonce,
      requiresPassword: true,
      password: 'password'
    });
    try {
      await fr.getMetadata();
      assert.fail('got metadata with bad password');
    } catch (e) {
      assert.equal(e.message, '401');
    }
    try {
      // We can't decrypt without IV from metadata
      // but let's try to download anyway
      await fr.download();
      assert.fail('downloaded file with bad password');
    } catch (e) {
      assert.equal(e.message, '401');
    }
  });

  it('retries a bad nonce', async function() {
    const fs = new FileSender(blob);
    const file = await fs.upload();
    const fr = new FileReceiver({
      secretKey: file.toJSON().secretKey,
      id: file.id,
      nonce: null, // oops
      requiresPassword: false
    });
    await fr.getMetadata();
    assert.equal(fr.fileInfo.name, blob.name);
  });

  it('can cancel the upload', async function() {
    const fs = new FileSender(blob);
    const up = fs.upload();
    fs.cancel(); // before encrypting
    try {
      await up;
      assert.fail('not cancelled 1');
    } catch (e) {
      assert.equal(e.message, '0');
    }
    fs.reset();
    fs.once('encrypting', () => fs.cancel());
    try {
      await fs.upload();
      assert.fail('not cancelled 2');
    } catch (e) {
      assert.equal(e.message, '0');
    }
    fs.reset();
    fs.once('progress', () => fs.cancel());
    try {
      await fs.upload();
      assert.fail('not cancelled 3');
    } catch (e) {
      assert.equal(e.message, '0');
    }
  });

  it('can cancel the download', async function() {
    const fs = new FileSender(blob);
    const file = await fs.upload();
    const fr = new FileReceiver({
      secretKey: file.toJSON().secretKey,
      id: file.id,
      nonce: file.keychain.nonce,
      requiresPassword: false
    });
    await fr.getMetadata();
    fr.once('progress', () => fr.cancel());
    try {
      await fr.download(noSave);
      assert.fail('not cancelled');
    } catch (e) {
      assert.equal(e.message, '0');
    }
  });

  it('can cancel and not increase download count', async function() {
    const fs = new FileSender(blob);
    const file = await fs.upload();
    const fr = new FileReceiver({
      secretKey: file.toJSON().secretKey,
      id: file.id,
      nonce: file.keychain.nonce,
      requiresPassword: false
    });
    await fr.getMetadata();
    fr.once('progress', () => fr.cancel());

    try {
      await fr.download(noSave);
      assert.fail('not cancelled');
    } catch (e) {
      await file.updateDownloadCount();
      assert.equal(file.dtotal, 0);
    }
  });

  it('can allow multiple downloads', async function() {
    const fs = new FileSender(blob);
    const file = await fs.upload();
    const fr = new FileReceiver({
      secretKey: file.toJSON().secretKey,
      id: file.id,
      nonce: file.keychain.nonce,
      requiresPassword: false
    });
    await file.changeLimit(2);
    await fr.getMetadata();
    await fr.download(noSave);
    await file.updateDownloadCount();
    assert.equal(file.dtotal, 1);

    await fr.download(noSave);
    await file.updateDownloadCount();
    assert.equal(file.dtotal, 2);
    try {
      await fr.download(noSave);
      assert.fail('downloaded too many times');
    } catch (e) {
      assert.equal(e.message, '404');
    }
  });

  it('can delete the file before download', async function() {
    const fs = new FileSender(blob);
    const file = await fs.upload();
    const fr = new FileReceiver({
      secretKey: file.toJSON().secretKey,
      id: file.id,
      nonce: file.keychain.nonce,
      requiresPassword: false
    });
    await file.del();
    try {
      await fr.getMetadata();
      assert.fail('file still exists');
    } catch (e) {
      assert.equal(e.message, '404');
    }
  });
});
