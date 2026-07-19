"use client";

import { motion } from "motion/react";
import type { DailyActivity } from "@/types";

interface StreakGridProps {
  activity: DailyActivity[];
}

export function StreakGrid({ activity }: StreakGridProps) {
  const maxXP = Math.max(...activity.map((d) => d.xpEarned), 1);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-white/80">Daily Activity</h3>
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {activity.map((day, i) => {
          const intensity = day.xpEarned / maxXP;
          return (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="group relative aspect-square rounded-md"
              style={{
                backgroundColor: `rgba(139, 92, 246, ${0.1 + intensity * 0.6})`,
              }}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-800 px-2 py-1 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {day.date}: +{day.xpEarned} XP
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="flex items-center justify-end gap-1 text-[10px] text-white/30">
        <span>Less</span>
        {[0.1, 0.25, 0.4, 0.6].map((v, i) => (
          <div
            key={i}
            className="h-2.5 w-2.5 rounded-sm"
            style={{ backgroundColor: `rgba(139, 92, 246, ${v})` }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
