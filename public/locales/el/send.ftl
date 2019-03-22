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
copyLinkButton = Αντιγραφή συνδέσμου
downloadTitle = Λήψη αρχείων
expiredTitle = Αυτός ο σύνδεσμος έχει λήξει.
downloadFirefox = Λήψη του { -firefox }
addFilesButton = Επιλέξτε αρχεία για μεταφόρτωση
uploadButton = Μεταφόρτωση
emailPlaceholder = Εισάγετε το email σας
signInButton = Σύνδεση/εγγραφή
accountBenefitMoz = Μάθετε για τις άλλες υπηρεσίες της { -mozilla }
signOut = Αποσύνδεση
okButton = OK
downloadingTitle = Λήψη
