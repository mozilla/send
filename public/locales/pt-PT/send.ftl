# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Feedback
importingFile = A importar...
encryptingFile = A encriptar...
decryptingFile = A desencriptar...
downloadCount =
    { $num ->
        [one] 1 transferência
       *[other] { $num } transferências
    }
timespanHours = 1 hora
copiedUrl = Copiado!
unlockInputPlaceholder = Palavra-passe
unlockButtonLabel = Desbloquear
downloadButtonLabel = Transferir
downloadFinish = Transferência concluída
fileSizeProgress = ({ $partialSize } de { $totalSize })
sendYourFilesLink = Experimentar o Firefox Send
errorPageHeader = Algo correu mal.
fileTooBig = Esse ficheiro é muito grande para carregar. Deve ser menor do que { $size }.
linkExpiredAlt = Ligação expirada
notSupportedHeader = O seu navegador não é suportado.
notSupportedLink = Porque é que o meu navegador não é suportado?
notSupportedOutdatedDetail = Infelizmente esta versão do Firefox não suporta a tecnologia web que faz o Firefox Send funcionar. Precisa de atualizar o seu navegador.
updateFirefox = Atualizar o Firefox
deletePopupCancel = Cancelar
deleteButtonHover = Apagar
footerLinkLegal = Informação legal
footerLinkPrivacy = Privacidade
footerLinkCookies = Cookies
passwordTryAgain = Palavra-passe incorreta. Tente novamente.
javascriptRequired = O Firefox Send requer JavaScript
whyJavascript = Porque é que o Firefox Send requer JavaScript?
enableJavascript = Por favor ative o JavaScript e tente novamente.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }h { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Comprimento máximo de palavra-passe: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Esta palavra-passe não pôde ser definida

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Partilha de ficheiros simples e privada
introDescription = O { -send-brand } permite partilhar ficheiros com encriptação de ponta a ponta e uma ligação que expira automaticamente. Para que possa manter o que partilha privado e garantir que as suas coisas não fiquem online para sempre.
notifyUploadEncryptDone = O seu ficheiro está encriptado e pronto a enviar
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Expira após { $downloadCount } ou { $timespan }
timespanMinutes =
    { $num ->
        [one] 1 minuto
       *[other] { $num } minutos
    }
timespanDays =
    { $num ->
        [one] 1 dia
       *[other] { $num } dias
    }
timespanWeeks =
    { $num ->
        [one] 1 semana
       *[other] { $num } semanas
    }
fileCount =
    { $num ->
        [one] 1 ficheiro
       *[other] { $num } ficheiros
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
totalSize = Tamanho total: { $size }
# the next line after the colon contains a file name
copyLinkDescription = Copie a ligação para partilhar o seu ficheiro:
copyLinkButton = Copiar ligação
downloadTitle = Transfira ficheiros
downloadDescription = Este ficheiro foi partilhado via { -send-brand } com encriptação de ponta a ponta e uma ligação que expira automaticamente.
trySendDescription = Experimente o { -send-brand } para uma partilha de ficheiros simples e segura.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Apenas 1 ficheiro pode ser carregado de cada vez.
       *[other] Apenas { $count } ficheiros podem ser carregados de cada vez.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Apenas 1 ficheiro é permitido.
       *[other] Apenas { $count } ficheiros são permitidos.
    }
expiredTitle = Esta ligação expirou.
notSupportedDescription = O { -send-brand } não funciona com este navegador. O { -send-short-brand } funciona melhor com a versão mais recente do { -firefox } e irá funcionar com a versão atual da maioria dos navegadores.
downloadFirefox = Transferir o { -firefox }
legalTitle = Aviso de privacidade do { -send-short-brand }
legalDateStamp = Versão 1.0, de 12 de março de 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }d { $hours }h { $minutes }m
addFilesButton = Selecionar ficheiros para carregar
uploadButton = Carregar
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Arraste e largue ficheiros
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = ou clique para enviar até { $size }
addPassword = Proteger com palavra-passe
emailPlaceholder = Introduzir o seu email
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Iniciar sessão para enviar até { $size }
signInOnlyButton = Iniciar sessão
accountBenefitTitle = Crie uma Conta { -firefox } ou inicie sessão
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Partilhe ficheiros até { $size }
accountBenefitDownloadCount = Partilhe ficheiros com mais pessoas
accountBenefitTimeLimit =
    { $count ->
        [one] Mantenha ligações ativas até 1 dia
       *[other] Mantenha ligações ativas até { $count } dias
    }
accountBenefitSync = Gira ficheiros partilhas a partir de qualquer dispositivo
accountBenefitMoz = Saiba mais acerca de outros serviços da { -mozilla }
signOut = Terminar sessão
okButton = OK
downloadingTitle = A transferir
noStreamsWarning = Este navegador pode não conseguir desencriptar um ficheiro tão grande.
noStreamsOptionCopy = Copie a ligação para abrir noutro navegador
noStreamsOptionFirefox = Experimente o nosso navegador favorito
noStreamsOptionDownload = Continuar com este navegador
downloadFirefoxPromo = O { -send-short-brand } é trazido a si pelo novo { -firefox }.
# the next line after the colon contains a file name
shareLinkDescription = Partilhe a ligação para o seu ficheiro:
shareLinkButton = Partilhar ligação
# $name is the name of the file
shareMessage = Transferir “{ $name }“ com o { -send-brand }: partilha de ficheiros simples e segura
