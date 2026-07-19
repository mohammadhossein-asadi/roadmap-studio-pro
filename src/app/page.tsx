"use client";

import dynamic from "next/dynamic";
import { GlobalNav } from "@/components/core/global-nav";
import { LiquidHeadline } from "@/components/hero/liquid-headline";
import { ScrollIndicator } from "@/components/hero/scroll-indicator";
import { ParticleField } from "@/components/visualizations/particle-field";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { SPRING_CONFIG } from "@/lib/constants";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Globe2 } from "lucide-react";
import { ROADMAPS, getRoadmapsByCategory } from "@/data/roadmaps";
import { useMemo } from "react";

const AuroraCanvas = dynamic(
  () => import("@/components/hero/aurora-canvas").then((m) => m.AuroraCanvas),
  { ssr: false }
);

const HeroGlobe = dynamic(
  () => import("@/components/hero/hero-globe").then((m) => m.HeroGlobe),
  { ssr: false }
);

const features = [
  { icon: Sparkles, title: "Visual Skill Trees", description: "Pan, zoom, and drag through interactive roadmaps. See prerequisites, resources, and your progress at a glance.", color: "from-violet-500 to-purple-500" },
  { icon: Zap, title: "XP & Streaks", description: "Earn experience points, maintain daily streaks, and watch your level climb as you complete topics.", color: "from-amber-500 to-orange-500" },
  { icon: Globe2, title: "3D Universe View", description: "See your entire tech stack as an interconnected constellation — the bigger the skill, the brighter the star.", color: "from-cyan-500 to-blue-500" },
];

export default function HomePage() {
  const roleRoadmaps = useMemo(() => getRoadmapsByCategory("role"), []);
  const skillRoadmaps = useMemo(() => getRoadmapsByCategory("skill"), []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <GlobalNav />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <AuroraCanvas />
        <ParticleField count={40} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-20 sm:pt-24">
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6 sm:space-y-8">
              <LiquidHeadline />
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, type: "spring", ...SPRING_CONFIG }} className="flex flex-wrap gap-3 sm:gap-4">
                <Link href="#roadmaps"><Button size="lg" className="gap-2">Choose a Roadmap<ArrowRight className="h-4 w-4" /></Button></Link>
                <Link href="/dashboard"><Button variant="glass" size="lg">View Dashboard</Button></Link>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, type: "spring", ...SPRING_CONFIG }} className="hidden lg:block">
              <HeroGlobe />
            </motion.div>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      {/* Roadmaps Section */}
      <section id="roadmaps" className="relative z-10 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Pick Your <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Path</span></h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/50 max-w-2xl mx-auto px-2">
              {ROADMAPS.length} learning paths — role-based career tracks and skill-based deep dives, each with curated topics and free resources.
            </p>
          </motion.div>

          {/* Role-based */}
          <div className="mb-10 sm:mb-12">
            <h3 className="text-base sm:text-lg font-semibold text-white/80 mb-3 sm:mb-4">Role-based Roadmaps</h3>
            <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {roleRoadmaps.map((meta, i) => (
                <motion.div key={meta.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: Math.min(i * 0.03, 0.4) }}>
                  <Link href={`/roadmap/${meta.id}`}>
                    <div className="group rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4 transition-all hover:bg-white/[0.08] hover:border-white/20 hover:shadow-xl cursor-pointer h-full">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-white">{meta.label}</h4>
                        <ArrowRight className="h-3 w-3 text-white/20 group-hover:text-white/60 transition-colors shrink-0 mt-0.5" />
                      </div>
                      <p className="mt-1.5 sm:mt-2 text-xs text-white/40 line-clamp-2">{meta.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skill-based */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white/80 mb-3 sm:mb-4">Skill-based Roadmaps</h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {skillRoadmaps.map((meta, i) => (
                <motion.div key={meta.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: Math.min(i * 0.015, 0.4) }}>
                  <Link href={`/roadmap/${meta.id}`}>
                    <div className="group rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm text-white/70 transition-all hover:bg-white/[0.08] hover:border-white/20 hover:text-white cursor-pointer">
                      {meta.label}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Built for Developers Who <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Learn by Doing</span></h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/50 max-w-2xl mx-auto px-2">Not just a list of links. An interactive workspace where you drag, zoom, and check off skills as you master them.</p>
          </motion.div>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/20 hover:shadow-xl">
                <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color}`}><feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" /></div>
                <h3 className="mt-4 sm:mt-6 text-lg sm:text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 sm:mt-3 text-sm sm:text-base text-white/50">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 sm:p-12 md:p-16 backdrop-blur-xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to Map Your Skills?</h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/50">Pick a track, open the roadmap, and start learning. No sign-up required.</p>
            <Link href="#roadmaps" className="mt-6 sm:mt-8 inline-block"><Button size="lg" className="gap-2">Browse All Roadmaps<ArrowRight className="h-4 w-4" /></Button></Link>
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center text-xs sm:text-sm text-white/30">Roadmap Studio — {ROADMAPS.length} interactive developer learning paths.</div>
      </footer>
    </div>
  );
}
