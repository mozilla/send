# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Votre avis
importingFile = Importation…
encryptingFile = Chiffrement…
decryptingFile = Déchiffrement…
downloadCount =
    { $num ->
        [one] 1 téléchargement
       *[other] { $num } téléchargements
    }
timespanHours =
    { $num ->
        [one] 1 heure
       *[other] { $num } heures
    }
copiedUrl = Lien copié !
unlockInputPlaceholder = Mot de passe
unlockButtonLabel = Déverrouiller
downloadButtonLabel = Télécharger
downloadFinish = Téléchargement terminé
fileSizeProgress = ({ $partialSize } sur { $totalSize })
sendYourFilesLink = Essayer Firefox Send
errorPageHeader = Une erreur s’est produite.
fileTooBig = Ce fichier est trop volumineux pour être envoyé. Sa taille doit être inférieure à { $size }.
linkExpiredAlt = Le lien a expiré
notSupportedHeader = Votre navigateur n’est pas pris en charge.
notSupportedLink = Pourquoi mon navigateur n’est-il pas pris en charge ?
notSupportedOutdatedDetail = Malheureusement, cette version de Firefox ne prend pas en charge les technologies web utilisées par Firefox Send. Vous devez mettre à jour votre navigateur.
updateFirefox = Mettre à jour Firefox
deletePopupCancel = Annuler
deleteButtonHover = Supprimer
footerLinkLegal = Mentions légales
footerLinkPrivacy = Confidentialité
footerLinkCookies = Cookies
passwordTryAgain = Mot de passe incorrect. Veuillez réessayer.
javascriptRequired = Firefox Send nécessite JavaScript
whyJavascript = Pourquoi Firefox Send nécessite-t-il JavaScript ?
enableJavascript = Veuillez activer JavaScript puis réessayer.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours } h { $minutes } min
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes } min
# A short status message shown when the user enters a long password
maxPasswordLength = Longueur maximale du mot de passe : { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Ce mot de passe n’a pas pu être défini

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Partage de fichiers simple et privé
introDescription = { -send-brand } vous permet de partager des fichiers chiffrés de bout en bout ainsi qu’un lien qui expire automatiquement. Ainsi, vous pouvez garder ce que vous partagez en privé et vous assurer que vos contenus ne restent pas en ligne pour toujours.
notifyUploadEncryptDone = Votre fichier est chiffré et prêt à l’envoi
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Expire après { $downloadCount } ou { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 minute
       *[other] { $num } minutes
    }
timespanDays =
    { $num ->
        [one] 1 jour
       *[other] { $num } jours
    }
timespanWeeks =
    { $num ->
        [one] 1 semaine
       *[other] { $num } semaines
    }
fileCount =
    { $num ->
        [one] 1 fichier
       *[other] { $num } fichiers
    }
# size is a localized number followed by a unit of bytes, ex. 2.5GB
totalSize = Taille totale : { $size }
# the next line after the colon contains a file name
copyLinkDescription = Copiez le lien pour partager votre fichier :
copyLinkButton = Copier le lien
downloadTitle = Télécharger les fichiers
downloadDescription = Ce fichier a été partagé via { -send-brand } avec un chiffrement de bout en bout et un lien qui expire automatiquement.
trySendDescription = Essayez { -send-brand } pour un partage de fichiers simple et sécurisé.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Un seul fichier peut être envoyé à la fois.
       *[other] Seuls { $count } fichiers peuvent être envoyés à la fois.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Une seule archive est autorisée.
       *[other] Seules { $count } archives sont autorisées.
    }
expiredTitle = Ce lien a expiré.
notSupportedDescription = { -send-brand } ne fonctionnera pas avec ce navigateur. { -send-short-brand } fonctionne mieux avec la dernière version de { -firefox } et fonctionnera avec la dernière version de la plupart des navigateurs.
downloadFirefox = Télécharger { -firefox }
legalTitle = Politique de confidentialité de { -send-short-brand }
legalDateStamp = Version 1.0 du 12 mars 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days } j { $hours } h { $minutes } min
addFilesButton = Sélectionnez des fichiers à envoyer
uploadButton = Envoyer
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Glissez-déposez des fichiers
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# size is a localized number followed by a unit of bytes, ex. 2.5GB
orClickWithSize = ou cliquez pour envoyer jusqu’à { $size }
addPassword = Protéger par mot de passe
emailPlaceholder = Votre adresse électronique
# size is a localized number followed by a unit of bytes, ex. 2.5GB
signInSizeBump = Connectez-vous pour envoyer jusqu’à { $size }
signInButton = Se connecter/S’inscrire
accountBenefitTitle = Créez un compte { -firefox } ou connectez-vous
# size is a localized number followed by a unit of bytes, ex. 2.5GB
accountBenefitLargeFiles = Partagez des fichiers jusqu’à { $size }
accountBenefitDownloadCount = Partagez des fichiers avec davantage de personnes
accountBenefitTimeLimit =
    { $count ->
        [one] Maintenez les liens actifs jusqu’à 1 journée
       *[other] Maintenez les liens actifs jusqu’à { $count } jours
    }
accountBenefitSync = Gérez les fichiers partagés à partir de n’importe quel appareil
accountBenefitMoz = Apprenez-en davantage sur les autres services { -mozilla }
signOut = Se déconnecter
okButton = OK
downloadingTitle = Téléchargement en cours
noStreamsWarning = Ce navigateur pourrait ne pas être en mesure de déchiffrer un fichier aussi volumineux.
noStreamsOptionCopy = Copiez le lien pour l’ouvrir dans un autre navigateur
noStreamsOptionFirefox = Essayez notre navigateur préféré
noStreamsOptionDownload = Continuer avec ce navigateur
