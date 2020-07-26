# Firefox Send is a brand name and should not be localized.
title = Firefox Send
importingFile = Akter...
encryptingFile = Awgelhen...
decryptingFile = Azmek...
downloadCount =
    { $num ->
        [one] 1 usider
       *[other] { $num } isidar
    }
timespanHours =
    { $num ->
        [one] 1 usrag
       *[other] { $num } isragen
    }
copiedUrl = Yenɣel!
unlockInputPlaceholder = Awal uffir
unlockButtonLabel = Serreḥ
downloadButtonLabel = Sider
downloadFinish = Asider yemmed
fileSizeProgress = ({ $partialSize } seg { $totalSize })
sendYourFilesLink = Ɛreḍ Firefox Send
errorPageHeader = Yella wayen yeḍran!
fileTooBig = Afaylu-agi meqqer aṭas. Yessefk ad yili daw n  { $size }.
linkExpiredAlt = Aseɣwen yemmut
notSupportedHeader = Iminig-ik ur ittusefrak ara
notSupportedLink = Ayγer iminig inu ur yettwasefrek ara?
notSupportedOutdatedDetail = Ad nesḥissef imilqem-agi n Firefox Firefox ur isefrak ara titiknulujiyin web yettwaseqdacen di Firefox Send. Yessefk ad tleqmeḍ iminig-ik.
updateFirefox = Leqqem Firefox
deletePopupCancel = Sefsex
deleteButtonHover = Kkes
footerLinkLegal = Usḍif
footerLinkPrivacy = Tabaḍnit
footerLinkCookies = Inagan n tuqqna
passwordTryAgain = Yir awal uffir. Ɛreḍ tikelt nniḍen.
javascriptRequired = Firefox Send yesra JavaScript
whyJavascript = Ayɣer firefox Send yesra JavaScript?
enableJavascript = Ma ulac aɣilif rmed JavaScript sakin ɛreḍ tikkelt nniḍen.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }Isragen { $minutes }Tisdatin
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }Tisdatin
# A short status message shown when the user enters a long password
maxPasswordLength = Tuγzi tafellayt n wawal uffir: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Awal-agi uffir ur izmir ara ad ittwabaded

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Afessas, beṭṭu n ifuyla s wudem uslig
introDescription = { -send-brand } ad k·kem-yeǧǧ ad tebḍuḍ ifuyla iwgelhanen si ṭṭerf ɣer ṭṭerf akked useɣwen ara yemmten s wudem awurman. Daɣen, ad tizmireḍ ad tḥerzeḍ ayen i tbeṭṭuḍ s wudem uslig daɣen ad tamneḍ imi agbur-ik·im ur yettɣimi ara  i lebda.
notifyUploadEncryptDone = Afaylu-ik yewgelhen daɣen ihegga i tuzna
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Ad yemmet deffir { $downloadCount } neɣ { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 n tsedat
       *[other] { $num } n tsedatin
    }
timespanDays =
    { $num ->
        [one] 1 n wass
       *[other] { $num } n wussan
    }
timespanWeeks =
    { $num ->
        [one] 1 n dduṛt
       *[other] { $num } n ledwaṛ
    }
fileCount =
    { $num ->
        [one] 1 n ufaylu
       *[other] { $num } n ifuyla
    }
# byte abbreviation
bytes = B
# kibibyte abbreviation
kb = KAṬ
# mebibyte abbreviation
mb = MAṬ
# gibibyte abbreviation
gb = GAṬ
# localized number and byte abbreviation. example "2.5MB"
fileSize = { $num }{ $units }
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
totalSize = Tuɣzi s umata: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Nɣel aseɣwen akken ad tebḍuḍ afaylu-inek
copyLinkButton = Nɣel aseɣwen
downloadTitle = Sider ifuyla
downloadDescription = Afaylu-a yettwabḍa s { -send-brand } s uwgelhen s ṭṭerf ɣer ṭṭerf s useɣwen ara yemmten s wudem awurman.
trySendDescription = Ɛreḍ { -send-brand } i beḍḍu afessas n ifuyla s wudem ameɣtu.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Ala 1 n ufaylu i yemzren ad yali i tikkelt.
       *[other] Ala { $count } n yifuyla i yemzren ad alin i tikkelt.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Ala 1 n teṛcibt i yettwasirgen.
       *[other] Ala { $count } n teṛcibin i yettwasiregn.
    }
expiredTitle = Immut useɣwen.
notSupportedDescription = { -send-brand } ur iteddu ara s yiminig-a. { -send-short-brand } iteddu akken iwata s lqem aneggaru n { -firefox }, daɣen iteddu s lqem amiran n tuget n yiminigen.
downloadFirefox = Sider { -firefox }
legalTitle = Tasertit tabaḍnit n { -send-short-brand }
legalDateStamp = Lqem  1.0, azemz n 12 Meɣres 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days } ass { $hours } srg { $minutes } tsd
addFilesButton = Fren ifuyla ad tessaliḍ
trustWarningMessage = Ḍmen d akken tumneḍ anermis ticki tebḍiḍ isefka n tbadnit.
uploadButton = Sali
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Ẓuɣer sakin sers ifuyla
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = neɣ sit akken ad tazneḍ arma d { $size }
addPassword = Ḥrez s wawal uffir
emailPlaceholder = Sekcem imayl inek
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Qqen akken ad tazneḍ arma d { $size }
signInOnlyButton = Qqen
accountBenefitTitle = Rnu amiḍan { -firefox } akken ad teqqneḍ
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Bḍu ifuyla arma d { $size }
accountBenefitDownloadCount = Bḍu ifuyla d wugan n medden
accountBenefitTimeLimit =
    { $count ->
        [one] Eǧǧ iseɣwan d urmiden arma d 1 n wass
       *[other] Eǧǧ iseɣwan d urmiden arma d { $count } n wassan
    }
accountBenefitSync = Sefrek ifuyla yebdan seg yal ibenk
accountBenefitMoz = Issin ugar ɣef yimeẓla-nniḍen n { -mozilla }
signOut = Ffeɣ
okButton = IH
downloadingTitle = Azdam
noStreamsWarning = Iminig-a ur yezmir ara ad yezmek afaylu meqqren.
noStreamsOptionCopy = Nɣel aseɣwen i tulya deg yiminig-nniden
noStreamsOptionFirefox = Ɛreḍ iminig-ik ufrin
noStreamsOptionDownload = Kemmel akked iminig-a
downloadFirefoxPromo = { -send-short-brand } yettwasumer i yal { -firefox } amaynut.
# the next line after the colon contains a file name
shareLinkDescription = Bḍu aseɣwen ɣer ufaylu-ik:
shareLinkButton = Bḍu aseɣwen
# $name is the name of the file
shareMessage = Sider "{ $name }" s { -send-brand }: d fessas, d aɣelsan i beṭṭu n yifuyla.
trailheadPromo = Yella wallal n ummesten n tudert-ik tusligt. Ddu ɣer Firefox.
learnMore = Issin ugar.
downloadFlagged = Aseɣwen-a yensa acku ur iquder ara tiwtilin n useqdec.
downloadConfirmTitle = Taɣawsa-nniḍen
downloadConfirmDescription = Ḍmen d akken tumneḍ amdan i ak-d-yuznen afaylu-a acku ur nezmir ara ad nwali ma yella ur iṭuṛṛu ara ibenk-ik.
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
downloadTrustCheckbox =
    { $count ->
        [one] Umneɣ amdan i yi-d-yuznen afaylu-a.
       *[other] Umneɣ amdan i yi-d-yuznen ifuyla-a.
    }
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
reportFile =
    { $count ->
        [one] Mmel-d afaylu-a ma tkukraḍ
       *[other] Mmel-d ifuyla-a ma tkukraḍ
    }
reportDescription = Mudd-aɣ-d afus n tallalt akken ad negzu acu i la iḍerrun. Acu twalaḍ cwiya-t kan deg yifuyla-a?
reportUnknownDescription = Ttxil-k·m rzu ɣer url n useɣwen i tebɣiḍ ad t-tceggreḍ syen sit ɣef “{ reportFile }”.
reportButton = Aneqqis
reportReasonMalware = Ifuyla-a deg-sen yir iseɣzanen neɣ d aḥric seg uẓdam n ṣṣyada.
reportReasonPii = Ifuyla-a deg-sen talɣut tudmawant yettwassnen i yi-yeɛnan.
reportReasonAbuse = Ifuyla-a deg-sen agbur arusḍif neɣ anaffal.
reportReasonCopyright = I ucegger n tkerḍa n yizerfan n umeskar neɣ n tecraḍ, seqdec asesfer i d-yettwagelmen ɣef <a>usebter-a</a>.
reportedTitle = Aneqqis ɣef ifuyla ittwazen
reportedDescription = Tanemmirt. Nermes-d aneqqis-ik·im ɣef yifuyla-a.
