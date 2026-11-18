import { Character, FormatId, StyleId } from '../types';
import { FORMATS, STYLES } from '../data/formats';

// ============================================
// КОНСТРУКТОР ПРОМПТОВ
// ============================================
// Берёт формат + стиль + персонажа → собирает финальный промпт

/**
 * Собирает финальный промпт для генерации
 */
export function buildPrompt(
  character: Character,
  formatId: FormatId,
  styleId: StyleId
): string {
  const format = FORMATS.find(f => f.id === formatId);
  const style = STYLES.find(s => s.id === styleId);

  if (!format || !style) {
    throw new Error(`Unknown format or style: ${formatId}, ${styleId}`);
  }

  // Собираем описание персонажа из полей
  const subject = buildSubject(character);

  // Подставляем в шаблон формата
  let prompt = format.promptTemplate.replace('{subject}', subject);

  // Добавляем стиль в конец
  prompt += `, ${style.promptSuffix}`;

  // Добавляем negative-подсказку (улучшает качество)
  prompt += ', masterpiece, best quality, highly detailed';

  return prompt;
}

/**
 * Собирает строку-описание персонажа из полей
 */
function buildSubject(character: Character): string {
  const parts: string[] = [];

  // Основное описание — обязательно
  if (character.description.trim()) {
    parts.push(character.description.trim());
  }

  // Раса
  if (character.race?.trim()) {
    parts.push(`${character.race.trim()} race`);
  }

  // Класс
  if (character.class?.trim()) {
    parts.push(`${character.class.trim()} class`);
  }

  // Настроение
  if (character.mood?.trim()) {
    parts.push(`expression: ${character.mood.trim()}`);
  }

  // Цвета
  if (character.colors?.trim()) {
    parts.push(`color palette: ${character.colors.trim()}`);
  }

  return parts.join(', ');
}

/**
 * Возвращает объект формата по ID
 */
export function getFormat(id: FormatId) {
  return FORMATS.find(f => f.id === id)!;
}

/**
 * Возвращает объект стиля по ID
 */
export function getStyle(id: StyleId) {
  return STYLES.find(s => s.id === id)!;
}
