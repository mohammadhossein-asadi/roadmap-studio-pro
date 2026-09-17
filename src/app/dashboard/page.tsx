"use client";

import { useMemo } from "react";
import { GlobalNav } from "@/components/core/global-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { XPBar } from "@/components/gamification/xp-bar";
import { StreakGrid } from "@/components/gamification/streak-grid";
import { ProgressChart } from "@/components/visualizations/progress-chart";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { SPRING_CONFIG } from "@/lib/constants";
import { Trophy, Flame, Target, Star, BookOpen, Clock, ArrowRight } from "lucide-react";
import userData from "@/data/user-progress.json";
import { ROADMAPS, ROADMAP_CATEGORIES, getRoadmapsByCategory } from "@/data/roadmaps";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function loadRoadmapData(id: string): any {
  try {
    return require(`@/data/roadmaps/${id}.json`);
  } catch {
    return { nodes: [] };
  }
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Layout: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>,
  Server: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>,
  Layers: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>,
  Cloud: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>,
  Smartphone: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>,
  Shield: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>,
  Database: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>,
  Brain: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 5a3 3 0 1 1-1.95-5.29 3 3 0 0 1 1.95 5.29Z"/><path d="M12 5a3 3 0 1 0-1.95 5.29A3 3 0 0 0 12 5Z"/><path d="M12 5v14"/><path d="M8 8.5a3 3 0 1 0-1.95 5.29A3 3 0 0 0 8 14.5Z"/><path d="M16 8.5a3 3 0 1 1 1.95 5.29A3 3 0 0 1 16 14.5Z"/><path d="M8 8.5V14"/><path d="M16 8.5V14"/></svg>,
  Sparkles: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>,
  Settings: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
  Code: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  Target: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Users: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Megaphone: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 11 18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>,
  PieChart: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>,
  Network: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 8v2"/><path d="M19 8v2"/><path d="M5 16v-4"/><path d="M19 16v-4"/><path d="M9 8v8"/></svg>,
  Rocket: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
  Activity: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>,
  BarChart3: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>,
  CheckCircle: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>,
  Boxes: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"/><path d="m7 16.5-4.74-2.85"/><path d="m7 16.5 5-3"/><path d="M7 16.5v5.17"/><path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"/><path d="m17 16.5-5-3"/><path d="m17 16.5 4.74-2.85"/><path d="M17 16.5v5.17"/><path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"/><path d="M12 8 7.26 5.15"/><path d="m12 8 4.74-2.85"/><path d="M12 13.5V8"/></svg>,
  Palette: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>,
  FileText: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>,
  Gamepad2: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/></svg>,
};

const COLOR_CLASSES: Record<string, { bg: string; text: string; barFrom: string; barTo: string }> = {
  violet: { bg: "bg-violet-500/20", text: "text-violet-400", barFrom: "from-violet-500", barTo: "to-violet-400" },
  emerald: { bg: "bg-emerald-500/20", text: "text-emerald-400", barFrom: "from-emerald-500", barTo: "to-emerald-400" },
  blue: { bg: "bg-blue-500/20", text: "text-blue-400", barFrom: "from-blue-500", barTo: "to-blue-400" },
  orange: { bg: "bg-orange-500/20", text: "text-orange-400", barFrom: "from-orange-500", barTo: "to-orange-400" },
  pink: { bg: "bg-pink-500/20", text: "text-pink-400", barFrom: "from-pink-500", barTo: "to-pink-400" },
  cyan: { bg: "bg-cyan-500/20", text: "text-cyan-400", barFrom: "from-cyan-500", barTo: "to-cyan-400" },
  red: { bg: "bg-red-500/20", text: "text-red-400", barFrom: "from-red-500", barTo: "to-red-400" },
  amber: { bg: "bg-amber-500/20", text: "text-amber-400", barFrom: "from-amber-500", barTo: "to-amber-400" },
};

export default function DashboardPage() {
  const totalNodes = useMemo(() => {
    return ROADMAPS.reduce((acc, r) => {
      const data = loadRoadmapData(r.id);
      return acc + (data.nodes?.length || 0);
    }, 0);
  }, []);

  const completedNodes = userData.completedNodes.length;
  const completionRate = totalNodes > 0 ? Math.round((completedNodes / totalNodes) * 100) : 0;

  const roleRoadmaps = useMemo(() => getRoadmapsByCategory("role"), []);
  const skillRoadmaps = useMemo(() => getRoadmapsByCategory("skill"), []);

  return (
    <div className="min-h-screen bg-[#050510]">
      <GlobalNav />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-20 sm:pt-24 pb-12 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", ...SPRING_CONFIG }}
        >
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-2 text-white/50">{ROADMAPS.length} roadmaps across role-based and skill-based learning paths.</p>
        </motion.div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard icon={Trophy} label="Total XP" value={userData.totalXP.toLocaleString()} change="+500 today" color="from-amber-500 to-orange-500" />
          <StatsCard icon={Flame} label="Day Streak" value={`${userData.currentStreak} days`} change="Best: 21" color="from-red-500 to-orange-500" />
          <StatsCard icon={Target} label="Topics Completed" value={`${completedNodes}/${totalNodes}`} change={`${completionRate}%`} color="from-emerald-500 to-green-500" />
          <StatsCard icon={Star} label="Current Level" value={userData.level} color="from-violet-500 to-purple-500" />
        </div>

        {/* Role-based Roadmaps */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-white mb-4">Role-based Roadmaps</h2>
          <p className="text-sm text-white/40 mb-4">Choose a career path and follow a structured learning journey.</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {roleRoadmaps.map((meta, i) => {
              const data = loadRoadmapData(meta.id);
              const total = data.nodes?.length || 0;
              const completed = data.nodes?.filter((n: { completed: boolean }) => n.completed)?.length || 0;
              const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
              const Icon = ICON_MAP[meta.icon] || ICON_MAP.Layers;
              const colors = COLOR_CLASSES[meta.color] || COLOR_CLASSES.violet;

              return (
                <motion.div
                  key={meta.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.03, 0.5) }}
                >
                  <Link href={`/roadmap/${meta.id}`}>
                    <Card className="group cursor-pointer transition-all hover:bg-white/[0.07] hover:border-white/20 h-full">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${colors.bg}`}>
                            <Icon className={`h-4 w-4 ${colors.text}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-white truncate">{meta.label}</h3>
                            <span className="text-xs text-white/40">{total} topics</span>
                          </div>
                          <ArrowRight className="h-3 w-3 text-white/20 group-hover:text-white/60 transition-colors shrink-0" />
                        </div>
                        <p className="text-xs text-white/40 line-clamp-2 mb-3">{meta.description}</p>
                        {total > 0 && (
                          <div>
                            <div className="flex items-center justify-between text-[10px] text-white/30 mb-1">
                              <span>{completed}/{total}</span>
                              <span>{pct}%</span>
                            </div>
                            <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                              <div className={`h-full rounded-full bg-gradient-to-r ${colors.barFrom} ${colors.barTo}`} style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Skill-based Roadmaps */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-white mb-4">Skill-based Roadmaps</h2>
          <p className="text-sm text-white/40 mb-4">Master specific technologies and frameworks with focused learning paths.</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {skillRoadmaps.map((meta, i) => {
              const Icon = ICON_MAP[meta.icon] || ICON_MAP.Code;
              const colors = COLOR_CLASSES[meta.color] || COLOR_CLASSES.violet;

              return (
                <motion.div
                  key={meta.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.02, 0.5) }}
                >
                  <Link href={`/roadmap/${meta.id}`}>
                    <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition-all hover:bg-white/[0.07] hover:border-white/20 cursor-pointer">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${colors.bg} shrink-0`}>
                        <Icon className={`h-4 w-4 ${colors.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-white truncate">{meta.label}</h3>
                      </div>
                      <ArrowRight className="h-3 w-3 text-white/20 group-hover:text-white/60 transition-colors shrink-0" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle>Level Progress</CardTitle></CardHeader>
              <CardContent><XPBar currentXP={userData.totalXP} level={userData.level} /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Activity Heatmap</CardTitle></CardHeader>
              <CardContent><StreakGrid activity={userData.dailyActivity} /></CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Overall Progress</CardTitle></CardHeader>
              <CardContent className="flex justify-center py-4"><ProgressChart completed={completedNodes} total={totalNodes} /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { icon: BookOpen, text: "Completed CSS Layout & Design", time: "2h ago", xp: "+350 XP" },
                    { icon: Clock, text: "Started React Development", time: "5h ago", xp: "" },
                    { icon: BookOpen, text: "Completed HTML Fundamentals", time: "1d ago", xp: "+300 XP" },
                  ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5"><item.icon className="h-4 w-4 text-white/50" /></div>
                      <div className="flex-1 min-w-0"><p className="text-sm text-white/80 truncate">{item.text}</p><p className="text-xs text-white/40">{item.time}</p></div>
                      {item.xp && <span className="text-xs text-amber-400">{item.xp}</span>}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
