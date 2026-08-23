"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { CATEGORIES } from "@/constants";
import Reveal from "@/components/ui/Reveal";

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
  const t = useTranslations("Contact");
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
        <svg width="32" height="32" viewBox="0 0 256 256" fill="currentColor" className="text-primary">
          <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-graphite mb-2">{t("success.title")}</h3>
      <p className="text-faded text-sm mb-6 max-w-sm">{t("success.text")}</p>
      <button onClick={onReset} type="button" className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity">
        {t("success.again")}
      </button>
    </div>
  );
}

export default function ContactPage() {
  const t = useTranslations("Contact");
  const tf = useTranslations("Formations");
  const [tab, setTab] = useState<Tab>("b2c");
  const [b2c, setB2c] = useState<B2CFields>(B2C_INIT);
  const [b2b, setB2b] = useState<B2BFields>(B2B_INIT);
  const [b2cErr, setB2cErr] = useState<Partial<B2CFields>>({});
  const [b2bErr, setB2bErr] = useState<Partial<B2BFields>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function validateB2C(f: B2CFields): Partial<B2CFields> {
    const e: Partial<B2CFields> = {};
    if (!f.prenom.trim()) e.prenom = t("errors.required");
    if (!f.nom.trim()) e.nom = t("errors.required");
    if (!f.email.trim()) e.email = t("errors.required");
    else if (!isValidEmail(f.email)) e.email = t("errors.invalidEmail");
    if (!f.message.trim()) e.message = t("errors.describeRequest");
    return e;
  }

  function validateB2B(f: B2BFields): Partial<B2BFields> {
    const e: Partial<B2BFields> = {};
    if (!f.entreprise.trim()) e.entreprise = t("errors.required");
    if (!f.prenomContact.trim()) e.prenomContact = t("errors.required");
    if (!f.nomContact.trim()) e.nomContact = t("errors.required");
    if (!f.email.trim()) e.email = t("errors.required");
    else if (!isValidEmail(f.email)) e.email = t("errors.invalidEmail");
    if (!f.telephone.trim()) e.telephone = t("errors.required");
    if (!f.message.trim()) e.message = t("errors.describeNeed");
    return e;
  }

  function switchTab(next: Tab) {
    setTab(next);
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
      else alert(t("alertSend"));
    } catch {
      alert(t("alertNetwork"));
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
      else alert(t("alertSend"));
    } catch {
      alert(t("alertNetwork"));
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setSubmitted(false);
    if (tab === "b2c") { setB2c(B2C_INIT); setB2cErr({}); }
    else { setB2b(B2B_INIT); setB2bErr({}); }
  }

  const inputCls = (err?: string) =>
    `w-full px-4 py-2.5 bg-black/[0.03] border rounded-lg text-graphite placeholder-faint transition-colors ${
      err ? "border-error" : "border-black/10 focus:border-primary"
    } focus:outline-none`;

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <div data-dark-hero className="bg-gradient-to-br from-hero-from to-hero-to px-5 sm:px-10 lg:px-16 pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-20 text-center">
        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
          <span className="w-5 h-[2px] bg-primary" />
          {t("heroEyebrow")}
          <span className="w-5 h-[2px] bg-primary" />
        </p>
        <h1 className="text-[clamp(34px,4vw,54px)] font-extrabold text-white leading-[1.08] mb-5">
          {t.rich("heroTitle", {
            hl: (chunks) => <span className="text-primary">{chunks}</span>,
          })}
        </h1>
        <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          {t("heroSubtitle")}
        </p>
      </div>

      {/* Contact Form Section */}
      <section className="px-5 sm:px-10 lg:px-16 py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-deep to-base">
        <Reveal className="max-w-2xl mx-auto">
          <div className="bg-surface shadow-card rounded-2xl p-6 md:p-10">
            {/* Tab Switcher */}
            <div className="flex gap-2 sm:gap-4 mb-8 border-b border-black/10 overflow-x-auto">
              <button
                onClick={() => switchTab("b2c")}
                type="button"
                className={`shrink-0 px-3 sm:px-4 py-3 font-semibold text-sm transition-all border-b-2 ${
                  tab === "b2c" ? "border-primary text-primary" : "border-transparent text-faded hover:text-strong"
                }`}
              >
                {t("tabB2C")}
              </button>
              <button
                onClick={() => switchTab("b2b")}
                type="button"
                className={`shrink-0 px-3 sm:px-4 py-3 font-semibold text-sm transition-all border-b-2 ${
                  tab === "b2b" ? "border-primary text-primary" : "border-transparent text-faded hover:text-strong"
                }`}
              >
                {t("tabB2B")}
              </button>
            </div>

            {/* Form or Success */}
            {submitted ? (
              <SuccessPanel onReset={reset} />
            ) : tab === "b2c" ? (
              <form onSubmit={submitB2C} noValidate className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label={t("b2c.firstName")} required error={b2cErr.prenom}>
                    <input className={inputCls(b2cErr.prenom)} type="text" placeholder={t("b2c.firstNamePlaceholder")} value={b2c.prenom} onChange={b2cChange("prenom")} />
                  </Field>
                  <Field label={t("b2c.lastName")} required error={b2cErr.nom}>
                    <input className={inputCls(b2cErr.nom)} type="text" placeholder={t("b2c.lastNamePlaceholder")} value={b2c.nom} onChange={b2cChange("nom")} />
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label={t("b2c.email")} required error={b2cErr.email}>
                    <input className={inputCls(b2cErr.email)} type="email" placeholder={t("b2c.emailPlaceholder")} value={b2c.email} onChange={b2cChange("email")} />
                  </Field>
                  <Field label={t("b2c.phone")} error={b2cErr.telephone}>
                    <input className={inputCls(b2cErr.telephone)} type="tel" placeholder={t("b2c.phonePlaceholder")} value={b2c.telephone} onChange={b2cChange("telephone")} />
                  </Field>
                </div>

                <Field label={t("b2c.formation")} error={b2cErr.formation}>
                  <select className={inputCls(b2cErr.formation)} value={b2c.formation} onChange={b2cChange("formation")}>
                    <option value="">{t("selectFormation")}</option>
                    {CATEGORIES.flatMap((c) => c.formations).map((f) => (
                      <option key={f.id} value={f.id}>{tf(`items.${f.id}.titre`)}</option>
                    ))}
                    <option value="autre">{t("formationOptions.autre")}</option>
                  </select>
                </Field>

                <Field label={t("b2c.message")} required error={b2cErr.message}>
                  <textarea className={`${inputCls(b2cErr.message)} resize-none`} placeholder={t("b2c.messagePlaceholder")} value={b2c.message} onChange={b2cChange("message")} rows={4} />
                </Field>

                <button type="submit" disabled={loading} className="w-full py-2.5 px-4 bg-primary text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity mt-6">
                  {loading ? t("sending") : t("b2c.submit")}
                </button>
              </form>
            ) : (
              <form onSubmit={submitB2B} noValidate className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label={t("b2b.company")} required error={b2bErr.entreprise}>
                    <input className={inputCls(b2bErr.entreprise)} type="text" placeholder={t("b2b.companyPlaceholder")} value={b2b.entreprise} onChange={b2bChange("entreprise")} />
                  </Field>
                  <Field label={t("b2b.sector")} error={b2bErr.secteur}>
                    <input className={inputCls(b2bErr.secteur)} type="text" placeholder={t("b2b.sectorPlaceholder")} value={b2b.secteur} onChange={b2bChange("secteur")} />
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label={t("b2b.contactFirstName")} required error={b2bErr.prenomContact}>
                    <input className={inputCls(b2bErr.prenomContact)} type="text" placeholder={t("b2b.firstNamePlaceholder")} value={b2b.prenomContact} onChange={b2bChange("prenomContact")} />
                  </Field>
                  <Field label={t("b2b.contactLastName")} required error={b2bErr.nomContact}>
                    <input className={inputCls(b2bErr.nomContact)} type="text" placeholder={t("b2b.lastNamePlaceholder")} value={b2b.nomContact} onChange={b2bChange("nomContact")} />
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label={t("b2b.email")} required error={b2bErr.email}>
                    <input className={inputCls(b2bErr.email)} type="email" placeholder={t("b2b.emailPlaceholder")} value={b2b.email} onChange={b2bChange("email")} />
                  </Field>
                  <Field label={t("b2b.phone")} required error={b2bErr.telephone}>
                    <input className={inputCls(b2bErr.telephone)} type="tel" placeholder={t("b2c.phonePlaceholder")} value={b2b.telephone} onChange={b2bChange("telephone")} />
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label={t("b2b.peopleToTrain")} error={b2bErr.nbPersonnes}>
                    <select className={inputCls(b2bErr.nbPersonnes)} value={b2b.nbPersonnes} onChange={b2bChange("nbPersonnes")}>
                      <option value="">{t("select")}</option>
                      <option value="1-5">{t("peopleOptions.1-5")}</option>
                      <option value="6-15">{t("peopleOptions.6-15")}</option>
                      <option value="16-30">{t("peopleOptions.16-30")}</option>
                      <option value="30+">{t("peopleOptions.30+")}</option>
                    </select>
                  </Field>
                  <Field label={t("b2b.domain")} error={b2bErr.domaine}>
                    <select className={inputCls(b2bErr.domaine)} value={b2b.domaine} onChange={b2bChange("domaine")}>
                      <option value="">{t("select")}</option>
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>{tf(`categories.${c.id}.label`)}</option>
                      ))}
                      <option value="multiple">{t("domainOptions.multiple")}</option>
                    </select>
                  </Field>
                </div>

                <Field label={t("b2b.specificNeed")} required error={b2bErr.message}>
                  <textarea className={`${inputCls(b2bErr.message)} resize-none`} placeholder={t("b2b.messagePlaceholder")} value={b2b.message} onChange={b2bChange("message")} rows={4} />
                </Field>

                <button type="submit" disabled={loading} className="w-full py-2.5 px-4 bg-primary text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity mt-6">
                  {loading ? t("sending") : t("b2b.submit")}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
