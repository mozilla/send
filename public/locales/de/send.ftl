# Firefox Send is a brand name and should not be localized.
title = Firefox Send
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
notSupportedHeader = Dein Browser wird nicht unterstützt.
notSupportedLink = Warum wird mein Browser nicht unterstützt?
notSupportedOutdatedDetail = Leider unterstützt diese Firefox-Version die Web-Technologie nicht, auf der Firefox Send basiert. Du musst deinen Browser aktualisieren.
updateFirefox = Firefox aktualisieren
deletePopupCancel = Abbrechen
deleteButtonHover = Löschen
footerLinkLegal = Rechtliches
footerLinkPrivacy = Datenschutz
footerLinkCookies = Cookies
passwordTryAgain = Falsches Passwort. Versuche es nochmal.
javascriptRequired = Firefox Send benötigt JavaScript
whyJavascript = Warum benötigt Firefox Send JavaScript?
enableJavascript = Bitte aktiviere JavaScript und versuche es erneut.
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
introTitle = Einfach und privat Dateien versenden
introDescription = Mit { -send-brand } kannst du Dateien sicher mit anderen teilen – mit End-to-End-Verschlüsselung und einem Freigabe-Link, der automatisch abläuft. So bleiben deine geteilten Inhalte privat und du kannst sicherstellen, dass deine Daten nicht für immer im Web herumschwirren.
notifyUploadEncryptDone = Deine Datei ist verschlüsselt und zum Senden bereit
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
copyLinkDescription = Kopiere den Link, um deine Datei zu teilen:
copyLinkButton = Link kopieren
downloadTitle = Dateien herunterladen
downloadDescription = Diese Datei wurde über { -send-brand } mit End-to-End-Verschlüsselung und einem automatisch ablaufenden Link geteilt.
trySendDescription = Probiere { -send-brand } aus, um einfach und sicher Dateien zu versenden.
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
trustWarningMessage = Sie sollten dem Empfänger vertrauen, wenn Sie vertrauliche Daten weitergeben.
uploadButton = Hochladen
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Dateien per Drag & Drop einfügen
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = oder klicken, um bis zu { $size } zu senden
addPassword = Mit Passwort schützen
emailPlaceholder = E-Mail-Adresse eingeben
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Melde dich an, um Dateien bis { $size } zu senden
signInOnlyButton = Anmelden
accountBenefitTitle = Erstelle ein { -firefox }-Konto oder melde dich an
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Dateien bis zu { $size } teilen
accountBenefitDownloadCount = Teile Dateien mit weiteren Leuten
accountBenefitTimeLimit =
    { $count ->
        [one] Link bis zu einen Tag lang aktiv halten
       *[other] Link bis zu { $count } Tage lang aktiv halten
    }
accountBenefitSync = Geteilte Dateien von anderen Geräten aus verwalten
accountBenefitMoz = Erfahre mehr über andere { -mozilla }-Dienste
signOut = Abmelden
okButton = OK
downloadingTitle = Wird heruntergeladen…
noStreamsWarning = Dieser Browser kann eine so große Datei möglicherweise nicht entschlüsseln.
noStreamsOptionCopy = Kopiere den Link, um ihn in einem anderen Browser zu öffnen
noStreamsOptionFirefox = Probiere unseren Lieblingsbrowser aus
noStreamsOptionDownload = Mit diesem Browser weitermachen
downloadFirefoxPromo = { -send-short-brand } wird Ihnen präsentiert vom brandneuen { -firefox }.
# the next line after the colon contains a file name
shareLinkDescription = Teilen Sie den Link zu Ihrer Datei:
shareLinkButton = Link teilen
# $name is the name of the file
shareMessage = Laden Sie „{ $name }“ mit { -send-brand } herunter: einfaches, sicheres Teilen von Dateien
trailheadPromo = Es gibt einen Weg, deine Privatsphäre zu schützen. Komm zu Firefox.
learnMore = Mehr erfahren.
downloadFlagged = Dieser Link wurde wegen Verstoßes gegen die Nutzungsbedingungen deaktiviert.
downloadConfirmTitle = Eine Sache noch
downloadConfirmDescription = Sie sollten dem Absender dieser Datei vertrauen, da wir nicht überprüfen können, ob Ihr Gerät dadurch beschädigt wird.
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
downloadTrustCheckbox =
    { $count ->
        [one] Ich vertraue der Person, die diese Datei gesendet hat
       *[other] Ich vertraue der Person, die diese Dateien gesendet hat
    }
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
reportFile =
    { $count ->
        [one] Diese Datei als verdächtig melden
       *[other] Diese Dateien als verdächtig melden
    }
reportDescription = Helfen Sie uns mit weiteren Informationen. Wo liegt das Problem bei diesen Dateien?
reportUnknownDescription = Bitte besuchen Sie die Adresse des Links, den Sie melden möchten, und klicken Sie auf „{ reportFile }“.
reportButton = Melden
reportReasonMalware = Diese Dateien enthalten Malware oder sind Teil eines Phishing-Angriffs.
reportReasonPii = Diese Dateien enthalten personenbezogene Daten über mich.
reportReasonAbuse = Diese Dateien enthalten illegale oder missbräuchliche Inhalte.
reportReasonCopyright = Um Urheber- oder Markenrechtsverletzungen zu melden, nutzen Sie bitte das auf <a>dieser Seite</a> beschriebene Verfahren.
reportedTitle = Dateien gemeldet
reportedDescription = Vielen Dank. Wir haben Ihren Bericht über diese Dateien erhalten.
