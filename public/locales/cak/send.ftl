# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Rutzijol
importingFile = Tajin nijik…
encryptingFile = Tajin newäx rusik'ixik...
decryptingFile = Tajin netamäx rusik'ixik...
downloadCount =
    { $num ->
        [one] 1 qasanïk
       *[other] { $num } taq qasanïk
    }
timespanHours =
    { $num ->
        [one] 1 ramaj
       *[other] { $num } taq ramaj
    }
copiedUrl = ¡Xwachib'ëx!
unlockInputPlaceholder = Ewan tzij
unlockButtonLabel = Titzij chik
downloadButtonLabel = Tiqasäx
downloadFinish = Xtz'aqät qasanïk
fileSizeProgress = ({ $partialSize } richin { $totalSize })
sendYourFilesLink = Titojtob'ëx Firefox Send
errorPageHeader = ¡K'o ri man ütz ta xub'än!
fileTooBig = Yalan nïm re yakb'äl re' richin nijotob'äx. K'o ta chi man nik'o ta chi re ri { $size }.
linkExpiredAlt = Xk'is ruq'ijul ri ximonel
notSupportedHeader = Man koch'el ta ri awokik'amaya'l.
notSupportedLink = ¿Achike ruma man nikoch' taq ri wokik'amaya'l?
notSupportedOutdatedDetail = K'ayew ruma re ruwäch Firefox re' man nuköch' ta ri ajk'amaya'l na'ob'äl nrajo' ri Firefox Send. Rajowaxik nak'ëx ri awokik'amaya'l.
updateFirefox = Tik'ex ri Firefox
deletePopupCancel = Tiq'at
deleteButtonHover = Tiyuj
footerLinkLegal = Taqanel tzijol
footerLinkPrivacy = Ichinanem
footerLinkCookies = Taq kaxlanwey
passwordTryAgain = Itzel ri ewan tzij. Tatojtob'ej chik.
javascriptRequired = K'atzinel JavaScript chi re ri Firefox Send
whyJavascript = ¿Achike ruma toq ri Firefox Send nrajo' JavaScript?
enableJavascript = Titz'ij JavaScript richin nitojtob'ëx chik.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }r { $minutes }ch
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }ch
# A short status message shown when the user enters a long password
maxPasswordLength = Nïm raqän ewan tzij: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Man tikirel ta ninuk' re ewan tzij re'

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Titaq
-firefox = Firefox
-mozilla = Mozilla
introTitle = Kijunamaxik relik chuqa' ichinan yakb'äl
introDescription = { -send-brand } nuya' q'ij chawe ye'akomonij taq yakb'äl ri ewan kisik'ixik chijun chuqa' jun ximonel ri nik'is ruq'ijul pa ruyonil. Ke ri' nawichinaj ronojel ri nakomonij chuqa' yajike' chi ronojel ri  taq awachinaq man jumul ta kek'oje' pa k'amab'ey.
notifyUploadEncryptDone = Ewan chik rusik'ixik ri ayakb'al chuqa' ütz chik richin nitaq
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Nik'is ruq'ij chi rij { $downloadCount } o { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 ch'utiramaj
       *[other] { $num } taq ch'utiramaj
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
        [one] 1 yakb'äl
       *[other] { $num } taq yakb'äl
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
totalSize = Ronojel runimilem: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Tawachib'ej ri ximonel richin nakomonij ri ayakb'al:
copyLinkButton = Tiwachib'ëx ximonel
downloadTitle = Keqasäx taq yakb'äl
downloadDescription = Xkomonïx re yakb'äl re' pa { -send-brand } rik'in chijun ewan rusik'ixik chuqa' nik'is ruq'ijul pa ruyonil.
trySendDescription = Tatojtob'ej { -send-brand } richin chanin chuqa' jikïl ye'akomonij taq yakb'äl.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Xa xe 1 yakb'äl tikirel nijotob'äx pa ri ramaj.
       *[other] Xa xe { $count } taq yakb'äl tikirel yejotob'äx pa ri ramaj.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Xa xe 1 yakb'äl niya' q'ij chi re.
       *[other] Xa xe { $count } taq yakb'äl niya' q'ij chi ke.
    }
expiredTitle = Xk'is yan ruq'ij re ximonel re'.
notSupportedDescription = Man xtisamäj ta ri { -send-brand } rik'in re okik'amaya'l re'. Nisamäj ütz ri { -send-short-brand } rik'in ri ruk'isib'äl ruwäch { -firefox }, chuqa' xtisamäj rik'in ri ruwäch k'o wakami pa ronojel okik'amaya'l.
downloadFirefox = Tiqasäx { -firefox }
legalTitle = Rutzijol Richinanem { -send-short-brand }
legalDateStamp = Ruwäch 1.0, ruq'ijul marso 12, 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }q { $hours }r { $minutes }ch'
addFilesButton = Kecha' taq yakb'äl richin yejotob'äx
uploadButton = Tijotob'äx
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Keqirirëx chuqa' ke'osq'opïx taq yakb'äl
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = o tapitz'a' richin natäq k'a { $size }
addPassword = Tichajïx rik'in ewan tzij
emailPlaceholder = Tatz'ib'aj ataqoya'l
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Tatikirisaj molojri'ïl richin natäq k'a { $size }
signInOnlyButton = Titikirisäx molojri'ïl
accountBenefitTitle = Tatz'uku' jun { -firefox } Rub'i' Ataqoy'al o Tatikirisaj molojri'ïl
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Ke'akomonij taq yakb'äl k'a { $size }
accountBenefitDownloadCount = Ke'akomonij taq yakb'äl kik'in ch'aqa' chik winaqi'
accountBenefitTimeLimit =
    { $count ->
        [one] Ke' atzija' ri taq ximonel chi 1 q'ij
       *[other] Ke'atzija' ri taq ximonel chi { $count } taq q'ij
    }
accountBenefitSync = Ke'anuk'samajij komonin taq yakb'äl pa xab'achike okisab'äl
accountBenefitMoz = Tawetamaj chij ch'aqa' chik { -mozilla } taq samaj
signOut = Titz'apïx molojri'ïl
okButton = ÜTZ
downloadingTitle = Niqasäx
noStreamsWarning = Rik'in jub'a' re okik'amaya'l re' man nitikïr ta nretamaj rusik'ixik nima'q taq yakb'äl.
noStreamsOptionCopy = Tiwachib'ëx ri ximonel richin nijaq pa jun chik okik'amaya'l
noStreamsOptionFirefox = Tatojtob'ej ri jeb'ël qokik'amaya'l
noStreamsOptionDownload = Kisamäj na rik'in re okik'amaya'l re'
downloadFirefoxPromo = Ja ri k'ak'a' { -firefox } nusüj ri { -send-short-brand } chawe.
# the next line after the colon contains a file name
shareLinkDescription = Nakomonij ri ximonel rik'in ri awokisab'al:
shareLinkButton = Tikomonïx ximonel
# $name is the name of the file
shareMessage = Tiqasäx "{ $name }" rik'in { -send-brand }: man k'ayew ta chuqa' ütz kikomonik ri yakb'äl
trailheadPromo = K'o jun rub'anikil richin nachajij ri awichinanem. Tatunu' awi' rik'in ri Firefox.
learnMore = Tetamäx ch'aqa' chik.
