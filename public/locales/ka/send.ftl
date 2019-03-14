# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = გამოხმაურება
importingFile = გადმოტანა...
encryptingFile = დაშიფვრა...
decryptingFile = გაშიფვრა...
downloadCount =
    { $num ->
        [one] 1 ჩამოტვირთვა
       *[other] { $num } ჩამოტვირთვა
    }
timespanHours =
    { $num ->
        [one] 1 საათი
       *[other] { $num } საათი
    }
copiedUrl = ასლი აღებულია!
unlockInputPlaceholder = პაროლი
unlockButtonLabel = გახსნა
downloadButtonLabel = ჩამოტვირთვა
downloadFinish = ჩამოტვირთვა დასრულდა
fileSizeProgress = ({ $partialSize } { $totalSize }-იდან)
sendYourFilesLink = გამოცადეთ Firefox Send
errorPageHeader = რაღაც ხარვეზია!
fileTooBig = ფაილი ზედმეტად დიდია. უნდა იყოს { $size } ზომაზე ნაკლები.
linkExpiredAlt = ბმული ვადაგასულია
notSupportedHeader = თქვენი ბრაუზერი არაა მხარდაჭერილი.
notSupportedLink = რატომ არაა ჩემი ბრაუზერი მხარდაჭერილი?
notSupportedOutdatedDetail = სამწუხაროდ, Firefox-ის ამ ვერსიას არ გააჩნია ის ტექნოლოგია, რომელიც აუცილებელია Firefox Send-ის მუშაობისთვის. გესაჭიროებათ, ბრაუზერის განახლება.
updateFirefox = Firefox-ის განახლება
deletePopupCancel = გაუქმება
deleteButtonHover = წაშლა
footerLinkLegal = სამართლებრივი საკითხები
footerLinkPrivacy = პირადულობა
footerLinkCookies = ფუნთუშები
passwordTryAgain = პაროლი არასწორია. სცადეთ ხელახლა.
javascriptRequired = Firefox Send საჭიროებს JavaScript-ს
whyJavascript = რატომ საჭიროებს Firefox Send JavaScript-ს?
enableJavascript = გთხოვთ ჩართოთ JavaScript და სცადოთ ხელახლა.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }სთ { $minutes }წთ
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }წთ
# A short status message shown when the user enters a long password
maxPasswordLength = პაროლის დაშვებული ზომა: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = ამ პაროლის დაყენება ვერ ხერხდება

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = ფაილის გაზიარება მარტივად, დაცულად
introDescription = { -send-brand } საშუალებას გაძლევთ გააზიაროთ ფაილები გამჭოლი დაშიფვრითა და ბმულით, რომელიც გარკვეული დროის შემდეგ თავისთავად გაუქმდება. ასე რომ, რასაც გააზიარებთ იქნება საიდუმლო და არც ინტერნეტში არ დარჩება სამუდამოდ.
notifyUploadEncryptDone = თქვენი ფაილი დაშიფრულია და მზადაა გასაგზავნად
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = ვადის გასვლამდე დარჩენილია { $downloadCount } ან { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 წუთი
       *[other] { $num } წუთი
    }
timespanDays =
    { $num ->
        [one] 1 დღე
       *[other] { $num } დღე
    }
timespanWeeks =
    { $num ->
        [one] 1 კვირა
       *[other] { $num } კვირა
    }
fileCount =
    { $num ->
        [one] 1 ფაილი
       *[other] { $num } ფაილი
    }
# byte abbreviation
bytes = ბ
# kibibyte abbreviation
kb = კბ
# mebibyte abbreviation
mb = მბ
# gibibyte abbreviation
gb = გბ
# localized number and byte abbreviation. example "2.5MB"
fileSize = { $num } { $units }
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
totalSize = სულ ზომა: { $size }
# the next line after the colon contains a file name
copyLinkDescription = ბმულის ასლი ფაილის გასაზიარებლად:
copyLinkButton = ბმულის ასლი
downloadTitle = ფაილების ჩამოტვირთვა
downloadDescription = ფაილი გაზიარებულია { -send-brand }-ის საშუალებით, გამჭოლი დაშიფვრითა და ვადიანი ბმულით.
trySendDescription = გამოსცადეთ { -send-brand }, ფაილების გაზიარება მარტივად, დაცულად.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] მხოლოდ 1 ფაილი შეიძლება აიტვირთოს ერთ ჯერზე.
       *[other] მხოლოდ { $count } ფაილი შეიძლება აიტვირთოს ერთ ჯერზე.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] მხოლოდ 1 არქივია დაშვებული.
       *[other] მხოლოდ { $count } არქივია დაშვებული.
    }
expiredTitle = ბმული ვადაგასულია.
notSupportedDescription = { -send-brand } არ იმუშავებს ამ ბრაუზერთან. { -send-short-brand } საუკეთესოდ მუშაობს ახალ { -firefox }-ზე და აგრეთვე უმეტესი ბრაუზერების უახლეს ვერსიებზე.
downloadFirefox = ჩამოტვირთეთ { -firefox }
legalTitle = { -send-short-brand } პირადულობის განაცხადი
legalDateStamp = ვერსია 1.0, დათარიღებული 12 მარტით, 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days } დღე { $hours } სთ { $minutes } წთ
addFilesButton = ფაილების შერჩევა ასატვირთად
uploadButton = ატვირთვა
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = გადმოიტანეთ და მოათავსეთ ფაილები
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = ან დაწკაპეთ გასაგზავნად { $size }-მდე
addPassword = პაროლით დაცვა
emailPlaceholder = შეიყვანეთ ელფოსტა
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = შედით ანგარიშზე, რომ გაგზავნოთ { $size }-მდე
signInButton = ანგარიშზე შესვლა/შექმნა
accountBenefitTitle = შექმენით { -firefox }-ანგარიში ან შედით
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = გააზიარეთ ფაილები { $size }-მდე
accountBenefitDownloadCount = გაუზიარეთ ფაილები მეტ ხალხს
accountBenefitTimeLimit =
    { $count ->
        [one] დატოვეთ ფაილები 1 დღემდე
       *[other] დატოვეთ ფაილები { $count } დღემდე
    }
accountBenefitSync = მართეთ გაზიარებული ფაილები ნებისმიერი მოწყობილობიდან
accountBenefitMoz = გაეცანით { -mozilla }-ს სხვა მომსახურებებს
signOut = გამოსვლა
okButton = კარგი
downloadingTitle = მიმდინარეობს ჩამოტვირთვა
noStreamsWarning = ამ ბრაუზერმა, შესაძლოა ვერ მოახერხოს ასეთი დიდი ფაილის გაშიფვრა.
noStreamsOptionCopy = ბმულის ასლის აღება სხვა ბრაუზერში გასახსნელად
noStreamsOptionFirefox = სცადეთ ჩვენი რჩეული ბრაუზერი
noStreamsOptionDownload = განაგრძეთ ამ ბრაუზერით
