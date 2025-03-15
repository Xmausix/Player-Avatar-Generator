import { AvatarOptions, PixelAvatarOptions } from '../types/avatar';

export function generateHash(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function getColorFromHash(hash: number): string {
  return `#${((hash * 12345) & 0xFFFFFF).toString(16).padStart(6, '0')}`;
}

export function generateInitialsAvatar(options: AvatarOptions): string {
  const { username, size = 128, backgroundColor, textColor } = options;
  const initials = username
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const hash = generateHash(username);
  const bgColor = backgroundColor || getColorFromHash(hash);
  const txtColor = textColor || '#FFFFFF';

  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${bgColor}"/>
      <text
        x="50%"
        y="50%"
        font-family="Arial"
        font-size="${size / 2}px"
        fill="${txtColor}"
        text-anchor="middle"
        dominant-baseline="central"
      >${initials}</text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export function generatePixelAvatar(options: PixelAvatarOptions): string {
  const { username, size = 128 } = options;
  const hash = generateHash(username);
  
  const skinColor = options.skinColor || getColorFromHash(hash);
  const hairColor = options.hairColor || getColorFromHash(hash + 1);
  const eyeColor = options.eyeColor || '#000000';

  // Create an 8x8 pixel art face
  const pixelSize = size / 8;
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      
      <!-- Hair -->
      ${Array.from({ length: 8 }, (_, y) =>
        Array.from({ length: 8 }, (_, x) =>
          (y < 3 && x > 1 && x < 6) ? 
          `<rect x="${x * pixelSize}" y="${y * pixelSize}" width="${pixelSize}" height="${pixelSize}" fill="${hairColor}"/>` : ''
        ).join('')
      ).join('')}
      
      <!-- Face -->
      ${Array.from({ length: 4 }, (_, y) =>
        Array.from({ length: 6 }, (_, x) =>
          `<rect x="${(x + 1) * pixelSize}" y="${(y + 2) * pixelSize}" width="${pixelSize}" height="${pixelSize}" fill="${skinColor}"/>`
        ).join('')
      ).join('')}
      
      <!-- Eyes -->
      <rect x="${2 * pixelSize}" y="${4 * pixelSize}" width="${pixelSize}" height="${pixelSize}" fill="${eyeColor}"/>
      <rect x="${5 * pixelSize}" y="${4 * pixelSize}" width="${pixelSize}" height="${pixelSize}" fill="${eyeColor}"/>
      
      <!-- Mouth -->
      <rect x="${3 * pixelSize}" y="${5 * pixelSize}" width="${2 * pixelSize}" height="${pixelSize}" fill="#ff9999"/>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}