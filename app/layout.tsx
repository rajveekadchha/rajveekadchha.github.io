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

const description =
  "Frontend developer building interfaces and overthinking tiny details so you don't have to. Portfolio of Rajvee Kadchha.";

export const metadata: Metadata = {
  metadataBase: new URL("https://rajveekadchha.github.io"),
  title: "Rajvee Kadchha — Frontend Developer",
  description,
  // Home-screen icons, carried over from the old site.
  icons: {
    apple: "/apple-touch-icon.png",
    other: [{ rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }],
  },
  // Link previews (LinkedIn, WhatsApp, X), same as the old site.
  openGraph: {
    type: "website",
    url: "/",
    title: "Rajvee Kadchha — Frontend Developer",
    description,
    images: ["/me.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajvee Kadchha — Frontend Developer",
    description,
    images: ["/me.jpg"],
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
