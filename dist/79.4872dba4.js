(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{267:function(n,t,i){"use strict";i.r(t),t.default='# Firefox Send is a brand name and should not be localized.\ntitle = Firefox Send\nsiteFeedback = Phản hồi\nimportingFile = Đang nhập...\nencryptingFile = Đang mã hóa...\ndecryptingFile = Đang giải mã...\ndownloadCount =\n    { $num ->\n       *[other] { $num } lượt tải\n    }\ntimespanHours =\n    { $num ->\n       *[other] { $num } giờ\n    }\ncopiedUrl = Đã sao chép!\nunlockInputPlaceholder = Mật khẩu\nunlockButtonLabel = Mở khóa\ndownloadButtonLabel = Tải xuống\ndownloadFinish = Tải xuống hoàn tất\nfileSizeProgress = ({ $partialSize } trong { $totalSize })\nsendYourFilesLink = Dùng thử Firefox Send\nerrorPageHeader = Có gì đó không ổn!\nfileTooBig = Tập tin này quá lớn để tải lên. Kích thước tập tin phải nhỏ hơn { $size }.\nlinkExpiredAlt = Liên kết đã hết hạn\nnotSupportedHeader = Trình duyệt của bạn không được hỗ trợ.\nnotSupportedLink = Tại sao trình duyệt của tôi không được hỗ trợ?\nnotSupportedOutdatedDetail = Thật không may là phiên bản Firefox này không hỗ trợ công nghệ được sử dụng trong Firefox Send. Bạn cần cập nhật trình duyệt của bạn.\nupdateFirefox = Cập nhật Firefox\ndeletePopupCancel = Hủy bỏ\ndeleteButtonHover = Xóa\nfooterLinkLegal = Pháp lý\nfooterLinkPrivacy = Quyền riêng tư\nfooterLinkCookies = Cookie\npasswordTryAgain = Sai mật khẩu. Vui lòng thử lại.\njavascriptRequired = Firefox Send cần JavaScript\nwhyJavascript = Tại sao Firefox Send cần JavaScript?\nenableJavascript = Vui lòng kích hoạt JavaScript và thử lại.\n# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"\nexpiresHoursMinutes = { $hours } giờ { $minutes } phút\n# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"\nexpiresMinutes = { $minutes } phút\n# A short status message shown when the user enters a long password\nmaxPasswordLength = Độ dài mật khẩu tối đa: { $length }\n# A short status message shown when there was an error setting the password\npasswordSetError = Không thể đặt mật khẩu này\n\n## Send version 2 strings\n\n# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized\n-send-brand = Firefox Send\n-send-short-brand = Send\n-firefox = Firefox\n-mozilla = Mozilla\nintroTitle = Chia sẻ tập tin đơn giản, riêng tư\nintroDescription = { -send-brand } cho phép bạn chia sẻ các tập tin với mã hóa đầu cuối và một liên kết tự động hết hạn. Vì vậy, bạn có thể giữ những gì bạn chia sẻ riêng tư và đảm bảo dữ liệu của bạn không trực tuyến vĩnh viễn.\nnotifyUploadEncryptDone = Tập tin của bạn được mã hóa và sẵn sàng để gửi\n# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. \'Expires after 2 downloads or 25 minutes\'\narchiveExpiryInfo = Hết hạn sau { $downloadCount } hoặc { $timespan }\ntimespanMinutes =\n    { $num ->\n       *[other] { $num } phút\n    }\ntimespanDays =\n    { $num ->\n       *[other] { $num } ngày\n    }\ntimespanWeeks =\n    { $num ->\n       *[other] { $num } tuần\n    }\nfileCount =\n    { $num ->\n       *[other] { $num } tập tin\n    }\n# byte abbreviation\nbytes = B\n# kibibyte abbreviation\nkb = KB\n# mebibyte abbreviation\nmb = MB\n# gibibyte abbreviation\ngb = GB\n# localized number and byte abbreviation. example "2.5MB"\nfileSize = { $num }{ $units }\n# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")\ntotalSize = Tổng kích thước: { $size }\n# the next line after the colon contains a file name\ncopyLinkDescription = Sao chép liên kết để chia sẻ tập tin của bạn:\ncopyLinkButton = Sao chép liên kết\ndownloadTitle = Tải xuống tập tin\ndownloadDescription = Tập tin này đã được chia sẻ qua { -send-brand } với mã hóa đầu cuối và liên kết tự động hết hạn.\ntrySendDescription = Hãy thử { -send-brand } để chia sẻ tập tin đơn giản, an toàn.\n# count will always be > 10\ntooManyFiles =\n    { $count ->\n       *[other] Chỉ { $count } tập tin có thể tải lên mỗi lần.\n    }\n# count will always be > 10\ntooManyArchives =\n    { $count ->\n       *[other] Chỉ cho phép { $count } lưu trữ.\n    }\nexpiredTitle = Liên kết này đã hết hạn.\nnotSupportedDescription = { -send-brand } sẽ không hoạt động với trình duyệt này. { -send-short-brand } hoạt động tốt nhất với phiên bản { -firefox } mới nhất và sẽ hoạt động với phiên bản hiện tại của hầu hết các trình duyệt.\ndownloadFirefox = Tải xuống { -firefox }\nlegalTitle = Thông báo bảo mật { -send-short-brand }\nlegalDateStamp = Phiên bản 1.0, ngày 12 tháng 3 năm 2019\n# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"\nexpiresDaysHoursMinutes = { $days } ngày { $hours } giờ { $minutes } phút\naddFilesButton = Chọn tập tin để tải lên\nuploadButton = Tải lên\n# the first part of the string \'Drag and drop files or click to send up to 1GB\'\ndragAndDropFiles = Kéo và thả tập tin\n# the second part of the string \'Drag and drop files or click to send up to 1GB\'\n# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")\norClickWithSize = hoặc nhấp để gửi tối đa { $size }\naddPassword = Bảo vệ bằng mật khẩu\nemailPlaceholder = Nhập email của bạn\n# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")\nsignInSizeBump = Đăng nhập để gửi tối đa { $size }\nsignInOnlyButton = Đăng nhập\naccountBenefitTitle = Tạo tài khoản { -firefox } hoặc đăng nhập\n# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")\naccountBenefitLargeFiles = Chia sẻ tập tin lên tới { $size }\naccountBenefitDownloadCount = Chia sẻ tập tin với nhiều người hơn\naccountBenefitTimeLimit =\n    { $count ->\n       *[other] Giữ liên kết hoạt động tối đa { $count } ngày\n    }\naccountBenefitSync = Quản lý tập tin được chia sẻ từ mọi thiết bị\naccountBenefitMoz = Tìm hiểu về các dịch vụ khác của { -mozilla }\nsignOut = Đăng xuất\nokButton = OK\ndownloadingTitle = Đang tải xuống\nnoStreamsWarning = Trình duyệt này có khả năng không thể giải mã một tập tin lớn này.\nnoStreamsOptionCopy = Sao chép liên kết để mở trong một trình duyệt khác\nnoStreamsOptionFirefox = Hãy dùng thử trình duyệt yêu thích của chúng tôi\nnoStreamsOptionDownload = Tiếp tục với trình duyệt này\ndownloadFirefoxPromo = { -send-short-brand } được mang đến cho bạn bởi { -firefox } hoàn toàn mới.\n# the next line after the colon contains a file name\nshareLinkDescription = Chia sẻ liên kết đến tập tin của bạn:\nshareLinkButton = Chia sẻ liên kết\n# $name is the name of the file\nshareMessage = Tải xuống “{ $name }“ với { -send-brand }: chia sẻ tập tin đơn giản, an toàn\ntrailheadPromo = Đây là một cách để bảo vệ sự riêng tư của bạn. Tham gia Firefox.\nlearnMore = Tìm hiểu thêm.\n'}}]);
//# sourceMappingURL=79.4872dba4.js.map