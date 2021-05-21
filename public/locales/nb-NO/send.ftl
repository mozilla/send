# Send is a brand name and should not be localized.
title = Send
importingFile = Importerer…
encryptingFile = Krypterer...
decryptingFile = Dekrypterer...
downloadCount =
    { $num ->
        [one] 1 nedlasting
       *[other] { $num } nedlastinger
    }
timespanHours =
    { $num ->
        [one] 1 time
       *[other] { $num } timer
    }
copiedUrl = Kopiert!
unlockInputPlaceholder = Passord
unlockButtonLabel = Lås opp
downloadButtonLabel = Last ned
downloadFinish = Nedlastingen er fullført.
fileSizeProgress = ({ $partialSize } av { $totalSize })
sendYourFilesLink = Prøv Send
errorPageHeader = Det oppstod en feil.
fileTooBig = Filen er for stor til å laste opp. Det må være mindre enn { $size }.
linkExpiredAlt = Lenke utløpt
notSupportedHeader = Din nettleser er ikke støttet.
notSupportedLink = Hvorfor er ikke nettleseren min støttet?
notSupportedOutdatedDetail = Dessverre støtter ikke denne versjonen av Firefox netteknologien som driver Send. Du trenger å oppdatere nettleseren din.
updateFirefox = Oppdater Firefox
deletePopupCancel = Avbryt
deleteButtonHover = Slett
footerLinkLegal = Juridisk informasjon
footerLinkPrivacy = Personvern
footerLinkCookies = Infokapsler
passwordTryAgain = Feil passord. Prøv igjen.
javascriptRequired = Send krever JavaScript.
whyJavascript = Hvorfor krever Send JavaScript?
enableJavascript = Slå på JavaScript og prøv igjen.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }t { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Maksimum passordlengde: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Dette passordet kunne ikke settes

## Send version 2 strings

# Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Enkel, privat fildeling
introDescription = { -send-brand } lar deg dele filer via en tidsbegrenset lenke med ende-til-ende-kryptering. På den måten kan du dele filer privat og samtidig være trygg på at filene dine ikke blir liggende på nettet for alltid.
notifyUploadEncryptDone = Filen din er kryptert og klar til å sende
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Utløper etter { $downloadCount } eller { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 minutt
       *[other] { $num } minutter
    }
timespanDays =
    { $num ->
        [one] 1 dag
       *[other] { $num } dager
    }
timespanWeeks =
    { $num ->
        [one] 1 uke
       *[other] { $num } uker
    }
fileCount =
    { $num ->
        [one] 1 fil
       *[other] { $num } filer
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
totalSize = Total størrelse: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Kopier lenken for å dele filen din:
copyLinkButton = Kopier lenke
downloadTitle = Last ned filer
downloadDescription = Denne filen ble delt via { -send-brand } med ende-til-ende-kryptering og en lenke som automatisk utløper.
trySendDescription = Prøv { -send-brand } for enkel, sikker fildeling.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Kun 1 fil kan lastes opp om gangen.
       *[other] Kun { $count } filer kan lastes opp om gangen.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Kun 1 arkiv er tillatt.
       *[other] Kun { $count } arkiver er tillatt.
    }
expiredTitle = Denne lenken er utløpt.
notSupportedDescription = { -send-brand } virker ikke med denne nettleseren. { -send-short-brand } fungerer best med den nyeste versjonen av { -firefox }, og vil fungere med den nyeste versjonen av de fleste nettlesere.
downloadFirefox = Last ned { -firefox }
legalTitle = { -send-short-brand } Personvernerklæring
legalDateStamp = Versjon 1.0, datert den 12. mars 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }d { $hours }t { $minutes }m
addFilesButton = Velg filer du vil laste opp
trustWarningMessage = Forsikre deg om at du stoler på mottakeren din når du deler sensitive data.
uploadButton = Last opp
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Dra og slipp filer
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = eller klikk for å sende filer på opptil { $size }
addPassword = Beskytt med passord
emailPlaceholder = Skriv inn e-postadressen din
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Logg inn for å sende opptil { $size }
signInOnlyButton = Logg inn
accountBenefitTitle = Opprett en { -firefox }-konto eller logg inn
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Del filer på opptil { $size }
accountBenefitDownloadCount = Del filer med flere personer
accountBenefitTimeLimit =
    { $count ->
        [one] Hold lenker aktiv opptil 1 dag
       *[other] Hold lenker aktiv opptil { $count } dager
    }
accountBenefitSync = Behandle delte filer fra en hvilken som helst enhet
accountBenefitMoz = Les om andre { -mozilla }-tjenester
signOut = Logg ut
okButton = OK
downloadingTitle = Laster ned
noStreamsWarning = Denne nettleseren kan kanskje ikke dekryptere en så stor fil.
noStreamsOptionCopy = Kopier lenken for å åpne den i en annen nettleser
noStreamsOptionFirefox = Prøv favorittnettleseren vår
noStreamsOptionDownload = Fortsett med denne nettleseren
downloadFirefoxPromo = { -send-short-brand } presenteres for deg av den helt nye { -firefox }.
# the next line after the colon contains a file name
shareLinkDescription = Del lenken til filen din:
shareLinkButton = Del lenke
# $name is the name of the file
shareMessage = Last ned ‹{ $name }› med { -send-brand }: enkel, trygg fildeling
trailheadPromo = Det finnes en måte å ta vare på personvernet ditt. Bruk Firefox.
learnMore = Les mer.
downloadFlagged = Denne koblingen er deaktivert på grunn av brudd på vilkårene for tjenesten.
downloadConfirmTitle = En ting til
downloadConfirmDescription = Forsikre deg om at du stoler på personen som sendte deg denne filen, fordi vi ikke kan bekrefte at den ikke vil skade enheten din.
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
downloadTrustCheckbox =
    { $count ->
        [one] Jeg stoler på personen som sendte denne filen
       *[other] Jeg stoler på personen som sendte disse filene
    }
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
reportFile =
    { $count ->
        [one] Rapporter denne filen som mistenkelig
       *[other] Rapporter disse filene som mistenkelige
    }
reportDescription = Hjelp oss å forstå hva som skjer. Hva tror du er galt med disse filene?
reportUnknownDescription = Gå til adressen til lenken du ønsker å rapportere, og klikk «{ reportFile }».
reportButton = Rapporter
reportReasonMalware = Disse filene inneholder skadelig programvare eller er del av et nettfiskingsangrep (phishing-angrep).
reportReasonPii = Disse filene inneholder personlig identifiserbar informasjon om meg.
reportReasonAbuse = Disse filene inneholder ulovlig eller voldelig innhold.
reportReasonCopyright = For å rapportere brudd på opphavsrett eller varemerke, bruk prosessen som er beskrevet på <a>denne siden</a>.
reportedTitle = Filer rapportert
reportedDescription = Takk skal du ha. Vi har mottatt rapporten din om disse filene.
