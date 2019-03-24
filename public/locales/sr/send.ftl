# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Повратне информације
importingFile = Увозим…
encryptingFile = Шифрујем…
decryptingFile = Дешифрујем…
downloadCount =
    { $num ->
        [one] преузимања
        [few] преузимања
       *[other] преузимања
    }
timespanHours =
    { $num ->
        [one] сата
        [few] сата
       *[other] сати
    }
copiedUrl = Ископирано!
unlockInputPlaceholder = Лозинка
unlockButtonLabel = Откључај
downloadButtonLabel = Преузми
downloadFinish = Преузимање је завршено.
fileSizeProgress = ({ $partialSize } од { $totalSize })
sendYourFilesLink = Испробајте Firefox Send
errorPageHeader = Нешто је пошло наопако!
fileTooBig = Та датотека је превелика за отпремање. Треба да буде мања од { $size }.
linkExpiredAlt = Веза је истекла
notSupportedHeader = Ваш прегледач није подржан.
notSupportedLink = Зашто мој прегледач није подржан?
notSupportedOutdatedDetail = Нажалост, ово издање Firefox-a не подржава веб технологију која омогућава Firefox Send. Мораћете да ажурирате ваш прегледач.
updateFirefox = Ажурирај Firefox
deletePopupCancel = Откажи
deleteButtonHover = Обриши
footerLinkLegal = Правни подаци
footerLinkPrivacy = Приватност
footerLinkCookies = Колачићи
passwordTryAgain = Нетачна лозинка. Пробајте поново.
javascriptRequired = За Firefox Send је потребан JavaScript
whyJavascript = Зашто је потребан JavaScript за Firefox Send?
enableJavascript = Омогућите JavaScript и пробајте поново.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }ч { $minutes }м
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }м
# A short status message shown when the user enters a long password
maxPasswordLength = Највећа дужина лозинке: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Не можемо поставити ову лозинку

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Једноставно и приватно дељење датотека
introDescription = { -send-brand } вам дозвољава да делите датотеке које су шифроване с краја на крај преко везе која самостално истиче. Тако да можете приватно делити ваше ствари које неће остати на вебу заувек.
notifyUploadEncryptDone = Ваша датотека је шифрована и спремна за слање
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Истиче након { $downloadCount } или { $timespan }
timespanMinutes =
    { $num ->
        [one] { $num } минут
        [few] { $num } минута
       *[other] { $num } минута
    }
timespanDays =
    { $num ->
        [one] { $num } дан
        [few] { $num } дана
       *[other] { $num } дана
    }
timespanWeeks =
    { $num ->
        [one] { $num } недеља
        [few] { $num } недеље
       *[other] { $num } недеља
    }
fileCount =
    { $num ->
        [one] { $num } датотека
        [few] { $num } датотеке
       *[other] { $num } датотека
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
totalSize = Укупна величина: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Копирајте везу да бисте поделили вашу датотеку:
copyLinkButton = Копирај везу
downloadTitle = Преузми датотеке
