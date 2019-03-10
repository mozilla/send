# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Spätná väzba
importingFile = Importuje sa…
encryptingFile = Šifruje sa…
decryptingFile = Dešifruje sa…
downloadCount =
    { $num ->
        [one] 1 prevzatí
        [few] { $num } prevzatiach
       *[other] { $num } prevzatiach
    }
timespanHours =
    { $num ->
        [one] 1 hodine
        [few] { $num } hodinách
       *[other] { $num } hodinách
    }
copiedUrl = Skopírované!
unlockInputPlaceholder = Heslo
unlockButtonLabel = Odomknúť
downloadButtonLabel = Prevziať
downloadFinish = Preberanie bolo dokončené
fileSizeProgress = ({ $partialSize } z { $totalSize })
sendYourFilesLink = Vyskúšajte Firefox Send
errorPageHeader = Vyskytol sa problém.
fileTooBig = Súbor je príliš veľký. Mal by byť menší než { $size }.
linkExpiredAlt = Platnosť odkazu vypršala
notSupportedHeader = Váš prehliadač nie je podporovaný.
notSupportedLink = Prečo nie je môj prehliadač podporovaný?
notSupportedOutdatedDetail = Žiaľ, táto verzia Firefoxu nepodporuje webovú technológiu, ktorá poháňa Firefox Send. Budete musieť aktualizovať svoj prehliadač.
updateFirefox = Aktualizovať Firefox
deletePopupCancel = Zrušiť
deleteButtonHover = Odstrániť
footerLinkLegal = Právne informácie
footerLinkPrivacy = Súkromie
footerLinkCookies = Cookies
passwordTryAgain = Nesprávne heslo. Skúste to znova.
javascriptRequired = Firefox Send vyžaduje JavaScript
whyJavascript = Prečo Firefox Send vyžaduje JavaScript?
enableJavascript = Prosím, povoľte JavaScript a skúste to znova.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours } hod. { $minutes } min.
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes } min.
# A short status message shown when the user enters a long password
maxPasswordLength = Maximálna dĺžka hesla: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Heslo nešlo nastaviť

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
notifyUploadEncryptDone = Váš súbor je zašifrovaný a pripravený na odoslanie
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Platnosť odkazu vyprší po { $downloadCount } alebo po { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 minúte
        [few] { $num } minútach
       *[other] { $num } minútach
    }
timespanDays =
    { $num ->
        [one] 1 dni
        [few] { $num } dňoch
       *[other] { $num } dňoch
    }
timespanWeeks =
    { $num ->
        [one] 1 týždni
        [few] { $num } týždňoch
       *[other] { $num } týždňoch
    }
# size is a localized number followed by a unit of bytes, ex. 2.5GB
totalSize = Celková veľkosť: { $size }
copyLinkButton = Kopírovať odkaz
downloadTitle = Prevziať súbory
expiredTitle = Platnosť odkazu vypršala.
downloadFirefox = Prevziať { -firefox }
addFilesButton = Vyberte súbory pre nahratie
uploadButton = Nahrať
emailPlaceholder = Zadajte e-mailovú adresu
signOut = Odhlásiť sa
okButton = OK
downloadingTitle = Preberá sa
noStreamsWarning = Tento prehliadač nemusí byť schopný dešifrovať takto veľký súbor.
noStreamsOptionFirefox = Vyskúšajte náš obľúbený prehliadač
noStreamsOptionDownload = Pokračovať v tomto prehliadači
