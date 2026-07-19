"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Search, Menu, X, Compass, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SPRING_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Roadmaps", href: "/dashboard", icon: Compass },
  { label: "Dashboard", href: "/dashboard", icon: BarChart3 },
];

export function GlobalNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (!cmdOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCmdOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [cmdOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", ...SPRING_CONFIG }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-black/60 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/20"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500">
              <span className="text-sm font-bold text-white">R</span>
            </div>
            <span className="text-base sm:text-lg font-semibold text-white hidden sm:inline">Roadmap Studio</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="glass"
              size="sm"
              onClick={() => setCmdOpen(true)}
              className="hidden sm:flex gap-2"
            >
              <Search className="h-4 w-4" />
              <span className="text-white/50">Search</span>
              <kbd className="ml-2 rounded border border-white/20 bg-white/5 px-1.5 py-0.5 text-[10px] text-white/40">
                ⌘K
              </kbd>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-16 z-40 bg-black/95 backdrop-blur-xl md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex flex-col gap-2 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cmdOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm"
            onClick={() => setCmdOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Search command palette"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", ...SPRING_CONFIG }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl border border-white/10 bg-zinc-900/95 backdrop-blur-2xl shadow-2xl"
            >
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                <Search className="h-5 w-5 text-white/40" />
                <input
                  autoFocus
                  aria-label="Search roadmaps and topics"
                  placeholder="Search roadmaps, topics, resources..."
                  className="flex-1 bg-transparent text-white placeholder-white/40 outline-none"
                />
                <kbd className="rounded border border-white/20 bg-white/5 px-1.5 py-0.5 text-[10px] text-white/40">
                  ESC
                </kbd>
              </div>
              <div className="p-4 text-sm text-white/40">
                Start typing to search...
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
