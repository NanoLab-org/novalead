import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center px-10 text-center">
      <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
        <span className="w-5 h-[2px] bg-primary" />
        Erreur 404
        <span className="w-5 h-[2px] bg-primary" />
      </p>
      <h1 className="text-6xl lg:text-8xl font-black text-white tracking-tighter mb-4">
        404
      </h1>
      <p className="text-faded text-base leading-relaxed max-w-md mb-10">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <div className="flex gap-3">
        <Link href="/" className="bg-primary text-white font-semibold text-sm px-6 py-3 rounded-md hover:opacity-90 transition-opacity">
          Retour à l'accueil
        </Link>
        <Link href="/catalogue" className="bg-transparent text-white font-medium text-sm px-5 py-3 rounded-md border border-white/20 hover:border-white/40 transition-colors">
          Voir le catalogue
        </Link>
      </div>
    </div>
  );
}