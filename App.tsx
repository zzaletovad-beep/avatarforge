import { useState, useCallback } from 'react';
import { Character, FormatId, StyleId, GenStatus, GeneratedImage } from './types';
import { buildPrompt, getFormat } from './lib/promptBuilder';
import { generateImage } from './lib/api';
import { FormatSelector } from './components/FormatSelector';
import { StyleSelector } from './components/StyleSelector';
import { CharacterForm } from './components/CharacterForm';
import { ResultPreview } from './components/ResultPreview';
import { Gallery } from './components/Gallery';

export default function App() {
  // --- Состояние ---
  const [formatId, setFormatId] = useState<FormatId>('sprite');
  const [styleId, setStyleId] = useState<StyleId>('vector');
  const [character, setCharacter] = useState<Character>({
    name: '',
    description: 'cyberpunk cat hacker with neon goggles and leather jacket',
    race: '',
    class: '',
    mood: '',
    colors: '',
  });

  const [genStatus, setGenStatus] = useState<GenStatus>('idle');
  const [currentImage, setCurrentImage] = useState<string | undefined>();
  const [currentPrompt, setCurrentPrompt] = useState<string | undefined>();
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const [gallery, setGallery] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // --- Генерация ---
  const handleGenerate = useCallback(async () => {
    if (!character.description.trim()) {
      alert('Опиши персонажа!');
      return;
    }

    setIsGenerating(true);
    setGenStatus('loading');
    setErrorMsg(undefined);

    try {
      // 1. Строим промпт
      const prompt = buildPrompt(character, formatId, styleId);
      setCurrentPrompt(prompt);

      // 2. Получаем параметры формата
      const format = getFormat(formatId);

      // 3. Генерируем изображение
      const imageUrl = await generateImage(prompt, format.width, format.height);

      // 4. Сохраняем результат
      setCurrentImage(imageUrl);
      setGenStatus('success');

      // 5. Добавляем в галерею
      const newImage: GeneratedImage = {
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        url: imageUrl,
        prompt,
        formatId,
        styleId,
        character: { ...character },
        createdAt: Date.now(),
      };
      setGallery(prev => [newImage, ...prev]);
    } catch (err) {
      setGenStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setIsGenerating(false);
    }
  }, [character, formatId, styleId]);

  // --- Генерация во всех форматах сразу ---
  const handleGenerateAll = useCallback(async () => {
    if (!character.description.trim()) {
      alert('Опиши персонажа!');
      return;
    }

    setIsGenerating(true);
    setGenStatus('loading');
    setErrorMsg(undefined);

    const format = getFormat(formatId);
    const prompt = buildPrompt(character, formatId, styleId);
    setCurrentPrompt(prompt);

    try {
      const imageUrl = await generateImage(prompt, format.width, format.height);
      setCurrentImage(imageUrl);
      setGenStatus('success');

      const newImage: GeneratedImage = {
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        url: imageUrl,
        prompt,
        formatId,
        styleId,
        character: { ...character },
        createdAt: Date.now(),
      };
      setGallery(prev => [newImage, ...prev]);
    } catch (err) {
      setGenStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setIsGenerating(false);
    }
  }, [character, formatId, styleId]);

  // --- Удаление из галереи ---
  const handleRemoveFromGallery = useCallback((id: string) => {
    setGallery(prev => prev.filter(img => img.id !== id));
  }, []);

  // --- Превью промпта ---
  const previewPrompt = character.description.trim()
    ? buildPrompt(character, formatId, styleId)
    : '';

  return (
    <div className="min-h-screen bg-bg text-text font-inter px-4 py-8 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="font-space text-4xl sm:text-5xl font-bold mb-2">
            Avatar<span className="text-cyan">Forge</span>
          </h1>
          <p className="text-muted text-lg">
            AI-генератор 2D-персонажей для игр
          </p>
          <p className="text-muted/60 text-sm mt-1">
            Выбери формат → стиль → опиши персонажа → генерируй
          </p>
        </header>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
          {/* Left: Settings */}
          <div className="space-y-6">
            <FormatSelector selected={formatId} onChange={setFormatId} />
            <StyleSelector selected={styleId} onChange={setStyleId} />
            <CharacterForm character={character} onChange={setCharacter} />

            {/* Prompt Preview */}
            {previewPrompt && (
              <div className="bg-surface/50 border border-stroke rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted uppercase tracking-wider">
                    Промпт (предпросмотр)
                  </span>
                  <button
                    onClick={() => navigator.clipboard.writeText(previewPrompt)}
                    className="text-xs text-cyan hover:underline cursor-pointer"
                  >
                    Копировать
                  </button>
                </div>
                <p className="text-xs text-muted/70 leading-relaxed font-mono">
                  {previewPrompt}
                </p>
              </div>
            )}

            {/* Generate Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex-1 px-6 py-4 bg-violet text-white font-bold rounded-xl text-base transition-all duration-300 hover:bg-violet-hover hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
              >
                {isGenerating ? '⏳ Генерация...' : '✨ Сгенерировать'}
              </button>
              <button
                onClick={handleGenerateAll}
                disabled={isGenerating}
                className="px-6 py-4 bg-surface border border-stroke text-text font-bold rounded-xl text-base transition-all duration-300 hover:border-white/20 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
                title="Сгенерировать и добавить в галерею"
              >
                📸
              </button>
            </div>
          </div>

          {/* Right: Result */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <ResultPreview
              status={genStatus}
              imageUrl={currentImage}
              prompt={currentPrompt}
              filename={`${character.name || 'character'}_${formatId}.png`}
              errorMessage={errorMsg}
            />
          </div>
        </div>

        {/* Gallery */}
        <Gallery images={gallery} onRemove={handleRemoveFromGallery} />

        {/* Architecture Info */}
        <section className="mt-16 bg-surface/50 border border-stroke rounded-2xl p-6">
          <h2 className="font-space text-xl font-bold mb-4 text-text">
            🏗️ Как это работает
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-bg/50 rounded-xl p-4 border border-stroke">
              <div className="text-2xl mb-2">🧩</div>
              <h3 className="font-semibold text-text mb-1">Модульные промпты</h3>
              <p className="text-muted text-xs leading-relaxed">
                Формула: <code className="text-cyan">персонаж + формат + стиль = промпт</code>.
                Каждый компонент — независимый модуль.
              </p>
            </div>
            <div className="bg-bg/50 rounded-xl p-4 border border-stroke">
              <div className="text-2xl mb-2">📐</div>
              <h3 className="font-semibold text-text mb-1">8 форматов вывода</h3>
              <p className="text-muted text-xs leading-relaxed">
                Спрайт, портрет, стикер, пиксель-арт, изометрия, чиби, концепт-арт, иконка.
                Каждый — шаблон с плейсхолдерами.
              </p>
            </div>
            <div className="bg-bg/50 rounded-xl p-4 border border-stroke">
              <div className="text-2xl mb-2">🎨</div>
              <h3 className="font-semibold text-text mb-1">6 визуальных стилей</h3>
              <p className="text-muted text-xs leading-relaxed">
                Вектор, аниме, реализм, ручная роспись, комикс, акварель.
                Комбинируй с форматами = 48 уникальных вариантов.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 text-center text-muted/50 text-xs">
          <p>AvatarForge • AI-генерация через Pollinations.ai</p>
          <p className="mt-1">
            Архитектура: <code>types.ts</code> → <code>formats.ts</code> → <code>promptBuilder.ts</code> → <code>api.ts</code> → UI
          </p>
        </footer>
      </div>
    </div>
  );
}
