# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Palaute
importingFile = Tuodaan…
encryptingFile = Salataan...
decryptingFile = Puretaan salausta...
downloadCount =
    { $num ->
        [one] yhden latauksen
       *[other] { $num } latauksen
    }
timespanHours =
    { $num ->
        [one] 1 tunnin
       *[other] { $num } tunnin
    }
copiedUrl = Kopioitu!
unlockInputPlaceholder = Salasana
unlockButtonLabel = Avaa
downloadButtonLabel = Lataa
downloadFinish = Lataus valmis
fileSizeProgress = { $partialSize } / { $totalSize }
sendYourFilesLink = Kokeile Firefox Sendiä
errorPageHeader = Jokin meni pieleen!
fileTooBig = Tämä tiedosto on liian suuri ladattavaksi. Sen pitäisi olla pienempi kuin { $size }.
linkExpiredAlt = Linkki on vanhentunut
notSupportedHeader = Selaintasi ei tueta.
notSupportedLink = Miksi selaintani ei tueta?
notSupportedOutdatedDetail = Valitettavasti tämä Firefoxin versio ei tue Firefox Sendiä käyttävää web-tekniikkaa. Sinun on päivitettävä selaimesi.
updateFirefox = Päivitä Firefox
deletePopupCancel = Peruuta
deleteButtonHover = Poista
footerLinkLegal = Juridiset asiat
footerLinkPrivacy = Tietosuoja
footerLinkCookies = Evästeet
passwordTryAgain = Väärä salasana. Yritä uudelleen.
javascriptRequired = Firefox-Send vaatii JavaScriptin
whyJavascript = Miksi Firefox Send vaatii JavaScriptin?
enableJavascript = Ota JavaScript käyttöön ja yritä uudelleen.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }t { $minutes }min
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }min
# A short status message shown when the user enters a long password
maxPasswordLength = Salasanan enimmäispituus: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Tätä salasanaa ei voitu asettaa

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Helppoa ja yksityistä tiedostonjakoa
notifyUploadEncryptDone = Tiedosto on salattu ja valmis lähetettäväksi
timespanMinutes =
    { $num ->
        [one] 1 minuutti
       *[other] { $num } minuuttia
    }
timespanDays =
    { $num ->
        [one] 1 päivä
       *[other] { $num } päivää
    }
timespanWeeks =
    { $num ->
        [one] 1 viikko
       *[other] { $num } viikkoa
    }
fileCount =
    { $num ->
        [one] 1 tiedosto
       *[other] { $num } tiedostoa
    }
# byte abbreviation
bytes = t
# kibibyte abbreviation
kb = kt
# mebibyte abbreviation
mb = Mt
# gibibyte abbreviation
gb = Gt
# localized number and byte abbreviation. example "2.5MB"
fileSize = { $num } { $units }
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
totalSize = Koko yhteensä: { $size }
copyLinkButton = Kopioi linkki
downloadTitle = Lataa tiedostot
trySendDescription = Kokeile { -send-brand } -palvelua jakaaksesi tiedostoja helposti ja turvallisesti.
expiredTitle = Tämä linkki on vanhentunut.
notSupportedDescription = { -send-brand } ei toimi tällä selaimella. { -send-short-brand } toimii parhaiten { -firefox }in uusimmalla versiolla, ja toimii useimpien selainten uusimmilla versioilla.
downloadFirefox = Lataa { -firefox }
legalTitle = { -send-short-brand }-yksityisyyskäytäntö
legalDateStamp = Versio 1.0, päivätty 13. maaliskuuta 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days } pv { $hours } t { $minutes } min
addFilesButton = Valitse lähetettävät tiedostot
uploadButton = Lähetä
addPassword = Suojaa salasanalla
emailPlaceholder = Kirjoita sähköpostiosoitteesi
signInButton = Kirjaudu tai rekisteröidy
accountBenefitTitle = Luo { -firefox }-tili tai kirjaudu sisään
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Jaa tiedostoja, joiden koko on enintään { $size }
accountBenefitDownloadCount = Jaa tiedostoja useamman ihmisen kesken
accountBenefitMoz = Lue lisää muista { -mozilla }-palveluista
signOut = Kirjaudu ulos
okButton = OK
downloadingTitle = Ladataan
noStreamsWarning = Tämä selain ei välttämättä osaa purkaa salausta näin suurikokoisista tiedostoista.
noStreamsOptionFirefox = Kokeile suosikkiselaintamme
noStreamsOptionDownload = Jatka tällä selaimella
