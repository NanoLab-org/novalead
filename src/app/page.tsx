import { ProgressiveHero } from "@/components/ui/progressive-hero";
import Carousel from "@/components/home/Carousel";

export default function Home() {
  return (
    <main className="flex flex-col bg-base">
      <ProgressiveHero />
      <Carousel />
    </main>
  );
}
