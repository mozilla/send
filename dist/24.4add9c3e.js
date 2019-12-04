(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{212:function(e,n,a){"use strict";a.r(n),n.default='# Firefox Send is a brand name and should not be localized.\ntitle = Firefox Send\nsiteFeedback = Opinión\nimportingFile = Importando…\nencryptingFile = Cifrando…\ndecryptingFile = Descifrando…\ndownloadCount =\n    { $num ->\n        [one] 1 descarga\n       *[other] { $num } descargas\n    }\ntimespanHours =\n    { $num ->\n        [one] 1 hora\n       *[other] { $num } horas\n    }\ncopiedUrl = ¡Copiado!\nunlockInputPlaceholder = Contraseña\nunlockButtonLabel = Desbloquear\ndownloadButtonLabel = Descargar\ndownloadFinish = Descarga completa\nfileSizeProgress = ({ $partialSize } de { $totalSize })\nsendYourFilesLink = Probá Firefox Send\nerrorPageHeader = ¡Algo falló!\nfileTooBig = El archivo es demasiado grande para subir. Debería tener menos de { $size }.\nlinkExpiredAlt = Enlace explirado\nnotSupportedHeader = El navegador no está soportado.\nnotSupportedLink = ¿Por qué mi navegador no está soportado?\nnotSupportedOutdatedDetail = Desafortunadamente esta versión de Firefox no soporta la tecnología web que necesita Firefox Send. Necesitás actualizar el navegador.\nupdateFirefox = Actualizar Firefox\ndeletePopupCancel = Cancelar\ndeleteButtonHover = Borrar\nfooterLinkLegal = Legales\nfooterLinkPrivacy = Privacidad\nfooterLinkCookies = Cookies\npasswordTryAgain = Contraseña incorrecta. Intentá nuevamente.\njavascriptRequired = Firefox Send requiere JavaScript\nwhyJavascript = ¿Por qué Firefox Send requiere Java Script?\nenableJavascript = Por favor habilite JavaScript y pruebe de nuevo.\n# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"\nexpiresHoursMinutes = h { $hours } m { $minutes }\n# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"\nexpiresMinutes = m { $minutes }\n# A short status message shown when the user enters a long password\nmaxPasswordLength = Longitud máxima de la contraseña: { $length }\n# A short status message shown when there was an error setting the password\npasswordSetError = No se pudo establecer la contraseña\n\n## Send version 2 strings\n\n# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized\n-send-brand = Firefox Send\n-send-short-brand = Send\n-firefox = Firefox\n-mozilla = Mozilla\nintroTitle = Intercambio de archivos sencillo y privado\nintroDescription = { -send-brand } le permite compartir archivos con cifrado de extremo a extremo y un enlace que caduca automáticamente. Así puede mantener privado lo que comparte y asegurarse de que sus cosas no permanezcan en línea para siempre.\nnotifyUploadEncryptDone = Su archivo está cifrado y listo para enviar\n# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. \'Expires after 2 downloads or 25 minutes\'\narchiveExpiryInfo = Vence después de { $downloadCount } o { $timespan }\ntimespanMinutes =\n    { $num ->\n        [one] 1 minuto\n       *[other] { $num } minutos\n    }\ntimespanDays =\n    { $num ->\n        [one] 1 día\n       *[other] { $num } días\n    }\ntimespanWeeks =\n    { $num ->\n        [one] 1 semana\n       *[other] { $num } semanas\n    }\nfileCount =\n    { $num ->\n        [one] 1 file\n       *[other] { $num } archivos\n    }\n# byte abbreviation\nbytes = B\n# kibibyte abbreviation\nkb = KB\n# mebibyte abbreviation\nmb = MB\n# gibibyte abbreviation\ngb = GB\n# localized number and byte abbreviation. example "2.5MB"\nfileSize = { $num }{ $units }\n# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")\ntotalSize = Tamaño total: { $size }\n# the next line after the colon contains a file name\ncopyLinkDescription = Copiar el enlace para compartir su archivo:\ncopyLinkButton = Copiar enlace\ndownloadTitle = Descargar archivos\ndownloadDescription = Este archivo se compartió a través de { -send-brand } con cifrado de extremo a extremo y un enlace que caduca automáticamente.\ntrySendDescription = Pruebe { -send-brand } para compartir archivos de forma sencilla y segura.\n# count will always be > 10\ntooManyFiles =\n    { $count ->\n        [one] Solo se puede subir 1 archivo a la vez.\n       *[other] Solo se pueden subir archivos { $count } a la vez.\n    }\n# count will always be > 10\ntooManyArchives =\n    { $count ->\n        [one] Solo se permite 1 archivo.\n       *[other] Solo se permiten { $count } archivos.\n    }\nexpiredTitle = Este enlace caducó.\nnotSupportedDescription = { -send-brand } no funcionará con este navegador. { -send-short-brand } funciona mejor con la última versión de { -firefox }, y funcionará con la versión actual de la mayoría de los navegadores.\ndownloadFirefox = Descargue { -firefox }\nlegalTitle = Aviso de privacidad de { -send-short-brand }\nlegalDateStamp = Versión 1.0, con fecha 12 de marzo de 2019.\n# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"\nexpiresDaysHoursMinutes = { $days }d { $hours }h { $minutes }m\naddFilesButton = Seleccionar archivos para subir\nuploadButton = Subir\n# the first part of the string \'Drag and drop files or click to send up to 1GB\'\ndragAndDropFiles = Arrastrar y soltar archivos\n# the second part of the string \'Drag and drop files or click to send up to 1GB\'\n# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")\norClickWithSize = o haga clic para enviar hasta { $size }\naddPassword = Proteger con contraseña\nemailPlaceholder = Ingrese su correo electrónico\n# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")\nsignInSizeBump = Inicie sesión para enviar hasta { $size }\nsignInOnlyButton = Iniciar sesión\naccountBenefitTitle = Cree una cuenta de { -firefox } o inicie la sesión\n# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")\naccountBenefitLargeFiles = Compartir archivos hasta { $size }\naccountBenefitDownloadCount = Compartir archivos con más personas\naccountBenefitTimeLimit =\n    { $count ->\n        [one] Mantenga los enlaces activos hasta por 1 día\n       *[other] Mantenga los enlaces activos hasta por { $count } días\n    }\naccountBenefitSync = Administre archivos compartidos desde cualquier dispositivo.\naccountBenefitMoz = Conocer sobre otros servicios de { -mozilla }\nsignOut = Salir\nokButton = Aceptar\ndownloadingTitle = Descargando\nnoStreamsWarning = Es posible que este navegador no pueda descifrar un archivo tan grande.\nnoStreamsOptionCopy = Copiar el enlace para abrir en otro navegador.\nnoStreamsOptionFirefox = Pruebe nuestro navegador favorito\nnoStreamsOptionDownload = Continuar con este navegador\ndownloadFirefoxPromo = El nuevo { -firefox } te ofrece { -send-short-brand }.\n# the next line after the colon contains a file name\nshareLinkDescription = Compartir el enlace con tu dispositivo:\nshareLinkButton = Compartir el enlace\n# $name is the name of the file\nshareMessage = Descargar "{ $name }" con { -send-brand }: compartir archivos de forma simple y segura\ntrailheadPromo = Hay una forma de proteger tu privacidad. Unite a Firefox.\nlearnMore = Conocer más.\n'}}]);
//# sourceMappingURL=24.4add9c3e.js.map