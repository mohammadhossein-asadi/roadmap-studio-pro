"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { CanvasState } from "@/types";
import { clamp } from "@/lib/utils";
import { CANVAS_LIMITS } from "@/lib/constants";

export function useCanvasPhysics(initialState?: Partial<CanvasState>) {
  const [state, setState] = useState<CanvasState>({
    x: initialState?.x ?? 0,
    y: initialState?.y ?? 0,
    scale: initialState?.scale ?? 1,
  });

  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const lastPinchDist = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "touch" && e.isPrimary === false) return;
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setState((prev) => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY * CANVAS_LIMITS.zoomSpeed;
    setState((prev) => ({
      ...prev,
      scale: clamp(prev.scale + delta * prev.scale, CANVAS_LIMITS.minScale, CANVAS_LIMITS.maxScale),
    }));
  }, []);

  const onDoubleClick = useCallback((e: React.MouseEvent) => {
    setState((prev) => ({
      x: prev.x - e.clientX + (containerRef.current?.clientWidth ?? 0) / 2,
      y: prev.y - e.clientY + (containerRef.current?.clientHeight ?? 0) / 2,
      scale: clamp(prev.scale * 1.5, CANVAS_LIMITS.minScale, CANVAS_LIMITS.maxScale),
    }));
  }, []);

  const resetView = useCallback(() => {
    setState({ x: 0, y: 0, scale: 1 });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 50;
      const zoomStep = 0.1;
      switch (e.key) {
        case "ArrowUp":
          setState((prev) => ({ ...prev, y: prev.y + step }));
          break;
        case "ArrowDown":
          setState((prev) => ({ ...prev, y: prev.y - step }));
          break;
        case "ArrowLeft":
          setState((prev) => ({ ...prev, x: prev.x + step }));
          break;
        case "ArrowRight":
          setState((prev) => ({ ...prev, x: prev.x - step }));
          break;
        case "+":
        case "=":
          setState((prev) => ({
            ...prev,
            scale: clamp(prev.scale + zoomStep, CANVAS_LIMITS.minScale, CANVAS_LIMITS.maxScale),
          }));
          break;
        case "-":
          setState((prev) => ({
            ...prev,
            scale: clamp(prev.scale - zoomStep, CANVAS_LIMITS.minScale, CANVAS_LIMITS.maxScale),
          }));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return {
    state,
    containerRef,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onWheel,
      onDoubleClick,
    },
    resetView,
  };
}
