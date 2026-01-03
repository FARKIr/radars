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
    <Card className="sticky top-24">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Navigation className="h-5 w-5 text-primary" />
          Plánovanie trasy
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg shrink-0">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <Input
              placeholder="Začiatočný bod (napr. Košice)"
              value={startInput}
              onChange={(e) => setStartInput(e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="flex items-center justify-center py-2">
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-destructive/10 p-2 rounded-lg shrink-0">
              <MapPin className="h-4 w-4 text-destructive" />
            </div>
            <Input
              placeholder="Cieľový bod (napr. Bratislava)"
              value={endInput}
              onChange={(e) => setEndInput(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handlePlanRoute}
            className="flex-1"
            disabled={!startInput || !endInput}
          >
            <Navigation className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Plánovať trasu</span>
            <span className="sm:hidden">Plánovať</span>
          </Button>
          {(routeStart || routeEnd) && (
            <Button onClick={handleClearRoute} variant="outline" size="icon">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {routeStart && routeEnd && (
          <div className="pt-4 border-t space-y-3 bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                Aktívna trasa:
              </span>
              <Badge className="bg-primary text-primary-foreground text-xs">
                Aktívna
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <span className="truncate">{routeStart}</span>
              <ArrowRight className="h-3 w-3 shrink-0" />
              <span className="truncate">{routeEnd}</span>
            </div>
            {routeDistance !== undefined && routeDuration !== undefined && (
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-background rounded p-2">
                  <div className="text-muted-foreground">Vzdialenosť</div>
                  <div className="font-semibold text-foreground">
                    {(routeDistance / 1000).toFixed(1)} km
                  </div>
                </div>
                <div className="bg-background rounded p-2">
                  <div className="text-muted-foreground">Čas jazdy</div>
                  <div className="font-semibold text-foreground">
                    {Math.round(routeDuration / 60)} min
                  </div>
                </div>
              </div>
            )}
            {radarsOnRouteCount > 0 && (
              <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 rounded-lg p-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span className="text-xs">
                  {radarsOnRouteCount} radarov v blízkosti trasy
                </span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
