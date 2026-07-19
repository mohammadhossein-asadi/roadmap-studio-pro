"use client";

import { motion, AnimatePresence } from "motion/react";
import { Globe, Network, Dna, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { SPRING_CONFIG } from "@/lib/constants";

type Mode = "canvas" | "universe" | "neural" | "helix";

const modes = [
  { id: "canvas" as Mode, label: "Canvas", icon: LayoutGrid },
  { id: "universe" as Mode, label: "Universe", icon: Globe },
  { id: "neural" as Mode, label: "Neural", icon: Network },
  { id: "helix" as Mode, label: "DNA Helix", icon: Dna },
];

interface ModeSwitcherProps {
  activeMode: Mode;
  onModeChange: (mode: Mode) => void;
}

export function ModeSwitcher({ activeMode, onModeChange }: ModeSwitcherProps) {
  return (
    <div className="flex items-center gap-0.5 sm:gap-1 rounded-xl border border-white/10 bg-black/40 p-0.5 sm:p-1 backdrop-blur-xl shrink-0">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isActive = activeMode === mode.id;
        return (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            aria-pressed={isActive}
            className={cn(
              "relative flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg px-2 sm:px-3 py-2.5 sm:py-2 text-xs sm:text-sm transition-colors min-h-[44px]",
              isActive ? "text-white" : "text-white/40 hover:text-white/70"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="mode-indicator"
                className="absolute inset-0 rounded-lg bg-white/10"
                transition={{ type: "spring", ...SPRING_CONFIG }}
              />
            )}
            <Icon className="relative z-10 h-4 w-4 shrink-0" />
            <span className="relative z-10 hidden sm:inline">{mode.label}</span>
          </button>
        );
      })}
    </div>
  );
}
