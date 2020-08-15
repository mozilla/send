# Firefox Send is a brand name and should not be localized.
title = Firefox Send
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
downloadDescription = Αυτό το αρχείο διαμοιράστηκε μέσω του { -send-brand } με κρυπτογράφηση από άκρο σε άκρο και με ένα σύνδεσμο που λήγει αυτόματα.
trySendDescription = Δοκιμάστε το { -send-brand } για απλό, ασφαλή διαμοιρασμό αρχείων.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Μόνο 1 αρχείο μπορεί να μεταφορτωθεί κάθε φορά.
       *[other] Μόνο { $count } αρχεία μπορούν να μεταφορτωθούν κάθε φορά.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Μόνο 1 αρχείο επιτρέπεται.
       *[other] Μόνο { $count } αρχεία επιτρέπονται.
    }
expiredTitle = Αυτός ο σύνδεσμος έχει λήξει.
notSupportedDescription = Το { -send-brand } δεν θα λειτουργήσει με αυτό το πρόγραμμα περιήγησης. Το { -send-short-brand } λειτουργεί καλύτερα με την πιο πρόσφατη έκδοση του { -firefox }, καθώς και με την τρέχουσα έκδοση των περισσότερων προγραμμάτων περιήγησης.
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
signInOnlyButton = Σύνδεση
accountBenefitTitle = Δημιουργία λογαριασμού { -firefox } ή σύνδεση
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Μοιραστείτε αρχεία έως { $size }
accountBenefitDownloadCount = Μοιραστείτε αρχεία με περισσότερα άτομα
accountBenefitTimeLimit =
    { $count ->
        [one] Να παραμείνουν οι σύνδεσμοι ενεργοί έως και 1 ημέρα
       *[other] Να παραμείνουν οι σύνδεσμοι ενεργοί έως και { $count } ημέρες
    }
accountBenefitSync = Διαχειριστείτε τα διαμοιρασμένα αρχεία από οποιαδήποτε συσκευή
accountBenefitMoz = Μάθετε για τις άλλες υπηρεσίες της { -mozilla }
signOut = Αποσύνδεση
okButton = OK
downloadingTitle = Λήψη
noStreamsWarning = Αυτό το πρόγραμμα περιήγησης ενδέχεται να μην μπορέσει να αποκρυπτογραφήσει αρχεία αυτού του μεγέθους.
noStreamsOptionCopy = Αντιγράψτε το σύνδεσμο για άνοιγμα σε άλλο πρόγραμμα περιήγησης
noStreamsOptionFirefox = Δοκιμάστε το αγαπημένο μας πρόγραμμα περιήγησης
noStreamsOptionDownload = Συνέχεια με αυτό το πρόγραμμα περιήγησης
downloadFirefoxPromo = Το { -send-short-brand } παρέχεται σε εσάς από το ολοκαίνουριο { -firefox }.
# the next line after the colon contains a file name
shareLinkDescription = Μοιραστείτε το σύνδεσμο του αρχείου σας:
shareLinkButton = Κοινή χρήση συνδέσμου
# $name is the name of the file
shareMessage = Λήψη του “{ $name }” με το { -send-brand }: απλός και ασφαλής διαμοιρασμός αρχείων
trailheadPromo = Υπάρχει τρόπος να προστατέψετε το απόρρητό σας. Γίνετε μέλος του Firefox.
learnMore = Μάθετε περισσότερα.
downloadConfirmTitle = Κάτι ακόμα
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
downloadTrustCheckbox =
    { $count ->
        [one] Εμπιστεύομαι το άτομο που έστειλε το αρχείο
       *[other] Εμπιστεύομαι το άτομο που έστειλε τα αρχεία
    }
reportDescription = Βοηθήστε μας να καταλάβουμε τι συμβαίνει. Τι νομίζετε ότι δεν πάει καλά με αυτά τα αρχεία;
reportButton = Αναφορά
reportedDescription = Σας ευχαριστούμε. Λάβαμε την αναφορά σας για τα αρχεία.
