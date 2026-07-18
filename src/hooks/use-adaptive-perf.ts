"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export function useAdaptivePerf() {
  const [quality, setQuality] = useState<"high" | "medium" | "low">("high");
  const frameTimes = useRef<number[]>([]);
  const lastFrameTime = useRef(performance.now());

  const sampleFrame = useCallback(() => {
    const now = performance.now();
    const delta = now - lastFrameTime.current;
    lastFrameTime.current = now;

    frameTimes.current.push(delta);
    if (frameTimes.current.length > 60) {
      frameTimes.current.shift();
    }

    if (frameTimes.current.length >= 30) {
      const avg = frameTimes.current.reduce((a, b) => a + b, 0) / frameTimes.current.length;
      const fps = 1000 / avg;

      if (fps < 30) {
        setQuality("low");
      } else if (fps < 55) {
        setQuality("medium");
      } else {
        setQuality("high");
      }
    }
  }, []);

  useEffect(() => {
    let rafId: number;
    const loop = () => {
      sampleFrame();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [sampleFrame]);

  return {
    quality,
    particleCount: quality === "high" ? 80 : quality === "medium" ? 40 : 15,
    blurEnabled: quality === "high",
    shaderEnabled: quality !== "low",
  };
}
