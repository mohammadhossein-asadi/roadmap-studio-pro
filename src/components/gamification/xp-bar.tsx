"use client";

import { motion } from "motion/react";
import { XP_PER_LEVEL } from "@/lib/constants";
import { Zap } from "lucide-react";

interface XPBarProps {
  currentXP: number;
  level: number;
}

export function XPBar({ currentXP, level }: XPBarProps) {
  const xpInLevel = currentXP % XP_PER_LEVEL;
  const progress = (xpInLevel / XP_PER_LEVEL) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
            <Zap className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-white">Level {level}</span>
        </div>
        <span className="text-xs text-white/40">
          {xpInLevel.toLocaleString()} / {XP_PER_LEVEL.toLocaleString()} XP
        </span>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
          style={{ boxShadow: "0 0 12px rgba(245, 158, 11, 0.4)" }}
        />
      </div>
    </div>
  );
}
