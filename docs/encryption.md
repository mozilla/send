# File Encryption

Send use 128-bit AES-GCM encryption via the [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) to encrypt files in the browser before uploading them to the server. The code is in [app/keychain.js](../app/keychain.js).

## Steps

### Uploading

1. A new secret key is generated with `crypto.getRandomValues`
2. The secret key is used to derive 3 more keys via HKDF SHA-256
    - an encryption key for the file (AES-GCM)
    - an encryption key for the file metadata (AES-GCM)
    - a signing key for request authentication (HMAC SHA-256)
3. The file and metadata are encrypted with their corresponding keys
4. The encrypted data and signing key are uploaded to the server
5. An owner token and the share url are returned by the server and stored in local storage
6. The secret key is appended to the share url as a [#fragment](https://en.wikipedia.org/wiki/Fragment_identifier) and presented to the UI

### Downloading

1. The browser loads the share url page, which includes an authentication nonce
2. The browser imports the secret key from the url fragment
3. The same 3 keys as above are derived
4. The browser signs the nonce with it's signing key and requests the metadata
5. The encrypted metadata is decrypted and presented on the page
6. The browser makes another authenticated request to download the encrypted file
7. The browser downloads and decrypts the file
8. The file prompts the save dialog or automatically saves depending on the browser settings

### Passwords

A password may optionally be set to authenticate the download request. When a password is set the following steps occur.

#### Sender

1. The original signing key derived from the secret key is discarded
2. A new signing key is generated via PBKDF2 from the user entered password and the full share url (including secret key fragment)
3. The new key is sent to the server, authenticated by the owner token
4. The server stores the new key and marks the record as needing a password

#### Downloader

1. The browser loads the share url page, which includes an authentication nonce and indicator that the file requires a password
2. The user is prompted for the password and the signing key is derived
3. The browser requests the metadata using the key to sign the nonce
4. If the password was correct the metadata is returned, otherwise a 401
