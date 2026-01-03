"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { RADARY_DATA, getUnikatneTriedyCiest } from "@/data/radary";
import {
  INIT_FILTRE,
  aplikovatFiltreATriedenie,
  FiltreStav,
} from "@/lib/filtre";
import { RoutePanel } from "@/components/radary/RoutePanel";
import { FilterSidebar } from "@/components/radary/FilterSidebar";
import { RadarZaznam } from "@/data/radary";
import {
  ChevronDown,
  Filter,
  Navigation as NavigationIcon,
  ArrowRight,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MapaRadary = dynamic(
  () => import("@/components/radary/MapaRadary").then((mod) => mod.MapaRadary),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <div className="text-muted-foreground">Načítava sa mapa...</div>
      </div>
    ),
  }
);

export default function Home() {
  const [filtre, setFiltre] = useState<FiltreStav>(INIT_FILTRE);
  const [routeStart, setRouteStart] = useState<string | null>("Košice");
  const [routeEnd, setRouteEnd] = useState<string | null>("Bratislava");
  const [radarsOnRouteCount, setRadarsOnRouteCount] = useState(0);
  const [routeDistance, setRouteDistance] = useState<number | undefined>(
    undefined
  );
  const [routeDuration, setRouteDuration] = useState<number | undefined>(
    undefined
  );
  const [isRouteOpen, setIsRouteOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const triedyCiest = useMemo(() => getUnikatneTriedyCiest(), []);

  const filtrovaneData = useMemo(() => {
    return aplikovatFiltreATriedenie(RADARY_DATA, filtre);
  }, [filtre]);

  const handleFiltreChange = (noveFiltreValue: Partial<FiltreStav>) => {
    setFiltre((prev) => ({ ...prev, ...noveFiltreValue }));
  };

  const handleRouteChange = (start: string | null, end: string | null) => {
    setRouteStart(start);
    setRouteEnd(end);
    if (!start || !end) {
      setRadarsOnRouteCount(0);
      setRouteDistance(undefined);
      setRouteDuration(undefined);
    }
  };

  return (
    <div className="flex flex-col w-full bg-gradient-to-br from-background via-background to-primary/5">
      <main className="flex-1 w-full">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
          <div className="text-center space-y-3 mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Mapa radarov
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Plánujte trasu a filtrujte radary podľa vašich potrieb
            </p>
          </div>
          <Collapsible open={isRouteOpen} onOpenChange={setIsRouteOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between h-auto py-4 px-6 bg-card/80 backdrop-blur-sm hover:bg-card border-2 hover:border-primary/50 transition-all shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <NavigationIcon className="h-6 w-6 text-primary" />
                  <span className="font-semibold text-lg">
                    Plánovanie trasy
                  </span>
                  {(routeStart || routeEnd) && (
                    <span className="text-sm text-muted-foreground ml-2">
                      {routeStart} → {routeEnd}
                    </span>
                  )}
                </div>
                <ChevronDown
                  className={`h-6 w-6 transition-transform ${
                    isRouteOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="bg-card/80 backdrop-blur-sm border-2 rounded-2xl p-6 shadow-lg">
                <RoutePanel
                  onRouteChange={handleRouteChange}
                  routeStart={routeStart}
                  routeEnd={routeEnd}
                  radarsOnRouteCount={radarsOnRouteCount}
                  routeDistance={routeDistance}
                  routeDuration={routeDuration}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between h-auto py-4 px-6 bg-card/80 backdrop-blur-sm hover:bg-card border-2 hover:border-primary/50 transition-all shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <Filter className="h-6 w-6 text-primary" />
                  <span className="font-semibold text-lg">Filtrovanie</span>
                </div>
                <ChevronDown
                  className={`h-6 w-6 transition-transform ${
                    isFilterOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="bg-card/80 backdrop-blur-sm border-2 rounded-2xl p-6 shadow-lg">
                <FilterSidebar
                  filtre={filtre}
                  onFiltreChange={handleFiltreChange}
                  triedyCiest={triedyCiest}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden h-[500px] sm:h-[600px] lg:h-[700px] border-2">
            <MapaRadary
              data={filtrovaneData}
              onMarkerClick={() => {}}
              routeStart={routeStart}
              routeEnd={routeEnd}
              onRouteInfoChange={(info) => {
                if (info) {
                  setRadarsOnRouteCount(info.radarsCount);
                  setRouteDistance(info.distance);
                  setRouteDuration(info.duration);
                } else {
                  setRadarsOnRouteCount(0);
                  setRouteDistance(undefined);
                  setRouteDuration(undefined);
                }
              }}
            />
          </div>

          <div className="bg-gradient-to-r from-primary/10 via-destructive/10 to-primary/10 rounded-2xl p-6 sm:p-8 text-center border-2 border-primary/20 shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Zobraziť všetky radary
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Prehľadajte kompletný zoznam {RADARY_DATA.length} radarov na
              Slovensku s pokročilým filtrovaním a vyhľadávaním
            </p>
            <a href="/radary">
              <Button size="lg" className="gap-2 text-base px-8 py-6 shadow-lg">
                Prejsť na zoznam radarov
                <ArrowRight className="h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
