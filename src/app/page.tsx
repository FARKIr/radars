"use client";

import { useState, useMemo } from "react";
import { RADARY_DATA, getUnikatneTriedyCiest } from "@/data/radary";
import {
  INIT_FILTRE,
  aplikovatFiltreATriedenie,
  FiltreStav,
} from "@/lib/filtre";
import { GoogleMapRadary } from "@/components/radary/GoogleMapRadary";
import { HeaderNavigation } from "@/components/radary/HeaderNavigation";
import { RoutePanel } from "@/components/radary/RoutePanel";
import { FilterSidebar } from "@/components/radary/FilterSidebar";
import { ZoznamKariet } from "@/components/radary/ZoznamKariet";
import { DetailRadaru } from "@/components/radary/DetailRadaru";
import { RadarZaznam } from "@/data/radary";
import { MapPin } from "lucide-react";

export default function Home() {
  const [filtre, setFiltre] = useState<FiltreStav>(INIT_FILTRE);
  const [detailRadar, setDetailRadar] = useState<RadarZaznam | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [routeStart, setRouteStart] = useState<string | null>("Košice");
  const [routeEnd, setRouteEnd] = useState<string | null>("Bratislava");

  const triedyCiest = useMemo(() => getUnikatneTriedyCiest(), []);

  const filtrovaneData = useMemo(() => {
    return aplikovatFiltreATriedenie(RADARY_DATA, filtre);
  }, [filtre]);

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
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-gray-50">
      <HeaderNavigation
        totalRadars={RADARY_DATA.length}
        visibleRadars={filtrovaneData.length}
      />

      <main className="flex-1 overflow-hidden">
        <div className="h-full w-full max-w-[1920px] mx-auto">
          <div className="flex flex-col xl:flex-row h-full">
            <aside className="w-full xl:w-[320px] xl:min-w-[320px] flex-shrink-0 overflow-y-auto bg-gray-50 p-4 sm:p-6 space-y-4 sm:space-y-6 xl:border-r xl:border-gray-200">
              <RoutePanel
                onRouteChange={handleRouteChange}
                routeStart={routeStart}
                routeEnd={routeEnd}
              />
              <FilterSidebar
                filtre={filtre}
                onFiltreChange={handleFiltreChange}
                triedyCiest={triedyCiest}
              />
            </aside>

            <section className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="bg-white rounded-lg shadow-card overflow-hidden h-[400px] sm:h-[500px] xl:h-[calc(60vh-2rem)]">
                <GoogleMapRadary
                  data={filtrovaneData}
                  onMarkerClick={handleRadarClick}
                  routeStart={routeStart}
                  routeEnd={routeEnd}
                />
              </div>

              <div className="bg-white rounded-lg shadow-card p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                    Radary na trase ({filtrovaneData.length})
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{filtrovaneData.length} lokalít</span>
                  </div>
                </div>
                <ZoznamKariet
                  data={filtrovaneData}
                  onKartaClick={handleRadarClick}
                />
              </div>
            </section>
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
