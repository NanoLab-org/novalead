import { ProgressiveHero } from "@/components/ui/progressive-hero";
import Carousel from "@/components/home/Carousel";
import About from "@/components/home/About";
import Location from "@/components/home/Location";

export default function Home() {
  return (
    <main className="flex flex-col bg-base">
      <ProgressiveHero />
      <Carousel />
      <About />
      <Location />
    </main>
  );
}