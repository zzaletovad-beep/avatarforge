// ============================================
// API — РАБОТА С ГЕНЕРАТОРОМ ИЗОБРАЖЕНИЙ
// ============================================
// Используем Pollinations.ai — бесплатный, без API-ключей

/**
 * Генерирует URL для получения изображения через Pollinations
 */
export function buildImageUrl(prompt: string, width: number, height: number): string {
  const encoded = encodeURIComponent(prompt);
  const seed = Math.floor(Math.random() * 100000);
  return `https://image.pollinations.ai/prompt/${encoded}?width=${width}&height=${height}&nologo=true&seed=${seed}`;
}

/**
 * Загружает изображение и возвращает Promise
 * Reject-ит если загрузка не удалась
 */
export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Не удалось загрузить изображение'));
    img.src = url;
  });
}

/**
 * Генерирует изображение: строит URL, ждёт загрузки, возвращает URL
 */
export async function generateImage(
  prompt: string,
  width: number,
  height: number
): Promise<string> {
  const url = buildImageUrl(prompt, width, height);
  await loadImage(url); // Ждём пока реально загрузится
  return url;
}

/**
 * Скачивает изображение по URL как файл
 */
export async function downloadImage(url: string, filename: string): Promise<void> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch {
    // Fallback: открываем в новой вкладке
    window.open(url, '_blank');
  }
}
