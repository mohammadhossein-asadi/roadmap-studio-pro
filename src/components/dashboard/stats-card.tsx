"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: string;
  color?: string;
}

export function StatsCard({ icon: Icon, label, value, change, color = "from-violet-500 to-indigo-500" }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/20"
    >
      <div className="flex items-start justify-between">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br", color)}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        {change && (
          <span className="text-xs text-emerald-400">{change}</span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-white/50">{label}</p>
      </div>
    </motion.div>
  );
}
