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
fileSizeProgress = ({ $partialSize } pak { $totalSize })
sendYourFilesLink = Shikwi Firefox Send
errorPageHeader = Te yajki yek!
fileTooBig = Ne tajkwilul sea wey pal tiktejkultia. Shiktemulti { $size } ush ukchikitik.
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

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Shiktitani
-firefox = Firefox
-mozilla = Mozilla
introTitle = Te uij wan ichtaka tikmajmaka se amat.
introDescription = { -send-brand } metzpalewia tikmajmaka se amat iwan ichtaka tajkwilulis wan se ilpika ka puliwi nemanha. Ijkiuni tikchiwa ka ichtaka tay tikmajmaka wan ka tesu naka senpa tay mupal tik matapan.
notifyUploadEncryptDone = Ne muamaw ichtaka tajkwilujtuk wan weli tiktuktia
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
        [one] amat
       *[other] ajamat
    }
# localized number and byte abbreviation. example "2.5MB"
fileSize = { $num }{ $units }
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
totalSize = Keski itamachiwka: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Shikupina ne ilpika pal tikmajmaka muamaw:
copyLinkButton = Shikupina ne ilpika
downloadTitle = Shiktemulti ajamat
downloadDescription = Ini amat kimajmakket iwan { -send-brand } iwan ichtaka tajkwilulis wan se ilpika ka puliwi nemanha.
trySendDescription = Shikejeku { -send-brand } pal tikmajmaka te uij wan ichtaka.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Semaya se amat tiweli tiktejkultia sansepa.
       *[other] Semaya { $count } ajamat tiweli tiktejkultia sansepa.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Semaya se amapial weli nemi.
       *[other] Semaya { $count } ajamapial welit nemit.
    }
expiredTitle = Ne ilpika pulijtuk.
learnMore = Shimumachti ukchiupi.
