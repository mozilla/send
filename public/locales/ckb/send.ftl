# Send is a brand name and should not be localized.
title = Send
siteFeedback = ڕەخنەوپێشنیار
importingFile = هاوردەکردن...
encryptingFile = بەهێماکردن...
decryptingFile = هێمالابردن...
downloadCount =
    { $num ->
        [one] 1 داگرتن
       *[other] { $num } داگرتن
    }
timespanHours =
    { $num ->
        [one] 1 کاژێر
       *[other] { $num } کاژێر
    }
copiedUrl = لەبەرگیرا!
unlockInputPlaceholder = وشەی تێپەڕبوون
unlockButtonLabel = کردنەوە
downloadButtonLabel = داگرتن
downloadFinish = داگرتن تەواو  بوو
fileSizeProgress = ({ $partialSize } لە { $totalSize })
sendYourFilesLink = Firefox ناردن تاقیبکەرەوە
errorPageHeader = هەڵەیەک ڕوویدا
fileTooBig = ئەم پەڕگەیە زۆر گەورەیە بۆ بارکردن. پێویستە لە { $size } بچووک تر بێت
linkExpiredAlt = بەستەر بەسەرچووە
notSupportedHeader = وێبگەڕەکەت پشتگیری ناکرێت
notSupportedLink = بۆ وێبگەڕەکەم پشتگیری ناکرێت؟
notSupportedOutdatedDetail = بەداخەوە ئەم وەشانەی Firefox پشتگیری ئەو جۆرە تەکنەلۆژییە ناکات کە پێویستە بۆ Send. پێویستە وێبگەڕەکەت نوێبکەیتەوە.
updateFirefox = فاەرفۆکس نوێبکەرەوە
deletePopupCancel = پاشگەزبوونەوە
deleteButtonHover = سڕینەوە
footerLinkLegal = یاسایی
footerLinkPrivacy = تایبەتیی
footerLinkCookies = شەکرۆکە
passwordTryAgain = وشەی تێپەڕبوون هەڵەیە. هەوڵ بدەرەوە.
javascriptRequired = فارفۆکسی ناردن پێویستە بە JavaScript هەیە
whyJavascript = بۆچی پێویستی بە JavaScript هەیە؟
enableJavascript = تکایە JavaScript چالاک بکە وهەوڵ بدەرەوە.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }ک { $minutes }خ
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }خ
# A short status message shown when the user enters a long password
maxPasswordLength = زۆرترین درێژی وشەی تێپەڕی ڕێگەپێدراو: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = ناتوانرێت وشەی تێپەڕ دابنرێت

## Send version 2 strings

# Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = سانا، بڵاوکەرەوەی پەڕگەی تایبەتیی
introDescription = { -send-brand } ڕێگەت دەدات پەڕگەکان بڵاوبکەیتەوە بە شێوەی هێما کردنی کۆتا-بۆ-کۆتا و بەستەرێک کە خۆکارانە بەسەردەچێت. بۆیە دەتوانیت ئاگاداری ئەوە بیت کە چ پەڕگەیەک بە تایبەتی بڵاودەکەیتەوە و دڵنیادەبیتەوە کە شتەکانت بە سەرهێڵی نامێننەوە هەتا کۆتایی.
notifyUploadEncryptDone = پەڕگەیە بەهێماکراوە ئێستا ئامادەیە بۆ ناردن
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = بەسەردەچێت دووای { $downloadCount } یان { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 خولەک
       *[other] { $num } خولەک
    }
timespanDays =
    { $num ->
        [one] 1 ڕؤژ
       *[other] { $num } ڕۆژ
    }
timespanWeeks =
    { $num ->
        [one] 1 هەفتە
       *[other] { $num } هەفتە
    }
fileCount =
    { $num ->
        [one] 1 پەڕگە
       *[other] { $num } پەڕگە
    }
# byte abbreviation
bytes = بایت
# kibibyte abbreviation
kb = ک.بایت
# mebibyte abbreviation
mb = م.بایت
# gibibyte abbreviation
gb = گ.بایت
# localized number and byte abbreviation. example "2.5MB"
fileSize = { $num }{ $units }
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
totalSize = قەبارەی گشتی: { $size }
# the next line after the colon contains a file name
copyLinkDescription = بەستەر لەبەربگرەوە بۆ بڵاوکردنەوەی پەڕگە:
copyLinkButton = بەستەر لەبەربگرەوە
downloadTitle = پەڕگەکان دابگرە
downloadDescription = ئەم پەڕگەیە لە لایەن { -send-brand } بلاوکراوەتەوە کە بەهێماکراوە بە شێوەی کۆتا-بۆ-کۆتا بە بەستەرێک کە خۆکارانە بەسەردەچێت.
trySendDescription = { -send-brand } تاقیبکەرەوە بۆ سانایی، پارێزراو لە بڵاوکردنەوەی پەڕگە.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] تەنها 1 پەڕگە دەتوانیت باربکەیت لەم کاتەدا.
       *[other] تەنها { $count } پەڕگە دەتوانی باربکەیت لەم کاتەدا.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] تەنها 1 ئەرشیف ڕێپێدراوە.
       *[other] تەنها { $count } ئەرشیف ڕێپێدراوە.
    }
expiredTitle = بەستەر بەسەرچووە.
notSupportedDescription = { -send-brand } کارنکات لەگەڵ ئەم وێبگەڕە. { -send-short-brand } باش کاردەکات لەگەڵ کۆتا وەشانی { -firefox }، وکاردەکات لەگەڵ زۆربەی وەشانی ئێستای وێبگەڕەکان.
downloadFirefox = { -firefox } دابگرە
legalTitle = تێبینی تایبەتیی { -send-short-brand }
legalDateStamp = وەشان 1.0، بەروار کراو لە 12 ئازار، 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days } ڕ { $hours } ک{ $minutes } خ
addFilesButton = پەڕگەکان هەڵبژێرە بۆ بارکردن
uploadButton = بارکردن
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = ڕاکێشان و دانانی پەڕگەکان
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = یان کرتە بکە بۆ ناردنی قەبارەی تاوەکوو { $size }
addPassword = بپارێزە لەگەڵ وشەی تێپەڕ
emailPlaceholder = پۆستی ئەلکترۆنی بنووسە
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = بچۆژوورەوە بۆ ناردنی قەبارەی تاوەکوو { $size }
signInOnlyButton = بچۆژوورەوە
accountBenefitTitle = هەژماری { -firefox } درووست بکە یان بچۆژوورەوە
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = پەڕگە بڵاوبکەرەوە تاوەکوو قەبارەی { $size }
accountBenefitDownloadCount = پەڕگەکان لەگەڵ خەڵکی زیاتر بڵاوبکەرەوە
accountBenefitTimeLimit =
    { $count ->
        [one] بەستەرەکان بەکارایی بهێڵەوە تا 1 ڕۆژ
       *[other] بەستەرەکان بەکارایی بهێڵەوە تا { $count } ڕۆژ
    }
accountBenefitSync = پەڕگە بڵآوکراوەکان بەڕێوەبەرە لەهەر ئامێرێکەوە
accountBenefitMoz = زیاتر بزانە دەربارەی خزمەتگوزارییەکانی تری { -mozilla }
signOut = بچۆ دەرەوە
okButton = باشە
downloadingTitle = دادەگیرێت...
noStreamsWarning = لەوانەیە ئەم وێبگەڕە نەتوانێت پەڕگەی وا گەورە بە هێما بکات.
noStreamsOptionCopy = بەستەر لەبەربگرەوە بۆ کردنەوەی لە وێبگەڕێکی تر
noStreamsOptionFirefox = وێبگەڕی دڵخوازی ئێمە تاقیبکەرەوە
noStreamsOptionDownload = بەردەوام بە لەگەڵ ئەم وێبگەڕە
downloadFirefoxPromo = { -send-short-brand } پیشکەش کراوە بە تۆ لە لایەن { -firefox }.
# the next line after the colon contains a file name
shareLinkDescription = بەستەر بڵاوبکەرەوە بۆ پەڕگەکەت:
shareLinkButton = بەستەر بڵاوبکەرەوە
# $name is the name of the file
shareMessage = “{ $name }” دابگرە لەگەڵ { -send-brand }: سانا، پاریزراو لە بڵاوکردنەوەی پەڕگە
trailheadPromo = ڕێگەیەک هەیە بۆ پارێزگاریکردنی تایبەتێتی خۆت. بەشدار بە لە فایەرفۆکس.
learnMore = زیاتر بزانە
