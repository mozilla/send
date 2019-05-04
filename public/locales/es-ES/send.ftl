# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Comentario
importingFile = Importando...
encryptingFile = Encriptando...
decryptingFile = Desencriptando...
downloadCount =
    { $num ->
        [one] 1 descarga
       *[other] { $num } descargas
    }
timespanHours =
    { $num ->
        [one] 1 hora
       *[other] { $num } horas
    }
copiedUrl = ¡Copiado!
unlockInputPlaceholder = Contraseña
unlockButtonLabel = Desbloquear
downloadButtonLabel = Descargar
downloadFinish = Descarga completa
fileSizeProgress = ({ $partialSize } de { $totalSize })
sendYourFilesLink = Prueba Firefox Send
errorPageHeader = ¡Se produjo un error!
fileTooBig = Ese archivo es muy grande. Debería ocupar menos de { $size }.
linkExpiredAlt = Enlace caducado
notSupportedHeader = Tu navegador no está admitido.
notSupportedLink = ¿Por qué no se admite mi navegador?
notSupportedOutdatedDetail = Lamentablemente, esta versión de Firefox no admite la tecnología web que impulsa Firefox Send. Tendrás que actualizar tu navegador.
updateFirefox = Actualizar Firefox
deletePopupCancel = Cancelar
deleteButtonHover = Eliminar
footerLinkLegal = Legal
footerLinkPrivacy = Privacidad
footerLinkCookies = Cookies
passwordTryAgain = Contraseña incorrecta. Inténtelo de nuevo.
javascriptRequired = Firefox Send requiere JavaScript
whyJavascript = ¿Por qué Firefox Send requiere JavaScript?
enableJavascript = Por favor, activa JavaScript y vuelve a intentarlo.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }h { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Longitud máxima de la contraseña: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = No se ha podido establecer la contraseña

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Enviar
-firefox = Firefox
-mozilla = Mozilla
introTitle = Compartir archivos de forma sencilla y privada
introDescription = { -send-brand } te permite compartir archivos con cifrado de extremo a extremo y un enlace que caduca automáticamente. Así que puedes mantener lo que compartes en privado y asegurarte de que tus cosas no permanezcan en línea para siempre.
notifyUploadEncryptDone = El archivo está cifrado y listo para enviar
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Caduca tras { $downloadCount } o { $timespan }
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
        [one] 1 archivo
       *[other] { $num } archivos
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
totalSize = Tamaño total: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Copiar el enlace para compartir el archivo:
copyLinkButton = Copiar enlace
downloadTitle = Descargar archivos
downloadDescription = Este archivo se compartió a través de { -send-brand } con cifrado de extremo a extremo y un enlace que caduca automáticamente.
trySendDescription = Prueba { -send-brand } para compartir archivos de forma sencilla y segura.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Solo se puede subir 1 archivo a la vez.
       *[other] Solo se pueden subir { $count } archivos a la vez.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Solo se permite 1 archivo.
       *[other] Solo se permiten { $count } archivos.
    }
expiredTitle = Este enlace ha expirado.
notSupportedDescription = { -send-brand } no funciona con este navegador. { -send-short-brand } funciona mejor con la última versión de { -firefox }, y funciona con la última versión de la mayoría de los navegadores.
downloadFirefox = Descargar { -firefox }
legalTitle = Aviso de privacidad de { -send-short-brand }
legalDateStamp = Versión 1.0 del 12 de marzo de 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }d { $hours }h { $minutes }m
addFilesButton = Seleccionar archivos para subir
uploadButton = Subir
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Arrastrar y soltar archivos
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = o hacer clic para enviar hasta { $size }
addPassword = Proteger con contraseña
emailPlaceholder = Introducir dirección de correo
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Iniciar sesión para enviar hasta { $size }
signInOnlyButton = Iniciar sesión
accountBenefitTitle = Crear una cuenta { -firefox } o iniciar sesión
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Compartir archivos de hasta { $size }
accountBenefitDownloadCount = Compartir archivos con más gente
accountBenefitTimeLimit =
    { $count ->
        [one] Mantener enlaces activos durante 1 día
       *[other] Mantener enlaces activos durante { $count } días
    }
accountBenefitSync = Administrar los archivos compartidos desde cualquier dispositivo
accountBenefitMoz = Saber más sobre otros servicios de { -mozilla }
signOut = Cerrar sesión
okButton = Vale
downloadingTitle = Descargando
noStreamsWarning = Puede que este navegador no pueda descifrar un archivo tan grande.
noStreamsOptionCopy = Copiar el enlace para abrirlo en otro navegador
noStreamsOptionFirefox = Probar nuestro navegador favorito
noStreamsOptionDownload = Continuar en este navegador
downloadFirefoxPromo = El nuevo { -firefox } te ofrece { -send-short-brand }.
# the next line after the colon contains a file name
shareLinkDescription = Compartir el enlace a tu archivo:
shareLinkButton = Compartir enlace
# $name is the name of the file
shareMessage = Descargar “{ $name }” con { -send-brand }: comparte archivos de forma segura y sencilla
