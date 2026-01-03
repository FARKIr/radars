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
    <header className="bg-white border-b shadow-card sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="bg-blue-600 p-1.5 sm:p-2 rounded-lg shrink-0">
              <Navigation className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                Radary SK
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 hidden md:block">
                Plánovanie trás s radarmi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <div className="text-right">
              <div className="flex items-center gap-1 sm:gap-2">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                <span className="text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                  {visibleRadars} / {totalRadars}
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-500 hidden sm:block">
                Zobrazené radary
              </p>
            </div>

            <div className="h-8 sm:h-10 w-px bg-gray-300 hidden lg:block" />

            <div className="hidden lg:flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <Badge
                variant="outline"
                className="text-amber-700 border-amber-300 whitespace-nowrap"
              >
                Dávajte pozor!
              </Badge>
            </div>

            <div className="flex lg:hidden items-center justify-center p-2 bg-amber-50 rounded-lg">
              <AlertCircle
                className="h-5 w-5 text-amber-600"
                aria-label="Dávajte pozor"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
