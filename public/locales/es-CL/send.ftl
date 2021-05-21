# Send is a brand name and should not be localized.
title = Send
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
sendYourFilesLink = Probar Send
errorPageHeader = ¡Algo se fue a las pailas!
fileTooBig = Ese archivo es muy grande para ser subido. Debiera tener un tamaño menor a { $size }.
linkExpiredAlt = Enlace expirado
notSupportedHeader = Tu navegador no está soportado.
notSupportedLink = ¿Por qué mi navegador no es soportado?
notSupportedOutdatedDetail = Lamentablemente esta versión de Firefox no soporta la tecnología web que potencia a Send. Deberás actualizar tu navegador.
updateFirefox = Actualizar Firefox
deletePopupCancel = Cancelar
deleteButtonHover = Eliminar
footerLinkLegal = Legal
footerLinkPrivacy = Privacidad
footerLinkCookies = Cookies
passwordTryAgain = Contraseña incorrecta. Vuelve a intentarlo.
javascriptRequired = Send requiere JavaScript.
whyJavascript = ¿Por qué Send requiere JavaScript?
enableJavascript = Por favor, activa JavaScript y vuelve a intentarlo.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }h { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Longitud máxima de la contraseña: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Esta contraseña no pudo ser establecida

## Send version 2 strings

# Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Intercambio de archivos simple y privado
introDescription = { -send-brand } te permite compartir archivos con cifrado de extremo a extremo y un enlace que expira automáticamente. Así puedes mantener lo que compartes en privado y asegurarte de que tus cosas no permanezcan en línea para siempre.
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
downloadTitle = Bajando archivos
downloadDescription = Este archivo fue compartido a través de { -send-brand } con cifrado de punto a punto y un enlace que expira automáticamente.
trySendDescription = Prueba { -send-brand } para compartir archivos de forma simple y segura.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Solo 1 archivo puede ser subido a la vez.
       *[other] Solo { $count } archivos pueden ser subidos a la vez.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Solo 1 archivo está permitido.
       *[other] Solo { $count } archivos están permitidos.
    }
expiredTitle = Este enlace ha expirado.
notSupportedDescription = { -send-brand } no funcionará con este navegador. { -send-short-brand } funciona mejor con la última versión de { -firefox } y con la versión actual de la mayoría de los navegadores.
downloadFirefox = Bajar { -firefox }
legalTitle = Aviso de privacidad de { -send-short-brand }
legalDateStamp = Versión 1.0 del 12 de marzo de 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }d { $hours }h { $minutes }m
addFilesButton = Selecciona los archivos a subir
trustWarningMessage = Asegúrate de que confías en tu destinatario cuando compartas datos sensibles.
uploadButton = Subir
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Arrastra y suelta archivos
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = o haz clic para enviar hasta { $size }
addPassword = Protegido con contraseña
emailPlaceholder = Ingresa tu correo
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Conéctate para enviar hasta { $size }
signInOnlyButton = Conectarse
accountBenefitTitle = Crea una cuenta de { -firefox } o conéctate
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Comparte archivos de hasta { $size }
accountBenefitDownloadCount = Comparte archivos con más personas
accountBenefitTimeLimit =
    { $count ->
        [one] Mantener enlaces activos durante 1 día
       *[other] Mantener enlaces activos durante { $count } días
    }
accountBenefitSync = Administrar los archivos compartidos desde cualquier dispositivo
accountBenefitMoz = Aprender más acerca de otros servicios de { -mozilla }
signOut = Salir
okButton = Aceptar
downloadingTitle = Bajando
noStreamsWarning = Es posible que este navegador no pueda descifrar un archivo tan grande.
noStreamsOptionCopy = Copiar el enlace para abrirlo en otro navegador
noStreamsOptionFirefox = Prueba nuestro navegador favorito
noStreamsOptionDownload = Continuar con este navegador
downloadFirefoxPromo = { -send-short-brand } es traído a ti por el renovado { -firefox }.
# the next line after the colon contains a file name
shareLinkDescription = Comparte el enlace a tu dispositivo:
shareLinkButton = Compartir enlace
# $name is the name of the file
shareMessage = Baja "{ $name }" con { -send-brand }: compartir archivos de forma simple y segura
trailheadPromo = Hay una forma de proteger tu privacidad. Únete a Firefox.
learnMore = Aprender más.
downloadFlagged = Este enlace ha sido deshabilitado por violar los términos del servicio.
downloadConfirmTitle = Una cosa más
downloadConfirmDescription = Asegúrate de confiar en la persona que te envió este archivo porque no podemos verificar que no dañará tu dispositivo.
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
downloadTrustCheckbox =
    { $count ->
        [one] Confío en la persona que envió es archivo
       *[other] Confío en la persona que envió estos archivos
    }
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
reportFile =
    { $count ->
        [one] Reportar este archivo como sospechoso
       *[other] Reportar estos archivos como sospechosos
    }
reportDescription = Ayúdanos a entender lo que está pasando. ¿Qué crees que está mal con estos archivos?
reportUnknownDescription = Por favor, ve a la url del enlace que quieres reportar y haz clic en "{ reportFile }".
reportButton = Reportar
reportReasonMalware = Estos archivos contienen malware o son parte de un ataque de phishing.
reportReasonPii = Estos archivos contienen información personal identificable sobre mí.
reportReasonAbuse = Estos archivos contienen contenido ilegal o abusivo.
reportReasonCopyright = Para denunciar una infracción de derechos de autor o de marca registrada, sigue el proceso descrito en <a>esta página</a>.
reportedTitle = Archivos reportados
reportedDescription = Gracias. Hemos recibido tu reporte sobre estos archivos.
