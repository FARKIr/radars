import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://radars-nine.vercel.app"),
  title: {
    default: "Radary - Mapa radarov na Slovensku",
    template: "%s | Radary",
  },
  description:
    "Komplexná mapa radarov a meraní rýchlosti na Slovensku. Plánujte trasu, filtrujte podľa regiónu a typu merania. Aktuálne informácie o radaroch v celej SR.",
  keywords: [
    "radary",
    "radary slovensko",
    "mapa radarov",
    "meranie rýchlosti",
    "doprava",
    "navigácia",
    "semafory",
    "cestná premávka",
    "bezpečnosť",
  ],
  authors: [{ name: "Radary SK", url: "https://radars-nine.vercel.app" }],
  creator: "Radary SK",
  publisher: "Radary SK",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: "https://radars-nine.vercel.app",
    title: "Radary - Mapa radarov na Slovensku",
    description:
      "Komplexná mapa radarov a meraní rýchlosti na Slovensku. Plánujte trasu, filtrujte podľa regiónu a typu merania.",
    siteName: "Radary SK",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Radary - Mapa radarov na Slovensku",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Radary - Mapa radarov na Slovensku",
    description:
      "Komplexná mapa radarov a meraní rýchlosti na Slovensku. Plánujte trasu a filtrujte podľa regiónu.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className="h-full" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={4000}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
