"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadarZaznam, TypMerania } from "@/data/radary";
import { Copy, FileJson, MapPin, Route, MapPinOff } from "lucide-react";
import { toast } from "sonner";

interface DetailRadaruProps {
  radar: RadarZaznam | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
  [TypMerania.CERVENA]: "Červená na semafore",
};

export function DetailRadaru({ radar, open, onOpenChange }: DetailRadaruProps) {
  if (!radar) return null;

  const kopirovatText = () => {
    const text = `
Mesto: ${radar.mesto}
Trieda cesty: ${radar.triedaCesty}
Cesta: ${radar.cesta}
Lokalita: ${radar.lokalita}
Typ merania: ${TYP_LABELS[radar.typMerania]}
Región: ${radar.region}
Súradnice: ${radar.suradnice.lat}, ${radar.suradnice.lng}
    `.trim();

    navigator.clipboard.writeText(text);
    toast.success("Text bol skopírovaný do schránky");
  };

  const kopirovatJSON = () => {
    const json = JSON.stringify(radar, null, 2);
    navigator.clipboard.writeText(json);
    toast.success("JSON bol skopírovaný do schránky");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl md:text-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span className="truncate max-w-full">{radar.mesto}</span>
            <Badge
              className={`${
                TYP_COLORS[radar.typMerania]
              } text-white text-xs sm:text-sm shrink-0`}
            >
              {TYP_LABELS[radar.typMerania]}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                Trieda cesty
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Route className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                <p className="text-sm sm:text-base font-semibold">
                  {radar.triedaCesty}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                Cesta
              </p>
              <p className="text-sm sm:text-base font-semibold mt-1">
                {radar.cesta}
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-xs sm:text-sm font-medium text-muted-foreground">
              Lokalita
            </p>
            <div className="flex items-start gap-2 mt-1">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground mt-0.5" />
              <p className="text-sm sm:text-base">{radar.lokalita}</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                Región
              </p>
              <div className="mt-1">
                <Badge
                  variant="outline"
                  className="text-xs sm:text-sm md:text-base px-2 sm:px-3 py-0.5 sm:py-1"
                >
                  {radar.region}
                </Badge>
              </div>
            </div>

            <div>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                ID
              </p>
              <p className="text-xs sm:text-base mt-1 font-mono break-all">
                {radar.id}
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">
              Súradnice GPS
            </p>
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 shrink-0" />
              <p className="text-xs sm:text-sm font-mono">
                {radar.suradnice.lat.toFixed(4)},{" "}
                {radar.suradnice.lng.toFixed(4)}
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button
              onClick={kopirovatText}
              variant="outline"
              className="flex-1 gap-2 text-xs sm:text-sm"
            >
              <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
              Kopírovať text
            </Button>
            <Button
              onClick={kopirovatJSON}
              variant="outline"
              className="flex-1 gap-2 text-xs sm:text-sm"
            >
              <FileJson className="h-3 w-3 sm:h-4 sm:w-4" />
              Kopírovať JSON
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
