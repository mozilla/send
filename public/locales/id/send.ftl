# Firefox Send is a brand name and should not be localized.
title = Firefox Send
importingFile = Mengimpor…
encryptingFile = Mengenkripsi...
decryptingFile = Mendekripsi...
downloadCount =
    { $num ->
       *[other] { $num } unduhan
    }
timespanHours =
    { $num ->
       *[other] { $num } jam
    }
copiedUrl = Tersalin!
unlockInputPlaceholder = Sandi
unlockButtonLabel = Buka
downloadButtonLabel = Unduh
downloadFinish = Unduhan Selesai
fileSizeProgress = ({ $partialSize } dari { $totalSize })
sendYourFilesLink = Coba Firefox Send
errorPageHeader = Terjadi kesalahan!
fileTooBig = Berkas terlalu besar untuk diunggah. Harus kurang dari { $size }.
linkExpiredAlt = Tautan kedaluwarsa
notSupportedHeader = Peramban Anda tidak mendukung.
notSupportedLink = Mengapa peramban saya tidak didukung?
notSupportedOutdatedDetail = Sayangnya Firefox versi ini tidak mendukung teknologi web yang menggerakkan Firefox Send. Anda perlu memperbarui peramban Anda.
updateFirefox = Perbarui Firefox
deletePopupCancel = Batal
deleteButtonHover = Hapus
footerLinkLegal = Legal
footerLinkPrivacy = Privasi
footerLinkCookies = Kuki
passwordTryAgain = Sandi salah. Silakan coba lagi.
javascriptRequired = Firefox Send membutuhkan JavaScript.
whyJavascript = Mengapa Firefox Send membutuhkan JavaScript?
enableJavascript = Silakan aktifkan JavaScript dan coba lagi.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }j { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Panjang sandi maksimal: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Tidak bisa menyetel sandi ini

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Berbagi berkas dengan mudah dan privat
introDescription = { -send-brand } mudahkan Anda membagikan berkas dengan enkripsi ujung-ke-ujung dan tautan yang otomatis kadaluarsa. Sehingga Anda dapat menjaga apa yang Anda bagikan secara privat dan memastikan barang Anda tidak selamanya ada di daring.
notifyUploadEncryptDone = Berkas Anda terenkripsi dan siap untuk dikirim
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Berakhir setelah { $downloadCount } atau { $timespan }
timespanMinutes =
    { $num ->
       *[other] { $num } menit
    }
timespanDays =
    { $num ->
       *[other] { $num } hari
    }
timespanWeeks =
    { $num ->
       *[other] { $num } pekan
    }
fileCount =
    { $num ->
       *[other] { $num } berkas
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
totalSize = Total ukuran: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Salin tautan untuk membagikan berkas Anda:
copyLinkButton = Salin tautan
downloadTitle = Unduh berkas
downloadDescription = Berkas ini dibagikan lewat { -send-brand } dengan enkripsi ujung-ke-ujung dan tautan yang otomatis kadaluarsa.
trySendDescription = Coba { -send-brand } untuk berbagi berkas dengan mudah dan aman.
# count will always be > 10
tooManyFiles =
    { $count ->
       *[other] Hanya { $count } berkas dapat diunggah dalam sekali waktu.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
       *[other] Hanya { $count } arsip diperbolehkan.
    }
expiredTitle = Tautan ini telah kadaluarsa.
notSupportedDescription = { -send-brand } tidak dapat digunakan dengan peramban ini. { -send-short-brand } bekerja maksimal dengan versi terbaru { -firefox }, dan akan bekerja dengan versi terkini mayoritas peramban.
downloadFirefox = Unduh { -firefox }
legalTitle = Pemberitahuan Privasi { -send-short-brand }
legalDateStamp = Versi 1.0, tertanggal 12 Maret 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }h { $hours }j { $minutes }m
addFilesButton = Pilih berkas untuk diunggah
trustWarningMessage = Pastikan Anda mempercayai penerima Anda saat berbagi data sensitif.
uploadButton = Unggah
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Seret dan jatuhkan berkas
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = atau klik untuk mengirim hingga { $size }
addPassword = Lindungi dengan kata sandi
emailPlaceholder = Masukkan surel Anda
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Masuk untuk dapat mengirim hingga { $size }
signInOnlyButton = Masuk
accountBenefitTitle = Buat { -firefox } Account atau masuk
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Bagikan berkas hingga { $size }
accountBenefitDownloadCount = Bagikan berkas kepada lebih banyak orang
accountBenefitTimeLimit =
    { $count ->
       *[other] Buat tautan aktif selama { $count } hari
    }
accountBenefitSync = Kelola berkas yang dibagikan dari perangkat apa pun
accountBenefitMoz = Pelajari tentang layanan { -mozilla } lainnya
signOut = Keluar
okButton = Oke
downloadingTitle = Mengunduh
noStreamsWarning = Peramban ini mungkin tidak dapat mendekripsi berkas sebesar ini.
noStreamsOptionCopy = Salin tautan untuk dibuka di peramban lainnya
noStreamsOptionFirefox = Coba peramban favorit kami
noStreamsOptionDownload = Lanjutkan dengan peramban ini
downloadFirefoxPromo = { -send-short-brand } dipersembahkan untuk Anda oleh { -firefox } terbaru.
# the next line after the colon contains a file name
shareLinkDescription = Bagikan tautan ke berkas Anda:
shareLinkButton = Bagikan tautan
# $name is the name of the file
shareMessage = Unduh "{ $name }" dengan { -send-brand }: berbagi berkas dengan sederhana dan aman
trailheadPromo = Ada cara untuk melindungi privasi Anda. Bergabunglah dengan Firefox.
learnMore = Pelajari lebih lanjut.
downloadFlagged = Tautan ini telah dinonaktifkan karena melanggar persyaratan layanan.
