# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Արձագանք
importingFile = Ներմուծում...
encryptingFile = Գաղտնագրում…
decryptingFile = Ապագաղտնագրում…
downloadCount =
    { $num ->
        [one] 1 ներբեռնում
       *[other] { $num } ներբեռնումներ
    }
timespanHours =
    { $num ->
        [one] 1 ժամ
       *[other] { $num } ժամ
    }
copiedUrl = Պատճենված
unlockInputPlaceholder = Գաղտնաբառ
unlockButtonLabel = Ապակողպել
downloadButtonLabel = Ներբեռնել
downloadFinish = Ներբեռնումն ավարտված է
fileSizeProgress = ({ $partialSize }-ը { $totalSize })-ից
sendYourFilesLink = Փորձել Firefox Send-ը
errorPageHeader = Ինչ-որ բան այն չէ
fileTooBig = Այդ ֆայլը չափազանց մեծ է վերբեռնելու համար: Այն պետք է լինի ավելի քիչ, քան { $size }-ը
linkExpiredAlt = Հղումը ավարտվել է
notSupportedHeader = Ձեր զննարկիչը չի աջակցվում:
notSupportedLink = Ինչու իմ զննարկիչը չի աջակցվում:
notSupportedOutdatedDetail = Դժբախտաբար, Firefox- ի այս տարբերակը չի աջակցում այն վեբ տեխնոլոգիան, որը պետք է Firefox Send-ի համար: Դուք պետք է թարմացնեք ձեր զննարկիչը:
updateFirefox = Թարմացնել Firefox-ը
deletePopupCancel = Չեղարկել
deleteButtonHover = Ջնջել
footerLinkLegal = Իրավական
footerLinkPrivacy = Գաղտնիություն
footerLinkCookies = Cookie-ներ
passwordTryAgain = Սխալ գաղտնաբառ. Կրկին փորձեք:
javascriptRequired = Firefox Send-ը պահանջում է JavaScript
whyJavascript = Ինչո՞ւ է Firefox Send-ը պահանջում JavaScript.
enableJavascript = Խնդրում ենք միացնել JavaScript-ը և կրկին փորձել:
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }ժ { $minutes }ր
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }ր
# A short status message shown when the user enters a long password
maxPasswordLength = Գանղտնաբառի առավելագույն չափ. { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Այս գաղտնաբառը հնարավոր չէ սահմանել

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Ուղարկել
-firefox = Firefox
-mozilla = Mozilla
introTitle = Պարզ, մասնավոր ֆայլերի փոխանակում
introDescription = { -send-brand }-ը թույլ է տալիս փոխանակել ֆայլեր վերջավոր գաղտնագրման միջոցով և այնպիսի հղում, որն ինքնաբերաբար ավարտվում է: Այսպիսով, դուք կարող եք վերահսկել այն, ինչով կիսվում եք և համոզված լինեք, որ ձեր նյութերը հավերժ չեն մնա առցանց:
notifyUploadEncryptDone = Ձեր ֆայլը գաղտնագրված է և պատրաստ է ուղարկել
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Ավարտվելու է { $downloadCount }-ից կամ { $timespan }-ից
timespanMinutes =
    { $num ->
        [one] 1 րոպե
       *[other] { $num } րոպե
    }
timespanDays =
    { $num ->
        [one] 1 օր
       *[other] { $num } օր
    }
timespanWeeks =
    { $num ->
        [one] 1 շաբաթ
       *[other] { $num } շաբաթ
    }
fileCount =
    { $num ->
        [one] 1 ֆայլ
       *[other] { $num } ֆայլեր
    }
# byte abbreviation
bytes = Բ
# kibibyte abbreviation
kb = ԿԲ
# mebibyte abbreviation
mb = ՄԲ
# gibibyte abbreviation
gb = ԳԲ
# localized number and byte abbreviation. example "2.5MB"
fileSize = { $num }{ $units }
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
totalSize = Ընդհանուր չափ՝ { $size }
# the next line after the colon contains a file name
copyLinkDescription = Պատճենեք հղումը՝ ֆայլը համօգտագործելու համար.
copyLinkButton = Պատճենել հղումը
downloadTitle = Ներբեռնել ֆայլերը
downloadDescription = Հայլը համօգտագործվել է { -send-brand }-ի միջոցով ՝ վերջից վերջ գաղտնագրմամբ և ինքնաբերաբար ավարտվող հղմամբ:
trySendDescription = Փորձեք { -send-brand }-ը՝ ֆայլերի պարզ և անվտանգ փոխանակման համար:
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Միաժամանակ միայն 1 ֆայլ կարող է վերբեռնվել:
       *[other] Միաժամանակ միայն { $count } ֆայլեր կարող են վերբեռնվել:
    }
