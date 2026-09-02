import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name} — Clear Ice de Autor`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — Clear Ice de Autor`,
    description: site.description,
    url: `https://${site.domain}`,
    siteName: site.name,
    images: ["/brand/wordmark.png"],
    locale: "es_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Clear Ice de Autor`,
    description: site.description,
    images: ["/brand/wordmark.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink-deep text-ice">{children}</body>
    </html>
  );
}
