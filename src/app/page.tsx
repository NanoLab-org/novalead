import Hero from "@/components/home/Hero";
import Carousel from "@/components/home/Carousel";
import About from "@/components/home/About";
import Location from "@/components/home/Location";

export default function Home() {
  return (
    <main className="flex flex-col bg-base">
      <Hero />
      <Carousel />
      <About />
      <Location />
    </main>
  );
}