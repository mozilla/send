# Send is a brand name and should not be localized.
title = Send
importingFile = 가져오는 중…
encryptingFile = 암호화 중…
decryptingFile = 복호화 중…
downloadCount = 다운로드 { $num }회
timespanHours = { $num }시간
copiedUrl = 복사 완료!
unlockInputPlaceholder = 비밀번호
unlockButtonLabel = 잠금 해제
downloadButtonLabel = 다운로드
downloadFinish = 다운로드 완료
fileSizeProgress = ({ $partialSize } / { $totalSize })
sendYourFilesLink = Send 써보기
errorPageHeader = 오류가 발생했습니다!
fileTooBig = 파일의 크기가 너무 큽니다. { $size } 보다 작아야 합니다.
linkExpiredAlt = 링크가 만료됨
notSupportedHeader = 이 브라우저는 지원되지 않습니다.
notSupportedLink = 왜 이 브라우저는 지원이 되지 않나요?
notSupportedOutdatedDetail = 안타깝게도 사용중인 Firefox 버전에서는 Send에 사용되는 웹 기술을 지원하지 않습니다. 브라우저 업데이트가 필요합니다.
updateFirefox = Firefox 업데이트
deletePopupCancel = 아니오
deleteButtonHover = 삭제
footerLinkLegal = 법적 정보
footerLinkPrivacy = 개인정보 보호
footerLinkCookies = 쿠키
passwordTryAgain = 비밀번호가 맞지 않습니다. 다시 시도해 주세요.
javascriptRequired = Send는 JavaScript를 필요로 합니다
whyJavascript = 왜 Send에 JavaScript가 필요하죠?
enableJavascript = JavaScript를 활성화하고 다시 시도해 주세요.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }시간 { $minutes }분
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }분
# A short status message shown when the user enters a long password
maxPasswordLength = 최대 비밀번호 길이: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = 이 비밀번호를 설정할 수 없었습니다

## Send version 2 strings

# Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = 간단하고, 사생활을 보호하는 파일 공유
introDescription = { -send-brand }를 사용하면 종단 암호화와 자동으로 만료되는 링크를 사용해 파일을 공유할 수 있습니다. 안전하게 공유할 수 있고 공유된 파일이 계속 온라인에 남지 않게 됩니다.
notifyUploadEncryptDone = 파일이 암호화 되어서 보낼 수 있게 됐습니다
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = { $downloadCount } 혹은 { $timespan } 후 만료됨
timespanMinutes =
    { $num ->
       *[other] { $num }분
    }
timespanDays =
    { $num ->
       *[other] { $num }일
    }
timespanWeeks =
    { $num ->
       *[other] { $num }주
    }
fileCount =
    { $num ->
       *[other] { $num } 파일
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
totalSize = 전체 크기: { $size }
# the next line after the colon contains a file name
copyLinkDescription = 링크를 복사해서 파일을 공유하세요:
copyLinkButton = 링크 복사
downloadTitle = 파일 다운로드
downloadDescription = 이 파일은 종단간 암호화 및 자동으로 만료되는 링크를 지원하는 { -send-brand }를 통해 공유되었습니다.
trySendDescription = 간단하고 안전한 파일 공유를 원하시나요? { -send-brand }를 사용해보세요.
# count will always be > 10
tooManyFiles =
    { $count ->
       *[other] 한번에 { $count }개의 파일만 업로드 할 수 있습니다.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
       *[other] { $count }개의 아카이브만 허용됩니다.
    }
expiredTitle = 이 링크는 만료되었습니다.
notSupportedDescription = { -send-brand }는 이 브라우저와 작동하지 않습니다. { -send-short-brand }는 최신 { -firefox }와 가장 잘 작동하며, 대부분의 최신 웹 브라우저와도 잘 작동합니다.
downloadFirefox = { -firefox } 다운로드
legalTitle = { -send-short-brand } 개인정보처리방침
legalDateStamp = 버전 1.0, 2019년 3월 12일자
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }일 { $hours }시간 { $minutes }분
addFilesButton = 업로드할 파일들을 선택하세요
trustWarningMessage = 중요한 정보를 공유할 때는 수신자들이 모두 믿을 만한 사람들인지를 꼭 확인하세요.
uploadButton = 업로드
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = 파일들을 여기에 끌어서 놓으세요
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = 또는 여기를 클릭하여 { $size }까지의 파일을 공유하세요.
addPassword = 비밀번호로 파일 보호
emailPlaceholder = 이메일 입력
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = { $size }까지 파일을 보낼 수 있게 로그인
signInOnlyButton = 로그인
accountBenefitTitle = { -firefox } 계정 생성 또는 로그인
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = { $size }까지의 파일 공유
accountBenefitDownloadCount = 더 많은 사람들과 함께 파일 공유
accountBenefitTimeLimit =
    { $count ->
       *[other] 최대 { $count }일까지 링크 유지
    }
accountBenefitSync = 어떤 기기에서든지 공유된 링크 관리
accountBenefitMoz = 다른 { -mozilla } 서비스에 대해 알아보기
signOut = 로그아웃
okButton = 확인
downloadingTitle = 다운로드 중
noStreamsWarning = 이 브라우저는 이렇게 큰 파일은 암호화 해제를 못할 수도 있습니다.
noStreamsOptionCopy = 다른 브라우저에서 열 수 있도록 링크를 복사
noStreamsOptionFirefox = 우리가 애용하는 브라우저를 사용해 보세요
noStreamsOptionDownload = 이 브라우저로 계속하기
downloadFirefoxPromo = 완전히 새로운 { -firefox }로 { -send-short-brand }가 제공됩니다.
# the next line after the colon contains a file name
shareLinkDescription = 파일 링크 공유:
shareLinkButton = 링크 공유
# $name is the name of the file
shareMessage = { -send-brand }으로 “{ $name }” 파일을 내려받으세요: 쉽고 안전한 파일 공유입니다.
trailheadPromo = 개인 정보를 보호하는 방법이 있습니다. Firefox에 가입하세요.
learnMore = 더 알아보기.
downloadFlagged = 서비스 약관 위반으로 인해 비활성화된 링크입니다.
downloadConfirmTitle = 한 가지 더
downloadConfirmDescription = 이 파일이 기기에 해를 끼치지 않는 다는 점을 확인하지 못했기 때문에 이 파일을 보낸 사람을 신뢰할 수 있는지 확인하세요.
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
downloadTrustCheckbox =
    { $count ->
       *[other] 이 파일을 보낸 사람을 신뢰함
    }
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
reportFile =
    { $count ->
       *[other] 이 파일을 의심스러운 것으로 신고
    }
reportDescription = 어떤 일이 발생했는지 알려 주세요. 이 파일의 어느 부분이 문제인 것 같나요?
reportUnknownDescription = 신고하려는 링크의 URL로 가서 “{ reportFile }”를 클릭하세요.
reportButton = 신고
reportReasonMalware = 이 파일은 악성 코드를 포함하고 있거나 피싱 공격의 일부입니다.
reportReasonPii = 이 파일에는 본인에 대한 개인 식별 정보가 포함되어 있습니다.
reportReasonAbuse = 이 파일에는 불법적이거나 모욕적인 내용이 들어 있습니다.
reportReasonCopyright = 저작권 또는 상표권 침해를 신고하려면 <a>이 페이지</a>에 설명된 절차를 따르십시오.
reportedTitle = 파일 신고됨
reportedDescription = 파일에 대한 신고를 접수했습니다. 감사합니다.
