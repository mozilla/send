# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Informacja zwrotna
importingFile = Importowanie
encryptingFile = Szyfrowanie…
decryptingFile = Odszyfrowywanie…
downloadCount = { $num ->
        [one] 1 pobranie
       *[other] { $num } pobrania
    }
timespanHours = { $num ->
        [one] 1 godzina
       *[other] { $num } godziny
    }
copiedUrl = Skopiowano!
unlockInputPlaceholder = Hasło
unlockButtonLabel = Odblokuj
downloadButtonLabel = Pobierz
downloadFinish = Pobieranie zakończone
fileSizeProgress = ({ $partialSize } z { $totalSize })
sendYourFilesLink = Wypróbuj Firefox Send
errorPageHeader = Coś poszło nie tak!
fileTooBig = Ten plik jest zbyt duży, aby go przesłać. Powinien być mniejszy niż { $size }
linkExpiredAlt = Link wygasł
notSupportedHeader = Twoja przeglądarka nie jest wspierana.
notSupportedLink = Dlaczego moja przeglądarka nie jest obsługiwana?
notSupportedOutdatedDetail = Niestety ta wersja Firefoksa nie obsługuje technologii internetowej, która jest potrzebna do uruchomienia Firefox Send. Musisz zaktualizować przeglądarkę.
updateFirefox = Zaktualizuj Firefox'a
deletePopupCancel = Anuluj
deleteButtonHover = Usuń
footerLinkLegal = Informacje prawne
footerLinkPrivacy = Prywatność
footerLinkCookies = Ciasteczka
passwordTryAgain = Nieprawidłowe hasło. Spróbuj ponownie.
javascriptRequired = Firefox Send wymaga obsługi JavaScript
whyJavascript = Dlaczego Firefox Send wymaga obsługi JavaScript?
enableJavascript = Włącz obsługę JavaScript i spróbuj ponownie.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }h { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Maksymalna długość hasła: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Nie można ustawić tego hasła

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla

introTitle = Proste, prywatne udostępnianie plików
introDescription = { -send-brand } umożliwia udostępnianie plików za pomocą szyfrowania typu end-to-end i odnośników, które automatycznie wygasają. Dzięki temu możesz upewnić się, że to co udostępniasz jest bezpieczne i Twoje rzeczy nie pozostają na zawsze w Internecie.
notifyUploadEncryptDone = Twój plik jest zaszyfrowany i gotowy do wysłania
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Wygasa po { $downloadCount } lub { $timespan }
timespanMinutes = { $num ->
        [one] 1 minuta
       *[other] { $num } minutsch
    }
timespanDays = { $num ->
        [one] 1 dzień
       *[other] { $num } dniach
    }
timespanWeeks = { $num ->
        [one] 1 tydzień
       *[other] { $num } tygodniach
    }
fileCount = { $num ->
    [one] 1 pliki
   *[other] { $num } pliki
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
totalSize = Całkowity rozmiar: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Skopiuj link, aby udostępnić swój plik:
copyLinkButton = Skopiuj link
downloadTitle = Pobierz pliki
downloadDescription = Ten plik został udostępniony za pośrednictwem { -send-brand } z szyfrowaniem typu end-to-end i odnośnikiem, który automatycznie wygasa.
trySendDescription = Wypróbuj { -send-brand }, aby prosto i bezpiecznie udostępnić swoje pliki.
# count will always be > 10
tooManyFiles = { $count ->
     [one] Jednocześnie można przesłać tylko 1 plik.
    *[other] Jednocześnie można przesyłać tylko { $ count } pliki.
}
# count will always be > 10
tooManyArchives = { $count ->
     [one] Dozwolone jest tylko 1 archiwum.
    *[other] Dozwolone są tylko { $ count } archiwa.
}
expiredTitle = Link wygasł.
notSupportedDescription = { -send-brand } nie będzie działać z tą przeglądarką. { -send-short-brand } działa najlepiej z najnowszą wersją { -firefox } i będzie działać z aktualną wersją większości przeglądarek.
downloadFirefox = Pobierz { -firefox }
legalTitle = { -send-short-brand } Polityka prywatności
legalDateStamp = Wersja 1.0 z 12 marca 2019 r
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }d { $hours }h { $minutes }m
addFilesButton = Wybierz pliki do przesłania
uploadButton = Prześlij
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Przeciągnij i upuść pliki
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = lub kliknij, aby przesłać pliki do { $size }
addPassword = Zabezpiecz hasłem
emailPlaceholder = Podaj swój email
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Zaloguj się, aby wysłać pliki do { $size }
signInButton = Zaloguj się / Zarejestruj się
accountBenefitTitle = Zaloguj się lub załóż konto { -firefox }.
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Udostępniaj pliki do { $size }
accountBenefitDownloadCount = Udostępniaj pliki większej liczbie osób
accountBenefitTimeLimit = { $count ->
     [one] Utrzymuj linki aktywne do 1 dnia.
    *[other] Utrzymuj linki aktywne do { $count } dni
}
accountBenefitSync = Zarządzaj udostępnionymi plikami z dowolnego urządzenia
accountBenefitMoz = Dowiedz się o innych usługach { -mozilla }
signOut = Wyloguj się
okButton = OK
downloadingTitle = Pobieranie
noStreamsWarning = Ta przeglądarka może nie być w stanie odszyfrować tak dużego pliku.
noStreamsOptionCopy = Skopiuj link, aby otworzyć w innej przeglądarce
noStreamsOptionFirefox = Wypróbuj naszą ulubioną przeglądarkę
noStreamsOptionDownload = Kontynuuj za pomocą tej przeglądarki