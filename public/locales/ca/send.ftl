# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Comentaris
importingFile = S'està important…
encryptingFile = S'està xifrant…
decryptingFile = S'està desxifrant…
downloadCount =
    { $num ->
        [one] 1 baixada
       *[other] { $num } baixades
    }
timespanHours =
    { $num ->
        [one] 1 hora
       *[other] { $num } hores
    }
copiedUrl = Copiat!
unlockInputPlaceholder = Contrasenya
unlockButtonLabel = Desbloca
downloadButtonLabel = Baixa
downloadFinish = Ha acabat la baixada
fileSizeProgress = ({ $partialSize } de { $totalSize })
sendYourFilesLink = Proveu el Firefox Send
errorPageHeader = Hi ha hagut un problema
fileTooBig = Aquest fitxer és massa gros per pujar-lo. Ha de tenir menys de { $size }.
linkExpiredAlt = L'enllaç ha caducat
notSupportedHeader = El vostre navegador no és compatible.
notSupportedLink = Per què el meu navegador no és compatible?
notSupportedOutdatedDetail = Aquesta versió del Firefox no admet la tecnologia web amb què funciona el Firefox Send. Haureu d'actualitzar el navegador.
updateFirefox = Actualitza el Firefox
deletePopupCancel = Cancel·la
deleteButtonHover = Suprimeix
footerLinkLegal = Avís legal
footerLinkPrivacy = Privadesa
footerLinkCookies = Galetes
passwordTryAgain = La contrasenya és incorrecta. Torneu-ho a provar.
javascriptRequired = El Firefox Send necessita JavaScript
whyJavascript = Per què el Firefox Send necessita JavaScript?
enableJavascript = Activeu el JavaScript i torneu-ho a provar.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours } h { $minutes } min
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes } min
# A short status message shown when the user enters a long password
maxPasswordLength = Longitud màxima de la contrasenya: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = No s'ha pogut definir la contrasenya

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Compartició de fitxers senzilla i privada
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Caduca després de { $downloadCount } o { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 minut
       *[other] { $num } minuts
    }
timespanDays =
    { $num ->
        [one] 1 dia
       *[other] { $num } dies
    }
timespanWeeks =
    { $num ->
        [one] 1 setmana
       *[other] { $num } setmanes
    }
fileCount =
    { $num ->
        [one] 1 fitxer
       *[other] { $num } fitxers
    }
# byte abbreviation
bytes = B
# kibibyte abbreviation
kb = kB
# mebibyte abbreviation
mb = MB
# gibibyte abbreviation
gb = GB
# localized number and byte abbreviation. example "2.5MB"
fileSize = { $num }{ $units }
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
totalSize = Mida total: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Copieu l'enllaç per compartir el fitxer:
copyLinkButton = Copia l'enllaç
downloadTitle = Baixa els fitxers
expiredTitle = Aquest enllaç ha caducat.
downloadFirefox = Baixa el { -firefox }
legalTitle = Avís de privadesa del { -send-short-brand }
legalDateStamp = Versió 1.0, amb data del 12 de març de 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days } d { $hours } h { $minutes } min
addFilesButton = Seleccioneu els fitxers que voleu pujar
uploadButton = Puja
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Arrossegueu i deixeu anar els fitxers
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = o feu clic aquí per enviar fins a { $size }
addPassword = Protegeix amb contrasenya
signInButton = Inicieu la sessió o registreu-vos
