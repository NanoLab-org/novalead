import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/whattswidget";
import PageScrollNavigation from "@/components/PageScrollNavigation";

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
    <html lang="fr">
      <body>
        <PageScrollNavigation />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}