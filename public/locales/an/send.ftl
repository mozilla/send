# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Comentarios
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
       *[other] horas
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
expiredTitle = Este vinclo ye caducau.
downloadFirefox = Descargar { -firefox }
legalTitle = Aviso de privacidat de { -send-short-brand }
legalDateStamp = Versió 1.0, con data d'o 12 de marzo de 2019
signInOnlyButton = Iniciar la sesión
accountBenefitTitle = Crea una cuenta de { -firefox } u dentra-ie
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Compartir fichers dica { $size }
accountBenefitDownloadCount = Compartir fichers con mas chent
signOut = Zarrar la sesión
okButton = Vale
downloadingTitle = Se ye descargando
noStreamsWarning = Este navegador talment no pueda descifrar un fichero tant gran.
noStreamsOptionCopy = Copia lo vinclo pa ubrir-lo en belatro navegador
noStreamsOptionFirefox = Preba lo nuestro navegador favorito
noStreamsOptionDownload = Continar con este navegador
shareLinkButton = Compartir lo vinclo
