# Send is a brand name and should not be localized.
title = Send
siteFeedback = Feedback
importingFile = Importing…
encryptingFile = Encrypting…
decryptingFile = Decrypting…
downloadCount =
    { $num ->
        [one] 1 pag-download
       *[other] { $num } na mga pag-download
    }
copiedUrl = Naikopya!
unlockInputPlaceholder = Password
unlockButtonLabel = I-unlock
downloadButtonLabel = I-download
downloadFinish = Kumpleto ang Download
fileSizeProgress = ({ $partialSize } ng { $totalSize })
sendYourFilesLink = Subukan ang Firefox Ipadala
errorPageHeader = May nagkamali!
fileTooBig = Ang file na iyon ay masyadong malaki upang mag-upload. Dapat itong mas mababa sa { $size }.
linkExpiredAlt = Nag-expire na ang link
notSupportedHeader = Ang iyong browser ay hindi suportado.
notSupportedLink = Bakit hindi suportado ang aking browser?
notSupportedOutdatedDetail = Sa kasamaang palad ang bersyon na ito ng Firefox ay hindi sumusuporta sa teknolohiya ng web na nagpapagana ng Send. Kailangan mong i-update ang iyong browser.
updateFirefox = I-update ang Firefox
deletePopupCancel = Kanselahin
deleteButtonHover = I-delete
footerLinkLegal = Legal
footerLinkPrivacy = Privacy
footerLinkCookies = Mga cookie
passwordTryAgain = Maling password. Subukan muli.
javascriptRequired = Nangangailangan ang Send ng JavaScript
whyJavascript = Bakit ang Send ay nangangailangan ng JavaScript?
enableJavascript = Mangyaring paganahin ang JavaScript at subukan muli.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }h { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Pinakamataas na haba ng password: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Hindi maitakda ang password na ito

## Send version 2 strings

# Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox send
-send-short-brand = I-send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Simple, pribadong pagbabahagi ng file
notifyUploadEncryptDone = Ang iyong file ay naka-encrypt at handa na i-send
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = mag-e-expire pagkatapos { $downloadCount } o { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 minuto
       *[other] { $num } mga minuto
    }
timespanDays =
    { $num ->
        [one] 1 araw
       *[other] { $num } mga araw
    }
timespanWeeks =
    { $num ->
        [one] 1 linggo
       *[other] { $num } mga linggo
    }
fileCount =
    { $num ->
        [one] 1 file
       *[other] { $num } mga file
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
totalSize = Kabuuang sukat: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Kopyahin ang link upang ibahagi ang iyong file:
copyLinkButton = Kopyahin ang link
downloadTitle = I-download ang mga file
expiredTitle = Ang link na ito ay nag-expire.
downloadFirefox = I-download { -firefox }
legalTitle = { -send-short-brand } Abiso sa Privacy
legalDateStamp = Bersyon 1.0, petsa ng Marso 12, 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }d { $hours }h { $minutes }m
addFilesButton = Piliin ang mga file na mai-upload
uploadButton = I-upload
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = I-drag at i-drop ang mga file
addPassword = Protektahan gamit ang password
emailPlaceholder = Ipasok ang iyong email
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Mag-sign in upang magpadala ng hanggang sa { $size }
signInOnlyButton = Mag sign-in
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Ibahagi ang mga file hanggang sa { $size }
accountBenefitDownloadCount = Ibahagi ang mga file sa ibang tao
accountBenefitMoz = Alamin ang tungkol sa iba pang mga serbisyo ng { -mozilla }
signOut = Mag sign-out
okButton = OK
downloadingTitle = Pag-download
noStreamsWarning = Maaaring hindi mai-decrypt ng browser na ito ang isang file na malaki.
noStreamsOptionCopy = Kopyahin ang link upang buksan sa isa pang browser
noStreamsOptionFirefox = Subukan ang aming paboritong browser
noStreamsOptionDownload = Magpatuloy sa browser na ito
shareLinkButton = Ibahagi ang link
learnMore = Matuto ng higit pa.
