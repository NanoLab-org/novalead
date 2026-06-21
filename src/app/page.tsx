import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Carousel from "@/components/Carousel";
import About from "@/components/About";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col bg-base">
      <Hero />
      <Carousel />
      <About />
      <Location />
      <Footer />
    </main>
  );
}