# Send is a brand name and should not be localized.
title = Send
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
        [one] 1 tunni
       *[other] { $num } tunni
    }
copiedUrl = Kopeeritud!
unlockInputPlaceholder = Parool
unlockButtonLabel = Ava
downloadButtonLabel = Laadi alla
downloadFinish = Allalaadimine lõpetati
fileSizeProgress = ({ $partialSize }/{ $totalSize })
sendYourFilesLink = Proovi Send'i
errorPageHeader = Midagi läks valesti!
fileTooBig = Fail on üleslaadimiseks liiga suur. See peaks olema väiksem kui { $size }.
linkExpiredAlt = Link on aegunud
notSupportedHeader = Sinu brauser pole toetatud.
notSupportedLink = Miks mu brauser toetatud pole?
notSupportedOutdatedDetail = Kahjuks ei toeta see Firefoxi versioon veebitehnoloogiaid, mis teevad Sendi toimimise võimalikuks. Sa pead oma brauserit uuendama.
updateFirefox = Uuenda Firefox
deletePopupCancel = Loobu
deleteButtonHover = Kustuta
footerLinkLegal = Õiguslik teave
footerLinkPrivacy = Privaatsusest
footerLinkCookies = Küpsistest
passwordTryAgain = Vale parool. Palun proovi uuesti.
javascriptRequired = Send'i kasutamiseks tuleb JavaScript lubada
whyJavascript = Miks Send JavaScripti vajab?
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

# Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Lihtne ja privaatne failijagamine
introDescription = { -send-brand } võimaldab sul faile jagada otspunktkrüpteerimise ning automaatselt aeguva lingiga. Nii saad jagatava privaatsena hoida ja kindlustada, et su asjad igavesti internetti vedelema ei jää.
notifyUploadEncryptDone = Sinu fail on krüptitud ja saatmiseks valmis
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Aegub peale { $downloadCount } või { $timespan } järel
timespanMinutes =
    { $num ->
        [one] 1 minuti
       *[other] { $num } minuti
    }
timespanDays =
    { $num ->
        [one] 1 päeva
       *[other] { $num } päeva
    }
timespanWeeks =
    { $num ->
        [one] 1 nädala
       *[other] { $num } nädala
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
# the next line after the colon contains a file name
copyLinkDescription = Faili jagamiseks kopeeri link:
copyLinkButton = Kopeeri link
downloadTitle = Failide allalaadimine
downloadDescription = See fail jagati teenuse { -send-brand } kaudu otspunktkrüpteeritult ja automaatselt aeguva lingiga.
trySendDescription = Proovi lihtsaks ja turvaliseks failijagamiseks { -send-brand } teenust.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Korraga saab üles laadida vaid 1 faili.
       *[other] Korraga saab üles laadida vaid { $count } faili.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Vaid 1 arhiveerimine on lubatud.
       *[other] Vaid { $count } arhiveerimist on lubatud.
    }
expiredTitle = Link on aegunud.
notSupportedDescription = { -send-brand } ei tööta selle veebilehitsejaga. Kõige paremini töötab { -send-short-brand } uusima { -firefox }iga ja töötab ka enamikes teistes uuendatud brauserites.
downloadFirefox = Laadi { -firefox } alla
legalTitle = { -send-short-brand } privaatsusteade
legalDateStamp = Versioon 1.0, alates 12. märts 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }p { $hours }t { $minutes }m
addFilesButton = Vali failid üleslaadimiseks
uploadButton = Laadi üles
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Lohista failid siia
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = või klõpsa kuni { $size } suuruste failide saatmiseks
addPassword = Kaitse parooliga
emailPlaceholder = Sisesta e-posti aadress
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Logi sisse ning saad saata kuni { $size } suuruseid faile
signInOnlyButton = Logi sisse
accountBenefitTitle = Loo { -firefox }i konto või logi sisse
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Jaga kuni { $size } suuruseid faile
accountBenefitDownloadCount = Jaga faile enamate inimestega
accountBenefitTimeLimit =
    { $count ->
        [one] Hoia linke aktiivsena 1 päev
       *[other] Hoia linke aktiivsena kuni { $count } päeva
    }
accountBenefitSync = Jagatud faile saad hallata mis tahes seadmes
accountBenefitMoz = Rohkem teavet teistest { -mozilla } teenustest
signOut = Logi välja
okButton = Olgu
downloadingTitle = Allalaadimine
noStreamsWarning = Sinu veebilehitseja ei pruugi suuta nii suurt faili dekrüptida.
noStreamsOptionCopy = Kopeeri link teises brauseris avamiseks
noStreamsOptionFirefox = Proovi meie lemmikbrauserit
noStreamsOptionDownload = Jätka selle brauseriga
downloadFirefoxPromo = { -send-short-brand } toob sinuni uhiuus { -firefox }.
# the next line after the colon contains a file name
shareLinkDescription = Jaga linki failile:
shareLinkButton = Jaga linki
# $name is the name of the file
shareMessage = Laadi “{ $name }” alla teenusega { -send-brand }, mis pakub lihtsat ja turvalist failijagamist
trailheadPromo = Oma privaatsust on võimalik kaitsta. Liitu Firefoxiga.
learnMore = Rohkem teavet.
