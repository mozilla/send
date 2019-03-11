# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Feedback
importingFile = Importeren…
encryptingFile = Versleutelen…
decryptingFile = Ontcijferen…
downloadCount =
    { $num ->
        [one] 1 download
       *[other] { $num } downloads
    }
timespanHours =
    { $num ->
        [one] 1 uur
       *[other] { $num } uur
    }
copiedUrl = Gekopieerd!
unlockInputPlaceholder = Wachtwoord
unlockButtonLabel = Ontgrendelen
downloadButtonLabel = Downloaden
downloadFinish = Downloaden voltooid
fileSizeProgress = ({ $partialSize } van { $totalSize })
sendYourFilesLink = Firefox Send proberen
errorPageHeader = Er is iets misgegaan!
fileTooBig = Dat bestand is te groot om te worden geüpload. Het moet kleiner zijn dan { $size }.
linkExpiredAlt = Koppeling verlopen
notSupportedHeader = Uw browser wordt niet ondersteund.
notSupportedLink = Waarom wordt mijn browser niet ondersteund?
notSupportedOutdatedDetail = Helaas ondersteunt deze versie van Firefox de webtechnologie die Firefox Send gebruikt niet. U dient uw browser bij te werken.
updateFirefox = Firefox bijwerken
deletePopupCancel = Annuleren
deleteButtonHover = Verwijderen
footerLinkLegal = Juridisch
footerLinkPrivacy = Privacy
footerLinkCookies = Cookies
passwordTryAgain = Onjuist wachtwoord. Probeer het opnieuw.
javascriptRequired = Firefox Send vereist JavaScript
whyJavascript = Waarom vereist Firefox Send JavaScript?
enableJavascript = Schakel JavaScript in en probeer het opnieuw.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }u { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Maximale wachtwoordlengte: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Dit wachtwoord kon niet worden ingesteld

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Eenvoudig, privé bestanden delen
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Verloopt na { $downloadCount } of { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 minuut
       *[other] { $num } minuten
    }
timespanDays =
    { $num ->
        [one] 1 dag
       *[other] { $num } dagen
    }
timespanWeeks =
    { $num ->
        [one] 1 week
       *[other] { $num } weken
    }
fileCount =
    { $num ->
        [one] 1 bestand
       *[other] { $num } bestanden
    }
# size is a localized number followed by a unit of bytes, ex. 2.5GB
totalSize = Totale grootte: { $size }
expiredTitle = Deze koppeling is verlopen.
emailPlaceholder = Voer uw e-mailadres in
signInButton = Aanmelden/Registreren
accountBenefitTitle = Maak een { -firefox }-account of meld u aan
signOut = Afmelden
okButton = OK
