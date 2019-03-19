# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Comentario
importingFile = Importando...
encryptingFile = Encriptando...
decryptingFile = Desencriptando...
downloadCount =
    { $num ->
       *[one] 1 descarga
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
errorPageHeader = ¡Algo salió mal!
fileTooBig = Ese archivo es muy grande. Debería ocupar menos de { $size }.
linkExpiredAlt = Enlace caducado
notSupportedHeader = Tu navegador no está soportado.
notSupportedLink = ¿Por qué mi navegador no tiene soporte?
notSupportedOutdatedDetail = Lamentablemente esta versión de Firefox no soporta la tecnología web que potencia a Firefox Send. Deberás actualizar tu navegador.
updateFirefox = Actualizar Firefox
deletePopupCancel = Cancelar
deleteButtonHover = Eliminar
footerLinkLegal = Legal
footerLinkPrivacy = Privacidad
footerLinkCookies = Cookies
passwordTryAgain = Contraseña incorrecta. Intenta de nuevo.
javascriptRequired = Firefox Send requiere JavaScript
whyJavascript = ¿Por qué Firefox Send requiere JavaScript?
enableJavascript = Por favor, habilita JavaScript e intenta de nuevo.
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
introTitle = Compartir archivos fácil y privado
introDescription = { -send-brand } te permite compartir archivos con cifrado de extremo a extremo y un enlace que caduca automáticamente. Así puedes mantener en privado lo que compartes y asegurarte de que tus cosas no permanezcan en línea para siempre.
notifyUploadEncryptDone = Tu archivo está cifrado y listo para enviar
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Expira después de { $downloadCount } o { $timespan }
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
downloadDescription = Este archivo fue compartido vía { -send-brand } con un cifrado de punto a punto y un enlace que expira automáticamente.
trySendDescription = Intenta con { -send-brand } para compartir fácil y seguro.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Solo 1 archivo puede ser cargado a la vez.
       *[other] Solo { $count } archivos pueden ser cargados a la vez.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Solo 1 archivo está permitido.
       *[other] Solo { $count } archivos están permitidos.
    }
expiredTitle = Este enlace ha expirado.
notSupportedDescription = { -send-brand } no funcionará con este navegador. { -send-short-brand } trabaja mejor que la última versión de { -firefox }, y trabajará con la versión actual de la mayoría de la navegadores.
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
addPassword = Protegido con contraseña
emailPlaceholder = Ingresa tu correo electrónico
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Iniciar sesión para enviar hasta { $size }
signInButton = Iniciar sesión/registrarse
accountBenefitTitle = Crear una cuenta de { -firefox } o iniciar sesión
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Compartir archivos de hasta { $size }
accountBenefitDownloadCount = Compartir archivos con más personas
accountBenefitTimeLimit =
    { $count ->
        [one] Mantener enlaces activos por 1 día
       *[other] Mantener enlaces activos hasta { $count } días
    }
accountBenefitSync = Administrar archivos compartidos desde cualquier dispositivo
accountBenefitMoz = Saber más sobre otros servicios de { -mozilla }
signOut = Cerrar sesión
okButton = Aceptar
downloadingTitle = Descargando
noStreamsWarning = Puede que este navegador no pueda descifrar un archivo tan grande.
noStreamsOptionCopy = Copiar el enlace para abrir en otro navegador
noStreamsOptionFirefox = Prueba nuestro navegador favorito
noStreamsOptionDownload = Continuar con este navegador
