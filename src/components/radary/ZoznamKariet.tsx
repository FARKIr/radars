"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadarZaznam, TypMerania } from "@/data/radary";
import { MapPin, Route } from "lucide-react";

interface ZoznamKarietProps {
  data: RadarZaznam[];
  onKartaClick: (radar: RadarZaznam) => void;
}

const TYP_COLORS: Record<TypMerania, string> = {
  [TypMerania.RYCHLOST]: "bg-blue-500",
  [TypMerania.SEMAFOR]: "bg-amber-500",
  [TypMerania.SEMAFOR_RYCHLOST]: "bg-purple-500",
  [TypMerania.CERVENA]: "bg-red-500",
};

const TYP_LABELS: Record<TypMerania, string> = {
  [TypMerania.RYCHLOST]: "Rýchlosť",
  [TypMerania.SEMAFOR]: "Semafor",
  [TypMerania.SEMAFOR_RYCHLOST]: "Semafor + Rýchlosť",
  [TypMerania.CERVENA]: "Červená",
};

export function ZoznamKariet({ data, onKartaClick }: ZoznamKarietProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 sm:h-40 md:h-64">
        <p className="text-sm sm:text-base text-muted-foreground">
          Žiadne výsledky
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {data.map((radar) => (
        <Card
          key={radar.id}
          className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          onClick={() => onKartaClick(radar)}
        >
          <CardHeader className="pb-2 sm:pb-3">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-base sm:text-lg md:text-xl truncate">
                {radar.mesto}
              </CardTitle>
              <Badge
                className={`${
                  TYP_COLORS[radar.typMerania]
                } text-white shrink-0 text-[10px] sm:text-xs whitespace-nowrap`}
              >
                {TYP_LABELS[radar.typMerania]}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
              <Route className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
              <span className="font-medium truncate">{radar.triedaCesty}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground truncate">
                {radar.cesta}
              </span>
            </div>
            <div className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground shrink-0 mt-0.5" />
              <span className="text-muted-foreground line-clamp-2">
                {radar.lokalita}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs pt-1">
              <Badge variant="outline" className="text-[10px] sm:text-xs">
                {radar.region}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
