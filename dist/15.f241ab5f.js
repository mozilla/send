(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{203:function(n,i,a){"use strict";a.r(i),i.default="# Firefox Send is a brand name and should not be localized.\ntitle = Firefox Send\nsiteFeedback = Rutzijol\nimportingFile = Tajin nijik…\nencryptingFile = Tajin newäx rusik'ixik…\ndecryptingFile = Tajin netamäx rusik'ixik...\ndownloadCount =\n    { $num ->\n        [one] 1 qasanïk\n       *[other] { $num } taq qasanïk\n    }\ntimespanHours =\n    { $num ->\n        [one] 1 ramaj\n       *[other] { $num } taq ramaj\n    }\ncopiedUrl = ¡Xwachib'ëx!\nunlockInputPlaceholder = Ewan tzij\nunlockButtonLabel = Titzij chik\ndownloadButtonLabel = Tiqasäx\ndownloadFinish = Xtz'aqät qasanïk\nfileSizeProgress = ({ $partialSize } richin { $totalSize })\nsendYourFilesLink = Titojtob'ëx Firefox Send\nerrorPageHeader = ¡K'o ri man ütz ta xub'än!\nfileTooBig = Yalan nïm re yakb'äl re' richin nijotob'äx. K'o ta chi man nik'o ta chi re ri { $size }.\nlinkExpiredAlt = Xk'is ruq'ijul ri ximonel\nnotSupportedHeader = Man koch'el ta ri awokik'amaya'l.\nnotSupportedLink = ¿Achike ruma man nikoch' taq ri wokik'amaya'l?\nnotSupportedOutdatedDetail = K'ayew ruma re ruwäch Firefox re' man nuköch' ta ri ajk'amaya'l na'ob'äl nrajo' ri Firefox Send. Rajowaxik nak'ëx ri awokik'amaya'l.\nupdateFirefox = Tik'ex ri Firefox\ndeletePopupCancel = Tiq'at\ndeleteButtonHover = Tiyuj\nfooterLinkLegal = Taqanel tzijol\nfooterLinkPrivacy = Ichinanem\nfooterLinkCookies = Taq kaxlanwey\npasswordTryAgain = Itzel ri ewan tzij. Tatojtob'ej chik.\njavascriptRequired = K'atzinel JavaScript chi re ri Firefox Send\nwhyJavascript = ¿Achike ruma toq ri Firefox Send nrajo' JavaScript?\nenableJavascript = Titz'ij JavaScript richin nitojtob'ëx chik.\n# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example \"13h 47m\"\nexpiresHoursMinutes = { $hours }r { $minutes }ch\n# A short representation of a countdown timer containing the number of minutes remaining as digits, example \"56m\"\nexpiresMinutes = { $minutes }ch\n# A short status message shown when the user enters a long password\nmaxPasswordLength = Nïm raqän ewan tzij: { $length }\n# A short status message shown when there was an error setting the password\npasswordSetError = Man tikirel ta ninuk' re ewan tzij re'\n\n## Send version 2 strings\n\n# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized\n-send-brand = Firefox Send\n-send-short-brand = Titaq\n-firefox = Firefox\n-mozilla = Mozilla\nintroTitle = Kijunamaxik relik chuqa' ichinan yakb'äl\nintroDescription = { -send-brand } nuya' q'ij chawe ye'akomonij taq yakb'äl ri ewan kisik'ixik chijun chuqa' jun ximonel ri nik'is ruq'ijul pa ruyonil. Ke ri' nawichinaj ronojel ri nakomonij chuqa' yajike' chi ronojel ri  taq awachinaq man jumul ta kek'oje' pa k'amab'ey.\nnotifyUploadEncryptDone = Ewan chik rusik'ixik ri ayakb'al chuqa' ütz chik richin nitaq\n# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'\narchiveExpiryInfo = Nik'is ruq'ij chi rij { $downloadCount } o { $timespan }\ntimespanMinutes =\n    { $num ->\n        [one] 1 ch'utiramaj\n       *[other] { $num } taq ch'utiramaj\n    }\ntimespanDays =\n    { $num ->\n        [one] 1 q'ij\n       *[other] { $num } taq q'ij\n    }\ntimespanWeeks =\n    { $num ->\n        [one] 1 wuqq'ij\n       *[other] { $num } taq wuqq'ij\n    }\nfileCount =\n    { $num ->\n        [one] 1 yakb'äl\n       *[other] { $num } taq yakb'äl\n    }\n# byte abbreviation\nbytes = B\n# kibibyte abbreviation\nkb = KB\n# mebibyte abbreviation\nmb = MB\n# gibibyte abbreviation\ngb = GB\n# localized number and byte abbreviation. example \"2.5MB\"\nfileSize = { $num }{ $units }\n# $size is the size of the file, displayed using the fileSize message as format (e.g. \"2.5MB\")\ntotalSize = Ronojel runimilem: { $size }\n# the next line after the colon contains a file name\ncopyLinkDescription = Tawachib'ej ri ximonel richin nakomonij ri ayakb'al:\ncopyLinkButton = Tiwachib'ëx ximonel\ndownloadTitle = Keqasäx taq yakb'äl\ndownloadDescription = Xkomonïx re yakb'äl re' pa { -send-brand } rik'in chijun ewan rusik'ixik chuqa' nik'is ruq'ijul pa ruyonil.\ntrySendDescription = Tatojtob'ej { -send-brand } richin chanin chuqa' jikïl ye'akomonij taq yakb'äl.\n# count will always be > 10\ntooManyFiles =\n    { $count ->\n        [one] Xa xe 1 yakb'äl tikirel nijotob'äx pa ri ramaj.\n       *[other] Xa xe { $count } taq yakb'äl tikirel yejotob'äx pa ri ramaj.\n    }\n# count will always be > 10\ntooManyArchives =\n    { $count ->\n        [one] Xa xe 1 yakb'äl niya' q'ij chi re.\n       *[other] Xa xe { $count } taq yakb'äl niya' q'ij chi ke.\n    }\nexpiredTitle = Xk'is yan ruq'ij re ximonel re'.\nnotSupportedDescription = Man xtisamäj ta ri { -send-brand } rik'in re okik'amaya'l re'. Nisamäj ütz ri { -send-short-brand } rik'in ri ruk'isib'äl ruwäch { -firefox }, chuqa' xtisamäj rik'in ri ruwäch k'o wakami pa ronojel okik'amaya'l.\ndownloadFirefox = Tiqasäx { -firefox }\nlegalTitle = Rutzijol Richinanem { -send-short-brand }\nlegalDateStamp = Ruwäch 1.0, ruq'ijul marso 12, 2019\n# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example \"2d 11h 56m\"\nexpiresDaysHoursMinutes = { $days }q { $hours }r { $minutes }ch'\naddFilesButton = Kecha' taq yakb'äl richin yejotob'äx\nuploadButton = Tijotob'äx\n# the first part of the string 'Drag and drop files or click to send up to 1GB'\ndragAndDropFiles = Keqirirëx chuqa' ke'osq'opïx taq yakb'äl\n# the second part of the string 'Drag and drop files or click to send up to 1GB'\n# $size is the size of the file, displayed using the fileSize message as format (e.g. \"2.5MB\")\norClickWithSize = o tapitz'a' richin natäq k'a { $size }\naddPassword = Tichajïx rik'in ewan tzij\nemailPlaceholder = Tatz'ib'aj ataqoya'l\n# $size is the size of the file, displayed using the fileSize message as format (e.g. \"2.5MB\")\nsignInSizeBump = Tatikirisaj molojri'ïl richin natäq k'a { $size }\nsignInOnlyButton = Titikirisäx molojri'ïl\naccountBenefitTitle = Tatz'uku' jun { -firefox } Rub'i' Ataqoy'al o Tatikirisaj molojri'ïl\n# $size is the size of the file, displayed using the fileSize message as format (e.g. \"2.5MB\")\naccountBenefitLargeFiles = Ke'akomonij taq yakb'äl k'a { $size }\naccountBenefitDownloadCount = Ke'akomonij taq yakb'äl kik'in ch'aqa' chik winaqi'\naccountBenefitTimeLimit =\n    { $count ->\n        [one] Ke' atzija' ri taq ximonel chi 1 q'ij\n       *[other] Ke'atzija' ri taq ximonel chi { $count } taq q'ij\n    }\naccountBenefitSync = Ke'anuk'samajij komonin taq yakb'äl pa xab'achike okisab'äl\naccountBenefitMoz = Tawetamaj chij ch'aqa' chik { -mozilla } taq samaj\nsignOut = Titz'apïx molojri'ïl\nokButton = ÜTZ\ndownloadingTitle = Niqasäx\nnoStreamsWarning = Rik'in jub'a' re okik'amaya'l re' man nitikïr ta nretamaj rusik'ixik nima'q taq yakb'äl.\nnoStreamsOptionCopy = Tiwachib'ëx ri ximonel richin nijaq pa jun chik okik'amaya'l\nnoStreamsOptionFirefox = Tatojtob'ej ri jeb'ël qokik'amaya'l\nnoStreamsOptionDownload = Kisamäj na rik'in re okik'amaya'l re'\ndownloadFirefoxPromo = Ja ri k'ak'a' { -firefox } nusüj ri { -send-short-brand } chawe.\n# the next line after the colon contains a file name\nshareLinkDescription = Nakomonij ri ximonel rik'in ri awokisab'al:\nshareLinkButton = Tikomonïx ximonel\n# $name is the name of the file\nshareMessage = Tiqasäx \"{ $name }\" rik'in { -send-brand }: man k'ayew ta chuqa' ütz kikomonik ri yakb'äl\ntrailheadPromo = K'o jun rub'anikil richin nachajij ri awichinanem. Tatunu' awi' rik'in ri Firefox.\nlearnMore = Tetamäx ch'aqa' chik.\n"}}]);
//# sourceMappingURL=15.f241ab5f.js.map