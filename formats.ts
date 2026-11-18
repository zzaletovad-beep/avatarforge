import { Format, Style } from '../types';

// ============================================
// ФОРМАТЫ — КАК РИСОВАТЬ ПЕРСОНАЖА
// ============================================
// Каждый формат — это шаблон промпта с плейсхолдером {subject}
// {subject} будет заменён на описание персонажа

export const FORMATS: Format[] = [
  {
    id: 'sprite',
    name: 'Игровой спрайт',
    description: 'Персонаж в полный рост, вид спереди. Для платформеров и RPG.',
    icon: '🎮',
    promptTemplate:
      '{subject}, full body game character sprite, front view, standing pose, centered composition, solid white background, clean outlines, 2D game asset, high detail, no shadow',
    width: 512,
    height: 512,
    accent: '#7c5cff',
  },
  {
    id: 'portrait',
    name: 'Портрет',
    description: 'Голова и плечи. Для аватаров, диалогов, карточек.',
    icon: '👤',
    promptTemplate:
      '{subject}, portrait, head and shoulders, centered, looking at viewer, solid dark background, detailed face, character art, game UI portrait style',
    width: 512,
    height: 512,
    accent: '#22d3ee',
  },
  {
    id: 'sticker',
    name: 'Стикер',
    description: 'С белой обводкой. Для мессенджеров и наклеек.',
    icon: '🏷️',
    promptTemplate:
      '{subject}, sticker design, thick white outline, die-cut sticker style, cute, vibrant colors, solid white background, no shadow, clean edges, vector style',
    width: 512,
    height: 512,
    accent: '#f472b6',
  },
  {
    id: 'pixel',
    name: 'Пиксель-арт',
    description: 'Ретро-стиль 16-bit. Для олдскульных игр.',
    icon: '👾',
    promptTemplate:
      '{subject}, pixel art style, 16-bit retro game sprite, limited color palette, crisp pixels, full body, centered, solid black background, nostalgic game aesthetic',
    width: 512,
    height: 512,
    accent: '#4ade80',
  },
  {
    id: 'isometric',
    name: 'Изометрия',
    description: 'Вид 3/4 сверху. Для стратегий и тайловых карт.',
    icon: '🗺️',
    promptTemplate:
      '{subject}, isometric view, 3/4 top-down angle, game asset, detailed, solid white background, isometric projection, clean 2D render, no perspective distortion',
    width: 512,
    height: 512,
    accent: '#fb923c',
  },
  {
    id: 'chibi',
    name: 'Чиби',
    description: 'Маленький милый персонаж с большой головой.',
    icon: '🧸',
    promptTemplate:
      '{subject}, chibi style, super deformed, big head small body, cute proportions, kawaii, pastel colors, full body, centered, solid white background, adorable',
    width: 512,
    height: 512,
    accent: '#e879f9',
  },
  {
    id: 'concept',
    name: 'Концепт-арт',
    description: 'Детальный арт с несколькими ракурсами. Для разработки.',
    icon: '🎨',
    promptTemplate:
      '{subject}, character concept art, multiple views, turnaround sheet, detailed design, professional game art, white background, front view and side view, annotations, high quality',
    width: 768,
    height: 512,
    accent: '#facc15',
  },
  {
    id: 'icon',
    name: 'Иконка',
    description: 'Компактная иконка для UI, инвентаря, способностей.',
    icon: '⚡',
    promptTemplate:
      '{subject}, game icon, square format, centered, bold design, readable at small size, vibrant, clean, solid dark background, UI game icon style, no text',
    width: 256,
    height: 256,
    accent: '#f87171',
  },
];

// ============================================
// СТИЛИ — ВИЗУАЛЬНЫЙ ЯЗЫК
// ============================================

export const STYLES: Style[] = [
  {
    id: 'vector',
    name: 'Векторный',
    promptSuffix: 'clean vector art, flat colors, sharp lines, modern game style',
  },
  {
    id: 'anime',
    name: 'Аниме',
    promptSuffix: 'anime art style, cel shaded, vibrant colors, manga inspired, detailed eyes',
  },
  {
    id: 'realistic',
    name: 'Реалистичный',
    promptSuffix: 'semi-realistic, detailed rendering, soft lighting, painterly, AAA game quality',
  },
  {
    id: 'handpainted',
    name: 'Ручная роспись',
    promptSuffix: 'hand-painted style, textured brush strokes, fantasy illustration, warm tones',
  },
  {
    id: 'comic',
    name: 'Комикс',
    promptSuffix: 'comic book style, bold ink outlines, halftone shading, dynamic, graphic novel art',
  },
  {
    id: 'watercolor',
    name: 'Акварель',
    promptSuffix: 'watercolor painting style, soft edges, color bleeding, artistic, dreamy atmosphere',
  },
];

// ============================================
// БЫСТРЫЕ ПРЕСЕТЫ ПЕРСОНАЖЕЙ
// ============================================

export const CHARACTER_PRESETS = [
  { label: '🐱 Киберпанк-кот', value: 'cyberpunk cat hacker with neon goggles and leather jacket' },
  { label: '⚔️ Пиксельный рыцарь', value: 'medieval knight in shining armor with a glowing sword' },
  { label: '🧙 Тёмный маг', value: 'dark sorcerer with glowing purple eyes and tattered robes' },
  { label: '🤖 Робот-самурай', value: 'mechanical samurai robot with katana and neon accents' },
  { label: '🧝 Эльфийка-лучница', value: 'elven archer with green cloak and long silver hair' },
  { label: '👽 Космический пират', value: 'space pirate with eyepatch and laser blaster' },
  { label: '🐉 Дракон-подросток', value: 'young dragon with colorful scales and mischievous smile' },
  { label: '🧟 Зомби-бариста', value: 'zombie barista with coffee cup and apron, funny expression' },
];
