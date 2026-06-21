import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl flex items-center justify-between px-8 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg">
      <div className="text-white font-bold text-xl tracking-tight">
        Nova<span className="text-orange">lead</span>
      </div>
      <ul className="hidden md:flex gap-8 text-sm font-medium text-muted">
        <li><Link href="/catalogue" className="hover:text-white transition-colors">Catalogue</Link></li>
        <li><a href="#about" className="hover:text-white transition-colors">À propos</a></li>
        <li><a href="#location" className="hover:text-white transition-colors">Localisation</a></li>
        <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
      </ul>
      <button className="bg-orange text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity">
        Nous contacter
      </button>
    </nav>
  );
}