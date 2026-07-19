import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#050510]">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 border border-violet-500/20">
            <MapPin className="h-8 w-8 text-violet-400" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Page not found</h2>
          <p className="mt-2 text-white/50">
            The roadmap or page you are looking for does not exist.
          </p>
        </div>
        <Link href="/dashboard">
          <Button variant="glass">
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
