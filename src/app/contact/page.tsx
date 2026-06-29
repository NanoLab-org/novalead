"use client";
import { useEffect, useRef, useState } from "react";

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
    <div className="form-group">
      <label className="form-label">
        {label}{required && <span className="form-required">*</span>}
      </label>
      {children}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}

function SuccessPanel({ onReset }: { onReset: () => void }) {
  return (
    <div className="form-success">
      <div className="form-success-icon">
        <svg width="32" height="32" viewBox="0 0 256 256" fill="currentColor">
          <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
        </svg>
      </div>
      <p className="form-success-title">Demande envoyée !</p>
      <p className="form-success-sub">
        Merci pour votre message. Notre équipe vous contactera dans les 24 heures ouvrées.
      </p>
      <button className="form-success-reset" onClick={onReset} type="button">
        Envoyer une autre demande
      </button>
    </div>
  );
}

export default function ContactPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [tab, setTab] = useState<Tab>("b2c");
  const [b2c, setB2c] = useState<B2CFields>(B2C_INIT);
  const [b2b, setB2b] = useState<B2BFields>(B2B_INIT);
  const [b2cErr, setB2cErr] = useState<Partial<B2CFields>>({});
  const [b2bErr, setB2bErr] = useState<Partial<B2BFields>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 50);
  }, []);

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

  function submitB2C(e: React.FormEvent) {
    e.preventDefault();
    const err = validateB2C(b2c);
    if (Object.keys(err).length) { setB2cErr(err); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 900);
  }

  function submitB2B(e: React.FormEvent) {
    e.preventDefault();
    const err = validateB2B(b2b);
    if (Object.keys(err).length) { setB2bErr(err); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 900);
  }

  function reset() {
    setSubmitted(false);
    if (tab === "b2c") { setB2c(B2C_INIT); setB2cErr({}); }
    else { setB2b(B2B_INIT); setB2bErr({}); }
  }

  return (
    <>
      <header className="page-header" ref={heroRef}>
        <div className="hero-grid">
          <div className="hero-left">
            <p className="header-eyebrow">Nous contacter</p>
            <h1 className="header-title">
              Parlons de<br /><span>votre projet</span>
            </h1>
            <p className="header-sub">
              Particulier ou entreprise — remplissez le formulaire adapté à votre profil et notre équipe vous répond sous 24h.
            </p>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-num">&lt;24h</div>
                <div className="hero-stat-label">Délai de réponse</div>
              </div>
              <div>
                <div className="hero-stat-num">B2C</div>
                <div className="hero-stat-label">Particuliers</div>
              </div>
              <div>
                <div className="hero-stat-num">B2B</div>
                <div className="hero-stat-label">Entreprises</div>
              </div>
            </div>
          </div>
          <div className="hero-right">
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=80&auto=format&fit=crop"
              alt="Équipe NovaLead en réunion"
            />
          </div>
        </div>
      </header>

      <div className="divider" />

      <div className="contact-page-body">
        <div className="contact-page-inner">

          <aside className="contact-info-col">
            <div className="info-card">
              <p className="info-card-label">Adresse</p>
              <p className="info-addr-title">Centre NovaLead</p>
              <p className="info-addr-text">
                Rue Lorem Ipsum, Immeuble Dolor Sit<br />
                1000 Tunis, Tunisie
              </p>
            </div>

            <div className="info-card">
              <p className="info-card-label">Contact direct</p>
              <div className="info-row">
                <span className="info-row-key">Tél</span>
                <span>+216 XX XXX XXX</span>
              </div>
              <div className="info-row">
                <span className="info-row-key">Email</span>
                <span>contact@novalead.tn</span>
              </div>
              <div className="info-row">
                <span className="info-row-key">WhatsApp</span>
                <span>+216 XX XXX XXX</span>
              </div>
            </div>

            <div className="info-card">
              <p className="info-card-label">Horaires</p>
              <div className="info-row-between">
                <span>Lundi – Vendredi</span>
                <span className="info-row-val">08h00 – 18h00</span>
              </div>
              <div className="info-row-between">
                <span>Samedi</span>
                <span className="info-row-val">09h00 – 13h00</span>
              </div>
              <div className="info-row-between">
                <span>Dimanche</span>
                <span className="info-row-val closed">Fermé</span>
              </div>
            </div>

            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102115.39799550319!2d10.074691!3d36.806389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd337f5e7ef543%3A0xd671924e714a0275!2sTunis!5e0!3m2!1sfr!2stn!4v1234567890"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation NovaLead"
              />
            </div>
          </aside>

          <section className="contact-form-col">
            <div className="tab-switcher">
              <button
                className={`tab-btn${tab === "b2c" ? " active" : ""}`}
                onClick={() => switchTab("b2c")}
                type="button"
              >
                Particulier (B2C)
              </button>
              <button
                className={`tab-btn${tab === "b2b" ? " active tab-b2b-active" : ""}`}
                onClick={() => switchTab("b2b")}
                type="button"
              >
                Entreprise (B2B)
              </button>
            </div>

            {submitted ? (
              <SuccessPanel onReset={reset} />
            ) : tab === "b2c" ? (
              <form onSubmit={submitB2C} noValidate>
                <div className="form-row">
                  <Field label="Prénom" required error={b2cErr.prenom}>
                    <input
                      className={`form-input${b2cErr.prenom ? " has-error" : ""}`}
                      type="text"
                      placeholder="Votre prénom"
                      value={b2c.prenom}
                      onChange={b2cChange("prenom")}
                    />
                  </Field>
                  <Field label="Nom" required error={b2cErr.nom}>
                    <input
                      className={`form-input${b2cErr.nom ? " has-error" : ""}`}
                      type="text"
                      placeholder="Votre nom"
                      value={b2c.nom}
                      onChange={b2cChange("nom")}
                    />
                  </Field>
                </div>
                <div className="form-row">
                  <Field label="Email" required error={b2cErr.email}>
                    <input
                      className={`form-input${b2cErr.email ? " has-error" : ""}`}
                      type="email"
                      placeholder="votre@email.com"
                      value={b2c.email}
                      onChange={b2cChange("email")}
                    />
                  </Field>
                  <Field label="Téléphone" error={b2cErr.telephone}>
                    <input
                      className="form-input"
                      type="tel"
                      placeholder="+216 XX XXX XXX"
                      value={b2c.telephone}
                      onChange={b2cChange("telephone")}
                    />
                  </Field>
                </div>
                <Field label="Formation souhaitée" error={b2cErr.formation}>
                  <select
                    className="form-select"
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
                    className={`form-textarea${b2cErr.message ? " has-error" : ""}`}
                    placeholder="Décrivez votre projet, vos questions ou vos disponibilités…"
                    value={b2c.message}
                    onChange={b2cChange("message")}
                    rows={4}
                  />
                </Field>
                <div className="form-actions">
                  <button type="submit" className="form-submit" disabled={loading}>
                    {loading ? "Envoi en cours…" : "Envoyer ma demande"}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={submitB2B} noValidate>
                <div className="form-row">
                  <Field label="Raison sociale" required error={b2bErr.entreprise}>
                    <input
                      className={`form-input${b2bErr.entreprise ? " has-error" : ""}`}
                      type="text"
                      placeholder="Nom de l'entreprise"
                      value={b2b.entreprise}
                      onChange={b2bChange("entreprise")}
                    />
                  </Field>
                  <Field label="Secteur d'activité" error={b2bErr.secteur}>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="ex : BTP, Énergie, Télécom…"
                      value={b2b.secteur}
                      onChange={b2bChange("secteur")}
                    />
                  </Field>
                </div>
                <div className="form-row">
                  <Field label="Prénom du contact" required error={b2bErr.prenomContact}>
                    <input
                      className={`form-input${b2bErr.prenomContact ? " has-error" : ""}`}
                      type="text"
                      placeholder="Prénom"
                      value={b2b.prenomContact}
                      onChange={b2bChange("prenomContact")}
                    />
                  </Field>
                  <Field label="Nom du contact" required error={b2bErr.nomContact}>
                    <input
                      className={`form-input${b2bErr.nomContact ? " has-error" : ""}`}
                      type="text"
                      placeholder="Nom"
                      value={b2b.nomContact}
                      onChange={b2bChange("nomContact")}
                    />
                  </Field>
                </div>
                <div className="form-row">
                  <Field label="Email professionnel" required error={b2bErr.email}>
                    <input
                      className={`form-input${b2bErr.email ? " has-error" : ""}`}
                      type="email"
                      placeholder="contact@entreprise.com"
                      value={b2b.email}
                      onChange={b2bChange("email")}
                    />
                  </Field>
                  <Field label="Téléphone" required error={b2bErr.telephone}>
                    <input
                      className={`form-input${b2bErr.telephone ? " has-error" : ""}`}
                      type="tel"
                      placeholder="+216 XX XXX XXX"
                      value={b2b.telephone}
                      onChange={b2bChange("telephone")}
                    />
                  </Field>
                </div>
                <div className="form-row">
                  <Field label="Personnes à former" error={b2bErr.nbPersonnes}>
                    <select
                      className="form-select"
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
                      className="form-select"
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
                    className={`form-textarea${b2bErr.message ? " has-error" : ""}`}
                    placeholder="Décrivez votre projet de formation, vos objectifs, vos contraintes de calendrier…"
                    value={b2b.message}
                    onChange={b2bChange("message")}
                    rows={4}
                  />
                </Field>
                <div className="form-actions">
                  <button type="submit" className="form-submit" disabled={loading}>
                    {loading ? "Envoi en cours…" : "Demander un devis"}
                  </button>
                </div>
              </form>
            )}
          </section>

        </div>
      </div>
    </>
  );
}
