import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Space_Grotesk, Manrope } from "next/font/google";
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
  return { title: t("title"), description: t("description") };
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

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <TransitionProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppWidget />
            <ScrollNavigator />
          </TransitionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
