"use client";

import { motion } from "motion/react";
import { useCanvasPhysics } from "@/hooks/use-canvas-physics";
import { NodeElement } from "./node-element";
import { EdgeRenderer } from "./edge-renderer";
import type { RoadmapNode, Edge } from "@/types";
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InfiniteCanvasProps {
  nodes: RoadmapNode[];
  edges: Edge[];
  onSelectNode: (node: RoadmapNode) => void;
}

export function InfiniteCanvas({ nodes, edges, onSelectNode }: InfiniteCanvasProps) {
  const { state, containerRef, handlers, zoom, resetView } = useCanvasPhysics();

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-black/20"
      ref={containerRef}
      tabIndex={0}
      role="application"
      aria-label="Interactive roadmap canvas. Use scroll to zoom, drag to pan."
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${state.x}px, ${state.y}px) scale(${state.scale})`,
          transformOrigin: "0 0",
          willChange: "transform",
        }}
        {...handlers}
      >
        <EdgeRenderer nodes={nodes} edges={edges} />

        {nodes.map((node) => (
          <motion.div
            key={node.id}
            layout
            className="absolute"
            style={{ left: node.x, top: node.y }}
          >
            <NodeElement node={node} onSelect={onSelectNode} />
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-6 right-6 flex items-center gap-2">
        <Button variant="glass" size="icon" onClick={() => zoom(-100)} aria-label="Zoom in">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="glass" size="icon" onClick={() => zoom(100)} aria-label="Zoom out">
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="glass" size="icon" onClick={resetView} aria-label="Reset view">
          <RotateCcw className="h-4 w-4" />
        </Button>
        <div className="ml-2 rounded-lg border border-white/10 bg-black/40 backdrop-blur-xl px-3 py-1.5 text-xs text-white/40">
          {Math.round(state.scale * 100)}%
        </div>
      </div>
    </div>
  );
}
