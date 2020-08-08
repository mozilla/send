# Firefox Send is a brand name and should not be localized.
title = Firefox Send
importingFile = Se ye importando…
encryptingFile = Se ye cifrando…
decryptingFile = Se ye descifrando…
downloadCount =
    { $num ->
        [one] 1 descarga
       *[other] { $num } descargas
    }
timespanHours =
    { $num ->
        [one] hora
       *[other] { $num } horas
    }
copiedUrl = Copiau!
unlockInputPlaceholder = Clau
unlockButtonLabel = Desblocar
downloadButtonLabel = Descargar
downloadFinish = Descarga completa
fileSizeProgress = ({ $partialSize } de { $totalSize })
sendYourFilesLink = Preba Firefox Send
errorPageHeader = I ha habiu bell problema!
fileTooBig = Ixe fichero ye masiau gran pa cargar-lo. Ha de tener menos de { $size }
linkExpiredAlt = Lo vinclo ye caducau
notSupportedHeader = Lo suyo navegador no ye compatible
notSupportedLink = Per qué no ye compatible lo mío navegador?
notSupportedOutdatedDetail = Esta versión de Firefox no admite la tecnolochía web con que funciona lo Firefox Send. Habrás d'esviellar lo navegador.
updateFirefox = Esviellar Firefox
deletePopupCancel = Cancelar
deleteButtonHover = Borrar
footerLinkLegal = Aviso legal
footerLinkPrivacy = Privacidat
footerLinkCookies = Cookies
passwordTryAgain = La contrasenya ye incorrecta. Torne-lo a intentar.
javascriptRequired = Firefox Send necesita JavaScript
whyJavascript = Per qué Firefox Send necesita JavaScript?
enableJavascript = Activa JavaScript y torna-lo a intentar.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours } h { $minutes } min
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes } min
# A short status message shown when the user enters a long password
maxPasswordLength = Maxima lonchitut d'a clau: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = No s'ha puesto definir la clau

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Compartición de fichers simpla y privada
introDescription = { -send-brand } te permite de compartir fichers cifraus de cabo a cabo, y tamién un vinclo que expira automaticament. Asinas, puetz mantener en privau lo que compartes y asegurar-te de que los tuyos contenius no se quedan pa cutio en linia.
notifyUploadEncryptDone = Lo fichero s'ha cifrau y ye presto pa ninviar-se
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Caduca dimpués de { $downloadCount } u { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 minuto
       *[other] { $num } minutos
    }
timespanDays =
    { $num ->
        [one] 1 día
       *[other] { $num } días
    }
timespanWeeks =
    { $num ->
        [one] 1 semana
       *[other] { $num } semanas
    }
fileCount =
    { $num ->
        [one] 1 fichero
       *[other] { $num } fichers
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
totalSize = Mida total: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Copiar lo vinclo que quiers compartir
copyLinkButton = Copiar lo vinclo
downloadTitle = Descargar los fichers
downloadDescription = Este fichero s'ha compartiu per medio de { -send-brand } con cifrau de cabo a cabo y un vinclo que caduca automaticament.
trySendDescription = Preba { -send-brand } pa una compartición de fichers simpla y segura.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Nomás se puet puyar 1 fitxer de vez.
       *[other] Nomás se pueden puyar  { $count } fichers de vez.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Nomás se permite 1 ficher.
       *[other] Nomás se permiten { $count } fichers.
    }
expiredTitle = Este vinclo ye caducau.
notSupportedDescription = { -send-brand } no funcionará con este navegador. { -send-short-brand } funciona millor con a zaguera versión de { -firefox } y funcionará con a versión mas recient d'a mayor parte de navegadors.
downloadFirefox = Descargar { -firefox }
legalTitle = Aviso de privacidat de { -send-short-brand }
legalDateStamp = Versió 1.0, con data d'o 12 de marzo de 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days } d { $hours } h { $minutes } min
addFilesButton = Triar los fichers a cargar
trustWarningMessage = Asegura-te de que confías en o destinatario quan compartas datos confidencials.
uploadButton = Cargar
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Arrociega y suelta los fichers
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = u fes clic aquí pa ninviar dica { $size }
addPassword = Protecher con una clau
emailPlaceholder = Escribe la tuya adreza de correu
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Inicia una sesión pa ninviar dica { $size }
signInOnlyButton = Iniciar la sesión
accountBenefitTitle = Crea una cuenta de { -firefox } u dentra-ie
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Compartir fichers dica { $size }
accountBenefitDownloadCount = Compartir fichers con mas chent
accountBenefitTimeLimit =
    { $count ->
        [one] Mantiene los vinclos activos dica 1 dia
       *[other] Mantiene los vinclos activos dica { $count } días
    }
accountBenefitSync = Chestiona los fichers compartius dende qualsequier dispositivo
accountBenefitMoz = Descubre mas cosas sobre los atros servicios de { -mozilla }
signOut = Zarrar la sesión
okButton = Vale
downloadingTitle = Se ye descargando
noStreamsWarning = Este navegador talment no pueda descifrar un fichero tant gran.
noStreamsOptionCopy = Copia lo vinclo pa ubrir-lo en belatro navegador
noStreamsOptionFirefox = Preba lo nuestro navegador favorito
noStreamsOptionDownload = Continar con este navegador
downloadFirefoxPromo = Lo nuevo { -firefox } t'ofreix { -send-short-brand }.
# the next line after the colon contains a file name
shareLinkDescription = Comparte lo vinclo enta lo tuyo fichero:
shareLinkButton = Compartir lo vinclo
# $name is the name of the file
shareMessage = Baixa-te «{ $name }» con { -send-brand }: compartición de fiches simpla y segura
trailheadPromo = I hai una manera de protecher la tuya privacidat. Une-te a Firefox.
learnMore = Mas información
downloadFlagged = Este vinclo s'ha desactivau per violar las condiciones d'uso.
downloadConfirmTitle = Una coseta mas
