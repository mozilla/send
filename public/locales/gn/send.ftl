# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Je'ejey
importingFile = Ojegueruhína…
encryptingFile = Mo'ãmby…
decryptingFile = Ñemo'ã'o…
downloadCount =
    { $num ->
        [one] 1 mboguejy
       *[other] { $num } mboguejy
    }
timespanHours =
    { $num ->
        [one] 1 aravo
       *[other] { $num } aravo
    }
copiedUrl = Monguatiapyre!
unlockInputPlaceholder = Ñe'ẽñemi
unlockButtonLabel = Mbojera
downloadButtonLabel = Mboguejy
downloadFinish = Oguejypáma
fileSizeProgress = ({ $partialSize } rehe { $totalSize })
sendYourFilesLink = Eipuru Firefox Send
errorPageHeader = ¡Oiko jejavy!
fileTooBig = Marandurenda tuichaiterei ehupi hag̃ua. Michĩveva’erã { $size } gui.
linkExpiredAlt = Juajuha ndoikóiva
notSupportedHeader = Ne kundaha ndorekói pytyvõ.
notSupportedLink = ¿Mba’ére che kundahára ndorekói ñepytyvõ?
notSupportedOutdatedDetail = Ko Firefox rembiapo ndaipu’akái ñanduti rembipurupyahu oikotevẽva Firefox Send. Embohekopyahúke ne kundahára.
updateFirefox = Firefox mbohekopyahu
deletePopupCancel = Heja
deleteButtonHover = Mboguete
footerLinkLegal = Añetegua
footerLinkPrivacy = Ñemigua
footerLinkCookies = Kookie
passwordTryAgain = Ñe'ẽñemi ndoikóiva. Eha'ãjey.
javascriptRequired = Firefox Send oikotevẽ JavaScript
whyJavascript = ¿Mba’ére Firefox Send oikotevẽ JavaScript?
enableJavascript = Ikatúpa embojuruja JavaScript ha eha’ãjey uperire.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours } h { $minutes } m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes } m
# A short status message shown when the user enters a long password
maxPasswordLength = Ñe’ẽñemi pukukue: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Ndaikatúi oikóvo ko ñe'ẽñemi

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Marandurenda ñemoambue hasy'ỹ ha ñemiguáva
notifyUploadEncryptDone = Ne marandurenda oñemo'ã ha ikatúma emondo
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Opáta { $downloadCount } rire térã { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 aravo'i
       *[other] { $num } aravo'i
    }
timespanDays =
    { $num ->
        [one] 1 ára
       *[other] { $num } ára
    }
timespanWeeks =
    { $num ->
        [one] 1 arapokõindy
       *[other] { $num } arapokõindy
    }
fileCount =
    { $num ->
        [one] 1 marandurenda
       *[other] { $num } marandurenda
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
totalSize = Tuichakue: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Emonguatia juajuha ha emoherakuã ne marandurenda:
copyLinkButton = Emonguatia juajuha
downloadTitle = Emboguejy marandurenda
trySendDescription = Eipuru { -send-brand } emoherakuã hag̃ua marandurenda tasy’ỹ ha tekorosãme.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Ikatu ehupi 1 marandurenda oñondive
       *[other] Ikatu ehupi { $count } marandurenda oñondive
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Oñemoneĩ 1 marandurenda añoite
       *[other] Oñemoneĩ { $count } marandurenda añoite
    }
expiredTitle = Ko juajuha ndoikovéima.
downloadFirefox = Emboguejy { -firefox }
legalTitle = { -send-short-brand } Marandu ñemigua
legalDateStamp = Mba’epyahu 1.0, 12 jasyapy 2019 peguare
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }d { $hours }h { $minutes }m
addFilesButton = Eiporavo marandurenda ehupi hag̃ua
uploadButton = Hupi
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Embosyryry ha epoi marandurenda
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = térã eikutu emondo hag̃ua { $size } peve
addPassword = Ñe’ẽñemíme mo’ãmbyre
emailPlaceholder = Emoinge ne ñanduti veve
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Eñepyrũ tembiapo emondo hag̃ua { $size } peve
signInOnlyButton = Eñepyrũ tembiapo
accountBenefitTitle = Emoheñói { -firefox } mba’ete térã eñepyrũ tembiapo
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Emoherakuã marandurenda { $size } peve
accountBenefitDownloadCount = Emoherakuã marandurenda hetave tapicha ndive
accountBenefitTimeLimit =
    { $count ->
        [one] Eguereko juajuha hendyhápe 1 ára
       *[other] Eguereko juajuha hendyhápe { $count } ára
    }
accountBenefitSync = Eñangareko marandurenda moherakuãmbyrére oimeraẽ mba’e’oka guive.
accountBenefitMoz = Eikuaa ambue { -mozilla } mba'epytyvõrã
signOut = Emboty tembiapo
okButton = OK
downloadingTitle = Oñemboguejyhína
noStreamsWarning = Ikatu ko kundahára ndoikuaái marandurenda tuichaitereíva.
noStreamsOptionCopy = Embokuatia juajuha embojuruja hag̃ua ambue kundahárape.
noStreamsOptionFirefox = Eipuru ore kundahára rohayhuvéva
noStreamsOptionDownload = Eku’ejey ko kundahára ndive
downloadFirefoxPromo = Ipyahúva { -firefox } ome’ẽse ndéve { -send-short-brand }.
# the next line after the colon contains a file name
shareLinkDescription = Emoherakuã juajuha ne mba’e’oka ndive:
shareLinkButton = Emoherakuã juajuha
# $name is the name of the file
shareMessage = Emboguejy “{ $name }” { -send-brand } ndive: emoherakuã marandurenda tasy'ỹ ha tekorosãme
trailheadPromo = Mba’éichapa emo’ãta ne ñemigua. Eipuru Firefox.
learnMore = Kuaave.
