# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Feedback
importingFile = Importazione in corso…
encryptingFile = Crittazione in corso…
decryptingFile = Decrittazione in corso…
downloadCount =
    { $num ->
        [one] 1 download
       *[other] { $num } download
    }
timespanHours =
    { $num ->
        [one] 1 ora
       *[other] { $num } ore
    }
copiedUrl = Copiato
unlockInputPlaceholder = Password
unlockButtonLabel = Sblocca
downloadButtonLabel = Scarica
downloadFinish = Download completato
fileSizeProgress = ({ $partialSize } di { $totalSize })
sendYourFilesLink = Prova Firefox Send
errorPageHeader = Si è verificato un errore.
fileTooBig = Le dimensioni di questo file sono eccessive. Dovrebbe essere inferiore a { $size }.
linkExpiredAlt = Link scaduto
notSupportedHeader = Il browser in uso non è supportato.
notSupportedLink = Perché questo browser non risulta supportato?
notSupportedOutdatedDetail = Purtroppo questa versione di Firefox non supporta le tecnologie web alla base di Firefox Send. È necessario aggiornare il browser.
updateFirefox = Aggiorna Firefox
deletePopupCancel = Annulla
deleteButtonHover = Elimina
footerLinkLegal = Note legali
footerLinkPrivacy = Privacy
footerLinkCookies = Cookie
passwordTryAgain = Password errata, riprovare.
javascriptRequired = Firefox Send richiede JavaScript
whyJavascript = Perché Firefox Send richiede JavaScript?
enableJavascript = Attiva JavaScript e riprova.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }h { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Lunghezza massima della password: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Impossibile impostare la password

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Condividi file in modo semplice e riservato
introDescription = { -send-brand } permette di condividere file con crittografia end-to-end attraverso un link che scade automaticamente. In questo modo hai la garanzia che i tuoi contenuti vengano condivisi in modo riservato e non rimangano online per sempre.
notifyUploadEncryptDone = Il file è crittato e pronto per l’invio
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Scade dopo { $downloadCount } o tra { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 minuto
       *[other] { $num } minuti
    }
timespanDays =
    { $num ->
        [one] 1 giorno
       *[other] { $num } giorni
    }
timespanWeeks =
    { $num ->
        [one] 1 settimana
       *[other] { $num } settimane
    }
fileCount = { $num } file
# byte abbreviation
bytes = B
# kibibyte abbreviation
kb = kB
# mebibyte abbreviation
mb = MB
# gibibyte abbreviation
gb = GB
# localized number and byte abbreviation. example "2.5MB"
fileSize = { $num }{ $units }
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
totalSize = Dimensione totale: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Copia il link per condividere il file:
copyLinkButton = Copia link
downloadTitle = Scarica file
downloadDescription = Questo file è stato condiviso tramite { -send-brand } con crittografia end-to-end e un link che scade automaticamente.
trySendDescription = Prova { -send-brand } per condividere file in modo semplice e sicuro.
# count will always be > 10
tooManyFiles = È possibile caricare solo { $count } file alla volta.
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] È consentito solo un archivio.
       *[other] Sono consentiti solo { $count } archivi.
    }
expiredTitle = Questo link è scaduto.
notSupportedDescription = Non è possibile utilizzare { -send-brand } con questo browser. { -send-short-brand } funziona al meglio con l’ultima versione di { -firefox } ma è compatibile con l’ultima versione della maggior parte dei browser.
downloadFirefox = Scarica { -firefox }
legalTitle = Informativa sulla privacy di { -send-short-brand }
legalDateStamp = Versione 1.0 del 12 marzo 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }g { $hours }h { $minutes }m
addFilesButton = Seleziona i file da caricare
uploadButton = Carica
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Trascina e rilascia i file
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = o fai clic per inviare fino a { $size }
addPassword = Proteggi con una password
emailPlaceholder = Inserisci il tuo indirizzo email
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Accedi per inviare fino a { $size }
signInOnlyButton = Accedi
accountBenefitTitle = Crea un account { -firefox } o accedi
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Condividi file fino a { $size }
accountBenefitDownloadCount = Condividi file con più persone
accountBenefitTimeLimit =
    { $count ->
        [one] Mantieni link attivi per 1 giorno
       *[other] Mantieni link attivi per { $count } giorni
    }
accountBenefitSync = Gestisci i file condivisi da qualsiasi dispositivo
accountBenefitMoz = Scopri altri servizi { -mozilla }
signOut = Disconnetti
okButton = OK
downloadingTitle = Download in corso…
noStreamsWarning = Questo browser potrebbe non essere in grado di decrittare un file così grande.
noStreamsOptionCopy = Copia il link e aprilo in un altro browser
noStreamsOptionFirefox = Prova il nostro browser preferito
noStreamsOptionDownload = Continua con questo browser
downloadFirefoxPromo = { -send-short-brand } è offerto dal nuovissimo { -firefox }.
# the next line after the colon contains a file name
shareLinkDescription = Condividi il link al tuo file:
shareLinkButton = Condividi link
# $name is the name of the file
shareMessage = Scarica “{ $name }” con { -send-brand }: condivisione di file semplice e sicura
trailheadPromo = C’è un modo per proteggere la tua privacy. Entra in Firefox.
learnMore = Ulteriori informazioni.
