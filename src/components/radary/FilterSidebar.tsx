"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

  const clearAllFilters = () => {
    onFiltreChange({
      region: "all",
      typyMerania: [],
      triedaCesty: "all",
      vyhladavanie: "",
    });
  };

  const hasActiveFilters =
    filtre.region !== "all" ||
    filtre.typyMerania.length > 0 ||
    filtre.triedaCesty !== "all" ||
    filtre.vyhladavanie.trim();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Filtre</div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs h-7 px-2 hover:bg-destructive/10 hover:text-destructive"
          >
            Zrušiť všetko
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-xs text-muted-foreground w-12">Región:</span>
          <div className="flex flex-wrap gap-1">
            <Badge
              variant={filtre.region === "all" ? "default" : "outline"}
              className="cursor-pointer text-xs py-1 px-2 h-auto"
              onClick={() => onFiltreChange({ region: "all" })}
            >
              Všetky
            </Badge>
            {Object.values(Region).map((region) => (
              <Badge
                key={region}
                variant={filtre.region === region ? "default" : "outline"}
                className="cursor-pointer text-xs py-1 px-2 h-auto"
                onClick={() => onFiltreChange({ region })}
              >
                {REGION_LABELS[region]}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1">
          <span className="text-xs text-muted-foreground w-12">Meranie:</span>
          <div className="flex flex-wrap gap-1">
            {Object.values(TypMerania).map((typ) => (
              <Badge
                key={typ}
                className={`cursor-pointer text-xs py-1 px-2 h-auto ${
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

        <div className="flex flex-wrap items-start gap-1">
          <span className="text-xs text-muted-foreground w-12">Trieda:</span>
          <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto flex-1">
            <Badge
              variant={filtre.triedaCesty === "all" ? "default" : "outline"}
              className="cursor-pointer text-xs py-1 px-2 h-auto"
              onClick={() => onFiltreChange({ triedaCesty: "all" })}
            >
              Všetky
            </Badge>
            {triedyCiest.map((trieda) => (
              <Badge
                key={trieda}
                variant={filtre.triedaCesty === trieda ? "default" : "outline"}
                className="cursor-pointer text-xs py-1 px-2 h-auto"
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
