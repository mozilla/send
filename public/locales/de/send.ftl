# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Feedback
importingFile = Wird importiert…
encryptingFile = Wird verschlüsselt…
decryptingFile = Wird entschlüsselt…
downloadCount =
    { $num ->
        [one] einem Download
       *[other] { $num } Downloads
    }
timespanHours =
    { $num ->
        [one] einer Stunde
       *[other] { $num } Stunden
    }
copiedUrl = Kopiert!
unlockInputPlaceholder = Passwort
unlockButtonLabel = Entsperren
downloadButtonLabel = Herunterladen
downloadFinish = Download abgeschlossen
fileSizeProgress = ({ $partialSize } von { $totalSize })
sendYourFilesLink = Firefox Send ausprobieren
errorPageHeader = Ein Fehler ist aufgetreten!
fileTooBig = Die Datei ist zu groß zum Hochladen. Sie sollte maximal { $size } groß sein.
linkExpiredAlt = Link abgelaufen
notSupportedHeader = Ihr Browser wird nicht unterstützt.
notSupportedLink = Warum wird mein Browser nicht unterstützt?
notSupportedOutdatedDetail = Leider unterstützt diese Firefox-Version die Web-Technologie nicht, auf der Firefox Send basiert. Sie müssen Ihren Browser aktualisieren.
updateFirefox = Firefox aktualisieren
deletePopupCancel = Abbrechen
deleteButtonHover = Löschen
footerLinkLegal = Rechtliches
footerLinkPrivacy = Datenschutz
footerLinkCookies = Cookies
passwordTryAgain = Falsches Passwort. Versuchen Sie es erneut.
javascriptRequired = Firefox Send benötigt JavaScript
whyJavascript = Warum benötigt Firefox Send JavaScript?
enableJavascript = Bitte aktivieren Sie JavaScript und versuchen Sie es erneut.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }h { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Maximale Passwortlänge: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Dieses Passwort konnte nicht eingerichtet werden

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Einfache, private Dateifreigabe
introDescription = Mit { -send-brand } können Sie Dateien mit Ende-zu-Ende-Verschlüsselung und einem automatisch ablaufenden Link freigeben. So können Sie die geteilten Inhalte privat halten und sicherstellen, dass Ihre Daten nicht für immer online bleiben.
notifyUploadEncryptDone = Ihre Datei ist verschlüsselt und zum Senden bereit
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Läuft ab nach { $downloadCount } oder { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 Minute
       *[other] { $num } Minuten
    }
timespanDays =
    { $num ->
        [one] 1 Tag
       *[other] { $num } Tage
    }
timespanWeeks =
    { $num ->
        [one] 1 Woche
       *[other] { $num } Wochen
    }
fileCount =
    { $num ->
        [one] 1 Datei
       *[other] { $num } Dateien
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
totalSize = Gesamtgröße: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Kopieren Sie den Link, um Ihre Datei zu teilen:
copyLinkButton = Link kopieren
downloadTitle = Dateien herunterladen
downloadDescription = Diese Datei wurde über { -send-brand } mit Ende-zu-Ende-Verschlüsselung und einem automatisch ablaufenden Link geteilt.
trySendDescription = Probieren Sie { -send-brand } aus, um einfach und privat Dateien zu teilen.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Es kann maximal eine Datei auf einmal hochgeladen werden.
       *[other] Es können maximal { $count } Dateien auf einmal hochgeladen werden.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Es ist nur ein  Archiv erlaubt.
       *[other] Es sind nur { $count } Archive erlaubt.
    }
expiredTitle = Dieser Link ist abgelaufen.
notSupportedDescription = { -send-brand } funktioniert nicht mit diesem Browser. { -send-short-brand } funktioniert am besten mit der neuesten Version von { -firefox } und funktioniert mit der aktuellen Version der meisten Browser.
downloadFirefox = { -firefox } herunterladen
legalTitle = Datenschutzerklärung zu { -send-short-brand }
legalDateStamp = Version 1.0, Stand 12. März 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }d { $hours }h { $minutes }m
addFilesButton = Dateien zum Hochladen auswählen
uploadButton = Hochladen
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Dateien ziehen und ablegen
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = oder klicken, um bis zu { $size } zu senden
addPassword = Mit Passwort schützen
emailPlaceholder = Geben Sie Ihre E-Mail-Adresse ein
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Melden Sie sich an, um Dateien bis { $size } zu senden
signInButton = Anmelden/Registrieren
accountBenefitTitle = Erstellen Sie ein { -firefox }-Konto oder melden Sie sich an
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Dateien bis zu { $size } teilen
accountBenefitDownloadCount = Teilen Sie Dateien mit anderen Menschen
accountBenefitTimeLimit =
    { $count ->
        [one] Link bis zu einen Tag lang aktiv halten
       *[other] Link bis zu { $count } Tage lang aktiv halten
    }
accountBenefitSync = Geteilte Dateien von anderen Geräten aus verwalten
accountBenefitMoz = Erfahren Sie mehr über andere { -mozilla }-Dienste
signOut = Abmelden
okButton = OK
downloadingTitle = Wird heruntergeladen…
noStreamsWarning = Dieser Browser kann eine so große Datei möglicherweise nicht entschlüsseln.
noStreamsOptionCopy = Kopieren Sie den Link, um ihn in einem anderen Browser zu öffnen
noStreamsOptionFirefox = Probieren Sie unseren Lieblingsbrowser aus
noStreamsOptionDownload = Mit diesem Browser weitermachen
