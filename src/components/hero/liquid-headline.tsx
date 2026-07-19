"use client";

import { motion } from "motion/react";
import { SPRING_CONFIG } from "@/lib/constants";

export function LiquidHeadline() {
  return (
    <div className="relative z-10">
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <filter id="liquid">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="6"
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>
      </svg>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", ...SPRING_CONFIG, delay: 0.2 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight"
        style={{ filter: "url(#liquid)" }}
      >
        <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
          Every Skill.
        </span>
        <br />
        <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          One Map. Zero Guesswork.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", ...SPRING_CONFIG, delay: 0.4 }}
        className="mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-white/60"
      >
        Visual roadmaps for Frontend, Backend, Full Stack, DevOps, Mobile, Cloud, Security, and Data Engineering.
        See what to learn next, track your progress, and level up as you go.
      </motion.p>
    </div>
  );
}
