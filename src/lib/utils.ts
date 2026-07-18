import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

export function getDifficultyColor(tier: string): string {
  const colors: Record<string, string> = {
    beginner: "from-sky-400 to-blue-500",
    intermediate: "from-emerald-400 to-green-500",
    advanced: "from-violet-400 to-purple-500",
    expert: "from-orange-400 to-red-500",
  };
  return colors[tier] || colors.beginner;
}

export function getDifficultyGlow(tier: string): string {
  const glows: Record<string, string> = {
    beginner: "shadow-sky-500/25",
    intermediate: "shadow-emerald-500/25",
    advanced: "shadow-violet-500/25",
    expert: "shadow-orange-500/25",
  };
  return glows[tier] || glows.beginner;
}
