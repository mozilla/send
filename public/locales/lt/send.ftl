# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Pateikti atsiliepimą
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
sendYourFilesLink = Išbandyti „Firefox Send“
errorPageHeader = Nutiko kažkas negero!
fileTooBig = Pasirinktas failas yra per didelis, kad jį būtų galima įkelti. Failo dydis neturėtų viršyti { $size }
linkExpiredAlt = Saitas nebegalioja
notSupportedHeader = Jūsų naršyklė nepalaikoma.
notSupportedLink = Kodėl mano naršyklė nepalaikoma?
notSupportedOutdatedDetail = Deja, šioje „Firefox“ naršyklės laidoje nepalaikoma „Firefox Send“ veikti reikalinga technologija. Jeigu norite naudotis šia paslauga, turėsite atnaujinti savo naršyklę.
updateFirefox = Atnaujinti „Firefox“
deletePopupCancel = Atsisakyti
deleteButtonHover = Šalinti
footerLinkLegal = Teisinė informacija
footerLinkPrivacy = Privatumas
footerLinkCookies = Slapukai
passwordTryAgain = Slaptažodis netinka. Bandykite dar kartą.
javascriptRequired = „Firefox Send“ veikimui būtina įgalinti „JavaScript“ palaikymą
whyJavascript = Kodėl „Firefox Send“ neveikia išjungus „JavaScript“?
enableJavascript = Įgalinkit „JavaScript“ ir bandykite dar kartą.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours } val. { $minutes } min.
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes } min.
# A short status message shown when the user enters a long password
maxPasswordLength = Didžiausias leistinas slaptažodžio ilgis: { $length } simb.
# A short status message shown when there was an error setting the password
passwordSetError = Slaptažodžio nustatyti nepavyko

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Paprastas ir privatus dalijimasis failais
introDescription = „{ -send-brand }“ suteikia galimybę dalintis failais, pasitelkiant abipusį šifravimą ir riboto galiojimo saitus. Tai padeda pasidalintus failus išlaikyti privačiais ir užtikrina, jog trumpam įkelti failai neliks pasiekiami internete amžinai.
notifyUploadEncryptDone = Failas užšifruotas ir parengtas išsiuntimui
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Nustos galioti parsisiuntus { $downloadCount } arba po { $timespan }
timespanMinutes =
    { $num ->
        [one] { $num } minutė
        [few] { $num } minutės
       *[other] { $num } minučių
    }
timespanDays =
    { $num ->
        [one] { $num } diena
        [few] { $num } dienos
       *[other] { $num } dienų
    }
timespanWeeks =
    { $num ->
        [one] { $num } savaitė
        [few] { $num } savaitės
       *[other] { $num } savaičių
    }
fileCount =
    { $num ->
        [one] { $num } failas
        [few] { $num } failai
       *[other] { $num } failų
    }
# size is a localized number followed by a unit of bytes, ex. 2.5GB
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
expiredTitle = Šis saitas nebegalioja.
notSupportedDescription = „{ -send-brand }“ su šia naršykle neveikia. „{ -send-short-brand }“ geriausiai veikia su paskiausia „{ -firefox }“ laida, o taip pat veikia su daugumos kitų naršyklių paskiausiomis laidomis.
downloadFirefox = Parsisiųsti „{ -firefox }“
legalTitle = „{ -send-short-brand }“ privatumo pranešimas
