"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { Github, Mail, MapPin } from "lucide-react";

const footerLinks = {
  navigacia: [
    { name: "Domov", href: "/" },
    { name: "O aplikácii", href: "/o-aplikacii" },
    { name: "Novinky", href: "/novinky" },
    { name: "Kontakt", href: "/kontakt" },
  ],
  informacie: [
    { name: "Ochrana údajov", href: "/ochrana-udajov" },
    { name: "Pravidlá používania", href: "/pravidla" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Logo size="md" showText={true} />
            <p className="text-sm text-muted-foreground max-w-xs">
              Komplexná mapa radarov a meraní rýchlosti na Slovensku. Plánujte
              trasu bezpečne a efektívne.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Slovensko</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Navigácia</h3>
            <ul className="space-y-3">
              {footerLinks.navigacia.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Informácie</h3>
            <ul className="space-y-3">
              {footerLinks.informacie.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-4">
              <a
                href="mailto:info@radary.sk"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Radary.SK. Všetky práva vyhradené.
          </p>
        </div>
      </div>
    </footer>
  );
}
