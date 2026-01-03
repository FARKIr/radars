import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Radary - Zoznam miest a lokácií",
  description: "Evidencia a vyhľadávanie miest s radarmi",
  keywords: ["radary", "doprava", "slovensko", "mapa", "navigácia"],
  authors: [{ name: "Radary App" }],
  openGraph: {
    title: "Radary - Zoznam miest a lokácií",
    description: "Evidencia a vyhľadávanie miest s radarmi",
    type: "website",
    locale: "sk_SK",
  },
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
        <div className="relative flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
        </div>
        <Toaster position="top-right" richColors closeButton duration={4000} />
      </body>
    </html>
  );
}
