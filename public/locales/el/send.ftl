# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Σχόλια
importingFile = Εισαγωγή…
encryptingFile = Κρυπτογράφηση…
decryptingFile = Αποκρυπτογράφηση…
downloadCount =
    { $num ->
        [one] 1 λήψη
       *[other] { $num } λήψεις
    }
timespanHours =
    { $num ->
        [one] 1 ώρα
       *[other] { $num } ώρες
    }
copiedUrl = Αντιγράφτηκε!
unlockInputPlaceholder = Κωδικός πρόσβασης
unlockButtonLabel = Ξεκλείδωμα
downloadButtonLabel = Λήψη
downloadFinish = Η λήψη ολοκληρώθηκε
fileSizeProgress = ({ $partialSize } από { $totalSize })
sendYourFilesLink = Δοκιμάστε το Firefox Send
errorPageHeader = Κάτι πήγε στραβά!
fileTooBig = Αυτό το αρχείο είναι πολύ μεγάλο για μεταφόρτωση. Πρέπει να είναι μικρότερο από { $size }.
linkExpiredAlt = Ο σύνδεσμος έληξε
notSupportedHeader = Το πρόγραμμα περιήγησής σας δεν υποστηρίζεται.
notSupportedLink = Γιατί δεν υποστηρίζεται το πρόγραμμα περιήγησής μου;
notSupportedOutdatedDetail = Δυστυχώς, αυτή η έκδοση του Firefox δεν υποστηρίζει την τεχνολογία ιστού στην οποία βασίζεται το Firefox Send. Πρέπει να ενημερώσετε το πρόγραμμα περιήγησής σας.
updateFirefox = Ενημέρωση Firefox
deletePopupCancel = Ακύρωση
deleteButtonHover = Διαγραφή
footerLinkLegal = Νομικά
footerLinkPrivacy = Απόρρητο
footerLinkCookies = Cookies
passwordTryAgain = Λάθος κωδικός πρόσβασης. Δοκιμάστε ξανά.
javascriptRequired = Το Firefox Send απαιτεί JavaScript
whyJavascript = Γιατί το Firefox Send απαιτεί JavaScript;
enableJavascript = Παρακαλώ ενεργοποιήστε το JavaScript και δοκιμάστε ξανά.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }ώ { $minutes }λ
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }λ
# A short status message shown when the user enters a long password
maxPasswordLength = Μέγιστο μήκος κωδικού: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Δεν ήταν δυνατός ο ορισμός αυτού του κωδικού

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Απλή, ιδιωτική κοινή χρήση αρχείων
introDescription = Το { -send-brand } σάς επιτρέπει να μοιράζεστε αρχεία με από άκρη σε άκρη κρυπτογράφηση και ένα σύνδεσμο που λήγει αυτόματα. Έτσι, ό,τι μοιράζεστε παραμένει ιδιωτικό και είστε βέβαιοι πως δεν παραμένει στο διαδίκτυο για πάντα.
notifyUploadEncryptDone = Το αρχείο σας έχει κρυπτογραφηθεί και είναι έτοιμο για αποστολή
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Λήγει μετά από { $downloadCount } ή { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 λεπτό
       *[other] { $num } λεπτά
    }
timespanDays =
    { $num ->
        [one] 1 ημέρα
       *[other] { $num } ημέρες
    }
timespanWeeks =
    { $num ->
        [one] 1 εβδομάδα
       *[other] { $num } εβδομάδες
    }
fileCount =
    { $num ->
        [one] 1 αρχείο
       *[other] { $num } αρχεία
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
totalSize = Συνολικό μέγεθος: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Αντιγράψτε το σύνδεσμο για να μοιραστείτε το αρχείο:
copyLinkButton = Αντιγραφή συνδέσμου
downloadTitle = Λήψη αρχείων
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Μόνο 1 αρχείο μπορεί να μεταφορτωθεί κάθε φορά.
       *[other] Μόνο { $count } αρχεία μπορούν να μεταφορτωθούν κάθε φορά.
    }
expiredTitle = Αυτός ο σύνδεσμος έχει λήξει.
downloadFirefox = Λήψη του { -firefox }
legalTitle = Σημείωση Απορρήτου { -send-short-brand }
legalDateStamp = Έκδοση 1.0, από 12 Μαρτίου 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }η { $hours }ώ { $minutes }λ
addFilesButton = Επιλέξτε αρχεία για μεταφόρτωση
uploadButton = Μεταφόρτωση
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Σύρετε και εναποθέστε αρχεία
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = ή κάντε κλικ για να στείλετε μέχρι { $size }
addPassword = Προστασία με κωδικό πρόσβασης
emailPlaceholder = Εισάγετε το email σας
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Συνδεθείτε για να στείλετε μέχρι { $size }
signInButton = Σύνδεση/εγγραφή
accountBenefitMoz = Μάθετε για τις άλλες υπηρεσίες της { -mozilla }
signOut = Αποσύνδεση
okButton = OK
downloadingTitle = Λήψη
noStreamsOptionCopy = Αντιγράψτε το σύνδεσμο για άνοιγμα σε άλλο πρόγραμμα περιήγησης
noStreamsOptionFirefox = Δοκιμάστε το αγαπημένο μας πρόγραμμα περιήγησης
noStreamsOptionDownload = Συνέχεια με αυτό το πρόγραμμα περιήγησης
