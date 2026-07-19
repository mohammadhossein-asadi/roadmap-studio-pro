"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen items-center justify-center bg-[#050510]">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
          <p className="mt-2 text-white/50">
            An unexpected error occurred. Please try again.
          </p>
        </div>
        <Button onClick={reset} variant="glass">
          Try Again
        </Button>
      </div>
    </div>
  );
}
