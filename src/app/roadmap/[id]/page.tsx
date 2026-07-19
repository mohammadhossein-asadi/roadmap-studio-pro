"use client";

import { useState, useCallback, useMemo, Suspense } from "react";
import dynamic from "next/dynamic";
import { GlobalNav } from "@/components/core/global-nav";
import { InfiniteCanvas } from "@/components/physics-canvas/infinite-canvas";
import { TopicDrawer } from "@/components/labs/topic-drawer";
import { ModeSwitcher } from "@/components/modes/mode-switcher";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ChevronDown, Compass, BarChart3, Code, Server, Layers, Cloud, Smartphone, Shield, Database, Brain, Sparkles, Settings, Link as LinkIcon, CheckCircle, Boxes, Palette, FileText, Gamepad2, Target, Users, Megaphone, PieChart, Network, Rocket, Activity, Terminal, Atom, Coffee, Leaf, GitBranch, Box, Search, Globe, Train, Gem, Eye, Puzzle, Plug, MessageSquare, Bot, Wand, Paintbrush, FileCode, Layout, ShieldAlert } from "lucide-react";
import { getRoadmapMeta, ROADMAPS, ROADMAP_CATEGORIES, getRoadmapsByCategory } from "@/data/roadmaps";
import type { RoadmapNode, DifficultyTier } from "@/types";

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Compass, BarChart3, Code, Server, Layers, Cloud, Smartphone, Shield, Database,
  Brain, Sparkles, Settings, Link: LinkIcon, CheckCircle, Boxes, Palette, FileText,
  Gamepad2, Target, Users, Megaphone, PieChart, Network, Rocket, Activity, Terminal,
  Atom, Coffee, Leaf, GitBranch, Box, Search, Globe, Train, Gem, Eye, Puzzle, Plug,
  MessageSquare, Bot, Wand, Paintbrush, FileCode, Layout, ShieldAlert,
};

const COLOR_CLASSES: Record<string, string> = {
  violet: "text-violet-400",
  emerald: "text-emerald-400",
  blue: "text-blue-400",
  orange: "text-orange-400",
  pink: "text-pink-400",
  cyan: "text-cyan-400",
  red: "text-red-400",
  amber: "text-amber-400",
};

// Dynamically load any roadmap JSON via webpack
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function loadRoadmapData(id: string): any {
  try {
    return require(`@/data/roadmaps/${id}.json`);
  } catch {
    try {
      return require(`@/data/roadmaps/frontend.json`);
    } catch {
      return { nodes: [], edges: [] };
    }
  }
}

const UniverseGalaxy = dynamic(
  () => import("@/components/visualizations/universe-galaxy").then((m) => m.UniverseGalaxy),
  { ssr: false, loading: () => <div className="h-full w-full flex items-center justify-center"><div className="text-white/30 text-sm">Loading Universe...</div></div> }
);

const NeuralNetwork = dynamic(
  () => import("@/components/visualizations/neural-network").then((m) => m.NeuralNetwork),
  { ssr: false, loading: () => <div className="h-full w-full flex items-center justify-center"><div className="text-white/30 text-sm">Loading Neural Network...</div></div> }
);

const DnaHelix = dynamic(
  () => import("@/components/visualizations/dna-helix").then((m) => m.DnaHelix),
  { ssr: false, loading: () => <div className="h-full w-full flex items-center justify-center"><div className="text-white/30 text-sm">Loading DNA Helix...</div></div> }
);

type Mode = "canvas" | "universe" | "neural" | "helix";

function ViewModeRenderer({
  activeMode,
  typedNodes,
  edges,
  onSelectNode,
}: {
  activeMode: Mode;
  typedNodes: RoadmapNode[];
  edges: { id: string; from: string; to: string }[];
  onSelectNode: (node: RoadmapNode) => void;
}) {
  return (
    <Suspense fallback={<div className="h-full w-full flex items-center justify-center"><div className="text-white/30 text-sm">Loading...</div></div>}>
      {activeMode === "canvas" && (
        <InfiniteCanvas nodes={typedNodes} edges={edges} onSelectNode={onSelectNode} />
      )}
      {activeMode === "universe" && <UniverseGalaxy />}
      {activeMode === "neural" && <NeuralNetwork />}
      {activeMode === "helix" && <DnaHelix />}
    </Suspense>
  );
}

export default function RoadmapPage() {
  const params = useParams();
  const roadmapId = (params?.id as string) || "frontend";
  const meta = getRoadmapMeta(roadmapId);
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [activeMode, setActiveMode] = useState<Mode>("canvas");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const roadmapJson = useMemo(() => loadRoadmapData(roadmapId), [roadmapId]);

  const typedNodes: RoadmapNode[] = useMemo(
    () =>
      (roadmapJson.nodes || []).map((n: Record<string, unknown>) => ({
        id: n.id as string,
        label: n.label as string,
        description: n.description as string,
        difficulty: n.difficulty as DifficultyTier,
        x: n.x as number,
        y: n.y as number,
        prerequisites: (n.prerequisites as string[]) || [],
        estimatedMinutes: (n.estimatedMinutes as number) || 0,
        completed: (n.completed as boolean) || false,
        resources: ((n.resources as Record<string, unknown>[]) || []).map((r) => ({
          id: r.id as string,
          title: r.title as string,
          url: r.url as string,
          type: r.type as "article" | "video" | "docs" | "tutorial",
          rating: (r.rating as number) || 5,
        })),
      })),
    [roadmapJson]
  );

  const IconComponent: React.FC<{ className?: string }> = meta ? (ICON_MAP[meta.icon] || Layers) : Layers;

  const filteredRoadmaps = useMemo(() => {
    if (!searchQuery) return ROADMAPS;
    const q = searchQuery.toLowerCase();
    return ROADMAPS.filter((r) => r.label.toLowerCase().includes(q) || r.description.toLowerCase().includes(q));
  }, [searchQuery]);

  const roleRoadmaps = useMemo(() => filteredRoadmaps.filter((r) => r.category === "role"), [filteredRoadmaps]);
  const skillRoadmaps = useMemo(() => filteredRoadmaps.filter((r) => r.category === "skill"), [filteredRoadmaps]);

  const handleSelectNode = useCallback((node: RoadmapNode) => {
    setSelectedNode(node);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-[#050510]">
      <GlobalNav />

      <div className="relative z-20 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur-xl px-6 py-3 pt-16">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Home
            </Button>
          </Link>
          <div className="h-4 w-px bg-white/10" />

          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <IconComponent className={`h-4 w-4 ${COLOR_CLASSES[meta?.color || 'violet']}`} />
              <span className="text-sm font-medium text-white">{meta?.label || "Frontend Developer"}</span>
              <ChevronDown className="h-3 w-3 text-white/40" />
            </Button>

            {showDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => { setShowDropdown(false); setSearchQuery(""); }} />
                <div className="absolute top-full left-0 mt-1 z-50 w-80 rounded-lg border border-white/10 bg-black/90 backdrop-blur-xl shadow-xl overflow-hidden">
                  <div className="p-2 border-b border-white/10">
                    <input
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search roadmaps..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-violet-500/50"
                    />
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {roleRoadmaps.length > 0 && (
                      <div>
                        <div className="px-3 py-2 text-xs font-semibold text-white/30 uppercase tracking-wider">Role-based</div>
                        {roleRoadmaps.map((r) => {
                          const RIcon = ICON_MAP[r.icon] || Layers;
                          return (
                            <Link
                              key={r.id}
                              href={`/roadmap/${r.id}`}
                              onClick={() => { setShowDropdown(false); setSearchQuery(""); }}
                              className={`flex items-center gap-3 px-3 py-2 transition-colors hover:bg-white/10 ${r.id === roadmapId ? "bg-white/5" : ""}`}
                            >
                              <RIcon className={`h-4 w-4 shrink-0 ${COLOR_CLASSES[r.color] || 'text-violet-400'}`} />
                              <div className="flex-1 min-w-0">
                                <div className="text-sm text-white truncate">{r.label}</div>
                              </div>
                              {r.id === roadmapId && <div className="h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0" />}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                    {skillRoadmaps.length > 0 && (
                      <div>
                        <div className="px-3 py-2 text-xs font-semibold text-white/30 uppercase tracking-wider">Skill-based</div>
                        {skillRoadmaps.map((r) => {
                          const RIcon = ICON_MAP[r.icon] || Layers;
                          return (
                            <Link
                              key={r.id}
                              href={`/roadmap/${r.id}`}
                              onClick={() => { setShowDropdown(false); setSearchQuery(""); }}
                              className={`flex items-center gap-3 px-3 py-2 transition-colors hover:bg-white/10 ${r.id === roadmapId ? "bg-white/5" : ""}`}
                            >
                              <RIcon className={`h-4 w-4 shrink-0 ${COLOR_CLASSES[r.color] || 'text-violet-400'}`} />
                              <div className="flex-1 min-w-0">
                                <div className="text-sm text-white truncate">{r.label}</div>
                              </div>
                              {r.id === roadmapId && <div className="h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0" />}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <span className="rounded-full bg-violet-500/20 px-3 py-1 text-xs text-violet-300 border border-violet-500/30">
            {typedNodes.length} topics
          </span>
        </div>

        <ModeSwitcher activeMode={activeMode} onModeChange={setActiveMode} />
      </div>

      <div className="relative flex-1" style={{ minHeight: 0 }}>
        <motion.div
          key={roadmapId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <ViewModeRenderer
            activeMode={activeMode}
            typedNodes={typedNodes}
            edges={roadmapJson.edges || []}
            onSelectNode={handleSelectNode}
          />
        </motion.div>
      </div>

      <TopicDrawer node={selectedNode} onClose={handleCloseDrawer} />
    </div>
  );
}
