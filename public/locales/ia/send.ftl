# Send is a brand name and should not be localized.
title = Send
importingFile = Importation…
encryptingFile = Cryptation...
decryptingFile = Decryptation…
downloadCount =
    { $num ->
        [one] { $num } discargamento
       *[other] { $num } discargamentos
    }
timespanHours =
    { $num ->
        [one] { $num } hora
       *[other] { $num } horas
    }
copiedUrl = Copiate!
unlockInputPlaceholder = Contrasigno
unlockButtonLabel = Disblocar
downloadButtonLabel = Discargar
downloadFinish = Discargamento completate
fileSizeProgress = ({ $partialSize } de { $totalSize })
sendYourFilesLink = Proba Send
errorPageHeader = Un error occurreva!
fileTooBig = Iste file es troppo grande pro incargar. Illo debe esser inferior a { $size }.
linkExpiredAlt = Ligamine expirate
notSupportedHeader = Tu navigator non es supportate
notSupportedLink = Proque non es mi navigator supportate?
notSupportedOutdatedDetail = Infelicemente iste version de Firefox non supporta le nove technologia web que actiona Send. Tu debe actualisar tu navigator.
updateFirefox = Actualisar Firefox
deletePopupCancel = Cancellar
deleteButtonHover = Deler
footerLinkLegal = Legal
footerLinkPrivacy = Confidentialitate
footerLinkCookies = Cookies
passwordTryAgain = Contrasigno incorrecte. Retenta.
javascriptRequired = Send require JavaScript
whyJavascript = Proque Send require JavaScript?
enableJavascript = Por favor activa JavaScript e tenta novemente.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }h { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Maxime longor del contrasigno: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Iste contrasigno non ha potite esser establite

## Send version 2 strings

# Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Comparti file in maniera confidential
introDescription = { -send-brand } te pone in grado de compartir files con cryptographia bilateral e un ligamine que automaticamente expira. Assi que tu pote mantener private lo que tu comparti e liberar te del anxietate que tu problema resta online per sempre.
notifyUploadEncryptDone = Tu file es cryptate e preste pro esser inviate
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
downloadDescription = Iste file era compartite via { -send-brand } con cryptographia bilateral e un ligamine que expira automaticamente.
trySendDescription = Prova { -send-brand } pro le compartimento de file simple e secur.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Solmente 1 file pote ser incargate al vice.
       *[other] Solmente { $count } files pote esser incargate al vice.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Solo 1 archivo es permittite.
       *[other] Solo { $count } archivos es permitter.
    }
expiredTitle = Iste ligamine ha expirate.
notSupportedDescription = { -send-brand } non functionara con iste navigator. { -send-short-brand } functiona melio con le ultime version de { -firefox }, e functionara con le version actual de plure navigatores.
downloadFirefox = Discargar { -firefox }
legalTitle = Aviso de confidentialitate de { -send-short-brand }
legalDateStamp = Version 1.0 del 12 martio 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }d { $hours }h { $minutes }m
addFilesButton = Selige le files a incargar
trustWarningMessage = Verifica que tu te fide a tu destinatario quando tu comparti datos sensibile.
uploadButton = Incargar
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Traher e deponer files
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = o cliccar pro inviar usque { $size }
addPassword = Proteger per contrasigno
emailPlaceholder = Insere tu adresse de e-mail
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Aperi session pro inviar usque a { $size }
signInOnlyButton = Aperir session
accountBenefitTitle = Crea un conto { -firefox } o registra te
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Comparti files usque { $size }
accountBenefitDownloadCount = Comparti files con plus de personas
accountBenefitTimeLimit =
    { $count ->
        [one] Retene active le ligamine pro 1 die
       *[other] Retene active le ligamine pro { $count } dies
    }
accountBenefitSync = Gere files compartite ab non importa qual apparato
accountBenefitMoz = Discoperi altere servicios de { -mozilla }
signOut = Clauder session
okButton = OK
downloadingTitle = Discargamento
noStreamsWarning = Es possibile que iste navigator non pote decryptar un file de iste proportiones.
noStreamsOptionCopy = Copiar le ligamine e aperir lo in un altere navigator
noStreamsOptionFirefox = Prova nostre navigator favorite
noStreamsOptionDownload = Continuar con iste navigator
downloadFirefoxPromo = { -send-short-brand } es portate a te per le novissime { -firefox }.
# the next line after the colon contains a file name
shareLinkDescription = Condivide le ligamine a tu file:
shareLinkButton = Condivide ligamine
# $name is the name of the file
shareMessage = Discarga “{ $name }” con { -send-brand }: condivide files in modo simple e secur
trailheadPromo = Il ha un via pro proteger tu confidentialitate. Junge te a Firefox!
learnMore = Saper plus.
downloadFlagged = Iste ligamine ha essite disactivate per violation del terminos de servicio.
downloadConfirmTitle = Un altere cosa
downloadConfirmDescription = Verifica que tu te fide al persona qui te inviava iste file, perque nos non pote verificar que illo non violara tu apparato.
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
downloadTrustCheckbox =
    { $count ->
        [one] Io me fide al persona qui inviava iste file
       *[other] Io me fide al persona qui inviava iste files
    }
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
reportFile =
    { $count ->
        [one] reportar iste file como suspecte
       *[other] reportar iste files como suspecte
    }
reportDescription = Adjuta nos a comprender lo que eveni. Que pensa tu es problematic con iste files?
reportUnknownDescription = Va al URL del ligamine que tu desira signalar e clicca “{ reportFile }”.
reportButton = Reportar
reportReasonMalware = Iste files contine malware o es parte de un attacco fraudulente.
reportReasonPii = Iste files contine informationes personal identificabile re me.
reportReasonAbuse = Iste files contine contento illegal o abusive.
reportReasonCopyright = Pro signalar violation de derectos de autor o marca de fabrica, usa le procedura describite a <a>iste pagina</a>.
reportedTitle = Files reportate
reportedDescription = Gratias. Nos ha recipite tu reporto sur iste files.
