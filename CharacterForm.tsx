import { Character } from '../types';
import { CHARACTER_PRESETS } from '../data/formats';

interface Props {
  character: Character;
  onChange: (character: Character) => void;
}

export function CharacterForm({ character, onChange }: Props) {
  const update = (field: keyof Character, value: string) => {
    onChange({ ...character, [field]: value });
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-space font-bold mb-3 text-text">
        🧙 Персонаж
      </h2>

      {/* Быстрые пресеты */}
      <div className="mb-4">
        <label className="text-xs text-muted uppercase tracking-wider mb-2 block">
          Быстрый выбор
        </label>
        <div className="flex flex-wrap gap-2">
          {CHARACTER_PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => update('description', preset.value)}
              className={`
                px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer
                ${character.description === preset.value
                  ? 'border-violet bg-violet/10 text-violet'
                  : 'border-stroke bg-surface text-muted hover:text-text hover:border-white/20'
                }
              `}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Основное описание */}
      <div className="mb-3">
        <label className="text-xs text-muted uppercase tracking-wider mb-1.5 block">
          Описание *
        </label>
        <textarea
          value={character.description}
          onChange={(e) => update('description', e.target.value)}
          placeholder="Опиши персонажа: кто он, как выглядит, что делает..."
          className="w-full px-4 py-3 rounded-xl border border-stroke bg-surface text-text text-sm outline-none transition-all duration-300 focus:border-violet resize-none"
          rows={3}
        />
      </div>

      {/* Дополнительные поля */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-muted uppercase tracking-wider mb-1.5 block">
            Раса
          </label>
          <input
            type="text"
            value={character.race || ''}
            onChange={(e) => update('race', e.target.value)}
            placeholder="Человек, эльф, робот..."
            className="w-full px-3 py-2 rounded-lg border border-stroke bg-surface text-text text-sm outline-none transition-all focus:border-violet"
          />
        </div>
        <div>
          <label className="text-xs text-muted uppercase tracking-wider mb-1.5 block">
            Класс
          </label>
          <input
            type="text"
            value={character.class || ''}
            onChange={(e) => update('class', e.target.value)}
            placeholder="Воин, маг, вор..."
            className="w-full px-3 py-2 rounded-lg border border-stroke bg-surface text-text text-sm outline-none transition-all focus:border-violet"
          />
        </div>
        <div>
          <label className="text-xs text-muted uppercase tracking-wider mb-1.5 block">
            Настроение
          </label>
          <input
            type="text"
            value={character.mood || ''}
            onChange={(e) => update('mood', e.target.value)}
            placeholder="Дерзкий, грустный, злой..."
            className="w-full px-3 py-2 rounded-lg border border-stroke bg-surface text-text text-sm outline-none transition-all focus:border-violet"
          />
        </div>
        <div>
          <label className="text-xs text-muted uppercase tracking-wider mb-1.5 block">
            Палитра
          </label>
          <input
            type="text"
            value={character.colors || ''}
            onChange={(e) => update('colors', e.target.value)}
            placeholder="Неон, пастель, тёмные тона..."
            className="w-full px-3 py-2 rounded-lg border border-stroke bg-surface text-text text-sm outline-none transition-all focus:border-violet"
          />
        </div>
      </div>
    </div>
  );
}
