# Firefox Send is a brand name and should not be localized.
title = Firefox ناردن
siteFeedback = ڕەخنەوپێشنیار
importingFile = هـێنانەوە...
encryptingFile = بەهێماکرد...
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
notSupportedOutdatedDetail = بەداخەوە ئەم وەشانەی Firefox پشتگیری ئەو جۆرە تەکنەلۆژییە ناکات کە پێویستە بۆ Firefox Send. پێویستە وێبگەڕەکەت نوێبکەیتەوە.
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

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = سانا، بڵاوکەرەوەی پەڕگەی تایبەتیی
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
