# Send V2 Metrics Definitions

## Key Value Prop

Quickly and privately transfer large files from any device to any device.

## Key Business Question to Answer

Is the value proposition of a large encrypted file transfer service enough to drive Firefox Account relationships for non-Firefox users.

## Hypotheses to Test

### Primary - In support of Relationships KPI

We believe that a privacy-respecting file transfer service can drive Firefox Accounts beyond the Firefox Browser.

We will know this to be true when we see 250k Firefox Account creations from non-Firefox contexts w/in six months of launch.

### Secondary - In support of Revenue KPI

We believe that a privacy respecting service accessible beyond the reach of Firefox will provide a valuable platform to research, communicate with, and market to conscious choosers we have traditionally found hard to reach.

We will know this to be true when we can conduct six research tasks (surveys, A/B tests, fake doors, etc) in support of premium services KPIs in the first six months after launch.

## Overview of Key Measures

* Number of people using the service to send and receive files
  * Why: measure of service size. Important for understanding addressable market size
* Percent of users who have or create an FxAccount via Send
  * Why: representation of % of any service users who might be amenable to an upsell
* % of downloaders who convert into uploaders
  * Why: represents a measure of our key growth-loop potential
* Count of uploads and size
  * Why: Represents cost of service on a running basis

## Key Funnels
* App Open or Visit `--- DESIRED OUTCOME --->` Successful Upload
* Download UI Visit `--- DESIRED OUTCOME --->` Successful Download
* FxA UI Engagement `--- DESIRED OUTCOME --->` Authenticate
* **STRETCH** App Open or Visit `--- DESIRED OUTCOME --->` Successful Download

## Complete Schema


Please see, **See Amplitude HTTP API**(https://amplitude.zendesk.com/hc/en-us/articles/204771828) for HTTP API reference.

### Event Structure

* `app_version` **string** ∙ app version `Android 1.5` or `Web 1.2.5`
* `country` **string** ∙ Can be captured using [FxA Geo Library](https://github.com/mozilla/fxa-geodb)
* `device_id` **string** ∙ required, should be a unique hash
* `event_properties` **dictionary** ∙ [see list below](#event-properties)
* `event_type` **string** ∙ [see list below](#events)
* `insert_id` **string** ∙ unique event id used by amplitude to dedupe events
* `language` **string** ∙ App language
* `os_name` **string** ∙ `Mac OS X`, `iOS`, `Windows`, etc.
* `os_version` **string** ∙ `10.01`, `400`, etc
* `region` **string** ∙ Can be captured using [FxA Geo Library](https://github.com/mozilla/fxa-geodb)
* `session_id` **long** ∙ start time in ms since epoch (this should only be changed at the start of a session, but sent with each ping), set to -1 if event is out of session, such as expiration
* `time` **long** ∙ The timestamp of the event in milliseconds since epoch
* `user_id` **string** ∙ required unless device ID is present, should be a double hash of FxA email
* `user_properties` **dictionary** ∙ [see list below](#user-properties). All user properties can be passed with all events. Amplitude will automatically drop user properties that do not change

### User Properties

* `Has account` **boolean** ∙ whether the user is account active
* `First action` **string** ∙ did this user `upload` or `download` first
* `Total uploads` **num** ∙ running sum of bundles uploaded
* `Total upload size` **float** ∙ running sum of total MB uploaded
* `Total downloads` **num** ∙ running count of bundles downloaded
* `Total download size` **float** ∙ running sum of total MB downloaded
* `Total clients` **num** ∙ running tally of total clients sharing a UID
* `Current uploads` **int** ∙ count of current unexpired files
* `User agent Browser` **string** ∙ browser or if app `App` derived from UA string
* `User Agent version` **string** ∙ browser version or if app `App Version` derived from UA string
* `UTM campaign` **string** ∙ referrer
* `UTM content` **string** ∙ referrer
* `UTM medium` **string** ∙ referrer
* `UTM source` **string** ∙ referrer
* `UTM term` **string** ∙ referrer
* `Experiments` **array of strings** ∙ set of experiments the user is in

### Event Properties

1. `Bundle id` **string** ∙ Guid for bundle
2. `Bundle creation timestamp` **long** ∙ The timestamp of bundle creation in milliseconds since epoch
3. `Number of files` **int** ∙ Number of files in bundle
4. `Size of files` **float** ∙ Size of files in MB
5. `Transfer rate` **float** ∙ rate of transfter in bytes per second
6. `Total downloads` **int** ∙ number of downloads set
7. `Total duration` **string** ∙ Time for bundle expiry, one of `5 minutes` `one hour` etc
8. `Password added` **boolean** ∙ Did the user add a password to the bundle
9. `Remaining downloads` **int** ∙ number of remaining downloads for a file
10. `Remaining time` **long** ∙ time until a bundle expires
11. `Reason transfer stopped` **string** ∙ One of `completed`, `errored` or `canceled`
12. `FxA prompt trigger` **string** ∙ One of `time options`, `count options`, `bundle size`, `shoulder button`
13. `Location of URL copy` **string** ∙ Where did the user copy the share url `success-screen` or `upload-list`
14. `Site exit path` **string** ∙ Name of external link followed ... `download-firefox`, `twitter`, `github`, `cookies`, `terms`, `privacy`, `about`, `legal`, `mozilla`
15. `Expiry reason` **string** ∙ one of `time limit hit`, `download limit hit`, `user deleted`
16. `Error code` **String** ∙ Error code if added

### Event Types

 The following list is of required `event_type` definitions. If adding new event types please use the syntax `Group - verb subject modifier`

| Event | Event Properties | Description |
|-------|------------------|-------------|
| `{ Uploader, Downloader, Unsupported } - visit` | `none` | When a user visits the site, or opens the app, grouped by interface at open. Note, a number of API properties and User Properties should be set with this event |
|`{ Uploader, Downloader, Unsupported } - exit` | `none` | When a user exits the site via click event on a link that directs to another domain |
| `Uploader - start bundle upload` | `1, 2, 3, 4, 6, 7, 8, 16 (if applicable)` | When a user begins to upload a bundle for the site |
| `Uploader - stop bundle upload` | `1, 2, 3, 4, 5, 6, 7, 8, 11, 16 (if applicable)` | When a user stops an upload or an upload stops for any reason |
| `Uploader - delete bundle` | `1, 2, 3, 4, 6, 7, 8, 9, 10` | When a user deletes their bundle |
| `Uploader - copy bundle url` | `1, 13` | When a user copies the url of a bundle they create |
| `Uploader - dismiss copy bundle dialog` | `1` | When a user dismisses the bundle copy dialog |
| `{ Uploader, Downloader } - start bundle download` | `1, 2, 3, 4, 6, 7, 8, 9, 10, 16 (if applicable)` | When a user begins to download a bundle. Remaining downloads should be decremented after event. |
| `{ Uploader, Downloader } - stop bundle download` | `1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 16 (if applicable)` | When a a download ends for any reason |
| `Downloader - click try send cta` | `1` | When a downloader clicks the prompt to try Firefox Send |
| `Downloader - unlock bundle success` | `1` | When a downloader successfully unlocks a file |
| `Downloader - unlock bundle failure` | `1` | When a downloader fails to unlock a file (only send once per session) |
| `Uploader - trigger signup cta` | `12` | When an uploader triggers the CTA via change to expiry options |
| `Signup - interact with email` | `12` | when a user inputs anything into the email submission form |
| `Signup - cancel signup` | `12` | When a user opts out of signing up |
| `Signup - submit signup` | `12` | When a user submits a sign up to fxa and we begin OAuth dance |
| `Server - expire bundle` | `1, 2, 3, 4, 6, 7, 8, 9, 10, 15` | when the server expires a bundle for any reason |
| `Error` | `16` | Fallback event for any errors that occur. Use the error code event property to specify an error type |
