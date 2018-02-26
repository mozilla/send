import assert from 'assert';
import FileSender from '../../../app/fileSender';

// FileSender uses a File in real life but a Blob works for testing
const blob = new Blob(['hello world!'], { type: 'text/plain' });
blob.name = 'text.txt';

describe('FileSender', function() {
  describe('upload', function() {
    it('returns an OwnedFile on success', async function() {
      const fs = new FileSender(blob);
      const file = await fs.upload();
      assert.ok(file.id);
      assert.equal(file.name, blob.name);
    });
  });
});
