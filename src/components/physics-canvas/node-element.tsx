"use client";

import { motion } from "motion/react";
import { cn, getDifficultyColor } from "@/lib/utils";
import { SPRING_CONFIG, TIER_COLORS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock } from "lucide-react";
import type { RoadmapNode } from "@/types";

interface NodeElementProps {
  node: RoadmapNode;
  onSelect: (node: RoadmapNode) => void;
}

export function NodeElement({ node, onSelect }: NodeElementProps) {
  const tierStyle = TIER_COLORS[node.difficulty] || TIER_COLORS.beginner;

  return (
    <motion.button
      layout
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", ...SPRING_CONFIG }}
      onClick={() => onSelect(node)}
      className={cn(
        "group relative w-56 rounded-2xl border p-4 text-left backdrop-blur-xl transition-all duration-300",
        "bg-white/5 hover:bg-white/10",
        tierStyle.border,
        `hover:shadow-xl hover:${tierStyle.glow}`,
        node.completed && "ring-2 ring-emerald-500/30"
      )}
      aria-label={`${node.label} - ${node.difficulty}`}
    >
      <div className={cn("absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br", getDifficultyColor(node.difficulty), "mix-blend-overlay")} />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-2">
          <Badge variant={node.difficulty as "beginner" | "intermediate" | "advanced" | "expert"}>
            {node.difficulty}
          </Badge>
          {node.completed ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          ) : (
            <Clock className="h-4 w-4 text-white/30" />
          )}
        </div>

        <h3 className="mt-3 font-semibold text-white">{node.label}</h3>
        <p className="mt-1 text-xs text-white/50 line-clamp-2">{node.description}</p>

        <div className="mt-3 flex items-center gap-2 text-xs text-white/40">
          <Clock className="h-3 w-3" />
          {node.estimatedMinutes} min
          {node.prerequisites.length > 0 && (
            <>
              <span className="text-white/20">|</span>
              {node.prerequisites.length} prereq{node.prerequisites.length > 1 ? "s" : ""}
            </>
          )}
        </div>
      </div>
    </motion.button>
  );
}
