(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{250:function(e,n,a){"use strict";a.r(n),n.default='# Firefox Send is a brand name and should not be localized.\ntitle = Firefox Send\nsiteFeedback = Feedback\nimportingFile = A importar...\nencryptingFile = A encriptar...\ndecryptingFile = A desencriptar...\ndownloadCount =\n    { $num ->\n        [one] 1 transferência\n       *[other] { $num } transferências\n    }\ntimespanHours = 1 hora\ncopiedUrl = Copiado!\nunlockInputPlaceholder = Palavra-passe\nunlockButtonLabel = Desbloquear\ndownloadButtonLabel = Transferir\ndownloadFinish = Transferência concluída\nfileSizeProgress = ({ $partialSize } de { $totalSize })\nsendYourFilesLink = Experimentar o Firefox Send\nerrorPageHeader = Algo correu mal.\nfileTooBig = Esse ficheiro é muito grande para carregar. Deve ser menor do que { $size }.\nlinkExpiredAlt = Ligação expirada\nnotSupportedHeader = O seu navegador não é suportado.\nnotSupportedLink = Porque é que o meu navegador não é suportado?\nnotSupportedOutdatedDetail = Infelizmente esta versão do Firefox não suporta a tecnologia web que faz o Firefox Send funcionar. Precisa de atualizar o seu navegador.\nupdateFirefox = Atualizar o Firefox\ndeletePopupCancel = Cancelar\ndeleteButtonHover = Apagar\nfooterLinkLegal = Informação legal\nfooterLinkPrivacy = Privacidade\nfooterLinkCookies = Cookies\npasswordTryAgain = Palavra-passe incorreta. Tente novamente.\njavascriptRequired = O Firefox Send requer JavaScript\nwhyJavascript = Porque é que o Firefox Send requer JavaScript?\nenableJavascript = Por favor ative o JavaScript e tente novamente.\n# A short representation of a countdown timer containing the number of hours and minutes remaining as digits, example "13h 47m"\nexpiresHoursMinutes = { $hours }h { $minutes }m\n# A short representation of a countdown timer containing the number of minutes remaining as digits, example "56m"\nexpiresMinutes = { $minutes }m\n# A short status message shown when the user enters a long password\nmaxPasswordLength = Comprimento máximo de palavra-passe: { $length }\n# A short status message shown when there was an error setting the password\npasswordSetError = Esta palavra-passe não pôde ser definida\n\n## Send version 2 strings\n\n# Firefox Send, Send, Firefox, Mozilla are proper names and should not be localized\n-send-brand = Firefox Send\n-send-short-brand = Send\n-firefox = Firefox\n-mozilla = Mozilla\nintroTitle = Partilha de ficheiros simples e privada\nintroDescription = O { -send-brand } permite partilhar ficheiros com encriptação de ponta a ponta e uma ligação que expira automaticamente. Para que possa manter o que partilha privado e garantir que as suas coisas não fiquem online para sempre.\nnotifyUploadEncryptDone = O seu ficheiro está encriptado e pronto a enviar\n# downloadCount is from the downloadCount string and timespan is a timespanMinutes string. ex. \'Expires after 2 downloads or 25 minutes\'\narchiveExpiryInfo = Expira após { $downloadCount } ou { $timespan }\ntimespanMinutes =\n    { $num ->\n        [one] 1 minuto\n       *[other] { $num } minutos\n    }\ntimespanDays =\n    { $num ->\n        [one] 1 dia\n       *[other] { $num } dias\n    }\ntimespanWeeks =\n    { $num ->\n        [one] 1 semana\n       *[other] { $num } semanas\n    }\nfileCount =\n    { $num ->\n        [one] 1 ficheiro\n       *[other] { $num } ficheiros\n    }\n# byte abbreviation\nbytes = B\n# kibibyte abbreviation\nkb = KB\n# mebibyte abbreviation\nmb = MB\n# gibibyte abbreviation\ngb = GB\n# localized number and byte abbreviation. example "2.5MB"\nfileSize = { $num }{ $units }\n# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")\ntotalSize = Tamanho total: { $size }\n# the next line after the colon contains a file name\ncopyLinkDescription = Copie a ligação para partilhar o seu ficheiro:\ncopyLinkButton = Copiar ligação\ndownloadTitle = Transfira ficheiros\ndownloadDescription = Este ficheiro foi partilhado via { -send-brand } com encriptação de ponta a ponta e uma ligação que expira automaticamente.\ntrySendDescription = Experimente o { -send-brand } para uma partilha de ficheiros simples e segura.\n# count will always be > 10\ntooManyFiles =\n    { $count ->\n        [one] Apenas 1 ficheiro pode ser carregado de cada vez.\n       *[other] Apenas { $count } ficheiros podem ser carregados de cada vez.\n    }\n# count will always be > 10\ntooManyArchives =\n    { $count ->\n        [one] Apenas 1 ficheiro é permitido.\n       *[other] Apenas { $count } ficheiros são permitidos.\n    }\nexpiredTitle = Esta ligação expirou.\nnotSupportedDescription = O { -send-brand } não funciona com este navegador. O { -send-short-brand } funciona melhor com a versão mais recente do { -firefox } e irá funcionar com a versão atual da maioria dos navegadores.\ndownloadFirefox = Transferir o { -firefox }\nlegalTitle = Aviso de privacidade do { -send-short-brand }\nlegalDateStamp = Versão 1.0, de 12 de março de 2019\n# A short representation of a countdown timer containing the number of days, hours, and minutes remaining as digits, example "2d 11h 56m"\nexpiresDaysHoursMinutes = { $days }d { $hours }h { $minutes }m\naddFilesButton = Selecionar ficheiros para carregar\nuploadButton = Carregar\n# the first part of the string \'Drag and drop files or click to send up to 1GB\'\ndragAndDropFiles = Arraste e largue ficheiros\n# the second part of the string \'Drag and drop files or click to send up to 1GB\'\n# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")\norClickWithSize = ou clique para enviar até { $size }\naddPassword = Proteger com palavra-passe\nemailPlaceholder = Introduzir o seu email\n# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")\nsignInSizeBump = Iniciar sessão para enviar até { $size }\nsignInOnlyButton = Iniciar sessão\naccountBenefitTitle = Crie uma Conta { -firefox } ou inicie sessão\n# $size is the size of the file, displayed using the fileSize message as format (e.g. "2.5MB")\naccountBenefitLargeFiles = Partilhe ficheiros até { $size }\naccountBenefitDownloadCount = Partilhe ficheiros com mais pessoas\naccountBenefitTimeLimit =\n    { $count ->\n        [one] Mantenha ligações ativas até 1 dia\n       *[other] Mantenha ligações ativas até { $count } dias\n    }\naccountBenefitSync = Gira ficheiros partilhas a partir de qualquer dispositivo\naccountBenefitMoz = Saiba mais acerca de outros serviços da { -mozilla }\nsignOut = Terminar sessão\nokButton = OK\ndownloadingTitle = A transferir\nnoStreamsWarning = Este navegador pode não conseguir desencriptar um ficheiro tão grande.\nnoStreamsOptionCopy = Copie a ligação para abrir noutro navegador\nnoStreamsOptionFirefox = Experimente o nosso navegador favorito\nnoStreamsOptionDownload = Continuar com este navegador\ndownloadFirefoxPromo = O { -send-short-brand } é trazido a si pelo novo { -firefox }.\n# the next line after the colon contains a file name\nshareLinkDescription = Partilhe a ligação para o seu ficheiro:\nshareLinkButton = Partilhar ligação\n# $name is the name of the file\nshareMessage = Transferir “{ $name }“ com o { -send-brand }: partilha de ficheiros simples e segura\ntrailheadPromo = Existe uma maneira de proteger a sua privacidade. Junte-se ao Firefox.\nlearnMore = Saiba mais.\n'}}]);
//# sourceMappingURL=62.66ddbb1c.js.map