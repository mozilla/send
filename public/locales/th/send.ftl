# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = ข้อคิดเห็น
importingFile = กำลังนำเข้า…
encryptingFile = กำลังเข้ารหัส…
decryptingFile = กำลังถอดรหัส…
downloadCount =
    { $num ->
       *[other] การดาวน์โหลด { $num } ครั้ง
    }
timespanHours =
    { $num ->
       *[other] { $num } ชั่วโมง
    }
copiedUrl = คัดลอกแล้ว!
unlockInputPlaceholder = รหัสผ่าน
unlockButtonLabel = ปลดล็อก
downloadButtonLabel = ดาวน์โหลด
downloadFinish = การดาวน์โหลดเสร็จสมบูรณ์
fileSizeProgress = ({ $partialSize } จาก { $totalSize })
sendYourFilesLink = ลองใช้ Firefox Send
errorPageHeader = มีบางอย่างผิดพลาด!
fileTooBig = ไฟล์นั้นใหญ่เกินกว่าจะอัปโหลดได้ ไฟล์ที่จะอัปโหลดควรมีขนาดน้อยกว่า { $size }
linkExpiredAlt = ลิงก์หมดอายุแล้ว
notSupportedHeader = ไม่รองรับเบราว์เซอร์ของคุณ
notSupportedLink = ทำไมจึงไม่รองรับเบราว์เซอร์ของฉัน?
notSupportedOutdatedDetail = น่าเสียดายที่ Firefox รุ่นนี้ไม่สนับสนุนเทคโนโลยีเว็บที่ขับเคลื่อน Firefox Send คุณจะต้องอัปเดตเบราว์เซอร์ของคุณ
updateFirefox = อัปเดต Firefox
deletePopupCancel = ยกเลิก
deleteButtonHover = ลบ
footerLinkLegal = ข้อกฎหมาย
footerLinkPrivacy = ความเป็นส่วนตัว
footerLinkCookies = คุกกี้
passwordTryAgain = รหัสผ่านไม่ถูกต้อง ลองอีกครั้ง
javascriptRequired = Firefox Send จำเป็นต้องใช้ JavaScript
whyJavascript = ทำไม Firefox Send จึงจำเป็นต้องใช้ JavaScript?
enableJavascript = โปรดเปิดใช้งาน JavaScript แล้วลองอีกครั้ง
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours } ชม. { $minutes } นาที
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes } นาที
# A short status message shown when the user enters a long password
maxPasswordLength = ความยาวรหัสผ่านสูงสุด: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = ไม่สามารถตั้งรหัสผ่านนี้ได้

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = การแบ่งปันไฟล์ที่ง่ายและเป็นส่วนตัว
notifyUploadEncryptDone = ไฟล์ของคุณได้รับการเข้ารหัสและพร้อมส่ง
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = หมดอายุหลังจาก { $downloadCount } หรือ { $timespan }
timespanMinutes =
    { $num ->
       *[other] { $num } นาที
    }
timespanDays =
    { $num ->
       *[other] { $num } วัน
    }
timespanWeeks =
    { $num ->
       *[other] { $num } สัปดาห์
    }
fileCount =
    { $num ->
       *[other] { $num } ไฟล์
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
totalSize = ขนาดรวม: { $size }
# the next line after the colon contains a file name
copyLinkDescription = คัดลอกลิงก์เพื่อแบ่งปันไฟล์ของคุณ:
copyLinkButton = คัดลอกลิงก์
downloadTitle = ดาวน์โหลดไฟล์
trySendDescription = ลองใช้ { -send-brand } สำหรับการแบ่งปันไฟล์ที่ง่ายและปลอดภัย
# count will always be > 10
tooManyFiles =
    { $count ->
       *[other] สามารถอัปโหลดได้ครั้งละ { $count } ไฟล์เท่านั้น
    }
expiredTitle = ลิงก์นี้หมดอายุแล้ว
notSupportedDescription = { -send-brand } จะไม่ทำงานกับเบราว์เซอร์นี้ { -send-short-brand } จะทำงานได้ดีที่สุดกับ { -firefox } รุ่นล่าสุด และจะทำงานกับเบราว์เซอร์ส่วนใหญ่ที่เป็นรุ่นปัจจุบัน
downloadFirefox = ดาวน์โหลด { -firefox }
legalTitle = ประกาศความเป็นส่วนตัวของ { -send-short-brand }
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days } วัน { $hours } ชม. { $minutes } นาที
addFilesButton = เลือกไฟล์ที่จะอัปโหลด
uploadButton = อัปโหลด
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = ลากแล้วปล่อยไฟล์
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = หรือคลิกเพื่อส่งได้ถึง { $size }
addPassword = ปกป้องด้วยรหัสผ่าน
emailPlaceholder = ป้อนอีเมลของคุณ
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = ลงชื่อเข้าเพื่อส่งได้ถึง { $size }
signInOnlyButton = ลงชื่อเข้า
accountBenefitTitle = สร้างบัญชี { -firefox } หรือลงชื่อเข้า
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = แบ่งปันไฟล์สูงสุดถึง { $size }
accountBenefitDownloadCount = แบ่งปันไฟล์กับผู้คนมากขึ้น
accountBenefitSync = จัดการไฟล์ที่แบ่งปันจากอุปกรณ์ใด ๆ
accountBenefitMoz = เรียนรู้เกี่ยวกับบริการ { -mozilla } อื่น ๆ
signOut = ลงชื่อออก
okButton = ตกลง
downloadingTitle = กำลังดาวน์โหลด
noStreamsWarning = เบราว์เซอร์นี้อาจไม่สามารถถอดรหัสไฟล์ขนาดใหญ่เท่านี้ได้
noStreamsOptionCopy = คัดลอกลิงก์เพื่อเปิดในเบราว์เซอร์อื่น
noStreamsOptionFirefox = ลองเบราว์เซอร์โปรดของเรา
noStreamsOptionDownload = ดำเนินการต่อด้วยเบราว์เซอร์นี้
downloadFirefoxPromo = { -send-short-brand } ถูกขับเคลื่อนโดย { -firefox } โฉมใหม่
# the next line after the colon contains a file name
shareLinkDescription = แบ่งปันลิงก์ไปยังไฟล์ของคุณ:
shareLinkButton = แบ่งปันลิงก์
# $name is the name of the file
shareMessage = ดาวน์โหลด “{ $name }” ด้วย { -send-brand }: การแบ่งปันไฟล์ที่ง่ายและเป็นส่วนตัว
trailheadPromo = มีวิธีปกป้องความเป็นส่วนตัวของคุณ เข้าร่วม Firefox
learnMore = เรียนรู้เพิ่มเติม
