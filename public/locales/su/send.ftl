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
enableJavascript = Mangga hurungkeun JavaScript sarta pecakan deui.
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
