# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Reaction
importingFile = Importation…
encryptingFile = Cryptation...
decryptingFile = Decryptation…
downloadCount =
    { $num ->
        [one] discargamento
       *[other] discargamentos
    }
timespanHours =
    { $num ->
        [one] hora
       *[other] horas
    }
copiedUrl = Copiate!
unlockInputPlaceholder = Contrasigno
unlockButtonLabel = Disblocar
downloadButtonLabel = Discargar
downloadFinish = Discargamento completate
fileSizeProgress = ({ $partialSize } de { $totalSize })
sendYourFilesLink = Proba Firefox Send
errorPageHeader = Un error occurreva!
fileTooBig = Iste file es troppo grande pro lo cargar. Illo debe ser inferior a { $size }.
linkExpiredAlt = Ligamine expirate
notSupportedHeader = Tu navigator non es supportate
notSupportedLink = Perque iste navigator non es supportate?
notSupportedOutdatedDetail = Infelicemente iste version de Firefox non supporta le nove technologias web que move Firefox Send. Tu besonia de actualisar tu navigator.
updateFirefox = Actualisar Firefox
deletePopupCancel = Cancellar
deleteButtonHover = Deler
footerLinkLegal = Legal
footerLinkPrivacy = Confidentialitate
footerLinkCookies = Cookies
passwordTryAgain = Contrasigno incorrecte. Retenta.
javascriptRequired = Firefox Send require JavaScript
whyJavascript = Proque Firefox Send require JavaScript?
enableJavascript = Por favor activa JavaScript e tenta novemente.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }h { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Maxime longor del contrasigno: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Iste contrasigno non pote ser definite

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Comparti file in maniera confidential
notifyUploadEncryptDone = Tu file es cryptate e preste pro ser inviate.
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Expira post { $downloadCount } o { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 minuta
       *[other] { $num } minutas
    }
timespanDays =
    { $num ->
        [one] 1 die
       *[other] { $num } dies
    }
timespanWeeks =
    { $num ->
        [one] 1 septimana
       *[other] { $num } septimanas
    }
fileCount =
    { $num ->
        [one] 1 file
       *[other] { $num } files
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
totalSize = Dimension total: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Copia le ligamine pro compartir le file:
copyLinkButton = Copiar ligamine
downloadTitle = Discargar files
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Solo 1 file al vice pote ser cargate.
       *[other] Solo { $count } files al vice pote ser cargate.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Solo 1 archivo es consentite.
       *[other] Solo { $count } archivos es consentite.
    }
expiredTitle = Iste ligamine ha expirate.
downloadFirefox = Discargar { -firefox }
legalTitle = Politica de confidentialitate de { -send-short-brand }
legalDateStamp = Version 1.0 del 12 martio 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }d { $hours }h { $minutes }m
addFilesButton = Selige le files a cargar
uploadButton = Cargar
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Traher e deponer files
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = o cliccar pro inviar usque { $size }
addPassword = Proteger per contrasigno
emailPlaceholder = Insere tu adresse email
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Accede pro inviar usque { $size }
signInButton = Authentica/registra te
accountBenefitTitle = Crea un conto { -firefox } o registra te
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Comparti files usque { $size }
accountBenefitDownloadCount = Comparti files con plus de personas
accountBenefitTimeLimit =
    { $count ->
        [one] Retene active le ligamine pro 1 die
       *[other] Retene active le ligamine pro { $count } dies
    }
accountBenefitSync = Gere files compartite ab ulle apparato
accountBenefitMoz = Discoperi altere servicios de { -mozilla }
signOut = Disconnecter
okButton = OK
downloadingTitle = Discargamento
noStreamsOptionCopy = Copiar le ligamine e aperir lo in un altere navigator
noStreamsOptionFirefox = Prova nostre navigator favorite
noStreamsOptionDownload = Continuar con iste navigator
