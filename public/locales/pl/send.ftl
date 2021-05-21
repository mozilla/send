# Send is a brand name and should not be localized.
title = Send
importingFile = Importowanie…
encryptingFile = Szyfrowanie…
decryptingFile = Odszyfrowywanie…
downloadCount =
    { $num ->
        [one] 1 pobraniu
        [few] { $num } pobraniach
       *[many] { $num } pobraniach
    }
timespanHours =
    { $num ->
        [one] godzinie
        [few] { $num } godzinach
       *[many] { $num } godzinach
    }
copiedUrl = Skopiowano
unlockInputPlaceholder = Hasło
unlockButtonLabel = Odblokuj
downloadButtonLabel = Pobierz
downloadFinish = Ukończono pobieranie
fileSizeProgress = ({ $partialSize } z { $totalSize })
sendYourFilesLink = Wypróbuj Send
errorPageHeader = Coś się nie udało.
fileTooBig = Ten plik jest za duży, aby go wysłać. Musi być mniejszy niż { $size }
linkExpiredAlt = Odnośnik wygasł
notSupportedHeader = Używana przeglądarka nie jest obsługiwana.
notSupportedLink = Dlaczego ta przeglądarka nie jest obsługiwana?
notSupportedOutdatedDetail = Ta wersja Firefoksa nie obsługuje technologii internetowej, która napędza Send. Należy uaktualnić przeglądarkę.
updateFirefox = Uaktualnij Firefoksa
deletePopupCancel = Anuluj
deleteButtonHover = Usuń
footerLinkLegal = Kwestie prawne
footerLinkPrivacy = Prywatność
footerLinkCookies = Ciasteczka
passwordTryAgain = Niepoprawne hasło. Spróbuj ponownie.
javascriptRequired = Send wymaga języka JavaScript
whyJavascript = Dlaczego Send wymaga języka JavaScript?
enableJavascript = Włącz obsługę języka JavaScript i spróbuj ponownie.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours } godz. { $minutes } min
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes } min
# A short status message shown when the user enters a long password
maxPasswordLength = Maksymalna długość hasła: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Nie można ustawić tego hasła

## Send version 2 strings

# Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Proste, prywatne udostępnianie plików
introDescription = { -send-brand } umożliwia udostępnianie plików za pomocą szyfrowania typu „end-to-end” i odnośników, które automatycznie wygasają. Dzięki temu możesz mieć pewność, że to co udostępniasz jest bezpieczne i nie pozostanie w Internecie na zawsze.
notifyUploadEncryptDone = Plik jest zaszyfrowany i gotowy do wysłania
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Wygasa po { $downloadCount } lub { $timespan }
timespanMinutes =
    { $num ->
        [one] minucie
        [few] { $num } minutach
       *[many] { $num } minutach
    }
timespanDays =
    { $num ->
        [one] dniu
        [few] { $num } dniach
       *[many] { $num } dniach
    }
timespanWeeks =
    { $num ->
        [one] tygodniu
        [few] { $num } tygodniach
       *[many] { $num } tygodniach
    }
fileCount =
    { $num ->
        [one] 1 plik
        [few] { $num } pliki
       *[many] { $num } plików
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
fileSize = { $num } { $units }
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
totalSize = Całkowity rozmiar: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Skopiuj odnośnik, aby udostępnić plik:
copyLinkButton = Kopiuj odnośnik
downloadTitle = Pobierz pliki
downloadDescription = Ten plik został udostępniony przez { -send-brand } za pomocą szyfrowania typu „end-to-end” i odnośnika, który automatycznie wygasa.
trySendDescription = Wypróbuj { -send-brand }, aby prosto i bezpiecznie udostępniać pliki.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Jednocześnie można wysyłać tylko jeden plik.
        [few] Jednocześnie można wysyłać tylko { $count } pliki.
       *[many] Jednocześnie można wysyłać tylko { $count } plików.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Dozwolone jest tylko jedno archiwum.
        [few] Dozwolone są tylko { $count } archiwa.
       *[many] Dozwolonych jest tylko { $count } archiwów.
    }
expiredTitle = Ten odnośnik wygasł.
notSupportedDescription = { -send-brand } nie będzie działać w tej przeglądarce. { -send-short-brand } najlepiej działa w najnowszej wersji przeglądarki { -firefox }, ale będzie działać także w aktualnych wersjach większości przeglądarek.
downloadFirefox = Pobierz przeglądarkę { -firefox }
legalTitle = Zasady ochrony prywatności serwisu { -send-short-brand }
legalDateStamp = Wersja 1.0 z 12 marca 2019 r.
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days } d. { $hours } godz. { $minutes } min
addFilesButton = Wybierz pliki do wysłania
trustWarningMessage = Upewnij się, że ufasz odbiorcy, kiedy udostępniasz prywatne dane.
uploadButton = Wyślij
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Przeciągnij pliki
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = lub kliknij, aby wysłać do { $size }
addPassword = Chroń hasłem
emailPlaceholder = Wpisz adres e-mail
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Zaloguj się, aby wysłać do { $size }
signInOnlyButton = Zaloguj się
accountBenefitTitle = Utwórz konto { -firefox } lub zaloguj się
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Udostępniaj pliki do { $size }
accountBenefitDownloadCount = Udostępniaj pliki większej liczbie osób
accountBenefitTimeLimit =
    { $count ->
        [one] Odnośniki aktywne przez jeden dzień
        [few] Odnośniki aktywne przez { $count } dni
       *[many] Odnośniki aktywne przez { $count } dni
    }
accountBenefitSync = Zarządzaj udostępnionymi plikami z każdego urządzenia
accountBenefitMoz = Poznaj inne serwisy organizacji { -mozilla }
signOut = Wyloguj się
okButton = OK
downloadingTitle = Pobieranie
noStreamsWarning = Ta przeglądarka może nie być w stanie odszyfrować tak dużego pliku.
noStreamsOptionCopy = Skopiuj odnośnik, aby otworzyć w innej przeglądarce
noStreamsOptionFirefox = Wypróbuj naszą ulubioną przeglądarkę
noStreamsOptionDownload = Kontynuuj za pomocą tej przeglądarki
downloadFirefoxPromo = { -send-short-brand } jest oferowany przez zupełnie nową przeglądarkę { -firefox }.
# the next line after the colon contains a file name
shareLinkDescription = Udostępnij odnośnik do pliku:
shareLinkButton = Udostępnij odnośnik
# $name is the name of the file
shareMessage = Pobierz „{ $name }” za pomocą { -send-brand }: prostego i bezpiecznego udostępniania plików
trailheadPromo = Jest sposób na ochronę swojej prywatności. Dołącz do Firefoksa.
learnMore = Więcej informacji.
downloadFlagged = Ten odnośnik został wyłączony z powodu naruszenia warunków korzystania z usługi.
downloadConfirmTitle = Jeszcze jedna rzecz
downloadConfirmDescription = Upewnij się, że ufasz osobie, która wysłała Ci ten plik, ponieważ nie możemy zweryfikować, czy nie spowoduje on uszkodzenia Twojego urządzenia.
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
downloadTrustCheckbox =
    { $count ->
        [one] Ufam osobie, która wysłała ten plik
        [few] Ufam osobie, która wysłała te pliki
       *[many] Ufam osobie, która wysłała te pliki
    }
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
reportFile =
    { $count ->
        [one] Zgłoś ten plik jako podejrzany
        [few] Zgłoś te pliki jako podejrzane
       *[many] Zgłoś te pliki jako podejrzane
    }
reportDescription = Pomóż nam zrozumieć, co się stało. Co według Ciebie jest nie tak z tymi plikami?
reportUnknownDescription = Przejdź do adresu odnośnika, który chcesz zgłosić, i kliknij „{ reportFile }”.
reportButton = Zgłoś
reportReasonMalware = Te pliki zawierają złośliwe oprogramowanie lub są częścią próby oszustwa.
reportReasonPii = Te pliki zawierają informacje umożliwiające identyfikację mojej osoby.
reportReasonAbuse = Te pliki zawierają nielegalne lub obraźliwe treści.
reportReasonCopyright = Aby zgłosić naruszenie praw autorskich lub znaków towarowych, skorzystaj z procedury opisanej na <a>ten stronie</a>.
reportedTitle = Pliki zostały zgłoszone
reportedDescription = Dziękujemy. Otrzymaliśmy Twoje zgłoszenie dotyczące tych plików.
