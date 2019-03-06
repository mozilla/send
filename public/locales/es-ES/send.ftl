# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteSubtitle = experimento web
siteFeedback = Comentario
uploadPageHeader = Compartir archivos cifrados y privados
uploadPageExplainer = Envía archivos a través de un enlace cifrado, privado y seguro que caducará automáticamente para que tus datos no sean accesibles en línea de por vida.
uploadPageLearnMore = Descubre más
uploadPageDropMessage = Suelta aquí tu archivo para empezar a subirlo
uploadPageSizeMessage = Para que la operación sea más segura, el archivo debería ocupar menos de 1GB
uploadPageBrowseButton = Seleccionar un archivo en el equipo
uploadPageBrowseButton1 = Seleccionar un archivo para subir
uploadPageMultipleFilesAlert = Aún no se pueden subir varios archivos o una carpeta.
uploadPageBrowseButtonTitle = Subir archivo
uploadingPageProgress = Subiendo { $filename } ({ $size })
importingFile = Importando...
verifyingFile = Comprobando...
encryptingFile = Encriptando...
decryptingFile = Desencriptando...
notifyUploadDone = La subida ha finalizado.
uploadingPageMessage = Cuando se suba tu archivo podrás condigurar las opciones de caducidad.
uploadingPageCancel = Cancelar subida
uploadCancelNotification = Se canceló la subida.
uploadingPageLargeFileMessage = El archivo es grande y puede tardar unos minutos en subirse. ¡Tómatelo con calma!
uploadingFileNotification = Notificarme cuando se complete la subida.
uploadSuccessConfirmHeader = Listo para enviar
uploadSvgAlt = Subir
uploadSuccessTimingHeader = El enlace al archivo caducará tras descargarlo una vez o en 24 horas.
expireInfo = El enlace al archivo expirará tras { $downloadCount } o { $timespan }.
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
copyUrlFormLabelWithName = Copiar y compartir el enlace para enviar tu archivo: { $filename }
copyUrlFormButton = Copiar en el portapapeles
copiedUrl = ¡Copiado!
deleteFileButton = Eliminar archivo
sendAnotherFileLink = Enviar otro archivo
# Alternative text used on the download link/button (indicates an action).
downloadAltText = Descargar
downloadsFileList = Descargas
# Used as header in a column indicating the amount of time left before a
# download link expires (e.g. "10h 5m")
timeFileList = Fecha
# Used as header in a column indicating the number of times a file has been
# downloaded
downloadFileName = Descargar { $filename }
downloadFileSize = ({ $size })
unlockInputLabel = Introducir contraseña
unlockInputPlaceholder = Contraseña
unlockButtonLabel = Desbloquear
downloadFileTitle = Descargar archivo encriptado
# Firefox Send is a brand name and should not be localized.
downloadMessage = Tu amigo te está enviando un archivo a través de Firefox Send, un servicio que te permite compartir archivos con un enlace seguro, privado y cifrado que caduca automáticamente para que tus cosas no sean accesibles en línea de por vida.
# Text and title used on the download link/button (indicates an action).
downloadButtonLabel = Descargar
downloadNotification = Se completó la descarga.
downloadFinish = Descarga completa
# This message is displayed when uploading or downloading a file, e.g. "(1,3 MB of 10 MB)".
fileSizeProgress = ({ $partialSize } de { $totalSize })
# Firefox Send is a brand name and should not be localized.
sendYourFilesLink = Prueba Firefox Send
downloadingPageProgress = Descargando { $filename } ({ $size })
downloadingPageMessage = Deja esta pestaña abierta mientras buscamos tu archivo y lo desencriptamos.
errorAltText = Error en la subida
errorPageHeader = ¡Se produjo un error!
errorPageMessage = Se produjo un error al subir el archivo.
errorPageLink = Enviar otro archivo
fileTooBig = Ese archivo es muy grande. Debería ocupar menos de { $size }.
linkExpiredAlt = Enlace caducado
expiredPageHeader = ¡El enlace ha caducado o nunca existió!
notSupportedHeader = Tu navegador no está admitido.
# Firefox Send is a brand name and should not be localized.
notSupportedDetail = Lamentablemente, este navegador no admite la tecnología web que necesita Firefox Send. Tendrás que probar otro navegador. ¡Te recomendamos Firefox!
notSupportedLink = ¿Por qué no se admite mi navegador?
notSupportedOutdatedDetail = Lamentablemente, esta versión de Firefox no admite la tecnología web que impulsa Firefox Send. Tendrás que actualizar tu navegador.
updateFirefox = Actualizar Firefox
downloadFirefoxButtonSub = Descarga gratuita
uploadedFile = Archivo
copyFileList = Copiar URL
# expiryFileList is used as a column header
expiryFileList = Caduca en
deleteFileList = Eliminar
nevermindButton = Da igual
legalHeader = Términos y privacidad
legalNoticeTestPilot = Firefox Send sigue siendo un experimento de Test Pilot y está sujero a las <a>Condiciones del servicio</a> y al <a>Aviso de privacidad</a> de Test Pilot. <a>Aquí</a> podrás descubrir más sobre este experimento y su recopilación de datos.
legalNoticeMozilla = El uso de la página de Firefox Send también está sujeto al <a>Aviso de privacidad sobre sitios web</a> y a los <a>Términos de uso sobre sitios web</a>.
deletePopupText = ¿Eliminar el archivo?
deletePopupYes = Sí
deletePopupCancel = Cancelar
deleteButtonHover = Eliminar
copyUrlHover = Copiar URL
footerLinkLegal = Legal
# Test Pilot is a proper name and should not be localized.
footerLinkAbout = Sobre Test Pilot
footerLinkPrivacy = Privacidad
footerLinkTerms = Términos
footerLinkCookies = Cookies
requirePasswordCheckbox = Requerir una contraseña para descargar este archivo
addPasswordButton = Añadir contraseña
changePasswordButton = Cambiar
passwordTryAgain = Contraseña incorrecta. Inténtelo de nuevo.
reportIPInfringement = Denunciar vulneración de propiedad intelectual
javascriptRequired = Firefox Send requiere JavaScript
whyJavascript = ¿Por qué Firefox Send requiere JavaScript?
enableJavascript = Por favor, activa JavaScript y vuelve a intentarlo.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }h { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when a password is successfully set
passwordIsSet = Contraseña establecida
# A short status message shown when the user enters a long password
maxPasswordLength = Longitud máxima de la contraseña: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = No se ha podido establecer la contraseña

## New strings for the vNext version of Firefox Send

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Enviar
-firefox = Firefox
-mozilla = Mozilla
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
# size is a localized number followed by a unit of bytes, ex. 2.5GB
totalSize = Tamaño total: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Copiar el enlace para compartir el archivo:
copyLinkButton = Copiar enlace
downloadTitle = Descargar archivos
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
# size is a localized number followed by a unit of bytes, ex. 2.5GB
orClickWithSize = o hacer clic para enviar hasta { $size }
addPassword = Proteger con contraseña
emailPlaceholder = Introducir dirección de correo
# size is a localized number followed by a unit of bytes, ex. 2.5GB
signInSizeBump = Iniciar sesión para enviar hasta { $size }
signInButton = Iniciar sesión/registrarse
accountBenefitTitle = Crear una cuenta { -firefox } o iniciar sesión
# size is a localized number followed by a unit of bytes, ex. 2.5GB
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
