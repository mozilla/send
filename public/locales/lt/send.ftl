# Send is a brand name and should not be localized.
title = Send
importingFile = Importuojama…
encryptingFile = Šifruojama…
decryptingFile = Iššifruojama…
downloadCount =
    { $num ->
        [one] { $num } kartą
        [few] { $num } kartus
       *[other] { $num } kartų
    }
timespanHours =
    { $num ->
        [one] { $num } valandos
        [few] { $num } valandų
       *[other] { $num } valandų
    }
copiedUrl = Nukopijuota!
unlockInputPlaceholder = Slaptažodis
unlockButtonLabel = Atrakinti
downloadButtonLabel = Parsisiųsti
downloadFinish = Parsiuntimas baigtas
fileSizeProgress = ({ $partialSize } iš { $totalSize })
sendYourFilesLink = Išbandyti „Send“
errorPageHeader = Nutiko kažkas negero!
fileTooBig = Pasirinktas failas yra per didelis, kad jį būtų galima įkelti. Failo dydis neturėtų viršyti { $size }
linkExpiredAlt = Saitas nebegalioja
notSupportedHeader = Jūsų naršyklė nepalaikoma.
notSupportedLink = Kodėl mano naršyklė nepalaikoma?
notSupportedOutdatedDetail = Deja, šioje „Firefox“ naršyklės laidoje nepalaikoma „Send“ veikti reikalinga technologija. Jeigu norite naudotis šia paslauga, turėsite atnaujinti savo naršyklę.
updateFirefox = Atnaujinti „Firefox“
deletePopupCancel = Atsisakyti
deleteButtonHover = Šalinti
footerLinkLegal = Teisinė informacija
footerLinkPrivacy = Privatumas
footerLinkCookies = Slapukai
passwordTryAgain = Slaptažodis netinka. Bandykite dar kartą.
javascriptRequired = „Send“ veikimui būtina įgalinti „JavaScript“ palaikymą
whyJavascript = Kodėl „Send“ neveikia išjungus „JavaScript“?
enableJavascript = Įgalinkit „JavaScript“ ir bandykite dar kartą.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours } val. { $minutes } min.
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes } min.
# A short status message shown when the user enters a long password
maxPasswordLength = Didžiausias leistinas slaptažodžio ilgis: { $length } simb.
# A short status message shown when there was an error setting the password
passwordSetError = Slaptažodžio nustatyti nepavyko

## Send version 2 strings

# Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Send
-send-short-brand = Send
-firefox = Firefox
-mozilla =
    { $case ->
       *[nominative] Mozilla
        [genitive] Mozillos
        [dative] Mozillai
        [accusative] Mozillą
        [instrumental] Mozilla
        [locative] Mozilloje
    }
introTitle = Paprastas ir privatus dalijimasis failais
introDescription = „{ -send-brand }“ suteikia galimybę dalintis failais, pasitelkiant abipusį šifravimą ir riboto galiojimo saitus. Tai padeda pasidalintus failus išlaikyti privačiais ir užtikrina, jog trumpam įkelti failai neliks pasiekiami internete amžinai.
notifyUploadEncryptDone = Failas užšifruotas ir parengtas išsiuntimui
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Nustos galioti parsisiuntus { $downloadCount } arba po { $timespan }
timespanMinutes =
    { $num ->
        [one] { $num } minutės
        [few] { $num } minučių
       *[other] { $num } minučių
    }
timespanDays =
    { $num ->
        [one] { $num } dienos
        [few] { $num } dienų
       *[other] { $num } dienų
    }
timespanWeeks =
    { $num ->
        [one] { $num } savaitės
        [few] { $num } savaičių
       *[other] { $num } savaičių
    }
fileCount =
    { $num ->
        [one] { $num } failas
        [few] { $num } failai
       *[other] { $num } failų
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
fileSize = { $num } { $units }
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
totalSize = Bendras dydis: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Nukopijuokite saitą, jeigu norite pasidalinti failu:
copyLinkButton = Kopijuoti saitą
downloadTitle = Parsisiųsti failus
downloadDescription = Šiuo failu pasidalinta per „{ -send-brand }“, pasitelkiant abipusį šifravimą ir riboto galiojimo saitą.
trySendDescription = Išbandykite „{ -send-brand }“ paprastam ir saugiam dalijimuisi failais.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Vienu metu galima įkelti ne daugiau kaip { $count } failą.
        [few] Vienu metu galima įkelti ne daugiau kaip { $count } failus.
       *[other] Vienu metu galima įkelti ne daugiau kaip { $count } failų.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Leidžiama turėti iki ne daugiau kaip { $count } archyvą.
        [few] Leidžiama turėti iki ne daugiau kaip { $count } archyvus.
       *[other] Leidžiama turėti iki ne daugiau kaip { $count } archyvų.
    }
expiredTitle = Šis saitas nebegalioja.
notSupportedDescription = „{ -send-brand }“ su šia naršykle neveikia. „{ -send-short-brand }“ geriausiai veikia su paskiausia „{ -firefox }“ laida, o taip pat veikia su daugumos kitų naršyklių paskiausiomis laidomis.
downloadFirefox = Parsisiųsti „{ -firefox }“
legalTitle = „{ -send-short-brand }“ privatumo pranešimas
legalDateStamp = 1.0 versija, 2019 m. kovo 12 d
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days } d. { $hours } val. { $minutes } min.
addFilesButton = Rinktis failus įkėlimui
trustWarningMessage = Dalindamiesi svarbiais duomenimis įsitikinkite, kad pasitikite gavėju.
uploadButton = Įkelti
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Užtempkite ir numeskite failus čia
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = arba spustelėkite mygtuką ir dalinkitės failais iki { $size }
addPassword = Apsaugoti slaptažodžiu
emailPlaceholder = Įveskite savo el. pašto adresą
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Prisijunkite, jeigu norite siųsti iki { $size }
signInOnlyButton = Prisijungti
accountBenefitTitle = Susikurkite „{ -firefox }“ paskyrą arba prisijunkite
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Dalinkitės iki { $size } dydžio failais
accountBenefitDownloadCount = Dalinkitės su daugiau žmonių
accountBenefitTimeLimit =
    { $count ->
        [one] Išlaikykite saitus galiojančiais iki { $count } dienos.
        [few] Išlaikykite saitus galiojančiais iki { $count } dienų.
       *[other] Išlaikykite saitus galiojančiais iki { $count } dienų.
    }
accountBenefitSync = Tvarkykite failus, kuriais dalijatės, iš bet kurio įrenginio
accountBenefitMoz = Sužinokite apie kitas „{ -mozilla(case: "genitive") }“ paslaugas
signOut = Atsijungti
okButton = Gerai
downloadingTitle = Parsiunčiama
noStreamsWarning = jūsų naršyklei gali nepavykti iššifruoti tokio didelio failo.
noStreamsOptionCopy = Nukopijuokite saitą ir atverkite jį kita naršykle
noStreamsOptionFirefox = Išbandykite mūsų mėgstamiausią naršyklę
noStreamsOptionDownload = Tęsti naudojantis šia naršykle
downloadFirefoxPromo = „{ -send-short-brand }“ jums atkeliauja iš naujosios „{ -firefox }“.
# the next line after the colon contains a file name
shareLinkDescription = Pasidalinkite saitu į jūsų failą:
shareLinkButton = Dalintis saitu
# $name is the name of the file
shareMessage = Atsisiųskite „{ $name }“ su „{ -send-brand }“: paprastas, saugus dalinimasis failais
trailheadPromo = Yra būdas apsaugoti jūsų privatumą. Naudokite „Firefox“.
learnMore = Sužinoti daugiau.
downloadFlagged = Šis saitas panaikintas dėl paslaugos teikimo nuostatų pažeidimo.
downloadConfirmTitle = Dar vienas dalykas
downloadConfirmDescription = Įsitikinkite, kad pasitikite asmeniu, atsiuntusiu šį failą, nes mes negalime užtikrinti, kad jis nepakenks jūsų įrenginiui.
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
downloadTrustCheckbox =
    { $count ->
        [one] Aš pasitikiu asmeniu, atsiuntusiu šį failą
        [few] Aš pasitikiu asmeniu, atsiuntusiu šiuos failus
       *[other] Aš pasitikiu asmeniu, atsiuntusiu šiuos failus
    }
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
reportFile =
    { $count ->
        [one] Pranešti apie įtartiną failą
        [few] Pranešti apie įtartinus failus
       *[other] Pranešti apie įtartinus failus
    }
reportDescription = Padėkite mums suprasti situaciją. Kas jūsų nuomone negerai su šiais failais?
reportUnknownDescription = Atverkite saitą, apie kurį norite pranešti, ir spustelėkite „{ reportFile }“.
reportButton = Pranešti
reportReasonMalware = Šiuose failuose yra kenkėjiškos programinės įrangos, arba jie yra dalis sukčiavimo atakos.
reportReasonPii = Šiuose failuose yra mano asmeninės informacijos.
reportReasonAbuse = Šiuose failuose yra nelegalaus arba neteisėto turinio.
reportReasonCopyright = Norėdami pranešti apie autorių teisių ar prekės ženklo pažeidimus, vadovaukitės <a>šiame puslapyje</a> aprašytu procesu.
reportedTitle = Apie failus pranešta
reportedDescription = Ačiū. Mes gavome jūsų pranešimą apie šiuos failus.
