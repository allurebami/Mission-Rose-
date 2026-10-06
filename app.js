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

const initialLeaders = [
  { name: "Grâce M.", score: 12400 },
  { name: "Sandra K.", score: 11950 },
  { name: "Aïcha B.", score: 11600 },
  { name: "Mireille N.", score: 10850 },
  { name: "Carine T.", score: 10200 },
];

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
  .find((value) => ["fr", "en"].includes(value));
const language = browserLanguage || "fr";
const numberLocale = language === "en" ? "en-US" : "fr-FR";

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
    leaderboard: "Top 5 Mission Rose", share: "Partager mon score", donate: "Faire un don maintenant",
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
    answerGood: (points, explanation) => `Bonne réponse : +${points} points. ${explanation}`,
    answerBad: (explanation) => `Mauvaise réponse : ce mot bloque l'action. ${explanation}`,
    summary: (name, score) => `${name}, ton score est de ${score} points. Tu as transformé les mots qui bloquent en mots qui sauvent.`,
    rankTop: (rank) => `Tu es dans le Top 5 à la position ${rank}.`,
    rankOther: (rank) => `Tu es actuellement ${rank}e. Rejoue en mode plus difficile pour viser le Top 5.`,
    points: "pts", levelComplete: "Niveau terminé", cameraError: "La caméra n'est pas disponible. Tu peux quand même télécharger le badge sans photo.",
    shareText: (score) => `Je viens de terminer Mission Rose, soutenu par ellegagne.com. Mon score : ${score} points. Et toi, peux-tu entrer dans le Top 5 ?`,
    badgeMessage: "Je soutiens Octobre Rose", badgeSentence: "Elle gagne quand elle sait. Elle gagne quand elle se protège.",
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
    leaderboard: "Mission Rose Top 5", share: "Share my score", donate: "Donate now",
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
    answerGood: (points, explanation) => `Correct answer: +${points} points. ${explanation}`,
    answerBad: (explanation) => `Not quite: this word can delay action. ${explanation}`,
    summary: (name, score) => `${name}, your score is ${score} points. You turned words that hold us back into words that save lives.`,
    rankTop: (rank) => `You are in the Top 5 at position ${rank}.`,
    rankOther: (rank) => {
      const remainder = rank % 100;
      const suffix = remainder >= 11 && remainder <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" }[rank % 10] || "th");
      return `You are currently in ${rank}${suffix} place. Try a harder level to reach the Top 5.`;
    },
    points: "pts", levelComplete: "Level complete", cameraError: "The camera is unavailable. You can still download your badge without a photo.",
    shareText: (score) => `I just completed Mission Rose, supported by ellegagne.com. My score: ${score} points. Can you make the Top 5?`,
    badgeMessage: "I support Breast Cancer Awareness", badgeSentence: "She wins when she knows. She wins when she protects herself.",
  },
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
  document.title = "Mission Rose";
  const english = language === "en";
  const description = english
    ? "Mission Rose is an awareness game supported by ellegagne.com. Learn about breast health, share your score and support five women in need."
    : "Mission Rose, un mini-jeu Octobre Rose soutenu par ellegagne.com pour apprendre les mots qui sauvent, partager son score et soutenir 5 femmes dans le besoin.";
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
    "donation-progress-label": "progressLabel", "donation-total-title": "totalTitle",
    "donation-total-amount": "totalLoading", "donation-total-note": "totalNote", "transparency-note": "transparency",
    "level-message-title": "levelComplete", "level-message-btn": "next",
    "close-donation": "close",
  };
  Object.entries(nodes).forEach(([id, key]) => {
    const node = document.getElementById(id);
    if (node) node.textContent = text(key);
  });
  document.getElementById("player-name").placeholder = text("playerPlaceholder");
  document.getElementById("filter-description").innerHTML = text("filterDescription");
  document.querySelector(".donation-progress").setAttribute("aria-label", text("progressAria"));
  document.getElementById("level-progress-wrap").setAttribute("aria-label", text("levelProgressAria"));
  document.getElementById("close-donation").setAttribute("aria-label", text("close"));
  document.getElementById("chariow-widget").dataset.locale = language;
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
  return language === "en" ? englishLevels[state.levelIndex] : levels[state.levelIndex];
}

function startGame(event) {
  event.preventDefault();
  state.player = els.playerName.value.trim() || (language === "en" ? "Rose Player" : "Joueuse Rose");
  state.difficulty = els.difficulty.value;
  state.levelIndex = 0;
  state.roundIndex = 0;
  state.score = 0;
  state.selected = false;
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
    { text: goodWord, type: "good", explanation: language === "en" ? level.goodExplanations[wordIndex] : explanations[goodWord] },
    { text: badWord, type: "bad", explanation: language === "en" ? level.badExplanations[wordIndex] : explanations[badWord] },
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
  els.progress.style.width = "100%";
  saveScore();
  renderResult();
  drawBadge();
  showScreen("result");
}

function getLeaders() {
  const saved = JSON.parse(localStorage.getItem("missionRoseLeaders") || "[]");
  return [...initialLeaders, ...saved].sort((a, b) => b.score - a.score);
}

function saveScore() {
  const saved = JSON.parse(localStorage.getItem("missionRoseLeaders") || "[]");
  saved.push({
    name: state.player,
    score: state.score,
    date: new Date().toISOString(),
  });
  localStorage.setItem("missionRoseLeaders", JSON.stringify(saved));
}

function renderResult() {
  const leaders = getLeaders();
  const rank = leaders.findIndex(
    (item) => item.name === state.player && item.score === state.score
  ) + 1;

  els.summary.textContent = text("summary")(state.player, formatNumber(state.score));

  els.leaderboard.innerHTML = "";
  leaders.slice(0, 5).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} — ${formatNumber(item.score)} ${text("points")}`;
    els.leaderboard.appendChild(li);
  });

  els.rankMessage.textContent = rank <= 5 ? text("rankTop")(rank) : text("rankOther")(rank);
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
  drawBadge(els.camera);
}

function shareScore() {
  const message = text("shareText")(formatNumber(state.score));
  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

let chariowLoaded = false;
let chariowButtonObserver = null;
let donationRefreshTimer = null;
const chariowProducts = {
  "geste-rose": { id: "prd_gz0nbtei", label: "Geste Rose" },
  "elan-rose": { id: "prd_3lo0zuwp", label: "Élan Rose" },
  "cercle-rose": { id: "prd_0ub0fd3d", label: "Cercle Rose" },
  "ambassadeur-rose": { id: "prd_hp8bw4xy", label: "Ambassadeur Rose" },
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
    els.chariowWidget.dataset.locale = language;
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
  loadDonationTotal();
  if (donationRefreshTimer) window.clearInterval(donationRefreshTimer);
  donationRefreshTimer = window.setInterval(() => {
    if (!els.modal.hidden) loadDonationTotal();
  }, 60000);
}

function closeDonation() {
  els.modal.hidden = true;
  els.chariowDonationWidget.hidden = true;
  if (donationRefreshTimer) window.clearInterval(donationRefreshTimer);
  donationRefreshTimer = null;
}

async function loadDonationTotal() {
  const amount = document.getElementById("donation-total-amount");
  const note = document.getElementById("donation-total-note");
  try {
    const response = await fetch("/api/donations", { cache: "no-store" });
    if (!response.ok) throw new Error("Total indisponible");
    const result = await response.json();
    const formatted = new Intl.NumberFormat(numberLocale, {
      style: "currency",
      currency: result.currency || "XAF",
      maximumFractionDigits: 0,
    }).format(result.total || 0);
    amount.textContent = formatted;
    note.textContent = text("totalUpdated");
  } catch (error) {
    amount.textContent = text("totalUnavailable");
    note.textContent = text("totalError");
  }
}

function restart() {
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
  if (category) openDonation(category);
});

drawBadge();
