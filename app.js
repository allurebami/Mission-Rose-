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
  donationWhatsapp: document.getElementById("donation-whatsapp"),
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
  return levels[state.levelIndex];
}

function startGame(event) {
  event.preventDefault();
  state.player = els.playerName.value.trim() || "Joueuse Rose";
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
  const goodWord = level.good[state.roundIndex % level.good.length];
  const badWord = level.bad[state.roundIndex % level.bad.length];
  const choices = shuffle([
    { text: goodWord, type: "good", explanation: explanations[goodWord] },
    { text: badWord, type: "bad", explanation: explanations[badWord] },
  ]);

  els.levelTitle.textContent = level.title;
  els.levelTheme.textContent = `${level.theme} · ${config.label}`;
  els.levelInstruction.textContent = level.instruction;
  els.score.textContent = state.score.toLocaleString("fr-FR");
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

  els.score.textContent = state.score.toLocaleString("fr-FR");
  playAnswerSound(type);
  triggerAnswerEffect(type, Math.round(points * config.multiplier));
  els.feedback.textContent =
    type === "good"
      ? `Bonne réponse : +${Math.round(250 * config.multiplier)} points. ${choice.explanation}`
      : `Mauvaise réponse : ce mot bloque l'action. ${choice.explanation}`;
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

  els.summary.textContent = `${state.player}, ton score est de ${state.score.toLocaleString(
    "fr-FR"
  )} points. Tu as transformé les mots qui bloquent en mots qui sauvent.`;

  els.leaderboard.innerHTML = "";
  leaders.slice(0, 5).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} — ${item.score.toLocaleString("fr-FR")} pts`;
    els.leaderboard.appendChild(li);
  });

  els.rankMessage.textContent =
    rank <= 5
      ? `Tu es dans le Top 5 à la position ${rank}.`
      : `Tu es actuellement ${rank}e. Rejoue en mode plus difficile pour viser le Top 5.`;
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
  ctx.fillText("Je soutiens Octobre Rose", 112, 220);

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
  wrapText(ctx, "Elle gagne quand elle sait. Elle gagne quand elle se protège.", 72, 850, width - 144, 58);

  ctx.fillStyle = "#ffffff";
  roundRect(ctx, 72, 988, width - 144, 92, 46);
  ctx.fill();

  ctx.fillStyle = "#a5144f";
  ctx.font = "800 54px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`${state.score.toLocaleString("fr-FR")} pts`, width / 2, 1048);
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
    showLevelMessage(
      "La caméra n'est pas disponible. Tu peux quand même télécharger le badge sans photo.",
      () => {}
    );
  }
}

function capturePhoto() {
  if (!state.stream) return;
  drawBadge(els.camera);
}

function shareScore() {
  const text = `Je viens de terminer Mission Rose, soutenu par ellegagne.com. Mon score : ${state.score.toLocaleString(
    "fr-FR"
  )} points. Et toi, peux-tu entrer dans le Top 5 ?`;
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function openDonation(amount = 2000) {
  const text = `Bonjour ElleGagne, je veux faire un don de ${Number(amount).toLocaleString(
    "fr-FR"
  )} FCFA pour soutenir les 5 femmes dans le besoin avec Mission Rose.`;
  els.donationWhatsapp.href = `https://wa.me/?text=${encodeURIComponent(text)}`;
  els.modal.hidden = false;
}

function closeDonation() {
  els.modal.hidden = true;
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
  const action = event.target.dataset.action;
  if (action === "share") shareScore();
  if (action === "donate") openDonation();
  if (action === "close-donation") closeDonation();

  const amount = event.target.dataset.amount;
  if (amount) openDonation(amount);
});

drawBadge();
