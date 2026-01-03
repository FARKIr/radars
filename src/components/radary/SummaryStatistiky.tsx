"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Region, TypMerania } from "@/data/radary";
import { getPocetPodlaRegionu, getPocetPodlaTypu } from "@/lib/filtre";
import { RadarZaznam } from "@/data/radary";
import { MapPin, Activity, Target } from "lucide-react";

interface SummaryStatistikyProps {
  data: RadarZaznam[];
  filtrovaneData: RadarZaznam[];
}

const TYP_LABELS: Record<TypMerania, string> = {
  [TypMerania.RYCHLOST]: "Rýchlosť",
  [TypMerania.SEMAFOR]: "Semafor",
  [TypMerania.SEMAFOR_RYCHLOST]: "Semafor + Rýchlosť",
  [TypMerania.CERVENA]: "Červená",
};

const TYP_COLORS: Record<TypMerania, string> = {
  [TypMerania.RYCHLOST]: "bg-blue-500",
  [TypMerania.SEMAFOR]: "bg-amber-500",
  [TypMerania.SEMAFOR_RYCHLOST]: "bg-purple-500",
  [TypMerania.CERVENA]: "bg-red-500",
};

const REGION_COLORS: Record<Region, string> = {
  [Region.ZAPAD]: "border-blue-500",
  [Region.STRED]: "border-green-500",
  [Region.VYCHOD]: "border-orange-500",
};

export function SummaryStatistiky({
  data,
  filtrovaneData,
}: SummaryStatistikyProps) {
  const poctyTypov = getPocetPodlaTypu(filtrovaneData);
  const poctyRegionov = getPocetPodlaRegionu(filtrovaneData);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5" />
            Celkový počet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{filtrovaneData.length}</div>
          <p className="text-sm text-muted-foreground mt-1">
            z celkového počtu {data.length} záznamov
          </p>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Typy merania
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(poctyTypov).map(([typ, pocet]) => (
            <Card
              key={typ}
              className="border-l-4"
              style={{
                borderLeftColor: TYP_COLORS[typ as TypMerania].replace(
                  "bg-",
                  ""
                ),
              }}
            >
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {TYP_LABELS[typ as TypMerania]}
                    </p>
                    <p className="text-2xl font-bold mt-1">{pocet}</p>
                  </div>
                  <Badge
                    className={`${TYP_COLORS[typ as TypMerania]} text-white`}
                  >
                    {Math.round((pocet / filtrovaneData.length) * 100)}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Regióny
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(poctyRegionov).map(([region, pocet]) => (
            <Card
              key={region}
              className={`border-t-4 ${REGION_COLORS[region as Region]}`}
            >
              <CardContent className="pt-4">
                <p className="text-sm font-medium text-muted-foreground">
                  {region}
                </p>
                <p className="text-2xl font-bold mt-1">{pocet}</p>
                <Badge variant="outline" className="mt-2">
                  {Math.round((pocet / filtrovaneData.length) * 100)}%
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
