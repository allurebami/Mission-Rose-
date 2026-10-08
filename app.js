const levels = [
  {
    title: "Niveau 1 : Le silence",
    theme: "Apprendre à parler",
    instruction: "Choisis les mots qui aident une femme à parler de sa santé.",
    good: ["Parole", "Confiance", "Écoute", "Soutien"],
    bad: ["Silence", "Honte", "Tabou", "Cache ça"],
    message: "Parler d'un changement inhabituel peut être le premier pas vers la protection.",
  },
  {
    title: "Niveau 2 : La peur",
    theme: "Transformer la peur en action",
    instruction: "Remplace les phrases qui bloquent par celles qui poussent à agir.",
    good: ["Je vérifie", "Je consulte", "Je m'informe", "Je demande conseil"],
    bad: ["Je vais attendre", "Je préfère ignorer", "Ça va passer", "Je ne veux pas savoir"],
    message: "La peur ne doit pas bloquer l'action. Consulter tôt peut sauver.",
  },
  {
    title: "Niveau 3 : Les fausses croyances",
    theme: "Combattre les rumeurs",
    instruction: "Garde les mots fiables et évite les idées qui retardent la consultation.",
    good: ["Information", "Médecin", "Dépistage", "Source fiable"],
    bad: ["Rumeur", "On dit que", "Remède miracle", "Malédiction"],
    message: "Une bonne information vaut mieux qu'une rumeur qui retarde une consultation.",
  },
  {
    title: "Niveau 4 : Le corps parle",
    theme: "Reconnaître les signaux",
    instruction: "Choisis les bons gestes quand le corps envoie un signal inhabituel.",
    good: ["Observer", "Vérifier", "Signaler", "Consulter"],
    bad: ["Ignorer", "Cacher", "Reporter", "Minimiser"],
    message: "Un changement inhabituel mérite de l'attention. Observer son corps, c'est se respecter.",
  },
  {
    title: "Niveau 5 : Elle gagne",
    theme: "Passer à l'action",
    instruction: "Sélectionne les mots qui donnent de la force et protègent la vie.",
    good: ["Vie", "Santé", "Action", "Dépistage"],
    bad: ["Seule", "Retard", "Découragement", "Silence"],
    message: "Elle gagne quand elle sait. Elle gagne quand elle parle. Elle gagne quand elle se protège.",
  },
];

const difficultyConfig = {
  easy: { label: "Facile", multiplier: 1, rounds: 4 },
  medium: { label: "Moyen", multiplier: 1.5, rounds: 5 },
  hard: { label: "Dur", multiplier: 2, rounds: 6 },
};

const explanations = {
  "Parole": "Parler permet de demander de l'aide au bon moment.",
  "Confiance": "La confiance aide à sortir de la peur et à agir.",
  "Écoute": "Être écoutée peut encourager une femme à consulter.",
  "Soutien": "Le soutien rend la démarche de santé moins lourde.",
  "Silence": "Le silence peut retarder une consultation importante.",
  "Honte": "La honte ne doit jamais passer avant la santé.",
  "Tabou": "Un sujet tabou empêche souvent de chercher de l'aide.",
  "Cache ça": "Cacher un signe inhabituel peut faire perdre du temps.",
  "Je vérifie": "Vérifier tôt permet d'être rassurée ou prise en charge.",
  "Je consulte": "Consulter reste le bon réflexe face à un signe inhabituel.",
  "Je m'informe": "Une information fiable aide à prendre une bonne décision.",
  "Je demande conseil": "Demander conseil peut ouvrir la porte à une solution.",
  "Je vais attendre": "Attendre peut laisser évoluer un problème évitable.",
  "Je préfère ignorer": "Ignorer un signe ne le fait pas disparaître.",
  "Ça va passer": "Penser que tout va passer peut retarder l'action.",
  "Je ne veux pas savoir": "Savoir tôt peut sauver et rassurer.",
  "Information": "L'information fiable protège contre les mauvaises décisions.",
  "Médecin": "Un professionnel de santé peut orienter correctement.",
  "Dépistage": "Le dépistage précoce augmente les chances d'agir à temps.",
  "Source fiable": "Une source fiable vaut mieux qu'une rumeur.",
  "Rumeur": "Une rumeur peut éloigner d'une vraie solution médicale.",
  "On dit que": "Les approximations peuvent créer de la peur inutile.",
  "Remède miracle": "Un remède miracle peut retarder une prise en charge sérieuse.",
  "Malédiction": "La maladie doit être comprise avec des faits, pas avec la peur.",
  "Observer": "Observer son corps aide à remarquer un changement.",
  "Vérifier": "Vérifier rapidement permet de ne pas rester dans le doute.",
  "Signaler": "Signaler un changement aide à être accompagnée.",
  "Consulter": "Consulter permet d'avoir un avis médical clair.",
  "Ignorer": "Ignorer un signal peut empêcher une action rapide.",
  "Cacher": "Cacher un problème isole et retarde l'aide.",
  "Reporter": "Reporter une consultation peut faire perdre un temps précieux.",
  "Minimiser": "Minimiser un signal peut empêcher de se protéger.",
  "Vie": "La vie mérite d'être protégée par des gestes simples.",
  "Santé": "La santé doit rester prioritaire face à la peur.",
  "Action": "Agir tôt peut changer l'issue d'une situation.",
  "Seule": "Personne ne devrait affronter cette peur seule.",
  "Retard": "Le retard est dangereux quand un signe apparaît.",
  "Découragement": "Le découragement bloque l'action et l'espoir.",
};

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
    playerLabel: "Ton nom ou pseudo", playerPlaceholder: "Ex : Grâce M.",
    difficultyLabel: "Difficulté", easy: "Facile", medium: "Moyen", hard: "Dur",
    start: "Commencer le jeu", homeDonate: "Faire un don pour soutenir 5 femmes",
    score: "Score", next: "Continuer", resultEyebrow: "Résultat final",
    resultTitle: "Bravo, tu as terminé Mission Rose.", badge: "Badge",
    badgeTitle: "Je soutiens Octobre Rose", filterTitle: "Ton filtre Mission Rose",
    filterDescription: "Prends une photo avec le filtre <strong>#NONAUCANCERDUSEINS</strong>. Elle affichera ton score et le message de sensibilisation.",
    camera: "Activer la caméra", capture: "Prendre la photo", download: "Télécharger la photo",
    leaderboard: "Top 5 mondial Mission Rose", share: "Partager mon score", donate: "Faire un don maintenant",
    restart: "Rejouer", sponsorLink: "Découvrir ellegagne.com", donationEyebrow: "Action solidaire",
    donationTitle: "Soutenir 5 femmes dans le besoin",
    donationDescription: "Les dons de Mission Rose serviront à accompagner 5 femmes dans le cadre d'Octobre Rose : consultation, dépistage, transport ou besoin urgent.",
    progressLabel: "Collecte en cours", totalTitle: "Ensemble, chaque geste compte",
    totalLoading: "Chargement…", totalNote: "Total des dons confirmés via Chariow.",
    totalUpdated: "Total des dons confirmés via Chariow · Actualisé automatiquement.",
    totalUnavailable: "Indisponible", totalError: "Le total des dons sera affiché dès que la connexion Chariow sera active.",
    progressAria: "Collecte solidaire en cours, sans objectif fixé",
    levelProgressAria: "Progression des niveaux", close: "Fermer",
    transparency: "Transparence : un résumé des fonds collectés et de leur répartition devra être publié à la fin de la campagne.",
    widgetLabel: (name) => `Finalise ton don ${name} avec Chariow.`,
    donationBonusAdded: (points) => `+${points} points ajoutés à ton score pour ce clic, même sans finaliser le don.`,
    donationBonusQueued: (points) => `+${points} points enregistrés pour ta prochaine partie, même sans finaliser le don.`,
    answerGood: (points, explanation) => `Bonne réponse : +${points} points. ${explanation}`,
    answerBad: (explanation) => `Mauvaise réponse : ce mot bloque l'action. ${explanation}`,
    summary: (name, score) => `${name}, ton score est de ${score} points. Tu as transformé les mots qui bloquent en mots qui sauvent.`,
    rankTop: (rank) => `Tu es dans le Top 5 à la position ${rank}.`,
    rankOther: () => "Ton score ne figure pas encore dans le Top 5 mondial. Rejoue pour améliorer ton classement.",
    leaderboardLoading: "Chargement du classement mondial…", leaderboardUnavailable: "Classement mondial indisponible pour le moment. Ton score reste conservé sur cet appareil.",
    leaderboardEmpty: "Aucun score mondial pour le moment. Sois la première à jouer !",
    points: "pts", levelComplete: "Niveau terminé", cameraError: "La caméra n'est pas disponible. Tu peux quand même télécharger le badge sans photo.",
    shareText: (score) => `Je viens de terminer Mission Rose, soutenu par ellegagne.com. Mon score : ${score} points. Et toi, peux-tu entrer dans le Top 5 ?`,
    badgeMessage: "Je soutiens Octobre Rose", badgeSentence: "Elle gagne quand elle sait. Elle gagne quand elle se protège.",
    description: "Mission Rose, un mini-jeu Octobre Rose soutenu par ellegagne.com pour apprendre les mots qui sauvent, partager son score et soutenir 5 femmes dans le besoin.",
  },
  en: {
    homeEyebrow: "Breast Cancer Awareness Month", sponsor: "Supported by ellegagne.com",
    heroTitle: "Turn words that hold us back into words that save lives.",
    heroDescription: "Choose helpful words, avoid harmful phrases, answer the questions and try to make the Top 5.",
    playerLabel: "Your name or nickname", playerPlaceholder: "E.g. Grace M.",
    difficultyLabel: "Difficulty", easy: "Easy", medium: "Medium", hard: "Hard",
    start: "Start the game", homeDonate: "Donate to support 5 women",
    score: "Score", next: "Continue", resultEyebrow: "Final result",
    resultTitle: "Well done! You completed Mission Rose.", badge: "Badge",
    badgeTitle: "I support Breast Cancer Awareness Month", filterTitle: "Your Mission Rose filter",
    filterDescription: "Take a photo with the <strong>#NONAUCANCERDUSEINS</strong> filter. It will show your score and an awareness message.",
    camera: "Turn on camera", capture: "Take photo", download: "Download photo",
    leaderboard: "Mission Rose Global Top 5", share: "Share my score", donate: "Donate now",
    restart: "Play again", sponsorLink: "Visit ellegagne.com", donationEyebrow: "Solidarity campaign",
    donationTitle: "Support 5 women in need",
    donationDescription: "Mission Rose donations will support 5 women during Breast Cancer Awareness Month with consultations, screening, transport or urgent needs.",
    progressLabel: "Campaign in progress", totalTitle: "Every contribution matters",
    totalLoading: "Loading…", totalNote: "Confirmed donations through Chariow.",
    totalUpdated: "Confirmed donations through Chariow · Updated automatically.",
    totalUnavailable: "Unavailable", totalError: "The donation total will appear once the Chariow connection is active.",
    progressAria: "Solidarity campaign in progress, no fixed target",
    levelProgressAria: "Level progress", close: "Close",
    transparency: "Transparency: a summary of the funds collected and how they are distributed will be published at the end of the campaign.",
    widgetLabel: (name) => `Complete your ${name} contribution with Chariow.`,
    donationBonusAdded: (points) => `+${points} points added to your score for this click, even if you don't complete the donation.`,
    donationBonusQueued: (points) => `+${points} points saved for your next game, even if you don't complete the donation.`,
    answerGood: (points, explanation) => `Correct answer: +${points} points. ${explanation}`,
    answerBad: (explanation) => `Not quite: this word can delay action. ${explanation}`,
    summary: (name, score) => `${name}, your score is ${score} points. You turned words that hold us back into words that save lives.`,
    rankTop: (rank) => `You are in the Top 5 at position ${rank}.`,
    rankOther: () => "Your score is not in the global Top 5 yet. Play again to improve your ranking.",
    leaderboardLoading: "Loading the global leaderboard…", leaderboardUnavailable: "The global leaderboard is unavailable right now. Your score is still saved on this device.",
    leaderboardEmpty: "No global scores yet. Be the first to play!",
    points: "pts", levelComplete: "Level complete", cameraError: "The camera is unavailable. You can still download your badge without a photo.",
    shareText: (score) => `I just completed Mission Rose, supported by ellegagne.com. My score: ${score} points. Can you make the Top 5?`,
    badgeMessage: "I support Breast Cancer Awareness", badgeSentence: "She wins when she knows. She wins when she protects herself.",
    description: "Mission Rose is an awareness game supported by ellegagne.com. Learn about breast health, share your score and support five women in need.",
  },
  es: {
    homeEyebrow: "Octubre Rosa", sponsor: "Con el apoyo de ellegagne.com",
    heroTitle: "Convierte las palabras que frenan en palabras que salvan.",
    heroDescription: "Elige palabras útiles, evita frases dañinas, responde las preguntas e intenta entrar en el Top 5.",
    playerLabel: "Tu nombre o apodo", playerPlaceholder: "Ej.: Grace M.", difficultyLabel: "Dificultad",
    easy: "Fácil", medium: "Media", hard: "Difícil", start: "Empezar el juego",
    homeDonate: "Dona para apoyar a 5 mujeres", score: "Puntuación", next: "Continuar",
    resultEyebrow: "Resultado final", resultTitle: "¡Enhorabuena! Has terminado Mission Rose.", badge: "Insignia",
    badgeTitle: "Apoyo Octubre Rosa", filterTitle: "Tu filtro Mission Rose",
    filterDescription: "Hazte una foto con el filtro <strong>#NONAUCANCERDUSEINS</strong>. Mostrará tu puntuación y un mensaje de sensibilización.",
    camera: "Activar cámara", capture: "Hacer foto", download: "Descargar foto", leaderboard: "Top 5 mundial Mission Rose",
    share: "Compartir mi puntuación", donate: "Donar ahora", restart: "Volver a jugar", sponsorLink: "Visitar ellegagne.com",
    donationEyebrow: "Acción solidaria", donationTitle: "Apoya a 5 mujeres que lo necesitan",
    donationDescription: "Las donaciones de Mission Rose ayudarán a 5 mujeres durante Octubre Rosa con consultas, pruebas de detección, transporte o necesidades urgentes.",
    progressLabel: "Colecta en curso", totalTitle: "Cada gesto cuenta", totalLoading: "Cargando…",
    totalNote: "Donaciones confirmadas a través de Chariow.", totalUpdated: "Donaciones confirmadas a través de Chariow · Actualización automática.",
    totalUnavailable: "No disponible", totalError: "El total aparecerá cuando la conexión con Chariow esté activa.",
    progressAria: "Colecta solidaria en curso, sin objetivo fijado", levelProgressAria: "Progreso de niveles", close: "Cerrar",
    transparency: "Transparencia: al final de la campaña se publicará un resumen de los fondos recaudados y su distribución.",
    widgetLabel: (name) => `Completa tu aportación ${name} con Chariow.`,
    donationBonusAdded: (points) => `+${points} puntos añadidos por este clic, aunque no completes la donación.`,
    donationBonusQueued: (points) => `+${points} puntos guardados para tu próxima partida, aunque no completes la donación.`,
    answerGood: (points, explanation) => `Respuesta correcta: +${points} puntos. ${explanation}`,
    answerBad: (explanation) => `Respuesta incorrecta: esta palabra puede retrasar la acción. ${explanation}`,
    summary: (name, score) => `${name}, tu puntuación es de ${score} puntos. Convertiste palabras que frenan en palabras que salvan.`,
    rankTop: (rank) => `Estás en el Top 5 mundial, en la posición ${rank}.`, rankOther: () => "Tu puntuación aún no está en el Top 5 mundial. Vuelve a jugar para mejorar tu posición.",
    leaderboardLoading: "Cargando el ranking mundial…", leaderboardUnavailable: "El ranking mundial no está disponible ahora. Tu puntuación sigue guardada en este dispositivo.", leaderboardEmpty: "Aún no hay puntuaciones mundiales. ¡Sé la primera en jugar!",
    points: "pts", levelComplete: "Nivel terminado", cameraError: "La cámara no está disponible. Puedes descargar la insignia sin foto.",
    shareText: (score) => `Acabo de terminar Mission Rose, con el apoyo de ellegagne.com. Mi puntuación: ${score} puntos. ¿Puedes entrar en el Top 5?`,
    badgeMessage: "Apoyo la prevención del cáncer de mama", badgeSentence: "Ella gana cuando sabe. Ella gana cuando se cuida.",
    description: "Mission Rose es un juego de sensibilización apoyado por ellegagne.com. Aprende sobre la salud mamaria, comparte tu puntuación y apoya a cinco mujeres.",
  },
  pt: {
    homeEyebrow: "Outubro Rosa", sponsor: "Apoiado por ellegagne.com",
    heroTitle: "Transforme palavras que bloqueiam em palavras que salvam.",
    heroDescription: "Escolha palavras que ajudam, evite frases prejudiciais, responda às perguntas e tente entrar no Top 5.",
    playerLabel: "Seu nome ou apelido", playerPlaceholder: "Ex.: Grace M.", difficultyLabel: "Dificuldade",
    easy: "Fácil", medium: "Média", hard: "Difícil", start: "Começar o jogo",
    homeDonate: "Doe para apoiar 5 mulheres", score: "Pontuação", next: "Continuar",
    resultEyebrow: "Resultado final", resultTitle: "Parabéns! Você concluiu o Mission Rose.", badge: "Emblema",
    badgeTitle: "Apoio o Outubro Rosa", filterTitle: "Seu filtro Mission Rose",
    filterDescription: "Tire uma foto com o filtro <strong>#NONAUCANCERDUSEINS</strong>. Ela mostrará sua pontuação e uma mensagem de conscientização.",
    camera: "Ativar câmera", capture: "Tirar foto", download: "Baixar foto", leaderboard: "Top 5 mundial Mission Rose",
    share: "Compartilhar minha pontuação", donate: "Doar agora", restart: "Jogar novamente", sponsorLink: "Visitar ellegagne.com",
    donationEyebrow: "Ação solidária", donationTitle: "Apoie 5 mulheres que precisam",
    donationDescription: "As doações do Mission Rose ajudarão 5 mulheres durante o Outubro Rosa com consultas, exames, transporte ou necessidades urgentes.",
    progressLabel: "Campanha em andamento", totalTitle: "Cada gesto importa", totalLoading: "Carregando…",
    totalNote: "Doações confirmadas pelo Chariow.", totalUpdated: "Doações confirmadas pelo Chariow · Atualização automática.",
    totalUnavailable: "Indisponível", totalError: "O total aparecerá assim que a conexão com o Chariow estiver ativa.",
    progressAria: "Campanha solidária em andamento, sem meta definida", levelProgressAria: "Progresso dos níveis", close: "Fechar",
    transparency: "Transparência: um resumo dos valores arrecadados e da sua distribuição será publicado ao final da campanha.",
    widgetLabel: (name) => `Finalize sua contribuição ${name} com Chariow.`,
    donationBonusAdded: (points) => `+${points} pontos adicionados por este clique, mesmo sem concluir a doação.`,
    donationBonusQueued: (points) => `+${points} pontos reservados para sua próxima partida, mesmo sem concluir a doação.`,
    answerGood: (points, explanation) => `Resposta correta: +${points} pontos. ${explanation}`,
    answerBad: (explanation) => `Resposta incorreta: esta palavra pode atrasar a ação. ${explanation}`,
    summary: (name, score) => `${name}, sua pontuação é de ${score} pontos. Você transformou palavras que bloqueiam em palavras que salvam.`,
    rankTop: (rank) => `Você está no Top 5 mundial, na posição ${rank}.`, rankOther: () => "Sua pontuação ainda não está no Top 5 mundial. Jogue novamente para melhorar sua posição.",
    leaderboardLoading: "Carregando o ranking mundial…", leaderboardUnavailable: "O ranking mundial está indisponível. Sua pontuação continua salva neste dispositivo.", leaderboardEmpty: "Ainda não há pontuações mundiais. Seja a primeira pessoa a jogar!",
    points: "pts", levelComplete: "Nível concluído", cameraError: "A câmera não está disponível. Você ainda pode baixar o emblema sem foto.",
    shareText: (score) => `Acabei de concluir o Mission Rose, apoiado por ellegagne.com. Minha pontuação: ${score} pontos. Você consegue entrar no Top 5?`,
    badgeMessage: "Apoio a conscientização sobre o câncer de mama", badgeSentence: "Ela vence quando sabe. Ela vence quando se cuida.",
    description: "Mission Rose é um jogo de conscientização apoiado por ellegagne.com. Aprenda sobre saúde mamária, compartilhe sua pontuação e apoie cinco mulheres.",
  },
  de: {
    homeEyebrow: "Brustkrebsmonat", sponsor: "Unterstützt von ellegagne.com",
    heroTitle: "Mach aus Worten, die bremsen, Worte, die Leben retten.",
    heroDescription: "Wähle hilfreiche Worte, vermeide schädliche Aussagen, beantworte die Fragen und schaffe es vielleicht in die Top 5.",
    playerLabel: "Dein Name oder Spitzname", playerPlaceholder: "Z. B. Grace M.", difficultyLabel: "Schwierigkeit",
    easy: "Einfach", medium: "Mittel", hard: "Schwer", start: "Spiel starten",
    homeDonate: "Spende und unterstütze 5 Frauen", score: "Punktzahl", next: "Weiter",
    resultEyebrow: "Endergebnis", resultTitle: "Glückwunsch! Du hast Mission Rose abgeschlossen.", badge: "Abzeichen",
    badgeTitle: "Ich unterstütze die Brustkrebs-Aufklärung", filterTitle: "Dein Mission-Rose-Filter",
    filterDescription: "Mach ein Foto mit dem Filter <strong>#NONAUCANCERDUSEINS</strong>. Es zeigt deine Punktzahl und eine Botschaft zur Aufklärung.",
    camera: "Kamera einschalten", capture: "Foto aufnehmen", download: "Foto herunterladen", leaderboard: "Mission Rose: Globale Top 5",
    share: "Punktzahl teilen", donate: "Jetzt spenden", restart: "Noch einmal spielen", sponsorLink: "ellegagne.com besuchen",
    donationEyebrow: "Solidaritätsaktion", donationTitle: "Unterstütze 5 Frauen in Not",
    donationDescription: "Spenden aus Mission Rose unterstützen 5 Frauen im Brustkrebsmonat, etwa bei Beratung, Früherkennung, Transport oder dringendem Bedarf.",
    progressLabel: "Sammelaktion läuft", totalTitle: "Jeder Beitrag zählt", totalLoading: "Wird geladen…",
    totalNote: "Über Chariow bestätigte Spenden.", totalUpdated: "Über Chariow bestätigte Spenden · Wird automatisch aktualisiert.",
    totalUnavailable: "Nicht verfügbar", totalError: "Der Spendenbetrag wird angezeigt, sobald die Chariow-Verbindung aktiv ist.",
    progressAria: "Solidaritätsaktion läuft, ohne festes Spendenziel", levelProgressAria: "Spielfortschritt", close: "Schließen",
    transparency: "Transparenz: Eine Übersicht der gesammelten Mittel und ihrer Verteilung wird am Ende der Kampagne veröffentlicht.",
    widgetLabel: (name) => `Schließe deine ${name}-Unterstützung mit Chariow ab.`,
    donationBonusAdded: (points) => `+${points} Punkte für diesen Klick hinzugefügt, auch ohne abgeschlossene Spende.`,
    donationBonusQueued: (points) => `+${points} Punkte für dein nächstes Spiel vorgemerkt, auch ohne abgeschlossene Spende.`,
    answerGood: (points, explanation) => `Richtige Antwort: +${points} Punkte. ${explanation}`,
    answerBad: (explanation) => `Nicht ganz: Dieses Wort kann zum Aufschieben führen. ${explanation}`,
    summary: (name, score) => `${name}, du hast ${score} Punkte erreicht. Du hast bremsende Worte in stärkende Worte verwandelt.`,
    rankTop: (rank) => `Du bist auf Platz ${rank} in den globalen Top 5.`, rankOther: () => "Deine Punktzahl ist noch nicht in den globalen Top 5. Spiele erneut, um deinen Rang zu verbessern.",
    leaderboardLoading: "Globale Rangliste wird geladen…", leaderboardUnavailable: "Die globale Rangliste ist gerade nicht verfügbar. Deine Punktzahl bleibt auf diesem Gerät gespeichert.", leaderboardEmpty: "Noch keine globalen Punktzahlen. Sei die erste Person, die spielt!",
    points: "Pkt.", levelComplete: "Level abgeschlossen", cameraError: "Die Kamera ist nicht verfügbar. Du kannst dein Abzeichen auch ohne Foto herunterladen.",
    shareText: (score) => `Ich habe gerade Mission Rose abgeschlossen, unterstützt von ellegagne.com. Meine Punktzahl: ${score}. Schaffst du es in die Top 5?`,
    badgeMessage: "Ich unterstütze die Brustkrebs-Aufklärung", badgeSentence: "Sie gewinnt, wenn sie Bescheid weiß und auf sich achtet.",
    description: "Mission Rose ist ein Aufklärungsspiel, unterstützt von ellegagne.com. Erfahre mehr über Brustgesundheit, teile deine Punktzahl und unterstütze fünf Frauen.",
  },
  zh: {
    homeEyebrow: "粉红十月", sponsor: "由 ellegagne.com 支持",
    heroTitle: "把阻碍行动的话语，变成守护生命的话语。",
    heroDescription: "选择有帮助的话语，避开有害表达，回答问题，争取进入前五名。",
    playerLabel: "姓名或昵称", playerPlaceholder: "例如：Grace M.", difficultyLabel: "难度",
    easy: "简单", medium: "中等", hard: "困难", start: "开始游戏",
    homeDonate: "捐赠并帮助五位女性", score: "分数", next: "继续",
    resultEyebrow: "最终结果", resultTitle: "恭喜你完成了 Mission Rose。", badge: "徽章",
    badgeTitle: "我支持乳腺健康宣传", filterTitle: "你的 Mission Rose 滤镜",
    filterDescription: "使用 <strong>#NONAUCANCERDUSEINS</strong> 滤镜拍照，照片将显示你的分数和健康宣传信息。",
    camera: "开启相机", capture: "拍照", download: "下载照片", leaderboard: "Mission Rose 全球前五名",
    share: "分享分数", donate: "立即捐赠", restart: "再玩一次", sponsorLink: "访问 ellegagne.com",
    donationEyebrow: "爱心行动", donationTitle: "帮助五位有需要的女性",
    donationDescription: "Mission Rose 的捐款将在粉红十月期间帮助五位女性支付咨询、筛查、交通或紧急需求。",
    progressLabel: "募捐进行中", totalTitle: "每一份心意都很重要", totalLoading: "正在加载…",
    totalNote: "通过 Chariow 确认的捐款总额。", totalUpdated: "通过 Chariow 确认的捐款总额 · 自动更新。",
    totalUnavailable: "暂不可用", totalError: "Chariow 连接启用后将显示捐款总额。",
    progressAria: "爱心募捐进行中，未设定固定目标", levelProgressAria: "关卡进度", close: "关闭",
    transparency: "透明说明：活动结束后将公布筹集资金及其分配情况。",
    widgetLabel: (name) => `通过 Chariow 完成 ${name} 支持。`,
    donationBonusAdded: (points) => `本次点击已加 ${points} 分，即使没有完成捐赠也有效。`,
    donationBonusQueued: (points) => `已为你的下一局记下 ${points} 分，即使没有完成捐赠也有效。`,
    answerGood: (points, explanation) => `回答正确：+${points} 分。${explanation}`,
    answerBad: (explanation) => `回答不正确：这类说法可能延误行动。${explanation}`,
    summary: (name, score) => `${name}，你的分数是 ${score} 分。你把阻碍行动的话语变成了守护生命的话语。`,
    rankTop: (rank) => `你进入了全球前五名，目前排名第 ${rank}。`, rankOther: () => "你的分数暂未进入全球前五名。再玩一次，争取提升排名。",
    leaderboardLoading: "正在加载全球排行榜…", leaderboardUnavailable: "全球排行榜暂时无法使用。你的分数仍保存在此设备上。", leaderboardEmpty: "目前还没有全球分数。来成为第一个玩家吧！",
    points: "分", levelComplete: "关卡完成", cameraError: "相机无法使用。你仍可下载不含照片的徽章。",
    shareText: (score) => `我刚刚完成了由 ellegagne.com 支持的 Mission Rose，获得 ${score} 分。你能进入前五名吗？`,
    badgeMessage: "我支持乳腺健康宣传", badgeSentence: "了解健康知识，及时行动，守护自己。",
    description: "Mission Rose 是由 ellegagne.com 支持的健康宣传游戏。了解乳腺健康、分享分数并帮助有需要的女性。",
  },
  ar: {
    homeEyebrow: "أكتوبر الوردي", sponsor: "بدعم من ellegagne.com",
    heroTitle: "حوّلي الكلمات التي تعيقك إلى كلمات تنقذ الحياة.",
    heroDescription: "اختاري الكلمات المفيدة، وتجنبي العبارات الضارة، وأجيبي عن الأسئلة لمحاولة دخول أفضل خمسة.",
    playerLabel: "اسمك أو لقبك", playerPlaceholder: "مثال: Grace M.", difficultyLabel: "مستوى الصعوبة",
    easy: "سهل", medium: "متوسط", hard: "صعب", start: "ابدئي اللعبة",
    homeDonate: "تبرعي لدعم خمس نساء", score: "النقاط", next: "متابعة",
    resultEyebrow: "النتيجة النهائية", resultTitle: "أحسنتِ! لقد أكملتِ Mission Rose.", badge: "شارة",
    badgeTitle: "أدعم التوعية بسرطان الثدي", filterTitle: "مرشح Mission Rose الخاص بك",
    filterDescription: "التقطي صورة باستخدام مرشح <strong>#NONAUCANCERDUSEINS</strong>. ستُظهر نقاطك ورسالة توعوية.",
    camera: "تشغيل الكاميرا", capture: "التقاط الصورة", download: "تنزيل الصورة", leaderboard: "أفضل خمسة عالمياً في Mission Rose",
    share: "مشاركة نتيجتي", donate: "تبرعي الآن", restart: "العبِي مجدداً", sponsorLink: "زيارة ellegagne.com",
    donationEyebrow: "مبادرة تضامنية", donationTitle: "ادعمي خمس نساء بحاجة إلى المساعدة",
    donationDescription: "تساهم تبرعات Mission Rose في دعم خمس نساء خلال شهر التوعية، من خلال الاستشارات والفحوصات والنقل والاحتياجات العاجلة.",
    progressLabel: "الحملة مستمرة", totalTitle: "كل مساهمة مهمة", totalLoading: "جارٍ التحميل…",
    totalNote: "إجمالي التبرعات المؤكدة عبر Chariow.", totalUpdated: "إجمالي التبرعات المؤكدة عبر Chariow · تحديث تلقائي.",
    totalUnavailable: "غير متاح", totalError: "سيظهر إجمالي التبرعات عند تفعيل الاتصال بـ Chariow.",
    progressAria: "حملة تضامنية مستمرة دون هدف مالي محدد", levelProgressAria: "التقدم في المراحل", close: "إغلاق",
    transparency: "الشفافية: سيُنشر في نهاية الحملة ملخص للأموال المجموعة وكيفية توزيعها.",
    widgetLabel: (name) => `أكملي مساهمة ${name} عبر Chariow.`,
    donationBonusAdded: (points) => `أُضيفت ${points} نقطة مقابل هذه النقرة، حتى دون إتمام التبرع.`,
    donationBonusQueued: (points) => `سُجلت ${points} نقطة للجولة القادمة، حتى دون إتمام التبرع.`,
    answerGood: (points, explanation) => `إجابة صحيحة: +${points} نقطة. ${explanation}`,
    answerBad: (explanation) => `إجابة غير صحيحة: قد تؤخر هذه العبارة طلب المساعدة. ${explanation}`,
    summary: (name, score) => `${name}، نتيجتك ${score} نقطة. حوّلتِ الكلمات التي تعيقك إلى كلمات تدعم الحياة.`,
    rankTop: (rank) => `أنتِ ضمن أفضل خمسة عالمياً، في المركز ${rank}.`, rankOther: () => "نتيجتك ليست ضمن أفضل خمسة عالمياً بعد. أعيدي اللعب لتحسين ترتيبك.",
    leaderboardLoading: "جارٍ تحميل الترتيب العالمي…", leaderboardUnavailable: "الترتيب العالمي غير متاح حالياً. ما زالت نتيجتك محفوظة على هذا الجهاز.", leaderboardEmpty: "لا توجد نتائج عالمية بعد. كوني أول من يلعب!",
    points: "نقطة", levelComplete: "اكتمل المستوى", cameraError: "الكاميرا غير متاحة. يمكنك تنزيل الشارة دون صورة.",
    shareText: (score) => `أنهيت للتو Mission Rose بدعم من ellegagne.com. نتيجتي: ${score} نقطة. هل يمكنك دخول أفضل خمسة؟`,
    badgeMessage: "أدعم التوعية بسرطان الثدي", badgeSentence: "تنتصر المرأة حين تعرف وحين تعتني بصحتها.",
    description: "Mission Rose لعبة توعوية بدعم من ellegagne.com. تعرّفي على صحة الثدي وشاركي نتيجتك وساعدي النساء المحتاجات.",
  },
  sw: {
    homeEyebrow: "Oktoba ya Uhamasishaji", sponsor: "Inaungwa mkono na ellegagne.com",
    heroTitle: "Badilisha maneno yanayokwamisha kuwa maneno yanayookoa maisha.",
    heroDescription: "Chagua maneno yenye msaada, epuka kauli hatari, jibu maswali na ujaribu kuingia kwenye nafasi tano za juu.",
    playerLabel: "Jina lako au lakabu", playerPlaceholder: "Mfano: Grace M.", difficultyLabel: "Kiwango cha ugumu",
    easy: "Rahisi", medium: "Wastani", hard: "Ngumu", start: "Anza mchezo",
    homeDonate: "Changia kusaidia wanawake 5", score: "Alama", next: "Endelea",
    resultEyebrow: "Matokeo ya mwisho", resultTitle: "Hongera! Umemaliza Mission Rose.", badge: "Beji",
    badgeTitle: "Ninaunga mkono uhamasishaji wa afya ya matiti", filterTitle: "Kichujio chako cha Mission Rose",
    filterDescription: "Piga picha ukitumia kichujio cha <strong>#NONAUCANCERDUSEINS</strong>. Picha itaonyesha alama zako na ujumbe wa uhamasishaji.",
    camera: "Washa kamera", capture: "Piga picha", download: "Pakua picha", leaderboard: "Wachezaji 5 bora duniani wa Mission Rose",
    share: "Shiriki alama zangu", donate: "Changia sasa", restart: "Cheza tena", sponsorLink: "Tembelea ellegagne.com",
    donationEyebrow: "Msaada wa pamoja", donationTitle: "Saidia wanawake 5 wenye mahitaji",
    donationDescription: "Michango ya Mission Rose itasaidia wanawake 5 wakati wa Oktoba ya uhamasishaji kwa ushauri wa afya, uchunguzi, usafiri au mahitaji ya dharura.",
    progressLabel: "Kampeni inaendelea", totalTitle: "Kila mchango una umuhimu", totalLoading: "Inapakia…",
    totalNote: "Jumla ya michango iliyothibitishwa kupitia Chariow.", totalUpdated: "Jumla ya michango iliyothibitishwa kupitia Chariow · Husasishwa kiotomatiki.",
    totalUnavailable: "Haipatikani", totalError: "Jumla itaonekana muunganisho wa Chariow utakapoanza kufanya kazi.",
    progressAria: "Kampeni ya msaada inaendelea, bila lengo maalum", levelProgressAria: "Maendeleo ya viwango", close: "Funga",
    transparency: "Uwazi: muhtasari wa fedha zilizokusanywa na matumizi yake utachapishwa kampeni itakapokamilika.",
    widgetLabel: (name) => `Kamilisha mchango wako wa ${name} kupitia Chariow.`,
    donationBonusAdded: (points) => `+${points} alama zimeongezwa kwa kubofya huku, hata bila kukamilisha mchango.`,
    donationBonusQueued: (points) => `+${points} alama zimehifadhiwa kwa mchezo wako ujao, hata bila kukamilisha mchango.`,
    answerGood: (points, explanation) => `Jibu sahihi: +${points} alama. ${explanation}`,
    answerBad: (explanation) => `Jibu lisilo sahihi: kauli hii inaweza kuchelewesha hatua. ${explanation}`,
    summary: (name, score) => `${name}, umepata alama ${score}. Umebadilisha maneno yanayokwamisha kuwa maneno yanayookoa.`,
    rankTop: (rank) => `Uko nafasi ya ${rank} kati ya washindi 5 bora duniani.`, rankOther: () => "Alama zako bado hazijaingia kwenye 5 bora duniani. Cheza tena ili kuboresha nafasi yako.",
    leaderboardLoading: "Inapakia orodha ya washindi duniani…", leaderboardUnavailable: "Orodha ya washindi duniani haipatikani kwa sasa. Alama zako bado zimehifadhiwa kwenye kifaa hiki.", leaderboardEmpty: "Bado hakuna alama za kimataifa. Kuwa wa kwanza kucheza!",
    points: "alama", levelComplete: "Kiwango kimekamilika", cameraError: "Kamera haipatikani. Bado unaweza kupakua beji bila picha.",
    shareText: (score) => `Nimemaliza Mission Rose inayoungwa mkono na ellegagne.com. Alama zangu: ${score}. Je, unaweza kuingia kwenye 5 bora?`,
    badgeMessage: "Ninaunga mkono uhamasishaji wa afya ya matiti", badgeSentence: "Anashinda anapojua na kuchukua hatua ya kujilinda.",
    description: "Mission Rose ni mchezo wa uhamasishaji unaoungwa mkono na ellegagne.com. Jifunze kuhusu afya ya matiti na saidia wanawake.",
  },
};

const otherLevels = {
  es: [
    { title:"Nivel 1: Romper el silencio", theme:"Aprender a hablar", instruction:"Elige palabras que ayuden a hablar sobre la salud.", good:["Hablar","Confianza","Escuchar","Apoyo"], bad:["Silencio","Vergüenza","Tabú","Escóndelo"], message:"Hablar de un cambio inusual puede ser el primer paso para recibir ayuda.", goodExplanation:"Hablar y recibir apoyo puede ayudar a buscar orientación a tiempo.", badExplanation:"El silencio, la vergüenza o esconder una señal pueden retrasar la consulta." },
    { title:"Nivel 2: Afrontar el miedo", theme:"Transformar el miedo en acción", instruction:"Elige frases que animen a actuar y evita las que hacen esperar.", good:["Voy a comprobarlo","Voy a consultar","Voy a informarme","Pediré consejo"], bad:["Voy a esperar","Prefiero ignorarlo","Ya pasará","No quiero saber"], message:"El miedo no debería impedir actuar. Consultar pronto puede ayudar.", goodExplanation:"Informarse y consultar a tiempo ayuda a tomar decisiones con apoyo profesional.", badExplanation:"Esperar o ignorar una señal puede retrasar la atención." },
    { title:"Nivel 3: Desmontar mitos", theme:"Combatir los rumores", instruction:"Elige información fiable y evita ideas que retrasen la consulta.", good:["Información","Profesional de salud","Detección","Fuente fiable"], bad:["Rumor","Se dice que","Cura milagrosa","Maldición"], message:"La información fiable es mejor que un rumor que retrasa la atención.", goodExplanation:"La información fiable y el consejo profesional orientan mejor.", badExplanation:"Los rumores y las curas milagrosas pueden retrasar una atención adecuada." },
    { title:"Nivel 4: Escuchar al cuerpo", theme:"Reconocer los cambios", instruction:"Elige qué hacer ante un cambio inusual en el cuerpo.", good:["Observar","Comprobar","Hablar","Consultar"], bad:["Ignorar","Ocultar","Aplazar","Minimizar"], message:"Un cambio inusual merece atención. Conocer tu cuerpo también es cuidarte.", goodExplanation:"Observar, comunicar y consultar ayuda a buscar orientación adecuada.", badExplanation:"Ignorar, ocultar o minimizar una señal puede retrasar la ayuda." },
    { title:"Nivel 5: Pasar a la acción", theme:"Dar el siguiente paso", instruction:"Elige palabras que den fuerza y ayuden a proteger la salud.", good:["Vida","Salud","Acción","Detección"], bad:["Sola","Demora","Desánimo","Silencio"], message:"Ella gana cuando sabe, habla y se protege.", goodExplanation:"La información, el cuidado y la acción oportuna ayudan a proteger la salud.", badExplanation:"Nadie debería afrontar el miedo sola; el silencio y la demora pueden aislarla." },
  ],
  pt: [
    { title:"Nível 1: Romper o silêncio", theme:"Aprender a falar", instruction:"Escolha palavras que ajudem uma mulher a falar sobre sua saúde.", good:["Falar","Confiança","Escuta","Apoio"], bad:["Silêncio","Vergonha","Tabu","Esconda isso"], message:"Falar sobre uma mudança incomum pode ser o primeiro passo para buscar ajuda.", goodExplanation:"Conversar e receber apoio pode ajudar a procurar orientação a tempo.", badExplanation:"O silêncio, a vergonha ou esconder um sinal podem atrasar a consulta." },
    { title:"Nível 2: Enfrentar o medo", theme:"Transformar medo em ação", instruction:"Escolha frases que incentivem a agir e evite as que fazem esperar.", good:["Vou verificar","Vou consultar","Vou me informar","Vou pedir orientação"], bad:["Vou esperar","Prefiro ignorar","Vai passar","Não quero saber"], message:"O medo não deve impedir a ação. Buscar orientação cedo pode ajudar.", goodExplanation:"Informar-se e consultar a tempo ajuda a tomar decisões com apoio profissional.", badExplanation:"Esperar ou ignorar um sinal pode atrasar o atendimento." },
    { title:"Nível 3: Desfazer mitos", theme:"Combater rumores", instruction:"Escolha informações confiáveis e evite ideias que atrasem a consulta.", good:["Informação","Profissional de saúde","Rastreamento","Fonte confiável"], bad:["Boato","Dizem que","Cura milagrosa","Maldição"], message:"Informação confiável é melhor do que um boato que atrasa o cuidado.", goodExplanation:"Informação confiável e orientação profissional ajudam a decidir melhor.", badExplanation:"Boatos e promessas milagrosas podem atrasar o atendimento adequado." },
    { title:"Nível 4: Ouvir o corpo", theme:"Reconhecer mudanças", instruction:"Escolha o que fazer diante de uma mudança incomum no corpo.", good:["Observar","Verificar","Falar","Consultar"], bad:["Ignorar","Esconder","Adiar","Minimizar"], message:"Uma mudança incomum merece atenção. Conhecer o corpo também é autocuidado.", goodExplanation:"Observar, comunicar e consultar ajuda a buscar orientação adequada.", badExplanation:"Ignorar, esconder ou minimizar um sinal pode atrasar a ajuda." },
    { title:"Nível 5: Agir", theme:"Dar o próximo passo", instruction:"Escolha palavras que fortaleçam e ajudem a proteger a saúde.", good:["Vida","Saúde","Ação","Rastreamento"], bad:["Sozinha","Atraso","Desânimo","Silêncio"], message:"Ela vence quando sabe, fala e se protege.", goodExplanation:"Informação, cuidado e ação no momento certo ajudam a proteger a saúde.", badExplanation:"Ninguém deveria enfrentar o medo sozinha; silêncio e atraso podem isolá-la." },
  ],
  sw: [
    { title:"Kiwango 1: Kuvunja ukimya", theme:"Kujifunza kuzungumza", instruction:"Chagua maneno yanayomsaidia mwanamke kuzungumzia afya yake.", good:["Zungumza","Imani","Sikiliza","Msaada"], bad:["Ukimya","Aibu","Mwiko","Ficha"], message:"Kuzungumzia mabadiliko yasiyo ya kawaida kunaweza kuwa hatua ya kwanza ya kupata msaada.", goodExplanation:"Kuzungumza na kupata msaada kunaweza kumwezesha mtu kutafuta ushauri mapema.", badExplanation:"Ukimya, aibu au kuficha ishara kunaweza kuchelewesha ushauri wa afya." },
    { title:"Kiwango 2: Kukabiliana na hofu", theme:"Kubadilisha hofu kuwa hatua", instruction:"Chagua kauli zinazohimiza hatua na epuka zinazochelewesha.", good:["Nitaangalia","Nitatafuta ushauri","Nitapata taarifa","Nitaomba ushauri"], bad:["Nitasubiri","Nitaipuuza","Itapita","Sitaki kujua"], message:"Hofu isizuie hatua. Kutafuta ushauri mapema kunaweza kusaidia.", goodExplanation:"Taarifa na ushauri wa mtaalamu husaidia kufanya maamuzi kwa wakati.", badExplanation:"Kusubiri au kupuuza ishara kunaweza kuchelewesha msaada." },
    { title:"Kiwango 3: Kupinga imani potofu", theme:"Kupambana na uvumi", instruction:"Chagua taarifa za kuaminika na epuka mawazo yanayochelewesha huduma.", good:["Taarifa","Mtaalamu wa afya","Uchunguzi","Chanzo cha kuaminika"], bad:["Uvumi","Watu wanasema","Dawa ya kimiujiza","Laana"], message:"Taarifa ya kuaminika ni bora kuliko uvumi unaochelewesha msaada.", goodExplanation:"Taarifa sahihi na ushauri wa mtaalamu husaidia kuelewa hatua zinazofaa.", badExplanation:"Uvumi na ahadi za tiba za kimiujiza zinaweza kuchelewesha huduma sahihi." },
    { title:"Kiwango 4: Sikiliza mwili wako", theme:"Kutambua mabadiliko", instruction:"Chagua hatua za kuchukua unapohisi mabadiliko yasiyo ya kawaida.", good:["Angalia","Thibitisha","Zungumza","Tafuta huduma"], bad:["Puuza","Ficha","Ahirisha","Dharau"], message:"Mabadiliko yasiyo ya kawaida yanahitaji kuangaliwa. Kuujua mwili wako ni kujitunza.", goodExplanation:"Kuangalia, kuzungumza na kutafuta ushauri husaidia kupata mwongozo.", badExplanation:"Kupuuza, kuficha au kudharau ishara kunaweza kuchelewesha msaada." },
    { title:"Kiwango 5: Chukua hatua", theme:"Kupiga hatua inayofuata", instruction:"Chagua maneno yanayotia moyo na kusaidia kulinda afya.", good:["Maisha","Afya","Hatua","Uchunguzi"], bad:["Peke yako","Kuchelewa","Kukata tamaa","Ukimya"], message:"Anashinda anapojua, anapozungumza na anapojilinda.", goodExplanation:"Taarifa, kujali afya na kuchukua hatua kwa wakati husaidia kujilinda.", badExplanation:"Hakuna anayepaswa kukabiliana na hofu peke yake; ukimya unaweza kumtenga." },
  ],
  de: [
    { title:"Level 1: Das Schweigen brechen", theme:"Über Gesundheit sprechen", instruction:"Wähle Worte, die einer Frau helfen, über ihre Gesundheit zu sprechen.", good:["Darüber sprechen","Vertrauen","Zuhören","Unterstützung"], bad:["Schweigen","Scham","Tabu","Verstecken"], message:"Über eine ungewöhnliche Veränderung zu sprechen, kann der erste Schritt zu Hilfe sein.", goodExplanation:"Gespräche und Unterstützung können dabei helfen, rechtzeitig Rat zu suchen.", badExplanation:"Schweigen, Scham oder Verbergen können eine Beratung verzögern." },
    { title:"Level 2: Die Angst überwinden", theme:"Angst in Handeln verwandeln", instruction:"Wähle Aussagen, die zum Handeln ermutigen, statt zum Warten.", good:["Ich lasse es prüfen","Ich suche Rat","Ich informiere mich","Ich frage nach"], bad:["Ich warte ab","Ich ignoriere es lieber","Das geht vorbei","Ich will es nicht wissen"], message:"Angst sollte nicht vom Handeln abhalten. Früher Rat kann helfen.", goodExplanation:"Information und fachlicher Rat helfen bei rechtzeitigen Entscheidungen.", badExplanation:"Abwarten oder Ignorieren kann die notwendige Hilfe verzögern." },
    { title:"Level 3: Mythen hinterfragen", theme:"Gerüchte entkräften", instruction:"Wähle verlässliche Informationen und vermeide Ideen, die Hilfe verzögern.", good:["Information","Fachkraft","Früherkennung","Verlässliche Quelle"], bad:["Gerücht","Man sagt","Wundermittel","Fluch"], message:"Verlässliche Informationen sind besser als Gerüchte, die Hilfe verzögern.", goodExplanation:"Verlässliche Informationen und Fachberatung geben bessere Orientierung.", badExplanation:"Gerüchte und Wunderheilungsversprechen können passende Hilfe verzögern." },
    { title:"Level 4: Auf den Körper hören", theme:"Veränderungen erkennen", instruction:"Wähle die richtigen Schritte bei einer ungewöhnlichen Veränderung.", good:["Beobachten","Abklären","Ansprechen","Hilfe suchen"], bad:["Ignorieren","Verbergen","Aufschieben","Verharmlosen"], message:"Eine ungewöhnliche Veränderung verdient Aufmerksamkeit. Den Körper zu kennen heißt, auf sich zu achten.", goodExplanation:"Beobachten, Ansprechen und Abklären können Orientierung geben.", badExplanation:"Ignorieren, Verbergen oder Verharmlosen kann Hilfe verzögern." },
    { title:"Level 5: Aktiv werden", theme:"Den nächsten Schritt machen", instruction:"Wähle Worte, die stärken und helfen, die Gesundheit zu schützen.", good:["Leben","Gesundheit","Handeln","Früherkennung"], bad:["Allein","Verzögerung","Mutlosigkeit","Schweigen"], message:"Sie gewinnt, wenn sie Bescheid weiß, spricht und auf sich achtet.", goodExplanation:"Information, Aufmerksamkeit und rechtzeitiges Handeln können die Gesundheit schützen.", badExplanation:"Niemand sollte diese Angst allein tragen; Schweigen kann isolieren." },
  ],
  zh: [
    { title:"第1关：打破沉默", theme:"学会表达", instruction:"选择能帮助女性谈论健康的词语。", good:["表达","信任","倾听","支持"], bad:["沉默","羞耻","禁忌","隐瞒"], message:"谈论身体的异常变化，可能是寻求帮助的第一步。", goodExplanation:"沟通和支持有助于及时寻求专业建议。", badExplanation:"沉默、羞耻或隐瞒可能延误咨询。" },
    { title:"第2关：面对恐惧", theme:"把恐惧变成行动", instruction:"选择鼓励行动的表达，避开让人一再等待的话语。", good:["我会检查","我会咨询","我会了解信息","我会寻求建议"], bad:["我再等等","我宁愿忽略","会自己好","我不想知道"], message:"恐惧不应阻止行动。尽早咨询可能有所帮助。", goodExplanation:"可靠信息和专业建议有助于及时作出决定。", badExplanation:"等待或忽视异常信号可能延误帮助。" },
    { title:"第3关：识破误区", theme:"抵制谣言", instruction:"选择可靠信息，避开可能延误就医的说法。", good:["可靠信息","医护人员","筛查","可信来源"], bad:["谣言","听说","神奇疗法","诅咒"], message:"可靠信息比可能延误求助的谣言更有帮助。", goodExplanation:"可靠信息和专业意见能提供更清晰的指引。", badExplanation:"谣言和神奇疗法的承诺可能延误适当的医疗帮助。" },
    { title:"第4关：倾听身体", theme:"留意身体变化", instruction:"身体出现异常变化时，选择合适的行动。", good:["观察","检查","表达","咨询"], bad:["忽视","隐瞒","拖延","轻视"], message:"异常变化值得关注。了解自己的身体也是照顾自己。", goodExplanation:"观察变化、表达担忧并寻求建议有助于获得指导。", badExplanation:"忽视、隐瞒或轻视信号可能延误帮助。" },
    { title:"第5关：采取行动", theme:"迈出下一步", instruction:"选择鼓励行动、帮助保护健康的词语。", good:["生命","健康","行动","筛查"], bad:["独自面对","拖延","气馁","沉默"], message:"了解、表达并照顾自己，就是迈向更好生活的一步。", goodExplanation:"及时获取信息、关注健康并采取行动，有助于保护自己。", badExplanation:"没有人应该独自面对恐惧；沉默可能让人失去支持。" },
  ],
  ar: [
    { title:"المستوى 1: كسر الصمت", theme:"التحدث عن الصحة", instruction:"اختاري كلمات تساعد المرأة على الحديث عن صحتها.", good:["التحدث","الثقة","الإنصات","الدعم"], bad:["الصمت","الخجل","المحظور","إخفاء الأمر"], message:"الحديث عن تغير غير معتاد قد يكون الخطوة الأولى لطلب المساعدة.", goodExplanation:"الحوار والدعم يساعدان على طلب المشورة في الوقت المناسب.", badExplanation:"الصمت أو الخجل أو إخفاء العلامة قد يؤخر الاستشارة." },
    { title:"المستوى 2: مواجهة الخوف", theme:"تحويل الخوف إلى فعل", instruction:"اختاري عبارات تشجع على التحرك وتجنبي ما يدعو إلى الانتظار.", good:["سأتحقق","سأستشير مختصاً","سأبحث عن معلومات","سأطلب المشورة"], bad:["سأنتظر","سأتجاهل الأمر","سيزول وحده","لا أريد أن أعرف"], message:"لا ينبغي للخوف أن يمنع التحرك. طلب المشورة مبكراً قد يساعد.", goodExplanation:"المعلومات الموثوقة ومشورة المختص تساعدان على اتخاذ قرار مناسب.", badExplanation:"الانتظار أو تجاهل العلامة قد يؤخر الحصول على المساعدة." },
    { title:"المستوى 3: تصحيح المفاهيم", theme:"مواجهة الشائعات", instruction:"اختاري المعلومات الموثوقة وتجنبي الأفكار التي تؤخر الرعاية.", good:["معلومات موثوقة","مختص صحي","فحص","مصدر موثوق"], bad:["شائعة","يقولون إن","علاج سحري","لعنة"], message:"المعلومة الموثوقة أفضل من شائعة تؤخر طلب الرعاية.", goodExplanation:"المعلومات الموثوقة ومشورة المختص توفران توجيهاً أفضل.", badExplanation:"الشائعات والوعود بالعلاج السحري قد تؤخر الرعاية المناسبة." },
    { title:"المستوى 4: الإصغاء للجسم", theme:"ملاحظة التغيرات", instruction:"اختاري ما يجب فعله عند ملاحظة تغير غير معتاد في الجسم.", good:["الملاحظة","التحقق","التحدث","استشارة مختص"], bad:["التجاهل","الإخفاء","التأجيل","التهوين"], message:"التغير غير المعتاد يستحق الانتباه. معرفة الجسم جزء من العناية بالنفس.", goodExplanation:"ملاحظة التغير والتحدث عنه وطلب المشورة تساعد في معرفة الخطوة المناسبة.", badExplanation:"تجاهل العلامة أو إخفاؤها أو التهوين منها قد يؤخر المساعدة." },
    { title:"المستوى 5: اتخاذ خطوة", theme:"الخطوة التالية", instruction:"اختاري كلمات تمنح القوة وتساعد على حماية الصحة.", good:["الحياة","الصحة","التحرك","الفحص"], bad:["الوحدة","التأخير","الإحباط","الصمت"], message:"تنتصر المرأة حين تعرف وتتحدث وتعتني بصحتها.", goodExplanation:"المعلومات والعناية والتحرك في الوقت المناسب تساعد على حماية الصحة.", badExplanation:"لا ينبغي لأحد مواجهة الخوف وحده؛ وقد يؤدي الصمت إلى العزلة." },
  ],
};

const englishLevels = [
  { title: "Level 1: Breaking the silence", theme: "Learning to speak up", instruction: "Choose words that help a woman talk about her health.", good: ["Speak up", "Trust", "Listen", "Support"], bad: ["Silence", "Shame", "Taboo", "Hide it"], message: "Talking about an unusual change can be the first step toward getting help.", goodExplanations: ["Speaking up helps someone ask for help at the right time.", "Trust helps replace fear with action.", "Being listened to can encourage someone to seek care.", "Support can make the healthcare journey easier."], badExplanations: ["Silence can delay an important consultation.", "Shame should never come before health.", "Taboo can stop people from seeking help.", "Hiding an unusual sign can waste valuable time."] },
  { title: "Level 2: Facing fear", theme: "Turning fear into action", instruction: "Replace phrases that hold us back with words that encourage action.", good: ["I will check", "I will see a clinician", "I will get informed", "I will ask for advice"], bad: ["I will wait", "I would rather ignore it", "It will go away", "I don't want to know"], message: "Fear should not stop action. Seeking advice early can help.", goodExplanations: ["Checking early can bring reassurance or timely care.", "A clinician can advise you about an unusual sign.", "Reliable information helps people make informed decisions.", "Asking for advice can open the door to support."], badExplanations: ["Waiting can allow a problem to worsen.", "Ignoring a sign does not make it disappear.", "Assuming it will pass can delay action.", "Finding out early can help and reassure you."] },
  { title: "Level 3: Challenging myths", theme: "Countering misinformation", instruction: "Keep reliable information and avoid ideas that delay care.", good: ["Information", "Clinician", "Screening", "Trusted source"], bad: ["Rumour", "People say", "Miracle cure", "Curse"], message: "Reliable information is safer than a rumour that delays care.", goodExplanations: ["Reliable information helps people make safer decisions.", "A health professional can guide you.", "Screening can help detect a problem early.", "A trusted source is better than a rumour."], badExplanations: ["Rumours can keep people from finding real help.", "Unverified claims can create unnecessary fear.", "A miracle cure claim can delay proper care.", "Health conditions need facts and support, not fear."] },
  { title: "Level 4: Listen to your body", theme: "Recognising changes", instruction: "Choose the right steps when your body shows an unusual change.", good: ["Notice", "Check", "Speak up", "Seek care"], bad: ["Ignore", "Hide", "Postpone", "Minimise"], message: "An unusual change deserves attention. Knowing your body is a way to care for yourself.", goodExplanations: ["Noticing changes helps you respond sooner.", "Getting checked can help resolve uncertainty.", "Talking about a change helps you find support.", "Seeking care can provide clear medical advice."], badExplanations: ["Ignoring a sign can delay action.", "Hiding a concern can leave you without support.", "Postponing a consultation can waste valuable time.", "Minimising a sign can stop you from protecting your health."] },
  { title: "Level 5: Take action", theme: "Taking the next step", instruction: "Choose words that empower and help protect life.", good: ["Life", "Health", "Action", "Screening"], bad: ["Alone", "Delay", "Discouragement", "Silence"], message: "She wins when she knows. She wins when she speaks up. She wins when she protects herself.", goodExplanations: ["Life is worth protecting through timely care.", "Health deserves attention, even when we feel afraid.", "Taking action early can change what happens next.", "Screening can help identify a problem early."], badExplanations: ["No one should face this fear alone.", "Delays can matter when an unusual sign appears.", "Discouragement can make it harder to act.", "Silence can prevent someone from getting support."] },
];

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
    "hero-description": "heroDescription", "player-label": "playerLabel", "difficulty-label": "difficultyLabel",
    "difficulty-easy": "easy", "difficulty-medium": "medium", "difficulty-hard": "hard",
    "start-button": "start", "home-donate-button": "homeDonate", "score-label": "score",
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

const state = {
  player: "",
  difficulty: "easy",
  levelIndex: 0,
  roundIndex: 0,
  score: 0,
  selected: false,
  stream: null,
  photoUrl: "",
  audioContext: null,
  pendingDonationPoints: 0,
  gameStarted: false,
  gameFinished: false,
  savedScoreId: null,
  globalScoreId: null,
  globalLeaders: [],
};

const screens = {
  home: document.getElementById("screen-home"),
  game: document.getElementById("screen-game"),
  result: document.getElementById("screen-result"),
};

const els = {
  form: document.getElementById("player-form"),
  playerName: document.getElementById("player-name"),
  difficulty: document.getElementById("difficulty"),
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
  leaderboard: document.getElementById("leaderboard"),
  rankMessage: document.getElementById("rank-message"),
  restart: document.getElementById("restart-btn"),
  modal: document.getElementById("donation-modal"),
  chariowDonationWidget: document.getElementById("chariow-donation-widget"),
  chariowWidget: document.getElementById("chariow-widget"),
  chariowWidgetLabel: document.getElementById("chariow-widget-label"),
  levelMessageModal: document.getElementById("level-message-modal"),
  levelMessageText: document.getElementById("level-message-text"),
  levelMessageBtn: document.getElementById("level-message-btn"),
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

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function currentConfig() {
  return difficultyConfig[state.difficulty];
}

function currentLevel() {
  if (language === "en") return englishLevels[state.levelIndex];
  return otherLevels[language]?.[state.levelIndex] || levels[state.levelIndex];
}

function startGame(event) {
  event.preventDefault();
  state.player = els.playerName.value.trim() || (language === "en" ? "Rose Player" : "Joueuse Rose");
  state.difficulty = els.difficulty.value;
  state.levelIndex = 0;
  state.roundIndex = 0;
  state.score = state.pendingDonationPoints;
  state.pendingDonationPoints = 0;
  state.selected = false;
  state.gameStarted = true;
  state.gameFinished = false;
  state.savedScoreId = null;
  state.globalScoreId = null;
  state.globalLeaders = [];
  showScreen("game");
  renderRound();
}

function renderRound() {
  const level = currentLevel();
  const config = currentConfig();
  const wordIndex = state.roundIndex % level.good.length;
  const goodWord = level.good[wordIndex];
  const badWord = level.bad[wordIndex];
  const choices = shuffle([
    { text: goodWord, type: "good", explanation: language === "en" ? level.goodExplanations[wordIndex] : language === "fr" ? explanations[goodWord] : level.goodExplanation },
    { text: badWord, type: "bad", explanation: language === "en" ? level.badExplanations[wordIndex] : language === "fr" ? explanations[badWord] : level.badExplanation },
  ]);

  els.levelTitle.textContent = level.title;
  els.levelTheme.textContent = `${level.theme} · ${text(state.difficulty)}`;
  els.levelInstruction.textContent = level.instruction;
  els.score.textContent = formatNumber(state.score);
  els.feedback.textContent = "";
  els.next.disabled = true;
  state.selected = false;

  const totalRounds = levels.length * config.rounds;
  const completedRounds = state.levelIndex * config.rounds + state.roundIndex;
  els.progress.style.width = `${Math.round((completedRounds / totalRounds) * 100)}%`;

  els.choices.innerHTML = "";
  choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.textContent = choice.text;
    button.addEventListener("click", () => selectChoice(button, choice));
    els.choices.appendChild(button);
  });
}

function selectChoice(button, choice) {
  if (state.selected) return;
  state.selected = true;
  const type = choice.type;
  const config = currentConfig();
  const points = type === "good" ? 250 : -120;
  state.score = Math.max(0, state.score + Math.round(points * config.multiplier));

  [...els.choices.children].forEach((child) => {
    const isClicked = child === button;
    child.disabled = true;
    if (isClicked) child.classList.add(type);
  });

  els.score.textContent = formatNumber(state.score);
  playAnswerSound(type);
  triggerAnswerEffect(type, Math.round(points * config.multiplier));
  els.feedback.textContent = type === "good"
    ? text("answerGood")(formatNumber(Math.round(250 * config.multiplier)), choice.explanation)
    : text("answerBad")(choice.explanation);
  els.next.disabled = false;
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

function nextRound() {
  const config = currentConfig();
  state.roundIndex += 1;

  if (state.roundIndex >= config.rounds) {
    state.score += Math.round(500 * config.multiplier);
    showLevelMessage(currentLevel().message, () => {
      state.levelIndex += 1;
      state.roundIndex = 0;

      if (state.levelIndex >= levels.length) {
        finishGame();
        return;
      }

      renderRound();
    });
    return;
  }

  renderRound();
}

function showLevelMessage(message, onContinue) {
  els.levelMessageText.textContent = message;
  els.levelMessageModal.hidden = false;
  els.levelMessageBtn.onclick = () => {
    els.levelMessageModal.hidden = true;
    onContinue();
  };
}

function finishGame() {
  const config = currentConfig();
  state.score += Math.round(500 * config.multiplier);
  state.gameStarted = false;
  state.gameFinished = true;
  els.progress.style.width = "100%";
  saveScore();
  renderResult([], "loading");
  drawBadge();
  showScreen("result");
  submitGlobalScore();
}

function saveScore() {
  const saved = JSON.parse(localStorage.getItem("missionRoseLeaders") || "[]");
  state.savedScoreId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  saved.push({
    id: state.savedScoreId,
    name: state.player,
    score: state.score,
    date: new Date().toISOString(),
  });
  localStorage.setItem("missionRoseLeaders", JSON.stringify(saved));
}

function renderResult(leaders = state.globalLeaders, status = "loaded") {
  els.summary.textContent = text("summary")(state.player, formatNumber(state.score));

  els.leaderboard.innerHTML = "";
  leaders.slice(0, 5).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} — ${formatNumber(item.score)} ${text("points")}`;
    els.leaderboard.appendChild(li);
  });

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

async function submitGlobalScore() {
  const submittedRunId = state.savedScoreId;
  const submittedScore = state.score;
  const submittedName = state.player;
  try {
    const response = await fetch("/api/leaderboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: submittedName, score: submittedScore }),
    });
    if (!response.ok) throw new Error("Classement Supabase indisponible");
    const result = await response.json();
    if (state.savedScoreId !== submittedRunId) return;
    state.globalScoreId = result.id;
    state.globalLeaders = result.leaders || [];

    if (state.score !== submittedScore) {
      await updateGlobalScore();
    } else {
      renderResult(state.globalLeaders, "loaded");
    }
  } catch (error) {
    console.error("Mission Rose global score could not be saved:", error.message);
    if (state.savedScoreId !== submittedRunId) return;
    renderResult([], "error");
  }
}

async function updateGlobalScore() {
  if (!state.globalScoreId) return;
  const updatedRunId = state.savedScoreId;
  try {
    const response = await fetch("/api/leaderboard", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: state.globalScoreId, score: state.score }),
    });
    if (!response.ok) throw new Error("Mise à jour du score mondial impossible");
    const result = await response.json();
    if (state.savedScoreId !== updatedRunId) return;
    state.globalLeaders = result.leaders || [];
    renderResult(state.globalLeaders, "loaded");
  } catch (error) {
    console.error("Mission Rose global score could not be updated:", error.message);
    if (state.savedScoreId !== updatedRunId) return;
    renderResult(state.globalLeaders, "error");
  }
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

function awardDonationClick(category) {
  const points = chariowProducts[category]?.points || 0;
  if (!points) return;
  const notice = document.getElementById("donation-bonus-note");

  if (!state.gameStarted && !state.gameFinished) {
    state.pendingDonationPoints += points;
    notice.textContent = text("donationBonusQueued")(points);
    return;
  }

  state.score += points;
  notice.textContent = text("donationBonusAdded")(points);

  if (state.gameFinished) {
    const saved = JSON.parse(localStorage.getItem("missionRoseLeaders") || "[]");
    const scoreEntry = saved.find((item) => item.id === state.savedScoreId);
    if (scoreEntry) {
      scoreEntry.score = state.score;
      localStorage.setItem("missionRoseLeaders", JSON.stringify(saved));
    }
    renderResult();
    drawBadge();
    updateGlobalScore();
    return;
  }

  els.score.textContent = formatNumber(state.score);
  els.score.parentElement.classList.remove("score-pop");
  void els.score.parentElement.offsetWidth;
  els.score.parentElement.classList.add("score-pop");
  window.setTimeout(() => els.score.parentElement.classList.remove("score-pop"), 850);
}

function closeDonation() {
  els.modal.hidden = true;
  els.chariowDonationWidget.hidden = true;
}

function restart() {
  state.player = "";
  state.gameStarted = false;
  state.gameFinished = false;
  state.savedScoreId = null;
  state.globalScoreId = null;
  state.globalLeaders = [];
  showScreen("home");
}

els.form.addEventListener("submit", startGame);
els.next.addEventListener("click", nextRound);
els.restart.addEventListener("click", restart);
els.cameraBtn.addEventListener("click", enableCamera);
els.captureBtn.addEventListener("click", capturePhoto);

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action], [data-category]");
  if (!target) return;

  const action = target.dataset.action;
  if (action === "share") shareScore();
  if (action === "donate") openDonation();
  if (action === "close-donation") closeDonation();

  const category = target.dataset.category;
  if (category) {
    awardDonationClick(category);
    openDonation(category);
  }
});

drawBadge();
