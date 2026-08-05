"use client";
import { useState } from "react";

type Tab = "b2c" | "b2b";

interface B2CFields {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  formation: string;
  message: string;
}

interface B2BFields {
  entreprise: string;
  secteur: string;
  prenomContact: string;
  nomContact: string;
  email: string;
  telephone: string;
  nbPersonnes: string;
  domaine: string;
  message: string;
}

const B2C_INIT: B2CFields = {
  prenom: "", nom: "", email: "", telephone: "", formation: "", message: "",
};

const B2B_INIT: B2BFields = {
  entreprise: "", secteur: "", prenomContact: "", nomContact: "",
  email: "", telephone: "", nbPersonnes: "", domaine: "", message: "",
};

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function validateB2C(f: B2CFields): Partial<B2CFields> {
  const e: Partial<B2CFields> = {};
  if (!f.prenom.trim()) e.prenom = "Champ requis";
  if (!f.nom.trim()) e.nom = "Champ requis";
  if (!f.email.trim()) e.email = "Champ requis";
  else if (!isValidEmail(f.email)) e.email = "Adresse email invalide";
  if (!f.message.trim()) e.message = "Veuillez décrire votre demande";
  return e;
}

function validateB2B(f: B2BFields): Partial<B2BFields> {
  const e: Partial<B2BFields> = {};
  if (!f.entreprise.trim()) e.entreprise = "Champ requis";
  if (!f.prenomContact.trim()) e.prenomContact = "Champ requis";
  if (!f.nomContact.trim()) e.nomContact = "Champ requis";
  if (!f.email.trim()) e.email = "Champ requis";
  else if (!isValidEmail(f.email)) e.email = "Adresse email invalide";
  if (!f.telephone.trim()) e.telephone = "Champ requis";
  if (!f.message.trim()) e.message = "Veuillez décrire votre besoin";
  return e;
}

type InputChange = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

function Field({
  label, required, error, children,
}: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-strong mb-2">
        {label}{required && <span className="text-error">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-error mt-1">{error}</p>}
    </div>
  );
}

function SuccessPanel({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
        <svg width="32" height="32" viewBox="0 0 256 256" fill="currentColor" className="text-primary">
          <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-graphite mb-2">Demande envoyée !</h3>
      <p className="text-faded text-sm mb-6 max-w-sm">
        Merci pour votre message. Notre équipe vous contactera dans les 24 heures ouvrées.
      </p>
      <button onClick={onReset} type="button" className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity">
        Envoyer une autre demande
      </button>
    </div>
  );
}

export default function ContactPage() {
  const [tab, setTab] = useState<Tab>("b2c");
  const [b2c, setB2c] = useState<B2CFields>(B2C_INIT);
  const [b2b, setB2b] = useState<B2BFields>(B2B_INIT);
  const [b2cErr, setB2cErr] = useState<Partial<B2CFields>>({});
  const [b2bErr, setB2bErr] = useState<Partial<B2BFields>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function switchTab(t: Tab) {
    setTab(t);
    setSubmitted(false);
    setB2cErr({});
    setB2bErr({});
  }

  function b2cChange(k: keyof B2CFields) {
    return (e: InputChange) => {
      setB2c((p) => ({ ...p, [k]: e.target.value }));
      if (b2cErr[k]) setB2cErr((p) => ({ ...p, [k]: "" }));
    };
  }

  function b2bChange(k: keyof B2BFields) {
    return (e: InputChange) => {
      setB2b((p) => ({ ...p, [k]: e.target.value }));
      if (b2bErr[k]) setB2bErr((p) => ({ ...p, [k]: "" }));
    };
  }

  async function submitB2C(e: React.FormEvent) {
  e.preventDefault();
  const err = validateB2C(b2c);
  if (Object.keys(err).length) { setB2cErr(err); return; }
  setLoading(true);
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "b2c", ...b2c }),
    });
    const data = await res.json();
    if (data.success) setSubmitted(true);
    else alert("Erreur lors de l'envoi. Veuillez réessayer.");
  } catch {
    alert("Erreur réseau. Veuillez réessayer.");
  } finally {
    setLoading(false);
  }
}

 async function submitB2B(e: React.FormEvent) {
  e.preventDefault();
  const err = validateB2B(b2b);
  if (Object.keys(err).length) { setB2bErr(err); return; }
  setLoading(true);
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "b2b", ...b2b }),
    });
    const data = await res.json();
    if (data.success) setSubmitted(true);
    else alert("Erreur lors de l'envoi. Veuillez réessayer.");
  } catch {
    alert("Erreur réseau. Veuillez réessayer.");
  } finally {
    setLoading(false);
  }
}
  function reset() {
    setSubmitted(false);
    if (tab === "b2c") { setB2c(B2C_INIT); setB2cErr({}); }
    else { setB2b(B2B_INIT); setB2bErr({}); }
  }

  return (
    <div className="min-h-screen bg-transparent">    
   {/* Hero Section */}
<div data-dark-hero className="bg-gradient-to-br from-hero-from to-hero-to px-5 sm:px-10 lg:px-16 pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-20 text-center">
  <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
    <span className="w-5 h-[2px] bg-primary" />
    Nous contacter
    <span className="w-5 h-[2px] bg-primary" />
  </p>
  <h1 className="text-[clamp(34px,4vw,54px)] font-extrabold text-white leading-[1.08] mb-5">
    Parlons de <br />
    <span className="text-primary">votre projet</span>
  </h1>
  <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
    Particulier ou entreprise — remplissez le formulaire adapté à votre profil et notre équipe vous répond sous 24h.
  </p>
</div>
      {/* Contact Form Section */}
      <section className="px-5 sm:px-10 lg:px-16 py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-deep to-base">
        <div className="max-w-2xl mx-auto bg-surface shadow-card rounded-2xl p-6 md:p-10">
          {/* Tab Switcher */}
          <div className="flex gap-2 sm:gap-4 mb-8 border-b border-black/10 overflow-x-auto">
            <button
              onClick={() => switchTab("b2c")}
              type="button"
              className={`shrink-0 px-3 sm:px-4 py-3 font-semibold text-sm transition-all border-b-2 ${
                tab === "b2c"
                  ? "border-primary text-primary"
                  : "border-transparent text-faded hover:text-strong"
              }`}
            >
              Particulier (B2C)
            </button>
            <button
              onClick={() => switchTab("b2b")}
              type="button"
              className={`shrink-0 px-3 sm:px-4 py-3 font-semibold text-sm transition-all border-b-2 ${
                tab === "b2b"
                  ? "border-primary text-primary"
                  : "border-transparent text-faded hover:text-strong"
              }`}
            >
              Entreprise (B2B)
            </button>
          </div>

          {/* Form or Success */}
          {submitted ? (
            <SuccessPanel onReset={reset} />
          ) : tab === "b2c" ? (
            <form onSubmit={submitB2C} noValidate className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Prénom" required error={b2cErr.prenom}>
                  <input
                    className={`w-full px-4 py-2.5 bg-black/[0.03] border rounded-lg text-graphite placeholder-faint transition-colors ${
                      b2cErr.prenom ? "border-error" : "border-black/10 focus:border-primary"
                    } focus:outline-none`}
                    type="text"
                    placeholder="Votre prénom"
                    value={b2c.prenom}
                    onChange={b2cChange("prenom")}
                  />
                </Field>
                <Field label="Nom" required error={b2cErr.nom}>
                  <input
                    className={`w-full px-4 py-2.5 bg-black/[0.03] border rounded-lg text-graphite placeholder-faint transition-colors ${
                      b2cErr.nom ? "border-error" : "border-black/10 focus:border-primary"
                    } focus:outline-none`}
                    type="text"
                    placeholder="Votre nom"
                    value={b2c.nom}
                    onChange={b2cChange("nom")}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Email" required error={b2cErr.email}>
                  <input
                    className={`w-full px-4 py-2.5 bg-black/[0.03] border rounded-lg text-graphite placeholder-faint transition-colors ${
                      b2cErr.email ? "border-error" : "border-black/10 focus:border-primary"
                    } focus:outline-none`}
                    type="email"
                    placeholder="votre@email.com"
                    value={b2c.email}
                    onChange={b2cChange("email")}
                  />
                </Field>
                <Field label="Téléphone" error={b2cErr.telephone}>
                  <input
                    className={`w-full px-4 py-2.5 bg-black/[0.03] border rounded-lg text-graphite placeholder-faint transition-colors ${
                      b2cErr.telephone ? "border-error" : "border-black/10 focus:border-primary"
                    } focus:outline-none`}
                    type="tel"
                    placeholder="+216 XX XXX XXX"
                    value={b2c.telephone}
                    onChange={b2cChange("telephone")}
                  />
                </Field>
              </div>

              <Field label="Formation souhaitée" error={b2cErr.formation}>
                <select
                  className={`w-full px-4 py-2.5 bg-black/[0.03] border rounded-lg text-graphite transition-colors ${
                    b2cErr.formation ? "border-error" : "border-black/10 focus:border-primary"
                  } focus:outline-none`}
                  value={b2c.formation}
                  onChange={b2cChange("formation")}
                >
                  <option value="">Sélectionner une formation</option>
                  <option value="ftth">Installation Fibre Optique FTTH</option>
                  <option value="soudure">Soudure et Mesure Fibre</option>
                  <option value="maintenance">Maintenance Réseau Fibre</option>
                  <option value="telecom">Télécoms (bientôt disponible)</option>
                  <option value="solaire">Énergie Solaire (bientôt disponible)</option>
                  <option value="autre">Autre / Je ne sais pas encore</option>
                </select>
              </Field>

              <Field label="Message" required error={b2cErr.message}>
                <textarea
                  className={`w-full px-4 py-2.5 bg-black/[0.03] border rounded-lg text-graphite placeholder-faint transition-colors resize-none ${
                    b2cErr.message ? "border-error" : "border-black/10 focus:border-primary"
                  } focus:outline-none`}
                  placeholder="Décrivez votre projet, vos questions ou vos disponibilités…"
                  value={b2c.message}
                  onChange={b2cChange("message")}
                  rows={4}
                />
              </Field>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-primary text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity mt-6"
              >
                {loading ? "Envoi en cours…" : "Envoyer ma demande"}
              </button>
            </form>
          ) : (
            <form onSubmit={submitB2B} noValidate className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Raison sociale" required error={b2bErr.entreprise}>
                  <input
                    className={`w-full px-4 py-2.5 bg-black/[0.03] border rounded-lg text-graphite placeholder-faint transition-colors ${
                      b2bErr.entreprise ? "border-error" : "border-black/10 focus:border-primary"
                    } focus:outline-none`}
                    type="text"
                    placeholder="Nom de l'entreprise"
                    value={b2b.entreprise}
                    onChange={b2bChange("entreprise")}
                  />
                </Field>
                <Field label="Secteur d'activité" error={b2bErr.secteur}>
                  <input
                    className={`w-full px-4 py-2.5 bg-black/[0.03] border rounded-lg text-graphite placeholder-faint transition-colors ${
                      b2bErr.secteur ? "border-error" : "border-black/10 focus:border-primary"
                    } focus:outline-none`}
                    type="text"
                    placeholder="ex : BTP, Énergie, Télécom…"
                    value={b2b.secteur}
                    onChange={b2bChange("secteur")}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Prénom du contact" required error={b2bErr.prenomContact}>
                  <input
                    className={`w-full px-4 py-2.5 bg-black/[0.03] border rounded-lg text-graphite placeholder-faint transition-colors ${
                      b2bErr.prenomContact ? "border-error" : "border-black/10 focus:border-primary"
                    } focus:outline-none`}
                    type="text"
                    placeholder="Prénom"
                    value={b2b.prenomContact}
                    onChange={b2bChange("prenomContact")}
                  />
                </Field>
                <Field label="Nom du contact" required error={b2bErr.nomContact}>
                  <input
                    className={`w-full px-4 py-2.5 bg-black/[0.03] border rounded-lg text-graphite placeholder-faint transition-colors ${
                      b2bErr.nomContact ? "border-error" : "border-black/10 focus:border-primary"
                    } focus:outline-none`}
                    type="text"
                    placeholder="Nom"
                    value={b2b.nomContact}
                    onChange={b2bChange("nomContact")}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Email professionnel" required error={b2bErr.email}>
                  <input
                    className={`w-full px-4 py-2.5 bg-black/[0.03] border rounded-lg text-graphite placeholder-faint transition-colors ${
                      b2bErr.email ? "border-error" : "border-black/10 focus:border-primary"
                    } focus:outline-none`}
                    type="email"
                    placeholder="contact@entreprise.com"
                    value={b2b.email}
                    onChange={b2bChange("email")}
                  />
                </Field>
                <Field label="Téléphone" required error={b2bErr.telephone}>
                  <input
                    className={`w-full px-4 py-2.5 bg-black/[0.03] border rounded-lg text-graphite placeholder-faint transition-colors ${
                      b2bErr.telephone ? "border-error" : "border-black/10 focus:border-primary"
                    } focus:outline-none`}
                    type="tel"
                    placeholder="+216 XX XXX XXX"
                    value={b2b.telephone}
                    onChange={b2bChange("telephone")}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Personnes à former" error={b2bErr.nbPersonnes}>
                  <select
                    className={`w-full px-4 py-2.5 bg-black/[0.03] border rounded-lg text-graphite transition-colors ${
                      b2bErr.nbPersonnes ? "border-error" : "border-black/10 focus:border-primary"
                    } focus:outline-none`}
                    value={b2b.nbPersonnes}
                    onChange={b2bChange("nbPersonnes")}
                  >
                    <option value="">Sélectionner</option>
                    <option value="1-5">1 – 5 personnes</option>
                    <option value="6-15">6 – 15 personnes</option>
                    <option value="16-30">16 – 30 personnes</option>
                    <option value="30+">Plus de 30 personnes</option>
                  </select>
                </Field>
                <Field label="Domaine de formation" error={b2bErr.domaine}>
                  <select
                    className={`w-full px-4 py-2.5 bg-black/[0.03] border rounded-lg text-graphite transition-colors ${
                      b2bErr.domaine ? "border-error" : "border-black/10 focus:border-primary"
                    } focus:outline-none`}
                    value={b2b.domaine}
                    onChange={b2bChange("domaine")}
                  >
                    <option value="">Sélectionner</option>
                    <option value="fibre">Fibre Optique</option>
                    <option value="telecom">Télécommunications</option>
                    <option value="solaire">Énergie Solaire</option>
                    <option value="multiple">Plusieurs domaines</option>
                  </select>
                </Field>
              </div>

              <Field label="Besoin spécifique" required error={b2bErr.message}>
                <textarea
                  className={`w-full px-4 py-2.5 bg-black/[0.03] border rounded-lg text-graphite placeholder-faint transition-colors resize-none ${
                    b2bErr.message ? "border-error" : "border-black/10 focus:border-primary"
                  } focus:outline-none`}
                  placeholder="Décrivez votre projet de formation, vos objectifs, vos contraintes de calendrier…"
                  value={b2b.message}
                  onChange={b2bChange("message")}
                  rows={4}
                />
              </Field>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-primary text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity mt-6"
              >
                {loading ? "Envoi en cours…" : "Demander un devis"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
