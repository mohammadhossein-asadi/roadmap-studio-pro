export const SPRING_CONFIG = {
  stiffness: 300,
  damping: 25,
  mass: 0.5,
} as const;

export const CANVAS_LIMITS = {
  minScale: 0.2,
  maxScale: 3.0,
  panSpeed: 1,
  zoomSpeed: 0.001,
} as const;

export const TIER_COLORS: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  beginner: {
    bg: "bg-sky-500/10",
    border: "border-sky-400/30",
    text: "text-sky-400",
    glow: "shadow-sky-500/25",
  },
  intermediate: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-400/30",
    text: "text-emerald-400",
    glow: "shadow-emerald-500/25",
  },
  advanced: {
    bg: "bg-violet-500/10",
    border: "border-violet-400/30",
    text: "text-violet-400",
    glow: "shadow-violet-500/25",
  },
  expert: {
    bg: "bg-orange-500/10",
    border: "border-orange-400/30",
    text: "text-orange-400",
    glow: "shadow-orange-500/25",
  },
};

export const NAV_LINKS = [
  { label: "Roadmaps", href: "/roadmap/frontend" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Community", href: "#" },
] as const;

export const XP_PER_LEVEL = 1000;

export function calculateLevel(totalXP: number): number {
  return Math.floor(totalXP / XP_PER_LEVEL) + 1;
}

export function xpForNextLevel(level: number): number {
  return level * XP_PER_LEVEL;
}
