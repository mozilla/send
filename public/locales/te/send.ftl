# Send is a brand name and should not be localized.
title = Send
importingFile = దిగుమతవుతోంది...
encryptingFile = గుప్తీకరిస్తోంది...
decryptingFile = వ్యక్తపరుస్తోంది...
downloadCount =
    { $num ->
        [one] 1 దింపుకోలు
       *[other] { $num } దింపుకోళ్ళు
    }
timespanHours =
    { $num ->
        [one] 1 గంట
       *[other] { $num } గంటలు
    }
copiedUrl = నకలు చేయబడింది!
unlockInputPlaceholder = సంకేతపదం
unlockButtonLabel = తాళం తీయి
downloadButtonLabel = దిగుమతి
downloadFinish = దిగుమతి పూర్తయింది
fileSizeProgress = { $totalSize }) యొక్క ({ $partialSize }
sendYourFilesLink = Firefox sendను ప్రయత్నించండి
errorPageHeader = ఏదో తప్పిదం జరిగింది!
fileTooBig = ఆ ఫైలు ఎక్కించడానికి చాలా పెద్దగా ఉంది. ఫైళ్ళు { $size } కంటే తక్కువ పరిమాణంలో ఉండాలి.
linkExpiredAlt = లంకె గడువు ముగిసింది
notSupportedHeader = మీ విహారిణికి మద్దతు లేదు.
notSupportedLink = నా విహారిణికి ఎందుకు మద్దతు లేదు?
notSupportedOutdatedDetail = దురదృష్టవశాత్తు Firefox యొక్క ఈ వెర్షన్ Firefox సాంకేతికతను పంపే వెబ్ సాంకేతికతకు మద్దతు ఇవ్వదు. మీరు మీ బ్రౌజర్ని నవీకరించాలి.
updateFirefox = Firefoxను నవీకరించు
deletePopupCancel = రద్దుచేయి
deleteButtonHover = తొలగించు
footerLinkLegal = చట్టపరమైన
footerLinkPrivacy = గోప్యత
footerLinkCookies = కుకీలు
passwordTryAgain = సరికాని సంకేతపదం. మళ్ళీ ప్రయత్నించండి.
javascriptRequired = Sendకి జావాస్క్రిప్టు కావాలి
whyJavascript = Sendకి జావాస్క్రిప్టు ఎందుకు కావాలి?
enableJavascript = జావాస్క్రిప్టు చేతనంచేసి మళ్ళీ ప్రయత్నించండి.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }గం { $minutes }ని
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }ని
# A short status message shown when the user enters a long password
maxPasswordLength = సంకేతపదం గరిష్ఠ పొడవు: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = ఈ సంకేతపదం పెట్టలేకపోయాం

## Send version 2 strings

# Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Send
-send-short-brand = పంపించు
-firefox = Firefox
-mozilla = Mozilla
notifyUploadEncryptDone = మీ ఫైలు గుప్తీకరించబడింది, పంపడానికి సిద్ధంగా ఉంది
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = { $downloadCount } లేదా { $timespan } తర్వాత కాలంచెల్లుతుంది
timespanMinutes =
    { $num ->
        [one] 1 నిమిషం
       *[other] { $num } నిమిషాలు
    }
timespanDays =
    { $num ->
        [one] 1 రోజు
       *[other] { $num } రోజులు
    }
timespanWeeks =
    { $num ->
        [one] 1 వారం
       *[other] { $num } వారాలు
    }
fileCount =
    { $num ->
        [one] 1 ఫైలు
       *[other] { $num } ఫైళ్లు
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
totalSize = మొత్తం పరిమాణం: { $size }
# the next line after the colon contains a file name
copyLinkDescription = మీ ఫైలును భాగస్వామ్యం చేయడానికి ఈ లంకెను నకలు చేయండి:
copyLinkButton = లంకెను నకలుతీయి
downloadTitle = ఫైళ్లను దింపుకోండి
expiredTitle = ఈ లంకె గడువు ముగిసింది.
downloadFirefox = { -firefox } ను దింపుకోండి
legalTitle = { -send-short-brand } గోప్యతా నోటీసు
legalDateStamp = వెర్షన్ 1.0, మార్చి 12, 2019 నాటిది
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }d { $hours }h { $minutes }m
addFilesButton = ఎక్కించడానికి ఫైళ్ళను ఎంచుకోండి
uploadButton = ఎక్కించు
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = ఫైళ్ళను లాగండి మరియు వదలండి
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = లేదా { $size } వరకు పంపడానికి నొక్కండి
addPassword = సంకేతపదంతో రక్షించండి
emailPlaceholder = ఈ ఈమెయిలును ఇవ్వండి
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = { $size } వరకు పంపడానికి ప్రవేశించండి
signInOnlyButton = ప్రవేశించండి
accountBenefitTitle = ఒక { -firefox } ఖాతాని సృష్టించండి లేదా ప్రవేశించండి
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = { $size } పరిమాణం ఫైళ్ళ వరకు పంచుకోండి
accountBenefitDownloadCount = ఫైళ్లను ఎక్కువ మందితో పంచుకోండి
accountBenefitTimeLimit =
    { $count ->
       *[other] లంకెలను { $count } రోజుల వరకు చేతనంగా ఉంచు
    }
accountBenefitSync = ఏదైనా పరికరం నుండి పంచుకున్న ఫైళ్ళను నిర్వహించండి
accountBenefitMoz = ఇతర { -mozilla } సేవల గురించి తెలుసుకోండి
signOut = నిష్క్రమించు
okButton = సరే
downloadingTitle = దింపుకుంటోంది
noStreamsWarning = ఈ బ్రౌజర్ ఈ ఫైలును పెద్దగా డీక్రిప్ట్ చేయలేకపోవచ్చు.
noStreamsOptionCopy = మరొక బ్రౌజర్‌లో తెరవడానికి లంకెను నకలు చేయండి
noStreamsOptionFirefox = మా అభిమాన బ్రౌజర్‌ను ప్రయత్నించండి
noStreamsOptionDownload = ఈ బ్రౌజర్‌తో కొనసాగించండి
downloadFirefoxPromo = { -send-short-brand } క్రొత్త { -firefox } ద్వారా మీ ముందుకు తీసుకురాబడుతుంది.
# the next line after the colon contains a file name
shareLinkDescription = మీ ఫైలుకు లంకెను పంచుకోండి:
shareLinkButton = లంకెను పంచుకోండి
# $name is the name of the file
shareMessage = “{ $name }”‌ని { -send-brand }తో దించుకోండి: తేలికైన, సురక్షితమైన ఫైలు పంచుకోలు సేవ
trailheadPromo = మీ అంతరంగికతను కాపాడుకోడానికి ఓ మార్గం ఉంది. Firefoxతో చేరండి.
learnMore = ఇంకా తెలుసుకోండి.
