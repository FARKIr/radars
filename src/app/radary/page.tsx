"use client";

import { useState, useMemo } from "react";
import { RADARY_DATA, getUnikatneTriedyCiest } from "@/data/radary";
import {
  INIT_FILTRE,
  aplikovatFiltreATriedenie,
  FiltreStav,
} from "@/lib/filtre";
import { FilterSidebar } from "@/components/radary/FilterSidebar";
import { ZoznamKariet } from "@/components/radary/ZoznamKariet";
import { DetailRadaru } from "@/components/radary/DetailRadaru";
import { RadarZaznam } from "@/data/radary";
import { MapPin, Search, Radio } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Metadata } from "next";

export default function RadaryPage() {
  const [filtre, setFiltre] = useState<FiltreStav>(INIT_FILTRE);
  const [detailRadar, setDetailRadar] = useState<RadarZaznam | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const triedyCiest = useMemo(() => getUnikatneTriedyCiest(), []);

  const filtrovaneData = useMemo(() => {
    const filtered = aplikovatFiltreATriedenie(RADARY_DATA, filtre);
    if (!searchQuery.trim()) return filtered;

    const query = searchQuery.toLowerCase();
    return filtered.filter(
      (radar) =>
        radar.mesto.toLowerCase().includes(query) ||
        radar.lokalita.toLowerCase().includes(query) ||
        radar.cesta.toLowerCase().includes(query)
    );
  }, [filtre, searchQuery]);

  const handleFiltreChange = (noveFiltreValue: Partial<FiltreStav>) => {
    setFiltre((prev) => ({ ...prev, ...noveFiltreValue }));
  };

  const handleRadarClick = (radar: RadarZaznam) => {
    setDetailRadar(radar);
    setDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-destructive/10 to-primary/10 rounded-2xl mb-4">
            <Radio className="h-12 w-12 text-destructive" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Všetky radary
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Komplexný prehľad všetkých radarov a meraní rýchlosti na Slovensku
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-semibold">{RADARY_DATA.length}</span>
              <span className="text-muted-foreground">lokalít</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border">
              <Search className="h-4 w-4 text-primary" />
              <span className="font-semibold">{filtrovaneData.length}</span>
              <span className="text-muted-foreground">zobrazených</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[320px,1fr] gap-6 lg:gap-8">
          <aside className="space-y-6">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl border shadow-lg p-6 sticky top-24">
              <FilterSidebar
                filtre={filtre}
                onFiltreChange={handleFiltreChange}
                triedyCiest={triedyCiest}
              />
            </div>
          </aside>

          <main className="space-y-6">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl border shadow-lg p-6">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Hľadať podľa mesta, lokality alebo cesty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-base bg-background"
                  />
                </div>

                <ZoznamKariet
                  data={filtrovaneData}
                  onKartaClick={handleRadarClick}
                />
              </div>
            </div>
          </main>
        </div>
      </div>

      <DetailRadaru
        radar={detailRadar}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </div>
  );
}
