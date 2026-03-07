export type LangCode = 'en' | 'zh' | 'hi' | 'es' | 'ar' | 'pt' | 'id' | 'fr' | 'de' | 'ko' | 'ja';
export type PresetId =
  | 'three-body'
  | 'figure-8'
  | 'solar-system'
  | 'binary-star'
  | 'l4-l5'
  | 'hierarchical';

export const DEFAULT_LANG: LangCode = 'en';

export interface EducationContent {
  title: string;
  summary: string;
  whatToNotice: string;
  tryThis: string[];
}

export interface UIStrings {
  siteTitle: string;
  siteDescription: string;
  appTitle: string;
  play: string;
  pause: string;
  reset: string;
  more: string;
  less: string;
  guide: string;
  close: string;
  bodies: string;
  time: string;
  preset: string;
  timeSpeed: string;
  gConstant: string;
  trailLength: string;
  bodyList: string;
  add: string;
  currentPreset: string;
  tryThis: string;
  threeBodyIntro: string;
  guideQuestion: string;
  guideTeaser: string;
  chooseLanguage: string;
  languageHint: string;
  trailWarning: string;
  mass: string;
  x: string;
  y: string;
  vx: string;
  vy: string;
  notFoundMessage: string;
  returnHome: string;
  presetNames: Record<PresetId, string>;
}

export interface LanguagePack {
  strings: UIStrings;
  education: Record<PresetId, EducationContent>;
}

export const LANGUAGE_OPTIONS: Array<{ code: LangCode; nativeName: string; englishName: string }> = [
  { code: 'en', nativeName: 'English', englishName: 'English' },
  { code: 'zh', nativeName: '中文', englishName: 'Chinese' },
  { code: 'hi', nativeName: 'हिन्दी', englishName: 'Hindi' },
  { code: 'es', nativeName: 'Español', englishName: 'Spanish' },
  { code: 'ar', nativeName: 'العربية', englishName: 'Arabic' },
  { code: 'pt', nativeName: 'Português', englishName: 'Portuguese' },
  { code: 'id', nativeName: 'Bahasa Indonesia', englishName: 'Indonesian' },
  { code: 'fr', nativeName: 'Français', englishName: 'French' },
  { code: 'de', nativeName: 'Deutsch', englishName: 'German' },
  { code: 'ko', nativeName: '한국어', englishName: 'Korean' },
  { code: 'ja', nativeName: '日本語', englishName: 'Japanese' },
];

const EN_PACK: LanguagePack = {
  strings: {
    siteTitle: 'N-Body Playground',
    siteDescription: 'Interactive N-body gravity playground for education and experiments.',
    appTitle: 'N-Body Simulation',
    play: 'Play',
    pause: 'Pause',
    reset: 'Reset',
    more: 'More',
    less: 'Less',
    guide: 'Guide',
    close: 'Close',
    bodies: 'Bodies',
    time: 'Time',
    preset: 'Preset',
    timeSpeed: 'Time Speed',
    gConstant: 'G Constant',
    trailLength: 'Trail Length',
    bodyList: 'Bodies',
    add: 'Add',
    currentPreset: 'Current Preset',
    tryThis: 'Try This',
    threeBodyIntro:
      'The three-body problem asks what happens when three objects pull on one another at the same time. Tiny changes can lead to very different futures.',
    guideQuestion: 'What is the Three-Body Problem?',
    guideTeaser:
      'It is a famous science mystery, and it even inspired a Netflix original series. Tap to explore.',
    chooseLanguage: 'Choose Language',
    languageHint: 'Choose the language you are most comfortable with.',
    trailWarning: 'Very long trails can slow down your browser.',
    mass: 'Mass',
    x: 'X',
    y: 'Y',
    vx: 'Vx',
    vy: 'Vy',
    notFoundMessage: 'Page not found',
    returnHome: 'Return to Home',
    presetNames: {
      'three-body': 'Three Body',
      'figure-8': 'Figure-8',
      'solar-system': 'Solar System',
      'binary-star': 'Binary Star',
      'l4-l5': 'L4/L5 Trojan',
      hierarchical: 'Hierarchical Triple',
    },
  },
  education: {
    'three-body': {
      title: 'Three Body',
      summary: 'Three equal masses start in a balanced pattern and orbit together.',
      whatToNotice: 'The motion starts symmetric, then can slowly drift because tiny differences grow.',
      tryThis: [
        'Set Time Speed to 0.6x and watch the first loops carefully.',
        'Raise G from 5 to around 7 and compare how tight the turns become.',
        'Change one body mass from 200 to 210 and see how fast symmetry breaks.',
      ],
    },
    'figure-8': {
      title: 'Figure-8',
      summary: 'Three equal masses share one path shaped like an 8.',
      whatToNotice: 'This famous orbit needs very precise starting values to stay clean.',
      tryThis: [
        'Keep Time Speed near 0.5x and increase Trail Length to reveal the full 8.',
        'Change one mass from 100 to 102 and watch the clean pattern fade.',
        'Reset and compare the original orbit against your edited one.',
      ],
    },
    'solar-system': {
      title: 'Solar System (Toy Model)',
      summary: 'One heavy center body with lighter planets around it.',
      whatToNotice: 'The heaviest body dominates the motion, while faster planets make tighter orbits.',
      tryThis: [
        'Lower G to 3 and see orbits open up and move more slowly.',
        'Increase Sun mass from 1000 to 1300 and observe stronger bending.',
        'Set P3 Vx from -1.6 to about -2.0 and compare orbit size.',
      ],
    },
    'binary-star': {
      title: 'Binary Star',
      summary: 'Two heavy stars orbit each other while a light planet moves nearby.',
      whatToNotice: 'The planet path can become chaotic because two moving stars pull at once.',
      tryThis: [
        'Set Time Speed to 0.7x and follow the planet trail.',
        'Change planet Vx from -2.2 to -2.8 and test if it moves farther out.',
        'Increase one star mass from 500 to 650 and watch the center shift.',
      ],
    },
    'l4-l5': {
      title: 'L4/L5 Trojan',
      summary: 'A tiny body starts near a triangular balance point of two larger bodies.',
      whatToNotice: 'The small body can stay near a moving triangle point, like Trojan asteroids.',
      tryThis: [
        'Set Time Speed to 0.5x and watch the triangle shape over time.',
        'Increase Trojan mass from 0.5 to 2 and check if motion gets rougher.',
        'Move Trojan Y a little and test whether it stays nearby.',
      ],
    },
    hierarchical: {
      title: 'Hierarchical Triple',
      summary: 'A close inner pair orbits quickly, while a third body stays far away.',
      whatToNotice: 'Large distance gaps often make long-term behavior calmer.',
      tryThis: [
        'Increase Outer C mass from 30 to 80 and watch inner orbit disturbance.',
        'Move Outer C closer (Y 620 -> 500) and compare stability.',
        'Use long trails to see fast inner loops and slow outer loops.',
      ],
    },
  },
};

const PACKS: Record<LangCode, LanguagePack> = {
  en: EN_PACK,
  zh: {
    strings: {
      ...EN_PACK.strings,
      siteTitle: '三体引力模拟器',
      siteDescription: '用于教学与实验的多体引力互动模拟。',
      appTitle: '三体引力模拟',
      guide: '导览',
      close: '关闭',
      bodies: '天体数',
      time: '时间',
      preset: '预设',
      timeSpeed: '时间倍率',
      gConstant: '引力常数 G',
      trailLength: '轨迹长度',
      bodyList: '天体列表',
      add: '添加',
      currentPreset: '当前预设',
      tryThis: '试试看',
      threeBodyIntro: '三体问题研究三个天体同时相互引力时会发生什么。极小变化也会带来完全不同的长期结果。',
      guideQuestion: '什么是三体问题？',
      guideTeaser: '这是著名科学难题，中国科幻作家刘慈欣的《三体》让更多人认识了它。点击查看。',
      chooseLanguage: '选择语言',
      languageHint: '请选择你最熟悉的语言。',
      trailWarning: '轨迹过长可能会让浏览器变慢。',
      mass: '质量',
      x: 'X 坐标',
      y: 'Y 坐标',
      vx: 'X 速度',
      vy: 'Y 速度',
      notFoundMessage: '页面不存在',
      returnHome: '返回首页',
      presetNames: {
        'three-body': '三体',
        'figure-8': '8 字轨道',
        'solar-system': '太阳系',
        'binary-star': '双星系统',
        'l4-l5': 'L4/L5 特洛伊点',
        hierarchical: '层级三体',
      },
    },
    education: {
      'three-body': {
        title: '三体',
        summary: '三个等质量天体以近似对称方式开始运动。',
        whatToNotice: '开始看似稳定对称，但细微误差会逐渐放大。',
        tryThis: ['把时间倍率调到 0.6x 观察前几圈。', '把 G 从 5 提高到 7，比较转弯曲率。', '把一个天体质量从 200 调到 210，观察对称性何时破坏。'],
      },
      'figure-8': {
        title: '8 字轨道',
        summary: '三个等质量天体共享一条 8 字形路径。',
        whatToNotice: '这是经典特殊解，对初始条件非常敏感。',
        tryThis: ['时间倍率设为 0.5x 并增加轨迹长度。', '把一个质量从 100 改到 102，观察图形变形。', '重置后与原始轨道对比。'],
      },
      'solar-system': {
        title: '太阳系（简化模型）',
        summary: '一个重天体在中心，较轻天体在外侧运行。',
        whatToNotice: '中心大质量体主导整体轨道形态。',
        tryThis: ['把 G 降到 3，观察轨道变宽。', '把 Sun 质量从 1000 提到 1300。', '把 P3 的 Vx 从 -1.6 调到 -2.0 比较轨道大小。'],
      },
      'binary-star': {
        title: '双星系统',
        summary: '两颗大质量恒星互绕，一颗小行星受其共同影响。',
        whatToNotice: '双源引力会让小天体轨道更复杂。',
        tryThis: ['时间倍率设为 0.7x，跟踪行星轨迹。', '把行星 Vx 从 -2.2 改到 -2.8。', '将一颗恒星质量从 500 提到 650。'],
      },
      'l4-l5': {
        title: 'L4/L5 特洛伊点',
        summary: '小天体位于两大天体形成的三角平衡区域附近。',
        whatToNotice: '小天体可在移动平衡点附近长期停留。',
        tryThis: ['时间倍率 0.5x 观察三角关系。', '把 Trojan 质量从 0.5 提高到 2。', '微调 Trojan 的 Y 坐标并观察是否回稳。'],
      },
      hierarchical: {
        title: '层级三体',
        summary: '内层双星快速互绕，外层第三天体远距离运行。',
        whatToNotice: '层级结构常带来更稳定的长期行为。',
        tryThis: ['把 Outer C 质量从 30 改到 80。', '把 Outer C 的 Y 从 620 改到 500。', '加长轨迹看快慢两种时间尺度。'],
      },
    },
  },
  hi: {
    strings: {
      ...EN_PACK.strings,
      siteTitle: 'तीन-पिंड गुरुत्व सिम्युलेशन',
      siteDescription: 'सीखने और प्रयोग के लिए इंटरएक्टिव N-body गुरुत्व सिम्युलेटर।',
      appTitle: 'तीन-पिंड सिम्युलेशन',
      guide: 'गाइड',
      close: 'बंद करें',
      bodies: 'पिंड',
      time: 'समय',
      preset: 'प्रीसेट',
      timeSpeed: 'समय गति',
      gConstant: 'G स्थिरांक',
      trailLength: 'ट्रेल लंबाई',
      bodyList: 'पिंड सूची',
      add: 'जोड़ें',
      currentPreset: 'वर्तमान प्रीसेट',
      tryThis: 'इसे आज़माएँ',
      threeBodyIntro: 'तीन-पिंड समस्या पूछती है कि जब तीन पिंड एक साथ गुरुत्व से खींचते हैं तो क्या होता है। छोटी बदलाएँ भी बड़ा असर देती हैं।',
      guideQuestion: 'थ्री-बॉडी प्रॉब्लम क्या है?',
      guideTeaser: 'यह एक प्रसिद्ध वैज्ञानिक पहेली है और Netflix सीरीज़ से भी लोकप्रिय हुई। टैप करके देखें।',
      chooseLanguage: 'भाषा चुनें',
      languageHint: 'वही भाषा चुनें जिसमें पढ़ना आपके लिए सबसे आसान हो।',
      trailWarning: 'बहुत लंबी ट्रेल से ब्राउज़र धीमा हो सकता है।',
      mass: 'द्रव्यमान',
      x: 'X',
      y: 'Y',
      vx: 'Vx',
      vy: 'Vy',
      notFoundMessage: 'पेज नहीं मिला',
      returnHome: 'होम पर जाएँ',
      presetNames: {
        'three-body': 'थ्री बॉडी',
        'figure-8': 'फिगर-8',
        'solar-system': 'सौर मंडल',
        'binary-star': 'द्वि-तारा',
        'l4-l5': 'L4/L5 ट्रोजन',
        hierarchical: 'हायरार्किकल ट्रिपल',
      },
    },
    education: EN_PACK.education,
  },
  es: {
    strings: {
      ...EN_PACK.strings,
      siteTitle: 'Simulador de Tres Cuerpos',
      siteDescription: 'Simulación interactiva de gravedad N-body para aprender y experimentar.',
      appTitle: 'Simulación de Tres Cuerpos',
      guide: 'Guía',
      close: 'Cerrar',
      bodies: 'Cuerpos',
      time: 'Tiempo',
      preset: 'Escenario',
      timeSpeed: 'Velocidad del Tiempo',
      gConstant: 'Constante G',
      trailLength: 'Longitud de Trayectoria',
      bodyList: 'Lista de Cuerpos',
      add: 'Agregar',
      currentPreset: 'Escenario Actual',
      tryThis: 'Prueba Esto',
      threeBodyIntro: 'El problema de los tres cuerpos pregunta qué pasa cuando tres objetos se atraen a la vez. Cambios pequeños pueden crecer mucho.',
      guideQuestion: '¿Qué es el problema de los tres cuerpos?',
      guideTeaser: 'Es un famoso misterio científico y hasta inspiró una serie original de Netflix. Toca para explorar.',
      chooseLanguage: 'Elegir Idioma',
      languageHint: 'Elige el idioma con el que te sientas más cómodo.',
      trailWarning: 'Trayectorias muy largas pueden volver lento el navegador.',
      mass: 'Masa',
      x: 'X',
      y: 'Y',
      vx: 'Vx',
      vy: 'Vy',
      notFoundMessage: 'Página no encontrada',
      returnHome: 'Volver al inicio',
      presetNames: {
        'three-body': 'Tres Cuerpos',
        'figure-8': 'Figura-8',
        'solar-system': 'Sistema Solar',
        'binary-star': 'Estrella Binaria',
        'l4-l5': 'Troyano L4/L5',
        hierarchical: 'Triple Jerárquico',
      },
    },
    education: EN_PACK.education,
  },
  ar: {
    strings: {
      ...EN_PACK.strings,
      siteTitle: 'محاكاة الأجسام الثلاثة',
      siteDescription: 'محاكي جاذبية تفاعلي للتعلم والتجربة.',
      appTitle: 'محاكاة ثلاثية الأجسام',
      guide: 'دليل',
      close: 'إغلاق',
      bodies: 'الأجسام',
      time: 'الزمن',
      preset: 'الإعداد',
      timeSpeed: 'سرعة الزمن',
      gConstant: 'ثابت G',
      trailLength: 'طول الأثر',
      bodyList: 'قائمة الأجسام',
      add: 'إضافة',
      currentPreset: 'الإعداد الحالي',
      tryThis: 'جرّب هذا',
      threeBodyIntro: 'مسألة الأجسام الثلاثة تسأل: ماذا يحدث عندما تتجاذب ثلاثة أجسام في الوقت نفسه؟ تغييرات صغيرة قد تصنع فرقًا كبيرًا.',
      guideQuestion: 'ما هي مسألة الأجسام الثلاثة؟',
      guideTeaser: 'إنها مسألة علمية شهيرة، وألهمت أيضًا مسلسلًا أصليًا على نتفليكس. اضغط للاستكشاف.',
      chooseLanguage: 'اختر اللغة',
      languageHint: 'اختر اللغة التي تشعر أنها الأسهل لك.',
      trailWarning: 'المسارات الطويلة جدًا قد تُبطئ المتصفح.',
      mass: 'الكتلة',
      x: 'س',
      y: 'ص',
      vx: 'سرعة س',
      vy: 'سرعة ص',
      notFoundMessage: 'الصفحة غير موجودة',
      returnHome: 'العودة للرئيسية',
      presetNames: {
        'three-body': 'ثلاثة أجسام',
        'figure-8': 'شكل 8',
        'solar-system': 'النظام الشمسي',
        'binary-star': 'نجم ثنائي',
        'l4-l5': 'طروادي L4/L5',
        hierarchical: 'ثلاثي هرمي',
      },
    },
    education: EN_PACK.education,
  },
  pt: {
    strings: {
      ...EN_PACK.strings,
      siteTitle: 'Simulação de Três Corpos',
      siteDescription: 'Simulador interativo de gravidade N-body para estudo e experimentos.',
      appTitle: 'Simulação de Três Corpos',
      guide: 'Guia',
      close: 'Fechar',
      bodies: 'Corpos',
      time: 'Tempo',
      preset: 'Cenário',
      timeSpeed: 'Velocidade do Tempo',
      gConstant: 'Constante G',
      trailLength: 'Comprimento do Rastro',
      bodyList: 'Lista de Corpos',
      add: 'Adicionar',
      currentPreset: 'Cenário Atual',
      tryThis: 'Teste Isto',
      threeBodyIntro: 'O problema dos três corpos pergunta o que ocorre quando três objetos se atraem ao mesmo tempo. Pequenas mudanças crescem rápido.',
      guideQuestion: 'O que é o Problema dos Três Corpos?',
      guideTeaser: 'É um mistério científico famoso e até inspirou uma série original da Netflix. Toque para explorar.',
      chooseLanguage: 'Escolher idioma',
      languageHint: 'Escolha o idioma que for mais confortável para você.',
      trailWarning: 'Rastros muito longos podem deixar o navegador lento.',
      mass: 'Massa',
      x: 'X',
      y: 'Y',
      vx: 'Vx',
      vy: 'Vy',
      notFoundMessage: 'Página não encontrada',
      returnHome: 'Voltar ao início',
      presetNames: {
        'three-body': 'Três Corpos',
        'figure-8': 'Figura-8',
        'solar-system': 'Sistema Solar',
        'binary-star': 'Estrela Binária',
        'l4-l5': 'Troiano L4/L5',
        hierarchical: 'Triplo Hierárquico',
      },
    },
    education: EN_PACK.education,
  },
  id: {
    strings: {
      ...EN_PACK.strings,
      siteTitle: 'Simulasi Tiga-Benda',
      siteDescription: 'Simulasi gravitasi N-body interaktif untuk belajar dan eksperimen.',
      appTitle: 'Simulasi Tiga-Benda',
      guide: 'Panduan',
      close: 'Tutup',
      bodies: 'Benda',
      time: 'Waktu',
      preset: 'Preset',
      timeSpeed: 'Kecepatan Waktu',
      gConstant: 'Konstanta G',
      trailLength: 'Panjang Jejak',
      bodyList: 'Daftar Benda',
      add: 'Tambah',
      currentPreset: 'Preset Aktif',
      tryThis: 'Coba Ini',
      threeBodyIntro: 'Masalah tiga-benda menanyakan apa yang terjadi saat tiga benda saling tarik-menarik sekaligus. Perubahan kecil bisa berdampak besar.',
      guideQuestion: 'Apa itu Masalah Tiga-Benda?',
      guideTeaser: 'Ini misteri sains terkenal dan juga menginspirasi serial original Netflix. Ketuk untuk melihat.',
      chooseLanguage: 'Pilih Bahasa',
      languageHint: 'Pilih bahasa yang paling nyaman untuk Anda.',
      trailWarning: 'Jejak yang sangat panjang dapat memperlambat browser.',
      mass: 'Massa',
      x: 'X',
      y: 'Y',
      vx: 'Vx',
      vy: 'Vy',
      notFoundMessage: 'Halaman tidak ditemukan',
      returnHome: 'Kembali ke beranda',
      presetNames: {
        'three-body': 'Tiga Benda',
        'figure-8': 'Figur-8',
        'solar-system': 'Tata Surya',
        'binary-star': 'Bintang Biner',
        'l4-l5': 'Trojan L4/L5',
        hierarchical: 'Triple Hierarkis',
      },
    },
    education: EN_PACK.education,
  },
  fr: {
    strings: {
      ...EN_PACK.strings,
      siteTitle: 'Simulation à Trois Corps',
      siteDescription: 'Simulateur gravitationnel N-body interactif pour apprendre et expérimenter.',
      appTitle: 'Simulation à Trois Corps',
      guide: 'Guide',
      close: 'Fermer',
      bodies: 'Corps',
      time: 'Temps',
      preset: 'Préréglage',
      timeSpeed: 'Vitesse du Temps',
      gConstant: 'Constante G',
      trailLength: 'Longueur de Trajectoire',
      bodyList: 'Liste des Corps',
      add: 'Ajouter',
      currentPreset: 'Préréglage Actuel',
      tryThis: 'Essayez',
      threeBodyIntro: 'Le problème à trois corps demande ce qui se passe quand trois objets s’attirent en même temps. De petits écarts peuvent grandir.',
      guideQuestion: 'Qu’est-ce que le problème à trois corps ?',
      guideTeaser: 'C’est un grand mystère scientifique, qui a même inspiré une série originale Netflix. Touchez pour explorer.',
      chooseLanguage: 'Choisir la langue',
      languageHint: 'Choisissez la langue dans laquelle vous êtes le plus à l’aise.',
      trailWarning: 'Des trajectoires très longues peuvent ralentir le navigateur.',
      mass: 'Masse',
      x: 'X',
      y: 'Y',
      vx: 'Vx',
      vy: 'Vy',
      notFoundMessage: 'Page introuvable',
      returnHome: 'Retour à l’accueil',
      presetNames: {
        'three-body': 'Trois Corps',
        'figure-8': 'Figure-8',
        'solar-system': 'Système Solaire',
        'binary-star': 'Étoile Binaire',
        'l4-l5': 'Troyen L4/L5',
        hierarchical: 'Triple Hiérarchique',
      },
    },
    education: EN_PACK.education,
  },
  de: {
    strings: {
      ...EN_PACK.strings,
      siteTitle: 'Drei-Körper-Simulation',
      siteDescription: 'Interaktiver N-Body-Gravitationssimulator für Lernen und Experimente.',
      appTitle: 'Drei-Körper-Simulation',
      guide: 'Guide',
      close: 'Schließen',
      bodies: 'Körper',
      time: 'Zeit',
      preset: 'Preset',
      timeSpeed: 'Zeitfaktor',
      gConstant: 'G-Konstante',
      trailLength: 'Spurlänge',
      bodyList: 'Körperliste',
      add: 'Hinzufügen',
      currentPreset: 'Aktuelles Preset',
      tryThis: 'Probier das',
      threeBodyIntro: 'Das Drei-Körper-Problem fragt, was passiert, wenn drei Objekte gleichzeitig aneinander ziehen. Kleine Änderungen wachsen mit der Zeit.',
      guideQuestion: 'Was ist das Drei-Körper-Problem?',
      guideTeaser: 'Es ist ein berühmtes Wissenschaftsproblem und inspirierte sogar eine Netflix-Originalserie. Tippe zum Erkunden.',
      chooseLanguage: 'Sprache wählen',
      languageHint: 'Wähle die Sprache, die für dich am angenehmsten ist.',
      trailWarning: 'Sehr lange Spuren können den Browser verlangsamen.',
      mass: 'Masse',
      x: 'X',
      y: 'Y',
      vx: 'Vx',
      vy: 'Vy',
      notFoundMessage: 'Seite nicht gefunden',
      returnHome: 'Zur Startseite',
      presetNames: {
        'three-body': 'Drei Körper',
        'figure-8': 'Acht-Form',
        'solar-system': 'Sonnensystem',
        'binary-star': 'Doppelstern',
        'l4-l5': 'L4/L5 Trojaner',
        hierarchical: 'Hierarchisches Triple',
      },
    },
    education: EN_PACK.education,
  },
  ko: {
    strings: {
      ...EN_PACK.strings,
      siteTitle: '삼체 시뮬레이션',
      siteDescription: '학습과 실험을 위한 인터랙티브 다체 중력 시뮬레이터',
      appTitle: '삼체 시뮬레이션',
      guide: '가이드',
      close: '닫기',
      bodies: '천체 수',
      time: '시간',
      preset: '프리셋',
      timeSpeed: '시간 속도',
      gConstant: '중력 상수 G',
      trailLength: '궤적 길이',
      bodyList: '천체 목록',
      add: '추가',
      currentPreset: '현재 프리셋',
      tryThis: '이렇게 해보세요',
      threeBodyIntro:
        '삼체 문제는 세 천체가 동시에 서로 끌어당길 때 어떤 일이 생기는지를 묻는 고전 난제입니다. 아주 작은 변화도 시간이 지나면 크게 달라질 수 있습니다.',
      guideQuestion: '삼체 문제가 뭔가요?',
      guideTeaser: '유명한 과학적 난제이며, 대중문화에서도 널리 알려진 주제입니다. 탭해서 더 보기.',
      chooseLanguage: '언어 선택',
      languageHint: '가장 편한 언어를 선택하세요.',
      trailWarning: '궤적 길이가 너무 길면 브라우저가 느려질 수 있습니다.',
      mass: '질량',
      x: 'X',
      y: 'Y',
      vx: 'X속도',
      vy: 'Y속도',
      notFoundMessage: '페이지를 찾을 수 없습니다',
      returnHome: '홈으로 돌아가기',
      presetNames: {
        'three-body': '삼체',
        'figure-8': '8자 궤도',
        'solar-system': '태양계',
        'binary-star': '쌍성계',
        'l4-l5': 'L4/L5 트로이',
        hierarchical: '계층형 삼체',
      },
    },
    education: {
      'three-body': {
        title: '삼체',
        summary: '같은 질량의 세 천체가 균형에 가까운 상태로 출발합니다.',
        whatToNotice: '처음에는 대칭적으로 보이지만, 작은 오차가 점점 커져 패턴이 변합니다.',
        tryThis: ['시간 속도를 0.6x로 낮추고 첫 몇 바퀴를 관찰해보세요.', 'G를 5에서 7 정도로 올려 회전 곡률을 비교해보세요.', '한 천체 질량을 200에서 210으로 바꿔 대칭이 깨지는 시점을 보세요.'],
      },
      'figure-8': {
        title: '8자 궤도',
        summary: '세 천체가 하나의 8자 경로를 공유하는 고전 해입니다.',
        whatToNotice: '초기값이 매우 정확해야 깔끔한 8자 형태가 오래 유지됩니다.',
        tryThis: ['시간 속도 0.5x, 궤적 길이는 길게 설정해보세요.', '질량 하나를 100에서 102로 바꾸면 형태가 무너지는지 확인하세요.', 'Reset 후 원본 궤도와 수정 궤도를 비교해보세요.'],
      },
      'solar-system': {
        title: '태양계(단순 모델)',
        summary: '무거운 중심 천체와 가벼운 주변 천체들로 구성됩니다.',
        whatToNotice: '가장 무거운 천체가 전체 궤도를 지배합니다.',
        tryThis: ['G를 3으로 낮춰 궤도가 얼마나 퍼지는지 보세요.', 'Sun 질량을 1000에서 1300으로 높여 궤도 휘어짐을 비교하세요.', 'P3의 Vx를 -1.6에서 -2.0으로 바꿔 궤도 반경을 비교하세요.'],
      },
      'binary-star': {
        title: '쌍성계',
        summary: '두 개의 큰 별이 서로 공전하고 작은 행성이 영향을 받습니다.',
        whatToNotice: '두 별의 중력이 동시에 작용해 행성 궤도가 복잡해질 수 있습니다.',
        tryThis: ['시간 속도 0.7x에서 행성 궤적을 따라가 보세요.', '행성 Vx를 -2.2에서 -2.8로 바꿔 외곽 이동을 비교하세요.', '별 하나의 질량을 500에서 650으로 올려 중심 이동을 보세요.'],
      },
      'l4-l5': {
        title: 'L4/L5 트로이',
        summary: '작은 천체가 두 큰 천체의 삼각 평형점 근처에서 시작합니다.',
        whatToNotice: '작은 천체가 움직이는 평형점 주변에 머무는 모습을 볼 수 있습니다.',
        tryThis: ['시간 속도 0.5x로 삼각 구조 변화를 보세요.', 'Trojan 질량을 0.5에서 2로 높여 흔들림을 비교하세요.', 'Trojan의 Y를 조금 이동해도 다시 안정되는지 확인하세요.'],
      },
      hierarchical: {
        title: '계층형 삼체',
        summary: '가까운 내부 쌍과 멀리 도는 외부 천체로 구성됩니다.',
        whatToNotice: '거리 스케일이 분리되면 장기적으로 더 안정적인 경우가 많습니다.',
        tryThis: ['Outer C 질량을 30에서 80으로 높여 내부 궤도 변화를 보세요.', 'Outer C의 Y를 620에서 500으로 줄여 안정성을 비교하세요.', '긴 궤적으로 빠른 내부 주기와 느린 외부 주기를 함께 관찰하세요.'],
      },
    },
  },
  ja: {
    strings: {
      ...EN_PACK.strings,
      siteTitle: '三体重力シミュレーター',
      siteDescription: '学習と実験のためのインタラクティブ重力シミュレーター',
      appTitle: '三体シミュレーション',
      guide: 'ガイド',
      close: '閉じる',
      bodies: '天体数',
      time: '時間',
      preset: 'プリセット',
      timeSpeed: '時間速度',
      gConstant: '重力定数 G',
      trailLength: '軌跡の長さ',
      bodyList: '天体一覧',
      add: '追加',
      currentPreset: '現在のプリセット',
      tryThis: '試してみよう',
      threeBodyIntro: '三体問題は、3つの天体が同時に引き合うとどうなるかを問う有名な問題です。小さな差が大きな違いになります。',
      guideQuestion: '三体問題とは？',
      guideTeaser: '有名な科学の難問で、Netflixのオリジナル作品でも注目されました。タップして見る。',
      chooseLanguage: '言語を選択',
      languageHint: 'いちばん読みやすい言語を選んでください。',
      trailWarning: '軌跡が長すぎるとブラウザが重くなることがあります。',
      mass: '質量',
      x: 'X',
      y: 'Y',
      vx: 'Vx',
      vy: 'Vy',
      notFoundMessage: 'ページが見つかりません',
      returnHome: 'ホームに戻る',
      presetNames: {
        'three-body': '三体',
        'figure-8': '8の字軌道',
        'solar-system': '太陽系',
        'binary-star': '連星',
        'l4-l5': 'L4/L5 トロヤ',
        hierarchical: '階層三体系',
      },
    },
    education: EN_PACK.education,
  },
};

export function normalizeLangCode(value?: string | null): LangCode | null {
  if (!value) return null;
  const lower = value.toLowerCase();
  if (lower.startsWith('zh')) return 'zh';
  if (lower.startsWith('hi')) return 'hi';
  if (lower.startsWith('es')) return 'es';
  if (lower.startsWith('ar')) return 'ar';
  if (lower.startsWith('pt')) return 'pt';
  if (lower.startsWith('id')) return 'id';
  if (lower.startsWith('fr')) return 'fr';
  if (lower.startsWith('de')) return 'de';
  if (lower.startsWith('ko')) return 'ko';
  if (lower.startsWith('ja')) return 'ja';
  if (lower.startsWith('en')) return 'en';
  return null;
}

export function detectPreferredLanguage(acceptLanguageHeader?: string): LangCode {
  const stored = typeof window !== 'undefined' ? window.localStorage.getItem('nbody-language') : null;
  const fromStorage = normalizeLangCode(stored);
  if (fromStorage) return fromStorage;

  if (acceptLanguageHeader) {
    const tokens = acceptLanguageHeader
      .split(',')
      .map((part) => part.trim().split(';')[0])
      .filter(Boolean);
    for (const token of tokens) {
      const mapped = normalizeLangCode(token);
      if (mapped) return mapped;
    }
  }

  if (typeof navigator !== 'undefined') {
    const candidates = [navigator.language, ...(navigator.languages ?? [])];
    for (const candidate of candidates) {
      const mapped = normalizeLangCode(candidate);
      if (mapped) return mapped;
    }
  }

  return DEFAULT_LANG;
}

export function withLanguagePrefix(pathname: string, lang: LangCode): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return `/${lang}`;
  if (normalizeLangCode(parts[0])) {
    parts[0] = lang;
    return `/${parts.join('/')}`;
  }
  return `/${lang}/${parts.join('/')}`;
}

export function getPack(lang: LangCode): LanguagePack {
  return PACKS[lang] ?? PACKS[DEFAULT_LANG];
}

function toLanguageTag(code: LangCode): string {
  switch (code) {
    case 'zh':
      return 'zh-CN';
    case 'pt':
      return 'pt-BR';
    default:
      return code;
  }
}

export function getLocalizedLanguageName(target: LangCode, viewer: LangCode): string {
  try {
    if (typeof Intl !== 'undefined' && typeof Intl.DisplayNames !== 'undefined') {
      const displayNames = new Intl.DisplayNames([toLanguageTag(viewer)], { type: 'language' });
      const localized = displayNames.of(toLanguageTag(target));
      if (localized) return localized;
    }
  } catch {
    // fall through
  }

  const option = LANGUAGE_OPTIONS.find((item) => item.code === target);
  return option?.englishName ?? target;
}
