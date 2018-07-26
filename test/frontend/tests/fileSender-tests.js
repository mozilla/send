import assert from 'assert';
import FileSender from '../../../app/fileSender';
import Archive from '../../../app/archive';

// FileSender uses a File in real life but a Blob works for testing
const blob = new Blob(['hello world!'], { type: 'text/plain' });
blob.name = 'text.txt';
const archive = new Archive([blob]);

describe('FileSender', function() {
  describe('upload', function() {
    it('returns an OwnedFile on success', async function() {
      const fs = new FileSender(archive);
      const file = await fs.upload();
      assert.ok(file.id);
      assert.equal(file.name, archive.name);
    });
  });
});
