import { Metadata } from "next";
import { MapPin, Radio, Filter, Navigation, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "O aplikácii",
  description:
    "Radars-nine.vercel.app - Komplexná aplikácia pre sledovanie radarov a meraní rýchlosti na Slovensku. Plánujte bezpečné cesty.",
};

export default function OAplikaciiPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              O aplikácii Radars-nine.vercel.app
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Komplexná mapa radarov a meraní rýchlosti na Slovensku
            </p>
          </div>

          <div className="bg-card rounded-lg p-8 shadow-card space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Radio className="h-6 w-6 text-destructive" />
                Čo je Radars-nine.vercel.app?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Radars-nine.vercel.app je moderná webová aplikácia určená pre
                vodičov na Slovensku, ktorá poskytuje aktuálne informácie o
                umiestnení radarov a meraní rýchlosti. Naším cieľom je pomôcť
                vodičom plánovať bezpečné cesty a zvýšiť povedomie o dopravnej
                bezpečnosti.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Interaktívna mapa</h3>
                    <p className="text-sm text-muted-foreground">
                      Prehľadná mapa s označením všetkých radarov na území
                      Slovenska
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Navigation className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Plánovanie trasy</h3>
                    <p className="text-sm text-muted-foreground">
                      Naplánujte si trasu a zistite, koľko radarov sa nachádza
                      na vašej ceste
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Filter className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">
                      Pokročilé filtrovanie
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Filtrujte radary podľa regiónu, typu merania a triedy
                      cesty
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Bezpečnosť</h3>
                    <p className="text-sm text-muted-foreground">
                      Zvýšte bezpečnosť na cestách a dodržiavajte rýchlostné
                      limity
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-8 shadow-card space-y-4">
            <h2 className="text-2xl font-semibold">Ako to funguje?</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    Vyberte región alebo mesto
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Použite filtre na zobrazenie radarov v požadovanej oblasti
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Naplánujte trasu</h3>
                  <p className="text-sm text-muted-foreground">
                    Zadajte začiatočný a cieľový bod pre zobrazenie trasy a
                    radarov na nej
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Precestujte bezpečne</h3>
                  <p className="text-sm text-muted-foreground">
                    Buďte informovaní a dodržiavajte pravidlá cestnej premávky
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
