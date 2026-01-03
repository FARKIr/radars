"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation, MapPin, ArrowRight, X } from "lucide-react";

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
          <Navigation className="h-5 w-5 text-blue-600" />
          Plánovanie trasy
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="bg-green-100 p-2 rounded-lg shrink-0">
              <MapPin className="h-4 w-4 text-green-600" />
            </div>
            <Input
              placeholder="Začiatočný bod (napr. Košice)"
              value={startInput}
              onChange={(e) => setStartInput(e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="flex items-center justify-center py-2">
            <ArrowRight className="h-4 w-4 text-gray-400" />
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-red-100 p-2 rounded-lg shrink-0">
              <MapPin className="h-4 w-4 text-red-600" />
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
          <div className="pt-4 border-t space-y-3 bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-900">
                Aktívna trasa:
              </span>
              <Badge className="bg-green-500 text-white text-xs">Aktívna</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-blue-900">
              <span className="truncate">{routeStart}</span>
              <ArrowRight className="h-3 w-3 shrink-0" />
              <span className="truncate">{routeEnd}</span>
            </div>
            {routeDistance !== undefined && routeDuration !== undefined && (
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white rounded p-2">
                  <div className="text-gray-500">Vzdialenosť</div>
                  <div className="font-semibold text-blue-900">
                    {(routeDistance / 1000).toFixed(1)} km
                  </div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-gray-500">Čas jazdy</div>
                  <div className="font-semibold text-blue-900">
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

function AlertCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}
