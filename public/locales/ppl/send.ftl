# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Tay tina ipanpa
importingFile = Mukalaktia nemi…
encryptingFile = Kisenhinaya nemi…
decryptingFile = Kiajsimati nemi…
downloadCount =
    { $num ->
        [one] temultijtuk
       *[other] { $num } temultijtuk
    }
timespanHours =
    { $num ->
        [one] oraj
       *[other] { $num } oraj
    }
copiedUrl = Muishkupintuk!
unlockInputPlaceholder = Taketzalis ichtaka
unlockButtonLabel = Shikishtapu
downloadButtonLabel = Shiktemulti
downloadFinish = Shiktemulti muchi
fileSizeProgress = ({ $partialSize } ipal { $totalSize })
sendYourFilesLink = Shikwi Firefox Send
errorPageHeader = Te yajki yek!
fileTooBig = Ne tajkwilul sea wey pal tiktejkultia. Shiktemulti { $size } ush chupiuk chikitik.
linkExpiredAlt = Ilpika teuk yek
notSupportedHeader = Te tikishmatit ne taiwan titajtachia.
notSupportedLink = Taika te kishmatit ne taiwan nitajtachia?
notSupportedOutdatedDetail = Ini versión ipal Firefox tesu kipalewia ne tecnologíaj web kiyulitia Firefox Send. Nemi pal tikyanwkilia ne taiwan titajtachia.
updateFirefox = Shikyankwili Firefox
deletePopupCancel = Shilwi tesu
deleteButtonHover = Shikpulu
footerLinkLegal = Ipanpa ne tajtuli
footerLinkPrivacy = Tay ichtaka nemi
footerLinkCookies = Cookies
passwordTryAgain = Ne taketzalis ichtaka tesu yek. Shikejeku uksenpa.
javascriptRequired = Firefox Send kineki JavaScript
whyJavascript = Taika Firefox kineki JavaScript?
enableJavascript = Shichiwa ma JavaScript tekiti wan shikejeku uksenpa.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }h { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Keski weyak ne taketzalis ichtaka: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Te welit tiktaliat ini taketzalis ichtaka.

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Shiktitani
-firefox = Firefox
-mozilla = Mozilla
introTitle = Te uij wan ichtaka tikmajmaka se tajkwilul.
introDescription = { -send-brand } metzpalewia tikmajmaka se tajkwilul iwan ichtaka tajkwilulis wan se ilpika ka puliwi nemanha. Ijkiuni tikchiwa ka ichtaka tay tikmajmaka wan ka tesu naka senpa tay mupal tik matapan.
notifyUploadEncryptDone = Ne mutajkwilul nemi ichtaka tajkwilujtuk wan weli tiktitania
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Puliwi kwak tikajsi { $downloadCount } ush { $timespan }
timespanMinutes =
    { $num ->
        [one] minutoj
       *[other] minutoj
    }
timespanDays =
    { $num ->
        [one] tunal
       *[other] tunal
    }
timespanWeeks =
    { $num ->
        [one] semanaj
       *[other] semanaj
    }
fileCount =
    { $num ->
        [one] tajkwilul
       *[other] tajkwilul
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
totalSize = Keski itamachiwka: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Shikupina ne ilpika pal tikmajmaka muamaw:
copyLinkButton = Shikupina ne ilpika
downloadTitle = Shiktemulti tajkwilul
downloadDescription = Ini tajkwilul kimajmakket tik { -send-brand } iwan ichtaka tajkwilulis wan se ilpika ka puliwi nemanha.
trySendDescription = Shikejeku { -send-brand } pal tikmajmaka te uij wan ichtaka.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Semaya se tajkwilul tiweli tiktejkultia sansepa.
       *[other] Semaya { $count } tajkwilul tiweli tiktejkultia sansepa.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Semaya se amapial weli nemi.
       *[other] Semaya { $count } ajamapial welit nemit.
    }
expiredTitle = Ne ilpika pulijtuk.
notSupportedDescription = { -send-brand } tesu yawi tekiti iwan ne tay titajtachia. { -send-short-brand } tekiti sujsul yek iwan ne tipan versión ipal { -firefox }, wan tesu yawi tekiti iwan ne versión an kipiat achka muchi ne taiwan titajtachia.
downloadFirefox = Shiktemulti { -firefox }
legalTitle = { -send-short-brand } Tanawatilis ipal mupal ichtaka
legalDateStamp = Versión 1.0, tik marzoj 12, 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days } t { $hours } h { $minutes } m
addFilesButton = Shikpejpena ne tajkwilul ka tiktejkultia
uploadButton = Shiktejkulti
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Shiktilana wan shiktamima ne tajkwilul
addPassword = Shiktajpia iwan se taketzalis ichtaka
emailPlaceholder = Shiktali mucorreoj
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Shiktali mutukay pal tiktitania ashta { $size }
signInOnlyButton = Shiktali mutukay
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Shiktakuli tajtajkwilul ka { $size }
accountBenefitDownloadCount = Shiktakuli ne tajkwilul iwan seki
accountBenefitTimeLimit =
    { $count ->
        [one] Shikpia ne ilpika tatatuk 1 tunal
       *[other] Shikpia ne ilpika tatatuk { $count } tunal
    }
accountBenefitMoz = Shikmati ipanpa seuk itakil { -mozilla }
signOut = Shikisa
okButton = Yek
downloadingTitle = Kitemultia nemi
noStreamsWarning = Ne taiwan titachia te weli kineshtia ini tajkwilul wey
noStreamsOptionFirefox = Shikejeku ne taiwan tachia tikishwelitat
noStreamsOptionDownload = Ma ninemi senpa iwan ini taiwan nitachia
# the next line after the colon contains a file name
shareLinkDescription = Shiktakulia ne ilpika ipal ne mutajkwilul:
shareLinkButton = Shiktakuli ne ilpika
