# Firefox Send is a brand name and should not be localized.
title = Firefox Send
importingFile = 匯入中…
encryptingFile = 加密中…
decryptingFile = 解密中…
downloadCount =
    { $num ->
       *[other] { $num } 次下載
    }
timespanHours =
    { $num ->
       *[other] { $num } 小時
    }
copiedUrl = 已複製！
unlockInputPlaceholder = 密碼
unlockButtonLabel = 解鎖
downloadButtonLabel = 下載
downloadFinish = 下載完成
fileSizeProgress = （{ $partialSize }，共 { $totalSize }）
sendYourFilesLink = 試用 Firefox Send
errorPageHeader = 有些東西不對勁！
fileTooBig = 檔案太大無法上傳。檔案大小限制為 { $size }。
linkExpiredAlt = 鏈結已過期
notSupportedHeader = 不支援您的瀏覽器。
notSupportedLink = 為什麼我的瀏覽器不支援？
notSupportedOutdatedDetail = 很可惜，此版本的 Firefox 不支援 Firefox Send 所需的 Web 技術。請更新瀏覽器後再使用。
updateFirefox = 更新 Firefox
deletePopupCancel = 取消
deleteButtonHover = 刪除
footerLinkLegal = 法律資訊
footerLinkPrivacy = 隱私權
footerLinkCookies = Cookie
passwordTryAgain = 密碼不正確，請再試一次。
javascriptRequired = Firefox Send 需要開啟 JavaScript 功能
whyJavascript = 為什麼 Firefox Send 需要 JavaScript 才能使用？
enableJavascript = 請開啟 JavaScript 功能後再試一次。
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours } 時 { $minutes } 分
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes } 分鐘
# A short status message shown when the user enters a long password
maxPasswordLength = 最大密碼長度: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = 無法設定此密碼

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = 簡單而私密的檔案共享服務
introDescription = { -send-brand } 讓您可透過點對點加密的方式來分享檔案，並提供會自動失效的鏈結。這樣一來就可以保留分享時的隱私，也確保檔案不會永久保存於網路上。
notifyUploadEncryptDone = 已加密您的檔案，可以傳送
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = { $downloadCount } 或 { $timespan } 後失效
timespanMinutes =
    { $num ->
       *[other] { $num } 分鐘
    }
timespanDays =
    { $num ->
       *[other] { $num } 天
    }
timespanWeeks =
    { $num ->
       *[other] { $num } 週
    }
fileCount =
    { $num ->
       *[other] { $num } 個檔案
    }
# byte abbreviation
bytes = 位元組
# kibibyte abbreviation
kb = KB
# mebibyte abbreviation
mb = MB
# gibibyte abbreviation
gb = GB
# localized number and byte abbreviation. example "2.5MB"
fileSize = { $num } { $units }
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
totalSize = 總大小: { $size }
# the next line after the colon contains a file name
copyLinkDescription = 複製鏈結即可分享您的檔案:
copyLinkButton = 複製鏈結
downloadTitle = 下載檔案
downloadDescription = 此檔案是透過 { -send-brand } 進行分享，以點對點加密的方式來分享檔案，並提供會自動失效的鏈結。
trySendDescription = 快試試 { -send-brand }，簡單安全的檔案分享機制。
# count will always be > 10
tooManyFiles =
    { $count ->
       *[other] 一次僅能上傳 { $count } 個檔案。
    }
# count will always be > 10
tooManyArchives =
    { $count ->
       *[other] 僅允許 { $count } 個壓縮檔。
    }
expiredTitle = 此鏈結已經失效。
notSupportedDescription = 無法於此瀏覽器使用 { -send-brand }。在最新版的 { -firefox } 中使用 { -send-short-brand } 會有最佳效果，也可在大部分瀏覽器的最新版本當中使用。
downloadFirefox = 下載 { -firefox }
legalTitle = { -send-short-brand } 隱私權公告
legalDateStamp = 1.0 版，2019 年 3 月 12 日生效
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days } 天 { $hours } 小時 { $minutes } 分鐘
addFilesButton = 選擇要上傳的檔案
trustWarningMessage = 分享敏感資料時，請務必確認收件者是可信任的人。
uploadButton = 上傳
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = 拖放檔案到此處
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = 或點擊即可傳送最大 { $size } 的檔案
addPassword = 使用密碼保護
emailPlaceholder = 輸入您的電子郵件地址
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = 登入後即可傳送最大 { $size } 的檔案
signInOnlyButton = 登入
accountBenefitTitle = 註冊 { -firefox } 帳號或登入
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = 分享最大 { $size } 的檔案
accountBenefitDownloadCount = 分享檔案給更多人
accountBenefitTimeLimit =
    { $count ->
       *[other] 將檔案鏈結保留 { $count } 天有效
    }
accountBenefitSync = 從任何裝置管理分享的檔案
accountBenefitMoz = 了解其他 { -mozilla } 服務的更多資訊
signOut = 登出
okButton = 確定
downloadingTitle = 下載中
noStreamsWarning = 此瀏覽器無法解密這麼大的檔案。
noStreamsOptionCopy = 複製鏈結，用其他瀏覽器開啟
noStreamsOptionFirefox = 試試我們最愛的瀏覽器
noStreamsOptionDownload = 繼續使用目前的瀏覽器
downloadFirefoxPromo = { -send-short-brand } 是由全新的 { -firefox } 提供。
# the next line after the colon contains a file name
shareLinkDescription = 您的檔案鏈結:
shareLinkButton = 分享鏈結
# $name is the name of the file
shareMessage = 使用 { -send-brand } 下載「{ $name }」: 簡單安全的檔案分享機制
trailheadPromo = 有種方法可以保護您的隱私，加入 Firefox。
learnMore = 了解更多。
downloadFlagged = 由於違反了服務條款，已停用此鏈結。
downloadConfirmTitle = 還有一件事
downloadConfirmDescription = 因為我們無法檢查此檔案是否會傷害您的裝置，請務必確認發送者是否可受信任。
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
downloadTrustCheckbox =
    { $count ->
       *[other] 我信任傳送檔案給我的人
    }
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
reportFile =
    { $count ->
       *[other] 回報檔案為可疑檔案
    }
reportDescription = 請幫助我們釐清發生了什麼事。您覺得這些檔案有什麼問題？
reportUnknownDescription = 請到想要回報的鏈結網址點擊「{ reportFile }」。
reportButton = 回報
reportReasonMalware = 這些檔案包含惡意軟體，或是釣魚攻擊的一部分。
reportReasonPii = 這些檔案包含我的個人資訊。
reportReasonAbuse = 這些檔案包含非法或濫用內容。
reportReasonCopyright = 若檔案內容侵犯了著作權或商標，請根據<a>此頁面</a>當中描述的方式進行回報。
reportedTitle = 已回報檔案問題
reportedDescription = 感謝您。我們已經收到您對這些檔案的問題回報。
