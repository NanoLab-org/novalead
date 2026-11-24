import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Space_Grotesk, Manrope, Cairo } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getTranslations, getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/whattswidget";
import TransitionProvider from "@/components/transitions/TransitionProvider";
import ScrollNavigator from "@/components/transitions/ScrollNavigator";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});
const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});
// Arabic-capable face; sits in the font stacks so Arabic glyphs render nicely
// while Latin text keeps Space Grotesk / Manrope.
const arabic = Cairo({
  subsets: ["arabic"],
  variable: "--font-arabic",
});

/**
 * Absolute origin for og:image / twitter:image — social crawlers reject
 * relative URLs, so Next needs a metadataBase to resolve them against.
 *
 * Netlify injects these at build time; no .env file is required:
 *   CONTEXT          "production" | "deploy-preview" | "branch-deploy"
 *   URL              the site's primary URL (custom domain once attached)
 *   DEPLOY_PRIME_URL this particular deploy's URL (previews/branch deploys)
 *
 * Production deploys share cards from the real domain; previews point at
 * themselves so a preview's card isn't attributed to production. Set
 * NEXT_PUBLIC_SITE_URL to override either (e.g. a domain fronted by a CDN).
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.CONTEXT === "production"
    ? process.env.URL
    : process.env.DEPLOY_PRIME_URL ?? process.env.URL) ??
  "http://localhost:3000";

// Pre-render every locale at build time.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const title = t("title");
  const description = t("description");
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    // icon.svg and apple-icon.png are picked up from src/app by convention.
    // The OG image must be listed explicitly: declaring `openGraph` in this
    // nested layout REPLACES the root segment's object rather than merging
    // into it, so the opengraph-image.png file convention gets dropped and
    // no og:image is emitted at all.
    openGraph: {
      title,
      description,
      siteName: "NovaLead",
      locale,
      type: "website",
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: "NovaLead — Centre de formation fibre optique",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enables static rendering for this locale.
  setRequestLocale(locale);

  // Pass locale explicitly (reliable at prerender) — see src/i18n/request.ts.
  const messages = await getMessages({ locale });
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} ${arabic.variable}`}
    >
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <TransitionProvider>
            <Navbar />
            <main>{children}</main>
            <Footer locale={locale} />
            <WhatsAppWidget />
            <ScrollNavigator />
          </TransitionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
