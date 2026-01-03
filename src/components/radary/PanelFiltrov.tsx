"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FiltreStav } from "@/lib/filtre";
import { Region, TypMerania } from "@/data/radary";
import { Search, Filter, SortAsc, LayoutGrid, Table } from "lucide-react";

interface PanelFiltrovProps {
  filtre: FiltreStav;
  onFiltreChange: (filtre: Partial<FiltreStav>) => void;
  triedyCiest: string[];
  zobrazenie: "karty" | "tabulka";
  onZobrazenieChange: (zobrazenie: "karty" | "tabulka") => void;
}

const TYPY_MERANIA_LABELS: Record<TypMerania, string> = {
  [TypMerania.RYCHLOST]: "Rýchlosť",
  [TypMerania.SEMAFOR]: "Semafor",
  [TypMerania.SEMAFOR_RYCHLOST]: "Semafor + Rýchlosť",
  [TypMerania.CERVENA]: "Červená na semafore",
};

const REGION_LABELS: Record<Region | "all", string> = {
  all: "Všetky regióny",
  [Region.ZAPAD]: "Západ",
  [Region.STRED]: "Stred",
  [Region.VYCHOD]: "Východ",
};

const TRIEDENIE_LABELS: Record<FiltreStav["triedenie"], string> = {
  mesto: "Podľa mesta",
  triedaCesty: "Podľa triedy cesty",
  typ: "Podľa typu merania",
};

export function PanelFiltrov({
  filtre,
  onFiltreChange,
  triedyCiest,
  zobrazenie,
  onZobrazenieChange,
}: PanelFiltrovProps) {
  const toggleTypMerania = (typ: TypMerania) => {
    const novaTypy = filtre.typyMerania.includes(typ)
      ? filtre.typyMerania.filter((t) => t !== typ)
      : [...filtre.typyMerania, typ];
    onFiltreChange({ typyMerania: novaTypy });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Vyhľadať mesto, cestu, lokalitu..."
            value={filtre.vyhladavanie}
            onChange={(e) => onFiltreChange({ vyhladavanie: e.target.value })}
            className="pl-10"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Región: {REGION_LABELS[filtre.region]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Vybrať región</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(["all", Region.ZAPAD, Region.STRED, Region.VYCHOD] as const).map(
              (region) => (
                <DropdownMenuCheckboxItem
                  key={region}
                  checked={filtre.region === region}
                  onCheckedChange={() => onFiltreChange({ region })}
                >
                  {REGION_LABELS[region]}
                </DropdownMenuCheckboxItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Cesta:{" "}
              {filtre.triedaCesty === "all" ? "Všetky" : filtre.triedaCesty}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Trieda cesty</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={filtre.triedaCesty === "all"}
              onCheckedChange={() => onFiltreChange({ triedaCesty: "all" })}
            >
              Všetky
            </DropdownMenuCheckboxItem>
            {triedyCiest.map((trieda) => (
              <DropdownMenuCheckboxItem
                key={trieda}
                checked={filtre.triedaCesty === trieda}
                onCheckedChange={() => onFiltreChange({ triedaCesty: trieda })}
              >
                {trieda}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Typy ({filtre.typyMerania.length})
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Typ merania</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Object.values(TypMerania).map((typ) => (
              <DropdownMenuCheckboxItem
                key={typ}
                checked={filtre.typyMerania.includes(typ)}
                onCheckedChange={() => toggleTypMerania(typ)}
              >
                {TYPY_MERANIA_LABELS[typ]}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SortAsc className="h-4 w-4" />
              {TRIEDENIE_LABELS[filtre.triedenie]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Triediť</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(["mesto", "triedaCesty", "typ"] as const).map((triedenie) => (
              <DropdownMenuCheckboxItem
                key={triedenie}
                checked={filtre.triedenie === triedenie}
                onCheckedChange={() => onFiltreChange({ triedenie })}
              >
                {TRIEDENIE_LABELS[triedenie]}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs
        value={zobrazenie}
        onValueChange={(v) => onZobrazenieChange(v as "karty" | "tabulka")}
      >
        <TabsList>
          <TabsTrigger value="karty" className="gap-2">
            <LayoutGrid className="h-4 w-4" />
            Karty
          </TabsTrigger>
          <TabsTrigger value="tabulka" className="gap-2">
            <Table className="h-4 w-4" />
            Tabuľka
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
