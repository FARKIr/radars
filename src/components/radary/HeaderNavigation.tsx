"use client";

import { Navigation, MapPin, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HeaderNavigationProps {
  totalRadars: number;
  visibleRadars: number;
}

export function HeaderNavigation({
  totalRadars,
  visibleRadars,
}: HeaderNavigationProps) {
  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <div className="bg-blue-600 p-1.5 md:p-2 rounded-lg shrink-0">
              <Navigation className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg md:text-2xl font-bold text-gray-900 truncate">
                Radary SK
              </h1>
              <p className="text-xs md:text-sm text-gray-600 hidden sm:block">
                Plánovanie trás s radarmi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <div className="text-right">
              <div className="flex items-center gap-1 md:gap-2">
                <MapPin className="h-3 w-3 md:h-4 md:w-4 text-gray-600" />
                <span className="text-xs md:text-sm font-medium text-gray-900 whitespace-nowrap">
                  {visibleRadars} / {totalRadars}
                </span>
              </div>
              <p className="text-[10px] md:text-xs text-gray-500 hidden sm:block">
                Zobrazené radary
              </p>
            </div>

            <div className="h-8 md:h-10 w-px bg-gray-300 hidden md:block" />

            <div className="hidden md:flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <Badge
                variant="outline"
                className="text-amber-700 border-amber-300 whitespace-nowrap"
              >
                Dávajte pozor!
              </Badge>
            </div>

            <AlertCircle
              className="h-5 w-5 text-amber-500 md:hidden"
              aria-label="Dávajte pozor"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
