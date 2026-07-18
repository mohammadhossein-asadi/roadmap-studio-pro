"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { GlobalNav } from "@/components/core/global-nav";
import { InfiniteCanvas } from "@/components/physics-canvas/infinite-canvas";
import { TopicDrawer } from "@/components/labs/topic-drawer";
import { ModeSwitcher } from "@/components/modes/mode-switcher";
import { Celebration } from "@/components/gamification/celebration";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { SPRING_CONFIG } from "@/lib/constants";
import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";
import roadmapData from "@/data/roadmap-nodes.json";
import type { RoadmapNode, DifficultyTier } from "@/types";

const UniverseGalaxy = dynamic(
  () => import("@/components/visualizations/universe-galaxy").then((m) => m.UniverseGalaxy),
  { ssr: false }
);

const NeuralNetwork = dynamic(
  () => import("@/components/visualizations/neural-network").then((m) => m.NeuralNetwork),
  { ssr: false }
);

const DnaHelix = dynamic(
  () => import("@/components/visualizations/dna-helix").then((m) => m.DnaHelix),
  { ssr: false }
);

type Mode = "canvas" | "universe" | "neural" | "helix";

const typedNodes: RoadmapNode[] = roadmapData.nodes.map((n) => ({
  ...n,
  difficulty: n.difficulty as DifficultyTier,
  resources: n.resources.map((r) => ({ ...r, type: r.type as "article" | "video" | "docs" | "tutorial" })),
}));

export default function RoadmapPage() {
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [activeMode, setActiveMode] = useState<Mode>("canvas");
  const [showCelebration] = useState(false);

  const handleSelectNode = useCallback((node: RoadmapNode) => {
    setSelectedNode(node);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-[#050510]">
      <GlobalNav />
      <Celebration active={showCelebration} />

      <div className="relative z-20 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur-xl px-6 py-3 pt-16">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Home
            </Button>
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-violet-400" />
            <span className="text-sm font-medium text-white">Frontend Developer</span>
          </div>
          <span className="rounded-full bg-violet-500/20 px-3 py-1 text-xs text-violet-300 border border-violet-500/30">
            {typedNodes.length} topics
          </span>
        </div>

        <ModeSwitcher activeMode={activeMode} onModeChange={setActiveMode} />
      </div>

      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeMode === "canvas" && (
            <motion.div
              key="canvas"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <InfiniteCanvas
                nodes={typedNodes}
                edges={roadmapData.edges}
                onSelectNode={handleSelectNode}
              />
            </motion.div>
          )}

          {activeMode === "universe" && (
            <motion.div
              key="universe"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <UniverseGalaxy />
            </motion.div>
          )}

          {activeMode === "neural" && (
            <motion.div
              key="neural"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <NeuralNetwork />
            </motion.div>
          )}

          {activeMode === "helix" && (
            <motion.div
              key="helix"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <DnaHelix />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <TopicDrawer node={selectedNode} onClose={handleCloseDrawer} />
    </div>
  );
}
