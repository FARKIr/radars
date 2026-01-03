"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Navigation,
  MapPin,
  ArrowRight,
  X,
  AlertCircle,
  Clock,
  Route,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface RoutePanelProps {
  onRouteChange: (start: string | null, end: string | null) => void;
  routeStart: string | null;
  routeEnd: string | null;
  radarsOnRouteCount?: number;
  routeDistance?: number;
  routeDuration?: number;
}

export function RoutePanel({
  onRouteChange,
  routeStart,
  routeEnd,
  radarsOnRouteCount = 0,
  routeDistance,
  routeDuration,
}: RoutePanelProps) {
  const [startInput, setStartInput] = useState(routeStart || "Košice");
  const [endInput, setEndInput] = useState(routeEnd || "Bratislava");

  const handlePlanRoute = () => {
    onRouteChange(startInput, endInput);
  };

  const handleClearRoute = () => {
    setStartInput("");
    setEndInput("");
    onRouteChange(null, null);
  };

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-1 rounded-lg shrink-0">
            <MapPin className="h-3 w-3 text-primary" />
          </div>
          <Input
            placeholder="Začiatok (napr. Košice)"
            value={startInput}
            onChange={(e) => setStartInput(e.target.value)}
            className="flex-1 h-8 text-xs"
          />
        </div>

        <div className="flex items-center justify-center py-0.5">
          <ArrowRight className="h-3 w-3 text-muted-foreground" />
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-destructive/10 p-1 rounded-lg shrink-0">
            <MapPin className="h-3 w-3 text-destructive" />
          </div>
          <Input
            placeholder="Cieľ (napr. Bratislava)"
            value={endInput}
            onChange={(e) => setEndInput(e.target.value)}
            className="flex-1 h-8 text-xs"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handlePlanRoute}
          className="flex-1 h-8 text-xs"
          disabled={!startInput || !endInput}
        >
          <Navigation className="h-3 w-3 mr-1" />
          Plánovať
        </Button>
        {(routeStart || routeEnd) && (
          <Button
            onClick={handleClearRoute}
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {routeStart && routeEnd && (
        <div className="pt-2 border-t space-y-1 bg-muted rounded-lg p-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground">Trasa:</span>
            <Badge className="bg-primary text-primary-foreground text-[10px]">
              Aktívna
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-foreground">
            <span className="truncate">{routeStart}</span>
            <ArrowRight className="h-2.5 w-2.5 shrink-0" />
            <span className="truncate">{routeEnd}</span>
          </div>
          {routeDistance !== undefined && routeDuration !== undefined && (
            <div className="grid grid-cols-2 gap-1 text-xs">
              <div className="bg-background rounded p-1">
                <div className="text-muted-foreground text-[9px]">
                  Vzdialenosť
                </div>
                <div className="font-semibold text-foreground text-xs">
                  {(routeDistance / 1000).toFixed(1)} km
                </div>
              </div>
              <div className="bg-background rounded p-1">
                <div className="text-muted-foreground text-[9px]">Čas</div>
                <div className="font-semibold text-foreground text-xs">
                  {Math.round(routeDuration / 60)} min
                </div>
              </div>
            </div>
          )}
          {radarsOnRouteCount > 0 && (
            <div className="flex items-center gap-1 text-xs text-amber-700 bg-amber-50 rounded p-1">
              <AlertCircle className="h-3 w-3 shrink-0" />
              <span className="text-[9px]">
                {radarsOnRouteCount} radarov na trase
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
