import type { Metadata } from "next";
import { Hanken_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/whattswidget";
import TransitionProvider from "@/components/transitions/TransitionProvider";
import ScrollNavigator from "@/components/transitions/ScrollNavigator";

const display = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "NovaLead",
  description: "Centre de formation spécialisé en fibre optique, photovoltaïque et télécommunications.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable}`}
    >
      <body>
        <TransitionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppWidget />
          <ScrollNavigator />
        </TransitionProvider>
      </body>
    </html>
  );
}
