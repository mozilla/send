# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = 反馈
importingFile = 正在导入…
encryptingFile = 正在加密…
decryptingFile = 正在解密…
downloadCount =
    { $num ->
       *[other] { $num } 次下载
    }
timespanHours =
    { $num ->
       *[other] { $num } 小时
    }
copiedUrl = 已复制！
unlockInputPlaceholder = 密码
unlockButtonLabel = 解锁
downloadButtonLabel = 下载
downloadFinish = 下载完成
fileSizeProgress = ({ $partialSize } / { $totalSize })
sendYourFilesLink = 试试 Firefox Send
errorPageHeader = 我们遇到错误。
fileTooBig = 此文件太大。文件大小上限为 { $size }。
linkExpiredAlt = 链接已过期
notSupportedHeader = 不支持您的浏览器。
notSupportedLink = 为什么不支持我的浏览器？
notSupportedOutdatedDetail = 很可惜，此版本的 Firefox 不支持 Firefox Send 所使用的 Web 技术。您需要更新浏览器才能使用它。
updateFirefox = 更新 Firefox
deletePopupCancel = 取消
deleteButtonHover = 删除
footerLinkLegal = 法律
footerLinkPrivacy = 隐私
footerLinkCookies = Cookie
passwordTryAgain = 密码不正确。请重试。
javascriptRequired = Firefox Send 需要 JavaScript
whyJavascript = 为什么 Firefox Send 需要 JavaScript？
enableJavascript = 请启用 JavaScript 并重试。
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours } 小时 { $minutes } 分钟
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes } 分钟
# A short status message shown when the user enters a long password
maxPasswordLength = 最大密码长度：{ $length }
# A short status message shown when there was an error setting the password
passwordSetError = 未能设置此密码

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = 简单、私密的文件分享服务
introDescription = 使用 { -send-brand } 端到端加密分享文件，链接到期即焚。分享更私密，文件到期真正无痕迹。
notifyUploadEncryptDone = 您的文件已加密，现在可以发送
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = { $downloadCount }或 { $timespan }后过期
timespanMinutes =
    { $num ->
        [one] 1 分钟
       *[other] { $num } 分钟
    }
timespanDays =
    { $num ->
        [one] 1 天
       *[other] { $num } 天
    }
timespanWeeks =
    { $num ->
        [one] 1 周
       *[other] { $num } 周
    }
fileCount =
    { $num ->
        [one] 1 个文件
       *[other] { $num } 个文件
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
totalSize = 总大小：{ $size }
# the next line after the colon contains a file name
copyLinkDescription = 复制链接以分享文件：
copyLinkButton = 复制链接
downloadTitle = 下载文件
downloadDescription = 此文件通过端到端加密的 { -send-brand } 与您分享，链接到期即焚。
trySendDescription = 试试 { -send-brand }，简单、私密的文件分享服务。
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] 一次只可上传 1 个文件。
       *[other] 一次只可上传 { $count } 个文件。
    }
# count will always be > 10
tooManyArchives =
    { $count ->
       *[other] 只可上传 { $count } 个档案。
    }
expiredTitle = 此链接已过期。
notSupportedDescription = { -send-brand } 无法在此浏览器上正常工作。{ -send-short-brand } 与最新版本 { -firefox } 配合使用体验最佳，也适用于目前的大多数浏览器。
downloadFirefox = 下载 { -firefox }
legalTitle = { -send-short-brand } 隐私声明
legalDateStamp = 版本 1.0，于 2019年3月12日
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days } 天 { $hours } 小时 { $minutes } 分钟
addFilesButton = 选择要上传的文件
uploadButton = 上传
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = 拖放文件
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = 或点此传送最大 { $size } 的文件
addPassword = 密码保护
emailPlaceholder = 请输入您的电子邮件地址
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = 登录以传送最大 { $size } 文件
signInOnlyButton = 登录
accountBenefitTitle = 创建一个 { -firefox } 账户或登录
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = 分享最大 { $size } 文件
accountBenefitDownloadCount = 可以与更多人分享
accountBenefitTimeLimit =
    { $count ->
        [one] 链接有效期延至 1 天
       *[other] 链接有效期延至 { $count } 天
    }
accountBenefitSync = 任何设备上都能管理分享的文件
accountBenefitMoz = 了解其他 { -mozilla } 服务
signOut = 退出
okButton = 确定
downloadingTitle = 正在下载
noStreamsWarning = 此浏览器可能无法解密这么大的文件。
noStreamsOptionCopy = 复制链接以在其他浏览器中打开
noStreamsOptionFirefox = 试试大家最爱的浏览器
noStreamsOptionDownload = 使用此浏览器继续
downloadFirefoxPromo = { -send-short-brand } 由焕然一新的 { -firefox } 为您奉上。
# the next line after the colon contains a file name
shareLinkDescription = 您的文件链接：
shareLinkButton = 分享链接
# $name is the name of the file
shareMessage = 使用 { -send-brand } 下载“{ $name }”：简单、安全的文件分享服务
trailheadPromo = 捍卫隐私不是幻想。加入 Firefox 一同抗争。
learnMore = 详细了解。
