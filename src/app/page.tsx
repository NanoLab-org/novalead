"use client";

import { useRef } from "react";
import { ProgressiveHero } from "@/components/ui/progressive-hero";
import Carousel from "@/components/ui/slideshow";
import About from "@/components/home/About";
import Location from "@/components/home/Location";
import Slideshow from "@/components/ui/slideshow";

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col bg-base">
      <ProgressiveHero />
      <Slideshow />       
    </div>
  );
}