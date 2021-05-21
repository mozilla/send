# Send is a brand name and should not be localized.
title = Send
importingFile = Імпартаванне...
encryptingFile = Зашыфроўка...
decryptingFile = Расшыфроўка...
downloadCount =
    { $num ->
        [one] { $num } сцягванне
        [few] { $num } сцягванні
       *[many] { $num } сцягванняў
    }
timespanHours =
    { $num ->
        [one] { $num } гадзіна
        [few] { $num } гадзіны
       *[many] { $num } гадзін
    }
copiedUrl = Скапіявана!
unlockInputPlaceholder = Пароль
unlockButtonLabel = Разблакаваць
downloadButtonLabel = Сцягнуць
downloadFinish = Сцягванне скончана
fileSizeProgress = ({ $partialSize } з { $totalSize })
sendYourFilesLink = Паспрабуйце Send
errorPageHeader = Нешта пайшло не так!
fileTooBig = Гэты файл надта вялікі. Ён мусіць быць меншым за { $size }
linkExpiredAlt = Тэрмін дзеяння спасылкі сышоў
notSupportedHeader = Ваш браўзер не падтрымліваецца.
notSupportedLink = Чаму мой браўзер не падтрымліваецца?
notSupportedOutdatedDetail = На жаль, гэтая версія Firefox не падтрымлівае вэб-тэхналогію, што забяспечвае працу Send. Вам трэба абнавіць свой браўзер.
updateFirefox = Абнавіць Firefox
deletePopupCancel = Скасаваць
deleteButtonHover = Выдаліць
footerLinkLegal = Прававыя звесткі
footerLinkPrivacy = Прыватнасць
footerLinkCookies = Кукі
passwordTryAgain = Некарэктны пароль. Паспрабуйце зноў.
javascriptRequired = Для Send неабходны JavaScript
whyJavascript = Чаму для Send неабходны JavaScript?
enableJavascript = Калі ласка, уключыце JavaScript і паспрабуйце зноў.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours } г. { $minutes } хв.
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes } хв.
# A short status message shown when the user enters a long password
maxPasswordLength = Максімальная даўжыня пароля: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Гэты пароль немагчыма паставіць

## Send version 2 strings

# Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Просты і прыватны абмен файламі
introDescription = { -send-brand } дазваляе вам абменьвацца файламі са скразным шыфраваннем і спасылкамі з абмежаваным тэрмінам дзеяння. Такім чынам, вы можаце дзяліцца файламі прыватна і быць упэўненым, што яны не застануцца ў сеціве назаўжды.
notifyUploadEncryptDone = Ваш файл зашыфраваны і гатовы да адпраўкі
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Тэрмін дзеяння сыдзе праз { $downloadCount } або { $timespan }
timespanMinutes =
    { $num ->
        [one] { $num } хвіліна
        [few] { $num } хвіліны
       *[many] { $num } хвілін
    }
timespanDays =
    { $num ->
        [one] { $num } дзень
        [few] { $num } дні
       *[many] { $num } дзён
    }
timespanWeeks =
    { $num ->
        [one] { $num } тыдзень
        [few] { $num } тыдні
       *[many] { $num } тыдняў
    }
fileCount =
    { $num ->
        [one] { $num } файл
        [few] { $num } файлы
       *[many] { $num } файлаў
    }
# byte abbreviation
bytes = Б
# kibibyte abbreviation
kb = КБ
# mebibyte abbreviation
mb = МБ
# gibibyte abbreviation
gb = ГБ
# localized number and byte abbreviation. example "2.5MB"
fileSize = { $num } { $units }
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
totalSize = Агульны памер: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Скапіруйце спасылку, каб падзяліцца сваім файлам:
copyLinkButton = Скапіраваць спасылку
downloadTitle = Сцягнуць файлы
downloadDescription = Гэтым файлам падзяліліся праз { -send-brand } са скразным шыфраваннем і спасылкай з абмежаваным тэрмінам дзеяння.
trySendDescription = Паспрабуйце { -send-brand } для простага і бяспечнага абмену файламі.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Толькі { $count } файл можна загрузіць за раз.
        [few] Толькі { $count } файлы можна загрузіць за раз.
       *[many] Толькі { $count } файлаў можна загрузіць за раз.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Толькі { $count } архіў дазволены.
        [few] Толькі { $count } архівы дазволены.
       *[many] Толькі { $count } архіваў дазволена.
    }
expiredTitle = Тэрмін дзеяння гэтай спасылкі сышоў.
notSupportedDescription = { -send-brand } не будзе працаваць у гэтым браўзеры. Лепей за ўсё { -send-short-brand } працуе з апошняй версіяй { -firefox } і будзе працаваць з бягучай версіяй большасці браўзераў.
downloadFirefox = Сцягнуць { -firefox }
legalTitle = Палітыка прыватнасці { -send-short-brand }
legalDateStamp = Версія 1.0 ад 12 сакавіка 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days } д. { $hours } г. { $minutes } хв.
addFilesButton = Выберыце файлы для загрузкі
trustWarningMessage = Пераканайцеся, што давяраеце атрымальніку, калі дзеліцеся канфідэнцыяльнымі звесткамі.
uploadButton = Загрузіць
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Перацягніце файлы сюды
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = або клікніце, каб адправіць да { $size }:
addPassword = Абараніць паролем
emailPlaceholder = Увядзіце сваю электронную пошту
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Увайдзіце, каб адпраўляць да { $size }
signInOnlyButton = Увайсці
accountBenefitTitle = Стварыце ўліковы запіс { -firefox } або ўвайдзіце
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Дзяліцеся файламі да { $size }
accountBenefitDownloadCount = Дзяліцеся файламі з большай колькасцю людзей
accountBenefitTimeLimit =
    { $count ->
        [one] Трымайце спасылкі актыўнымі да { $count } дня
        [few] Трымайце спасылкі актыўнымі да { $count } дзён
       *[many] Трымайце спасылкі актыўнымі да { $count } дзён
    }
accountBenefitSync = Кіруйце адпраўленымі файламі з любой прылады
accountBenefitMoz = Даведайцеся пра іншыя сэрвісы { -mozilla }
signOut = Выйсці
okButton = ОК
downloadingTitle = Сцягваецца
noStreamsWarning = Гэты браўзер не мае магчымасці расшыфраваць такі вялікі файл.
noStreamsOptionCopy = Скапіруйце спасылку, каб адкрыць у іншым браўзеры
noStreamsOptionFirefox = Паспрабуйце наш любімы браўзер
noStreamsOptionDownload = Працягнуць з гэтым браўзерам
downloadFirefoxPromo = { -send-short-brand } прыйшоў да вас з цалкам новага { -firefox }.
# the next line after the colon contains a file name
shareLinkDescription = Падзяліцеся спасылкай на свой файл:
shareLinkButton = Падзяліцца спасылкай
# $name is the name of the file
shareMessage = Сцягніце «{ $name }» з { -send-brand }: простага і бяспечнага файлаабменніка
trailheadPromo = Ёсць спосаб абараніць вашу прыватнасць. Далучайцеся да Firefox.
learnMore = Падрабязней.
downloadFlagged = Гэта спасылка адключана за парушэнне ўмоў прадастаўлення паслуг.
downloadConfirmTitle = Яшчэ адна рэч
downloadConfirmDescription = Пераканайцеся, што давяраеце адпраўніку гэтага файла, бо мы не можам пераканацца, што ён не нашкодзіць Вашай прыладзе.
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
downloadTrustCheckbox =
    { $count ->
        [one] Я давяраю адпраўніку гэтага файла
        [few] Я давяраю адпраўніку гэтых файлаў
       *[many] Я давяраю адпраўніку гэтых файлаў
    }
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
reportFile =
    { $count ->
        [one] Паведаміць, што гэты файл падазроныя
        [few] Паведаміць, што гэтыя файлы падазроныя
       *[many] Паведаміць, што гэтыя файлы падазроныя
    }
reportDescription = Дапамажыце нам зразумець, што адбываецца. Як вы лічыце, што не так з гэтымі файламі?
reportUnknownDescription = Калі ласка, перайдзіце да адрасу спасылкі, пра якую хочаце паведаміць, і націсніце “{ reportFile }”.
reportButton = Паведаміць
reportReasonMalware = Гэтыя файлы ўтрымліваюць шкоднасныя праграмы альбо з'яўляюцца часткай фішынг-атакі.
reportReasonPii = Гэтыя файлы ўтрымліваюць асабістую інфармацыю пра мяне.
reportReasonAbuse = Гэтыя файлы ўтрымліваюць незаконнае альбо абразлівае змесціва.
reportReasonCopyright = Каб паведаміць аб парушэнні аўтарскіх правоў або гандлёвых марак, скарыстайцеся алгарытмам, апісаным на <a>гэтай старонцы</a>.
reportedTitle = Пра файлы паведамлена
reportedDescription = Дзякуй. Мы атрымалі Вашу заяву наконт гэтых файлаў.
