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
    <div className="space-y-3 sm:space-y-4">
      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-1.5 sm:p-2 rounded-lg shrink-0">
            <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          </div>
          <Input
            placeholder="Začiatočný bod (napr. Košice)"
            value={startInput}
            onChange={(e) => setStartInput(e.target.value)}
            className="flex-1 h-9 sm:h-10 text-sm"
          />
        </div>

        <div className="flex items-center justify-center py-1 sm:py-2">
          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-destructive/10 p-1.5 sm:p-2 rounded-lg shrink-0">
            <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-destructive" />
          </div>
          <Input
            placeholder="Cieľový bod (napr. Bratislava)"
            value={endInput}
            onChange={(e) => setEndInput(e.target.value)}
            className="flex-1 h-9 sm:h-10 text-sm"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handlePlanRoute}
          className="flex-1 h-9 sm:h-10 text-sm"
          disabled={!startInput || !endInput}
        >
          <Navigation className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
          <span className="hidden sm:inline">Plánovať trasu</span>
          <span className="sm:hidden">Plánovať</span>
        </Button>
        {(routeStart || routeEnd) && (
          <Button
            onClick={handleClearRoute}
            variant="outline"
            size="icon"
            className="h-9 w-9 sm:h-10 sm:w-10"
          >
            <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        )}
      </div>

      {routeStart && routeEnd && (
        <div className="pt-3 sm:pt-4 border-t space-y-2 sm:space-y-3 bg-muted rounded-lg p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-foreground">
              Aktívna trasa:
            </span>
            <Badge className="bg-primary text-primary-foreground text-[10px] sm:text-xs">
              Aktívna
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground">
            <span className="truncate">{routeStart}</span>
            <ArrowRight className="h-3 w-3 shrink-0" />
            <span className="truncate">{routeEnd}</span>
          </div>
          {routeDistance !== undefined && routeDuration !== undefined && (
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-background rounded p-2">
                <div className="text-muted-foreground text-[10px] sm:text-xs">
                  Vzdialenosť
                </div>
                <div className="font-semibold text-foreground text-xs sm:text-sm">
                  {(routeDistance / 1000).toFixed(1)} km
                </div>
              </div>
              <div className="bg-background rounded p-2">
                <div className="text-muted-foreground text-[10px] sm:text-xs">
                  Čas jazdy
                </div>
                <div className="font-semibold text-foreground text-xs sm:text-sm">
                  {Math.round(routeDuration / 60)} min
                </div>
              </div>
            </div>
          )}
          {radarsOnRouteCount > 0 && (
            <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-700 bg-amber-50 rounded-lg p-2">
              <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span className="text-[10px] sm:text-xs">
                {radarsOnRouteCount} radarov v blízkosti trasy
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
