## How big of a file can I transfer with Firefox Send?

There is a 2GB file size limit built in to Send, however, in practice you may
be unable to send files that large.  Send encrypts and decrypts the files in
the browser which is great for security but will tax your system resources.  In
particular you can expect to see your memory usage go up by at least the size
of the file when the transfer is processing.  You can see [the results of some
testing](https://github.com/mozilla/send/issues/170#issuecomment-314107793).
For the most reliable operation on common computers, it’s probably best to stay
under a few hundred megabytes.

## Why is my browser not supported?

We’re using the [Web Cryptography JavaScript API with the AES-GCM
algorithm](https://www.w3.org/TR/WebCryptoAPI/#aes-gcm) for our encryption.
Many browsers support this standard and should work fine, but some have not
implemented it yet (mobile browsers lag behind on this, in
particular).

## Why does Firefox Send require JavaScript?

Firefox Send uses JavaScript to:

- Encrypt and decrypt files locally on the client instead of the server.
- Render the user interface.
- Manage translations on the website into [various different languages](https://github.com/mozilla/send#localization).
- Collect data to help us improve Send in accordance with our [Terms & Privacy](https://send.firefox.com/legal).

Since Send is an open source project, you can see all of the cool ways we use JavaScript by [examining our code](https://github.com/mozilla/send/).

## How long are files available for?

Files are available to be downloaded for 24 hours, after which they are removed
from the server.  They are also removed immediately once the download limit is reached.

## Can a file be downloaded more than once?

Yes, once a file is submitted to Send you can select the download limit.


*Disclaimer: Send is an experiment and under active development.  The answers
here may change as we get feedback from you and the project matures.*
