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
    <div className="min-h-screen bg-gray-50">
      <HeaderNavigation
        totalRadars={RADARY_DATA.length}
        visibleRadars={filtrovaneData.length}
      />

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          <aside className="lg:col-span-1 space-y-4 sm:space-y-6">
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

          <section className="lg:col-span-3 space-y-4 sm:space-y-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[300px] sm:h-[400px] md:h-[500px]">
              <GoogleMapRadary
                data={filtrovaneData}
                onMarkerClick={handleRadarClick}
                routeStart={routeStart}
                routeEnd={routeEnd}
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900">
                Radary na trase ({filtrovaneData.length})
              </h2>
              <ZoznamKariet
                data={filtrovaneData}
                onKartaClick={handleRadarClick}
              />
            </div>
          </section>
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
