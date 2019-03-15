# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Comentarios
importingFile = Importando...
encryptingFile = Cifrando...
decryptingFile = Descifrando...
downloadCount =
    { $num ->
        [one] 1 descarga
       *[other] { $num } descargues
    }
timespanHours =
    { $num ->
        [one] 1 hora
       *[other] { $num } hores
    }
copiedUrl = ¡Copióse!
unlockInputPlaceholder = Contraseña
unlockButtonLabel = Desbloquiar
downloadButtonLabel = Baxar
downloadFinish = Completóse la descarga
fileSizeProgress = ({ $partialSize } de { $totalSize })
sendYourFilesLink = Prueba Firefox Send
errorPageHeader = ¡Daqué foi mal!
fileTooBig = Esti ficheru ye mui grande como pa xubilu. Debería tener menos de { $size }.
linkExpiredAlt = Caducó l'enllaz
notSupportedHeader = El to restolador nun ta sofitáu.
notSupportedLink = ¿Por qué'l mio restolador nun ta sofitáu?
notSupportedOutdatedDetail = Desafortunadamente esta versión de Firefox nun sofita la teunoloxía web qu'usa Firefox Send. Vas precisar anovar Firefox.
updateFirefox = Anovar Firefox
deletePopupCancel = Encaboxar
deleteButtonHover = Desaniciar
footerLinkLegal = Llegal
footerLinkPrivacy = Privacidá
footerLinkCookies = Cookies
passwordTryAgain = La contraseña ye incorreuta. Volvi tentalo.
javascriptRequired = Firefox Send rique JavaScript
whyJavascript = ¿Por qué Firefox Send rique JavaScript?
enableJavascript = Activa JavaScript y volvi tentalo, por favor.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }h { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Llargor máximu de la contraseña: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Nun pudo afitase esta contraseña

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Compartición de ficheros privada y cenciella
notifyUploadEncryptDone = El ficheru ta cifráu y preparáu pa unviase
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Caduca tres { $downloadCount } ó { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 minutu
       *[other] { $num } minutos
    }
timespanDays =
    { $num ->
        [one] 1 día
       *[other] { $num } díes
    }
timespanWeeks =
    { $num ->
        [one] 1 selmana
       *[other] { $num } selmanes
    }
fileCount =
    { $num ->
        [one] 1 ficheru
       *[other] { $num } ficheros
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
totalSize = Tamañu total: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Copia l'enllaz pa compartir el ficheru:
copyLinkButton = Copiar l'enllaz
downloadDescription = Esti ficheru compartióse per { -send-brand } con cifráu puntu a puntu y un enllaz que caduca automáticamente.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Namái pue xubise 1 ficheru al empar.
       *[other] Namái puen xubise { $count } ficheros al empar.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Namái se permite 1 archivu
       *[other] Namái se permiten { $count } archivos
    }
expiredTitle = Esti enllaz caducó.
notSupportedDescription = { -send-brand } nun va funcionar con esti restolador. { -send-short-brand } funciona meyor cola versión última de { -firefox } y cola versión actual de la mayoría de restoladores.
legalTitle = Noticia de privacidá de { -send-short-brand }
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }d { $hours }h { $minutes }m
addFilesButton = Esbillar los ficheros a unviar
uploadButton = Xubir
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Arrastra y suelta ficheros
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = o calca pa unviar hasta { $size }
addPassword = Protexer con una contraseña
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Anicia sesión pa unviar hasta { $size }
signInButton = Rexistrase/aniciar sesión
accountBenefitTitle = Creación d'una cuenta { -firefox } o aniciu de sesión nella
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Comparti ficheros d'hasta { $size }
accountBenefitDownloadCount = Comparti ficheros con más xente
accountBenefitTimeLimit =
    { $count ->
        [one] Caltén activos los enllaces demientres 1 día
       *[other] Caltén activos los enllaces demientres 1 díes
    }
accountBenefitSync = Xestiona los ficheros compartíos dende cualesquier preséu
accountBenefitMoz = Deprendi más tocante a otros servicios de { -mozilla }
okButton = Aceutar
noStreamsWarning = Esti restolador quiciabes nun seya a descifrar un ficheru d'esti tamañu.
