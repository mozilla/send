# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = フィードバック
importingFile = インポート中...
encryptingFile = 暗号化中...
decryptingFile = 復号化中...
downloadCount =
    { $num ->
       *[other] { $num } 回のダウンロード
    }
timespanHours =
    { $num ->
       *[other] { $num } 時間
    }
copiedUrl = コピー完了！
unlockInputPlaceholder = パスワード
unlockButtonLabel = ロック解除
downloadButtonLabel = ダウンロード
downloadFinish = ダウンロード完了
fileSizeProgress = ({ $partialSize } / { $totalSize })
sendYourFilesLink = Firefox Send を試す
errorPageHeader = 何か問題が発生しました。
fileTooBig = このファイルは大きすぎるためアップロードできません。上限は { $size } です。
linkExpiredAlt = リンク期限切れ
notSupportedHeader = お使いのブラウザーには対応していません。
notSupportedLink = なぜ私のブラウザーには対応していないのでしょうか？
notSupportedOutdatedDetail = 残念ながらお使いのバージョンの Firefox は Firefox Send が活用しているウェブ技術に対応していません。ブラウザーを更新する必要があります。
updateFirefox = Firefox を更新
deletePopupCancel = キャンセル
deleteButtonHover = 削除
footerLinkLegal = 法的情報
footerLinkPrivacy = プライバシー
footerLinkCookies = Cookie
passwordTryAgain = パスワードが正しくありません。再度入力してください。
javascriptRequired = Firefox Send を使うには JavaScript が必要です
whyJavascript = Firefox Send が JavaScript を必要とする理由
enableJavascript = JavaScript を有効にして再度試してください。
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours } 時間 { $minutes } 分
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes } 分
# A short status message shown when the user enters a long password
maxPasswordLength = パスワード最長文字数: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = このパスワードは設定できませんでした

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = 簡単に、プライベートにファイル共有
introDescription = { -send-brand } では、暗号化してファイル共有でき、リンクは自動的に期限切れになります。そのため、共有するものをプライベートに保管でき、オンライン上に永遠に残さないようにできます。
notifyUploadEncryptDone = ファイルが暗号化され、送信する準備ができました
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = 有効期間: { $downloadCount } または { $timespan }
timespanMinutes =
    { $num ->
       *[other] { $num } 分
    }
timespanDays =
    { $num ->
       *[other] { $num } 日
    }
timespanWeeks =
    { $num ->
       *[other] { $num } 週間
    }
fileCount =
    { $num ->
       *[other] { $num } ファイル
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
totalSize = 合計サイズ: { $size }
# the next line after the colon contains a file name
copyLinkDescription = リンクをコピーしてファイルを共有:
copyLinkButton = リンクをコピー
downloadTitle = ファイルをダウンロード
downloadDescription = このファイルは { -send-brand } により、暗号化されて共有されました。リンクは自動的に期限切れになります。
trySendDescription = 簡単で安全なファイル共有ができる { -send-brand } を試してください。
# count will always be > 10
tooManyFiles =
    { $count ->
       *[other] 一度にアップロードできるのは { $count } ファイルまでです。
    }
# count will always be > 10
tooManyArchives =
    { $count ->
       *[other] { $count } 回までしかダウンロードできません。
    }
expiredTitle = このリンクは期限切れです。
notSupportedDescription = { -send-brand } は、このブラウザーでは動作しません。{ -send-short-brand } は最新バージョンの { -firefox } で最もよく動作し、その他の現バージョンのブラウザーでも動作します。
downloadFirefox = { -firefox } をダウンロード
legalTitle = { -send-short-brand } プライバシー通知
legalDateStamp = バージョン 1.0, 2019年3月12日時点
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days } 日 { $hours } 時 { $minutes } 分
addFilesButton = アップロードするファイルを選択
uploadButton = アップロード
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = ファイルをドラッグ＆ドロップ
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = または、クリックして最大 { $size } のファイルを送信
addPassword = パスワードで保護
emailPlaceholder = メールアドレスを入力
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = ログインすると最大 { $size } のファイルを送信できます
signInOnlyButton = ログイン
accountBenefitTitle = { -firefox } アカウントを作成またはログイン
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = 最大 { $size } までのファイルを共有
accountBenefitDownloadCount = より多くの人とファイルを共有
accountBenefitTimeLimit =
    { $count ->
       *[other] リンクを { $count } 日間有効化
    }
accountBenefitSync = 様々な端末から共有したファイルを管理
accountBenefitMoz = { -mozilla } の他のサービスについて詳しく学ぶ
signOut = ログアウト
okButton = OK
downloadingTitle = ダウンロード中
noStreamsWarning = このブラウザーは、この大きさのファイルを復号化できません。
noStreamsOptionCopy = リンクをコピーして他のブラウザーで開いてください
noStreamsOptionDownload = このブラウザーで続ける
downloadFirefoxPromo = { -send-short-brand } はすべてが新しくなった { -firefox } により提供されています。
# the next line after the colon contains a file name
shareLinkDescription = ファイルへのリンクを共有しましょう:
shareLinkButton = リンクを共有
# $name is the name of the file
shareMessage = { -send-brand } で "{ $name }" をダウンロード: シンプルで安全なファイル共有
trailheadPromo = プライバシーを保護する方法があります。Firefox を試してください。
learnMore = 詳細情報
