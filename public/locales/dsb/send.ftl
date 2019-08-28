# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Komentar
importingFile = Importěrujo se...
encryptingFile = Koděrujo se...
decryptingFile = Dešifrěrujo se...
downloadCount =
    { $num ->
        [one] 1 ześěgnjenje
        [two] { $num } ześěgnjeni
        [few] { $num } ześěgnjenja
       *[other] { $num } ześěgnjenjow
    }
timespanHours =
    { $num ->
        [one] 1 góźina
        [two] { $num } góźinje
        [few] { $num } góźiny
       *[other] { $num } góźin
    }
copiedUrl = Kopěrowany!
unlockInputPlaceholder = Gronidło
unlockButtonLabel = Wótwóriś
downloadButtonLabel = Ześěgnuś
downloadFinish = Ześěgnjenje dokóńcone
fileSizeProgress = ({ $partialSize } z { $totalSize })
sendYourFilesLink = Firefox Send wopytaś
errorPageHeader = Něco njejo se raźiło!
fileTooBig = Toś ta dataja jo pśewjelika za nagraśe. Měła mjeńša ako { $size } byś.
linkExpiredAlt = Wótkaz spadnjony
notSupportedHeader = Waš wobglědowak se njepódpěra.
notSupportedLink = Cogodla se mój wobglědowak njepódpěra?
notSupportedOutdatedDetail = Bóžko toś ta wersija Firefox webtechnologiju njepódpěra, na kótarejž Firefox Send bazěrujo. Musyśo swój wobglědowak aktualizěrowaś.
updateFirefox = Firefox aktualizěrowaś
deletePopupCancel = Pśetergnuś
deleteButtonHover = Wulašowaś
footerLinkLegal = Pšawniske
footerLinkPrivacy = Priwatnosć
footerLinkCookies = Cookieje
passwordTryAgain = Wopacne gronidło. Wopytajśo hyšći raz.
javascriptRequired = Firefox Send JavaScript trjeba
whyJavascript = Cogodla Firefox Send JavaScript trjeba?
enableJavascript = Pšosym zmóžniśo JavaScript a wopytajśo hyšći raz.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours } góź. { $minutes } min.
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes } min.
# A short status message shown when the user enters a long password
maxPasswordLength = Maksimalna dłujkosć gronidła: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Toś to gronidło njedajo se nastajiś

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Jadnore, priwatne datajowe źělenje
introDescription = { -send-brand } wam zmóžnja, dataje z koděrowanim kóńc do kóńca a wótkazom źěliś, kótaryž awtomatiski spadnjo. Tak móžośo źělone wopśimjeśe priwatne źaržaś a zawěsćiś, až waše daty online na pśecej njewóstanu.
notifyUploadEncryptDone = Waša dataja jo skoděrowana za słanje
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Spadnjo pó { $downloadCount } abo { $timespan }
timespanMinutes =
    { $num ->
        [one] { $num } minuta
        [two] { $num } minuśe
        [few] { $num } minuty
       *[other] { $num } minutow
    }
timespanDays =
    { $num ->
        [one] { $num } źeń
        [two] { $num } dnja
        [few] { $num } dny
       *[other] { $num } dnjow
    }
timespanWeeks =
    { $num ->
        [one] { $num } tyźeń
        [two] { $num } tyźenja
        [few] { $num } tyźenje
       *[other] { $num } tyźenjow
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
totalSize = Cełkowna wjelikosć: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Kopěrujśo wótkaz, aby swóju dataju źělił:
copyLinkButton = Wótkaz kopěrowaś
downloadTitle = Dataje ześěgnuś
downloadDescription = Toś ta dataja jo se pśez { -send-brand } z koděrowanim kóńc do kóńca a wótkazom źěliła, kótaryž awtomatiski spadnjo.
trySendDescription = Wopytajśo { -send-brand } za jadnore, wěste datajowe źělenje.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Jano { $count } dataja dajo se naraz nagraś.
        [two] Jano { $count } dataji dajotej se naraz nagraś.
        [few] Jano { $count } dataje daju se naraz nagraś.
       *[other] Jano { $count } datajow dajo se naraz nagraś.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Jano { $count } archiw jo dowólony.
        [two] Jano { $count } archiwa stej dowólonej.
        [few] Jano { $count } archiwy su dowólone.
       *[other] Jano { $count } archiwow jo dowólone.
    }
expiredTitle = Toś ten wótkaz jo spadnjony.
notSupportedDescription = { -send-brand } z toś tym wobglědowakom njefunkcioněrujo. { -send-short-brand } nejlěpjej z nejnowšeju wersiju { -firefox } funkcioněrujo, a funkcioněrujo z aktualneju wersiju nejwěcej wobglědowakow.
downloadFirefox = { -firefox } ześěgnuś
legalTitle = Powěźeńka priwatnosći { -send-short-brand }
legalDateStamp = Wersija 1.0 wót 12. měrca 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }ź { $hours }g { $minutes }m
addFilesButton = Dataje za nagrawanje wubraś
uploadButton = Nagraś
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Śěgniśo a wótpołožćo dataje
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = abo klikniśo, aby do { $size } pósłał
addPassword = Z gronidłom šćitaś
emailPlaceholder = Zapódajśo swóju e-mailowu adresu
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Pśizjawśo se, aby do { $size } pósłał
signInOnlyButton = Pśizjawiś
accountBenefitTitle = Załožćo konto { -firefox } abo pśizjawśo se
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Dataje do { $size } źěliś
accountBenefitDownloadCount = Dataje z wěcej luźimi źěliś
accountBenefitTimeLimit =
    { $count ->
        [one] Wótkaze do { $count } dnja aktiwne źaržaś
        [two] Wótkaze do { $count } dnjowu aktiwne źaržaś
        [few] Wótkaze do { $count } dnjow aktiwne źaržaś
       *[other] Wótkaze do { $count } dnjow aktiwne źaržaś
    }
accountBenefitSync = Źělone dataje z někakego rěda zastojaś
accountBenefitMoz = Zgóńśo wěcej wó drugich słužbach { -mozilla }
signOut = Wótzjawiś
okButton = W pórěźe
downloadingTitle = Ześěgujo se
noStreamsWarning = Toś ten wobglědowak njamógał taku wjeliku dataju dešifrěrowaś.
noStreamsOptionCopy = Kopěrujśo wótkaz, aby jen w drugim wobglědowaku wócynił
noStreamsOptionFirefox = Wopytajśo naš nejlubšy wobglědowak
noStreamsOptionDownload = Z toś tym wobglědowakom pókšacowaś
downloadFirefoxPromo = { -send-short-brand } se wam pśez cele nowy { -firefox } pśinjaso.
# the next line after the colon contains a file name
shareLinkDescription = Źělśo wótkaz k swójej dataji:
shareLinkButton = Wótkaz źěliś
# $name is the name of the file
shareMessage = Ześěgniśo „{ $name }“ z { -send-brand }: jadnore, wěste źělenje datajow
trailheadPromo = Jo móžnosć, wašu priwatnosć šćitaś. Pśiźćo k Firefox.
learnMore = Dalšne informacije.
