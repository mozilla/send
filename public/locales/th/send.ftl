# Firefox Send is a brand name and should not be localized.
title = Firefox Send
importingFile = กำลังนำเข้า…
encryptingFile = กำลังเข้ารหัส…
decryptingFile = กำลังถอดรหัส…
downloadCount =
    { $num ->
       *[other] { $num } การดาวน์โหลด
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
introDescription = { -send-brand } ให้คุณแบ่งปันไฟล์ด้วยการเข้ารหัสจากต้นทางถึงปลายทางและลิงก์ที่หมดอายุโดยอัตโนมัติ คุณจึงสามารถเก็บสิ่งที่คุณแบ่งปันไว้เป็นส่วนตัวและตรวจสอบให้แน่ใจว่าข้อมูลของคุณจะไม่ออนไลน์ตลอดไป
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
downloadDescription = ไฟล์นี้ถูกแบ่งปันผ่าน { -send-brand } พร้อมการเข้ารหัสจากต้นทางถึงปลายทางและลิงก์ที่หมดอายุโดยอัตโนมัติ
trySendDescription = ลองใช้ { -send-brand } สำหรับการแบ่งปันไฟล์ที่ง่ายและปลอดภัย
# count will always be > 10
tooManyFiles =
    { $count ->
       *[other] สามารถอัปโหลดได้ครั้งละ { $count } ไฟล์เท่านั้น
    }
# count will always be > 10
tooManyArchives =
    { $count ->
       *[other] สามารถอัปโหลดไฟล์เก็บถาวรได้เพียง { $count } ไฟล์เท่านั้น
    }
expiredTitle = ลิงก์นี้หมดอายุแล้ว
notSupportedDescription = { -send-brand } จะไม่ทำงานกับเบราว์เซอร์นี้ { -send-short-brand } จะทำงานได้ดีที่สุดกับ { -firefox } รุ่นล่าสุด และจะทำงานกับเบราว์เซอร์ส่วนใหญ่ที่เป็นรุ่นปัจจุบัน
downloadFirefox = ดาวน์โหลด { -firefox }
legalTitle = ประกาศความเป็นส่วนตัวของ { -send-short-brand }
legalDateStamp = รุ่น 1.0 วันที่ 12 มีนาคม 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days } วัน { $hours } ชม. { $minutes } นาที
addFilesButton = เลือกไฟล์ที่จะอัปโหลด
trustWarningMessage = ตรวจสอบให้แน่ใจว่าคุณเชื่อใจผู้รับของคุณขณะที่คุณแบ่งปันข้อมูลที่ละเอียดอ่อน
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
accountBenefitTimeLimit =
    { $count ->
       *[other] ให้ลิงก์ใช้งานได้นานถึง { $count } วัน
    }
accountBenefitSync = จัดการไฟล์ที่แบ่งปันจากอุปกรณ์ใด ๆ
accountBenefitMoz = เรียนรู้เกี่ยวกับบริการ { -mozilla } อื่น ๆ
signOut = ลงชื่อออก
okButton = ตกลง
downloadingTitle = กำลังดาวน์โหลด
noStreamsWarning = เบราว์เซอร์นี้อาจไม่สามารถถอดรหัสไฟล์ขนาดใหญ่เท่านี้ได้
noStreamsOptionCopy = คัดลอกลิงก์เพื่อเปิดในเบราว์เซอร์อื่น
noStreamsOptionFirefox = ลองเบราว์เซอร์โปรดของเรา
noStreamsOptionDownload = ดำเนินการต่อด้วยเบราว์เซอร์นี้
downloadFirefoxPromo = { -send-short-brand } สนับสนุนโดย { -firefox } โฉมใหม่
# the next line after the colon contains a file name
shareLinkDescription = แบ่งปันลิงก์ไปยังไฟล์ของคุณ:
shareLinkButton = แบ่งปันลิงก์
# $name is the name of the file
shareMessage = ดาวน์โหลด “{ $name }” ด้วย { -send-brand }: การแบ่งปันไฟล์ที่ง่ายและเป็นส่วนตัว
trailheadPromo = มีวิธีปกป้องความเป็นส่วนตัวของคุณ เข้าร่วม Firefox
learnMore = เรียนรู้เพิ่มเติม
downloadFlagged = ลิงก์นี้ถูกปิดการใช้งานเนื่องจากละเมิดข้อกำหนดในการให้บริการ
downloadConfirmTitle = อีกหนึ่งอย่าง
downloadConfirmDescription = ตรวจสอบให้แน่ใจว่าคุณเชื่อถือคนที่ส่งไฟล์นี้ให้คุณ เพราะเราไม่สามารถยืนยันได้ว่าไฟล์นี้จะไม่เป็นอันตรายต่ออุปกรณ์ของคุณ
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
downloadTrustCheckbox =
    { $count ->
       *[other] ฉันเชื่อใจคนที่ส่งไฟล์เหล่านี้
    }
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
reportFile =
    { $count ->
       *[other] รายงานไฟล์เหล่านี้ว่าน่าสงสัย
    }
reportDescription = ช่วยให้เราเข้าใจสิ่งที่เกิดขึ้น คุณคิดอย่างไรว่าไฟล์เหล่านี้ผิดปกติ?
reportUnknownDescription = โปรดไปที่ URL ของลิงก์ที่คุณต้องการรายงานและคลิก “{ reportFile }”
reportButton = รายงาน
reportReasonMalware = ไฟล์เหล่านี้มีมัลแวร์หรือเป็นส่วนหนึ่งของการโจมตีแบบฟิชชิ่ง
reportReasonPii = ไฟล์เหล่านี้มีข้อมูลที่สามารถระบุตัวบุคคลได้เกี่ยวกับฉัน
reportReasonAbuse = ไฟล์เหล่านี้มีเนื้อหาที่ผิดกฎหมายหรือไม่เหมาะสม
reportReasonCopyright = หากต้องการรายงานการละเมิดลิขสิทธิ์หรือเครื่องหมายการค้าให้ใช้กระบวนการที่อธิบายไว้ใน <a> หน้านี้ </a>
reportedTitle = ไฟล์ถูกรายงานแล้ว
reportedDescription = ขอบคุณ เราได้รับรายงานของคุณเกี่ยวกับไฟล์เหล่านี้แล้ว
