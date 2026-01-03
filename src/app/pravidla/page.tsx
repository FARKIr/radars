import { Metadata } from "next";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Pravidlá používania",
  description: "Podmienky používania aplikácie Radary.SK.",
};

export default function PravidlaPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <FileText className="h-16 w-16 text-primary mx-auto" />
            <h1 className="text-4xl font-bold tracking-tight">
              Pravidlá používania
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Podmienky používania aplikácie Radary.SK
            </p>
          </div>

          <div className="bg-card rounded-lg p-8 shadow-card space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Účel aplikácie</h2>
              <p className="text-muted-foreground leading-relaxed">
                Aplikácia Radary.SK slúži výhradne na informačné účely a jej
                cieľom je zvýšiť povedomie o dodržiavaní dopravných predpisov a
                bezpečnosti na cestách.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Zodpovednosť</h2>
              <p className="text-muted-foreground leading-relaxed">
                Informácie poskytované v aplikácii sú orientačné. Nie sme
                zodpovední za presnosť, aktuálnosť alebo úplnosť zobrazených
                údajov. Používatelia sú povinní dodržiavať dopravné predpisy bez
                ohľadu na informácie poskytnuté aplikáciou.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Zákaz zneužitia</h2>
              <p className="text-muted-foreground leading-relaxed">
                Aplikáciu je zakázané používať na účely, ktoré sú v rozpore so
                zákonmi Slovenskej republiky. Aplikácia nie je určená na
                porušovanie dopravných predpisov.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Aktualizácie údajov</h2>
              <p className="text-muted-foreground leading-relaxed">
                Snažíme sa udržiavať údaje aktuálne, avšak nemôžeme garantovať,
                že všetky informácie sú vždy presné a kompletné. Umiestnenie
                radarov sa môže meniť.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Zmeny podmienok</h2>
              <p className="text-muted-foreground leading-relaxed">
                Vyhradzujeme si právo kedykoľvek zmeniť tieto pravidlá
                používania. Zmeny nadobúdajú účinnosť okamžite po ich zverejnení
                na tejto stránke.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Kontakt</h2>
              <p className="text-muted-foreground leading-relaxed">
                Pri otázkach týkajúcich sa podmienok používania nás kontaktujte
                na{" "}
                <a
                  href="mailto:legal@radary.sk"
                  className="text-primary hover:underline"
                >
                  legal@radary.sk
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
