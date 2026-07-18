"use client";

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/40 tracking-widest uppercase">Scroll to explore</span>
        <ChevronDown className="h-5 w-5 text-white/40" />
      </motion.div>
    </motion.div>
  );
}
