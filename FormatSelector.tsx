import { FormatId } from '../types';
import { FORMATS } from '../data/formats';

interface Props {
  selected: FormatId;
  onChange: (id: FormatId) => void;
}

export function FormatSelector({ selected, onChange }: Props) {
  return (
    <div className="w-full">
      <h2 className="text-lg font-space font-bold mb-3 text-text">
        📐 Формат
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {FORMATS.map((format) => {
          const isActive = selected === format.id;
          return (
            <button
              key={format.id}
              onClick={() => onChange(format.id)}
              className={`
                relative p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer
                ${isActive
                  ? 'border-violet bg-violet/10 shadow-lg shadow-violet/20'
                  : 'border-stroke bg-surface hover:border-white/20 hover:bg-surface/80'
                }
              `}
            >
              <div className="text-2xl mb-1">{format.icon}</div>
              <div className="text-sm font-semibold text-text leading-tight">
                {format.name}
              </div>
              <div className="text-xs text-muted mt-1 leading-tight line-clamp-2">
                {format.description}
              </div>
              {isActive && (
                <div
                  className="absolute top-2 right-2 w-2 h-2 rounded-full"
                  style={{ backgroundColor: format.accent }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
