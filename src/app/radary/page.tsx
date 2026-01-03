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
import { MapPin, Search, Radio, Filter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Metadata } from "next";

export default function RadaryPage() {
  const [filtre, setFiltre] = useState<FiltreStav>(INIT_FILTRE);
  const [detailRadar, setDetailRadar] = useState<RadarZaznam | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const triedyCiest = useMemo(() => getUnikatneTriedyCiest(), []);

  const aktivneFiltre = useMemo(() => {
    let count = 0;
    if (filtre.region !== "all") count++;
    if (filtre.typyMerania.length > 0) count++;
    if (filtre.triedaCesty !== "all") count++;
    if (filtre.vyhladavanie.trim()) count++;
    return count;
  }, [filtre]);

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

  const clearAllFilters = () => {
    setFiltre(INIT_FILTRE);
    setSearchQuery("");
  };

  const handleRadarClick = (radar: RadarZaznam) => {
    setDetailRadar(radar);
    setDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="w-full max-w-[1920px] mx-auto px-4 py-6 sm:px-6 lg:px-8 sm:py-8">
        <div className="mb-6 sm:mb-8 text-center space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Všetky radary
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Komplexný prehľad všetkých radarov a meraní rýchlosti na Slovensku
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm">
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-card rounded-full border shadow-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-semibold">{RADARY_DATA.length}</span>
              <span className="text-muted-foreground hidden sm:inline">
                lokalít
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-card rounded-full border shadow-sm">
              <Search className="h-4 w-4 text-primary" />
              <span className="font-semibold">{filtrovaneData.length}</span>
              <span className="text-muted-foreground hidden sm:inline">
                zobrazených
              </span>
              {aktivneFiltre > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-xs h-5 px-1.5 ml-1 hover:bg-destructive/10 hover:text-destructive"
                >
                  Zrušiť
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between h-auto py-2 sm:py-3 px-3 sm:px-4 bg-card/80 backdrop-blur-sm hover:bg-card border-2 hover:border-primary/50 transition-all shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <span className="font-semibold text-sm sm:text-base">
                    Filtrovanie
                  </span>
                  {aktivneFiltre > 0 && (
                    <Badge
                      variant="secondary"
                      className="text-xs px-1.5 py-0.5 h-auto"
                    >
                      {aktivneFiltre}
                    </Badge>
                  )}
                </div>
                <ChevronDown
                  className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform ${
                    isFilterOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="bg-card/80 backdrop-blur-sm border-2 rounded-lg p-2 sm:p-3 shadow-lg">
                <FilterSidebar
                  filtre={filtre}
                  onFiltreChange={handleFiltreChange}
                  triedyCiest={triedyCiest}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="bg-card/80 backdrop-blur-sm rounded-2xl border-2 shadow-lg p-4 sm:p-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Hľadať podľa mesta, lokality alebo cesty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base bg-background"
                />
              </div>

              <ZoznamKariet
                data={filtrovaneData}
                onKartaClick={handleRadarClick}
              />
            </div>
          </div>
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
