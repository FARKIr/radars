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
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Žiadne výsledky</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((radar) => (
        <Card
          key={radar.id}
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onKartaClick(radar)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-xl">{radar.mesto}</CardTitle>
              <Badge
                className={`${
                  TYP_COLORS[radar.typMerania]
                } text-white shrink-0`}
              >
                {TYP_LABELS[radar.typMerania]}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Route className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="font-medium">{radar.triedaCesty}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{radar.cesta}</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <span className="text-muted-foreground line-clamp-2">
                {radar.lokalita}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Badge variant="outline">{radar.region}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
