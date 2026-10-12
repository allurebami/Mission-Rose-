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
  medium: { label: "Moyen", multiplier: 1.5, rounds: 4 },
  hard: { label: "Dur", multiplier: 2, rounds: 4 },
};

const levelScoring = [
  { correct: 250, incorrect: 120, completion: 400, perfect: 100 },
  { correct: 275, incorrect: 125, completion: 450, perfect: 125 },
  { correct: 300, incorrect: 130, completion: 500, perfect: 150 },
  { correct: 325, incorrect: 135, completion: 550, perfect: 175 },
  { correct: 350, incorrect: 140, completion: 600, perfect: 200 },
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

const difficultyScenarioLevels = {
  "fr": {
    "medium": [
      {
        "title": "Niveau 1 : Écouter sans juger",
        "theme": "Accueillir la parole",
        "instruction": "Une proche te confie une inquiétude. Choisis une réponse qui l’écoute et respecte ce qu’elle ressent.",
        "good": [
          "Je t’écoute",
          "Je te crois",
          "Je suis avec toi",
          "Parle à ton rythme"
        ],
        "bad": [
          "Tu exagères",
          "Ce n’est rien",
          "Tu dois te taire",
          "Je vais en parler"
        ],
        "message": "Une écoute attentive peut aider une femme à se sentir soutenue.",
        "goodExplanation": "Écouter avec respect aide à créer un espace de confiance.",
        "badExplanation": "Minimiser ou partager sa parole sans accord peut la blesser."
      },
      {
        "title": "Niveau 2 : Accompagner sans imposer",
        "theme": "Soutenir ses choix",
        "instruction": "Une femme cherche la prochaine étape qui lui convient. Choisis les mots qui l’accompagnent sans décider à sa place.",
        "good": [
          "Que souhaites-tu faire ?",
          "Je peux venir avec toi",
          "Prenons le temps",
          "Tu peux choisir"
        ],
        "bad": [
          "Je décide pour toi",
          "Tu dois m’obéir",
          "Fais-le tout de suite",
          "Tu n’as pas le choix"
        ],
        "message": "Le soutien respecte le rythme et les décisions de la personne concernée.",
        "goodExplanation": "Proposer de l’aide tout en laissant le choix respecte son autonomie.",
        "badExplanation": "Imposer une décision peut renforcer la peur et le sentiment d’isolement."
      },
      {
        "title": "Niveau 3 : Vérifier avant de partager",
        "theme": "Choisir une information fiable",
        "instruction": "Tu reçois un conseil de santé sur les réseaux sociaux. Choisis le réflexe le plus prudent.",
        "good": [
          "Vérifier la source",
          "Chercher un avis fiable",
          "Poser une question",
          "Ne pas relayer le doute"
        ],
        "bad": [
          "Partager sans vérifier",
          "Promettre un remède",
          "Croire une rumeur",
          "Décourager une consultation"
        ],
        "message": "Prendre le temps de vérifier protège contre les rumeurs et les fausses promesses.",
        "goodExplanation": "Vérifier l’information évite de transmettre un conseil trompeur.",
        "badExplanation": "Une rumeur ou une promesse non vérifiée peut détourner d’une aide adaptée."
      },
      {
        "title": "Niveau 4 : Protéger sa confidence",
        "theme": "Respecter son intimité",
        "instruction": "Une proche t’a confié une situation personnelle. Choisis la réaction qui protège sa confiance.",
        "good": [
          "Garder sa confidence",
          "Demander son accord",
          "Respecter son intimité",
          "La laisser raconter"
        ],
        "bad": [
          "Publier son histoire",
          "Envoyer sa photo",
          "En parler à tout le monde",
          "La forcer à expliquer"
        ],
        "message": "La solidarité passe aussi par le respect de la vie privée.",
        "goodExplanation": "Demander l’accord de la personne protège sa dignité et sa confiance.",
        "badExplanation": "Diffuser une histoire personnelle sans autorisation peut lui nuire."
      },
      {
        "title": "Niveau 5 : Apporter une aide concrète",
        "theme": "Agir avec elle",
        "instruction": "Une amie a besoin de soutien. Choisis une action utile qui tient compte de ses besoins.",
        "good": [
          "Prendre de ses nouvelles",
          "Proposer un trajet",
          "L’accompagner si elle veut",
          "Demander ce qui l’aiderait"
        ],
        "bad": [
          "L’abandonner",
          "Parler à sa place",
          "L’obliger à accepter",
          "Faire des promesses impossibles"
        ],
        "message": "Un geste concret et respectueux peut rendre le soutien plus présent.",
        "goodExplanation": "Une aide choisie avec la personne est plus utile et respectueuse.",
        "badExplanation": "Aider sans écouter ses besoins peut ajouter de la pression."
      }
    ],
    "hard": [
      {
        "title": "Niveau 1 : Accueillir une confidence",
        "theme": "Répondre avec empathie",
        "instruction": "Une femme te confie une inquiétude et te demande de ne pas la répéter. Choisis la réponse la plus respectueuse.",
        "good": [
          "Merci de me faire confiance",
          "Je garderai ta confidence",
          "Que puis-je faire pour toi ?",
          "Tu gardes le choix"
        ],
        "bad": [
          "Je vais prévenir tout le monde",
          "Tu dramatises",
          "Je vais décider",
          "Je vais publier pour t’aider"
        ],
        "message": "Une confidence appelle d’abord l’écoute, la discrétion et le respect du choix.",
        "goodExplanation": "L’écoute et le respect de la confidentialité renforcent la confiance.",
        "badExplanation": "Exposer ou minimiser une confidence peut briser la confiance."
      },
      {
        "title": "Niveau 2 : Répondre à une rumeur",
        "theme": "Ne pas relayer de fausse promesse",
        "instruction": "Dans un groupe, quelqu’un partage un prétendu remède miracle. Choisis une réaction responsable.",
        "good": [
          "Ne pas le relayer",
          "Vérifier la source",
          "Rappeler qu’une rumeur n’est pas une preuve",
          "Orienter vers une information fiable"
        ],
        "bad": [
          "Le partager à tous",
          "Garantir qu’il guérit",
          "Se moquer de la personne",
          "Dire d’éviter tout professionnel"
        ],
        "message": "Face à une affirmation de santé, prudence et vérification sont essentielles.",
        "goodExplanation": "Ne pas relayer une affirmation non vérifiée limite la désinformation.",
        "badExplanation": "Présenter une rumeur comme une certitude peut mettre les autres en difficulté."
      },
      {
        "title": "Niveau 3 : Soutenir sans pression",
        "theme": "Respecter son rythme",
        "instruction": "Une amie hésite à parler de sa situation. Choisis une réponse qui reste présente sans la forcer.",
        "good": [
          "Je suis là quand tu veux",
          "Tu peux choisir à qui parler",
          "Je peux t’écouter",
          "Prends le temps qu’il te faut"
        ],
        "bad": [
          "Raconte-moi tout maintenant",
          "Je vais parler à ta place",
          "Tu n’as pas le droit d’hésiter",
          "Je vais te forcer à agir"
        ],
        "message": "Rester disponible sans pression aide à préserver le lien de confiance.",
        "goodExplanation": "Laisser la personne choisir son rythme respecte ses besoins.",
        "badExplanation": "La pression peut l’empêcher de demander de l’aide plus tard."
      },
      {
        "title": "Niveau 4 : Protéger sa dignité",
        "theme": "Demander avant d’agir",
        "instruction": "Tu veux mobiliser d’autres personnes pour soutenir une femme. Choisis la démarche qui respecte son intimité.",
        "good": [
          "Lui demander son accord",
          "Partager seulement ce qu’elle accepte",
          "La laisser décider qui prévenir",
          "Préserver ses informations personnelles"
        ],
        "bad": [
          "Publier son nom",
          "Diffuser son histoire",
          "Partager sa photo sans accord",
          "Décider qui doit être informé"
        ],
        "message": "La solidarité doit protéger la dignité et le consentement de la personne.",
        "goodExplanation": "Demander son accord lui permet de garder le contrôle sur son histoire.",
        "badExplanation": "Diffuser ses informations sans son accord porte atteinte à sa vie privée."
      },
      {
        "title": "Niveau 5 : Construire un soutien durable",
        "theme": "Passer de l’intention à l’action",
        "instruction": "Tu veux continuer à soutenir une proche après une première conversation. Choisis une démarche utile et réaliste.",
        "good": [
          "Lui demander comment elle va",
          "Proposer une aide précise",
          "Respecter sa réponse",
          "Tenir les engagements pris"
        ],
        "bad": [
          "Promettre ce que tu ne peux pas faire",
          "Disparaître après l’échange",
          "Prendre toutes les décisions",
          "Lui reprocher ses choix"
        ],
        "message": "Un soutien durable repose sur l’écoute, des gestes réalistes et le respect.",
        "goodExplanation": "Une aide concrète et tenue dans le temps nourrit la confiance.",
        "badExplanation": "Les promesses irréalistes ou le jugement fragilisent le soutien."
      }
    ]
  },
  "en": {
    "medium": [
      {
        "title": "Level 1: Listen without judgment",
        "theme": "Make space for her voice",
        "instruction": "A friend shares a worry with you. Choose a response that listens and respects how she feels.",
        "good": [
          "I’m listening",
          "I believe you",
          "I’m here with you",
          "Take your time"
        ],
        "bad": [
          "You’re exaggerating",
          "It’s nothing",
          "Keep quiet",
          "I’ll tell everyone"
        ],
        "message": "Careful listening can help someone feel supported.",
        "goodExplanation": "Listening with respect helps create trust.",
        "badExplanation": "Dismissing or sharing her words without consent can hurt her."
      },
      {
        "title": "Level 2: Support without taking over",
        "theme": "Respect her choices",
        "instruction": "Someone is deciding what to do next. Choose words that support her without deciding for her.",
        "good": [
          "What would you like to do?",
          "I can come with you",
          "We can take our time",
          "You can choose"
        ],
        "bad": [
          "I’ll decide for you",
          "You must obey me",
          "Do it right now",
          "You have no choice"
        ],
        "message": "Support respects a person’s pace and decisions.",
        "goodExplanation": "Offering help while leaving the choice to her respects her autonomy.",
        "badExplanation": "Imposing a decision can increase fear and isolation."
      },
      {
        "title": "Level 3: Check before sharing",
        "theme": "Choose reliable information",
        "instruction": "You see a health claim on social media. Choose the most careful response.",
        "good": [
          "Check the source",
          "Find reliable guidance",
          "Ask a question",
          "Don’t share unverified claims"
        ],
        "bad": [
          "Share it without checking",
          "Promise a cure",
          "Believe a rumor",
          "Discourage seeking advice"
        ],
        "message": "Checking first helps prevent rumors and false promises from spreading.",
        "goodExplanation": "Verifying information helps prevent sharing misleading advice.",
        "badExplanation": "Rumors and unverified promises can distract from appropriate support."
      },
      {
        "title": "Level 4: Protect her confidence",
        "theme": "Respect her privacy",
        "instruction": "A friend has shared something personal. Choose the response that protects her trust.",
        "good": [
          "Keep her confidence",
          "Ask for permission",
          "Respect her privacy",
          "Let her tell her story"
        ],
        "bad": [
          "Post her story",
          "Share her photo",
          "Tell everyone",
          "Force her to explain"
        ],
        "message": "Solidarity also means respecting someone’s privacy.",
        "goodExplanation": "Asking permission protects her dignity and trust.",
        "badExplanation": "Sharing someone’s personal story without consent can harm them."
      },
      {
        "title": "Level 5: Offer practical help",
        "theme": "Take action together",
        "instruction": "A friend needs support. Choose a useful action that takes her needs into account.",
        "good": [
          "Check in with her",
          "Offer a ride",
          "Go with her if she wants",
          "Ask what would help"
        ],
        "bad": [
          "Leave her alone",
          "Speak for her",
          "Make her accept",
          "Make promises you can’t keep"
        ],
        "message": "A practical, respectful gesture can make support tangible.",
        "goodExplanation": "Help chosen together is more useful and respectful.",
        "badExplanation": "Acting without listening can add pressure."
      }
    ],
    "hard": [
      {
        "title": "Level 1: Respond to a confidence",
        "theme": "Answer with empathy",
        "instruction": "A woman shares a worry and asks you to keep it private. Choose the most respectful response.",
        "good": [
          "Thank you for trusting me",
          "I’ll keep this private",
          "How can I support you?",
          "You remain in control"
        ],
        "bad": [
          "I’ll tell everyone",
          "You’re overreacting",
          "I’ll make the decision",
          "I’ll post it to help"
        ],
        "message": "A confidence calls for listening, discretion, and respect for choice.",
        "goodExplanation": "Listening and respecting privacy build trust.",
        "badExplanation": "Exposing or dismissing a confidence can break trust."
      },
      {
        "title": "Level 2: Respond to a rumor",
        "theme": "Don’t spread false promises",
        "instruction": "Someone shares a supposed miracle cure in a group chat. Choose a responsible response.",
        "good": [
          "Don’t forward it",
          "Check the source",
          "A rumor is not proof",
          "Point to reliable information"
        ],
        "bad": [
          "Send it to everyone",
          "Guarantee it works",
          "Mock the person",
          "Tell people to avoid professionals"
        ],
        "message": "Health claims call for care and verification.",
        "goodExplanation": "Not sharing unverified claims helps limit misinformation.",
        "badExplanation": "Treating a rumor as fact can put others at risk."
      },
      {
        "title": "Level 3: Support without pressure",
        "theme": "Respect her pace",
        "instruction": "A friend is not ready to talk. Choose a response that stays supportive without forcing her.",
        "good": [
          "I’m here when you’re ready",
          "You choose who to tell",
          "I can listen",
          "Take the time you need"
        ],
        "bad": [
          "Tell me everything now",
          "I’ll speak for you",
          "You can’t hesitate",
          "I’ll force you to act"
        ],
        "message": "Being available without pressure helps protect trust.",
        "goodExplanation": "Letting someone choose their pace respects their needs.",
        "badExplanation": "Pressure can make it harder to ask for help later."
      },
      {
        "title": "Level 4: Protect her dignity",
        "theme": "Ask before acting",
        "instruction": "You want to bring others in to support someone. Choose the approach that respects her privacy.",
        "good": [
          "Ask for her consent",
          "Share only what she agrees to",
          "Let her choose who to tell",
          "Protect her personal details"
        ],
        "bad": [
          "Post her name",
          "Share her story",
          "Use her photo without consent",
          "Decide who should know"
        ],
        "message": "Solidarity should protect dignity and consent.",
        "goodExplanation": "Asking first lets her stay in control of her story.",
        "badExplanation": "Sharing details without consent violates her privacy."
      },
      {
        "title": "Level 5: Build lasting support",
        "theme": "Turn care into action",
        "instruction": "You want to keep supporting a friend after your first conversation. Choose a useful, realistic step.",
        "good": [
          "Check in with her",
          "Offer specific help",
          "Respect her answer",
          "Keep the commitments you make"
        ],
        "bad": [
          "Promise what you can’t do",
          "Disappear after the talk",
          "Make every decision",
          "Blame her choices"
        ],
        "message": "Lasting support is built on listening, realistic help, and respect.",
        "goodExplanation": "Practical help followed through builds trust.",
        "badExplanation": "Unrealistic promises and judgment weaken support."
      }
    ]
  }
};


module.exports = { levels, difficultyConfig, levelScoring, explanations, otherLevels, englishLevels, difficultyScenarioLevels };
