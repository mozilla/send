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
linkExpiredAlt = Veza je istekla
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
passwordSetError = Ne možemo postaviti ovu lozinku

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
copyLinkDescription = Kopirajte vezu da biste podijelili svoju datoteku:
copyLinkButton = Kopiraj poveznicu
downloadTitle = Preuzmite datoteke
downloadDescription = Ova datoteka je podjeljena putem { -send-brand } s kriptiranjem od kraja do kraja i vezom koja automatski istječe.
trySendDescription = Probajte { -send-brand } za jednostavno i sigurno dijeljenje datoteka.
downloadFirefox = Preuzmite { -firefox }
signOut = Odjavi se
