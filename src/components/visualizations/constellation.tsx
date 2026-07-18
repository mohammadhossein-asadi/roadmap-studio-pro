"use client";

import { useMemo } from "react";
import type { RoadmapNode } from "@/types";
import { TIER_COLORS } from "@/lib/constants";

interface ConstellationProps {
  nodes: RoadmapNode[];
}

export function Constellation({ nodes }: ConstellationProps) {
  const { points, lines } = useMemo(() => {
    const centerX = 200;
    const centerY = 200;
    const maxRadius = 160;

    const pts = nodes.map((node, i) => {
      const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
      const radius = maxRadius * (0.5 + (i % 3) * 0.2);
      const tierOffset = node.difficulty === "expert" ? 1.3 : node.difficulty === "advanced" ? 1.1 : node.difficulty === "intermediate" ? 0.9 : 0.7;
      return {
        id: node.id,
        cx: centerX + Math.cos(angle) * radius * tierOffset,
        cy: centerY + Math.sin(angle) * radius * tierOffset,
        r: node.completed ? 6 : 4,
        completed: node.completed,
        color: TIER_COLORS[node.difficulty]?.text || "text-white",
      };
    });

    const lns: { x1: number; y1: number; x2: number; y2: number }[] = [];
    nodes.forEach((node) => {
      const from = pts.find((p) => p.id === node.id);
      node.prerequisites.forEach((prereqId) => {
        const to = pts.find((p) => p.id === prereqId);
        if (from && to) {
          lns.push({ x1: from.cx, y1: from.cy, x2: to.cx, y2: to.cy });
        }
      });
    });

    return { points: pts, lines: lns };
  }, [nodes]);

  return (
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-sm font-semibold text-white/80">Skill Constellation</h3>
      <svg viewBox="0 0 400 400" className="w-full max-w-sm">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {lines.map((line, i) => (
          <line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        ))}

        {points.map((pt) => (
          <g key={pt.id}>
            {pt.completed && (
              <circle
                cx={pt.cx}
                cy={pt.cy}
                r={pt.r + 4}
                fill="none"
                stroke="rgba(139, 92, 246, 0.3)"
                strokeWidth="1"
                filter="url(#glow)"
              />
            )}
            <circle
              cx={pt.cx}
              cy={pt.cy}
              r={pt.r}
              className={pt.color}
              fill="currentColor"
              filter="url(#glow)"
              opacity={pt.completed ? 1 : 0.4}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
