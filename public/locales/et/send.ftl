# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Tagasiside
importingFile = Importimine...
encryptingFile = Krüptimine…
decryptingFile = Dekrüptimine...
downloadCount =
    { $num ->
        [one] üht allalaadimist
       *[other] { $num } allalaadimist
    }
timespanHours =
    { $num ->
        [one] üht tundi
       *[other] { $num } tundi
    }
copiedUrl = Kopeeritud!
unlockInputPlaceholder = Parool
unlockButtonLabel = Ava
downloadButtonLabel = Laadi alla
downloadFinish = Allalaadimine lõpetati
fileSizeProgress = ({ $partialSize }/{ $totalSize })
sendYourFilesLink = Proovi Firefox Sendi
errorPageHeader = Midagi läks valesti!
fileTooBig = Fail on üleslaadimiseks liiga suur. See peaks olema väiksem kui { $size }.
linkExpiredAlt = Link on aegunud
notSupportedHeader = Sinu brauser pole toetatud.
notSupportedLink = Miks mu brauser toetatud pole?
notSupportedOutdatedDetail = Kahjuks ei toeta see Firefoxi versioon veebitehnoloogiaid, mis teevad Firefox Sendi toimimise võimalikuks. Sa pead oma brauserit uuendama.
updateFirefox = Uuenda Firefox
deletePopupCancel = Loobu
deleteButtonHover = Kustuta
footerLinkLegal = Õiguslik teave
footerLinkPrivacy = Privaatsusest
footerLinkCookies = Küpsistest
passwordTryAgain = Vale parool. Palun proovi uuesti.
javascriptRequired = Firefox Send'i kasutamiseks tuleb JavaScript lubada
whyJavascript = Miks Firefox Send JavaScripti vajab?
enableJavascript = Palun luba JavaScript ja proovi uuesti.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }t { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Maksimaalne parooli pikkus: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Parooli muutmine ebaõnnestus

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Lihtne ja privaatne failijagamine
notifyUploadEncryptDone = Sinu fail on krüptitud ja saatmiseks valmis
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Aegub peale { $downloadCount } või { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 minut
       *[other] { $num } minutit
    }
timespanDays =
    { $num ->
        [one] 1 päev
       *[other] { $num } päeva
    }
timespanWeeks =
    { $num ->
        [one] 1 nädal
       *[other] { $num } nädalat
    }
fileCount =
    { $num ->
        [one] 1 fail
       *[other] { $num } faili
    }
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
totalSize = Kogusuurus: { $size }
copyLinkButton = Kopeeri link
downloadTitle = Failide allalaadimine
uploadButton = Laadi üles
signInOnlyButton = Logi sisse
signOut = Logi välja
okButton = Olgu
shareLinkButton = Jaga linki
