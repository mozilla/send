# Firefox Send is a brand name and should not be localized.
title = Firefox Send
importingFile = Importing…
encryptingFile = Encrypting…
decryptingFile = Decrypting…
downloadCount =
    { $num ->
        [one] 1 download
       *[other] { $num } downloads
    }
timespanHours =
    { $num ->
        [one] 1 hour
       *[other] { $num } hours
    }
copiedUrl = Copied!
unlockInputPlaceholder = Password
unlockButtonLabel = Unlock
downloadButtonLabel = Download
downloadFinish = Download Complete
fileSizeProgress = ({ $partialSize } of { $totalSize })
sendYourFilesLink = Try Firefox Send
errorPageHeader = Something went wrong!
fileTooBig = That file is too big to upload. It should be less than { $size }.
linkExpiredAlt = Link expired
notSupportedHeader = Your browser is not supported.
notSupportedLink = Why is my browser not supported?
notSupportedOutdatedDetail = Unfortunately this version of Firefox does not support the web technology that powers Firefox Send. You’ll need to update your browser.
updateFirefox = Update Firefox
deletePopupCancel = Cancel
deleteButtonHover = Delete
footerLinkLegal = Legal
footerLinkPrivacy = Privacy
footerLinkCookies = Cookies
passwordTryAgain = Incorrect password. Try again.
javascriptRequired = Firefox Send requires JavaScript
whyJavascript = Why does Firefox Send require JavaScript?
enableJavascript = Please enable JavaScript and try again.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }h { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Maximum password length: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = This password could not be set

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Simple, private file sharing
introDescription = { -send-brand } lets you share files with end-to-end encryption and a link that automatically expires. So you can keep what you share private and make sure your stuff doesn’t stay online forever.
notifyUploadEncryptDone = Your file is encrypted and ready to send
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Expires after { $downloadCount } or { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 minute
       *[other] { $num } minutes
    }
timespanDays =
    { $num ->
        [one] 1 day
       *[other] { $num } days
    }
timespanWeeks =
    { $num ->
        [one] 1 week
       *[other] { $num } weeks
    }
fileCount =
    { $num ->
        [one] 1 file
       *[other] { $num } files
    }
# byte abbreviation
bytes = B
# kibibyte abbreviation
kb = KB
# mebibyte abbreviation
mb = MB
# gibibyte abbreviation
gb = GB
# localized number and byte abbreviation. example "2.5MB"
fileSize = { $num }{ $units }
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
totalSize = Total size: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Copy the link to share your file:
copyLinkButton = Copy link
downloadTitle = Download files
downloadDescription = This file was shared via { -send-brand } with end-to-end encryption and a link that automatically expires.
trySendDescription = Try { -send-brand } for simple, safe file sharing.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Only 1 file can be uploaded at a time.
       *[other] Only { $count } files can be uploaded at a time.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Only 1 archive is allowed.
       *[other] Only { $count } archives are allowed.
    }
expiredTitle = This link has expired.
notSupportedDescription = { -send-brand } will not work with this browser. { -send-short-brand } works best with the latest version of { -firefox }, and will work with the current version of most browsers.
downloadFirefox = Download { -firefox }
legalTitle = { -send-short-brand } Privacy Notice
legalDateStamp = Version 1.0, dated March 12, 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }d { $hours }h { $minutes }m
addFilesButton = Select files to upload
trustWarningMessage = Make sure you trust your recipient when sharing sensitive data.
uploadButton = Upload
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Drag and drop files
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = or click to send up to { $size }
addPassword = Protect with password
emailPlaceholder = Enter your email
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Sign in to send up to { $size }
signInOnlyButton = Sign in
accountBenefitTitle = Create a { -firefox } Account or sign in
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Share files up to { $size }
accountBenefitDownloadCount = Share files with more people
accountBenefitTimeLimit =
    { $count ->
        [one] Keep links active for up to 1 day
       *[other] Keep links active for up to { $count } days
    }
accountBenefitSync = Manage shared files from any device
accountBenefitMoz = Learn about other { -mozilla } services
signOut = Sign out
okButton = OK
downloadingTitle = Downloading
noStreamsWarning = This browser might not be able to decrypt a file this big.
noStreamsOptionCopy = Copy the link to open in another browser
noStreamsOptionFirefox = Try our favourite browser
noStreamsOptionDownload = Continue with this browser
downloadFirefoxPromo = { -send-short-brand } is brought to you by the all-new { -firefox }.
# the next line after the colon contains a file name
shareLinkDescription = Share the link to your file:
shareLinkButton = Share link
# $name is the name of the file
shareMessage = Download “{ $name }” with { -send-brand }: simple, safe file sharing
trailheadPromo = There is a way to protect your privacy. Join Firefox.
learnMore = Learn more.
downloadFlagged = This link has been disabled for violating the terms of service.
downloadConfirmTitle = One more thing
downloadConfirmDescription = Make sure you trust the person who sent you this file because we can’t verify that it will not harm your device.
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
downloadTrustCheckbox =
    { $count ->
        [one] I trust the person who sent this file
       *[other] I trust the person who sent these files
    }
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
reportFile =
    { $count ->
        [one] Report this file as suspicious
       *[other] Report these files as suspicious
    }
reportDescription = Help us understand what’s going on. What do you think is wrong with these files?
reportUnknownDescription = Please go to the URL of the link you wish to report and click “{ reportFile }”.
reportButton = Report
reportReasonMalware = These files contain malware or are part of a phishing attack.
reportReasonPii = These files contain personally identifiable information about me.
reportReasonAbuse = These files contain illegal or abusive content.
reportReasonCopyright = To report copyright or trademark infringement, use the process described at <a>this page</a>.
reportedTitle = Files Reported
reportedDescription = Thank you. We have received your report on these files.
