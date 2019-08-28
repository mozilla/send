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

## Amplitude Schema

Please see, **See Amplitude HTTP API**(https://amplitude.zendesk.com/hc/en-us/articles/204771828) for HTTP API reference.

## Metric Events

In support of our KPIs we collect events from two separate contexts, server and client. The events are designed to have minimal correlation between contexts.

Server events collect lifecycle information about individual uploads but no user information; also time precision is truncated to hour increments. Client events collect information about how users interact with the UI but no upload identifiers.

### Server Events

Server events allow us to aggregate data about file lifecycle without collecting data about individual users. In this context `user_id` and `user_properties` describe the uploaded archive.

* `session_id` -1 (not part of a session)
* `user_id` hash of (archive_id + owner_id)
* `app_version` package.json version
* `time` timestamp truncated to hour precision
* `country`
* `region`
* `event_type` [server_upload | server_download | server_delete]
* `user_properties`
  * `download_limit` set number of downloads
  * `time_limit` set expiry duration
  * `size` approximate size (log10)
  * `anonymous` true if anonymous, false if fxa
* `event_properties`
  * `download_count` downloads completed
  * `ttl` time remaining before expiry truncated to hour
  * `agent` the browser name or first 6 characters of the user agent that made the request

### Client Events

Client events allow us to aggregate data about how the user interface is being used without tracking the lifecycle of individual files. In this context `user_id` and `user_properties` describe the user. The `user_id` and `device_id` change for all users at the beginning of each month.

* `session_id` timestamp
* `user_id` hash of (fxa_id + Date.year + Date.month)
* `device_id` hash of (localStorage random id + Date.year + Date.month)
* `platform` [web | android]
* `country`
* `region`
* `language`
* `time` timestamp
* `os_name`
* `event_type` [client_visit | client_upload | client_download | client_delete | client_login | client_logout]
* `event_properties`
  * `browser`
  * `browser_version`
  * `status` [ ok | error | cancel ]
  * Event specific properties (see below)
* `user_properties`
  * `active_count` number of active uploads
  * `anonymous` true if anonymous, false if fxa
  * `experiments` list of experiment ids the user is participating in
  * `first_action` how this use came to Send the first time [ upload | download ]

#### Visit Event

  * `entrypoint` [ upload | download ]

#### Upload Event

  * `download_limit` download limit
  * `file_count` number of files
  * `password_protected` boolean
  * `size` approximate size (log10)
  * `time_limit` time limit
  * `duration` approximate transfer duration (log10)

#### Download Event

  * `password_protected` boolean
  * `size` approximate size (log10)
  * `duration` approximate transfer duration (log10)

#### Delete Event

  * `age` hours since uploaded
  * `downloaded` downloaded at least once

#### Login Event

  * `trigger` [button | time | count | size]

#### Logout Event

  * `trigger` [button | timeout]
