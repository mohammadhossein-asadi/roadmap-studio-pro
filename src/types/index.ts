export type DifficultyTier = "beginner" | "intermediate" | "advanced" | "expert";

export interface RoadmapNode {
  id: string;
  label: string;
  description: string;
  difficulty: DifficultyTier;
  x: number;
  y: number;
  prerequisites: string[];
  resources: Resource[];
  estimatedMinutes: number;
  completed: boolean;
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: "article" | "video" | "docs" | "tutorial";
  rating: number;
}

export interface Edge {
  id: string;
  from: string;
  to: string;
}

export interface UserProgress {
  completedNodes: string[];
  currentStreak: number;
  longestStreak: number;
  totalXP: number;
  level: number;
  dailyActivity: DailyActivity[];
}

export interface DailyActivity {
  date: string;
  nodesCompleted: number;
  xpEarned: number;
}

export interface CanvasState {
  x: number;
  y: number;
  scale: number;
}

export interface ConstellationNode {
  id: string;
  name: string;
  position: [number, number, number];
  connections: string[];
  color: string;
  size: number;
}

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  resolvedTheme: "light" | "dark";
}
