# Send V2 UX Mobile Acceptance and Spec Annotations

`Date Created: 8/20/2018`

## Acceptance Criteria

Adapted from [this spreadsheet](https://airtable.com/shrkcBPOLkvNFOrpp)

- [ ] It should look and feel of an Android App
- [ ] It should look and feel like the Firefox Send Web Client

### Main Screen
- [ ] It should clearly Indicate the name of the product
- [ ] If user has no existing Sends, it should make clear the primary benefits of the service (private, e2e encrypted, self-destructing file sharing)
- [ ] It should allow users to access the file picker to create Send links
- [ ] If the user has existing Sends, it should display a card-based list view of each [see Cards section below]

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

### Cards
- [ ] It should display the name of the sent file/files
- [ ] It should display the time remaining before expiration
- [ ] It should display the number of downloads remaining before expiration
- [ ] It should have a button that lets the user copy the send link to their clipboard
- [ ] It should show a preview icon (not a thumbnail) that has some relationship to the file types or content being sent* (see 5.1 in spec)
- [ ] It should have an overflow (meatball) menu that when triggered, gives the user share or delete buttons
- [ ] While encrypting / pushing to server, it should display a progress meter and a cancel button
- [ ] For authenticated users, it should be expandable to display all files in a send (5.1.1)
- [ ] If user cancels Send, or Upload fails, it should display a warning in the card
- [ ] It should display expired Sends below current sends with their UI greyed out and an expiration warning for 24 hours after expiration
- [ ] It should remove expired cards from display after 24 hours
- [ ] It should let users permanently delete records expired sends
- [ ] It should display a visual indicator when a Send is password protected
- [ ] It should allow the user to share via a native Android share sheet
- [ ] It should allow me to create Send links through intents from other apps

### General/other
- [ ] It should allow users to set passwords to protect their Sends
- [ ] It should warn users when they are trying to upload files larger than their share limit

### Stretch
- [ ] It should allow users to use the photo gallery to create Send links
- [ ] It should allow users to use their camera to create Send links
- [ ] It should allow users to opt into notification when a share link expires
- [ ] It should allow users to opt into notifications when their link is downloaded

## Annotations on Mobile Spec
This document tracks differences between the UX spec for Firefox Send and the intended MVP.

[Spec Link](https://mozilla.invisionapp.com/share/GNN6KKOQ5XS)

* 1.1: Spec describes toolbar which may not be possible given the application framework we're using. In particular, issues with the spec include the color, logo and different font weights may be at issue.
* 1.2: Spec's treatment of FxA UI may be difficult to match. We should use the default OAuth implementation and re-evaluate UX once we see an implementation demo. Also, the landing page UI should display a log-in CTA directly and not require users click into the the hamburger menu.
* 2.1: MVP will only include file picker. Signed in users will be able to select multiple files. File selection flow will be Android-native. Probably don't have the ability to add notifications as in the last screen on this page.
* 2.1: @fzzzy will provide screenshots of this flow for UX evaluation and comment.
* 3.1.4: The spec shows deleting the last item in an unshared set returning the user to the picker menu. Instead, it should return to the app home page.
* 3.1.5: Same as 3.1.5 notes. Both cases should show the warning dialog.
* 4.1: We may not be able to do a thumbnail here. Instead we should specify a set of icons to be displayed.
* 6.3: We're not going to allow cards to be edited. This page is deprecated.
* 6.4: Swiping cards to delete is stretched.
* 6.5: We're not 100% sure what happens on network connectivity errors, we should test this and adapt UX as necessary.
* 7.1: The last screen on this page depicts a network error notification on the selection screen. Instead the user should hit the send button, be taken back to the cards and display the card as in 5.1.2
* 7.3: May not be necessary...we can ask for permissions on install.
* 8.1: Notifications do not block launch
