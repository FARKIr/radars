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
  [TypMerania.RYCHLOST]: "bg-primary",
  [TypMerania.SEMAFOR]: "bg-amber-500",
  [TypMerania.SEMAFOR_RYCHLOST]: "bg-purple-500",
  [TypMerania.CERVENA]: "bg-destructive",
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
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <label className="text-xs sm:text-sm font-medium">Vyhľadávanie</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
          <Input
            placeholder="Mesto, cesta..."
            value={filtre.vyhladavanie}
            onChange={(e) => onFiltreChange({ vyhladavanie: e.target.value })}
            className="pl-9 sm:pl-10 h-9 sm:h-10 text-sm"
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-2 sm:space-y-3">
        <label className="text-xs sm:text-sm font-medium">Región</label>
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          <Badge
            variant={filtre.region === "all" ? "default" : "outline"}
            className="cursor-pointer justify-center text-xs sm:text-sm py-1.5 sm:py-2"
            onClick={() => onFiltreChange({ region: "all" })}
          >
            Všetky
          </Badge>
          {Object.values(Region).map((region) => (
            <Badge
              key={region}
              variant={filtre.region === region ? "default" : "outline"}
              className="cursor-pointer justify-center text-xs sm:text-sm py-1.5 sm:py-2"
              onClick={() => onFiltreChange({ region })}
            >
              {REGION_LABELS[region]}
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-2 sm:space-y-3">
        <label className="text-xs sm:text-sm font-medium">Typ merania</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
          {Object.values(TypMerania).map((typ) => (
            <Badge
              key={typ}
              className={`cursor-pointer justify-center text-xs sm:text-sm py-1.5 sm:py-2 ${
                filtre.typyMerania.includes(typ)
                  ? `${TYP_COLORS[typ]} text-primary-foreground`
                  : "bg-muted hover:bg-accent text-muted-foreground"
              } transition-colors`}
              onClick={() => toggleTypMerania(typ)}
            >
              {TYP_LABELS[typ]}
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-2 sm:space-y-3">
        <label className="text-xs sm:text-sm font-medium">Trieda cesty</label>
        <div className="max-h-32 sm:max-h-36 overflow-y-auto space-y-1 pr-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
            <Badge
              variant={filtre.triedaCesty === "all" ? "default" : "outline"}
              className="cursor-pointer justify-center text-xs py-1 px-2 h-auto"
              onClick={() => onFiltreChange({ triedaCesty: "all" })}
            >
              Všetky
            </Badge>
            {triedyCiest.map((trieda) => (
              <Badge
                key={trieda}
                variant={filtre.triedaCesty === trieda ? "default" : "outline"}
                className="cursor-pointer justify-center text-xs py-1 px-2 h-auto"
                onClick={() => onFiltreChange({ triedaCesty: trieda })}
              >
                {trieda}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
