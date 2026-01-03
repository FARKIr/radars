import { Metadata } from "next";
import { Calendar, Radio, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Novinky",
  description:
    "Najnovšie aktualizácie, vylepšenia a novinky z aplikácie Radary.SK.",
};

const novinky = [
  {
    date: "2026-01-03",
    title: "Spustenie aplikácie Radary.SK",
    category: "Nová funkcia",
    description:
      "Oficiálne spustenie aplikácie Radary.SK s kompletnou mapou radarov na Slovensku. Aplikácia obsahuje interaktívnu mapu, plánovanie trás a pokročilé filtrovanie.",
    icon: Radio,
    color: "bg-destructive",
  },
  {
    date: "2026-01-03",
    title: "Plánovanie trasy",
    category: "Funkcia",
    description:
      "Nová funkcia plánovania trasy vám umožňuje zadať začiatočný a cieľový bod a zobraziť všetky radary na vašej ceste.",
    icon: TrendingUp,
    color: "bg-primary",
  },
  {
    date: "2026-01-03",
    title: "Pokročilé filtrovanie",
    category: "Funkcia",
    description:
      "Filtrujte radary podľa regiónu (Západ, Stred, Východ), typu merania (rýchlosť, semafor) a triedy cesty.",
    icon: TrendingUp,
    color: "bg-primary",
  },
];

export default function NovinkyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Novinky a aktualizácie
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sledujte najnovšie vylepšenia a funkcie aplikácie Radary.SK
            </p>
          </div>

          <div className="space-y-6">
            {novinky.map((novinka, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`${novinka.color} text-white p-3 rounded-lg`}
                      >
                        <novinka.icon className="h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                        <CardTitle className="text-xl">
                          {novinka.title}
                        </CardTitle>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(novinka.date).toLocaleDateString(
                              "sk-SK",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">{novinka.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {novinka.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-muted/50 rounded-lg p-6 text-center">
            <h3 className="font-semibold mb-2">Chcete byť informovaní?</h3>
            <p className="text-sm text-muted-foreground">
              Pravidelne pridávame nové funkcie a vylepšenia. Sledujte túto
              stránku pre najnovšie novinky.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
