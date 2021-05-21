# Send is a brand name and should not be localized.
title = Send
importingFile = Tuodaan…
encryptingFile = Salataan...
decryptingFile = Puretaan salausta...
downloadCount =
    { $num ->
        [one] yhden latauksen
       *[other] { $num } latauksen
    }
timespanHours =
    { $num ->
        [one] 1 tunnin
       *[other] { $num } tunnin
    }
copiedUrl = Kopioitu!
unlockInputPlaceholder = Salasana
unlockButtonLabel = Avaa
downloadButtonLabel = Lataa
downloadFinish = Lataus valmis
fileSizeProgress = { $partialSize } / { $totalSize }
sendYourFilesLink = Kokeile Send -palvelua
errorPageHeader = Jokin meni pieleen!
fileTooBig = Tämä tiedosto on liian suuri ladattavaksi. Sen pitäisi olla pienempi kuin { $size }.
linkExpiredAlt = Linkki on vanhentunut
notSupportedHeader = Selaintasi ei tueta.
notSupportedLink = Miksi selaintani ei tueta?
notSupportedOutdatedDetail = Valitettavasti tämä Firefoxin versio ei tue Sendiä käyttävää web-tekniikkaa. Sinun on päivitettävä selaimesi.
updateFirefox = Päivitä Firefox
deletePopupCancel = Peruuta
deleteButtonHover = Poista
footerLinkLegal = Juridiset asiat
footerLinkPrivacy = Tietosuoja
footerLinkCookies = Evästeet
passwordTryAgain = Väärä salasana. Yritä uudelleen.
javascriptRequired = Firefox-Send vaatii JavaScriptin
whyJavascript = Miksi Send vaatii JavaScriptin?
enableJavascript = Ota JavaScript käyttöön ja yritä uudelleen.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours } t { $minutes } min
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes } min
# A short status message shown when the user enters a long password
maxPasswordLength = Salasanan enimmäispituus: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Tätä salasanaa ei voitu asettaa

## Send version 2 strings

# Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Helppoa ja yksityistä tiedostonjakoa
introDescription = { -send-brand } mahdollistaa tiedostojen jakamisen automaattisesti vanhenevalla linkillä. Tiedostojen jakaminen tapahtuu päästä päähän -salattuna. Näin jakamasi tiedostot pysyvät yksityisinä ja voit olla varma, etteivät lähettämäsi tiedostot pysy verkossa ikuisesti.
notifyUploadEncryptDone = Tiedosto on salattu ja valmis lähetettäväksi
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Vanhenee { $downloadCount } tai { $timespan } jälkeen
timespanMinutes =
    { $num ->
        [one] 1 minuutin
       *[other] { $num } minuutin
    }
timespanDays =
    { $num ->
        [one] 1 päivän
       *[other] { $num } päivän
    }
timespanWeeks =
    { $num ->
        [one] 1 viikon
       *[other] { $num } viikon
    }
fileCount =
    { $num ->
        [one] 1 tiedosto
       *[other] { $num } tiedostoa
    }
# byte abbreviation
bytes = t
# kibibyte abbreviation
kb = kt
# mebibyte abbreviation
mb = Mt
# gibibyte abbreviation
gb = Gt
# localized number and byte abbreviation. example "2.5MB"
fileSize = { $num } { $units }
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
totalSize = Koko yhteensä: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Kopioi linkki jakaaksesi tiedoston:
copyLinkButton = Kopioi linkki
downloadTitle = Lataa tiedostot
downloadDescription = Tämä tiedosto jaettiin { -send-brand } -palvelun kautta päästä päähän -salattuna ja automaattisesti vanhenevalla linkillä.
trySendDescription = Kokeile { -send-brand } -palvelua jakaaksesi tiedostoja helposti ja turvallisesti.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Vain 1 tiedosto on mahdollistaa lähettää kerralla.
       *[other] Vain { $count } tiedostoa on mahdollista lähettää kerralla.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Vain 1 arkisto on sallittu.
       *[other] Vain { $count } arkistoa on sallittu.
    }
expiredTitle = Tämä linkki on vanhentunut.
notSupportedDescription = { -send-brand } ei toimi tällä selaimella. { -send-short-brand } toimii parhaiten { -firefox }in uusimmalla versiolla, ja toimii useimpien selainten uusimmilla versioilla.
downloadFirefox = Lataa { -firefox }
legalTitle = { -send-short-brand }-yksityisyyskäytäntö
legalDateStamp = Versio 1.0, päivätty 13. maaliskuuta 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days } pv { $hours } t { $minutes } min
addFilesButton = Valitse lähetettävät tiedostot
trustWarningMessage = Varmista, että luotat vastaanottajaan jakaessasi arkaluontoisia tietoja.
uploadButton = Lähetä
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Vedä ja pudota tiedostot
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = tai napsauta lähettääksesi tiedostoja, joiden koko voi olla enintään { $size }
addPassword = Suojaa salasanalla
emailPlaceholder = Kirjoita sähköpostiosoitteesi
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Kirjautumalla voit lähettää jopa { $size } kokoisia tiedostoja
signInOnlyButton = Kirjaudu sisään
accountBenefitTitle = Luo { -firefox }-tili tai kirjaudu sisään
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Jaa jopa { $size } kokoisia tiedostoja
accountBenefitDownloadCount = Jaa tiedostoja useamman ihmisen kesken
accountBenefitTimeLimit =
    { $count ->
        [one] Säilytä linkit aktiivisina 1 päivän ajan
       *[other] Säilytä linkit aktiivisina { $count } päivän ajan
    }
accountBenefitSync = Hallitse jaettuja tiedostoja miltä tahansa laitteelta
accountBenefitMoz = Lue lisää muista { -mozilla }-palveluista
signOut = Kirjaudu ulos
okButton = OK
downloadingTitle = Ladataan
noStreamsWarning = Tämä selain ei välttämättä osaa purkaa salausta näin suurikokoisista tiedostoista.
noStreamsOptionCopy = Kopioi linkki avataksesi sen toisessa selaimessa
noStreamsOptionFirefox = Kokeile suosikkiselaintamme
noStreamsOptionDownload = Jatka tällä selaimella
downloadFirefoxPromo = { -send-short-brand } on olemassa kiitos uuden { -firefox }in.
# the next line after the colon contains a file name
shareLinkDescription = Jaa linkki tiedostoosi:
shareLinkButton = Jaa linkki
# $name is the name of the file
shareMessage = Lataa tiedosto ”{ $name }” { -send-brand } -palvelusta: yksinkertaista ja turvallista tiedostonjakoa
trailheadPromo = On tapa suojata yksityisyyttään. Liity Firefoxiin.
learnMore = Lue lisää.
downloadFlagged = Tämä linkki on poistettu käytöstä palvelun käyttöehtojen rikkomisen vuoksi.
downloadConfirmTitle = Vielä yksi asia
downloadConfirmDescription = Varmista, että luotat sinulle tämän tiedoston lähettäneeseen henkilöön, koska emme voi vahvistaa, ettei kyseinen tiedosto vahingoita laitettasi.
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
downloadTrustCheckbox =
    { $count ->
        [one] Luotan henkilöön, joka lähetti tämän tiedoston
       *[other] Luotan henkilöön, joka lähetti nämä tiedostot
    }
# This string has a special case for '1' and [other] (default). If necessary for
# your language, you can add {$count} to your translations and use the
# standard CLDR forms, or only use the form for [other] if both strings should
# be identical.
reportFile =
    { $count ->
        [one] Ilmoita tämä tiedosto epäilyttävänä
       *[other] Ilmoita nämä tiedostot epäilyttävinä
    }
reportDescription = Auta meitä ymmärtämään mitä tapahtuu. Mikä on mielestäsi vialla näissä tiedostoissa?
reportUnknownDescription = Siirry sen linkin osoitteeseen, josta haluat tehdä ilmoituksen, ja napsauta “{ reportFile }”.
reportButton = Ilmoita
reportReasonMalware = Nämä tiedostot sisältävät haittaohjelmia tai ovat osa tietojenkalasteluhyökkäystä.
reportReasonPii = Nämä tiedostot sisältävät henkilökohtaisia tietoja minusta.
reportReasonAbuse = Nämä tiedostot sisältävät laitonta tai loukkaavaa sisältöä.
reportReasonCopyright = Ilmoita tekijänoikeuksien tai tavaramerkkien loukkauksista <a>tällä sivulla</a> kuvatun prosessin mukaisesti.
reportedTitle = Tiedostot ilmoitettu
reportedDescription = Kiitos. Olemme vastaanottaneet raporttisi näistä tiedostoista.
