"use client";

import { useCallback, useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
  Libraries,
} from "@react-google-maps/api";
import { RadarZaznam, TypMerania } from "@/data/radary";
import { Card } from "@/components/ui/card";

const libraries: Libraries = ["geometry"];

interface GoogleMapRadaryProps {
  data: RadarZaznam[];
  onMarkerClick: (radar: RadarZaznam) => void;
  routeStart: string | null;
  routeEnd: string | null;
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const centerSlovakia = {
  lat: 48.669,
  lng: 19.699,
};

const MARKER_COLORS: Record<TypMerania, string> = {
  [TypMerania.RYCHLOST]: "#3b82f6",
  [TypMerania.SEMAFOR]: "#f59e0b",
  [TypMerania.SEMAFOR_RYCHLOST]: "#a855f7",
  [TypMerania.CERVENA]: "#ef4444",
};

export function GoogleMapRadary({
  data,
  onMarkerClick,
  routeStart,
  routeEnd,
}: GoogleMapRadaryProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [radarsOnRoute, setRadarsOnRoute] = useState<Set<string>>(new Set());

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (!isLoaded || !map || !routeStart || !routeEnd) {
      setDirectionsResponse(null);
      setRadarsOnRoute(new Set());
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: routeStart,
        destination: routeEnd,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirectionsResponse(result);

          const routePath = result.routes[0].overview_path;
          const nearbyRadars = new Set<string>();

          data.forEach((radar) => {
            const radarPos = new google.maps.LatLng(
              radar.suradnice.lat,
              radar.suradnice.lng
            );

            for (const point of routePath) {
              const distance =
                google.maps.geometry.spherical.computeDistanceBetween(
                  radarPos,
                  point
                );
              if (distance < 5000) {
                nearbyRadars.add(radar.id);
                break;
              }
            }
          });

          setRadarsOnRoute(nearbyRadars);
        } else {
          setDirectionsResponse(null);
          setRadarsOnRoute(new Set());
        }
      }
    );
  }, [isLoaded, map, routeStart, routeEnd, data]);

  if (!isLoaded) {
    return (
      <Card className="w-full h-[600px] flex items-center justify-center">
        <p className="text-muted-foreground">Načítava sa mapa...</p>
      </Card>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={centerSlovakia}
      zoom={8}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        streetViewControl: false,
        mapTypeControl: true,
        fullscreenControl: true,
        zoomControl: true,
      }}
    >
      {directionsResponse && (
        <DirectionsRenderer
          directions={directionsResponse}
          options={{
            polylineOptions: {
              strokeColor: "#2563eb",
              strokeWeight: 5,
              strokeOpacity: 0.8,
            },
          }}
        />
      )}

      {data.map((radar) => {
        const isOnRoute = radarsOnRoute.has(radar.id);

        return (
          <Marker
            key={radar.id}
            position={{
              lat: radar.suradnice.lat,
              lng: radar.suradnice.lng,
            }}
            onClick={() => onMarkerClick(radar)}
            title={`${radar.mesto} - ${radar.lokalita}`}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: MARKER_COLORS[radar.typMerania],
              fillOpacity: isOnRoute ? 1.0 : 0.7,
              strokeColor: isOnRoute
                ? "#ffffff"
                : MARKER_COLORS[radar.typMerania],
              strokeWeight: isOnRoute ? 3 : 1,
              scale: isOnRoute ? 12 : 8,
            }}
          />
        );
      })}
    </GoogleMap>
  );
}
