# Common Code

This directory contains code loaded by both the frontend `app` and backend `server`. The code here can be challenging to understand at first because the contexts for the two (three counting the dev server) environments that include them are quite different, but the purpose of these modules are quite simple, to provide mappings from the source assets (`copy-16.png`) to the concrete production assets (`copy-16.db66e0bf.svg`).

## Generate Asset Map

This loader enumerates all the files in `assets/` so that `common/assets.js` can provide mappings from the source filename to the hashed filename used on the site.