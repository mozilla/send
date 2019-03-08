# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Feedback
importingFile = Se importă…
encryptingFile = Se criptează…
decryptingFile = Se decriptează…
downloadCount =
    { $num ->
        [one] 1 descărcare
        [few] { $num } descărcări
       *[other] { $num } de descărcări
    }
timespanHours =
    { $num ->
        [one] 1 oră
        [few] { $num } ore
       *[other] { $num } de ore
    }
copiedUrl = Copiat!
unlockInputPlaceholder = Parolă
unlockButtonLabel = Deblochează
downloadButtonLabel = Descarcă
downloadFinish = Descărcare încheiată
fileSizeProgress = ({ $partialSize } din { $totalSize })
sendYourFilesLink = Încearcă Firefox Send
errorPageHeader = Ceva a mers prost!
fileTooBig = Acest fișier este prea mare. Ar trebuie să fie sub { $size }.
linkExpiredAlt = Link expirat
notSupportedHeader = Browserul tău nu este suportat.
notSupportedLink = De ce browserul meu nu este suportat?
notSupportedOutdatedDetail = Din păcate, această versiune de Firefox nu suportă tehnologiile web din spatele Firefox Send. Va trebui să actualizezi browserul.
updateFirefox = Actualizează Firefox
deletePopupCancel = Renunță
deleteButtonHover = Șterge
footerLinkLegal = Mențiuni legale
footerLinkPrivacy = Confidențialitate
footerLinkCookies = Cookie-uri
passwordTryAgain = Parola este incorectă. Încearcă din nou.
javascriptRequired = Firefox Send necesită JavaScript
whyJavascript = De ce Firefox Send necesită JavaScript?
enableJavascript = Te rugăm să reactivezi JavaScript și să încerci din nou.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }h { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Lungime minimă a parolei: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Această parolă nu a putut fi setată

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Partajare de fișiere simplă și privată
notifyUploadEncryptDone = Fișierul tău este criptat și gata de trimitere
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Expiră după { $downloadCount } sau { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 minut
        [few] { $num } minute
       *[other] { $num } de minute
    }
timespanDays =
    { $num ->
        [one] 1 zi
        [few] { $num } zile
       *[other] { $num } de zile
    }
timespanWeeks =
    { $num ->
        [one] 1 săptămână
        [few] { $num } săptămâni
       *[other] { $num } de săptămâni
    }
fileCount =
    { $num ->
        [one] 1 fișier
        [few] { $num } fișiere
       *[other] { $num } de fișiere
    }
# size is a localized number followed by a unit of bytes, ex. 2.5GB
totalSize = Mărime totală: { $size }
copyLinkButton = Copiază linkul
downloadTitle = Descarcă fișierele
trySendDescription = Încearcă { -send-brand } pentru o partajare de fișiere simplă și sigură.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Numai 1 fișier poate fi încărcat simultan.
        [few] Numai { $count } fișiere pot fi încărcate simultan.
       *[other] Numai { $count } de fișiere pot fi încărcate simultan.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Numai 1 arhivă este permisă.
        [few] Numai { $count } arhive sunt permise.
       *[other] Numai { $count } de arhive sunt permise.
    }
expiredTitle = Acest link a expirat.
downloadFirefox = Descarcă { -firefox }
legalTitle = Politica de confidențialitate { -send-short-brand }
legalDateStamp = Versiunea 1.0 din data de 12 martie 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }z { $hours }h { $minutes }m
addFilesButton = Selectează fișierele pentru încărcare
uploadButton = Încarcă
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Trage și plasează fișierele
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# size is a localized number followed by a unit of bytes, ex. 2.5GB
orClickWithSize = sau dă clic pentru a trimite până la { $size }
addPassword = Protejează cu parolă
emailPlaceholder = Introdu e-mailul tău
signInButton = Autentificare/Înregistrare
# size is a localized number followed by a unit of bytes, ex. 2.5GB
accountBenefitLargeFiles = Partajează fișiere de până la { $size }
accountBenefitDownloadCount = Partajează fișiere cu mai multe persoane
accountBenefitSync = Gestionează fișierele partajate de pe orice dispozitiv
accountBenefitMoz = Află despre celelalte servicii { -mozilla }
signOut = Deconectare
okButton = Ok
downloadingTitle = Se descarcă
noStreamsWarning = Este posibil ca acest browser să nu poată decripta un fișier atât de mare.
noStreamsOptionCopy = Copiază linkul pentru a-l deschide într-un alt browser
noStreamsOptionFirefox = Încearcă browserul nostru favorit
noStreamsOptionDownload = Continuă cu acest browser
