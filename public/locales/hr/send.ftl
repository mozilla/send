# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Povratne informacije
importingFile = Uvoz…
encryptingFile = Kriptiranje…
decryptingFile = Dekriptiranje…
downloadCount =
    { $num ->
        [one] { $num } preuzimanje
        [few] { $num } preuzimanja
       *[other] { $num } preuzimanja
    }
timespanHours =
    { $num ->
        [one] { $num } sat
        [few] { $num } sata
       *[other] { $num } sati
    }
copiedUrl = Kopirano!
unlockInputPlaceholder = Lozinka
unlockButtonLabel = Otključaj
downloadButtonLabel = Preuzmi
downloadFinish = Preuzimanje je završeno.
fileSizeProgress = ({ $partialSize } od { $totalSize })
sendYourFilesLink = Isprobajte Firefox Send
errorPageHeader = Nešto je pošlo naopako!
fileTooBig = Datoteka je prevelika za prijenos. Treba biti manja od { $size }.
linkExpiredAlt = Poveznica je istekla
notSupportedHeader = Vaš preglednik nije podržan.
notSupportedLink = Zašto moj preglednik nije podržan?
notSupportedOutdatedDetail = Nažalost, ovo izdanje Firefoxa ne podržava web tehnologiju koja omogućava Firefox Send. Morat ćete ažurirati vaš preglednik.
updateFirefox = Ažuriraj Firefox
deletePopupCancel = Otkaži
deleteButtonHover = Obriši
footerLinkLegal = Pravni podaci
footerLinkPrivacy = Privatnost
footerLinkCookies = Kolačići
passwordTryAgain = Netočna lozinka. Pokušaj ponovo.
javascriptRequired = Za Firefox Send je potreban JavaScript
whyJavascript = Zašto je za Firefox Send potreban JavaScript?
enableJavascript = Omogućite JavaScript i pokušajte ponovo.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }s { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Najveća dužina lozinke: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Lozinku nije moguće postaviti

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Jednostavno i privatno dijeljenje datoteka
introDescription = { -send-brand } vam omogućava dijeljenje datoteka s kriptiranjem i poveznicu koja automatski ističe. Ovim putem stvari koje dijelite ostaju privatne i osiguravate se da ne ostaju zauvijek dostupne na Internetu.
notifyUploadEncryptDone = Vaša datoteka je kriptirana i spremna za slanje.
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Istječe nakon { $downloadCount } ili { $timespan }
timespanMinutes =
    { $num ->
        [one] { $num } minuta
        [few] { $num } minute
       *[other] { $num } minuta
    }
timespanDays =
    { $num ->
        [one] { $num } dan
        [few] { $num } dana
       *[other] { $num } dana
    }
timespanWeeks =
    { $num ->
        [one] { $num } tjedan
        [few] { $num } tjedna
       *[other] { $num } tjedana
    }
fileCount =
    { $num ->
        [one] { $num } datoteka
        [few] { $num } datoteke
       *[other] { $num } datoteka
    }
# size is a localized number followed by a unit of bytes, ex. 2.5GB
totalSize = Ukupna veličina: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Kopirajte poveznicu da biste podijelili svoju datoteku:
copyLinkButton = Kopiraj poveznicu
downloadTitle = Preuzmite datoteke
downloadDescription = Ova datoteka je podjeljena putem { -send-brand } s kriptiranjem i poveznicom koja automatski istječe.
trySendDescription = Probajte { -send-brand } za jednostavno i sigurno dijeljenje datoteka.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Istovremeno se može prenijeti samo { $count } datoteka.
        [few] Istovremeno se može prenijeti samo { $count } datoteke.
       *[other] Istovremeno se može prenijeti samo { $count } datoteka.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Dozvoljena je samo { $count } arhiva.
        [few] Dozvoljene su samo { $count } arhive.
       *[other] Dozvoljeno je samo { $count } arhiva.
    }
expiredTitle = Poveznica je istekla.
notSupportedDescription = { -send-brand } neće raditi s ovim preglednikom. { -send-short-brand } radi najbolje s zadnjom { -firefox } inačicom i radit će s trenutnom inačicom većine preglednika.
downloadFirefox = Preuzmite { -firefox }
legalTitle = { -send-short-brand } politika privatnosti
legalDateStamp = Inačica 1.0, od 12. ožujka 2019. godine
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }d { $hours }s { $minutes }m
addFilesButton = Odaberite datoteke za prijenos
uploadButton = Prijenos
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Povucite i ispustite datoteke
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# size is a localized number followed by a unit of bytes, ex. 2.5GB
orClickWithSize = ili kliknite za slanje do { $size }
addPassword = Zaštitite lozinkom
emailPlaceholder = Unesite svoju adresu e-pošte
# size is a localized number followed by a unit of bytes, ex. 2.5GB
signInSizeBump = Prijavite se za slanje do { $size }
signInButton = Prijavite se
accountBenefitTitle = Stvorite { -firefox } račun ili se prijavite
# size is a localized number followed by a unit of bytes, ex. 2.5GB
accountBenefitLargeFiles = Dijelite datoteke do { $size }
accountBenefitDownloadCount = Dijelite datoteke s više osoba
accountBenefitTimeLimit =
    { $count ->
        [one] Neka poveznice budu aktivne { $count } dan
        [few] Neka poveznice budu aktivne { $count } dana
       *[other] Neka poveznice budu aktivne { $count } dana
    }
accountBenefitSync = Upravljanje dijeljenim datotekama s bilo kojeg uređaja
accountBenefitMoz = Saznajte više o drugim { -mozilla } uslugama
signOut = Odjavi se
okButton = U redu
downloadingTitle = Preuzimanje
noStreamsWarning = Ovaj preglednik možda neće moći dekriptirati datoteku ove veličine.
noStreamsOptionCopy = Kopirajte poveznicu kako biste je otvorili u drugom pregledniku
noStreamsOptionFirefox = Isprobajte naš omiljeni preglednik
noStreamsOptionDownload = Nastavite s ovim preglednikom
