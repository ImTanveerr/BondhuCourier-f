// src/components/HeroSection.tsx
import { Button } from "@/components/ui/button";
import Logo from "@/assets/icons/Logo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [trackingId, setTrackingId] = useState("");
  const navigate = useNavigate();

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      navigate(`/tracking/${trackingId.trim()}`);
    }
  };

  return (
    <section className="relative overflow-hidden py-32 min-h-screen">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <img
          alt="background"
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
          className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90"
        />
      </div>

      <div className="relative z-10 container mx-auto">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-3 rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm">
              <Logo />
              <h1 className="text-orange-600 text-xl font-bold">BondhuCurrier</h1>
            </div>

            <div>
              <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">
                Simplifying Parcel Delivery in{" "}
                <span className="text-primary">Bangladesh</span>
              </h1>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                Track your parcel quickly and easily using your unique tracking ID.
              </p>
            </div>

            <form
              onSubmit={handleTrackSubmit}
              className="mt-6 flex justify-center gap-3 w-full max-w-md"
            >
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter Tracking ID"
                className="flex-1 border px-3 py-2 rounded"
              />
              <Button type="submit" className="px-6 py-2" disabled={!trackingId.trim()}>
                Track
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
