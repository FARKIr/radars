"use client";

import { useState, useMemo } from "react";
import {
  RADARY_DATA,
  CELKOVY_POCET_MIEST,
  getUnikatneTriedyCiest,
} from "@/data/radary";
import {
  INIT_FILTRE,
  aplikovatFiltreATriedenie,
  FiltreStav,
} from "@/lib/filtre";
import { InteraktivnaHlavaX6 } from "@/components/radary/InteraktivnaHlavaX6";
import { PanelFiltrov } from "@/components/radary/PanelFiltrov";
import { ZoznamKariet } from "@/components/radary/ZoznamKariet";
import { TabulkaRadary } from "@/components/radary/TabulkaRadary";
import { DetailRadaru } from "@/components/radary/DetailRadaru";
import { SummaryStatistiky } from "@/components/radary/SummaryStatistiky";
import { ExportTlacidla } from "@/components/radary/ExportTlacidla";
import { RadarZaznam } from "@/data/radary";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Bell, BellOff } from "lucide-react";

export default function Home() {
  const [filtre, setFiltre] = useState<FiltreStav>(INIT_FILTRE);
  const [zobrazenie, setZobrazenie] = useState<"karty" | "tabulka">("karty");
  const [detailRadar, setDetailRadar] = useState<RadarZaznam | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [sledovanie, setSledovanie] = useState(false);

  const triedyCiest = useMemo(() => getUnikatneTriedyCiest(), []);

  const filtrovaneData = useMemo(() => {
    return aplikovatFiltreATriedenie(RADARY_DATA, filtre);
  }, [filtre]);

  const handleFiltreChange = (noveFiltreValue: Partial<FiltreStav>) => {
    setFiltre((prev) => ({ ...prev, ...noveFiltreValue }));
  };

  const handleMestoClick = (mesto: string) => {
    setFiltre((prev) => ({ ...prev, vyhladavanie: mesto }));
  };

  const handleRadarClick = (radar: RadarZaznam) => {
    setDetailRadar(radar);
    setDetailOpen(true);
  };

  const dataPreGraf = useMemo(() => {
    return RADARY_DATA.map((r) => ({ mesto: r.mesto, region: r.region }));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <header className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">
                Radary – Zoznam miest a lokácií
              </h1>
              <p className="text-slate-600 mt-2">
                Celkovo: {CELKOVY_POCET_MIEST} miest (zatiaľ zadané:{" "}
                {RADARY_DATA.length})
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant={sledovanie ? "default" : "outline"}
                onClick={() => setSledovanie(!sledovanie)}
                className="gap-2"
              >
                {sledovanie ? (
                  <>
                    <Bell className="h-4 w-4" />
                    Sledované
                  </>
                ) : (
                  <>
                    <BellOff className="h-4 w-4" />
                    Sledovať zoznam
                  </>
                )}
              </Button>
              {sledovanie && (
                <Badge className="bg-green-500 text-white">Aktívne</Badge>
              )}
            </div>
          </div>
        </header>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">
            Interaktívna mapa
          </h2>
          <InteraktivnaHlavaX6
            data={dataPreGraf}
            onMestoClick={handleMestoClick}
          />
        </section>

        <Separator className="my-8" />

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">
            Filtrovanie a vyhľadávanie
          </h2>
          <PanelFiltrov
            filtre={filtre}
            onFiltreChange={handleFiltreChange}
            triedyCiest={triedyCiest}
            zobrazenie={zobrazenie}
            onZobrazenieChange={setZobrazenie}
          />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-900">
                Výsledky ({filtrovaneData.length})
              </h2>
              <ExportTlacidla data={filtrovaneData} />
            </div>

            {zobrazenie === "karty" ? (
              <ZoznamKariet
                data={filtrovaneData}
                onKartaClick={handleRadarClick}
              />
            ) : (
              <TabulkaRadary
                data={filtrovaneData}
                onRiadokClick={handleRadarClick}
              />
            )}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              Štatistiky
            </h2>
            <SummaryStatistiky
              data={RADARY_DATA}
              filtrovaneData={filtrovaneData}
            />
          </div>
        </div>

        <DetailRadaru
          radar={detailRadar}
          open={detailOpen}
          onOpenChange={setDetailOpen}
        />
      </div>
    </div>
  );
}
