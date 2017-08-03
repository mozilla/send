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

- We use JavaScript to encrypt and decrypt files locally on the client instead of the server.
- We use JavaScript to render the user interface of Send.
- We use JavaScript to manage translate the website into [various different languages](https://github.com/mozilla/send#localization).
- We use JavaScript to collect data to help us improve Send in accordance with our [Terms &amp; Privacy](https://send.firefox.com/legal).

Since Send is an open source project, you can see all of the cool ways we use JavaScript by [examining our code](https://github.com/mozilla/send/).

## How long are files available for?

Files are available to be downloaded for 24 hours, after which they are removed
from the server.  They are also removed immediately after a download completes.

## Can a file be downloaded more than once?

Not currently, but we're considering multiple download support in a future
release.


*Disclaimer: Send is an experiment and under active development.  The answers
here may change as we get feedback from you and the project matures.*
