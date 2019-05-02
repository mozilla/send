# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Wyślij opinię
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
sendYourFilesLink = Wypróbuj Firefox Send
errorPageHeader = Coś się nie udało.
fileTooBig = Ten plik jest za duży, aby go wysłać. Musi być mniejszy niż { $size }
linkExpiredAlt = Odnośnik wygasł
notSupportedHeader = Używana przeglądarka nie jest obsługiwana.
notSupportedLink = Dlaczego ta przeglądarka nie jest obsługiwana?
notSupportedOutdatedDetail = Ta wersja Firefoksa nie obsługuje technologii internetowej, która napędza Firefox Send. Należy uaktualnić przeglądarkę.
updateFirefox = Uaktualnij Firefoksa
deletePopupCancel = Anuluj
deleteButtonHover = Usuń
footerLinkLegal = Kwestie prawne
footerLinkPrivacy = Prywatność
footerLinkCookies = Ciasteczka
passwordTryAgain = Niepoprawne hasło. Spróbuj ponownie.
javascriptRequired = Firefox Send wymaga języka JavaScript
whyJavascript = Dlaczego Firefox Send wymaga języka JavaScript?
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

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
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
notSupportedDescription = { -send-brand } nie będzie działać w tej przeglądarce. { -send-short-brand } najlepiej działa w najnowszej wersji Firefoksa, ale będzie działać także w aktualnych wersjach większości przeglądarek.
downloadFirefox = Pobierz Firefoksa
legalTitle = Zasady ochrony prywatności serwisu { -send-short-brand }
legalDateStamp = Wersja 1.0 z 12 marca 2019 r.
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days } d. { $hours } godz. { $minutes } min
addFilesButton = Wybierz pliki do wysłania
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
accountBenefitTitle = Utwórz konto Firefoksa lub zaloguj się
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
accountBenefitMoz = Poznaj inne serwisy Mozilli
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
