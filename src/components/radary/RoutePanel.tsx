"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation, MapPin, ArrowRight, X } from "lucide-react";
import { RADARY_DATA } from "@/data/radary";

interface RoutePanelProps {
  onRouteChange: (start: string | null, end: string | null) => void;
  routeStart: string | null;
  routeEnd: string | null;
}

export function RoutePanel({
  onRouteChange,
  routeStart,
  routeEnd,
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

  const radarsOnRouteCount =
    routeStart && routeEnd
      ? RADARY_DATA.filter(
          (r) =>
            r.mesto.toLowerCase().includes(startInput.toLowerCase()) ||
            r.mesto.toLowerCase().includes(endInput.toLowerCase())
        ).length
      : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5 text-blue-600" />
          Plánovanie trasy
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-green-600 shrink-0" />
            <Input
              placeholder="Začiatočný bod (napr. Košice)"
              value={startInput}
              onChange={(e) => setStartInput(e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="flex items-center justify-center">
            <ArrowRight className="h-4 w-4 text-gray-400" />
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-red-600 shrink-0" />
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
            Plánovať trasu
          </Button>
          {(routeStart || routeEnd) && (
            <Button onClick={handleClearRoute} variant="outline" size="icon">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {routeStart && routeEnd && (
          <div className="pt-3 border-t space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Aktívna trasa:</span>
              <Badge className="bg-green-500 text-white">Aktívna</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">{routeStart}</span>
              <ArrowRight className="h-3 w-3 text-gray-400" />
              <span className="font-medium">{routeEnd}</span>
            </div>
            {radarsOnRouteCount > 0 && (
              <div className="flex items-center gap-2 text-sm text-amber-600">
                <AlertCircle className="h-4 w-4" />
                <span>~{radarsOnRouteCount} radarov v blízkosti trasy</span>
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
