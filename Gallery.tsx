import { GeneratedImage } from '../types';
import { FORMATS, STYLES } from '../data/formats';
import { downloadImage } from '../lib/api';

interface Props {
  images: GeneratedImage[];
  onRemove: (id: string) => void;
}

export function Gallery({ images, onRemove }: Props) {
  if (images.length === 0) return null;

  return (
    <div className="w-full mt-8">
      <h2 className="text-lg font-space font-bold mb-4 text-text">
        🖼️ Галерея ({images.length})
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((img) => {
          const format = FORMATS.find(f => f.id === img.formatId);
          const style = STYLES.find(s => s.id === img.styleId);
          return (
            <div
              key={img.id}
              className="group relative bg-surface border border-stroke rounded-xl overflow-hidden animate-fade-in"
            >
              <img
                src={img.url}
                alt={img.character.description}
                className="w-full aspect-square object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-3">
                <div className="text-xs text-white/80 text-center mb-2">
                  <span className="font-semibold">{format?.icon} {format?.name}</span>
                  <br />
                  <span>{style?.name}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => downloadImage(img.url, `${img.character.name || 'character'}_${img.formatId}.png`)}
                    className="px-3 py-1.5 bg-violet text-white text-xs rounded-lg hover:bg-violet-hover transition-colors cursor-pointer"
                  >
                    ⬇ PNG
                  </button>
                  <button
                    onClick={() => onRemove(img.id)}
                    className="px-3 py-1.5 bg-white/10 text-white text-xs rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
