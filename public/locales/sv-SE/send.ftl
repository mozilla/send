# Send is a brand name and should not be localized.
title = Send
importingFile = Importerar…
encryptingFile = Krypterar…
decryptingFile = Avkodar…
downloadCount =
    { $num ->
        [one] 1 nedladdning
       *[other] { $num } nedladdningar
    }
timespanHours =
    { $num ->
        [one] 1 timme
       *[other] { $num } timmar
    }
copiedUrl = Kopierad!
unlockInputPlaceholder = Lösenord
unlockButtonLabel = Lås upp
downloadButtonLabel = Ladda ner
downloadFinish = Nedladdning klar
fileSizeProgress = ({ $partialSize } av { $totalSize })
sendYourFilesLink = Testa Send
errorPageHeader = Något gick fel!
fileTooBig = Den filen är för stor för att ladda upp. Det ska vara mindre än { $size }.
linkExpiredAlt = Länk upphörd
notSupportedHeader = Din webbläsare stöds inte.
notSupportedLink = Varför stöds inte min webbläsare?
notSupportedOutdatedDetail = Tyvärr stödjer den här versionen av Firefox inte webbtekniken som driver Send. Du måste uppdatera din webbläsare.
updateFirefox = Uppdatera Firefox
deletePopupCancel = Avbryt
deleteButtonHover = Ta bort
footerLinkLegal = Juridisk information
footerLinkPrivacy = Sekretess
footerLinkCookies = Kakor
passwordTryAgain = Felaktigt lösenord. Försök igen.
javascriptRequired = Send kräver JavaScript
whyJavascript = Varför kräver Send JavaScript?
enableJavascript = Aktivera JavaScript och försök igen.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }t { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Maximal lösenordslängd: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Det här lösenordet kunde inte ställas in

## Send version 2 strings

# Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Enkel, privat fildelning
introDescription = { -send-brand } låter dig dela filer med end-to-end-kryptering och en länk som automatiskt upphör. Så att du kan behålla det du delar privat och se till att dina saker inte stannar online för alltid.
notifyUploadEncryptDone = Din fil är krypterad och redo att skickas
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Förfaller efter { $downloadCount } eller { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 minut
       *[other] { $num } minuter
    }
timespanDays =
    { $num ->
        [one] 1 dag
       *[other] { $num } dagar
    }
timespanWeeks =
    { $num ->
        [one] 1 vecka
       *[other] { $num } veckor
    }
fileCount =
    { $num ->
        [one] 1 fil
       *[other] { $num } filer
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
totalSize = Total storlek: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Kopiera länken för att dela din fil:
copyLinkButton = Kopiera länk
downloadTitle = Ladda ner filer
downloadDescription = Den här filen delades via { -send-brand } med end-to-end-kryptering och en länk som automatiskt upphör.
trySendDescription = Prova { -send-brand } för enkel, säker fildelning.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Endast 1 fil  kan laddas upp i taget.
       *[other] Endast { $count } filer kan laddas upp i taget.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Endast 1 arkiv är tillåten.
       *[other] Endast { $count } arkiv är tillåtna.
    }
expiredTitle = Den här länken har upphört.
notSupportedDescription = { -send-brand } fungerar inte med den här webbläsaren. { -send-short-brand } fungerar bäst med den senaste versionen av { -firefox } och kommer att fungera med den nuvarande versionen av de flesta webbläsare.
downloadFirefox = Hämta { -firefox }
legalTitle = { -send-short-brand } sekretesspolicy
legalDateStamp = Version 1.0, daterad den 12 mars 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }d { $hours }t { $minutes }m
addFilesButton = Välj filer som ska laddas upp
trustWarningMessage = Se till att du litar på din mottagare när du delar känslig information.
uploadButton = Ladda upp
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Dra och släpp filer
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = eller klicka för att skicka upp till { $size }
addPassword = Skydda med lösenord
emailPlaceholder = Ange din e-postadress
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Logga in för att skicka upp till { $size }
signInOnlyButton = Logga in
accountBenefitTitle = Skapa ett { -firefox }-konto eller logga in
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Dela filer upp till { $size }
accountBenefitDownloadCount = Dela filer med fler personer
accountBenefitTimeLimit =
    { $count ->
        [one] Håll länk aktiv i upp till 1 dag
       *[other] Håll länkar aktiva i upp till { $count } dagar
    }
accountBenefitSync = Hantera delade filer från vilken enhet som helst
accountBenefitMoz = Läs om andra { -mozilla }-tjänster
signOut = Logga ut
okButton = OK
downloadingTitle = Laddar ner
noStreamsWarning = Den här webbläsaren kanske inte kan dekryptera en så stor fil.
noStreamsOptionCopy = Kopiera länken för att öppna i en annan webbläsare
noStreamsOptionFirefox = Prova vår favoritwebbläsare
noStreamsOptionDownload = Fortsätt med den här webbläsaren
downloadFirefoxPromo = { -send-short-brand } presenteras för dig av den helt nya { -firefox }.
# the next line after the colon contains a file name
shareLinkDescription = Dela länken till din fil:
shareLinkButton = Dela länk
# $name is the name of the file
shareMessage = Ladda ner "{ $name }" med { -send-brand }: enkel, säker fildelning
trailheadPromo = Det finns ett sätt att skydda din integritet. Gå med i Firefox.
learnMore = Läs mer.
downloadFlagged = Den här länken har inaktiverats pga brott mot användarvillkoren.
downloadConfirmTitle = En sak till
downloadConfirmDescription = Se till att du litar på personen som skickade dig den här filen eftersom vi inte kan verifiera att den inte skadar din enhet.
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
downloadTrustCheckbox =
    { $count ->
        [one] Jag litar på personen som skickade denna filen
       *[other] Jag litar på personen som skickade dessa filer
    }
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
reportFile =
    { $count ->
        [one] Rapportera denna filen som misstänkt
       *[other] Rapportera dessa filer som misstänkta
    }
reportDescription = Hjälp oss att förstå vad som händer. Vad tycker du är fel med dessa filer?
reportUnknownDescription = Gå till den url till länken du vill rapportera och klicka på "{ reportFile }".
reportButton = Rapportera
reportReasonMalware = Dessa filer innehåller skadlig kod eller är en del av en nätfiskeattack.
reportReasonPii = Dessa filer innehåller personlig identifierbar information om mig.
reportReasonAbuse = Dessa filer innehåller olagligt eller våldsamt innehåll.
reportReasonCopyright = För att rapportera intrång i upphovsrätt eller varumärke, använd processen som beskrivs på <a>den här sidan</a>.
reportedTitle = Rapporterade filer
reportedDescription = Tack. Vi har fått din rapport om dessa filer.
