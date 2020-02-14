# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Արձագանք
importingFile = Ներմուծում...
encryptingFile = Գաղտնագրում…
decryptingFile = Վերծանում…
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
linkExpiredAlt = Հղումն ավարտված է
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
introDescription = { -send-brand }-ը թույլ է տալիս փոխանակել ֆայլեր ծայրից ծայր գաղտնագրման միջոցով և այնպիսի հղում, որն ինքնաբերաբար ավարտվում է: Այսպիսով, դուք կարող եք վերահսկել այն, ինչով կիսվում եք և համոզված լինեք, որ ձեր նյութերը հավերժ չեն մնա առցանց:
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
downloadDescription = Հայլը համօգտագործվել է { -send-brand }-ի միջոցով ՝ ծայրից ծայր գաղտնագրմամբ և ինքնաբերաբար ավարտվող հղմամբ:
trySendDescription = Փորձեք { -send-brand }-ը՝ ֆայլերի պարզ և անվտանգ փոխանակման համար:
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Միաժամանակ միայն 1 ֆայլ կարող է վերբեռնվել:
       *[other] Միաժամանակ միայն { $count } ֆայլեր կարող են վերբեռնվել:
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Միայն 1 արխիվ է թույլատրված:
       *[other] Միայն { $count } արխիվներ են թույլատրված:
    }
expiredTitle = Այս հղումն ավարտված է:
notSupportedDescription = { -send-brand }-ը չի աշխատի այս զննարկչի հետ: { -send-short-brand }-ը լավագույն կերպով աշխատում է { -firefox }-ի վերջին տարբերակի հետ և կաշխատի զննարկիչների մեծամասնության վերջին տարբերակների հետ:
downloadFirefox = Ներբեռնել { -firefox }-ը
legalTitle = { -send-short-brand }-ի Գաղտնիության ծանուցում
legalDateStamp = Տարբերակ 1.0, թվագրված՝ 2019 թ. մարտի 12-ով
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }օր { $hours }ժ { $minutes }ր
addFilesButton = Ընտրեք ֆայլեր՝ վերբեռնելու համար
uploadButton = Վերբեռնել
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Քաշեք և գցեք ֆայլերը
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = կամ կտտացրեք`ուղարկելու համար մինչև { $size }
addPassword = Պաշտպանեք գաղտնաբառով
emailPlaceholder = Մուտքագրեք ձեր էլ. փոստը
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Մուտք գործեք՝ { $size } ուղարկելու համար
signInOnlyButton = Մուտք գործել
accountBenefitTitle = Ստեղծեք { -firefox } հաշիվ կամ մուտք գործեք
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Կիսվեք մինչև { $size } ֆայլերով
accountBenefitDownloadCount = Կիսվեք ֆայլերով ավելի շատ մարդկանց հետ
accountBenefitTimeLimit =
    { $count ->
        [one] Հղումներն ակտիվ պահել մինչև 1 օր
       *[other] Հղումներն ակտիվ պահել մինչև { $count } օր
    }
accountBenefitSync = Կառավարեք համօգտագործվող ֆայլերը ցանկացած սարքից
accountBenefitMoz = Իմացեք { -mozilla }-ի այլ ծառայությունների մասին
signOut = Դուրս գրվել
okButton = Լավ
downloadingTitle = Ներբեռնվում է
noStreamsWarning = Այս զննարկիչը չի կարողանա վերծանել այսպիսի մեծ ֆայլը
noStreamsOptionCopy = Պատճենեք հղումը`այլ զննարկիչում բացելու համար
noStreamsOptionFirefox = Փորձեք մեր սիրած զննարկիչը
noStreamsOptionDownload = Շարունակեք այս զննարկիչով
downloadFirefoxPromo = { -send-short-brand }-ը ձեզ է առաջարկում ամբողջովին նոր { -firefox }:
# the next line after the colon contains a file name
shareLinkDescription = Կիսվեք ձեր ֆայլի հղումով.
shareLinkButton = Համօգտագործել հղումը
# $name is the name of the file
shareMessage = Ներբեռնեք “{ $name }”-ը { -send-brand }-ով ՝ պարզ և ապահով՝ ֆայլերի համօգտագործում
trailheadPromo = Ձեր գաղտնիությունը պաշտպանելու միջոց կա: Միացեք Firefox- ին:
learnMore = Իմանալ ավելին
