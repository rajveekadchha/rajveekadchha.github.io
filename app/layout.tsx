import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@fontsource/permanent-marker";
import "@fontsource/rock-salt";
import "@fontsource/homemade-apple";
import "@fontsource/reenie-beanie";
import "@fontsource/gochi-hand";
import "@fontsource/shadows-into-light";
import "./globals.css";
import { THEME_SCRIPT } from "@/components/ThemeToggle";
import { HOME_LEDE } from "./[slug]/ledes";

const description = HOME_LEDE;

// Link-preview card (1200×630), made by scripts/make-og.sh from /og-card.
const ogImage = {
  url: "/og/home.jpg",
  width: 1200,
  height: 630,
  alt: "Rajvee Kadchha, Frontend Developer. A pile of hand-labelled CDs: work, projects, about me, résumé, contact, content creation.",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rajveekadchha.github.io"),
  title: "Rajvee Kadchha — Frontend Developer",
  description,
  // Home-screen icons, carried over from the old site.
  icons: {
    apple: "/apple-touch-icon.png",
    other: [{ rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }],
  },
  // Link previews (WhatsApp, iMessage, Slack, LinkedIn, X). Each disc page
  // overrides these with its own card in app/[slug]/page.tsx.
  openGraph: {
    type: "website",
    siteName: "Rajvee Kadchha",
    locale: "en_IN",
    url: "/",
    title: "Rajvee Kadchha — Frontend Developer",
    description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajvee Kadchha — Frontend Developer",
    description,
    images: [ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-theme is set before paint by THEME_SCRIPT, so React may see a different value.
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
