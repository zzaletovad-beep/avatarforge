import { StyleId } from '../types';
import { STYLES } from '../data/formats';

interface Props {
  selected: StyleId;
  onChange: (id: StyleId) => void;
}

export function StyleSelector({ selected, onChange }: Props) {
  return (
    <div className="w-full">
      <h2 className="text-lg font-space font-bold mb-3 text-text">
        🎨 Стиль
      </h2>
      <div className="flex flex-wrap gap-2">
        {STYLES.map((style) => {
          const isActive = selected === style.id;
          return (
            <button
              key={style.id}
              onClick={() => onChange(style.id)}
              className={`
                px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 cursor-pointer
                ${isActive
                  ? 'border-cyan bg-cyan/10 text-cyan'
                  : 'border-stroke bg-surface text-muted hover:text-text hover:border-white/20'
                }
              `}
            >
              {style.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
