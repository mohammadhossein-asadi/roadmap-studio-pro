"use client";

import { motion } from "motion/react";
import { ProgressRing } from "@/components/ui/progress-ring";

interface ProgressChartProps {
  completed: number;
  total: number;
}

export function ProgressChart({ completed, total }: ProgressChartProps) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4"
    >
      <ProgressRing
        progress={percentage}
        size={140}
        strokeWidth={10}
        color="#8b5cf6"
        label={`${completed}/${total}`}
      />
      <div className="text-center">
        <h3 className="text-sm font-semibold text-white/80">Overall Progress</h3>
        <p className="text-xs text-white/40">
          {completed} of {total} topics completed
        </p>
      </div>
    </motion.div>
  );
}
