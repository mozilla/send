# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Roit hoc'h ali
importingFile = Oc'h enporzhiañ …
encryptingFile = Oc'h enrinegañ..
decryptingFile = Oc'h ezrinegañ...
downloadCount =
    { $num ->
        [one] { $num } bellgargadenn
        [two] { $num } bellgargadenn
        [few] { $num } fellgargadenn
        [many] { $num } a bellgargadennoù
       *[other] { $num } pellgargadenn
    }
timespanHours =
    { $num ->
        [one] { $num } eur
        [two] { $num } eur
        [few] { $num } eur
        [many] { $num } a eurioù
       *[other] { $num } eur
    }
copiedUrl = Eilet!
unlockInputPlaceholder = Ger-tremen
unlockButtonLabel = Dibrennañ
downloadButtonLabel = Pellgargañ
downloadFinish = Pellgargadur echu
fileSizeProgress = ({ $partialSize } war { $totalSize })
sendYourFilesLink = Esaeit Firefox Send
errorPageHeader = Degouezhet ez eus bet ur fazi!
fileTooBig = Re vras eo ar restr-mañ evit e pellgas. Rankout a ra bezañ nebeutoc'h eget { $size }
linkExpiredAlt = Ere diamzeret
notSupportedHeader = N'eo ket skoret ho merdeer.
notSupportedLink = Perak n'eo ket skoret ma merdeer?
notSupportedOutdatedDetail = Siwazh n'eo ket skoret ar c'halvezerezhioù implijet evit Firefox Send gant an handelv-mañ eus Firefox. Ret e vo deoc'h hizivaat ho merdeer.
updateFirefox = Hizivaat Firefox
deletePopupCancel = Nullañ
deleteButtonHover = Dilemel
footerLinkLegal = Lezennel
footerLinkPrivacy = Buhez prevez
footerLinkCookies = Toupinoù
passwordTryAgain = Ger-tremen direizh. Klaskit en-dro.
javascriptRequired = Firefox Send a azgoulenn Javascript
whyJavascript = Perak e azgoulenn Firefox Send Javascript?
enableJavascript = Gweredekait Javascript ha klaskit en-dro.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }e { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Hirder brasañ aotreet evit ar ger-tremen: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = N'haller ket despizañ ar ger-tremen

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Rannañ restroù en un doare eeun ha prevez
introDescription = A-drugarez da { -send-brand } a c'hallit rannañ restroù gant un enrinegañ penn-ouzh-penn hag un ere a ziamzero ent emgefreek. Evel-se e c'hallit mirout ar pezh a rannit prevez ha bezañ sur ne chomo ket ho traoù enlinenn da viken.
notifyUploadEncryptDone = Enrineget eo ho restr ha prest eo da vezañ kaset
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Diamzeriñ a raio goude { $downloadCount } pe { $timespan }
timespanMinutes =
    { $num ->
        [one] { $num } vunutenn
        [two] { $num } vunutenn
        [few] { $num } munutenn
        [many] { $num } a vunutennoù
       *[other] { $num } munutenn
    }
timespanDays =
    { $num ->
        [one] { $num } devezh
        [two] { $num } zevezh
        [few] { $num } devezh
        [many] { $num } a zevezhioù
       *[other] { $num } devezh
    }
timespanWeeks =
    { $num ->
        [one] { $num } sizhun
        [two] { $num } sizhun
        [few] { $num } sizhun
        [many] { $num } a sizhunioù
       *[other] { $num } sizhun
    }
fileCount =
    { $num ->
        [one] { $num } restr
        [two] { $num } restr
        [few] { $num } restr
        [many] { $num } a restroù
       *[other] { $num } restr
    }
# byte abbreviation
bytes = e
# kibibyte abbreviation
kb = Ke
# mebibyte abbreviation
mb = Me
# gibibyte abbreviation
gb = Ge
# localized number and byte abbreviation. example "2.5MB"
fileSize = { $num }{ $units }
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
totalSize = Ment hollek: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Eilit an ere evit rannañ ho restr
copyLinkButton = Eilañ an ere
downloadTitle = Pellgargañ ar restroù
downloadDescription = Dre { -send-brand } eo bet rannet ar restr-mañ, gant un enrinegañ penn-ouzh-penn hag un ere a ziamzer ent emgefreek.
trySendDescription = Esaeit { -send-brand } evit rannañ restroù en un doare eeun ha prevez.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] N'haller pellgas nemet { $count } restr er memes mare.
        [two] N'haller pellgas nemet { $count } restr er memes mare.
        [few] N'haller pellgas nemet { $count } restr er memes mare.
        [many] N'haller pellgas nemet { $count } a restroù er memes mare.
       *[other] N'haller pellgas nemet { $count } restr er memes mare.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Aotreet eo{ $count } diell nemetken.
        [two] Aotreet eo{ $count } ziell nemetken.
        [few] Aotreet eo{ $count } diell nemetken.
        [many] Aotreet eo{ $count } a zielloù nemetken.
       *[other] Aotreet eo{ $count } diell nemetken.
    }
expiredTitle = Diamzeret eo an ere.
notSupportedDescription = { -send-brand } n'aio ket en-dro war ar merdeer-mañ. { -send-short-brand } a za en-dro gwelloc'h gant handelv diwezhañ { -firefox }, ha mont a raio en-dro gant handelv bremanel lodenn vrasañ ar merdeerioù.
downloadFirefox = Pellgargañ { -firefox }
legalTitle = Evezhiadenn a fed buhez prevez { -send-short-brand }
legalDateStamp = Handelv 1.0, d'an 12 a viz Meurzh 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }d { $hours }e { $minutes }m
addFilesButton = Diuzit ur restr da bellgas
uploadButton = Pellgas
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Riklit ha laoskit restroù
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = pe klikit evit kas betek { $size }
addPassword = Gwareziñ gant ur ger-tremen
emailPlaceholder = Enankit ho chomlec'h postel
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Kennaskit evit kas betek { $size }
signInOnlyButton = Kennaskañ
accountBenefitTitle = Krouit ur gont { -firefox } pe kennaskit
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Rannit restroù betek { $size }
accountBenefitDownloadCount = Rannit restroù gant muioc'h a dud
accountBenefitTimeLimit =
    { $count ->
        [one] Dalc'hit an ereoù oberiant e-pad { $count } devezh
        [two] Dalc'hit an ereoù oberiant e-pad { $count } zevezh
        [few] Dalc'hit an ereoù oberiant e-pad { $count } devezh
        [many] Dalc'hit an ereoù oberiant e-pad { $count } a zevezhioù
       *[other] Dalc'hit an ereoù oberiant e-pad { $count } devezh
    }
accountBenefitSync = Merit ar restroù rannet gant forzh peseurt trevnad
accountBenefitMoz = Gouzout hiroc'h a-zivout gwazerezhioù all { -mozilla }
signOut = Digennaskañ
okButton = Mat eo
downloadingTitle = O pellgargañ
noStreamsWarning = Posupl eo ne vefe ket gouest ar merdeer-mañ da ezrinegañ ur restr ken bras.
noStreamsOptionCopy = Eilit an ere evit digeriñ anezhañ en ur merdeer all
noStreamsOptionFirefox = Esaeit hor merdeer karetañ
noStreamsOptionDownload = Kenderc'hel gant ar merdeer-mañ
downloadFirefoxPromo = { -send-short-brand } a zo kinniget deoc'h gant ar { -firefox } nevez-flamm.
# the next line after the colon contains a file name
shareLinkDescription = Rannit an ere etrezek ho restr:
shareLinkButton = Rannañ an ere
# $name is the name of the file
shareMessage = Pellgargañ "{ $name }" gant { -send-brand }: rannañ restroù en un doare eeun ha prevez
trailheadPromo = Un doare a zo da wareziñ ho puhez prevez. Tremenit da Firefox.
learnMore = Gouzout hiroc'h.
