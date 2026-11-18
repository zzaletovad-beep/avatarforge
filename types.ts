// ============================================
// ТИПЫ ДАННЫХ ДЛЯ СИСТЕМЫ ГЕНЕРАЦИИ ПЕРСОНАЖЕЙ
// ============================================

/** Формат вывода — как именно рисуем персонажа */
export type FormatId =
  | 'sprite'
  | 'portrait'
  | 'sticker'
  | 'pixel'
  | 'isometric'
  | 'chibi'
  | 'concept'
  | 'icon';

/** Визуальный стиль */
export type StyleId =
  | 'vector'
  | 'anime'
  | 'realistic'
  | 'handpainted'
  | 'comic'
  | 'watercolor';

/** Один формат генерации */
export interface Format {
  id: FormatId;
  name: string;
  description: string;
  icon: string;
  /** Шаблон промпта. {subject} — подставится описание персонажа */
  promptTemplate: string;
  /** Рекомендуемые размеры */
  width: number;
  height: number;
  /** Цвет акцента для UI */
  accent: string;
}

/** Визуальный стиль */
export interface Style {
  id: StyleId;
  name: string;
  /** Добавляется в конец промпта */
  promptSuffix: string;
}

/** Описание персонажа (вводит пользователь) */
export interface Character {
  name: string;
  description: string;
  race?: string;
  class?: string;
  mood?: string;
  colors?: string;
}

/** Результат генерации */
export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  formatId: FormatId;
  styleId: StyleId;
  character: Character;
  createdAt: number;
}

/** Состояние генерации */
export type GenStatus = 'idle' | 'loading' | 'success' | 'error';
