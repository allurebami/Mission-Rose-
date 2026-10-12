const browserLanguage = (navigator.languages || [navigator.language || "fr"])
  .map((value) => value.toLowerCase().split("-")[0])
  .find((value) => ["fr", "en", "es", "pt", "ar", "sw", "de", "zh"].includes(value));
const language = browserLanguage || "fr";
const numberLocale = ({ fr: "fr-FR", en: "en-US", es: "es-ES", pt: "pt-BR", ar: "ar", sw: "sw", de: "de-DE", zh: "zh-CN" })[language];

const copy = {
  fr: {
    homeEyebrow: "Octobre Rose", sponsor: "Soutenu par ellegagne.com",
    heroTitle: "Transforme les mots qui bloquent en mots qui sauvent.",
    heroDescription: "Choisis les bons mots, évite les phrases dangereuses, réponds aux questions et tente d'entrer dans le Top 5.",
    playerLabel: "Ton pseudo", playerPlaceholder: "Ex. : RoseSourire", pseudoHint: "Choisis le pseudo qui apparaîtra dans le classement. Pas besoin d’indiquer ton vrai nom.",
    difficultyLabel: "Difficulté", easy: "Facile", medium: "Moyen", hard: "Dur",
    start: "Commencer le jeu", homeDonate: "Faire un don pour soutenir 5 femmes", shareGame: "Partager sur WhatsApp",
    bonusTitle: "Actions bonus", dailyBonusDescription: "Réclame 50 points une fois par jour. Ils seront ajoutés à ta prochaine partie.",
    claimDaily: "Réclamer +50 points", dailyAlreadyClaimed: "Bonus quotidien déjà réclamé aujourd’hui.", dailyQueued: "Bonus de 50 points réclamé. Il sera ajouté à ta prochaine partie.",
    referralTitle: "Parrainage", referralDescription: "Termine d’abord une partie pour activer ton lien. Tu gagnes 250 points quand un nouveau joueur termine une difficulté complète ; il reçoit 100 points. Ton bonus de parrainage est limité à 5 000 points.",
    referralShare: "Partager mon lien de parrainage", referralShareText: (url) => `Joue à Mission Rose et apprends les mots qui peuvent aider. Utilise mon lien : ${url}`,
    referralBonusAdded: "Bonus de parrainage ajouté : +100 points pour toi et +250 points pour ton parrain.",
    perfectLevelBonus: (points) => ` Niveau réussi sans faute : bonus de +${points} points.`,
    continueDifficultyOffer: (title) => ` Ton score sera ajouté au cumul. Continuer avec la difficulté ${title} ?`,
    levelUpOffer: (title, points) => ` Passe au niveau ${title} pour tenter de gagner jusqu’à ${points} points supplémentaires.`,
    levelUpAction: "Évoluer au niveau suivant", stopGame: "Arrêter et enregistrer mon score", finishLevel: "Terminer et afficher mon score",
    score: "Score", next: "Continuer", resultEyebrow: "Résultat final",
    resultTitle: "Bravo, tu as terminé Mission Rose.", badge: "Badge",
    badgeTitle: "Je soutiens Octobre Rose", filterTitle: "Ton filtre Mission Rose",
    filterDescription: "Prends une photo avec le filtre <strong>#NONAUCANCERDUSEINS</strong>. Elle affichera ton score et le message de sensibilisation.",
    camera: "Activer la caméra", capture: "Prendre la photo", download: "Télécharger la photo",
    leaderboard: "Top 5 mondial Mission Rose", share: "Partager mon score", donate: "Faire un don maintenant",
    restart: "Rejouer", sponsorLink: "Découvrir ellegagne.com", donationEyebrow: "Action solidaire",
    donationTitle: "Soutenir 5 femmes dans le besoin",
    donationDescription: "Les dons de Mission Rose serviront à accompagner 5 femmes dans le cadre d'Octobre Rose : consultation, dépistage, transport ou besoin urgent.",
    levelProgressAria: "Progression des niveaux", close: "Fermer",
    transparency: "Transparence : un résumé des fonds collectés et de leur répartition devra être publié à la fin de la campagne.",
    widgetLabel: (name) => `Finalise ton don ${name} avec Chariow.`,
    donationBonusAdded: (points) => `+${points} points ajoutés à ton score pour ce clic, même sans finaliser le don.`,
    donationBonusAlreadyClaimed: "Le bonus de cette catégorie a déjà été ajouté pour cette partie.",
    donationBonusQueued: (points) => `+${points} points enregistrés pour ta prochaine partie, même sans finaliser le don.`,
    answerGood: (points, explanation) => `Bonne réponse : +${points} points. ${explanation}`,
    answerBad: (explanation) => `Mauvaise réponse : ce mot bloque l'action. ${explanation}`,
    summary: (name, score) => `${name}, ton score est de ${score} points. Tu as transformé les mots qui bloquent en mots qui sauvent.`,
    rankTop: (rank) => `Tu es dans le Top 5 à la position ${rank}.`,
    rankOther: () => "Ton score ne figure pas encore dans le Top 5 mondial. Rejoue pour améliorer ton classement.",
    leaderboardLoading: "Chargement du classement mondial…", leaderboardUnavailable: "Classement mondial indisponible pour le moment. Ton score reste conservé sur cet appareil.",
    leaderboardEmpty: "Aucun score mondial pour le moment. Sois la première à jouer !",
    completedGamesCount: (count) => `${formatNumber(count)} joueurs uniques (par appareil)`, completedGamesLoading: "Chargement du nombre de joueurs…", completedGamesUnavailable: "Le nombre de joueurs est temporairement indisponible.",
    points: "pts", levelComplete: "Niveau terminé", cameraError: "La caméra n'est pas disponible. Tu peux quand même télécharger le badge sans photo.",
    shareText: (score) => `Je viens de terminer (https://mission-rose-ten.vercel.app/) Mission Rose, soutenu par ellegagne.com. Mon score : ${score} points. Et toi, peux-tu entrer dans le Top 5 ?`,
    badgeMessage: "Je soutiens Octobre Rose", badgeSentence: "Elle gagne quand elle sait. Elle gagne quand elle se protège.",
    description: "Mission Rose, un mini-jeu Octobre Rose soutenu par ellegagne.com pour apprendre les mots qui sauvent, partager son score et soutenir 5 femmes dans le besoin.",
  },
  en: {
    homeEyebrow: "Breast Cancer Awareness Month", sponsor: "Supported by ellegagne.com",
    heroTitle: "Turn words that hold us back into words that save lives.",
    heroDescription: "Choose helpful words, avoid harmful phrases, answer the questions and try to make the Top 5.",
    playerLabel: "Your nickname", playerPlaceholder: "E.g. RoseSmile", pseudoHint: "Choose the nickname shown on the leaderboard. You don’t need to enter your real name.",
    difficultyLabel: "Difficulty", easy: "Easy", medium: "Medium", hard: "Hard",
    start: "Start the game", homeDonate: "Donate to support 5 women", shareGame: "Share on WhatsApp",
    bonusTitle: "Bonus actions", dailyBonusDescription: "Claim 50 points once a day. They will be added to your next game.",
    claimDaily: "Claim +50 points", dailyAlreadyClaimed: "Today’s daily bonus has already been claimed.", dailyQueued: "50 point bonus claimed. It will be added to your next game.",
    referralTitle: "Referral", referralDescription: "Finish a game to unlock your link. Earn 250 points when a new player finishes a full difficulty; they get 100 points. Your referral bonus is capped at 5,000 points.",
    referralShare: "Share my referral link", referralShareText: (url) => `Play Mission Rose and learn words that can help. Use my link: ${url}`,
    referralBonusAdded: "Referral bonus added: +100 points for you and +250 points for your referrer.",
    perfectLevelBonus: (points) => ` Level cleared without mistakes: +${points} bonus points.`,
    continueDifficultyOffer: (title) => ` Your score will be added to the total. Continue with ${title} difficulty?`,
    levelUpOffer: (title, points) => ` Move on to ${title} for a chance to earn up to ${points} more points.`,
    levelUpAction: "Move to the next level", stopGame: "Stop and save my score", finishLevel: "Finish and show my score",
    score: "Score", next: "Continue", resultEyebrow: "Final result",
    resultTitle: "Well done! You completed Mission Rose.", badge: "Badge",
    badgeTitle: "I support Breast Cancer Awareness Month", filterTitle: "Your Mission Rose filter",
    filterDescription: "Take a photo with the <strong>#NONAUCANCERDUSEINS</strong> filter. It will show your score and an awareness message.",
    camera: "Turn on camera", capture: "Take photo", download: "Download photo",
    leaderboard: "Mission Rose Global Top 5", share: "Share my score", donate: "Donate now",
    restart: "Play again", sponsorLink: "Visit ellegagne.com", donationEyebrow: "Solidarity campaign",
    donationTitle: "Support 5 women in need",
    donationDescription: "Mission Rose donations will support 5 women during Breast Cancer Awareness Month with consultations, screening, transport or urgent needs.",
    levelProgressAria: "Level progress", close: "Close",
    transparency: "Transparency: a summary of the funds collected and how they are distributed will be published at the end of the campaign.",
    widgetLabel: (name) => `Complete your ${name} contribution with Chariow.`,
    donationBonusAdded: (points) => `+${points} points added to your score for this click, even if you don't complete the donation.`,
    donationBonusAlreadyClaimed: "This category bonus has already been added for this game.",
    donationBonusQueued: (points) => `+${points} points saved for your next game, even if you don't complete the donation.`,
    answerGood: (points, explanation) => `Correct answer: +${points} points. ${explanation}`,
    answerBad: (explanation) => `Not quite: this word can delay action. ${explanation}`,
    summary: (name, score) => `${name}, your score is ${score} points. You turned words that hold us back into words that save lives.`,
    rankTop: (rank) => `You are in the Top 5 at position ${rank}.`,
    rankOther: () => "Your score is not in the global Top 5 yet. Play again to improve your ranking.",
    leaderboardLoading: "Loading the global leaderboard…", leaderboardUnavailable: "The global leaderboard is unavailable right now. Your score is still saved on this device.",
    leaderboardEmpty: "No global scores yet. Be the first to play!",
    completedGamesCount: (count) => `${formatNumber(count)} unique players (by device)`, completedGamesLoading: "Loading player count…", completedGamesUnavailable: "The player count is temporarily unavailable.",
    points: "pts", levelComplete: "Level complete", cameraError: "The camera is unavailable. You can still download your badge without a photo.",
    shareText: (score) => `I just completed (https://mission-rose-ten.vercel.app/) Mission Rose, supported by ellegagne.com. My score: ${score} points. Can you make the Top 5?`,
    badgeMessage: "I support Breast Cancer Awareness", badgeSentence: "She wins when she knows. She wins when she protects herself.",
    description: "Mission Rose is an awareness game supported by ellegagne.com. Learn about breast health, share your score and support five women in need.",
  },
  es: {
    homeEyebrow: "Octubre Rosa", sponsor: "Con el apoyo de ellegagne.com",
    heroTitle: "Convierte las palabras que frenan en palabras que salvan.",
    heroDescription: "Elige palabras útiles, evita frases dañinas, responde las preguntas e intenta entrar en el Top 5.",
    playerLabel: "Tu apodo", playerPlaceholder: "Ej.: RosaSonriente", pseudoHint: "Elige el apodo que aparecerá en la clasificación. No hace falta indicar tu nombre real.", difficultyLabel: "Dificultad",
    easy: "Fácil", medium: "Media", hard: "Difícil", start: "Empezar el juego",
    homeDonate: "Dona para apoyar a 5 mujeres", shareGame: "Compartir por WhatsApp", score: "Puntuación", next: "Continuar",
    resultEyebrow: "Resultado final", resultTitle: "¡Enhorabuena! Has terminado Mission Rose.", badge: "Insignia",
    badgeTitle: "Apoyo Octubre Rosa", filterTitle: "Tu filtro Mission Rose",
    filterDescription: "Hazte una foto con el filtro <strong>#NONAUCANCERDUSEINS</strong>. Mostrará tu puntuación y un mensaje de sensibilización.",
    camera: "Activar cámara", capture: "Hacer foto", download: "Descargar foto", leaderboard: "Top 5 mundial Mission Rose",
    share: "Compartir mi puntuación", donate: "Donar ahora", restart: "Volver a jugar", sponsorLink: "Visitar ellegagne.com",
    donationEyebrow: "Acción solidaria", donationTitle: "Apoya a 5 mujeres que lo necesitan",
    donationDescription: "Las donaciones de Mission Rose ayudarán a 5 mujeres durante Octubre Rosa con consultas, pruebas de detección, transporte o necesidades urgentes.",
    levelProgressAria: "Progreso de niveles", close: "Cerrar",
    transparency: "Transparencia: al final de la campaña se publicará un resumen de los fondos recaudados y su distribución.",
    widgetLabel: (name) => `Completa tu aportación ${name} con Chariow.`,
    donationBonusAdded: (points) => `+${points} puntos añadidos por este clic, aunque no completes la donación.`,
    donationBonusAlreadyClaimed: "El bono de esta categoría ya se añadió en esta partida.",
    donationBonusQueued: (points) => `+${points} puntos guardados para tu próxima partida, aunque no completes la donación.`,
    answerGood: (points, explanation) => `Respuesta correcta: +${points} puntos. ${explanation}`,
    answerBad: (explanation) => `Respuesta incorrecta: esta palabra puede retrasar la acción. ${explanation}`,
    summary: (name, score) => `${name}, tu puntuación es de ${score} puntos. Convertiste palabras que frenan en palabras que salvan.`,
    rankTop: (rank) => `Estás en el Top 5 mundial, en la posición ${rank}.`, rankOther: () => "Tu puntuación aún no está en el Top 5 mundial. Vuelve a jugar para mejorar tu posición.",
    leaderboardLoading: "Cargando el ranking mundial…", leaderboardUnavailable: "El ranking mundial no está disponible ahora. Tu puntuación sigue guardada en este dispositivo.", leaderboardEmpty: "Aún no hay puntuaciones mundiales. ¡Sé la primera en jugar!", completedGamesCount: (count) => `${formatNumber(count)} jugadores únicos (por dispositivo)`, completedGamesLoading: "Cargando el número de jugadores…", completedGamesUnavailable: "El número de jugadores no está disponible temporalmente.",
    points: "pts", levelComplete: "Nivel terminado", cameraError: "La cámara no está disponible. Puedes descargar la insignia sin foto.",
    shareText: (score) => `Acabo de terminar (https://mission-rose-ten.vercel.app/) Mission Rose, con el apoyo de ellegagne.com. Mi puntuación: ${score} puntos. ¿Puedes entrar en el Top 5?`,
    badgeMessage: "Apoyo la prevención del cáncer de mama", badgeSentence: "Ella gana cuando sabe. Ella gana cuando se cuida.",
    description: "Mission Rose es un juego de sensibilización apoyado por ellegagne.com. Aprende sobre la salud mamaria, comparte tu puntuación y apoya a cinco mujeres.",
  },
  pt: {
    homeEyebrow: "Outubro Rosa", sponsor: "Apoiado por ellegagne.com",
    heroTitle: "Transforme palavras que bloqueiam em palavras que salvam.",
    heroDescription: "Escolha palavras que ajudam, evite frases prejudiciais, responda às perguntas e tente entrar no Top 5.",
    playerLabel: "Seu apelido", playerPlaceholder: "Ex.: RosaSorriso", pseudoHint: "Escolha o apelido que aparecerá no ranking. Não precisa informar seu nome verdadeiro.", difficultyLabel: "Dificuldade",
    easy: "Fácil", medium: "Média", hard: "Difícil", start: "Começar o jogo",
    homeDonate: "Doe para apoiar 5 mulheres", shareGame: "Compartilhar no WhatsApp", score: "Pontuação", next: "Continuar",
    resultEyebrow: "Resultado final", resultTitle: "Parabéns! Você concluiu o Mission Rose.", badge: "Emblema",
    badgeTitle: "Apoio o Outubro Rosa", filterTitle: "Seu filtro Mission Rose",
    filterDescription: "Tire uma foto com o filtro <strong>#NONAUCANCERDUSEINS</strong>. Ela mostrará sua pontuação e uma mensagem de conscientização.",
    camera: "Ativar câmera", capture: "Tirar foto", download: "Baixar foto", leaderboard: "Top 5 mundial Mission Rose",
    share: "Compartilhar minha pontuação", donate: "Doar agora", restart: "Jogar novamente", sponsorLink: "Visitar ellegagne.com",
    donationEyebrow: "Ação solidária", donationTitle: "Apoie 5 mulheres que precisam",
    donationDescription: "As doações do Mission Rose ajudarão 5 mulheres durante o Outubro Rosa com consultas, exames, transporte ou necessidades urgentes.",
    levelProgressAria: "Progresso dos níveis", close: "Fechar",
    transparency: "Transparência: um resumo dos valores arrecadados e da sua distribuição será publicado ao final da campanha.",
    widgetLabel: (name) => `Finalize sua contribuição ${name} com Chariow.`,
    donationBonusAdded: (points) => `+${points} pontos adicionados por este clique, mesmo sem concluir a doação.`,
    donationBonusAlreadyClaimed: "O bônus desta categoria já foi adicionado nesta partida.",
    donationBonusQueued: (points) => `+${points} pontos reservados para sua próxima partida, mesmo sem concluir a doação.`,
    answerGood: (points, explanation) => `Resposta correta: +${points} pontos. ${explanation}`,
    answerBad: (explanation) => `Resposta incorreta: esta palavra pode atrasar a ação. ${explanation}`,
    summary: (name, score) => `${name}, sua pontuação é de ${score} pontos. Você transformou palavras que bloqueiam em palavras que salvam.`,
    rankTop: (rank) => `Você está no Top 5 mundial, na posição ${rank}.`, rankOther: () => "Sua pontuação ainda não está no Top 5 mundial. Jogue novamente para melhorar sua posição.",
    leaderboardLoading: "Carregando o ranking mundial…", leaderboardUnavailable: "O ranking mundial está indisponível. Sua pontuação continua salva neste dispositivo.", leaderboardEmpty: "Ainda não há pontuações mundiais. Seja a primeira pessoa a jogar!", completedGamesCount: (count) => `${formatNumber(count)} jogadores únicos (por dispositivo)`, completedGamesLoading: "Carregando o número de jogadores…", completedGamesUnavailable: "O número de jogadores está temporariamente indisponível.",
    points: "pts", levelComplete: "Nível concluído", cameraError: "A câmera não está disponível. Você ainda pode baixar o emblema sem foto.",
    shareText: (score) => `Acabei de concluir (https://mission-rose-ten.vercel.app/) o Mission Rose, apoiado por ellegagne.com. Minha pontuação: ${score} pontos. Você consegue entrar no Top 5?`,
    badgeMessage: "Apoio a conscientização sobre o câncer de mama", badgeSentence: "Ela vence quando sabe. Ela vence quando se cuida.",
    description: "Mission Rose é um jogo de conscientização apoiado por ellegagne.com. Aprenda sobre saúde mamária, compartilhe sua pontuação e apoie cinco mulheres.",
  },
  de: {
    homeEyebrow: "Brustkrebsmonat", sponsor: "Unterstützt von ellegagne.com",
    heroTitle: "Mach aus Worten, die bremsen, Worte, die Leben retten.",
    heroDescription: "Wähle hilfreiche Worte, vermeide schädliche Aussagen, beantworte die Fragen und schaffe es vielleicht in die Top 5.",
    playerLabel: "Dein Spitzname", playerPlaceholder: "Z. B. RosenLächeln", pseudoHint: "Wähle den Namen für die Rangliste. Deinen echten Namen musst du nicht angeben.", difficultyLabel: "Schwierigkeit",
    easy: "Einfach", medium: "Mittel", hard: "Schwer", start: "Spiel starten",
    homeDonate: "Spende und unterstütze 5 Frauen", shareGame: "Auf WhatsApp teilen", score: "Punktzahl", next: "Weiter",
    resultEyebrow: "Endergebnis", resultTitle: "Glückwunsch! Du hast Mission Rose abgeschlossen.", badge: "Abzeichen",
    badgeTitle: "Ich unterstütze die Brustkrebs-Aufklärung", filterTitle: "Dein Mission-Rose-Filter",
    filterDescription: "Mach ein Foto mit dem Filter <strong>#NONAUCANCERDUSEINS</strong>. Es zeigt deine Punktzahl und eine Botschaft zur Aufklärung.",
    camera: "Kamera einschalten", capture: "Foto aufnehmen", download: "Foto herunterladen", leaderboard: "Mission Rose: Globale Top 5",
    share: "Punktzahl teilen", donate: "Jetzt spenden", restart: "Noch einmal spielen", sponsorLink: "ellegagne.com besuchen",
    donationEyebrow: "Solidaritätsaktion", donationTitle: "Unterstütze 5 Frauen in Not",
    donationDescription: "Spenden aus Mission Rose unterstützen 5 Frauen im Brustkrebsmonat, etwa bei Beratung, Früherkennung, Transport oder dringendem Bedarf.",
    levelProgressAria: "Spielfortschritt", close: "Schließen",
    transparency: "Transparenz: Eine Übersicht der gesammelten Mittel und ihrer Verteilung wird am Ende der Kampagne veröffentlicht.",
    widgetLabel: (name) => `Schließe deine ${name}-Unterstützung mit Chariow ab.`,
    donationBonusAdded: (points) => `+${points} Punkte für diesen Klick hinzugefügt, auch ohne abgeschlossene Spende.`,
    donationBonusAlreadyClaimed: "Der Bonus dieser Kategorie wurde in diesem Spiel bereits hinzugefügt.",
    donationBonusQueued: (points) => `+${points} Punkte für dein nächstes Spiel vorgemerkt, auch ohne abgeschlossene Spende.`,
    answerGood: (points, explanation) => `Richtige Antwort: +${points} Punkte. ${explanation}`,
    answerBad: (explanation) => `Nicht ganz: Dieses Wort kann zum Aufschieben führen. ${explanation}`,
    summary: (name, score) => `${name}, du hast ${score} Punkte erreicht. Du hast bremsende Worte in stärkende Worte verwandelt.`,
    rankTop: (rank) => `Du bist auf Platz ${rank} in den globalen Top 5.`, rankOther: () => "Deine Punktzahl ist noch nicht in den globalen Top 5. Spiele erneut, um deinen Rang zu verbessern.",
    leaderboardLoading: "Globale Rangliste wird geladen…", leaderboardUnavailable: "Die globale Rangliste ist gerade nicht verfügbar. Deine Punktzahl bleibt auf diesem Gerät gespeichert.", leaderboardEmpty: "Noch keine globalen Punktzahlen. Sei die erste Person, die spielt!", completedGamesCount: (count) => `${formatNumber(count)} eindeutige Spieler (pro Gerät)`, completedGamesLoading: "Spielerzahl wird geladen…", completedGamesUnavailable: "Die Spielerzahl ist vorübergehend nicht verfügbar.",
    points: "Pkt.", levelComplete: "Level abgeschlossen", cameraError: "Die Kamera ist nicht verfügbar. Du kannst dein Abzeichen auch ohne Foto herunterladen.",
    shareText: (score) => `Ich habe gerade (https://mission-rose-ten.vercel.app/) Mission Rose abgeschlossen, unterstützt von ellegagne.com. Meine Punktzahl: ${score}. Schaffst du es in die Top 5?`,
    badgeMessage: "Ich unterstütze die Brustkrebs-Aufklärung", badgeSentence: "Sie gewinnt, wenn sie Bescheid weiß und auf sich achtet.",
    description: "Mission Rose ist ein Aufklärungsspiel, unterstützt von ellegagne.com. Erfahre mehr über Brustgesundheit, teile deine Punktzahl und unterstütze fünf Frauen.",
  },
  zh: {
    homeEyebrow: "粉红十月", sponsor: "由 ellegagne.com 支持",
    heroTitle: "把阻碍行动的话语，变成守护生命的话语。",
    heroDescription: "选择有帮助的话语，避开有害表达，回答问题，争取进入前五名。",
    playerLabel: "昵称", playerPlaceholder: "例如：玫瑰微笑", pseudoHint: "选择一个用于排行榜的昵称，无需填写真实姓名。", difficultyLabel: "难度",
    easy: "简单", medium: "中等", hard: "困难", start: "开始游戏",
    homeDonate: "捐赠并帮助五位女性", shareGame: "通过 WhatsApp 分享", score: "分数", next: "继续",
    resultEyebrow: "最终结果", resultTitle: "恭喜你完成了 Mission Rose。", badge: "徽章",
    badgeTitle: "我支持乳腺健康宣传", filterTitle: "你的 Mission Rose 滤镜",
    filterDescription: "使用 <strong>#NONAUCANCERDUSEINS</strong> 滤镜拍照，照片将显示你的分数和健康宣传信息。",
    camera: "开启相机", capture: "拍照", download: "下载照片", leaderboard: "Mission Rose 全球前五名",
    share: "分享分数", donate: "立即捐赠", restart: "再玩一次", sponsorLink: "访问 ellegagne.com",
    donationEyebrow: "爱心行动", donationTitle: "帮助五位有需要的女性",
    donationDescription: "Mission Rose 的捐款将在粉红十月期间帮助五位女性支付咨询、筛查、交通或紧急需求。",
    levelProgressAria: "关卡进度", close: "关闭",
    transparency: "透明说明：活动结束后将公布筹集资金及其分配情况。",
    widgetLabel: (name) => `通过 Chariow 完成 ${name} 支持。`,
    donationBonusAdded: (points) => `本次点击已加 ${points} 分，即使没有完成捐赠也有效。`,
    donationBonusAlreadyClaimed: "本局已获得此类别的奖励。",
    donationBonusQueued: (points) => `已为你的下一局记下 ${points} 分，即使没有完成捐赠也有效。`,
    answerGood: (points, explanation) => `回答正确：+${points} 分。${explanation}`,
    answerBad: (explanation) => `回答不正确：这类说法可能延误行动。${explanation}`,
    summary: (name, score) => `${name}，你的分数是 ${score} 分。你把阻碍行动的话语变成了守护生命的话语。`,
    rankTop: (rank) => `你进入了全球前五名，目前排名第 ${rank}。`, rankOther: () => "你的分数暂未进入全球前五名。再玩一次，争取提升排名。",
    leaderboardLoading: "正在加载全球排行榜…", leaderboardUnavailable: "全球排行榜暂时无法使用。你的分数仍保存在此设备上。", leaderboardEmpty: "目前还没有全球分数。来成为第一个玩家吧！", completedGamesCount: (count) => `${formatNumber(count)} 位独立玩家（按设备统计）`, completedGamesLoading: "正在加载玩家人数…", completedGamesUnavailable: "暂时无法获取玩家人数。",
    points: "分", levelComplete: "关卡完成", cameraError: "相机无法使用。你仍可下载不含照片的徽章。",
    shareText: (score) => `我刚刚完成了 (https://mission-rose-ten.vercel.app/) Mission Rose，获得 ${score} 分。你能进入前五名吗？`,
    badgeMessage: "我支持乳腺健康宣传", badgeSentence: "了解健康知识，及时行动，守护自己。",
    description: "Mission Rose 是由 ellegagne.com 支持的健康宣传游戏。了解乳腺健康、分享分数并帮助有需要的女性。",
  },
  ar: {
    homeEyebrow: "أكتوبر الوردي", sponsor: "بدعم من ellegagne.com",
    heroTitle: "حوّلي الكلمات التي تعيقك إلى كلمات تنقذ الحياة.",
    heroDescription: "اختاري الكلمات المفيدة، وتجنبي العبارات الضارة، وأجيبي عن الأسئلة لمحاولة دخول أفضل خمسة.",
    playerLabel: "لقبك", playerPlaceholder: "مثال: ابتسامة الورد", pseudoHint: "اختر لقباً يظهر في الترتيب. لا حاجة إلى كتابة اسمك الحقيقي.", difficultyLabel: "مستوى الصعوبة",
    easy: "سهل", medium: "متوسط", hard: "صعب", start: "ابدئي اللعبة",
    homeDonate: "تبرعي لدعم خمس نساء", shareGame: "مشاركة عبر واتساب", score: "النقاط", next: "متابعة",
    resultEyebrow: "النتيجة النهائية", resultTitle: "أحسنتِ! لقد أكملتِ Mission Rose.", badge: "شارة",
    badgeTitle: "أدعم التوعية بسرطان الثدي", filterTitle: "مرشح Mission Rose الخاص بك",
    filterDescription: "التقطي صورة باستخدام مرشح <strong>#NONAUCANCERDUSEINS</strong>. ستُظهر نقاطك ورسالة توعوية.",
    camera: "تشغيل الكاميرا", capture: "التقاط الصورة", download: "تنزيل الصورة", leaderboard: "أفضل خمسة عالمياً في Mission Rose",
    share: "مشاركة نتيجتي", donate: "تبرعي الآن", restart: "العبِي مجدداً", sponsorLink: "زيارة ellegagne.com",
    donationEyebrow: "مبادرة تضامنية", donationTitle: "ادعمي خمس نساء بحاجة إلى المساعدة",
    donationDescription: "تساهم تبرعات Mission Rose في دعم خمس نساء خلال شهر التوعية، من خلال الاستشارات والفحوصات والنقل والاحتياجات العاجلة.",
    levelProgressAria: "التقدم في المراحل", close: "إغلاق",
    transparency: "الشفافية: سيُنشر في نهاية الحملة ملخص للأموال المجموعة وكيفية توزيعها.",
    widgetLabel: (name) => `أكملي مساهمة ${name} عبر Chariow.`,
    donationBonusAdded: (points) => `أُضيفت ${points} نقطة مقابل هذه النقرة، حتى دون إتمام التبرع.`,
    donationBonusAlreadyClaimed: "تمت إضافة مكافأة هذه الفئة بالفعل في هذه الجولة.",
    donationBonusQueued: (points) => `سُجلت ${points} نقطة للجولة القادمة، حتى دون إتمام التبرع.`,
    answerGood: (points, explanation) => `إجابة صحيحة: +${points} نقطة. ${explanation}`,
    answerBad: (explanation) => `إجابة غير صحيحة: قد تؤخر هذه العبارة طلب المساعدة. ${explanation}`,
    summary: (name, score) => `${name}، نتيجتك ${score} نقطة. حوّلتِ الكلمات التي تعيقك إلى كلمات تدعم الحياة.`,
    rankTop: (rank) => `أنتِ ضمن أفضل خمسة عالمياً، في المركز ${rank}.`, rankOther: () => "نتيجتك ليست ضمن أفضل خمسة عالمياً بعد. أعيدي اللعب لتحسين ترتيبك.",
    leaderboardLoading: "جارٍ تحميل الترتيب العالمي…", leaderboardUnavailable: "الترتيب العالمي غير متاح حالياً. ما زالت نتيجتك محفوظة على هذا الجهاز.", leaderboardEmpty: "لا توجد نتائج عالمية بعد. كوني أول من يلعب!", completedGamesCount: (count) => `${formatNumber(count)} لاعبون فريدون (حسب الجهاز)`, completedGamesLoading: "جارٍ تحميل عدد اللاعبين…", completedGamesUnavailable: "عدد اللاعبين غير متاح مؤقتاً.",
    points: "نقطة", levelComplete: "اكتمل المستوى", cameraError: "الكاميرا غير متاحة. يمكنك تنزيل الشارة دون صورة.",
    shareText: (score) => `أنهيت للتو (https://mission-rose-ten.vercel.app/) Mission Rose بدعم من ellegagne.com. نتيجتي: ${score} نقطة. هل يمكنك دخول أفضل خمسة؟`,
    badgeMessage: "أدعم التوعية بسرطان الثدي", badgeSentence: "تنتصر المرأة حين تعرف وحين تعتني بصحتها.",
    description: "Mission Rose لعبة توعوية بدعم من ellegagne.com. تعرّفي على صحة الثدي وشاركي نتيجتك وساعدي النساء المحتاجات.",
  },
  sw: {
    homeEyebrow: "Oktoba ya Uhamasishaji", sponsor: "Inaungwa mkono na ellegagne.com",
    heroTitle: "Badilisha maneno yanayokwamisha kuwa maneno yanayookoa maisha.",
    heroDescription: "Chagua maneno yenye msaada, epuka kauli hatari, jibu maswali na ujaribu kuingia kwenye nafasi tano za juu.",
    playerLabel: "Jina lako la utani", playerPlaceholder: "Mfano: TabasamuLaWaridi", pseudoHint: "Chagua jina litakaloonekana kwenye orodha. Huhitaji kuweka jina lako halisi.", difficultyLabel: "Kiwango cha ugumu",
    easy: "Rahisi", medium: "Wastani", hard: "Ngumu", start: "Anza mchezo",
    homeDonate: "Changia kusaidia wanawake 5", shareGame: "Shiriki kupitia WhatsApp", score: "Alama", next: "Endelea",
    resultEyebrow: "Matokeo ya mwisho", resultTitle: "Hongera! Umemaliza Mission Rose.", badge: "Beji",
    badgeTitle: "Ninaunga mkono uhamasishaji wa afya ya matiti", filterTitle: "Kichujio chako cha Mission Rose",
    filterDescription: "Piga picha ukitumia kichujio cha <strong>#NONAUCANCERDUSEINS</strong>. Picha itaonyesha alama zako na ujumbe wa uhamasishaji.",
    camera: "Washa kamera", capture: "Piga picha", download: "Pakua picha", leaderboard: "Wachezaji 5 bora duniani wa Mission Rose",
    share: "Shiriki alama zangu", donate: "Changia sasa", restart: "Cheza tena", sponsorLink: "Tembelea ellegagne.com",
    donationEyebrow: "Msaada wa pamoja", donationTitle: "Saidia wanawake 5 wenye mahitaji",
    donationDescription: "Michango ya Mission Rose itasaidia wanawake 5 wakati wa Oktoba ya uhamasishaji kwa ushauri wa afya, uchunguzi, usafiri au mahitaji ya dharura.",
    levelProgressAria: "Maendeleo ya viwango", close: "Funga",
    transparency: "Uwazi: muhtasari wa fedha zilizokusanywa na matumizi yake utachapishwa kampeni itakapokamilika.",
    widgetLabel: (name) => `Kamilisha mchango wako wa ${name} kupitia Chariow.`,
    donationBonusAdded: (points) => `+${points} alama zimeongezwa kwa kubofya huku, hata bila kukamilisha mchango.`,
    donationBonusAlreadyClaimed: "Bonasi ya aina hii imeongezwa katika mchezo huu.",
    donationBonusQueued: (points) => `+${points} alama zimehifadhiwa kwa mchezo wako ujao, hata bila kukamilisha mchango.`,
    answerGood: (points, explanation) => `Jibu sahihi: +${points} alama. ${explanation}`,
    answerBad: (explanation) => `Jibu lisilo sahihi: kauli hii inaweza kuchelewesha hatua. ${explanation}`,
    summary: (name, score) => `${name}, umepata alama ${score}. Umebadilisha maneno yanayokwamisha kuwa maneno yanayookoa.`,
    rankTop: (rank) => `Uko nafasi ya ${rank} kati ya washindi 5 bora duniani.`, rankOther: () => "Alama zako bado hazijaingia kwenye 5 bora duniani. Cheza tena ili kuboresha nafasi yako.",
    leaderboardLoading: "Inapakia orodha ya washindi duniani…", leaderboardUnavailable: "Orodha ya washindi duniani haipatikani kwa sasa. Alama zako bado zimehifadhiwa kwenye kifaa hiki.", leaderboardEmpty: "Bado hakuna alama za kimataifa. Kuwa wa kwanza kucheza!", completedGamesCount: (count) => `${formatNumber(count)} wachezaji wa kipekee (kwa kifaa)`, completedGamesLoading: "Inapakia idadi ya wachezaji…", completedGamesUnavailable: "Idadi ya wachezaji haipatikani kwa sasa.",
    points: "alama", levelComplete: "Kiwango kimekamilika", cameraError: "Kamera haipatikani. Bado unaweza kupakua beji bila picha.",
    shareText: (score) => `Nimemaliza (https://mission-rose-ten.vercel.app/) Mission Rose inayoungwa mkono na ellegagne.com. Alama zangu: ${score}. Je, unaweza kuingia kwenye 5 bora?`,
    badgeMessage: "Ninaunga mkono uhamasishaji wa afya ya matiti", badgeSentence: "Anashinda anapojua na kuchukua hatua ya kujilinda.",
    description: "Mission Rose ni mchezo wa uhamasishaji unaoungwa mkono na ellegagne.com. Jifunze kuhusu afya ya matiti na saidia wanawake.",
  },
};

function text(key) {
  return copy[language][key] ?? copy.fr[key];
}

function formatNumber(value) {
  return Number(value).toLocaleString(numberLocale);
}

function applyLanguage() {
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  document.title = "Mission Rose";
  const description = text("description");
  document.getElementById("meta-description").content = description;
  document.getElementById("og-description").content = description;
  document.getElementById("twitter-description").content = description;
  const nodes = {
    "home-eyebrow": "homeEyebrow", "sponsor-label": "sponsor", "hero-title": "heroTitle",
    "player-label": "playerLabel", "pseudo-hint": "pseudoHint",
    "hero-description": "heroDescription", "difficulty-label": "difficultyLabel",
    "difficulty-easy": "easy", "difficulty-medium": "medium", "difficulty-hard": "hard",
    "start-button": "start", "home-donate-button": "homeDonate", "home-share-label": "shareGame", "home-leaderboard-title": "leaderboard", "score-label": "score", "bonus-title": "bonusTitle",
    "daily-bonus-description": "dailyBonusDescription", "claim-daily-button": "claimDaily",
    "referral-title": "referralTitle", "referral-description": "referralDescription", "referral-share-button": "referralShare",
    "next-btn": "next", "result-eyebrow": "resultEyebrow", "result-title": "resultTitle",
    "badge-label": "badge", "badge-title": "badgeTitle", "filter-title": "filterTitle",
    "camera-btn": "camera", "capture-btn": "capture", "download-photo": "download",
    "leaderboard-title": "leaderboard", "share-button": "share", "result-donate-button": "donate",
    "restart-btn": "restart", "sponsor-link": "sponsorLink", "donation-eyebrow": "donationEyebrow",
    "donation-title": "donationTitle", "donation-description": "donationDescription",
    "transparency-note": "transparency",
    "level-message-title": "levelComplete", "level-message-btn": "next",
  };
  Object.entries(nodes).forEach(([id, key]) => {
    const node = document.getElementById(id);
    if (node) node.textContent = text(key);
  });
  document.getElementById("player-name").placeholder = text("playerPlaceholder");
  document.getElementById("filter-description").innerHTML = text("filterDescription");
  document.getElementById("level-progress-wrap").setAttribute("aria-label", text("levelProgressAria"));
  document.getElementById("close-donation").setAttribute("aria-label", text("close"));
  document.getElementById("chariow-widget").dataset.locale = language === "en" ? "en" : "fr";
}

applyLanguage();
document.getElementById("verified-ranking-note").textContent = language === "en"
  ? "Secure leaderboard: only new verified games are ranked."
  : "Classement sécurisé : seules les nouvelles parties vérifiées sont classées.";

const state = {
  player: "",
  difficulty: "easy",
  levelIndex: 0,
  roundIndex: 0,
  mistakesInLevel: 0,
  referralBonusClaimed: false,
  score: 0,
  remote: null,
  networkBusy: false,
  selected: false,
  stream: null,
  photoUrl: "",
  audioContext: null,
  donationBonusesClaimed: [],
  gameStarted: false,
  gameFinished: false,
  savedScoreId: null,
  globalScoreId: null,
  globalLeaders: [],
  totalUniquePlayers: null,
};

const screens = {
  home: document.getElementById("screen-home"),
  game: document.getElementById("screen-game"),
  result: document.getElementById("screen-result"),
};

const els = {
  form: document.getElementById("player-form"),
  claimDaily: document.getElementById("claim-daily-button"),
  dailyBonusStatus: document.getElementById("daily-bonus-status"),
  referralShare: document.getElementById("referral-share-button"),
  difficulty: document.getElementById("difficulty"),
  playerName: document.getElementById("player-name"),
  levelTitle: document.getElementById("level-title"),
  levelTheme: document.getElementById("level-theme"),
  levelInstruction: document.getElementById("level-instruction"),
  choices: document.getElementById("choices"),
  feedback: document.getElementById("feedback"),
  levelCard: document.querySelector(".level-card"),
  next: document.getElementById("next-btn"),
  score: document.getElementById("score"),
  progress: document.getElementById("progress-bar"),
  summary: document.getElementById("result-summary"),
  completedGamesCount: document.getElementById("completed-games-count"),
  leaderboard: document.getElementById("leaderboard"),
  rankMessage: document.getElementById("rank-message"),
  homeLeaderboard: document.getElementById("home-leaderboard"),
  homeGamesCount: document.getElementById("home-games-count"),
  homeLeaderboardMessage: document.getElementById("home-leaderboard-message"),
  restart: document.getElementById("restart-btn"),
  modal: document.getElementById("donation-modal"),
  chariowDonationWidget: document.getElementById("chariow-donation-widget"),
  chariowWidget: document.getElementById("chariow-widget"),
  chariowWidgetLabel: document.getElementById("chariow-widget-label"),
  levelMessageModal: document.getElementById("level-message-modal"),
  levelMessageText: document.getElementById("level-message-text"),
  levelMessageBtn: document.getElementById("level-message-btn"),
  levelMessageStop: document.getElementById("level-message-stop"),
  camera: document.getElementById("camera"),
  canvas: document.getElementById("photo-canvas"),
  cameraBtn: document.getElementById("camera-btn"),
  captureBtn: document.getElementById("capture-btn"),
  downloadPhoto: document.getElementById("download-photo"),
};

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));
  screens[name].classList.add("active");
}

function currentLevel() {
  return state.remote.level;
}

let gameQueue = Promise.resolve();
function gameRequest(action, payload = {}) {
  const task = gameQueue.then(async () => {
    state.networkBusy = true;
    const request = { action, ...payload };
    if (action !== "start") request.token = state.remote?.token;
    let result;
    try {
      for (let attempt = 0; attempt < 2; attempt += 1) {
        try {
          const response = await fetch("/api/game", {
            method: "POST", credentials: "same-origin", cache: "no-store",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request), signal: AbortSignal.timeout(30000),
          });
          result = await response.json();
          if (!response.ok) {
            const error = new Error(result.error || "Validation indisponible. Réessaie.");
            error.status = response.status;
            throw error;
          }
          break;
        } catch (error) {
          // Identical transitions can be retried safely after a lost response.
          if (attempt || action === "start" || (error.status && error.status < 500)) throw error;
        }
      }
      state.remote = result;
      state.score = result.score;
      state.difficulty = result.difficulty;
      state.levelIndex = result.levelIndex;
      state.roundIndex = result.roundIndex;
      state.mistakesInLevel = result.mistakesInLevel;
      state.donationBonusesClaimed = result.donationBonusesClaimed;
      localStorage.setItem("missionRoseAnonymousPlayerId", result.playerId);
      return result;
    } finally {
      state.networkBusy = false;
    }
  });
  gameQueue = task.catch(() => {});
  return task;
}

async function startGame(event) {
  event.preventDefault();
  if (state.networkBusy) return;
  state.player = els.playerName.value.trim().replace(/\s+/g, " ");
  if (!state.player || state.player.length > 24 || /[\u0000-\u001f\u007f]/.test(state.player)) {
    els.playerName.focus(); return;
  }
  const startButton = document.getElementById("start-button");
  const status = document.getElementById("game-status");
  startButton.disabled = true;
  status.textContent = language === "en" ? "Starting your game…" : "Préparation de ta partie…";
  const dailyKey = dailyPendingKey();
  try {
    await gameRequest("start", {
      name: state.player, difficulty: els.difficulty.value, language,
      dailyBonus: Number(localStorage.getItem(dailyKey) || 0) > 0,
      donationCategories: state.donationBonusesClaimed,
      referrerId: localStorage.getItem("missionRoseReferralSource") || null,
    });
    if (Number(localStorage.getItem(dailyKey) || 0) > 0) localStorage.setItem(dailyClaimKey(), localDateKey());
    localStorage.removeItem(dailyKey);
    state.selected = false; state.gameStarted = true; state.gameFinished = false;
    state.referralBonusClaimed = false; state.savedScoreId = null; state.globalScoreId = null;
    state.globalLeaders = [];
    status.textContent = "";
    showScreen("game"); renderRound();
  } catch (error) {
    status.textContent = error.message || "Connexion nécessaire pour démarrer une partie. Réessaie.";
  } finally { startButton.disabled = false; }
}

function renderRound() {
  const level = currentLevel();
  els.levelTitle.textContent = level.title;
  els.levelTheme.textContent = `${level.theme} · ${text(state.difficulty)}`;
  els.levelInstruction.textContent = level.instruction;
  els.score.textContent = formatNumber(state.score);
  els.feedback.textContent = ""; els.next.disabled = true; state.selected = false;
  const completedRounds = state.levelIndex * 4 + state.roundIndex;
  els.progress.style.width = `${Math.round(completedRounds / 20 * 100)}%`;
  els.choices.innerHTML = "";
  state.remote.choices.forEach(choice => {
    const button = document.createElement("button");
    button.type = "button"; button.className = "choice"; button.textContent = choice.text;
    button.addEventListener("click", () => selectChoice(button, choice));
    els.choices.appendChild(button);
  });
}

async function selectChoice(button, choice) {
  if (state.selected) return;
  state.selected = true;
  [...els.choices.children].forEach(child => { child.disabled = true; });
  try {
    const result = await gameRequest("answer", { choiceId: choice.id });
    const type = result.correct ? "good" : "bad";
    button.classList.add(type);
    els.score.textContent = formatNumber(state.score);
    playAnswerSound(type); triggerAnswerEffect(type, result.delta);
    els.feedback.textContent = result.correct
      ? text("answerGood")(formatNumber(result.delta), result.explanation)
      : text("answerBad")(result.explanation);
    els.next.disabled = false;
  } catch (error) {
    els.feedback.textContent = error.message || "Connexion interrompue. Réessaie la même réponse.";
    state.selected = false;
    [...els.choices.children].forEach(child => { child.disabled = false; });
  }
}

function getAudioContext() {
  if (!state.audioContext) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    state.audioContext = new AudioContext();
  }

  if (state.audioContext.state === "suspended") {
    state.audioContext.resume();
  }

  return state.audioContext;
}

function playTone(context, frequency, startTime, duration, type = "sine", volume = 0.08) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.02);
}

function playAnswerSound(type) {
  const context = getAudioContext();
  if (!context) return;

  const now = context.currentTime;

  if (type === "good") {
    playTone(context, 660, now, 0.11, "sine", 0.08);
    playTone(context, 880, now + 0.09, 0.13, "sine", 0.07);
    playTone(context, 1175, now + 0.18, 0.16, "triangle", 0.055);
    return;
  }

  playTone(context, 220, now, 0.15, "sawtooth", 0.055);
  playTone(context, 150, now + 0.12, 0.22, "sawtooth", 0.045);
}

function playMainDonationSound() {
  const context = getAudioContext();
  if (!context) return;

  const now = context.currentTime;
  playTone(context, 523, now, 0.12, "sine", 0.055);
  playTone(context, 659, now + 0.1, 0.12, "triangle", 0.05);
  playTone(context, 784, now + 0.2, 0.2, "sine", 0.045);
}

function playSupportActionSound() {
  const context = getAudioContext();
  if (!context) return;

  const now = context.currentTime;
  playTone(context, 1047, now, 0.08, "sine", 0.05);
  playTone(context, 784, now + 0.07, 0.1, "triangle", 0.045);
  playTone(context, 1319, now + 0.16, 0.17, "sine", 0.04);
}

function playDonationSound(category) {
  const context = getAudioContext();
  if (!context) return;

  const now = context.currentTime;
  const sounds = {
    "geste-rose": () => {
      playTone(context, 880, now, 0.1, "sine", 0.06);
      playTone(context, 1175, now + 0.1, 0.16, "sine", 0.055);
    },
    "elan-rose": () => {
      playTone(context, 659, now, 0.1, "triangle", 0.055);
      playTone(context, 784, now + 0.09, 0.1, "triangle", 0.055);
      playTone(context, 1047, now + 0.18, 0.17, "sine", 0.05);
    },
    "cercle-rose": () => {
      playTone(context, 523, now, 0.12, "sine", 0.055);
      playTone(context, 659, now + 0.07, 0.12, "sine", 0.05);
      playTone(context, 784, now + 0.14, 0.12, "triangle", 0.05);
      playTone(context, 1047, now + 0.21, 0.2, "triangle", 0.045);
    },
    "ambassadeur-rose": () => {
      playTone(context, 784, now, 0.11, "triangle", 0.055);
      playTone(context, 988, now + 0.08, 0.11, "sine", 0.05);
      playTone(context, 1175, now + 0.16, 0.11, "triangle", 0.05);
      playTone(context, 1568, now + 0.24, 0.24, "sine", 0.045);
    },
  };

  sounds[category]?.();
}

function playCameraShutterSound() {
  const context = getAudioContext();
  if (!context) return;

  const duration = 0.09;
  const buffer = context.createBuffer(1, Math.floor(context.sampleRate * duration), context.sampleRate);
  const samples = buffer.getChannelData(0);
  for (let index = 0; index < samples.length; index += 1) {
    const fade = 1 - index / samples.length;
    samples[index] = (Math.random() * 2 - 1) * fade;
  }

  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(1450, context.currentTime);
  gain.gain.setValueAtTime(0.11, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
  source.buffer = buffer;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(context.destination);
  source.start(context.currentTime);
}

function triggerAnswerEffect(type, points) {
  const effectClass = type === "good" ? "answer-good" : "answer-bad";
  const bubble = document.createElement("span");
  bubble.className = `answer-bubble ${effectClass}`;
  bubble.textContent = type === "good" ? `+${points}` : `${points}`;

  els.levelCard.classList.remove("answer-good", "answer-bad");
  els.score.parentElement.classList.remove("score-pop");
  void els.levelCard.offsetWidth;

  els.levelCard.classList.add(effectClass);
  els.score.parentElement.classList.add("score-pop");
  els.levelCard.appendChild(bubble);

  window.setTimeout(() => {
    els.levelCard.classList.remove(effectClass);
    els.score.parentElement.classList.remove("score-pop");
    bubble.remove();
  }, 850);
}

async function advanceRound() {
  try { await gameRequest("next"); renderRound(); }
  catch (error) { els.feedback.textContent = error.message; els.next.disabled = false; }
}

function nextRound() {
  if (state.networkBusy || state.remote?.phase !== "answer") return;
  els.next.disabled = true;
  if (state.roundIndex < 3) { advanceRound(); return; }
  let message = currentLevel().message;
  if (state.remote.perfectBonus) message += text("perfectLevelBonus")(formatNumber(state.remote.perfectBonus));
  if (state.levelIndex === 4) {
    const order = ["easy", "medium", "hard"];
    const nextDifficulty = order[order.indexOf(state.difficulty) + 1];
    if (nextDifficulty) {
      message += text("continueDifficultyOffer")(text(nextDifficulty));
      showLevelMessage(message, advanceRound, {
        primaryLabel: text("levelUpAction"), secondaryLabel: text("finishLevel"), onStop: finishGame,
      });
    } else showLevelMessage(message, finishGame, { primaryLabel: text("finishLevel") });
  } else {
    message += text("levelUpOffer")(state.remote.nextLevelTitle, formatNumber(state.remote.nextPossiblePoints));
    showLevelMessage(message, advanceRound, {
      primaryLabel: text("levelUpAction"), secondaryLabel: text("stopGame"), onStop: finishGame,
    });
  }
}

function showLevelMessage(message, onContinue, options = {}) {
  els.levelMessageText.textContent = message;
  els.levelMessageBtn.textContent = options.primaryLabel || text("next");
  els.levelMessageBtn.onclick = () => {
    els.levelMessageModal.hidden = true;
    onContinue();
  };
  els.levelMessageStop.hidden = !options.onStop;
  if (options.onStop) {
    els.levelMessageStop.textContent = options.secondaryLabel || text("stopGame");
    els.levelMessageStop.onclick = () => {
      els.levelMessageModal.hidden = true;
      options.onStop();
    };
  }
  els.levelMessageModal.hidden = false;
}

async function finishGame() {
  if (state.networkBusy || state.gameFinished) return;
  els.next.disabled = true;
  try {
    const result = await gameRequest("finish");
    state.gameStarted = false; state.gameFinished = true;
    state.globalScoreId = result.id; state.globalLeaders = result.leaders || [];
    state.totalUniquePlayers = result.totalUniquePlayers;
    state.referralBonusClaimed = Boolean(result.inviteeBonus);
    if (result.inviteeBonus) localStorage.removeItem("missionRoseReferralSource");
    els.progress.style.width = "100%";
    saveScore();
    localStorage.setItem("missionRoseHasCompletedGame", "1");
    initializeReferralActions();
    renderResult(); renderCompletedGamesCount(); renderHomeLeaderboard(state.globalLeaders);
    drawBadge(); showScreen("result");
    if (state.referralBonusClaimed) els.rankMessage.textContent = text("referralBonusAdded");
  } catch (error) {
    showLevelMessage(error.message || "Connexion interrompue. Réessaie.", finishGame, { primaryLabel: text("finishLevel") });
  }
}

const DAILY_BONUS_POINTS = 50;

function localDateKey() {
  const now = new Date();
  return [now.getFullYear(), String(now.getMonth() + 1).padStart(2, "0"), String(now.getDate()).padStart(2, "0")].join("-");
}

function dailyClaimKey(playerId = getAnonymousPlayerId()) {
  return `missionRoseDailyClaim:${playerId}`;
}

function dailyPendingKey(playerId = getAnonymousPlayerId()) {
  return `missionRoseDailyPending:${playerId}`;
}

function renderDailyBonusState() {
  if (!els.claimDaily || !els.dailyBonusStatus) return;
  const claimedToday = localStorage.getItem(dailyClaimKey()) === localDateKey();
  const pending = Number(localStorage.getItem(dailyPendingKey()) || 0);
  els.claimDaily.disabled = claimedToday;
  els.dailyBonusStatus.textContent = pending > 0
    ? text("dailyQueued")
    : claimedToday ? text("dailyAlreadyClaimed") : "";
}

function claimDailyBonus() {
  const key = dailyClaimKey();
  if (localStorage.getItem(key) === localDateKey()) return;
  localStorage.setItem(key, localDateKey());
  localStorage.setItem(dailyPendingKey(), String(DAILY_BONUS_POINTS));
  renderDailyBonusState();
}

function initializeReferralActions() {
  const playerId = getAnonymousPlayerId();
  const incoming = new URLSearchParams(window.location.search).get("ref") || "";
  if (/^p_[a-f0-9]{32}$/.test(incoming) && incoming !== playerId &&
      !localStorage.getItem("missionRoseReferralSource") &&
      localStorage.getItem("missionRoseHasCompletedGame") !== "1") {
    localStorage.setItem("missionRoseReferralSource", incoming);
  }

  if (localStorage.getItem("missionRoseHasCompletedGame") !== "1") {
    els.referralShare.removeAttribute("href");
    els.referralShare.setAttribute("aria-disabled", "true");
    return;
  }

  const shareUrl = new URL(window.location.href);
  shareUrl.search = "";
  shareUrl.hash = "";
  shareUrl.searchParams.set("ref", playerId);
  els.referralShare.href = `https://wa.me/?text=${encodeURIComponent(text("referralShareText")(shareUrl.toString()))}`;
  els.referralShare.setAttribute("aria-disabled", "false");
}

function getAnonymousPlayerId() {
  const storageKey = "missionRoseAnonymousPlayerId";
  const existingId = localStorage.getItem(storageKey);
  if (/^p_[a-f0-9]{32}$/.test(existingId || "")) return existingId;

  const bytes = new Uint8Array(16);
  if (window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(bytes);
  } else {
    for (let index = 0; index < bytes.length; index += 1) {
      bytes[index] = Math.floor(Math.random() * 256);
    }
  }
  const playerId = `p_${Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
  localStorage.setItem(storageKey, playerId);
  return playerId;
}

function saveScore() {
  const saved = localScores();
  state.savedScoreId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  saved.push({
    id: state.savedScoreId,
    name: state.player,
    score: state.score,
    date: new Date().toISOString(),
  });
  localStorage.setItem("missionRoseLeaders", JSON.stringify(saved));
}

function localScores() {
  try {
    const saved = JSON.parse(localStorage.getItem("missionRoseLeaders") || "[]");
    return Array.isArray(saved) ? saved.filter(item => item && typeof item === "object") : [];
  } catch { return []; }
}

function renderLeaderboardList(list, leaders) {
  list.innerHTML = "";
  leaders.slice(0, 5).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} — ${formatNumber(item.score)} ${text("points")}`;
    list.appendChild(li);
  });
}

function renderCompletedGamesCount(status = "loaded") {
  if (status === "loading") {
    els.homeGamesCount.textContent = text("completedGamesLoading");
  } else if (status === "error" || !Number.isSafeInteger(state.totalUniquePlayers)) {
    els.homeGamesCount.textContent = text("completedGamesUnavailable");
  } else {
    els.homeGamesCount.textContent = text("completedGamesCount")(state.totalUniquePlayers);
  }
}

function renderHomeLeaderboard(leaders = [], status = "loaded") {
  renderLeaderboardList(els.homeLeaderboard, leaders);
  if (status === "loading") {
    els.homeLeaderboardMessage.textContent = text("leaderboardLoading");
  } else if (status === "error") {
    els.homeLeaderboardMessage.textContent = text("leaderboardUnavailable");
  } else {
    els.homeLeaderboardMessage.textContent = leaders.length ? "" : text("leaderboardEmpty");
  }
}

async function loadHomeLeaderboard() {
  renderHomeLeaderboard([], "loading");
  renderCompletedGamesCount("loading");
  try {
    const response = await fetch("/api/leaderboard", { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("Classement mondial indisponible");
    const result = await response.json();
    state.totalUniquePlayers = result.totalUniquePlayers;
    renderCompletedGamesCount("loaded");
    renderHomeLeaderboard(result.leaders || [], "loaded");
  } catch (error) {
    console.error("Mission Rose home leaderboard could not be loaded:", error.message);
    renderCompletedGamesCount("error");
    renderHomeLeaderboard([], "error");
  }
}

function renderResult(leaders = state.globalLeaders, status = "loaded") {
  els.summary.textContent = text("summary")(state.player, formatNumber(state.score));
  if (status === "loading") {
    els.completedGamesCount.textContent = text("completedGamesLoading");
  } else if (status === "error" || !Number.isSafeInteger(state.totalUniquePlayers)) {
    els.completedGamesCount.textContent = text("completedGamesUnavailable");
  } else {
    els.completedGamesCount.textContent = text("completedGamesCount")(state.totalUniquePlayers);
  }

  renderLeaderboardList(els.leaderboard, leaders);

  if (status === "loading") {
    els.rankMessage.textContent = text("leaderboardLoading");
    return;
  }
  if (status === "error") {
    els.rankMessage.textContent = text("leaderboardUnavailable");
    return;
  }
  if (!leaders.length) {
    els.rankMessage.textContent = text("leaderboardEmpty");
    return;
  }

  const rank = leaders.findIndex((item) => item.id === state.globalScoreId) + 1;
  els.rankMessage.textContent = rank > 0
    ? text("rankTop")(rank)
    : text("rankOther")();
}

function drawBadge(videoFrame = null) {
  const ctx = els.canvas.getContext("2d");
  const width = els.canvas.width;
  const height = els.canvas.height;

  ctx.clearRect(0, 0, width, height);

  if (videoFrame) {
    const videoRatio = videoFrame.videoWidth / videoFrame.videoHeight;
    const canvasRatio = width / height;
    let sx = 0;
    let sy = 0;
    let sw = videoFrame.videoWidth;
    let sh = videoFrame.videoHeight;

    if (videoRatio > canvasRatio) {
      sw = videoFrame.videoHeight * canvasRatio;
      sx = (videoFrame.videoWidth - sw) / 2;
    } else {
      sh = videoFrame.videoWidth / canvasRatio;
      sy = (videoFrame.videoHeight - sh) / 2;
    }

    ctx.drawImage(videoFrame, sx, sy, sw, sh, 0, 0, width, height);
  } else {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#fff1f5");
    gradient.addColorStop(0.58, "#ffffff");
    gradient.addColorStop(1, "#e8fff5");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.fillStyle = "rgba(36, 19, 26, 0.48)";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#ffffff";
  roundRect(ctx, 72, 72, width - 144, 210, 36);
  ctx.fill();

  ctx.fillStyle = "#0d8f67";
  ctx.font = "700 38px Arial";
  ctx.fillText("Mission Rose", 112, 140);

  ctx.fillStyle = "#24131a";
  ctx.font = "700 34px Arial";
  ctx.fillText(text("badgeMessage"), 112, 220);

  ctx.fillStyle = "#e83e7c";
  roundRect(ctx, 72, 320, width - 144, 92, 46);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "800 44px Arial";
  ctx.textAlign = "center";
  ctx.fillText("#NONAUCANCERDUSEINS", width / 2, 380);
  ctx.textAlign = "left";

  ctx.fillStyle = "#ffffff";
  ctx.font = "800 46px Arial";
  wrapText(ctx, text("badgeSentence"), 72, 850, width - 144, 58);

  ctx.fillStyle = "#ffffff";
  roundRect(ctx, 72, 988, width - 144, 92, 46);
  ctx.fill();

  ctx.fillStyle = "#a5144f";
  ctx.font = "800 54px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`${formatNumber(state.score)} ${text("points")}`, width / 2, 1048);
  ctx.textAlign = "left";

  ctx.font = "700 30px Arial";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("ellegagne.com", 72, 1130);

  state.photoUrl = els.canvas.toDataURL("image/png");
  els.downloadPhoto.href = state.photoUrl;
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  words.forEach((word) => {
    const testLine = `${line}${word} `;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = `${word} `;
      y += lineHeight;
    } else {
      line = testLine;
    }
  });
  ctx.fillText(line, x, y);
}

async function enableCamera() {
  try {
    state.stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: false,
    });
    els.camera.srcObject = state.stream;
    els.camera.hidden = false;
    els.captureBtn.disabled = false;
  } catch (error) {
    els.captureBtn.disabled = true;
    showLevelMessage(text("cameraError"), () => {});
  }
}

function capturePhoto() {
  if (!state.stream) return;
  playCameraShutterSound();
  drawBadge(els.camera);
}

const homeShareMessages = {
  fr: "Découvre Mission Rose, le mini-jeu d’Octobre Rose. Joue, partage ton score et soutiens 5 femmes dans le besoin.",
  en: "Discover Mission Rose, a Breast Cancer Awareness Month game. Play, share your score and support five women in need.",
  es: "Descubre Mission Rose, el minijuego de Octubre Rosa. Juega, comparte tu puntuación y apoya a 5 mujeres.",
  pt: "Conheça Mission Rose, o minijogo do Outubro Rosa. Jogue, compartilhe sua pontuação e apoie 5 mulheres.",
  de: "Entdecke Mission Rose, das Spiel zum Brustkrebsmonat. Spiele mit, teile deinen Punktestand und unterstütze 5 Frauen.",
  zh: "来体验 Mission Rose 粉红十月小游戏，分享你的成绩并支持五位有需要的女性。",
  ar: "اكتشفي لعبة Mission Rose لشهر التوعية، وشاركي نتيجتك وساهمي في دعم خمس نساء.",
  sw: "Gundua mchezo wa Mission Rose wa uhamasishaji. Cheza, shiriki alama zako na usaidie wanawake 5.",
};

const homeShareLink = document.getElementById("home-share-button");
if (homeShareLink) {
  const message = `${homeShareMessages[language]} https://mission-rose-ten.vercel.app/`;
  homeShareLink.href = `https://wa.me/?text=${encodeURIComponent(message)}`;
}

function shareScore() {
  const message = text("shareText")(formatNumber(state.score));
  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

let chariowLoaded = false;
let chariowButtonObserver = null;
const chariowProducts = {
  "geste-rose": { id: "prd_gz0nbtei", label: "Geste Rose", points: 50 },
  "elan-rose": { id: "prd_3lo0zuwp", label: "Élan Rose", points: 100 },
  "cercle-rose": { id: "prd_0ub0fd3d", label: "Cercle Rose", points: 200 },
  "ambassadeur-rose": { id: "prd_hp8bw4xy", label: "Ambassadeur Rose", points: 300 },
};

function updateChariowButtonLabel() {
  const controls = document.querySelectorAll(
    "#chariow-widget button, #chariow-widget a, #chariow-widget [role='button']"
  );

  controls.forEach((control) => {
    if (control.textContent.trim().toLocaleLowerCase("fr") !== "acheter maintenant") return;
    control.textContent = "Soutenir cette action";
    control.setAttribute("aria-label", "Soutenir cette action");
  });
}

function openDonation(category = "") {
  const product = chariowProducts[category];
  els.chariowDonationWidget.hidden = !product;

  if (product) {
    els.chariowWidget.dataset.productId = product.id;
    els.chariowWidgetLabel.textContent = text("widgetLabel")(product.label);
    els.chariowWidget.dataset.locale = language === "en" ? "en" : "fr";
  }

  if (product && !chariowLoaded) {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "https://js.chariowcdn.com/v1/widget.min.css";
    document.head.appendChild(stylesheet);

    chariowButtonObserver = new MutationObserver(updateChariowButtonLabel);
    chariowButtonObserver.observe(document.body, { childList: true, subtree: true });

    const script = document.createElement("script");
    script.src = "https://js.chariowcdn.com/v1/widget.min.js";
    script.async = true;
    document.head.appendChild(script);
    chariowLoaded = true;
  }

  els.modal.hidden = false;
}

async function awardDonationClick(category) {
  const points = chariowProducts[category]?.points || 0;
  if (!points) return;
  const notice = document.getElementById("donation-bonus-note");
  if (state.donationBonusesClaimed.includes(category)) {
    notice.textContent = text("donationBonusAlreadyClaimed"); return;
  }
  if (!state.gameStarted && !state.gameFinished) {
    state.donationBonusesClaimed.push(category);
    notice.textContent = text("donationBonusQueued")(points); return;
  }
  try {
    const result = await gameRequest("bonus", { category });
    notice.textContent = text("donationBonusAdded")(result.bonusPoints);
    els.score.textContent = formatNumber(state.score);
    if (state.gameFinished) {
      state.globalLeaders = result.leaders || [];
      state.totalUniquePlayers = result.totalUniquePlayers;
      const saved = localScores();
      const entry = saved.find(item => item.id === state.savedScoreId);
      if (entry) { entry.score = state.score; localStorage.setItem("missionRoseLeaders", JSON.stringify(saved)); }
      renderResult(); renderHomeLeaderboard(state.globalLeaders); drawBadge();
    } else {
      els.score.parentElement.classList.remove("score-pop");
      void els.score.parentElement.offsetWidth;
      els.score.parentElement.classList.add("score-pop");
      window.setTimeout(() => els.score.parentElement.classList.remove("score-pop"), 850);
    }
  } catch (error) { notice.textContent = error.message; }
}

function closeDonation() {
  els.modal.hidden = true;
  els.chariowDonationWidget.hidden = true;
}

function restart() {
  if (state.networkBusy) return;
  state.remote = null;
  state.player = "";
  state.donationBonusesClaimed = [];
  state.gameStarted = false;
  state.gameFinished = false;
  state.savedScoreId = null;
  state.globalScoreId = null;
  state.globalLeaders = [];
  showScreen("home");
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("#chariow-widget button, #chariow-widget a, #chariow-widget [role='button']");
  if (target && target.textContent.trim() === "Soutenir cette action") {
    playSupportActionSound();
  }
}, true);

els.form.addEventListener("submit", startGame);
els.claimDaily.addEventListener("click", claimDailyBonus);
els.next.addEventListener("click", nextRound);
els.restart.addEventListener("click", restart);
els.cameraBtn.addEventListener("click", enableCamera);
els.captureBtn.addEventListener("click", capturePhoto);

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action], [data-category]");
  if (!target) return;

  const action = target.dataset.action;
  if (action === "share") shareScore();
  if (action === "donate") {
    playMainDonationSound();
    openDonation();
  }
  if (action === "close-donation") closeDonation();

  const category = target.dataset.category;
  if (category) {
    playDonationSound(category);
    awardDonationClick(category);
    openDonation(category);
  }
});

if (localStorage.getItem("missionRoseScoringVersion") !== "2") {
  localStorage.removeItem("missionRoseHasCompletedGame");
  localStorage.setItem("missionRoseScoringVersion", "2");
}
initializeReferralActions();
renderDailyBonusState();
loadHomeLeaderboard();
drawBadge();


const encouragementMessage = document.getElementById("encouragement-message");
const encouragementCount = document.getElementById("encouragement-count");
const encouragementSubmit = document.getElementById("encouragement-submit");
const encouragementConsent = document.getElementById("encouragement-consent");
const encouragementStatus = document.getElementById("encouragement-status");

encouragementMessage.addEventListener("input", () => {
  encouragementCount.textContent = String(encouragementMessage.value.length);
});

fetch("/api/facebook-support")
  .then((response) => response.json())
  .then((result) => {
    if (!result.configured) {
      encouragementSubmit.disabled = true;
      encouragementStatus.textContent = "La publication automatique sera disponible après la connexion de la Page Facebook.";
    }
  })
  .catch(() => {
    encouragementSubmit.disabled = true;
    encouragementStatus.textContent = "Service de publication momentanément indisponible.";
  });

encouragementSubmit.addEventListener("click", async () => {
  const message = encouragementMessage.value.trim();
  if (!state.player) {
    encouragementStatus.textContent = "Ton pseudo est nécessaire pour signer le message.";
    return;
  }
  if (!message || message.length < 10 || message.length > 280) {
    encouragementStatus.textContent = "Écris un message de 10 à 280 caractères.";
    return;
  }
  if (!encouragementConsent.checked) {
    encouragementStatus.textContent = "Confirme d’abord ton accord pour la publication publique.";
    return;
  }

  encouragementSubmit.disabled = true;
  encouragementStatus.textContent = "Publication en cours…";
  try {
    const response = await fetch("/api/facebook-support", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, pseudo: state.player, consent: true }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "La publication a échoué.");
    encouragementStatus.textContent = "Ton message a été publié. Merci pour ton soutien !";
    encouragementConsent.checked = false;
    encouragementMessage.value = "";
    encouragementCount.textContent = "0";
  } catch (error) {
    encouragementStatus.textContent = error.message || "Impossible de publier pour le moment.";
  } finally {
    encouragementSubmit.disabled = false;
  }
});

