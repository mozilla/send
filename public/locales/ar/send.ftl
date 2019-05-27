# Firefox Send is a brand name and should not be localized.
title = فَيَرفُكس سِنْد
siteFeedback = الانطباعات
importingFile = يستورد…
encryptingFile = يعمّي…
decryptingFile = يفك التعمية…
downloadCount =
    { $num ->
        [zero] لا تنزيلات
        [one] تنزيل واحد
        [two] تنزيلين
        [few] { $num } تنزيلات
        [many] { $num } تنزيلًا
       *[other] { $num } تنزيل
    }
timespanHours =
    { $num ->
        [zero] أقل من ساعة
        [one] ساعة
        [two] ساعتين
        [few] { $num } ساعات
        [many] { $num } ساعة
       *[other] { $num } ساعة
    }
copiedUrl = نُسخ!
unlockInputPlaceholder = كلمة السر
unlockButtonLabel = افتح القفل
downloadButtonLabel = نزّل
downloadFinish = اكتمل التنزيل
fileSizeProgress = ({ $partialSize } من أصل { $totalSize })
sendYourFilesLink = جرِّب «فَيَرفُكس سِنْد»
errorPageHeader = حدث خطب ما.
fileTooBig = حجم الملف كبير للغاية لرفعه. يجب أن يكون أصغر من { $size }.
linkExpiredAlt = انتهت صلاحية الرابط
notSupportedHeader = متصفحك غير مدعوم.
notSupportedLink = لماذا متصفحي غير مدعوم؟
notSupportedOutdatedDetail = للأسف فإن إصدارة فَيَرفُكس هذه لا تدعم تقنية الوِب التي يعتمد عليها «فَيَرفُكس سِنْد». عليك تحديث متصفحك.
updateFirefox = حدّث فَيَرفُكس
deletePopupCancel = ألغِ
deleteButtonHover = احذف
footerLinkLegal = القانونية
footerLinkPrivacy = الخصوصية
footerLinkCookies = الكعكات
passwordTryAgain = كلمة السر خاطئة. أعِد المحاولة.
javascriptRequired = يتطلب فَيَرفُكس سِنْد جافاسكربت
whyJavascript = لماذا يتطلب فَيَرفُكس سِنْد جافاسكربت؟
enableJavascript = رجاء فعّل جافاسكربت ثم أعد المحاولة.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }س { $minutes }د
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }د
# A short status message shown when the user enters a long password
maxPasswordLength = أقصر طول لكلمة السر: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = يجب ألا تُضبط كلمة السر هذه

## Send version 2 strings

introTitle = شارِك ملفاتك بلا عناء وبخصوصية تامة
introDescription = يتيح لك { -send-brand } مشاركة الملفات عبر تعميتها من الطرفين وإتاحتها في رابط ينقضي أجله تلقائيا. هكذا يمكنك إبقاء ما شاركته خاصًا فتضمن بأن ملفاتك لن تبقى في الوِب أبد الدهر.
notifyUploadEncryptDone = اكتملت تعمية الملف وأصبح جاهزًا لإرساله
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = ينقضي بعد { $downloadCount } أو { $timespan }
timespanMinutes =
    { $num ->
        [zero] أقل من دقيقة
        [one] دقيقة واحدة
        [two] دقيقتين اثنتين
        [few] { $num } دقائق
        [many] { $num } دقيقة
       *[other] { $num } دقيقة
    }
timespanDays =
    { $num ->
        [zero] أقل من يوم
        [one] يوم واحد
        [two] يومين اثنين
        [few] { $num } أيام
        [many] { $num } يومًا
       *[other] { $num } يوم
    }
timespanWeeks =
    { $num ->
        [zero] أقل من أسبوع
        [one] أسبوع واحد
        [two] أسبوعين اثنين
        [few] { $num } أسابيع
        [many] { $num } أسبوعًا
       *[other] { $num } أسبوع
    }
fileCount =
    { $num ->
        [zero] { $num } ملف
        [one] ملف واحد
        [two] ملفان اثنان
        [few] { $num } ملفات
        [many] { $num } ملفًا
       *[other] { $num } ملف
    }
# byte abbreviation
bytes = بايت
# kibibyte abbreviation
kb = ك.بايت
# mebibyte abbreviation
mb = م.بايت
# gibibyte abbreviation
gb = ج.بايت
# localized number and byte abbreviation. example "2.5MB"
fileSize = { $num } { $units }
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
totalSize = إجمالي الحجم: { $size }
# the next line after the colon contains a file name
copyLinkDescription = انسخ هذا الرابط لتُشارك الملف:
copyLinkButton = انسخ الرابط
downloadTitle = نزّل الملفات
downloadDescription = شارك أحد هذا الملف معك عبر { -send-brand } وعمّاه بتعمية من الطرفين وبرابط ينقضي أجله تلقائيا.
trySendDescription = جرِّب { -send-brand } وشارِك ملفاتك بلا عناء وبخصوصية تامة.
# count will always be > 10
tooManyFiles =
    { $count ->
        [zero] لا يمكنك تنزيل أي ملف في آن واحد.
        [one] لا يمكنك تنزيل ما يزيد على ملف واحد في آن واحد.
        [two] لا يمكنك تنزيل ما يزيد على ملفين اثنين في آن واحد.
        [few] لا يمكنك تنزيل ما يزيد على { $count } ملفات في آن واحد.
        [many] لا يمكنك تنزيل ما يزيد على { $count } ملفًا في آن واحد.
       *[other] لا يمكنك تنزيل ما يزيد على { $count } ملف في آن واحد.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [zero] الأرشيفات ممنوعة.
        [one] لا يُسمح إلا بأرشيف واحد.
        [two] لا يُسمح إلا بأرشيفين اثنين.
        [few] لا يُسمح إلا ب‍ { $count } أرشيفات.
        [many] لا يُسمح إلا ب‍ { $count } أرشيفًا.
       *[other] لا يُسمح إلا ب‍ { $count } أرشيف.
    }
expiredTitle = انقضى وقت الرابط.
notSupportedDescription = لن يعمل { -send-brand } في هذا المتصفح. أفضل المتصفحات التي يعمل معها { -send-short-brand } هو { -firefox } بآخر إصدارة، كما وأحدث إصدارة من أغلب المتصفحات الموجودة.
downloadFirefox = نزِّل { -firefox }
legalTitle = تنويه خصوصية { -send-short-brand }
legalDateStamp = الإصدارة ١٫٠ بتاريخ ١٢ مارس ٢٠١٩
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }يوم { $hours }سا { $minutes }دق
addFilesButton = حدّد الملفات التي تريد رفعها
uploadButton = ارفع
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = اسحب الملفات وأفلِتها
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = أو انقر لإرسال ملفات يصل حجمها { $size }
addPassword = احمِه بكلمة سر
emailPlaceholder = أدخل بريدك الإلكتروني
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = لِج وأرسِل ملفات يصل حجمها { $size }
signInOnlyButton = لِج
accountBenefitTitle = أنشِئ حساب { -firefox } أو لِج إلى حسابك
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = شارِك ملفات يصل حجمها { $size }
accountBenefitDownloadCount = شارِك الملفات مع أناس أكثر وأكثر
accountBenefitTimeLimit =
    { $count ->
        [zero] لا تُبقِ أي روابط نشطة
        [one] أبقِ الروابط نشطة لمدة تصل إلى يوم واحد
        [two] أبقِ الروابط نشطة لمدة تصل إلى يومين اثنين
        [few] أبقِ الروابط نشطة لمدة تصل إلى { $count } أيام
        [many] أبقِ الروابط نشطة لمدة تصل إلى { $count } يومًا
       *[other] أبقِ الروابط نشطة لمدة تصل إلى { $count } يوم
    }
accountBenefitSync = أدِر ملفاتك التي شاركتها من أيّ جهاز تريد
accountBenefitMoz = اطّلع على المزيد حول خدمات { -mozilla }
signOut = اخرج
okButton = حسنًا
downloadingTitle = يجري التنزيل
noStreamsWarning = هناك احتمال بألا يقدر هذا المتصفح على فكّ تعمية الملفات الكبيرة كهذا.
noStreamsOptionCopy = انسخ الرابط لتفتحه في متصفح آخر
noStreamsOptionFirefox = جرّب متصفّحنا المفضل
noStreamsOptionDownload = واصِل بهذا المتصفح
# the next line after the colon contains a file name
shareLinkDescription = شارِك الرابط الذي يصل إلى الملف:
shareLinkButton = شارِك الرابط
# $name is the name of the file
shareMessage = نزِّل ”{ $name }“ عبر { -send-brand }: خدمة لمشاركة الملفات بلا عناء وبخصوصية تامة
