# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = משוב
importingFile = מתבצע ייבוא...
encryptingFile = מתבצעת הצפנה...
decryptingFile = מתבצע פענוח...
downloadCount =
    { $num ->
        [one] הורדה אחת
       *[other] { $number } הורדות
    }
timespanHours =
    { $num ->
        [one] שעה אחת
        [two] שעתיים
       *[other] { $number } שעות
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
addFilesButton = בחירת קבצים להעלאה
uploadButton = העלאה
addPassword = הגנה באמצעות ססמה
signInOnlyButton = כניסה
accountBenefitSync = ניהול קבצים משותפים מכל מכשיר
accountBenefitMoz = מידע נוסף על שירותי { -mozilla } אחרים
signOut = יציאה
okButton = אישור
downloadingTitle = בהורדה
noStreamsWarning = ייתכן שדפדפן זה לא יוכל לפענח קובץ בגודל כזה.
noStreamsOptionCopy = העתקת הקישור לפתיחה בדפדפן אחר
noStreamsOptionDownload = המשך בדפדפן זה
# the next line after the colon contains a file name
shareLinkDescription = שיתוף הקישור לקובץ שלך:
shareLinkButton = שיתוף קישור
# $name is the name of the file
shareMessage = הורדת ״{ $name }״ עם { -send-brand }: שיתוף קבצים פשוט ובטוח
learnMore = מידע נוסף.
