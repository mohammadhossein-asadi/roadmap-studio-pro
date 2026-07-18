"use client";

import { useState } from "react";
import { GlobalNav } from "@/components/core/global-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { XPBar } from "@/components/gamification/xp-bar";
import { StreakGrid } from "@/components/gamification/streak-grid";
import { ProgressChart } from "@/components/visualizations/progress-chart";
import { Celebration } from "@/components/gamification/celebration";
import { motion } from "motion/react";
import { SPRING_CONFIG } from "@/lib/constants";
import { Trophy, Flame, Target, Star, BookOpen, Clock } from "lucide-react";
import userData from "@/data/user-progress.json";
import roadmapData from "@/data/roadmap-nodes.json";

export default function DashboardPage() {
  const [showCelebration] = useState(false);
  const totalNodes = roadmapData.nodes.length;
  const completedNodes = userData.completedNodes.length;
  const completionRate = Math.round((completedNodes / totalNodes) * 100);

  return (
    <div className="min-h-screen bg-[#050510]">
      <GlobalNav />
      <Celebration active={showCelebration} />

      <main className="mx-auto max-w-7xl px-6 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", ...SPRING_CONFIG }}
        >
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-2 text-white/50">Track your learning progress and achievements.</p>
        </motion.div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            icon={Trophy}
            label="Total XP"
            value={userData.totalXP.toLocaleString()}
            change="+500 today"
            color="from-amber-500 to-orange-500"
          />
          <StatsCard
            icon={Flame}
            label="Day Streak"
            value={`${userData.currentStreak} days`}
            change="Best: 21"
            color="from-red-500 to-orange-500"
          />
          <StatsCard
            icon={Target}
            label="Topics Completed"
            value={`${completedNodes}/${totalNodes}`}
            change={`${completionRate}%`}
            color="from-emerald-500 to-green-500"
          />
          <StatsCard
            icon={Star}
            label="Current Level"
            value={userData.level}
            color="from-violet-500 to-purple-500"
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Level Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <XPBar currentXP={userData.totalXP} level={userData.level} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity Heatmap</CardTitle>
              </CardHeader>
              <CardContent>
                <StreakGrid activity={userData.dailyActivity} />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Overall Progress</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center py-4">
                <ProgressChart completed={completedNodes} total={totalNodes} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { icon: BookOpen, text: "Completed CSS Layout & Design", time: "2h ago", xp: "+350 XP" },
                    { icon: Clock, text: "Started React Development", time: "5h ago", xp: "" },
                    { icon: BookOpen, text: "Completed HTML Fundamentals", time: "1d ago", xp: "+300 XP" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5">
                        <item.icon className="h-4 w-4 text-white/50" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white/80 truncate">{item.text}</p>
                        <p className="text-xs text-white/40">{item.time}</p>
                      </div>
                      {item.xp && (
                        <span className="text-xs text-amber-400">{item.xp}</span>
                      )}
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
