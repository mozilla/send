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
introTitle = Jednoduché a súkromné zdieľanie súborov
introDescription = S { -send-brand(case: "ins") } sú zdieľané súbory šifrované end-to-end, takže ani my nevieme, čo zdieľate. Platnosť odkazu je navyše obmedzená. Súbory tak môžete zdieľať súkromne a s istotou, že neostanú na internete naveky.
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
fileCount =
    { $num ->
        [one] 1 súbor
        [few] { $num } súbory
       *[other] { $num } súborov
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
fileSize = { $num } { $units }
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
totalSize = Celková veľkosť: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Súbor môžete zdieľať pomocou tohto odkazu:
copyLinkButton = Kopírovať odkaz
downloadTitle = Prevziať súbory
downloadDescription = Tento súbor bol zdieľaný prostredníctvom služby { -send-brand }, ktorá poskytuje end-to-end šifrovanie a odkazy s obmedzenou platnosťou.
trySendDescription = Vyskúšajte jednoduché a bezpečné zdieľanie súborov so službou { -send-brand }
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Naraz možno nahrávať len 1 súbor.
        [few] Naraz možno nahrávať len { $count } súbory.
       *[other] Naraz možno nahrávať len { $count } súborov.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Povolený je najviac 1 archív.
        [few] Povolené sú najviac { $count } archívy.
       *[other] Povolených je najviac { $count } archívov.
    }
expiredTitle = Platnosť odkazu vypršala.
notSupportedDescription = { -send-brand } nebude v tomto prehliadači fungovať. { -send-short-brand } najlepšie funguje v najnovšej verzii { -firefox(case: "gen") } alebo aktuálnych verziách najpoužívanejších prehliadačov.
downloadFirefox = Prevziať { -firefox }
legalTitle = Zásady ochrany súkromia služby { -send-short-brand }
legalDateStamp = Verzia 1.0, z 12. marca 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days } d { $hours } h { $minutes } min
addFilesButton = Vyberte súbory pre nahratie
uploadButton = Nahrať
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Pretiahnutím súboru alebo kliknutím sem
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = môžete poslať až { $size }
addPassword = Chrániť heslom
emailPlaceholder = Zadajte e-mailovú adresu
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Pre odoslanie súborov s veľkosťou až { $size }, sa, prosím, prihláste
signInOnlyButton = Prihlásiť sa
accountBenefitTitle = Vytvorte si účet { -firefox } alebo sa prihláste
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Zdieľanie súborov s veľkosťou až { $size }
accountBenefitDownloadCount = Zdieľanie súborov s viacerými ľuďmi
accountBenefitTimeLimit =
    { $count ->
        [one] Odkazy platné až 1 deň
        [few] Odkazy platné až { $count } dni
       *[other] Odkazy platné až { $count } dní
    }
accountBenefitSync = Správa zdieľaných súborov z akéhokoľvek zariadenia
accountBenefitMoz = Ďalšie informácie o ďalších službách od { -mozilla(case: "gen") }
signOut = Odhlásiť sa
okButton = OK
downloadingTitle = Preberá sa
noStreamsWarning = Tento prehliadač nemusí byť schopný dešifrovať takto veľký súbor.
noStreamsOptionCopy = Skopírovať odkaz pre otvorenie v inom prehliadači
noStreamsOptionFirefox = Vyskúšajte náš obľúbený prehliadač
noStreamsOptionDownload = Pokračovať v tomto prehliadači
downloadFirefoxPromo = { -send-short-brand } vám prináša najnovší { -firefox }.
# the next line after the colon contains a file name
shareLinkDescription = Zdieľajte odkaz na súbor:
shareLinkButton = Zdieľať odkaz
# $name is the name of the file
shareMessage = Prevezmite si súbor „{ $name }“ so službou { -send-brand } - jednoduché a bezpečné zdieľanie súborov
