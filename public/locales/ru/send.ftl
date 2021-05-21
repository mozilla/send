# Send is a brand name and should not be localized.
title = Send
importingFile = Импортирование...
encryptingFile = Шифрование...
decryptingFile = Расшифровка...
downloadCount =
    { $num ->
        [one] { $num } загрузки
        [few] { $num } загрузок
       *[other] { $num } загрузок
    }
timespanHours =
    { $num ->
        [one] { $num } час
        [few] { $num } часа
       *[other] { $num } часов
    }
copiedUrl = Скопировано!
unlockInputPlaceholder = Пароль
unlockButtonLabel = Разблокировать
downloadButtonLabel = Загрузить
downloadFinish = Загрузка завершена
fileSizeProgress = ({ $partialSize } из { $totalSize })
sendYourFilesLink = Попробовать Send
errorPageHeader = Что-то пошло не так!
fileTooBig = Файл слишком большой. Он должен быть меньше { $size }.
linkExpiredAlt = Истёк срок действия ссылки
notSupportedHeader = Ваш браузер не поддерживается.
notSupportedLink = Почему мой браузер не поддерживается?
notSupportedOutdatedDetail = К сожалению, эта версия Firefox не поддерживает веб-технологию, благодаря которой работает Send. Ваш нужно обновить свой браузер.
updateFirefox = Обновить Firefox
deletePopupCancel = Отмена
deleteButtonHover = Удалить
footerLinkLegal = Права
footerLinkPrivacy = Приватность
footerLinkCookies = Куки
passwordTryAgain = Неверный пароль. Попробуйте снова.
javascriptRequired = Для Send необходим JavaScript
whyJavascript = Почему Send требуется JavaScript?
enableJavascript = Пожалуйста, включите JavaScript и попробуйте снова.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours } ч. { $minutes } мин.
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes } мин.
# A short status message shown when the user enters a long password
maxPasswordLength = Максимальная длина пароля: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Этот пароль не может быть установлен

## Send version 2 strings

# Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Простой и безопасный обмен файлами
introDescription = { -send-brand } позволяет вам делиться файлами со сквозным шифрованием и ограниченным сроком действия ссылки на загрузку. Так что, вы сможете делиться файлами приватно и они не останутся в сети навсегда.
notifyUploadEncryptDone = Ваш файл зашифрован и готов к отправке
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Срок хранения истекает после { $downloadCount } или через { $timespan }
timespanMinutes =
    { $num ->
        [one] { $num } минуту
        [few] { $num } минуты
       *[other] { $num } минут
    }
timespanDays =
    { $num ->
        [one] { $num } день
        [few] { $num } дня
       *[other] { $num } дней
    }
timespanWeeks =
    { $num ->
        [one] { $num } неделю
        [few] { $num } недели
       *[other] { $num } недель
    }
fileCount =
    { $num ->
        [one] { $num } файл
        [few] { $num } файла
       *[other] { $num } файлов
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
fileSize = { $num }{ $units }
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
totalSize = Общий размер: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Скопируйте ссылку, чтобы поделиться своим файлом:
copyLinkButton = Копировать ссылку
downloadTitle = Загрузить файлы
downloadDescription = Этот файл был отправлен через { -send-brand } со сквозным шифрованием и ограниченным сроком действия ссылки на загрузку.
trySendDescription = Испытайте простой и безопасный обмен файлами с помощью { -send-brand }.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Только { $count } файл может загружаться одновременно.
        [few] Только { $count } файла могут загружаться одновременно.
       *[other] Только { $count } файлов могут загружаться одновременно.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Только { $count } архив разрешён.
        [few] Только { $count } архива разрешено.
       *[other] Только { $count } архивов разрешено.
    }
expiredTitle = Срок действия этой ссылки истёк.
notSupportedDescription = { -send-brand } не будет работать в этом браузере. { -send-short-brand } лучше всего работает с последней версией { -firefox }, и будет работать с последними версиями популярных браузеров.
downloadFirefox = Загрузить { -firefox }
legalTitle = Уведомление о конфиденциальности { -send-short-brand }
legalDateStamp = Версия 1.0, от 12 марта 2019 года
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days } дн. { $hours } ч. { $minutes } мин.
addFilesButton = Выберите файлы для выгрузки
trustWarningMessage = Убедитесь, что вы доверяете своему получателю при обмене конфиденциальными данными.
uploadButton = Выгрузить
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Перетащите файлы сюда
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = или щёлкните здесь, чтобы отправить их (до { $size })
addPassword = Защитить паролем
emailPlaceholder = Введите ваш адрес электронной почты
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Войдите, чтобы отправлять файлы до { $size }
signInOnlyButton = Войти
accountBenefitTitle = Создайте Аккаунт { -firefox } или войдите
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Делитесь файлами до { $size }
accountBenefitDownloadCount = Делитесь файлами с несколькими людьми
accountBenefitTimeLimit =
    { $count ->
        [one] Оставить ссылку активной в течение { $count } дня
        [few] Оставить ссылку активной в течение { $count } дней
       *[other] Оставить ссылку активной в течение { $count } дней
    }
accountBenefitSync = Управляйте своими файлами с любого устройства
accountBenefitMoz = Узнайте о других службах { -mozilla }
signOut = Выйти
okButton = OK
downloadingTitle = Загрузка
noStreamsWarning = Этот браузер может не иметь возможности расшифровать такой большой файл.
noStreamsOptionCopy = Скопируйте ссылку, чтобы открыть в другом браузере
noStreamsOptionFirefox = Попробуйте наш любимый браузер
noStreamsOptionDownload = Продолжить в этом браузере
downloadFirefoxPromo = { -send-short-brand } доступен вам в полностью новом { -firefox }.
# the next line after the colon contains a file name
shareLinkDescription = Поделитесь ссылкой на ваш файл:
shareLinkButton = Поделиться ссылкой
# $name is the name of the file
shareMessage = Загрузите «{ $name }» с { -send-brand }: простой и безопасный обмен файлами
trailheadPromo = Существует способ защитить вашу приватность. Присоединяйтесь к Firefox.
learnMore = Подробнее.
downloadFlagged = Эта ссылка была отключена за нарушение условий использования.
downloadConfirmTitle = Ещё один совет
downloadConfirmDescription = Убедитесь, что вы доверяете человеку, который отправил вам этот файл, потому что мы не знаем, не повредит ли файл вашему устройству.
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
downloadTrustCheckbox =
    { $count ->
        [one] Я доверяю человеку, который отправил этот файл
        [few] Я доверяю человеку, который отправил эти файлы
       *[many] Я доверяю человеку, который отправил эти файлы
    }
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
reportFile =
    { $count ->
        [one] Сообщить об этом файле как о подозрительном
        [few] Сообщить об этих файлах как о подозрительных
       *[many] Сообщить об этих файлах как о подозрительных
    }
reportDescription = Помогите нам понять, что происходит. Что по вашему мнению не так с этими файлами?
reportUnknownDescription = Перейдите к адресу ссылки, о которой хотите сообщить, и щёлкните «{ reportFile }».
reportButton = Сообщить
reportReasonMalware = Эти файлы содержат вредоносные программы или являются частью фишинговой атаки.
reportReasonPii = Эти файлы содержат мои личные данные.
reportReasonAbuse = Эти файлы содержат незаконный или оскорбительный контент.
reportReasonCopyright = Чтобы сообщить о нарушении авторских прав или товарных знаков, используйте процедуру, описанную на <a>этой странице</a>.
reportedTitle = О файлах сообщено
reportedDescription = Спасибо. Мы получили вашу жалобу на эти файлы.
