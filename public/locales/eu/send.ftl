# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Iritzia
importingFile = Inportatzen…
encryptingFile = Zifratzen...
decryptingFile = Deszifratzen...
downloadCount =
    { $num ->
        [one] Deskarga bat
       *[other] { $num } deskarga
    }
timespanHours =
    { $num ->
        [one] Ordubete
       *[other] { $num } ordu
    }
copiedUrl = Kopiatuta!
unlockInputPlaceholder = Pasahitza
unlockButtonLabel = Desblokeatu
downloadButtonLabel = Deskargatu
downloadFinish = Deskarga burututa
fileSizeProgress = ({ $totalSize } / { $partialSize })
sendYourFilesLink = Probatu Firefox Send
errorPageHeader = Zerbait gaizki joan da!
fileTooBig = Fitxategia handiegia da kargatzeko. { $size } baino txikiagoa izan behar du.
linkExpiredAlt = Lotura iraungita
notSupportedHeader = Zure nabigatzailea ez da onartzen.
notSupportedLink = Zergatik ez da nire nabigatzailea onartzen?
notSupportedOutdatedDetail = Zoritxarrez Firefox bertsio honek ez du Firefox Send-ek behar duen web teknologia onartzen. Zure nabigatzailea eguneratu behar duzu.
updateFirefox = Eguneratu Firefox
deletePopupCancel = Utzi
deleteButtonHover = Ezabatu
footerLinkLegal = Lege-oharra
footerLinkPrivacy = Pribatutasuna
footerLinkCookies = Cookieak
passwordTryAgain = Pasahitz okerra. Saiatu berriro.
javascriptRequired = JavaScript beharrezkoa da Firefox Send erabiltzeko.
whyJavascript = Zergatik behar du Firefox Send-ek JavasScript?
enableJavascript = Gaitu JavaScript eta saiatu berriro.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }h { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Pasahitzaren gehienezko luzera: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Pasahitz hau ezin da ezarri

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Partekatu fitxategiak modu sinple eta pribatuan
introDescription = { -send-brand } tresna fitxategiak partekatzeko da, muturretik muturrerako enkriptatzearekin eta automatikoki iraungitzen diren estekekin. Hortaz, partekatzen duzuna pribatua izango da eta ziur egon zaitezke zure fitxategiak ez direla online egongo betirako.
notifyUploadEncryptDone = Zure fitxategia zifratuta eta bidaltzeko prest dago
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = { $downloadCount } edo { $timespan } ondoren iraungiko da
timespanMinutes =
    { $num ->
        [one] minutu 1
       *[other] { $num } minutu
    }
timespanDays =
    { $num ->
        [one] egun 1
       *[other] { $num } egun
    }
timespanWeeks =
    { $num ->
        [one] aste 1
       *[other] { $num } aste
    }
fileCount =
    { $num ->
        [one] fitxategi 1
       *[other] { $num } fitxategi
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
totalSize = Tamaina guztira: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Kopiatu fitxategia partekatzeko lotura:
copyLinkButton = Kopiatu lotura
downloadTitle = Deskargatu fitxategiak
downloadDescription = { -send-brand } bidez partekatu da fitxategia muturretik muturrerako enkriptatzearekin eta automatikoki iraungitzen den lotura batekin.
trySendDescription = Probatu { -send-brand } fitxategiak partekatzeko modu sinple eta segururako.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Soilik fitxategi bakarra igo daiteke aldi berean.
       *[other] Soilik { $count } fitxategi igo daitezke aldi berean.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Soilik artxibo bakarra onartzen da.
       *[other] Soilik { $count } artxibo onartzen dira.
    }
expiredTitle = Lotura hau iraungi da.
downloadFirefox = Deskargatu { -firefox }
legalTitle = { -send-short-brand } pribatutasun-oharra
legalDateStamp = 1.0 bertsioa, 2019ko martxoaren 12koa.
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }e { $hours }h { $minutes }m
addFilesButton = Hautatu igotzeko fitxategiak
uploadButton = Igo
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Arrastatu eta jaregin fitxategiak
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = edo egin klik { $size } arte igotzeko
addPassword = Babestu pasahitzarekin
emailPlaceholder = Idatzi zure helbide elektronikoa
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Hasi saioa { $size } arte bidaltzeko
signInOnlyButton = Hasi saioa
accountBenefitTitle = Sortu { -firefox } kontu bat edo hasi saioa
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Partekatu { $size } arteko fitxategiak
accountBenefitDownloadCount = Partekatu fitxategiak jende gehiagorekin
accountBenefitTimeLimit =
    { $count ->
        [one] Utzi loturak erabilgarri egun batez
       *[other] Utzi loturak erabilgarri { $count } egunez
    }
accountBenefitSync = Kudeatu partekatutako fitxategiak edozein gailutatik
accountBenefitMoz = { -mozilla }ren beste zerbitzuei buruzko argibide gehiago
signOut = Amaitu saioa
okButton = Ados
downloadingTitle = Deskargatzen
