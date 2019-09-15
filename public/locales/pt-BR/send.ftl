# Firefox Send is a brand name and should not be localized.
title = Firefox Send
siteFeedback = Opinião
importingFile = Importando…
encryptingFile = Criptografando…
decryptingFile = Descriptografando…
downloadCount =
    { $num ->
        [one] 1 download
       *[other] { $num } downloads
    }
timespanHours =
    { $num ->
        [one] 1 hora
       *[other] { $num } horas
    }
copiedUrl = Copiado!
unlockInputPlaceholder = Senha
unlockButtonLabel = Desbloquear
downloadButtonLabel = Baixar
downloadFinish = Download concluído
fileSizeProgress = ({ $partialSize } de { $totalSize })
sendYourFilesLink = Experimente o Firefox Send
errorPageHeader = Oops, ocorreu um erro!
fileTooBig = Esse arquivo ou grupo de arquivos é grande demais para ser enviado. Deve ser menor que { $size }.
linkExpiredAlt = Link expirou
notSupportedHeader = Seu navegador não é suportado.
notSupportedLink = Por que meu navegador não é suportado?
notSupportedOutdatedDetail = Infelizmente essa versão do Firefox não suporta a tecnologia web que faz o Firefox Send funcionar. Você precisa atualizar o seu navegador.
updateFirefox = Atualizar o Firefox
deletePopupCancel = Cancelar
deleteButtonHover = Remover da lista
footerLinkLegal = Jurídico
footerLinkPrivacy = Privacidade
footerLinkCookies = Cookies
passwordTryAgain = Senha incorreta. Tente novamente.
javascriptRequired = O Firefox Send requer JavaScript
whyJavascript = Por que o Firefox Send precisa do JavaScript?
enableJavascript = Habilite o JavaScript e tente novamente.
# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"
expiresHoursMinutes = { $hours }h { $minutes }m
# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"
expiresMinutes = { $minutes }m
# A short status message shown when the user enters a long password
maxPasswordLength = Tamanho máximo da senha: { $length }
# A short status message shown when there was an error setting the password
passwordSetError = Essa senha não pôde ser definida

## Send version 2 strings

# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized
-send-brand = Firefox Send
-send-short-brand = Send
-firefox = Firefox
-mozilla = Mozilla
introTitle = Compartilhamento de arquivos fácil e privativo
introDescription = O { -send-brand } permite compartilhar arquivos com criptografia de ponta a ponta e um link que expira automaticamente. Assim você pode manter o que compartilha privativo e ter certeza que suas coisas não ficarão online para sempre.
notifyUploadEncryptDone = Seu arquivo foi criptografado e está pronto para ser enviado
# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. 'Expires after 2 downloads or 25 minutes'
archiveExpiryInfo = Expirar após { $downloadCount } ou { $timespan }
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
        [one] 1 arquivo
       *[other] { $num } arquivos
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
copyLinkDescription = Copie o link para compartilhar seu arquivo:
copyLinkButton = Copiar link
downloadTitle = Baixar arquivos
downloadDescription = Este arquivo foi compartilhado via { -send-brand } com criptografia de ponta a ponta e um link que expira automaticamente.
trySendDescription = Experimente o { -send-brand } para compartilhamento de arquivos simples e seguro.
# count will always be > 10
tooManyFiles =
    { $count ->
        [one] Somente 1 arquivo pode ser enviado por vez.
       *[other] Somente { $count } arquivos podem ser enviados por vez.
    }
# count will always be > 10
tooManyArchives =
    { $count ->
        [one] Só é permitido 1 pacote.
       *[other] Só são permitidos { $count } pacotes.
    }
expiredTitle = Este link expirou.
notSupportedDescription = O { -send-brand } não funciona com este navegador. O { -send-short-brand } funciona melhor com a versão mais recente do { -firefox } e funcionará com a versão atual da maioria dos navegadores.
downloadFirefox = Baixar o { -firefox }
legalTitle = Aviso de privacidade do { -send-short-brand }
legalDateStamp = Versão 1.0, de 12 de março de 2019
# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"
expiresDaysHoursMinutes = { $days }d { $hours }h { $minutes }m
addFilesButton = Selecionar arquivos para enviar
uploadButton = Enviar
# the first part of the string 'Drag and drop files or click to send up to 1GB'
dragAndDropFiles = Arraste e solte arquivos
# the second part of the string 'Drag and drop files or click to send up to 1GB'
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
orClickWithSize = ou clique para enviar até { $size }
addPassword = Proteger com senha
emailPlaceholder = Informe seu e-mail
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
signInSizeBump = Entre na sua conta para enviar até { $size }
signInOnlyButton = Entrar
accountBenefitTitle = Crie uma Conta { -firefox } ou entre se já tiver
# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")
accountBenefitLargeFiles = Compartilhe arquivos até { $size }.
accountBenefitDownloadCount = Compartilhe arquivos com mais pessoas.
accountBenefitTimeLimit =
    { $count ->
        [one] Mantenha links ativos por até 1 dia.
       *[other] Mantenha links ativos por até { $count } dias.
    }
accountBenefitSync = Gerencie arquivos compartilhados a partir de qualquer dispositivo.
accountBenefitMoz = Conheça outros serviços da { -mozilla }.
signOut = Sair
okButton = OK
downloadingTitle = Baixando
noStreamsWarning = Este navegador pode não conseguir descriptografar um arquivo tão grande.
noStreamsOptionCopy = Copiar o link para abrir em outro navegador
noStreamsOptionFirefox = Experimente nosso navegador preferido
noStreamsOptionDownload = Continuar com este navegador
downloadFirefoxPromo = O { -send-short-brand } é apresentado pelo novo { -firefox }.
# the next line after the colon contains a file name
shareLinkDescription = Compartilhe o link para o seu arquivo:
shareLinkButton = Compartilhar link
# $name is the name of the file
shareMessage = Baixe "{ $name }" com o { -send-brand }: compartilhamento de arquivos simples e seguro
trailheadPromo = Existe um meio de proteger sua privacidade. Use o Firefox.
learnMore = Saiba mais.
