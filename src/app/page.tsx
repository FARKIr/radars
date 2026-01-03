"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { RADARY_DATA, getUnikatneTriedyCiest } from "@/data/radary";
import {
  INIT_FILTRE,
  aplikovatFiltreATriedenie,
  FiltreStav,
} from "@/lib/filtre";
import { HeaderNavigation } from "@/components/radary/HeaderNavigation";
import { RoutePanel } from "@/components/radary/RoutePanel";
import { FilterSidebar } from "@/components/radary/FilterSidebar";
import { ZoznamKariet } from "@/components/radary/ZoznamKariet";
import { DetailRadaru } from "@/components/radary/DetailRadaru";
import { RadarZaznam } from "@/data/radary";
import {
  MapPin,
  ChevronDown,
  Filter,
  Navigation as NavigationIcon,
  Search,
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
  const [detailRadar, setDetailRadar] = useState<RadarZaznam | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [routeStart, setRouteStart] = useState<string | null>("Košice");
  const [routeEnd, setRouteEnd] = useState<string | null>("Bratislava");
  const [radarsOnRouteCount, setRadarsOnRouteCount] = useState(0);
  const [routeDistance, setRouteDistance] = useState<number | undefined>(
    undefined
  );
  const [routeDuration, setRouteDuration] = useState<number | undefined>(
    undefined
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isRouteOpen, setIsRouteOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
    <div className="flex flex-col min-h-screen w-full bg-background">
      <HeaderNavigation
        totalRadars={RADARY_DATA.length}
        visibleRadars={filtrovaneData.length}
      />

      <main className="flex-1 w-full">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4">
          <Collapsible open={isRouteOpen} onOpenChange={setIsRouteOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between h-auto py-3 px-4 bg-card hover:bg-accent"
              >
                <div className="flex items-center gap-2">
                  <NavigationIcon className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Plánovanie trasy</span>
                  {(routeStart || routeEnd) && (
                    <span className="text-xs text-muted-foreground ml-2">
                      {routeStart} → {routeEnd}
                    </span>
                  )}
                </div>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    isRouteOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <div className="bg-card border rounded-lg p-4">
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
                className="w-full justify-between h-auto py-3 px-4 bg-card hover:bg-accent"
              >
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Filtrovanie</span>
                </div>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    isFilterOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <div className="bg-card border rounded-lg p-4">
                <FilterSidebar
                  filtre={filtre}
                  onFiltreChange={handleFiltreChange}
                  triedyCiest={triedyCiest}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="bg-card rounded-lg shadow-card overflow-hidden h-[400px] sm:h-[500px] lg:h-[600px]">
            <MapaRadary
              data={filtrovaneData}
              onMarkerClick={handleRadarClick}
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

          <div className="bg-card rounded-lg shadow-card p-4 sm:p-6">
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                  Radary ({filtrovaneData.length})
                </h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{filtrovaneData.length} lokalít</span>
                </div>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Hľadať podľa mesta, lokality alebo cesty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <ZoznamKariet
              data={filtrovaneData}
              onKartaClick={handleRadarClick}
            />
          </div>
        </div>
      </main>

      <DetailRadaru
        radar={detailRadar}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </div>
  );
}
