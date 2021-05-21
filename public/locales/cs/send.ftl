# Send is a brand name and should not be localized.
title = Send
importingFile = Probíhá import…
encryptingFile = Probíhá šifrování…
decryptingFile = Probíhá dešifrování…
downloadCount =
    { $num ->
        [one] jednom stažení
        [few] { $num } staženích
       *[other] { $num } staženích
    }
timespanHours =
    { $num ->
        [one] hodinu
        [few] { $num } hodiny
       *[other] { $num } hodin
    }
copiedUrl = Zkopírováno!
unlockInputPlaceholder = Heslo
unlockButtonLabel = Odemknout
downloadButtonLabel = Stáhnout
downloadFinish = Stahování dokončeno
fileSizeProgress = ({ $partialSize } z { $totalSize })
sendYourFilesLink = Vyzkoušet Send
errorPageHeader = Nastala chyba!
fileTooBig = Tento soubor je příliš veliký. Velikost nahrávaných souborů by neměla překročit { $size }.
linkExpiredAlt = Platnost odkazu vypršela
notSupportedHeader = Váš prohlížeč není podporován.
notSupportedLink = Proč není můj prohlížeč podporovaný?
notSupportedOutdatedDetail = Tato verze Firefoxu bohužel nepodporuje webovou technologii, která pohání Send. Musíte aktualizovat svůj prohlížeč.
updateFirefox = Aktualizovat Firefox
deletePopupCancel = Zrušit
deleteButtonHover = Smazat
footerLinkLegal = Právní informace
footerLinkPrivacy = Soukromí
footerLinkCookies = Cookies
passwordTryAgain = Špatné heslo. Zkuste to znovu.
javascriptRequired = Send vyžaduje povolený JavaScript
whyJavascript = Proč Send vyžaduje povolený JavaScript?
enableJavascript = Povolte JavaScript a zkuste to znovu.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours } h { $minutes } m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes } m
# A short status message shown when the user enters a long password
maxPasswordLength = Maximální délka hesla: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Toto heslo nemohlo být nastaveno

## Send version 2 strings

# Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand =
    { $case ->
       *[nom] Send
        [gen] Firefoxu Send
        [dat] Firefoxu Send
        [acc] Send
        [voc] Firefoxe Send
        [loc] Firefoxu Send
        [ins] Firefoxem Send
    }
-send-short-brand =
    { $case ->
       *[nom] Send
        [gen] Sendu
        [dat] Sendu
        [acc] Send
        [voc] Sende
        [loc] Sendu
        [ins] Sendem
    }
-firefox =
    { $case ->
       *[nom] Firefox
        [gen] Firefoxu
        [dat] Firefoxu
        [acc] Firefox
        [voc] Firefoxe
        [loc] Firefoxu
        [ins] Firefoxem
    }
-mozilla =
    { $case ->
       *[nom] Mozilla
        [gen] Mozilly
        [dat] Mozille
        [acc] Mozillu
        [voc] Mozillo
        [loc] Mozille
        [ins] Mozillou
    }
introTitle = Jednoduché a soukromé sdílení souborů
introDescription = S { -send-brand(case: "ins") } jsou sdílené soubory šifrované end-to-end, takže ani my nevíme, co sdílíte. Platnost odkazů je navíc omezená. Soubory tak můžete sdílet soukromě a s jistotou, že se nezůstanou na internetu válet navždy.
notifyUploadEncryptDone = Váš soubor je zašifrovaný a připraven k odeslání
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Platnost vyprší po { $downloadCount } nebo za { $timespan }
timespanMinutes =
    { $num ->
        [one] jednu minutu
        [few] { $num } minuty
       *[other] { $num } minut
    }
timespanDays =
    { $num ->
        [one] jeden den
        [few] { $num } dny
       *[other] { $num } dní
    }
timespanWeeks =
    { $num ->
        [one] týden
        [few] { $num } týdny
       *[other] { $num } týdnů
    }
fileCount =
    { $num ->
        [one] jeden soubor
        [few] { $num } soubory
       *[other] { $num } souborů
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
fileSize = { $num } { $units }
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
totalSize = Celková velikost: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Soubor můžete sdílet tímto odkazem:
copyLinkButton = Zkopírovat odkaz
downloadTitle = Stáhnout soubory
downloadDescription = Tento soubor byl sdílen přes { -send-brand(case: "acc") } s end-to-end šifrováním a odkazem s omezenou platností.
trySendDescription = Vyzkoušejte jednoduché a bezpečné sdílení souborů s { -send-brand(case: "ins") }
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Najednou lze nahrávat jen jeden soubor.
        [few] Najednou lze nahrávat jen { $count } soubory.
       *[other] Najednou lze nahrávat jen { $count } souborů.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Povolen je nejvýše jeden archiv.
        [few] Povoleny jsou nejvýše { $count } archivy.
       *[other] Povoleno je nejvýše { $count } archivů.
    }
expiredTitle = Platnost tohoto odkazu vypršela.
notSupportedDescription = { -send-brand } nebude v tomto prohlížeči fungovat. Nejlépe { -send-short-brand } funguje v nejnovějším { -firefox(case: "gen") } nebo aktuálních verzích nejpoužívanějších prohlížečů.
downloadFirefox = Stáhnout { -firefox(case: "acc") }
legalTitle = Zásady { -send-short-brand(case: "acc") } pro ochranu osobních údajů
legalDateStamp = Verze 1.0, 12. března 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }d { $hours }h { $minutes }m
addFilesButton = Vyberte soubory k nahrání
trustWarningMessage = Ujistěte se, že adresátovi důvěřujete pro sdílení vašich důvěrných dat.
uploadButton = Nahrát
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Přetažením myší nebo kliknutím sem
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = můžete poslat až { $size }
addPassword = Ochránit heslem
emailPlaceholder = Zadejte svoji e-mailovou adresu
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Pro odesílání souborů o velikosti až { $size } se prosím přihlaste
signInOnlyButton = Přihlásit se
accountBenefitTitle = Vytvořte si účet { -firefox(case: "gen") } nebo se přihlaste
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Sdílejte soubory o velikosti až { $size }
accountBenefitDownloadCount = Sdílejte soubory s více lidmi
accountBenefitTimeLimit =
    { $count ->
        [one] Odkazy platné až jeden den
        [few] Odkazy platné až { $count } dny
       *[other] Odkazy platné až { $count } dní
    }
accountBenefitSync = Správa sdílených souborů z jakéhokoliv zařízení
accountBenefitMoz = Více informací o dalších službách od { -mozilla(case: "gen") }
signOut = Odhlásit se
okButton = OK
downloadingTitle = Stahování
noStreamsWarning = Dešifrování tak velikého souboru se v tomto prohlížeči nemusí podařit.
noStreamsOptionCopy = Zkopírujte odkaz pro otevření v jiném prohlížeči
noStreamsOptionFirefox = Vyzkoušejte náš oblíbený prohlížeč
noStreamsOptionDownload = Pokračovat v tomto prohlížeči
downloadFirefoxPromo = { -send-short-brand } od aplikace { -firefox }.
# the next line after the colon contains a file name
shareLinkDescription = Sdílet odkaz na soubor:
shareLinkButton = Sdílet odkaz
# $name is the name of the file
shareMessage = Stáhněte si soubor „{ $name }“ s { -send-brand(case: "ins") } - jednoduché a bezpečné sdílení souborů
trailheadPromo = Existuje způsob, jak ochránit své soukromí. Používejte Firefox.
learnMore = Zjistit více.
downloadFlagged = Tento odkaz byl pro porušení podmínek používání služby deaktivován.
downloadConfirmTitle = Ještě jedna věc
downloadConfirmDescription = Ujistěte se, že opravdu důvěřujete odesílateli tohoto souboru, protože nemůžeme potvrdit bezpečnost jeho otevření na vašem zařízení.
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
downloadTrustCheckbox =
    { $count ->
        [one] Odesílateli tohoto souboru důvěřuji
        [few] Odesílateli těchto souborů důvěřuji
       *[other] Odesílateli těchto souborů důvěřuji
    }
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
reportFile =
    { $count ->
        [one] Nahlásit tento soubor jako podezřelý
        [few] Nahlásit tyto soubory jako podezřelé
       *[other] Nahlásit tyto soubory jako podezřelé
    }
reportDescription = Pomozte nám. Co si myslíte, že je s těmito soubory špatně?
reportUnknownDescription = Otevřete odkaz, který chcete nahlásit, a klepněte na „{ reportFile }“.
reportButton = Nahlásit
reportReasonMalware = Tyto soubory obsahují malware nebo jsou součástí phishingového útoku.
reportReasonPii = Tyto soubory obsahují mé osobní údaje.
reportReasonAbuse = Tyto soubory obsahují nelegální nebo urážlivý obsah.
reportReasonCopyright = Chcete-li nahlásit porušení autorských práv nebo ochranných známek, použijte postup popsaný na <a>této stránce</a>.
reportedTitle = Soubory byly nahlášeny
reportedDescription = Děkujeme vám za zaslané hlášení ohledně těchto souborů.
