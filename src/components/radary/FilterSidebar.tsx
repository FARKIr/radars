"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FiltreStav } from "@/lib/filtre";
import { Region, TypMerania } from "@/data/radary";
import { Search, Filter } from "lucide-react";

interface FilterSidebarProps {
  filtre: FiltreStav;
  onFiltreChange: (filtre: Partial<FiltreStav>) => void;
  triedyCiest: string[];
}

const REGION_LABELS: Record<Region, string> = {
  [Region.ZAPAD]: "Západ",
  [Region.STRED]: "Stred",
  [Region.VYCHOD]: "Východ",
};

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

export function FilterSidebar({
  filtre,
  onFiltreChange,
  triedyCiest,
}: FilterSidebarProps) {
  const toggleTypMerania = (typ: TypMerania) => {
    const novaTypy = filtre.typyMerania.includes(typ)
      ? filtre.typyMerania.filter((t) => t !== typ)
      : [...filtre.typyMerania, typ];
    onFiltreChange({ typyMerania: novaTypy });
  };

  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Filter className="h-5 w-5" />
          Filtre
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Vyhľadávanie</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Mesto, cesta..."
              value={filtre.vyhladavanie}
              onChange={(e) => onFiltreChange({ vyhladavanie: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <label className="text-sm font-medium">Región</label>
          <div className="grid grid-cols-2 gap-2">
            <Badge
              variant={filtre.region === "all" ? "default" : "outline"}
              className="cursor-pointer justify-center text-xs"
              onClick={() => onFiltreChange({ region: "all" })}
            >
              Všetky
            </Badge>
            {Object.values(Region).map((region) => (
              <Badge
                key={region}
                variant={filtre.region === region ? "default" : "outline"}
                className="cursor-pointer justify-center text-xs"
                onClick={() => onFiltreChange({ region })}
              >
                {REGION_LABELS[region]}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <label className="text-sm font-medium">Typ merania</label>
          <div className="space-y-2">
            {Object.values(TypMerania).map((typ) => (
              <Badge
                key={typ}
                className={`cursor-pointer justify-center text-white text-xs ${
                  filtre.typyMerania.includes(typ)
                    ? TYP_COLORS[typ]
                    : "bg-gray-300 hover:bg-gray-400"
                } transition-colors`}
                onClick={() => toggleTypMerania(typ)}
              >
                {TYP_LABELS[typ]}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <label className="text-sm font-medium">Trieda cesty</label>
          <div className="max-h-48 overflow-y-auto space-y-1.5 pr-2">
            <Badge
              variant={filtre.triedaCesty === "all" ? "default" : "outline"}
              className="cursor-pointer justify-center text-xs w-full"
              onClick={() => onFiltreChange({ triedaCesty: "all" })}
            >
              Všetky
            </Badge>
            {triedyCiest.map((trieda) => (
              <Badge
                key={trieda}
                variant={filtre.triedaCesty === trieda ? "default" : "outline"}
                className="cursor-pointer justify-center text-xs w-full"
                onClick={() => onFiltreChange({ triedaCesty: trieda })}
              >
                {trieda}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
