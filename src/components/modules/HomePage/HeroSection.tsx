import { Button } from "@/components/ui/button";
import Logo from "@/assets/icons/Logo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [trackingId, setTrackingId] = useState("");
  const navigate = useNavigate();

  const handleTrack = () => {
    if (!trackingId.trim()) return alert("Please enter a tracking ID");
    navigate(`/Track/${trackingId.trim()}`);
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
                Deliver Parcel Anywhere in{" "}
                <span className="text-primary">Bangladesh</span>
              </h1>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                Enter your tracking ID below to see the latest status and tracking events of your parcel.
              </p>
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <input
                type="text"
                placeholder="Enter Tracking ID"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="w-[300px] border px-3 py-2 rounded"
              />
              <Button onClick={handleTrack} disabled={!trackingId.trim()}>
                Track
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
