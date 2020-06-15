# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Tay tina ipanpa?
importingFile = Mukalaktia nemi…
encryptingFile = Tikinayat tinemit…
decryptingFile = Tikpuat tinemit…
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
unlockButtonLabel = Shiktapua
downloadButtonLabel = Shiktemulti
downloadFinish = Senkiska mutemultij
fileSizeProgress = ({ $partialSize } ipal { $totalSize })
sendYourFilesLink = Shikejeku Firefox Send
errorPageHeader = IJtakawtuk!
fileTooBig = Ini tajkwilul sujsul etek pal tiktejkultia. Ma nemi san { $size }.
linkExpiredAlt = Ne ilpika tzuntamik
notSupportedHeader = Te tikishmatit ne mutachialuni.
notSupportedLink = Taika te ankishmatit nutachialuni?
notSupportedOutdatedDetail = Ini tamakalis ipal Firefox tesu kimati ne tzawaltekitilis ne kiyulitia Firefox Send. Nemi pal tikyankwilia ne mutachialuni.
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
maxPasswordLength = Keski weyak ne taketzalis-ichtaka: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Te welit tiktaliat ini taketzalis ichtaka.

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Shiktitani
-firefox = Firefox
-mozilla = Mozilla
introTitle = Te uij wan ichtaka tikmajmaka se tajkwilul.
introDescription = { -send-brand } metzpalewia tiktakulia se tajkwilul iwan ichtakatajkwilulis wan se ilpika ka puliwi nemanha. Ijkiuni nemi ichtaka tay tikmajmaka wan tesu naka senpa tik matapan tay mupal.
notifyUploadEncryptDone = Ne mutajkwilul nemi ichtakatajkwilujtuk wan weli tiktitania
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
copyLinkDescription = Shikupina ne ilpika pal tiktakulia mutajkwilul:
copyLinkButton = Shikupina ne ilpika
downloadTitle = Shiktemulti tajtajkwilul
downloadDescription = Ini tajkwilul kitakulijket iwan { -send-brand } iwan ichtakatajkwilulis wan se ilpika ka puliwi nemanha.
trySendDescription = Shikejeku { -send-brand } wan shiktakuli ichtaka wan te uij.
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
notSupportedDescription = { -send-brand } tesu yawi tekiti iwan ne tay titajtachia. { -send-short-brand } tekiti sujsul yek iwan ne tipan versión ipal { -firefox }, wan nusan yawi tekiti iwan ne tipan versión ipal achka muchi ne taiwan titajtachia.
downloadFirefox = Shiktemulti { -firefox }
legalTitle = { -send-short-brand } Tanawatilis ipal mupal ichtaka
legalDateStamp = Versión 1.0, tik marzoj 12, 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days } t { $hours } h { $minutes } m
addFilesButton = Shikpejpena ne tajkwilul pal tiktejkultia
uploadButton = Shiktejkulti
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Shiktilana wan shikmaka ne tajkwilul
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = u shikpachu pal tiktitania { $size }
addPassword = Shiktajpia iwan se taketzalis ichtaka
emailPlaceholder = Shiktali mutepusamaw
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Shiktali mutukay pal tiktitania { $size }
signInOnlyButton = Shiktali mutukay
accountBenefitTitle = Shikchiwa se mutapujka tik { -firefox } ush shiktali mutukay
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Shiktakuli tajtajkwilul ka { $size }
accountBenefitDownloadCount = Shiktakuli ne tajkwilul iwan seki
accountBenefitTimeLimit =
    { $count ->
        [one] Shikpia ne ilpika tatatuk 1 tunal
       *[other] Shikpia ne ilpika tatatuk { $count } tunal
    }
accountBenefitSync = Shiktajpia ne tajtajkwilul ka tiktakulijtuk
accountBenefitMoz = Shikmati ipanpa seuk itakil { -mozilla }
signOut = Shikisa
okButton = Yek
downloadingTitle = Kitemultia nemi
noStreamsWarning = Ne taiwan titachia te weli kineshtia ini wey tajkwilul
noStreamsOptionCopy = Shikishkupina ne ilpika pal tiktapua tik ukse taiwan titajtachia
noStreamsOptionFirefox = Shikejeku ne taiwan tachia tikishwelitat
noStreamsOptionDownload = Ma ninemi senpa iwan ini taiwan nitachia
downloadFirefoxPromo = Ne yankwik { -firefox } metzwikilia { -send-short-brand }.
# the next line after the colon contains a file name
shareLinkDescription = Shiktakuli ne ilpika ipal ne mutajkwilul:
shareLinkButton = Shiktakuli ne ilpika
# $name is the name of the file
shareMessage = Shiktemulti “{ $name }” iwan { -send-brand }: ichtaka wan te uij
trailheadPromo = Nemi ken tiktajpia ne tay mupal. Shimusentali iwan Firefox.
learnMore = Shimumachti ukchupi.
