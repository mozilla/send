# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Kommentaar
importingFile = Ymportearje…
encryptingFile = Fersiferje…
decryptingFile = Untsiferje…
downloadCount =
    { $num ->
        [one] 1 download
       *[other] { $num } downloads
    }
timespanHours =
    { $num ->
        [one] 1 oer
       *[other] { $num } oeren
    }
copiedUrl = Kopiearre!
unlockInputPlaceholder = Wachtwurd
unlockButtonLabel = Deblokkearje
downloadButtonLabel = Downloade
downloadFinish = Download foltôge
fileSizeProgress = ({ $partialSize } fan { $totalSize })
sendYourFilesLink = Firefox Send probearje
errorPageHeader = Der is wat misgien!
fileTooBig = It bestân is te grut om op te laden. It moat lytser wêze as { $size }.
linkExpiredAlt = Keppeling ferrûn
notSupportedHeader = Jo browser wurdt net stipe.
notSupportedLink = Wêrom wurdt myn browser net stipe?
notSupportedOutdatedDetail = Spitigernôch stipet dizze ferzje fan Firefox de webtechnology dy't Firefox Send mooflik makket net. Jo moatte jo browser fernije.
updateFirefox = Firefox fernije
deletePopupCancel = Annulearje
deleteButtonHover = Fuortsmite
footerLinkLegal = Juridysk
footerLinkPrivacy = Privacy
footerLinkCookies = Cookies
passwordTryAgain = Net krekt wachtwurd. Probearje it opnij.
javascriptRequired = Firefox Send fereasket JavaScript.
whyJavascript = Werom hat Firefox Send JavaScript nedich?
enableJavascript = Skeakelje JavaScript yn en probearje nochris.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }o { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Maksimale wachtwurdlingte: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Dit wachtwurd koe net ynsteld wurde

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Ienfâldich, privee bestannen diele
introDescription = Mei { -send-brand } kinne jo bestannen mei ein-ta-ein-fersifering en in automatysk ferrinnende keppeling diele. Sa kinne jo de dielde ynhâld privee hâlde, sadat jo gegevens net foar altyd online bliuwt.
notifyUploadEncryptDone = Jo bestân is fersifere en ree om te ferstjoeren
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Ferrint nei { $downloadCount } of { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 minute
       *[other] { $num } minuten
    }
timespanDays =
    { $num ->
        [one] 1 dei
       *[other] { $num } dagen
    }
timespanWeeks =
    { $num ->
        [one] 1 wike
       *[other] { $num } wiken
    }
fileCount =
    { $num ->
        [one] 1 bestân
       *[other] { $num } bestannen
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
fileSize = { $num } { $units }
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
totalSize = Totale grutte: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Kopiearje de keppeling, om jo bestannen te dielen:
copyLinkButton = Keppeling kopierje
downloadTitle = Bestannen downloade
downloadDescription = Dit bestân is mei ein-ta-ein-fersifering en in keppeling dy't automatysk ferrint dield fia { -send-brand }.
trySendDescription = Probearje { -send-brand }, om ienfâldich en privee bestannen te dielen.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Der kin maksimaal ien bestân opladen wurde.
       *[other] Der kinne maksimaal { $count } bestannen opladen wurde.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Der is mar ien argyf tastien.
       *[other] Der binne mar { $count } argiven tastien.
    }
expiredTitle = Dizze keppeling is ferrûn.
notSupportedDescription = { -send-brand } funksjonearret net mei dizze browser. { -send-short-brand } funksjonearret it bêste mei de nijste ferzje fan { -firefox } en funksjonearret mei de aktuele ferzje fan de measte browsers.
downloadFirefox = { -firefox } downloade
legalTitle = { -send-short-brand }-privacyferklearring
legalDateStamp = Ferzje 1.0, datearre 12 maart 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }d { $hours }o { $minutes }m
addFilesButton = Bestannen selektearje om op te laden
uploadButton = Oplade
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Sleep en pleats bestannen
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = of stjoer oant { $size } troch te klikken
addPassword = Mei wachtwurd beskermje
emailPlaceholder = Fier jo e-mailadres yn
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Meld jo oan, om bestannen oant { $size } te stjoeren
signInOnlyButton = Oanmelde
accountBenefitTitle = Meitsje in { -firefox }-account of meld jo oan
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Diel bestannen oant { $size }
accountBenefitDownloadCount = Diel bestannen mei mear minsken
accountBenefitTimeLimit =
    { $count ->
        [one] Keppeling oant ien dei lang aktyf hâlde
       *[other] Keppeling oant { $count } dagen lang aktyf hâlde
    }
accountBenefitSync = Behear dielde bestannen fan elk apparaat ôf
accountBenefitMoz = Lês mear oer oare { -mozilla }-tsjinsten
signOut = Ofmelde
okButton = OK
downloadingTitle = Downloade
noStreamsWarning = Dizze browser kin in sa'n grut bestân mooglik net fersiferje.
noStreamsOptionCopy = Kopiearje de koppeling om yn in oare browser te iepenjen
noStreamsOptionFirefox = Probearje ús favorite browser
noStreamsOptionDownload = Trochgean mei dizze browser
downloadFirefoxPromo = { -send-short-brand } wurdt jo oanbean troch it folslein fernijde { -firefox }.
# the next line after the colon contains a file name
shareLinkDescription = Diel de keppeling nei jo bestân:
shareLinkButton = Keppeling diele
# $name is the name of the file
shareMessage = Download ‘{ $name }’ mei { -send-brand }: ienfâldich, feilich bestannen diele
trailheadPromo = Der is in manier om jo privacy te beskermjen. Doch mei mei Firefox.
learnMore = Mear ynfo.
