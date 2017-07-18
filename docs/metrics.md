# Send Metrics
The metrics collection and analysis plan for Send, a forthcoming Test Pilot experiment.

## Analysis
Data collected by Send will be used to answer the following high-level questions:

- Do users send files?
	- How often? How many?
	- What is the retention?
	- What is the distribution of senders?
- How do recipients interact with promotional UI elements?
	- Are file recipients converted to file senders?
	- Are non-Firefox users converted to Firefox users?
- Where does it go wrong?
	- How often are there errors in uploading or downloading files?
	- What types of errors to users commonly see?
	- At what point do errors affect retention?

## Collection
Data will be collected with Google Analytics and follow [Test Pilot standards](https://github.com/mozilla/testpilot/blob/master/docs/experiments/ga.md) for reporting.

### Custom Metrics
- `cm1` - the size of the file, in bytes.
- `cm2` - the amount of time it took to complete the file transfer, in milliseconds. Only include if the file completed transferring (ref: `cd2`).
- `cm3` - the rate of the file transfer, in bytes per second. This is computed by dividing `cm1` by `cm2`, not by monitoring transfer speeds. Only include if the file completed transferring (ref: `cd2`).
- `cm4` - the amount of time until the file will expire, in milliseconds.
- `cm5` - the number of files the user has ever uploaded.
- `cm6` - the number of unexpired files the user has uploaded.
- `cm7` - the number of files the user has ever downloaded.

### Custom Dimensions
- `cd1` - the method by which the user initiated an upload. One of `drag`, `click`.
- `cd2` - the reason that the file transfer stopped. One of `completed`, `errored`, `cancelled`.
- `cd3` - the destination of a link click. One of `experiment-page`, `download-firefox`, `twitter`, `github`, `cookies`, `terms`, `privacy`, `about`, `legal`, `mozilla`.
- `cd4` - from where the URL for a file was copied. One of `finished-screen`, `file-list`.
- `cd5` - the referring location. One of `completed-download`, `errored-download`, `cancelled-download`, `completed-upload`, `errored-upload`, `cancelled-upload`, `testpilot`, `external`.
- `cd6` - the location from which the user copied the URL to an upload file. One of `success-screen`, `upload-list`.
- `cd7` - identifying information about an error. Exclude if there is no error involved. **TODO:** enumerate a list of possibilities.

### Events

_NB:_ due to how files are being tracked, there are no events indicating file expiry. This carries some risk: most notably, we can only derive expiration rates by looking at download rates, which is prone to skew if there are problems in data collection.

#### `upload-started`
Triggered whenever a user begins uploading a file. Includes:

- `ec` - `sender`
- `ea` - `upload-started`
- `cm1`
- `cm5`
- `cm6`
- `cm7`
- `cd1`
- `cd5`

#### `upload-stopped`
Triggered whenever a user stops uploading a file. Includes:

- `ec` - `sender`
- `ea` - `upload-stopped`
- `cm1`
- `cm2`
- `cm3`
- `cm5`
- `cm6`
- `cm7`
- `cd1`
- `cd2`
- `cd7`

#### `download-started`
Triggered whenever a user begins downloading a file. Includes:

- `ec` - `recipient`
- `ea` - `download-started`
- `cm1`
- `cm4`
- `cm5`
- `cm6`
- `cm7`

#### `download-stopped`
Triggered whenever a user stops downloading a file.

- `ec` - `recipient`
- `ea` - `download-stopped`
- `cm1`
- `cm2` (if possible and applicable)
- `cm3` (if possible and applicable)
- `cm5`
- `cm6`
- `cm7`
- `cd2`
- `cd7`

#### `exited`
Fired whenever a user follows a link external to Send.

- `ec` - `recipient`, `sender`, or `other`, as applicable.
- `ea` - `exited`
- `cd3`

#### `upload-deleted`
Fired whenever a user deletes a file they’ve uploaded.

- `ec` - `sender`
- `ea` - `upload-deleted`
- `cm1`
- `cm2`
- `cm3`
- `cm4`
- `cm5`
- `cm6`
- `cm7`
- `cd1`

#### `copied`
Fired whenever a user copies the URL of an upload file.

- `ec` - `sender`
- `ea` - `copied`
- `cd6`

#### `restarted`
Fired whenever the user interrupts any part of funnel to return to the start of it (e.g. with a “send another file” or “send your own files” link).

- `ec` - `recipient`, `sender`, or `other`, as applicable.
- `ea` - `restarted`
- `cd2`

#### `unsupported`
Fired whenever a user is presented a message saying that their browser is unsupported due to missing crypto APIs.

- `ec` - `sender`
- `ea` - `unsupported`
- `cd7`
