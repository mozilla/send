# Firefox Send is a brand name and should not be localized.
title = Firefox Send
importingFile = מתבצע ייבוא…
encryptingFile = מתבצעת הצפנה...
decryptingFile = מתבצע פענוח...
downloadCount =
    { $num ->
        [one] הורדה אחת
       *[other] { $num } הורדות
    }
timespanHours =
    { $num ->
        [one] שעה אחת
        [two] שעתיים
       *[other] { $num } שעות
    }
copiedUrl = הועתק!
unlockInputPlaceholder = ססמה
unlockButtonLabel = שחרור נעילה
downloadButtonLabel = הורדה
downloadFinish = ההורדה הושלמה
fileSizeProgress = ({ $partialSize } מתוך { $totalSize })
sendYourFilesLink = נסו את Firefox Send
errorPageHeader = משהו השתבש!
fileTooBig = הקובץ הזה גדול מידי להעלאה. עליו להיות קטן מ־{ $size }.
linkExpiredAlt = הקישור פג
notSupportedHeader = הדפדפן שלך לא נתמך.
notSupportedLink = למה אין תמיכה בדפדפן שלי?
notSupportedOutdatedDetail = לצערנו גרסת Firefox זו לא תומכת בטכנולוגית הרשת שמפעילה את Firefox Send. יש לעדכן את הגרסה של הדפדפן שלך.
updateFirefox = עדכון Firefox
deletePopupCancel = ביטול
deleteButtonHover = מחיקה
footerLinkLegal = מידע משפטי
footerLinkPrivacy = פרטיות
footerLinkCookies = קובצי עוגיות
passwordTryAgain = סיסמה שגויה. נא לנסות שוב.
javascriptRequired = ל־Firefox Send דרוש JavaScript
whyJavascript = למה ל־Firefox Send דרוש JavaScript?
enableJavascript = נא להפעיל JavaScript ולנסות שוב.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours } שע׳ { $minutes } דק׳
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes } דק׳
# A short status message shown when the user enters a long password
maxPasswordLength = אורך הססמה המרבי: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = לא ניתן להגדיר את הססמה הזאת

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = שיתוף קבצים פרטי ופשוט
introDescription = { -send-brand } מאפשר לך לשתף קבצים עם הצפנה מקצה לקצה וקישור עם תפוגה אוטומטית. בצורה זו תוכלו לשתף קבצים באופן פרטי ולהבטיח שהדברים שלכם לא נשארים ברשת לנצח.
notifyUploadEncryptDone = הקובץ שלך מוצפן ומוכן לשליחה
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = יפוג לאחר { $downloadCount } או { $timespan }
timespanMinutes =
    { $num ->
        [one] דקה אחת
       *[other] { $num } דקות
    }
timespanDays =
    { $num ->
        [one] יום אחד
        [two] יומיים
       *[other] { $num } ימים
    }
timespanWeeks =
    { $num ->
        [one] שבוע אחד
        [two] שבועיים
       *[other] { $num } שבועות
    }
fileCount =
    { $num ->
        [one] קובץ אחד
       *[other] { $num } קבצים
    }
# byte abbreviation
bytes = בתים
# kibibyte abbreviation
kb = ק״ב
# mebibyte abbreviation
mb = מ״ב
# gibibyte abbreviation
gb = ג״ב
# localized number and byte abbreviation. example "2.5MB"
fileSize = { $num } { $units }
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
totalSize = גודל כולל: { $size }
# the next line after the colon contains a file name
copyLinkDescription = יש להעתיק את הקישור כדי לשתף את הקובץ שלך:
copyLinkButton = העתקת קישור
downloadTitle = הורדת קבצים
downloadDescription = קובץ זה שותף באמצעות { -send-brand } עם הצפנה מקצה לקצה וקישור שפג באופן אוטומטי.
trySendDescription = כדאי לנסות את { -send-brand } לשיתוף קבצים פשוט ומאובטח.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] ניתן להעלות רק קובץ אחד בכל פעם.
       *[other] ניתן להעלות רק { $count } קבצים בכל פעם.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] רק ארכיון אחד מורשה.
       *[other] רק { $count } ארכיונים מורשים.
    }
expiredTitle = פג תוקפו של קישור זה.
notSupportedDescription = ‏{ -send-brand } לא יפעל עם דפדפן זה. { -send-short-brand } פועל בצורה הטובה ביותר עם הגרסה העדכנית ביותר של { -firefox }, ויעבוד עם הגרסה הנוכחית של רוב הדפדפנים.
downloadFirefox = הורדת { -firefox }
legalTitle = הצהרת פרטיות של { -send-short-brand }
legalDateStamp = גרסה 1.0, בתאריך 12 במרץ 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days } ימים { $hours } שעות { $minutes } דקות
addFilesButton = בחירת קבצים להעלאה
uploadButton = העלאה
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = גרירה והשלכת קבצים
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = או ללחוץ כדי לשלוח קבצים עד לגודל של { $size }
addPassword = הגנה באמצעות ססמה
emailPlaceholder = נא להכניס כתובת דוא״ל
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = נא להירשם כדי לשלוח קבצים עד גודל של { $size }
signInOnlyButton = כניסה
accountBenefitTitle = נא ליצור חשבון { -firefox } או להיכנס לחשבון
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = שיתוף קבצים עד גודל של { $size }
accountBenefitDownloadCount = שיתוף קבצים עם יותר אנשים
accountBenefitTimeLimit =
    { $count ->
        [one] שמירה על קישורים פעילים עד ליום אחד
       *[other] שמירה על קישורים פעילים עד ל־{ $count } ימים
    }
accountBenefitSync = ניהול קבצים משותפים מכל מכשיר
accountBenefitMoz = מידע נוסף על שירותי { -mozilla } אחרים
signOut = יציאה
okButton = אישור
downloadingTitle = בהורדה
noStreamsWarning = ייתכן שדפדפן זה לא יוכל לפענח קובץ בגודל כזה.
noStreamsOptionCopy = העתקת הקישור לפתיחה בדפדפן אחר
noStreamsOptionFirefox = נסו את הדפדפן המועדף עלינו
noStreamsOptionDownload = המשך בדפדפן זה
downloadFirefoxPromo = { -send-short-brand } מובא אליך בחסות { -firefox }
# the next line after the colon contains a file name
shareLinkDescription = שיתוף הקישור לקובץ שלך:
shareLinkButton = שיתוף קישור
# $name is the name of the file
shareMessage = הורדת ״{ $name }״ עם { -send-brand }: שיתוף קבצים פשוט ובטוח
trailheadPromo = ישנן דרכים נוספות להגן על הפרטיות שלכם. הצטרפו אל Firefox.
learnMore = מידע נוסף.
downloadFlagged = קישור זה הושבת מכיוון שהפר את תנאי השירות.
reportButton = דיווח
reportReasonCopyright = כדי לדווח על הפרה של זכויות יוצרים או סימני מסחר, יש להשתמש בתהליך המתואר ב<a>דף זה</a>.
reportedDescription = תודה. קיבלנו את הדיווח שלך על קבצים אלה.
