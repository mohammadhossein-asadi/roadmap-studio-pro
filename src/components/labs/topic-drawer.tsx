"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, Clock, ExternalLink, BookOpen, Video, FileText, GraduationCap, CheckCircle2, Star } from "lucide-react";
import { SPRING_CONFIG, TIER_COLORS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { RoadmapNode } from "@/types";

interface TopicDrawerProps {
  node: RoadmapNode | null;
  onClose: () => void;
}

const resourceIcons: Record<string, typeof BookOpen> = {
  docs: BookOpen,
  video: Video,
  article: FileText,
  tutorial: GraduationCap,
};

export function TopicDrawer({ node, onClose }: TopicDrawerProps) {
  if (!node) return null;

  const tierStyle = TIER_COLORS[node.difficulty] || TIER_COLORS.beginner;

  return (
    <AnimatePresence>
      {node && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", ...SPRING_CONFIG }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-lg border-l border-white/10 bg-zinc-950/95 backdrop-blur-2xl overflow-y-auto"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl px-6 py-4">
              <div className="flex items-center gap-3">
                <Badge variant={node.difficulty as "beginner" | "intermediate" | "advanced" | "expert"}>
                  {node.difficulty}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-white/40">
                  <Clock className="h-3.5 w-3.5" />
                  {node.estimatedMinutes} min
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white">{node.label}</h2>
                <p className="mt-3 text-white/60 leading-relaxed">{node.description}</p>
              </div>

              {node.prerequisites.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">Prerequisites</h3>
                  <div className="flex flex-wrap gap-2">
                    {node.prerequisites.map((prereq) => (
                      <span
                        key={prereq}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/60"
                      >
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">Resources</h3>
                <div className="space-y-3">
                  {node.resources.map((resource) => {
                    const Icon = resourceIcons[resource.type] || BookOpen;
                    return (
                      <a
                        key={resource.id}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10 hover:border-white/20"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                          <Icon className="h-5 w-5 text-white/60" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-white truncate">{resource.title}</h4>
                            <ExternalLink className="h-3.5 w-3.5 text-white/30 shrink-0" />
                          </div>
                          <div className="mt-1 flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < resource.rating ? "text-amber-400 fill-amber-400" : "text-white/20"}`}
                              />
                            ))}
                            <span className="ml-1 text-xs text-white/30 capitalize">{resource.type}</span>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">Practice Lab</h3>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="font-mono text-sm text-emerald-400/80">
                    {`// Complete this topic to unlock the interactive lab\n// estimated time: ${node.estimatedMinutes} minutes`}
                  </div>
                  <Button className="mt-4 w-full" variant={node.completed ? "glass" : "default"}>
                    {node.completed ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      "Mark as Complete (+150 XP)"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
