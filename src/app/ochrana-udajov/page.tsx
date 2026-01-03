import { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Ochrana údajov",
  description:
    "Zásady ochrany osobných údajov aplikácie Radars-nine.vercel.app.",
};

export default function OchranaUdajovPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <Shield className="h-16 w-16 text-primary mx-auto" />
            <h1 className="text-4xl font-bold tracking-tight">
              Ochrana osobných údajov
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Vaše súkromie je pre nás dôležité
            </p>
          </div>

          <div className="bg-card rounded-lg p-8 shadow-card space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">
                Aké údaje zhromažďujeme
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Aplikácia Radars-nine.vercel.app nezhromažďuje žiadne osobné
                údaje používateľov. Všetky funkcie aplikácie fungujú lokálne vo
                vašom prehliadači bez potreby registrácie alebo prihlásenia.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Používame iba technické cookies potrebné pre základnú
                funkcionalitu aplikácie (napríklad nastavenie témy).
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">
                Zdieľanie údajov s tretími stranami
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Nezdieľame žiadne údaje s tretími stranami. Mapa používa službu
                OpenStreetMap, ktorá má vlastné zásady ochrany súkromia.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Kontakt</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ak máte otázky ohľadom ochrany osobných údajov, kontaktujte nás
                na adrese{" "}
                <a
                  href="mailto:roman.farki@gmail.com"
                  className="text-primary hover:underline"
                >
                  roman.farki@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
