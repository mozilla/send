# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Povratne informacije
importingFile = Uvažanje …
encryptingFile = Šifriranje ...
decryptingFile = Dešifriranje ...
downloadCount =
    { $num ->
        [one] 1 prenosu
        [two] { $num } prenosih
        [few] { $num } prenosih
       *[other] { $num } prenosih
    }
timespanHours =
    { $num ->
        [one] 1 uro
        [two] { $num } uri
        [few] { $num } ure
       *[other] { $num } ur
    }
copiedUrl = Kopirano!
unlockInputPlaceholder = Geslo
unlockButtonLabel = Odkleni
downloadButtonLabel = Prenesi
downloadFinish = Prenos končan
fileSizeProgress = ({ $partialSize } od { $totalSize })
sendYourFilesLink = Preskusite Firefox Send
errorPageHeader = Prišlo je do težave!
fileTooBig = Ta datoteka je prevelika za nalaganje. Največja možna velikost je { $size }.
linkExpiredAlt = Povezava je potekla
notSupportedHeader = Vaš brskalnik ni podprt.
notSupportedLink = Zakaj moj brskalnik ni podprt?
notSupportedOutdatedDetail = Ta brskalnik žal ne podpira tehnologije, na kateri temelji Firefox Send. Svoj brskalnik boste morali posodobiti.
updateFirefox = Posodobi Firefox
deletePopupCancel = Prekliči
deleteButtonHover = Izbriši
footerLinkLegal = Pravno obvestilo
footerLinkPrivacy = Zasebnost
footerLinkCookies = Piškotki
passwordTryAgain = Napačno geslo. Poskusite znova.
javascriptRequired = Firefox Send zahteva JavaScript
whyJavascript = Zakaj Firefox Send zahteva JavaScript?
enableJavascript = Omogočite JavaScript in poskusite znova.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }h { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Največja dolžina gesla: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Gesla ni mogoče nastaviti

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox =
    { $sklon ->
       *[imenovalnik] Firefox
        [rodilnik] Firefoxa
        [dajalnik] Firefoxu
        [tozilnik] Firefox
        [mestnik] Firefoxu
        [orodnik] Firefoxom
    }
-mozilla =
    { $sklon ->
       *[imenovalnik] Mozilla
        [rodilnik] Mozille
        [dajalnik] Mozilli
        [tozilnik] Mozillo
        [mestnik] Mozilli
        [orodnik] Mozillo
    }
introTitle = Preprosto, zasebno deljenje datotek
introDescription = { -send-brand } vam omogoča v celoti šifrirano pošiljanje datotek s povezavo, ki samodejno poteče. Z njim lahko zasebno delite svoje datoteke in zagotovite, da ne bodo za vedno ostale na spletu.
notifyUploadEncryptDone = Vaša datoteka je šifrirana in pripravljena za pošiljanje
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Poteče po { $downloadCount } ali čez { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 minuto
        [two] { $num } minuti
        [few] { $num } minute
       *[other] { $num } minut
    }
timespanDays =
    { $num ->
        [one] 1 dan
        [two] { $num } dni
        [few] { $num } dni
       *[other] { $num } dni
    }
timespanWeeks =
    { $num ->
        [one] 1 teden
        [two] { $num } tedna
        [few] { $num } tedne
       *[other] { $num } tednov
    }
fileCount =
    { $num ->
        [one] 1 datoteka
        [two] { $num } datoteki
        [few] { $num } datoteke
       *[other] { $num } datotek
    }
# size is a localized number followed by a unit of bytes, ex. 2.5GB
totalSize = Skupna velikost: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Kopirajte povezavo za deljenje datoteke:
copyLinkButton = Kopiraj povezavo
downloadTitle = Prenesi datoteke
downloadDescription = Ta datoteka je bila v skupni rabi preko { -send-brand } s šifriranjem od konca do konca in povezavo, ki samodejno poteče.
trySendDescription = Preizkusite { -send-brand } za preprosto in varno deljenje datotek.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Naložite lahko največ 1 datoteko naenkrat.
        [two] Naložite lahko največ { $count } datoteki naenkrat.
        [few] Naložite lahko največ { $count } datoteke naenkrat.
       *[other] Naložite lahko največ { $count } datotek naenkrat.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Dovoljen je največ 1 arhiv.
        [two] Dovoljena sta največ { $count } arhiva.
        [few] Dovoljeni so največ { $count } arhivi.
       *[other] Dovoljenih je največ { $count } arhivov.
    }
expiredTitle = Ta povezava je potekla.
notSupportedDescription = { -send-brand } v tem brskalniku ne bo deloval. { -send-short-brand } najbolje deluje v najnovejši različici { -firefox(sklon: "rodilnik") }, deloval pa bo tudi v trenutni različici večine brskalnikov.
downloadFirefox = Prenesite { -firefox }
legalTitle = Obvestilo o zasebnosti za { -send-short-brand }
legalDateStamp = Različica 1.0, v veljavi od 12. marca 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }d { $hours }h { $minutes }m
addFilesButton = Izberite datoteke za nalaganje
uploadButton = Naloži
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Povlecite in spustite datoteke
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# size is a localized number followed by a unit of bytes, ex. 2.5GB
orClickWithSize = ali kliknite za pošiljanje do { $size }
addPassword = Zaščiti z geslom
emailPlaceholder = Vnesite e-poštni naslov
# size is a localized number followed by a unit of bytes, ex. 2.5GB
signInSizeBump = Prijavite se za pošiljanje do { $size }
signInButton = Prijava/Registracija
accountBenefitTitle = Ustvarite { -firefox } Račun ali se prijavite
# size is a localized number followed by a unit of bytes, ex. 2.5GB
accountBenefitLargeFiles = Delite datoteke do velikosti { $size }
accountBenefitDownloadCount = Delite datoteke z več osebami
accountBenefitTimeLimit =
    { $count ->
        [one] Ohranite povezave dejavne do en dan
        [two] Ohranite povezave dejavne do { $count } dni
        [few] Ohranite povezave dejavne do { $count } dni
       *[other] Ohranite povezave dejavne do { $count } dni
    }
accountBenefitSync = Upravljajte deljene datoteke s katerekoli naprave
accountBenefitMoz = Več o drugih storitvah { -mozilla(sklon: "rodilnik") }
signOut = Odjava
okButton = V redu
downloadingTitle = Prenašanje
noStreamsWarning = Ta brskalnik morda ne bo zmogel dešifrirati tako velike datoteke.
noStreamsOptionCopy = Kopirajte povezavo, da jo odprete v drugem brskalniku
noStreamsOptionFirefox = Poskusite z našim najljubšim brskalnikom
noStreamsOptionDownload = Nadaljujte s tem brskalnikom
