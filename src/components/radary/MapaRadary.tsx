"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { RadarZaznam, TypMerania, Suradnice } from "@/data/radary";
import { Card } from "@/components/ui/card";
import {
  geocodeAddress,
  fetchRoute,
  pointToLineDistance,
  getRouteProximityThreshold,
} from "@/lib/mapa";
import { toast } from "sonner";

interface MapaRadaryProps {
  data: RadarZaznam[];
  onMarkerClick: (radar: RadarZaznam) => void;
  routeStart: string | null;
  routeEnd: string | null;
  onRouteInfoChange?: (
    info: {
      radarsCount: number;
      distance: number;
      duration: number;
    } | null
  ) => void;
}

const centerSlovakia: [number, number] = [48.669, 19.699];

const MARKER_COLORS: Record<TypMerania, string> = {
  [TypMerania.RYCHLOST]: "#3b82f6",
  [TypMerania.SEMAFOR]: "#f59e0b",
  [TypMerania.SEMAFOR_RYCHLOST]: "#a855f7",
  [TypMerania.CERVENA]: "#ef4444",
};

function createMarkerIcon(color: string, isOnRoute: boolean): L.DivIcon {
  const size = isOnRoute ? 24 : 16;
  const strokeWidth = isOnRoute ? 3 : 1;
  const strokeColor = isOnRoute ? "#ffffff" : color;
  const fillOpacity = isOnRoute ? 1.0 : 0.7;

  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - strokeWidth}" 
        fill="${color}" 
        fill-opacity="${fillOpacity}"
        stroke="${strokeColor}" 
        stroke-width="${strokeWidth}" />
    </svg>
  `;

  return L.divIcon({
    html: svg,
    className: "custom-marker-icon",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export function MapaRadary({
  data,
  onMarkerClick,
  routeStart,
  routeEnd,
  onRouteInfoChange,
}: MapaRadaryProps) {
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>(
    []
  );
  const [routeInfo, setRouteInfo] = useState<{
    distance: number;
    duration: number;
  } | null>(null);
  const [radarsOnRoute, setRadarsOnRoute] = useState<Set<string>>(new Set());
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const toastShownRef = useRef<string>("");

  useEffect(() => {
    if (!routeStart || !routeEnd) {
      setRouteCoordinates([]);
      setRouteInfo(null);
      setRadarsOnRoute(new Set());
      toastShownRef.current = "";
      onRouteInfoChange?.(null);
      return;
    }

    const calculateRoute = async () => {
      setIsLoadingRoute(true);
      try {
        const startCoords = await geocodeAddress(routeStart);
        if (!startCoords) {
          toast.error(`Nepodarilo sa nájsť: ${routeStart}`);
          setRouteCoordinates([]);
          setRouteInfo(null);
          setRadarsOnRoute(new Set());
          setIsLoadingRoute(false);
          return;
        }

        const endCoords = await geocodeAddress(routeEnd);
        if (!endCoords) {
          toast.error(`Nepodarilo sa nájsť: ${routeEnd}`);
          setRouteCoordinates([]);
          setRouteInfo(null);
          setRadarsOnRoute(new Set());
          setIsLoadingRoute(false);
          return;
        }

        const route = await fetchRoute(
          { lat: startCoords.lat, lng: startCoords.lng },
          { lat: endCoords.lat, lng: endCoords.lng }
        );

        if (!route) {
          toast.error("Nepodarilo sa vypočítať trasu");
          setRouteCoordinates([]);
          setRouteInfo(null);
          setRadarsOnRoute(new Set());
          setIsLoadingRoute(false);
          return;
        }

        setRouteCoordinates(route.coordinates);
        setRouteInfo({
          distance: route.distance,
          duration: route.duration,
        });

        const nearbyRadars = new Set<string>();
        const threshold = getRouteProximityThreshold();

        data.forEach((radar) => {
          const distance = pointToLineDistance(
            radar.suradnice,
            route.coordinates
          );
          if (distance < threshold) {
            nearbyRadars.add(radar.id);
          }
        });

        setRadarsOnRoute(nearbyRadars);

        onRouteInfoChange?.({
          radarsCount: nearbyRadars.size,
          distance: route.distance,
          duration: route.duration,
        });

        const routeKey = `${routeStart}-${routeEnd}-${route.distance}-${route.duration}`;
        if (toastShownRef.current !== routeKey) {
          toast.success(
            `Trasa vypočítaná: ${(route.distance / 1000).toFixed(
              1
            )} km, ${Math.round(route.duration / 60)} min`
          );
          toastShownRef.current = routeKey;
        }
      } catch (error) {
        toast.error("Chyba pri výpočte trasy");
        setRouteCoordinates([]);
        setRouteInfo(null);
        setRadarsOnRoute(new Set());
        onRouteInfoChange?.(null);
      } finally {
        setIsLoadingRoute(false);
      }
    };

    calculateRoute();
  }, [routeStart, routeEnd, data, onRouteInfoChange]);

  const polylinePositions: [number, number][] = useMemo(() => {
    return routeCoordinates.map(([lng, lat]) => [lat, lng]);
  }, [routeCoordinates]);

  return (
    <Card className="w-full h-full flex items-center justify-center overflow-hidden">
      <MapContainer
        center={centerSlovakia}
        zoom={8}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {polylinePositions.length > 0 && (
          <Polyline
            positions={polylinePositions}
            pathOptions={{
              color: "#2563eb",
              weight: 5,
              opacity: 0.8,
            }}
          />
        )}

        {data.map((radar) => {
          const isOnRoute = radarsOnRoute.has(radar.id);
          const icon = createMarkerIcon(
            MARKER_COLORS[radar.typMerania],
            isOnRoute
          );

          return (
            <Marker
              key={radar.id}
              position={[radar.suradnice.lat, radar.suradnice.lng]}
              icon={icon}
              eventHandlers={{
                click: () => onMarkerClick(radar),
              }}
            >
              <Popup>
                <div className="text-sm">
                  <strong>{radar.mesto}</strong>
                  <br />
                  {radar.lokalita}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </Card>
  );
}
