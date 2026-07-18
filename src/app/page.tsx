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

const AuroraCanvas = dynamic(
  () => import("@/components/hero/aurora-canvas").then((m) => m.AuroraCanvas),
  { ssr: false }
);

const HeroGlobe = dynamic(
  () => import("@/components/hero/hero-globe").then((m) => m.HeroGlobe),
  { ssr: false }
);

const features = [
  {
    icon: Sparkles,
    title: "Interactive Roadmaps",
    description: "Explore skill trees with pan, zoom, and drag. Every node is a learning adventure.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Zap,
    title: "Gamified Progress",
    description: "Earn XP, maintain streaks, and level up. Learning has never been this engaging.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Globe2,
    title: "3D Universe Mode",
    description: "Visualize your entire tech stack as a living constellation in 3D space.",
    color: "from-cyan-500 to-blue-500",
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <GlobalNav />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <AuroraCanvas />
        <ParticleField count={40} />

        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-8">
              <LiquidHeadline />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, type: "spring", ...SPRING_CONFIG }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/roadmap/frontend">
                  <Button size="lg" className="gap-2">
                    Start Learning
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="glass" size="lg">
                    View Dashboard
                  </Button>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", ...SPRING_CONFIG }}
            >
              <HeroGlobe />
            </motion.div>
          </div>
        </div>

        <ScrollIndicator />
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Master Any Skill
              </span>
            </h2>
            <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">
              A complete learning platform built for developers who demand excellence.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/20 hover:shadow-xl"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color}`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-white/50">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-16 backdrop-blur-xl"
          >
            <h2 className="text-4xl font-bold text-white">
              Ready to Begin Your Journey?
            </h2>
            <p className="mt-4 text-lg text-white/50">
              Join thousands of developers mastering their craft.
            </p>
            <Link href="/roadmap/frontend" className="mt-8 inline-block">
              <Button size="lg" className="gap-2">
                Explore Roadmaps
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-white/30">
          Roadmap Studio — Built with passion for developers.
        </div>
      </footer>
    </div>
  );
}
