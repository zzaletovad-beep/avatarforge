import { GenStatus } from '../types';
import { downloadImage } from '../lib/api';

interface Props {
  status: GenStatus;
  imageUrl?: string;
  prompt?: string;
  filename?: string;
  errorMessage?: string;
}

export function ResultPreview({ status, imageUrl, prompt, filename, errorMessage }: Props) {
  return (
    <div className="w-full bg-surface border border-stroke rounded-2xl p-5 min-h-[350px] flex flex-col items-center justify-center">
      {status === 'idle' && (
        <div className="text-center">
          <div className="text-5xl mb-4 opacity-30">🖼️</div>
          <p className="text-muted text-sm">
            Настрой параметры и нажми «Сгенерировать»
          </p>
        </div>
      )}

      {status === 'loading' && (
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-white/10 border-t-cyan rounded-full animate-spin-custom mb-4" />
          <p className="text-muted text-sm animate-pulse">Генерируем изображение...</p>
          {prompt && (
            <details className="mt-4 max-w-xs">
              <summary className="text-xs text-muted/60 cursor-pointer hover:text-muted transition-colors">
                Показать промпт
              </summary>
              <p className="text-xs text-muted/50 mt-2 text-left bg-bg/50 p-3 rounded-lg border border-stroke">
                {prompt}
              </p>
            </details>
          )}
        </div>
      )}

      {status === 'success' && imageUrl && (
        <div className="flex flex-col items-center w-full animate-fade-in">
          <img
            src={imageUrl}
            alt="Generated character"
            className="max-w-full max-h-[400px] rounded-xl shadow-2xl shadow-violet/10"
          />
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => downloadImage(imageUrl, filename || 'character.png')}
              className="px-5 py-2.5 bg-violet text-white text-sm font-semibold rounded-lg hover:bg-violet-hover transition-all cursor-pointer hover:-translate-y-0.5"
            >
              ⬇ Скачать PNG
            </button>
            {prompt && (
              <details className="relative">
                <summary className="px-4 py-2.5 bg-white/5 border border-stroke text-muted text-sm rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                  📋 Промпт
                </summary>
                <div className="absolute bottom-full mb-2 right-0 w-80 bg-bg border border-stroke rounded-xl p-3 shadow-xl z-10">
                  <p className="text-xs text-muted text-left">{prompt}</p>
                  <button
                    onClick={() => navigator.clipboard.writeText(prompt)}
                    className="mt-2 text-xs text-cyan hover:underline cursor-pointer"
                  >
                    Копировать
                  </button>
                </div>
              </details>
            )}
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="text-center">
          <div className="text-4xl mb-3">⚠️</div>
          <p className="text-error text-sm">{errorMessage || 'Ошибка генерации'}</p>
          <p className="text-muted text-xs mt-2">Попробуй изменить промпт или повторить</p>
        </div>
      )}
    </div>
  );
}
