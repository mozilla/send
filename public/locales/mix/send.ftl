# Send is a brand name and should not be localized.
title = Send
importingFile = Ndakiin…
encryptingFile = Ndasami tu'un…
decryptingFile = Nchiko tu'un…
downloadCount =
    { $num ->
        [one] 1 snuú
       *[other] { $num } snuú
    }
timespanHours =
    { $num ->
        [one] 1 hora
       *[other] { $num } horas
    }
copiedUrl = ¡Tsa ndatavi ña!
unlockInputPlaceholder = Tu'un seè
unlockButtonLabel = Kuna
downloadButtonLabel = Snuù
downloadFinish = Ntsinu snui
fileSizeProgress = ({ $partialSize } ña { $totalSize })
sendYourFilesLink = Kuachu'un Send
errorPageHeader = ¡Yee ña va'a!
fileTooBig = Kanu tutu yo. Tsini ñu'u koi tana { $size }.
linkExpiredAlt = Ntoo enlace
notSupportedHeader = Kue ku kuni página.
notSupportedLink = ¿Chanu kue ku kuncheuña?
notSupportedOutdatedDetail = Firefox kue ku kuni página web takua kuachu'un Send. tsiniñu'u ndu tsa'a navegador.
updateFirefox = Ndu tsa'a Firefox
deletePopupCancel = Kunchatu
deleteButtonHover = Stoò
footerLinkLegal = Aviso legal
footerLinkPrivacy = Ña meu
footerLinkCookies = Cookies
passwordTryAgain = Kue vaa ni chau sivi siki. Chai tuku.
javascriptRequired = Send tsiniñui JavaScript
whyJavascript = ¿Chanu Send tsiniñui JavaScript?
enableJavascript = Saá ña mani katsi JavaScript chá kitsa tuku.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }h { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Kua tu'un see: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Ma ku ntanii tu'un see

## Send version 2 strings

# Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Stucha kue tutu ku
introDescription = { -send-brand } ku stuchaku tutu seé tsi inkana tsi iin enlace ña ntóo mituin. Sa'an ku kunka va'a ña stuchaku cha ma ku kunchee na kue tutu ku.
notifyUploadEncryptDone = Tsa inka va'a tutu ku tsa ku stuchaku ña
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Ku kunkai mancha { $downloadCount } a { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 minuto
       *[other] { $num } minutos
    }
timespanDays =
    { $num ->
        [one] 1 kii
       *[other] { $num } kii
    }
timespanWeeks =
    { $num ->
        [one] 1 semana
       *[other] { $num } semanas
    }
fileCount =
    { $num ->
        [one] 1 tutu
       *[other] { $num } tutu
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
totalSize = Kua: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Ndatava enlace takua stuchaku tutú.
copyLinkButton = Ndatava enlace
downloadTitle = Snuú tutu
downloadDescription = Tutu yo stuchaku ña tsi { -send-brand } inka si'i chá ku nto'o mituin.
trySendDescription = Kuachu'un { -send-brand } takua stuchaku nchi tutu niku
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Ku skau 1 tutu ni.
       *[other] Mitu'un { $count }tutu ku skau.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] 1 tutu ni ku.
       *[other] Mitu'un { $count } tutu ni ku.
    }
expiredTitle = Koo enlace inka
notSupportedDescription = { -send-brand } ma ku Kuachu'un navegador yo. { -send-short-brand } Sachu'in va'a la  versión da ntii { -firefox }, sachu'un tsi  versión tsa'a su inka kue navegador.
downloadFirefox = Snuú { -firefox }
legalTitle = Tu'un privacidad { -send-short-brand }
legalDateStamp = Versión 1.0 del 12 de marzo de 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }d { $hours }h { $minutes }m
addFilesButton = Katsi tutu ku skau
trustWarningMessage = Kunche'e a va'a nu ku ntachuún ña.
uploadButton = Skaa
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Xita cha sia kue tutu
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = katavi takua stuchaku ña mancha { $size }
addPassword = Inka vai tsi tu'un seé
emailPlaceholder = Chaa korreo ku
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = kitsa takua kuachu'una mancha { $size }
signInOnlyButton = Kitsaa
accountBenefitTitle = Saa iin kuenta ña { -firefox } a kitsa
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Stucha tutu mancha { $size }
accountBenefitDownloadCount = Stucha tutu tsi kuaka nivi
accountBenefitTimeLimit =
    { $count ->
        [one] Ku kunka tutu ku mancha 1 kii
       *[other] Ku kunka tutu ku mancha { $count } kii
    }
accountBenefitSync = Stucha tutu tsí nchi kaa ndusu niku
accountBenefitMoz = Kavi tutú tsa { -mozilla }
signOut = Kee
okButton = Vaá
downloadingTitle = Snuì
noStreamsWarning = Ku ña navegador yo ma ku mini iin tutú kanu.
noStreamsOptionCopy = Ndatava enlace takua kunu tsí inka navegador
noStreamsOptionFirefox = Kuachu'un navegador ña va'a nu ntia
noStreamsOptionDownload = Kunka tsi navegador yo
downloadFirefoxPromo = { -send-short-brand } snai ña tsaa { -firefox }.
# the next line after the colon contains a file name
shareLinkDescription = Stucha enlace tutu ku:
shareLinkButton = Stucha Enlace
# $name is the name of the file
shareMessage = Snuu «{ $name }» tsi { -send-brand }: kue nchichi
trailheadPromo = Ku china vau ña chau. Kita'an tsi Firefox.
learnMore = Skua'a kuakaa.
downloadFlagged = Va'á enlace yo.
downloadConfirmTitle = Una cosa más
downloadConfirmDescription = A tsinu nivo tachu'un tutu yo takua ma stivia kàa ndusu ku.
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
downloadTrustCheckbox =
    { $count ->
        [one] Va'a nivi ntachu'un tutu yo
       *[other] Va'a nivi ntachu'un tutu yo
    }
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
reportFile =
    { $count ->
        [one] Katu'un ña va'á tutu yo
       *[other] Katu'un ña va'á kue tutu yo
    }
reportDescription = Chinche kue yu na kunikue ña yee. ¿A va'á kue tutu yo?
reportUnknownDescription = Sa'a ña mani kuncheu,  url ña enlace ña va'á cha katavi “{ reportFile }”.
reportButton = Ka tu'un
reportReasonMalware = Inka ña va'á nu kue tutu yo.
reportReasonPii = Inka kue tu'un me nu kue tutu yo.
reportReasonAbuse = Yee ña va'á nu kue tutu yo.
reportReasonCopyright = Tatu ye ña va'á nu derechos de autor a marca registrada, kavi tutu yo <a>esta página</a>.
reportedTitle = Ku ncheé tutu
reportedDescription = Ti tsavu. tsa kumikue tu'un tsa'a tutuku.
