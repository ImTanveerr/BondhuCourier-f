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
    <section className="relative overflow-hidden py-20 md:py-24 min-h-[50vh] bg-gray-50 dark:bg-gray-900">
      {/* Background pattern */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <img
          alt="background pattern"
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 container mx-auto">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          {/* Logo */}
          <div className="flex items-center gap-3 rounded-xl bg-background/30 px-4 py-3 shadow-sm backdrop-blur-sm">
            <Logo />
            <h1 className="text-orange-600 text-xl font-bold">BondhuCurrier</h1>
          </div>

          {/* Heading */}
          <div>
            <h1 className="mb-4 text-3xl lg:text-5xl font-bold tracking-tight">
              Simplifying Parcel Delivery in{" "}
              <span className="text-primary">Bangladesh</span>
            </h1>
            <p className="mx-auto max-w-3xl text-muted-foreground lg:text-lg">
              Track your parcel quickly and easily using your unique tracking ID.
            </p>
          </div>

          {/* Tracking form */}
          <form
            onSubmit={handleTrackSubmit}
            className="mt-6 flex flex-col sm:flex-row justify-center gap-3 w-full max-w-md"
          >
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter Tracking ID"
              className="flex-1 border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-base"
            />
            <Button type="submit" disabled={!trackingId.trim()} className="px-6 py-2">
              Track
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
