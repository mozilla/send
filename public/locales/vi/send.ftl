# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Phản hồi
importingFile = Đang nhập...
encryptingFile = Đang mã hóa...
decryptingFile = Đang giải mã...
downloadCount =
    { $num ->
       *[other] { $num } lượt tải
    }
timespanHours =
    { $num ->
       *[other] { $num } giờ
    }
copiedUrl = Đã sao chép!
unlockInputPlaceholder = Mật khẩu
unlockButtonLabel = Mở khóa
downloadButtonLabel = Tải xuống
downloadFinish = Tải xuống hoàn tất
fileSizeProgress = ({ $partialSize } trong { $totalSize })
sendYourFilesLink = Dùng thử Firefox Send
errorPageHeader = Có gì đó không ổn!
fileTooBig = Tập tin này quá lớn để tải lên. Kích thước tập tin phải nhỏ hơn { $size }.
linkExpiredAlt = Liên kết đã hết hạn
notSupportedHeader = Trình duyệt của bạn không được hỗ trợ.
notSupportedLink = Tại sao trình duyệt của tôi không được hỗ trợ?
notSupportedOutdatedDetail = Thật không may là phiên bản Firefox này không hỗ trợ công nghệ được sử dụng trong Firefox Send. Bạn cần cập nhật trình duyệt của bạn.
updateFirefox = Cập nhật Firefox
deletePopupCancel = Hủy bỏ
deleteButtonHover = Xóa
footerLinkLegal = Pháp lý
footerLinkPrivacy = Quyền riêng tư
footerLinkCookies = Cookie
passwordTryAgain = Sai mật khẩu. Vui lòng thử lại.
javascriptRequired = Firefox Send cần JavaScript
whyJavascript = Tại sao Firefox Send cần JavaScript?
enableJavascript = Vui lòng kích hoạt JavaScript và thử lại.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours } giờ { $minutes } phút
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes } phút
# A short status message shown when the user enters a long password
maxPasswordLength = Độ dài mật khẩu tối đa: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Không thể đặt mật khẩu này

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Chia sẻ tập tin đơn giản, riêng tư
introDescription = { -send-brand } cho phép bạn chia sẻ các tập tin với mã hóa đầu cuối và một liên kết tự động hết hạn. Vì vậy, bạn có thể giữ những gì bạn chia sẻ riêng tư và đảm bảo dữ liệu của bạn không trực tuyến vĩnh viễn.
notifyUploadEncryptDone = Tập tin của bạn được mã hóa và sẵn sàng để gửi
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Hết hạn sau { $downloadCount } hoặc { $timespan }
timespanMinutes =
    { $num ->
       *[other] { $num } phút
    }
timespanDays =
    { $num ->
       *[other] { $num } ngày
    }
timespanWeeks =
    { $num ->
       *[other] { $num } tuần
    }
fileCount =
    { $num ->
       *[other] { $num } tập tin
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
totalSize = Tổng kích thước: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Sao chép liên kết để chia sẻ tập tin của bạn:
copyLinkButton = Sao chép liên kết
downloadTitle = Tải tập tin
downloadDescription = Tập tin này đã được chia sẻ qua { -send-brand } với mã hóa đầu cuối và liên kết tự động hết hạn.
trySendDescription = Hãy thử { -send-brand } để chia sẻ tập tin đơn giản, an toàn.
# count will always be > 10
tooManyFiles =
    { $count ->
       *[other] Chỉ { $count } tập tin có thể tải lên mỗi lần.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
       *[other] Chỉ cho phép { $count } lưu trữ.
    }
expiredTitle = Liên kết này đã hết hạn.
notSupportedDescription = { -send-brand } sẽ không hoạt động với trình duyệt này. { -send-short-brand } hoạt động tốt nhất với phiên bản { -firefox } mới nhất và sẽ hoạt động với phiên bản hiện tại của hầu hết các trình duyệt.
downloadFirefox = Tải xuống { -firefox }
legalTitle = Thông báo bảo mật { -send-short-brand }
legalDateStamp = Phiên bản 1.0, ngày 12 tháng 3 năm 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days } ngày { $hours } giờ { $minutes } phút
addFilesButton = Chọn tập tin để tải lên
uploadButton = Tải lên
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Kéo và thả tập tin
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = hoặc nhấp để gửi tối đa { $size }
addPassword = Bảo vệ bằng mật khẩu
emailPlaceholder = Nhập email của bạn
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Đăng nhập để gửi tối đa { $size }
signInOnlyButton = Đăng nhập
accountBenefitTitle = Tạo tài khoản { -firefox } hoặc đăng nhập
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Chia sẻ tập tin lên tới { $size }
accountBenefitDownloadCount = Chia sẻ tập tin với nhiều người hơn
accountBenefitTimeLimit =
    { $count ->
       *[other] Giữ liên kết hoạt động tối đa { $count } ngày
    }
accountBenefitSync = Quản lý tập tin được chia sẻ từ mọi thiết bị
accountBenefitMoz = Tìm hiểu về các dịch vụ khác của { -mozilla }
signOut = Đăng xuất
okButton = OK
downloadingTitle = Đang tải xuống
noStreamsWarning = Trình duyệt này có khả năng không thể giải mã một tập tin lớn này.
noStreamsOptionCopy = Sao chép liên kết để mở trong một trình duyệt khác
noStreamsOptionFirefox = Hãy dùng thử trình duyệt yêu thích của chúng tôi
noStreamsOptionDownload = Tiếp tục với trình duyệt này
downloadFirefoxPromo = { -send-short-brand } được mang đến cho bạn bởi { -firefox } hoàn toàn mới.
# the next line after the colon contains a file name
shareLinkDescription = Chia sẻ liên kết đến tập tin của bạn:
shareLinkButton = Chia sẻ liên kết
# $name is the name of the file
shareMessage = Tải xuống “{ $name }“ với { -send-brand }: chia sẻ tập tin đơn giản, an toàn
