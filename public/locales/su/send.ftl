# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Pangdeudeul
importingFile = Ngimpor...
encryptingFile = Ngénkripsi...
decryptingFile = Ngadékripsi...
downloadCount =
    { $num ->
       *[other] { $num } undeuran
    }
timespanHours =
    { $num ->
       *[other] { $num } jam
    }
copiedUrl = Ditiron!
unlockInputPlaceholder = Kecap sandi
unlockButtonLabel = Laan konci
downloadButtonLabel = Undeur
downloadFinish = Undeuran anggeus
fileSizeProgress = ({ $partialSize } ti { $totalSize })
sendYourFilesLink = Pecakan Firefox Send
errorPageHeader = Aya nu salah!
fileTooBig = Koropak unjalkeuneun badag teuing. Kudu kurang ti { $size }.
linkExpiredAlt = Tutumbu kadaluwarsa
notSupportedHeader = Panyungsi anjeun teu dirojong
notSupportedLink = Naha panyungsi kuring teu dirojong?
notSupportedOutdatedDetail = Hanjakal Firefox vérsi ieu teu ngarojong téhnologi wéb nu ngagerakkeun Firefox Send. Anjeun perlu ngapdét panyungsi anjeun.
updateFirefox = Apdét Firefox
deletePopupCancel = Bolay
deleteButtonHover = Pupus
footerLinkLegal = Légal
footerLinkPrivacy = Privasi
footerLinkCookies = Kuki
passwordTryAgain = Kecap sandi salah. Pecakan deui.
javascriptRequired = Firefox Send merlukeun JavaScript
whyJavascript = Naha Firefox Send merlukeun JavaScript?
enableJavascript = Prak hurungkeun JavaScript sarta pecakan deui.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }j { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Panjang sandi maksimal: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Ieu kecap sandi teu bisa disét

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Simpel, babagi koropak privat
introDescription = { -send-brand } migampang anjeun babagi koropak kalawan énkripsi tungtung-ka-tungtung sarta tutumbu nu otomatis kadaluwarsa. Sahingga anjeun bisa ngaraksa naon nu ku anjeun bagi sacara privat jeung mastikeun banda anjeun teu salawasna daring.
notifyUploadEncryptDone = Koropak anjeun kaénkripsi sarta siap dikirim.
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Kadaluwarsa sanggeu { $downloadCount } atawa { $timespan }
timespanMinutes =
    { $num ->
        [one] samenit
       *[other] { $num } menit
    }
timespanDays =
    { $num ->
        [one] sapoé
       *[other] { $num } poé
    }
timespanWeeks =
    { $num ->
        [one] saminggu
       *[other] { $num } minggu
    }
fileCount =
    { $num ->
        [one] sakoropak
       *[other] { $num } koropak
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
totalSize = Ukuran total: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Tiron tutumbu pikeun babagi koropak anjeun:
copyLinkButton = Tiron tutumbu
downloadTitle = Undeur koropak
downloadDescription = Ieu koropak geus dibagikeun liwat { -send-brand } kalawan énkripsi tungtung-ka-tungtung sarta tutumbuna otomatis kadaluwarsa.
trySendDescription = Pecakan { -send-brand } pikeun simpelna, babagi koropak aman.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Ayeuna kur sakoropak nu bisa diunjal.
       *[other] Ngan { $count } koropak nu bisa diunjal sakaligus.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Ngan saarsip nu diidinan.
       *[other] Ngan { $count } arsip nu diidinan.
    }
expiredTitle = Ieu tutumbu geus kadaluwarsa.
notSupportedDescription = { -send-brand } moal jalan di ieu panyungsi. { -send-short-brand } jalan naker dina { -firefox } vérsi pamganyarna, sarta bakal jalan di loba panyungsi vérsi kiwari.
downloadFirefox = Undeur { -firefox }
legalTitle = { -send-short-brand } Wawar Privasi
legalDateStamp = Versi 1.0, kaping 12 Maret 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }p { $hours }j { $minutes }m
addFilesButton = Pilih koropak unjalkeuneun
uploadButton = Unjal
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Ésérkeun sarta ésotkeun koropak
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = atawa klik pikeun ngirim nika { $size }
addPassword = Piningan ku kecap sandi
emailPlaceholder = Asupkeun surélék anjeun
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Asup sangkan bisa ngirim nika { $size }
signInOnlyButton = Asup
accountBenefitTitle = Jieun akun { -firefox } atawa asup
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Bagikeun koropak nika { $size }
accountBenefitDownloadCount = Bagikeun koropak ka balaréa
accountBenefitTimeLimit =
    { $count ->
        [one] Aktipkeun tutumbu jang sapoéeun
       *[other] Aktipkeun tutumbu jang { $count } poé
    }
accountBenefitSync = Kokolakeun koropak nu dibagikeun ti parangkat mana wé
accountBenefitMoz = Tengetan ngeunaan layanan { -mozilla } lianna
signOut = Kaluar
okButton = OKÉH
downloadingTitle = Ngundeur
noStreamsWarning = Ieu panyungsi kawasna mah teu bisa ngadékrip koropak badag kieu.
noStreamsOptionCopy = Tiron tutumbu jang bukaeun di panyungsi séjén
noStreamsOptionFirefox = Pecakan panyungsi karesep kami
noStreamsOptionDownload = Tuluykeun ku ieu panyungsi
downloadFirefoxPromo = { -send-short-brand } téh disanggakeun keur anjeun kalawan { -firefox } sarwa anyar.
# the next line after the colon contains a file name
shareLinkDescription = Bagikeun tutumbu ka koropak anjeun:
shareLinkButton = Bagikeun tutumbu
# $name is the name of the file
shareMessage = Undeur "{ $name }" ku { -send-brand }: simpel, babagi koropak aman
