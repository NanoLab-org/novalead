"use client";

import { ProgressiveHero } from "@/components/ui/progressive-hero";
import Slideshow from "@/components/ui/slideshow";

export default function Home() {
  return (
    <div className="flex flex-col bg-transparent">
      <ProgressiveHero />
      <Slideshow />
    </div>
  );
}
