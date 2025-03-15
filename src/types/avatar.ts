export type AvatarStyle = 'pixel' | 'initials' | 'random';

export interface AvatarOptions {
  username: string;
  style: AvatarStyle;
  size?: number;
  backgroundColor?: string;
  textColor?: string;
}

export interface PixelAvatarOptions extends AvatarOptions {
  skinColor?: string;
  hairColor?: string;
  eyeColor?: string;
}