# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Opinión
importingFile = Importando…
encryptingFile = Cifrando…
decryptingFile = Descifrando…
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
sendYourFilesLink = Probá Firefox Send
errorPageHeader = ¡Algo falló!
fileTooBig = El archivo es demasiado grande para subir. Debería tener menos de { $size }.
linkExpiredAlt = Enlace explirado
notSupportedHeader = El navegador no está soportado.
notSupportedLink = ¿Por qué mi navegador no está soportado?
notSupportedOutdatedDetail = Desafortunadamente esta versión de Firefox no soporta la tecnología web que necesita Firefox Send. Necesitás actualizar el navegador.
updateFirefox = Actualizar Firefox
deletePopupCancel = Cancelar
deleteButtonHover = Borrar
footerLinkLegal = Legales
footerLinkPrivacy = Privacidad
footerLinkCookies = Cookies
passwordTryAgain = Contraseña incorrecta. Intentá nuevamente.
javascriptRequired = Firefox Send requiere JavaScript
whyJavascript = ¿Por qué Firefox Send requiere Java Script?
enableJavascript = Por favor habilite JavaScript y pruebe de nuevo.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = h { $hours } m { $minutes }
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = m { $minutes }
# A short status message shown when the user enters a long password
maxPasswordLength = Longitud máxima de la contraseña: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = No se pudo establecer la contraseña

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Intercambio de archivos sencillo y privado
introDescription = { -send-brand } le permite compartir archivos con cifrado de extremo a extremo y un enlace que caduca automáticamente. Así puede mantener privado lo que comparte y asegurarse de que sus cosas no permanezcan en línea para siempre.
notifyUploadEncryptDone = Su archivo está cifrado y listo para enviar
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Vence después de { $downloadCount } o { $timespan }
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
        [one] 1 file
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
copyLinkDescription = Copiar el enlace para compartir su archivo:
copyLinkButton = Copiar enlace
downloadTitle = Descargar archivos
downloadDescription = Este archivo se compartió a través de { -send-brand } con cifrado de extremo a extremo y un enlace que caduca automáticamente.
trySendDescription = Pruebe { -send-brand } para compartir archivos de forma sencilla y segura.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Solo se puede subir 1 archivo a la vez.
       *[other] Solo se pueden subir archivos { $count } a la vez.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Solo se permite 1 archivo.
       *[other] Solo se permiten { $count } archivos.
    }
expiredTitle = Este enlace caducó.
notSupportedDescription = { -send-brand } no funcionará con este navegador. { -send-short-brand } funciona mejor con la última versión de { -firefox }, y funcionará con la versión actual de la mayoría de los navegadores.
downloadFirefox = Descargue { -firefox }
legalTitle = Aviso de privacidad de { -send-short-brand }
legalDateStamp = Versión 1.0, con fecha 12 de marzo de 2019.
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }d { $hours }h { $minutes }m
addFilesButton = Seleccionar archivos para subir
uploadButton = Subir
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Arrastrar y soltar archivos
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = o haga clic para enviar hasta { $size }
addPassword = Proteger con contraseña
emailPlaceholder = Ingrese su correo electrónico
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Inicie sesión para enviar hasta { $size }
signInOnlyButton = Iniciar sesión
accountBenefitTitle = Cree una cuenta de { -firefox } o inicie la sesión
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Compartir archivos hasta { $size }
accountBenefitDownloadCount = Compartir archivos con más personas
accountBenefitTimeLimit =
    { $count ->
        [one] Mantenga los enlaces activos hasta por 1 día
       *[other] Mantenga los enlaces activos hasta por { $count } días
    }
accountBenefitSync = Administre archivos compartidos desde cualquier dispositivo.
accountBenefitMoz = Conocer sobre otros servicios de { -mozilla }
signOut = Salir
okButton = Aceptar
downloadingTitle = Descargando
noStreamsWarning = Es posible que este navegador no pueda descifrar un archivo tan grande.
noStreamsOptionCopy = Copiar el enlace para abrir en otro navegador.
noStreamsOptionFirefox = Pruebe nuestro navegador favorito
noStreamsOptionDownload = Continuar con este navegador
downloadFirefoxPromo = El nuevo { -firefox } te ofrece { -send-short-brand }.
# the next line after the colon contains a file name
shareLinkDescription = Compartir el enlace con tu dispositivo:
shareLinkButton = Compartir el enlace
# $name is the name of the file
shareMessage = Descargar "{ $name }" con { -send-brand }: compartir archivos de forma simple y segura
trailheadPromo = Hay una forma de proteger tu privacidad. Unite a Firefox.
learnMore = Conocer más.
