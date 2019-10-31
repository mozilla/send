# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Utzijoxik
importingFile = Ujek'ik…
encryptingFile = Uwiqik…
decryptingFile = Usolik…
downloadCount =
    { $num ->
        [one] 1 uqasaxik
       *[other] { $num } taq uqasaxik
    }
timespanHours =
    { $num ->
        [one] 1 ramaj
       *[other] { $num } taq ramaj
    }
copiedUrl = Copied!
unlockInputPlaceholder = Retokib'al
unlockButtonLabel = Utzoqopixik
downloadButtonLabel = Uqasaxik
downloadFinish = Tz'aqat uqasaxik
fileSizeProgress = ({ $partialSize } rech { $totalSize })
sendYourFilesLink = Chak'amb'ejaj Firefox Send
errorPageHeader = K'o man utz ta xub'ano
fileTooBig = Le kemk'olib'al sib'alaj nim chech upaqab'isaxik. Rajawaxik nitz' chi uwach{ $size }
linkExpiredAlt = Xq'ax uq'ijol kemwiqb'al
notSupportedHeader = Man toq'am ta le anik'onel
notSupportedLink = ¿Jasche man toq'am ta le nunik'onel?
notSupportedOutdatedDetail = Chakuyu' we okib'al rech Firefox man kutoq'aj ta le k'ak'eta'm rech web' le kuya' uchuq'ab' Firefox Send. Rajawaxik kak'ak'arisaj le anik'onel.
updateFirefox = Chak'ak'arisaj Firefox
deletePopupCancel = Uq'atexik
deleteButtonHover = Uchupik
footerLinkLegal = Nim wuj
footerLinkPrivacy = Echeb'alil
footerLinkCookies = Cookies
passwordTryAgain = Man utz ta le retokib'al. Chab'ana' chi jumul.
javascriptRequired = Le Firefox Send kajawataj JavaScript chech
whyJavascript = ¿jasche kajawataj JavaScript chech  Firefox Send?
enableJavascript = Chatzija' JavaScript k'ate k'u ri' chab'ana' chi jumul.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }h { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Nimalaj unimal retokib'al: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Man kkowimb'ex ta ujeqeb'axik le retokib'al

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Utaqik
-firefox = Firefox
-mozilla = Mozilla
introTitle = Man k'ax taj, ukomonexik taq kemk'olib'al pa echeb'alil
introDescription = { -send-brand } kuya' bé chi awech kakomonej taq kemk'olib'al ruk' wiqitajem chi'l jun kemwiqb'al le kq'ax uq'ijol pa utukelam. Are chi man katzaq ta le kakomone'j pa echeb'alil chi'l chasuk'ub'a' rilik chi le taq ajastaq man kk'oji' ta pa nimk'atz pa junelik.
notifyUploadEncryptDone = Le akemk'olib'al wiqitalik chi'l utz chi kataqo
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Kq'ax uq'ijol chi rij { $downloadCount } on { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 kajb'al
       *[other] { $num } taq kajb'al
    }
timespanDays =
    { $num ->
        [one] 1 q'ij
       *[other] { $num } taq q'ij
    }
timespanWeeks =
    { $num ->
        [one] 1 wuqq'ij
       *[other] { $num } taq wuqq'ij
    }
fileCount =
    { $num ->
        [one] 1 kemk'olib'al
       *[other] { $num } taq kemk'olib'al
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
totalSize = Ronojel unimal: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Chawinaqirisaj uwach le kemwiqb'al chech ukomone'xik le akemk'olib'al:
copyLinkButton = Relesaxik uwach kemwiqb'al
downloadTitle = Uqasaxik taq kemwiqb'al
downloadDescription = We kemk'olib'al xkomone'x pa { -send-brand } ruk' wiqitajem pa xkut chi xkut chi'l jun kemwiqb'al le kq'ax uq'ijol pa utukelam.
trySendDescription = Chak'amb'ejaj { -send-brand } chech man k'ax taj, ukomonexik kemk'olib'al pa chajib'al.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Xa 1 kemk'olib'al kkowinb'ex upaqab'isaxik pa jun uq'ijol.
       *[other] Xew { $count } taq kemk'olib'al kkowinb'ex upaqab'isaxik pa jun uq'ijol.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Xew 1 kemk'olib'al ya'om b'e chech.
       *[other] Xew { $count } taq kemk'olib'al ya'om b'e chech
    }
expiredTitle = Xq'ax uq'ijol we kemwiqb'al
notSupportedDescription = { -send-brand } man kchakun ta ruk' we nik'onel. { -send-short-brand } are qas utz uchakunem ruk' le maja naj okib'al rech { -firefox }, xuquje' kchakun ruk' le okib'al rech chanim rech nima ronojel taq nik'onelab'.
downloadFirefox = Uqasaxik { -firefox }
legalTitle = { -send-short-brand } ub'ixikil rech echeb'alil
legalDateStamp = Okib'al 1.0, uq'ijol rech urox ik' 12, 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }d { $hours }h { $minutes }m
addFilesButton = Ucha'ik taq kemk'olib'al chech upaqab'isaxik
uploadButton = Upaqab'isaxik
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Uchararexik chi'l utzoqopixik taq kemk'olib'al
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = on chapitz'a' chech utaqik chech { $size }
addPassword = Chajital rumal retokib'al
emailPlaceholder = Chach'apa' le ataqoqxa'nib'al
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Chamajij kemchak chech utaqik chech { $size }
signInOnlyButton = Chamajij kemchak
accountBenefitTitle = Chawinaqirisaj jun { -firefox } kemb'i'aj on chamajij kemchak
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Chakomone'j taq kemk'olib'al kq'ax pa uwi' { $size }
accountBenefitDownloadCount = Chakomone'j taq kemk'olib'al kuk' nik'aj chi winaq
accountBenefitTimeLimit =
    { $count ->
        [one] Chatzija' taq kemwiqb'al are chi kq'ax pa uwi' 1 q'ij
       *[other] Chatzija' taq kemwiqb'al are chi kq'ax pa uwi' { $count } taq q'ij
    }
accountBenefitSync = Chawilawachij komone'tal taq kemk'olib'al pa apachike wiqkemchakub'al
accountBenefitMoz = Chaweta'maj chi rij jun chi { -mozilla } taq patanib'al
signOut = Chatz'apij kemchak
okButton = Ja'e
downloadingTitle = Ktajin uqasaxik
noStreamsWarning = We nik'onel wene man kkowin taj kusol jun jewa' unimal kemk'olib'al
noStreamsOptionCopy = Chawelesaj uwach le kemwiqb'al chech ujaqik jun chi nik'onel
noStreamsOptionFirefox = Chak'amb'ejaj le ajawatal nik'onel
noStreamsOptionDownload = Chab'ana' na ruk' we nik'onel
downloadFirefoxPromo = { -send-short-brand } k'amom la chi awech rumal le k'ak' { -firefox }.
# the next line after the colon contains a file name
shareLinkDescription = Chakomone'j le kemwiqb'al chech le akemk'olib'al:
shareLinkButton = Chakomone'j kemwiqb'al
# $name is the name of the file
shareMessage = Chaqasaj “{ $name }” ruk' { -send-brand }: man k'ax ta ub'anik, ukomone'xik kemk'olib'al pa chajib'al
trailheadPromo = K'o jun ub'e'al chech uchajixik le a'echeb'alil. Chat'iqa' awib' pa. Firefox.
learnMore = Chaweta'maj nik'aj chik
