import {
  Barlow_Condensed,
  IBM_Plex_Mono,
  Source_Sans_3,
} from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";

const headingFont = Barlow_Condensed({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Source_Sans_3({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-source-sans-3",
  weight: ["400", "600", "700"],
});

const codeFont = IBM_Plex_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "L4rs0n",
    template: "%s | L4rs0n",
  },
  description:
    "Socle applicatif L4rs0n pour la gestion d'un club sportif amateur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${headingFont.variable} ${bodyFont.variable} ${codeFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
