(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{204:function(n,e,o){"use strict";o.r(e),e.default='# Firefox Send is a brand name and should not be localized.\ntitle = Firefox Send\nsiteFeedback = Zpětná vazba\nimportingFile = Probíhá import…\nencryptingFile = Probíhá šifrování…\ndecryptingFile = Probíhá dešifrování…\ndownloadCount =\n    { $num ->\n        [one] jednom stažení\n        [few] { $num } staženích\n       *[other] { $num } staženích\n    }\ntimespanHours =\n    { $num ->\n        [one] hodinu\n        [few] { $num } hodiny\n       *[other] { $num } hodin\n    }\ncopiedUrl = Zkopírováno!\nunlockInputPlaceholder = Heslo\nunlockButtonLabel = Odemknout\ndownloadButtonLabel = Stáhnout\ndownloadFinish = Stahování dokončeno\nfileSizeProgress = ({ $partialSize } z { $totalSize })\nsendYourFilesLink = Vyzkoušejte Firefox Send\nerrorPageHeader = Nastala chyba!\nfileTooBig = Tento soubor je příliš veliký. Velikost nahrávaných souborů by neměla překročit { $size }.\nlinkExpiredAlt = Platnost odkazu vypršela\nnotSupportedHeader = Váš prohlížeč není podporován.\nnotSupportedLink = Proč není můj prohlížeč podporovaný?\nnotSupportedOutdatedDetail = Tato verze Firefoxu bohužel nepodporuje webovou technologii, která pohání Firefox Send. Musíte aktualizovat svůj prohlížeč.\nupdateFirefox = Aktualizovat Firefox\ndeletePopupCancel = Zrušit\ndeleteButtonHover = Smazat\nfooterLinkLegal = Právní informace\nfooterLinkPrivacy = Soukromí\nfooterLinkCookies = Cookies\npasswordTryAgain = Špatné heslo. Zkuste to znovu.\njavascriptRequired = Firefox Send vyžaduje povolený JavaScript\nwhyJavascript = Proč Firefox Send vyžaduje povolený JavaScript?\nenableJavascript = Povolte JavaScript a zkuste to znovu.\n# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"\nexpiresHoursMinutes = { $hours } h { $minutes } m\n# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"\nexpiresMinutes = { $minutes } m\n# A short status message shown when the user enters a long password\nmaxPasswordLength = Maximální délka hesla: { $length }\n# A short status message shown when there was an error setting the password\npasswordSetError = Toto heslo nemohlo být nastaveno\n\n## Send version 2 strings\n\n# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized\n-send-brand =\n    { $case ->\n       *[nom] Firefox Send\n        [gen] Firefoxu Send\n        [dat] Firefoxu Send\n        [acc] Firefox Send\n        [voc] Firefoxe Send\n        [loc] Firefoxu Send\n        [ins] Firefoxem Send\n    }\n-send-short-brand =\n    { $case ->\n       *[nom] Send\n        [gen] Sendu\n        [dat] Sendu\n        [acc] Send\n        [voc] Sende\n        [loc] Sendu\n        [ins] Sendem\n    }\n-firefox =\n    { $case ->\n       *[nom] Firefox\n        [gen] Firefoxu\n        [dat] Firefoxu\n        [acc] Firefox\n        [voc] Firefoxe\n        [loc] Firefoxu\n        [ins] Firefoxem\n    }\n-mozilla =\n    { $case ->\n       *[nom] Mozilla\n        [gen] Mozilly\n        [dat] Mozille\n        [acc] Mozillu\n        [voc] Mozillo\n        [loc] Mozille\n        [ins] Mozillou\n    }\nintroTitle = Jednoduché a soukromé sdílení souborů\nintroDescription = S { -send-brand(case: "ins") } jsou sdílené soubory šifrované end-to-end, takže ani my nevíme, co sdílíte. Platnost odkazů je navíc omezená. Soubory tak můžete sdílet soukromě a s jistotou, že se nezůstanou na internetu válet navždy.\nnotifyUploadEncryptDone = Váš soubor je zašifrovaný a připraven k odeslání\n# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. \'Expires after 2 downloads or 25 minutes\'\narchiveExpiryInfo = Platnost vyprší po { $downloadCount } nebo za { $timespan }\ntimespanMinutes =\n    { $num ->\n        [one] jednu minutu\n        [few] { $num } minuty\n       *[other] { $num } minut\n    }\ntimespanDays =\n    { $num ->\n        [one] jeden den\n        [few] { $num } dny\n       *[other] { $num } dní\n    }\ntimespanWeeks =\n    { $num ->\n        [one] týden\n        [few] { $num } týdny\n       *[other] { $num } týdnů\n    }\nfileCount =\n    { $num ->\n        [one] jeden soubor\n        [few] { $num } soubory\n       *[other] { $num } souborů\n    }\n# byte abbreviation\nbytes = B\n# kibibyte abbreviation\nkb = KB\n# mebibyte abbreviation\nmb = MB\n# gibibyte abbreviation\ngb = GB\n# localized number and byte abbreviation. example "2.5MB"\nfileSize = { $num } { $units }\n# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")\ntotalSize = Celková velikost: { $size }\n# the next line after the colon contains a file name\ncopyLinkDescription = Soubor můžete sdílet tímto odkazem:\ncopyLinkButton = Zkopírovat odkaz\ndownloadTitle = Stáhnout soubory\ndownloadDescription = Tento soubor byl sdílen přes { -send-brand(case: "acc") } s end-to-end šifrováním a odkazem s omezenou platností.\ntrySendDescription = Zkuste { -send-brand(case: "acc") } pro jednoduché a bezpečné sdílení souborů\n# count will always be > 10\ntooManyFiles =\n    { $count ->\n        [one] Najednou lze nahrávat jen jeden soubor.\n        [few] Najednou lze nahrávat jen { $count } soubory.\n       *[other] Najednou lze nahrávat jen { $count } souborů.\n    }\n# count will always be > 10\ntooManyArchives =\n    { $count ->\n        [one] Povolen je nejvýše jeden archiv.\n        [few] Povoleny jsou nejvýše { $count } archivy.\n       *[other] Povoleno je nejvýše { $count } archivů.\n    }\nexpiredTitle = Platnost tohoto odkazu vypršela.\nnotSupportedDescription = { -send-brand } nebude v tomto prohlížeči fungovat. Nejlépe { -send-short-brand } funguje v nejnovějším { -firefox(case: "gen") } nebo aktuálních verzích nejpoužívanějších prohlížečů.\ndownloadFirefox = Stáhnout { -firefox(case: "acc") }\nlegalTitle = Zásady { -send-short-brand(case: "acc") } pro ochranu osobních údajů\nlegalDateStamp = Verze 1.0, 12. března 2019\n# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"\nexpiresDaysHoursMinutes = { $days }d { $hours }h { $minutes }m\naddFilesButton = Vyberte soubory k nahrání\nuploadButton = Nahrát\n# the first part of the string \'Drag and drop files or click to send up to 1GB\'\ndragAndDropFiles = Přetažením myší nebo kliknutím sem\n# the second part of the string \'Drag and drop files or click to send up to 1GB\'\n# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")\norClickWithSize = můžete poslat až { $size }\naddPassword = Ochránit heslem\nemailPlaceholder = Zadejte svoji e-mailovou adresu\n# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")\nsignInSizeBump = Pro odesílání souborů o velikosti až { $size } se prosím přihlaste\nsignInOnlyButton = Přihlásit se\naccountBenefitTitle = Vytvořte si účet { -firefox(case: "gen") } nebo se přihlaste\n# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")\naccountBenefitLargeFiles = Sdílejte soubory o velikosti až { $size }\naccountBenefitDownloadCount = Sdílejte soubory s více lidmi\naccountBenefitTimeLimit =\n    { $count ->\n        [one] Odkazy platné až jeden den\n        [few] Odkazy platné až { $count } dny\n       *[other] Odkazy platné až { $count } dní\n    }\naccountBenefitSync = Správa sdílených souborů z jakéhokoliv zařízení\naccountBenefitMoz = Více informací o dalších službách od { -mozilla(case: "gen") }\nsignOut = Odhlásit se\nokButton = OK\ndownloadingTitle = Stahování\nnoStreamsWarning = Dešifrování tak velikého souboru se v tomto prohlížeči nemusí podařit.\nnoStreamsOptionCopy = Zkopírujte odkaz pro otevření v jiném prohlížeči\nnoStreamsOptionFirefox = Vyzkoušejte náš oblíbený prohlížeč\nnoStreamsOptionDownload = Pokračovat v tomto prohlížeči\ndownloadFirefoxPromo = { -send-short-brand } od aplikace { -firefox }.\n# the next line after the colon contains a file name\nshareLinkDescription = Sdílet odkaz na soubor:\nshareLinkButton = Sdílet odkaz\n# $name is the name of the file\nshareMessage = Stáhněte si soubor „{ $name }“ s { -send-brand(case: "ins") } - jednoduché a bezpečné sdílení souborů\ntrailheadPromo = Existuje způsob, jak ochránit své soukromí. Používejte Firefox.\nlearnMore = Zjistit více.\n'}}]);
//# sourceMappingURL=16.51ae2128.js.map