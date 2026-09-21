import type { Metadata } from "next";
import { Fraunces, Manrope, Mrs_Saint_Delafield } from "next/font/google";
import { site } from "@/content/copy";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Reemplaza signature.png (la frase de marca tenía un script a mano
// horneado en la imagen original) — una cursiva real, no una versión
// itálica de la serif de marca, para conservar el mismo estilo de
// "firma" que tenía la versión en español.
const signature = Mrs_Saint_Delafield({
  variable: "--font-signature",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name} — Artisan Clear Ice`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — Artisan Clear Ice`,
    description: site.description,
    url: `https://${site.domain}`,
    siteName: site.name,
    images: ["/brand/n-mark.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Artisan Clear Ice`,
    description: site.description,
    images: ["/brand/n-mark.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} ${signature.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink-deep text-ice">{children}</body>
    </html>
  );
}
