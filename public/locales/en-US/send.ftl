# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteSubtitle = web experiment
siteFeedback = Feedback
uploadPageHeader = Private, Encrypted File Sharing
uploadPageExplainer = Send files through a safe, private, and encrypted link that automatically expires to ensure your stuff does not remain online forever.
uploadPageLearnMore = Learn more
uploadPageDropMessage = Drop your file here to start uploading
uploadPageSizeMessage = For the most reliable operation, it’s best to keep your file under 1GB
uploadPageBrowseButton = Select a file on your computer
uploadPageBrowseButton1 = Select a file to upload
uploadPageMultipleFilesAlert = Uploading multiple files or a folder is currently not supported.
uploadPageBrowseButtonTitle = Upload file
uploadingPageProgress = Uploading { $filename } ({ $size })
importingFile = Importing…
verifyingFile = Verifying…
encryptingFile = Encrypting…
decryptingFile = Decrypting…
notifyUploadDone = Your upload has finished.
uploadingPageMessage = Once your file uploads you will be able to set expiry options.
uploadingPageCancel = Cancel upload
uploadCancelNotification = Your upload was cancelled.
downloadCancel = Cancel download
uploadingPageLargeFileMessage = This file is large and may take a while to upload. Sit tight!
uploadingFileNotification = Notify me when the upload is complete.
uploadSuccessConfirmHeader = Ready to Send
uploadSvgAlt = Upload
uploadSuccessTimingHeader = The link to your file will expire after 1 download or in 24 hours.
expireInfo = The link to your file will expire after { $downloadCount } or { $timespan }.
frontPageExpireInfo = Expires after { $downloadCount } or { $timespan }
downloadCount = { $num ->
        [one] 1 download
       *[other] { $num } downloads
    }
timespanHours = { $num ->
        [one] 1 hour
       *[other] { $num } hours
    }
timespanMinutes = { $num ->
        [one] 1 minute
       *[other] { $num } minutes
    }
timespanWeeks = { $num ->
        [one] 1 week
       *[other] { $num } weeks
    }
fileCount = { $num ->
    [one] 1 file
   *[other] { $num } files
}
copyUrlFormLabelWithName = Copy and share the link to send your file: { $filename }
copyUrlFormButton = Copy to clipboard
copiedUrl = Copied!
deleteFileButton = Delete file
sendAnotherFileLink = Send another file
# Alternative text used on the download link/button (indicates an action).
downloadAltText = Download
downloadsFileList = Downloads
# Used as header in a column indicating the amount of time left before a
# download link expires (e.g. "10h 5m")
timeFileList = Time
# Used as header in a column indicating the number of times a file has been
# downloaded
downloadFileName = Download { $filename }
downloadFileSize = ({ $size })
unlockInputLabel = Enter Password
unlockInputPlaceholder = Password
unlockButtonLabel = Unlock
downloadFileTitle = Download Encrypted File
# Firefox Send is a brand name and should not be localized.
downloadMessage = Your friend is sending you a file with Firefox Send, a service that allows you to share files with a safe, private, and encrypted link that automatically expires to ensure your stuff does not remain online forever.
# Text and title used on the download link/button (indicates an action).
downloadButtonLabel = Download
downloadNotification = Your download has completed.
downloadFinish = Download Complete
# This message is displayed when uploading or downloading a file, e.g. "(1,3 MB of 10 MB)".
fileSizeProgress = ({ $partialSize } of { $totalSize })
# Firefox Send is a brand name and should not be localized.
sendYourFilesLink = Try Firefox Send
downloadingPageProgress = Downloading { $filename } ({ $size })
downloadingPageMessage = Please leave this tab open while we fetch your file and decrypt it.
errorAltText = Upload error
errorPageHeader = Something went wrong!
errorPageMessage = There has been an error uploading the file.
errorPageLink = Send another file
fileTooBig = That file is too big to upload. It should be less than { $size }.
# count will always be > 10
tooManyFiles = { $count ->
    *[other] Only { $count } files can be uploaded at a time.
}
# count will always be > 10
tooManyArchives = { $count ->
    *[other] Only { $count } archives are allowed.
}
linkExpiredAlt = Link expired
expiredPageHeader = This link has expired or never existed in the first place!
notSupportedHeader = Your browser is not supported.
# Firefox Send is a brand name and should not be localized.
notSupportedDetail = Unfortunately this browser does not support the web technology that powers Firefox Send. You’ll need to try another browser. We recommend Firefox!
notSupportedLink = Why is my browser not supported?
notSupportedOutdatedDetail = Unfortunately this version of Firefox does not support the web technology that powers Firefox Send. You’ll need to update your browser.
updateFirefox = Update Firefox
downloadFirefoxButtonSub = Free Download
uploadedFile = File
copyFileList = Copy URL
# expiryFileList is used as a column header
expiryFileList = Expires In
deleteFileList = Delete
nevermindButton = Never mind
legalHeader = Terms & Privacy
legalNoticeTestPilot = Firefox Send is currently a Test Pilot experiment, and subject to the Test Pilot <a>Terms of Service</a> and <a>Privacy Notice</a>. You can learn more about this experiment and its data collection <a>here</a>.
legalNoticeMozilla = Use of the Firefox Send website is also subject to Mozilla’s <a>Websites Privacy Notice</a> and <a>Websites Terms of Use</a>.
deletePopupText = Delete this file?
deletePopupYes = Yes
deletePopupCancel = Cancel
deleteButtonHover = Delete
copyUrlHover = Copy URL
footerLinkLegal = Legal
# Test Pilot is a proper name and should not be localized.
footerLinkAbout = About Test Pilot
footerLinkPrivacy = Privacy
footerLinkTerms = Terms
footerLinkPrivacyAndTerms = Privacy & Terms
footerLinkCookies = Cookies
requirePasswordCheckbox = Require a password to download this file
addPasswordButton = Add password
changePasswordButton = Change
passwordTryAgain = Incorrect password. Try again.
reportIPInfringement = Report IP Infringement
javascriptRequired = Firefox Send requires JavaScript
whyJavascript = Why does Firefox Send require JavaScript?
enableJavascript = Please enable JavaScript and try again.
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }d { $hours }h { $minutes }m
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }h { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when a password is successfully set
passwordIsSet = Password set
# A short status message shown when the user enters a long password
maxPasswordLength = Maximum password length: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = This password could not be set
pageHeaderCredits = from the makers of Firefox
addFilesButton = Add file(s)
uploadFilesButton = Send
uploadFileProgress = Sending
uploadDropDragMessage = Drop files here
uploadDropClickMessage = or click to select a file
addPasswordMessage = Protect with password
addPasswordLabel = Password:
copyUrlLabel = Copy and share this link:
passwordReminder = don't forget the password too
signInPromoText = Sign In/Up
signInExplanation = It's free and you can send bigger files.
signInLearnMore = Learn more!
downloadProgressButton = Downloading... { $progress }
downloadMessage2 = Firefox Send lets you share files with a safe, private, and encrypted link that automatically expires to ensure your stuff does not remain online forever.
signInEmailEnter = Enter your Email
emailEntryPlaceholder = Email
signInContinueMessage = to continue to Firefox Send
signInContinueButton = Continue
signInMenuOption = Sign in/up
accountMenuOption = Firefox Account
accountBenefitTitle = With a free Firefox Account with Send you can:
accountBenefitLargeFiles = Upload larger files (up to { $size })
accountBenefitExpiry = Have more expiry options
accountBenefitSync = Manage your uploads across devices
manageAccount = Manage Account
logOut = Sign Out
okButton = Ok
