"use client";

import { useMemo } from "react";
import type { RoadmapNode, Edge } from "@/types";

interface EdgeRendererProps {
  nodes: RoadmapNode[];
  edges: Edge[];
}

export function EdgeRenderer({ nodes, edges }: EdgeRendererProps) {
  const nodeMap = useMemo(() => {
    const map = new Map<string, RoadmapNode>();
    nodes.forEach((n) => map.set(n.id, n));
    return map;
  }, [nodes]);

  const paths = useMemo(() => {
    return edges
      .map((edge) => {
        const from = nodeMap.get(edge.from);
        const to = nodeMap.get(edge.to);
        if (!from || !to) return null;

        const x1 = from.x + 112;
        const y1 = from.y + 60;
        const x2 = to.x + 112;
        const y2 = to.y + 60;

        const dx = x2 - x1;
        const dy = y2 - y1;
        const cx1 = x1 + dx * 0.4;
        const cy1 = y1;
        const cx2 = x2 - dx * 0.4;
        const cy2 = y2;

        const bothComplete = from.completed && to.completed;

        return {
          id: edge.id,
          d: `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`,
          stroke: bothComplete
            ? "url(#edgeGradientComplete)"
            : "url(#edgeGradientDefault)",
          opacity: bothComplete ? 0.8 : 0.2,
        };
      })
      .filter(Boolean);
  }, [nodes, edges, nodeMap]);

  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
      <defs>
        <linearGradient id="edgeGradientComplete" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="edgeGradientDefault" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {paths.map(
        (path) =>
          path && (
            <path
              key={path.id}
              d={path.d}
              fill="none"
              stroke={path.stroke}
              strokeWidth={2}
              opacity={path.opacity}
              strokeDasharray={path.opacity < 0.5 ? "6 4" : "none"}
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-20"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>
          )
      )}
    </svg>
  );
}
