# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Komentar
importingFile = Importuje so...
encryptingFile = Zaklučuje so...
decryptingFile = Dešifruje so...
downloadCount =
    { $num ->
        [one] 1 sćehnjenje
        [two] { $num } sćehnjeni
        [few] { $num } sćehnjenja
       *[other] { $num } sćehnjenjow
    }
timespanHours =
    { $num ->
        [one] 1 hodźina
        [two] { $num } hodźinje
        [few] { $num } hodźiny
       *[other] { $num } hodźin
    }
copiedUrl = Kopěrowany!
unlockInputPlaceholder = Hesło
unlockButtonLabel = Wotewrěć
downloadButtonLabel = Sćahnyć
downloadFinish = Sćehnjenje dokónčene
fileSizeProgress = ({ $partialSize } z { $totalSize })
sendYourFilesLink = Firefox Send wupruwować
errorPageHeader = Něšto je so nimokuliło!
fileTooBig = Tuta dataja je přewulka za nahraće. Měła mjeńša hač { $size } być.
linkExpiredAlt = Wotkaz je spadnjeny
notSupportedHeader = Waš wobhladowak so njepodpěruje.
notSupportedLink = Čehodla so mój wobhladowak njepodpěruje?
notSupportedOutdatedDetail = Bohužel tuta wersija Firefox webtechnologiju njepodpěruje, na kotrejž Firefox Send bazuje. Dyrbiće swój wobhladowak aktualizować.
updateFirefox = Firefox aktualizować
deletePopupCancel = Přetorhnyć
deleteButtonHover = Zhašeć
footerLinkLegal = Prawniske
footerLinkPrivacy = Priwatnosć
footerLinkCookies = Placki
passwordTryAgain = Wopačne hesło. Prošu spytajće hišće raz.
javascriptRequired = Firefox Send JavaScript trjeba
whyJavascript = Čehodla Firefox Send JavaScript trjeba?
enableJavascript = Prošu zmóžńće JavaScript a spytajće hišće raz.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours } hodź. { $minutes } mjeń.
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes } mjeń.
# A short status message shown when the user enters a long password
maxPasswordLength = Maksimalna dołhosć hesła: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Tute hesło njeda so nastajić

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Jednore, priwatne datajowe dźělenje
introDescription = { -send-brand } wam zmóžnja, dataje ze zaklučowanjom kónc do kónca a wotkazom dźělić, kotryž awtomatisce spadnje. Tak móžeće dźěleny wobsah priwatny dźeržeć a zawěsćić, zo waše daty online na přeco njewóstanu.
notifyUploadEncryptDone = Waša dataja je zaklučowana a hotowa za słanje
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Spadnje po { $downloadCount } abo { $timespan }
timespanMinutes =
    { $num ->
        [one] { $num } mjeńšina
        [two] { $num } mjeńšinje
        [few] { $num } mjeńšiny
       *[other] { $num } mjeńšin
    }
timespanDays =
    { $num ->
        [one] { $num } dźeń
        [two] { $num } dnjej
        [few] { $num } dny
       *[other] { $num } dnjow
    }
timespanWeeks =
    { $num ->
        [one] { $num } tydźeń
        [two] { $num } njedźeli
        [few] { $num } njedźele
       *[other] { $num } njedźel
    }
fileCount =
    { $num ->
        [one] { $num } dataja
        [two] { $num } dataji
        [few] { $num } dataje
       *[other] { $num } datajow
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
totalSize = Cyłkowna wulkosć: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Kopěrujće wotkaz, zo byšće swoju dataju dźělił:
copyLinkButton = Wotkaz kopěrować
downloadTitle = Dataje sćahnyć
downloadDescription = Tuta dataja je so přez { -send-brand } ze zaklučowanjom kónc do kónca a wotkazom dźěliła, kotryž awtomatisce spadnje.
trySendDescription = Spytajće { -send-brand } za jednore, wěste datajowe dźělenje.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Jenož { $count } dataja da so na jedne dobo nahrać.
        [two] Jenož { $count } dataji datej so na jedne dobo nahrać.
        [few] Jenož { $count } dataje dadźa so na jedne dobo nahrać.
       *[other] Jenož { $count } datajow da so na jedne dobo nahrać.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Jenož { $count } archiw je dowoleny.
        [two] Jenož { $count } archiwaj stej dowolenej.
        [few] Jenož { $count } archiwy su dowolene.
       *[other] Jenož { $count } archiwow je dowolene.
    }
expiredTitle = Tutón wotkaz je spadnjeny.
notSupportedDescription = { -send-brand } z tutym wobhladowakom njefunguje. { -send-short-brand } najlěpje z najnowšej wersiju { -firefox } funguje, a funguje z aktualnej wersiju najwjace wobhladowakow.
downloadFirefox = { -firefox } scáhnyć
legalTitle = Zdźělenka priwatnosće { -send-short-brand }
legalDateStamp = Wersija 1.0 wot 12. měrca 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }d { $hours }h { $minutes }m
addFilesButton = Dataje za nahrawanje wubrać
uploadButton = Nahrać
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Ćehńće a wotkładźće dataje
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = abo klikńće, zo byšće do { $size } pósłał
addPassword = Z hesłom škitać
emailPlaceholder = Zapodajće swoju e-mejlowu adresu
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Přizjewće so, zo byšće do { $size } pósłał
signInButton = Přizjewić/Registrować
accountBenefitTitle = Załožće konto { -firefox } abo přizjewće so
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Dataje do { $size } dźělić
accountBenefitDownloadCount = Dataje z wjace ludźimi dźělić
accountBenefitTimeLimit =
    { $count ->
        [one] Wotkazy do { $count } dnja aktiwne dźeržeć
        [two] Wotkazy do { $count } dnjow aktiwne dźeržeć
        [few] Wotkazy do { $count } dnjow aktiwne dźeržeć
       *[other] Wotkazy do { $count } dnjow aktiwne dźeržeć
    }
accountBenefitSync = Dźělene dataje z někajkeho grata rjadować
accountBenefitMoz = ZHońće wjace wo druhich słužbach { -mozilla }
signOut = Wotzjewić
okButton = W porjadku
downloadingTitle = Sćahuje so
noStreamsWarning = Tutón wobhladowak njemóhł tajku wulku dataju dešifrować.
noStreamsOptionCopy = Kopěrujće wotkaz, zo byšće jón w druhim wobhladowaku wočinił
noStreamsOptionFirefox = Wupruwujće naš najlubši wobhladowak
noStreamsOptionDownload = Z tutym wobhladowakom pokročować
