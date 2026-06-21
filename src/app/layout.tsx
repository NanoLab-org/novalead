import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NovaLead — Centre de Formation Fibre Optique & Photovoltaïque",
  description:
    "NovaLead forme les techniciens et entreprises aux métiers de la fibre optique, du photovoltaïque et des télécommunications en Tunisie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
              <Navbar />
        
        {children}</body>
    </html>
  );
}