# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteSubtitle = un esperimento web
siteFeedback = Feedback
uploadPageHeader = Condivisione di file riservata e crittata
uploadPageExplainer = Invia file in modo sicuro, riservato e crittato, con un link che scade automaticamente per garantire che i tuoi dati non rimangano online per sempre.
uploadPageLearnMore = Ulteriori informazioni
uploadPageDropMessage = Trascina qui un file per caricarlo
uploadPageSizeMessage = Per evitare problemi è consigliabile caricare file di dimensione inferiore a 1 GB
uploadPageBrowseButton = Seleziona un file sul computer
uploadPageBrowseButton1 = Seleziona un file da caricare
uploadPageMultipleFilesAlert = Il caricamento di più file o cartelle non è attualmente supportato.
uploadPageBrowseButtonTitle = Carica file
uploadingPageProgress = Caricamento { $filename } ({ $size })
importingFile = Importazione in corso…
verifyingFile = Verifica in corso…
encryptingFile = Crittazione in corso…
decryptingFile = Decrittazione in corso…
notifyUploadDone = Caricamento completato.
uploadingPageMessage = È possibile impostare le opzioni di scadenza del file al termine del caricamento.
uploadingPageCancel = Annulla caricamento
uploadCancelNotification = Caricamento annullato.
uploadingPageLargeFileMessage = Si tratta di un file di grandi dimensioni e potrebbe richiedere un po' di tempo.
uploadingFileNotification = Invia una notifica quando il caricamento è completato.
uploadSuccessConfirmHeader = Pronto per l’invio
uploadSvgAlt = Carica
uploadSuccessTimingHeader = Il link al file scadrà dopo 1 download o in 24 ore.
expireInfo = Il link a questo file scadrà dopo { $downloadCount } o { $timespan }.
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
copyUrlFormLabelWithName = Copia e condividi il link per inviare il tuo file: { $filename }
copyUrlFormButton = Copia negli appunti
copiedUrl = Copiato
deleteFileButton = Elimina file
sendAnotherFileLink = Invia un altro file
# Alternative text used on the download link/button (indicates an action).
downloadAltText = Scarica
downloadsFileList = Download
# Used as header in a column indicating the amount of time left before a
# download link expires (e.g. "10h 5m")
timeFileList = Scadenza
# Used as header in a column indicating the number of times a file has been
# downloaded
downloadFileName = Scarica { $filename }
downloadFileSize = ({ $size })
unlockInputLabel = Inserire la password
unlockInputPlaceholder = Password
unlockButtonLabel = Sblocca
downloadFileTitle = Scarica il file crittato
# Firefox Send is a brand name and should not be localized.
downloadMessage = Qualcuno ha utilizzato Firefox Send per inviarti un file. Si tratta di un servizio che permette di condividere file in modo sicuro, riservato e crittato, utilizzando un link che smette di funzionare automaticamente dopo un certo periodo di tempo, garantendo così che i tuoi dati non rimangano online per sempre.
# Text and title used on the download link/button (indicates an action).
downloadButtonLabel = Scarica
downloadNotification = Download completato.
downloadFinish = Download completato
# This message is displayed when uploading or downloading a file, e.g. "(1,3 MB of 10 MB)".
fileSizeProgress = ({ $partialSize } di { $totalSize })
# Firefox Send is a brand name and should not be localized.
sendYourFilesLink = Prova Firefox Send
downloadingPageProgress = Download in corso di { $filename } ({ $size })
downloadingPageMessage = Mantieni aperta questa scheda mentre il file viene scaricato e decrittato.
errorAltText = Errore durante il caricamento
errorPageHeader = Si è verificato un errore.
errorPageMessage = Si è verificato un errore durante il caricamento del file.
errorPageLink = Invia un altro file
fileTooBig = Le dimensioni di questo file sono eccessive. Dovrebbe essere inferiore a { $size }.
linkExpiredAlt = Link scaduto
expiredPageHeader = Questo link è scaduto oppure non è mai esistito.
notSupportedHeader = Il browser in uso non è supportato.
# Firefox Send is a brand name and should not be localized.
notSupportedDetail = Purtroppo questo browser non supporta le tecnologie web alla base di Firefox Send. Devi utilizzare un altro browser. Ti consigliamo Firefox!
notSupportedLink = Perché questo browser non risulta supportato?
notSupportedOutdatedDetail = Purtroppo questa versione di Firefox non supporta le tecnologie web alla base di Firefox Send. È necessario aggiornare il browser.
updateFirefox = Aggiorna Firefox
downloadFirefoxButtonSub = Download gratuito
uploadedFile = File
copyFileList = Copia indirizzo
# expiryFileList is used as a column header
expiryFileList = Scade in
deleteFileList = Elimina
nevermindButton = No, grazie
legalHeader = Termini di utilizzo e privacy
legalNoticeTestPilot = Firefox Send è attualmente un esperimento di Test Pilot ed è soggetto alle <a>Condizioni di utilizzo</a> e all’<a>Informativa sulla privacy</a> di Test Pilot. Per ulteriori informazioni su questo esperimento e i dati raccolti, consulta <a>questa pagina</a>.
legalNoticeMozilla = L’utilizzo del sito di Firefox Send è soggetto all’<a>Informativa sulla privacy</a> e le <a>Condizioni di utilizzo</a> dei siti web Mozilla.
deletePopupText = Eliminare questo file?
deletePopupYes = Sì
deletePopupCancel = Annulla
deleteButtonHover = Elimina
copyUrlHover = Copia indirizzo
footerLinkLegal = Note legali
# Test Pilot is a proper name and should not be localized.
footerLinkAbout = Informazioni su Test Pilot
footerLinkPrivacy = Privacy
footerLinkTerms = Condizioni di utilizzo
footerLinkCookies = Cookie
requirePasswordCheckbox = Richiedi una password per poter scaricare questo file
addPasswordButton = Aggiungi password
changePasswordButton = Modifica
passwordTryAgain = Password errata, riprovare.
reportIPInfringement = Segnala violazione della proprietà intellettuale
javascriptRequired = Firefox Send richiede JavaScript
whyJavascript = Perché Firefox Send richiede JavaScript?
enableJavascript = Attiva JavaScript e riprova.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }h { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when a password is successfully set
passwordIsSet = Password impostata
# A short status message shown when the user enters a long password
maxPasswordLength = Lunghezza massima della password: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Impossibile impostare la password

## New strings for the vNext version of Firefox Send

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Condividi file in modo semplice e riservato
introDescription = { -send-brand } permette di condividere file con crittografia end-to-end attraverso un link che scade automaticamente. In questo modo hai la garanzia che i tuoi contenuti vengano condivisi in modo riservato e non rimangano online per sempre.
notifyUploadEncryptDone = Il file è crittato e pronto per l’invio
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Scade dopo { $downloadCount } o dopo { $timespan }
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
# size is a localized number followed by a unit of bytes, ex. 2.5GB
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
legalDateStamp = Version 1.0 del 12 marzo 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }g { $hours }h { $minutes }m
addFilesButton = Seleziona i file da caricare
uploadButton = Carica
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Trascina e rilascia i file
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# size is a localized number followed by a unit of bytes, ex. 2.5GB
orClickWithSize = o fai clic per inviare fino a { $size }
addPassword = Proteggi con una password
emailPlaceholder = Inserisci il tuo indirizzo email
# size is a localized number followed by a unit of bytes, ex. 2.5GB
signInSizeBump = Accedi per inviare fino a { $size }
signInButton = Accedi o registrati
accountBenefitTitle = Crea un account { -firefox } o accedi
# size is a localized number followed by a unit of bytes, ex. 2.5GB
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
