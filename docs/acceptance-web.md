# Send V2 UX Web Acceptance Criteria

## General

- [ ] It should match the spec provided.
- [ ] It should have a feedback button
- [ ] It should provide links to relevant legal documentation

### Non-Authenticated Users

- [ ] It should make clear the benefits of a Firefox Account
- [ ] It should allow users to log into or create a Firefox account
- [ ] It should allow users to select and send multiple files in one URL
- [ ] It should limit the sendable file size to 1GB
- [ ] It should allow users to set an expiration time of 5 minutes, 1 hour, or 24 hours
- [ ] It should allow users to set an download count of 1 downloads

### Authenticated Users

- [ ] It should indicate that the user is signed in via Firefox Account
- [ ] It should allow the user to sign out
- [ ] It should allow users to select and send multiple files in one URL
- [ ] It should limit users to sending 2.5GB per Send
- [ ] It should allow users to extend Send times up to 1 Week
- [ ] It should allow users to extend Send download counts up to 100 times

### Main Screen

- [ ] It should clearly indicate the name of the product
- [ ] If user has no existing Sends, it should make clear the primary benefits of the service (private, e2e encrypted, self-destructing file sharing)
- [ ] It should allow users to access the file picker to create Send links
- [ ] It should allow users to drag and drop files
- [ ] It should provide affordances to sign in to Send
- [ ] If the user has existing Sends, it should display a card-based list view of each

### Upload UI

- [ ] It should allow users to continue to add files to their upload up to a set limit
- [ ] It should allow users to set a password
- [ ] It should let users delete items from their upload bundle

### Uploading UI

- [ ] It should display an affordance to demonstrate the status of an upload

### Share UI

- [ ] It should provide a copiable URL to the bundle

### Download UI

- [ ] It should prompt the user for a password if one is required
- [ ] It should provide feedback for incorrect passwords
- [ ] It should provide a description of Send to make clear what this service is
- [ ] It should let the user see the files they are downloading
- [ ] It should let the user download their files

### Download Complete UI

- [ ] It should indicate that a download is complete
- [ ] It should provide a description of the Send service
- [ ] It should provide a link back to the upload UI

### Expiry UI

- [ ] It should provide a generic message indicating a share has expired
- [ ] It should allow the user to navigate back to the upload page

### In Memory DL Page

- [ ] It should show in case a user tries to download a large file on a suboptimal client
- [ ] It should suggest the user use Firefox
- [ ] It should let the user copy the download url