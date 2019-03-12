# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Feedback
importingFile = Importerer…
encryptingFile = Krypterer…
decryptingFile = Dekrypterer…
downloadCount =
    { $num ->
        [one] 1 hentning
       *[other] { $num } hentninger
    }
timespanHours =
    { $num ->
        [one] 1 time
       *[other] { $num } timer
    }
copiedUrl = Kopieret!
unlockInputPlaceholder = Adgangskode
unlockButtonLabel = Lås op
downloadButtonLabel = Hent
downloadFinish = Hentning fuldført
fileSizeProgress = ({ $partialSize } af { $totalSize })
sendYourFilesLink = Prøv Firefox Send
errorPageHeader = Der gik noget galt!
fileTooBig = Den fil er for stor at uploade. Den skal være mindre end { $size }.
linkExpiredAlt = Link er udløbet
notSupportedHeader = Din browser understøttes ikke.
notSupportedLink = Hvorfor understøttes min browser ikke?
notSupportedOutdatedDetail = Desværre understøtter denne version af Firefox ikke den webteknologi, som driver Firefox Send. Du skal opdatere din browser.
updateFirefox = Opdater Firefox
deletePopupCancel = Annuller
deleteButtonHover = Slet
footerLinkLegal = Juridisk
footerLinkPrivacy = Privatliv
footerLinkCookies = Cookies
passwordTryAgain = Forkert adgangskode. Prøv igen.
javascriptRequired = Firefox Send kræver JavaScript
whyJavascript = Hvorfor kræver Firefox Send JavaScript?
enableJavascript = Aktiver JavaScript og prøv igen.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours } t { $minutes } m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes } m
# A short status message shown when the user enters a long password
maxPasswordLength = Maksimum længde af adgangskode: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Adgangskoden kunne ikke sættes

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Enkel, privat fildeling
introDescription = { -send-brand } gør det muligt at dele filer via et tidsbegrænset link og med end to end-kryptering. På den måde kan du dele filer privat og samtidig være sikker på, at det delte ikke forbliver online for evigt.
notifyUploadEncryptDone = Din fil er krypteret og klar til at blive sendt
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Udløber efter { $downloadCount } eller { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 minut
       *[other] { $num } minutter
    }
timespanDays =
    { $num ->
        [one] 1 dag
       *[other] { $num } dage
    }
timespanWeeks =
    { $num ->
        [one] 1 uge
       *[other] { $num } uger
    }
fileCount =
    { $num ->
        [one] 1 fil
       *[other] { $num } filer
    }
# size is a localized number followed by a unit of bytes, ex. 2.5GB
totalSize = Samlet størrelse: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Kopier linket for at dele din fil:
copyLinkButton = Kopier link
downloadTitle = Hent filer
downloadDescription = Denne fil blev delt via { -send-brand } med end to end-kryptering og et link, der automatisk udløber.
trySendDescription = Prøv { -send-brand } for enkel og sikker fildeling.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Du kan kun uploade 1 fil ad gangen.
       *[other] Du kan kun uploade { $count } filer ad gangen.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Kun 1 arkiv er tilladt.
       *[other] Kun { $count } arkiver er tilladt.
    }
expiredTitle = Dette link er udløbet.
notSupportedDescription = { -send-brand } virker ikke med denne browser. { -send-short-brand } virker bedst med den nyeste version af { -firefox } og med de fleste andre nye browsere.
downloadFirefox = Hent { -firefox }
legalTitle = { -send-short-brand }, om privatlivspolitik
legalDateStamp = Version 1.0, udsendt d. 12. marts 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days } d. { $hours } t. { $minutes } m.
addFilesButton = Vælg filer, der skal uploades
uploadButton = Upload
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Træk og slip filer
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# size is a localized number followed by a unit of bytes, ex. 2.5GB
orClickWithSize = eller klik for at sende filer på op til { $size }
addPassword = Beskyt med adgangskode
emailPlaceholder = Indtast din mailadresse
# size is a localized number followed by a unit of bytes, ex. 2.5GB
signInSizeBump = Log ind for at sende filer på op til { $size }
signInButton = Log ind/tilmeld dig
accountBenefitTitle = Opret en { -firefox }-konto eller log ind
# size is a localized number followed by a unit of bytes, ex. 2.5GB
accountBenefitLargeFiles = Del filer på op til { $size }
accountBenefitDownloadCount = Del filer med flere personer
accountBenefitTimeLimit =
    { $count ->
        [one] Bevar links aktive i op til 1 dag
       *[other] Bevar links aktive i op til { $count } dage
    }
accountBenefitSync = Håndter delte filer på enhver enhed
accountBenefitMoz = Læs om andre tjenester fra { -mozilla }
signOut = Log ud
okButton = OK
downloadingTitle = Henter
noStreamsWarning = Denne browser kan muligvis ikke dekryptere en fil, der er så stor.
noStreamsOptionCopy = Kopier linket for at åbne det i en anden browser
noStreamsOptionFirefox = Prøv vores favorit-browser
noStreamsOptionDownload = Fortsæt med denne browser
