import { Suradnice } from "@/data/radary";

const ROUTE_PROXIMITY_THRESHOLD = 200;

interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
}

interface OSRMRoute {
  geometry: {
    coordinates: [number, number][];
  };
  distance: number;
  duration: number;
}

interface OSRMResponse {
  routes: OSRMRoute[];
  code: string;
}

interface GeocodeResult {
  lat: number;
  lng: number;
  displayName: string;
}

interface RouteResult {
  coordinates: [number, number][];
  distance: number;
  duration: number;
}

const geocodeCache = new Map<string, GeocodeResult>();
let geocodeDebounceTimer: NodeJS.Timeout | null = null;

export function getRouteProximityThreshold(): number {
  return ROUTE_PROXIMITY_THRESHOLD;
}

export async function geocodeAddress(
  address: string
): Promise<GeocodeResult | null> {
  const normalized = address.trim().toLowerCase();

  if (geocodeCache.has(normalized)) {
    return geocodeCache.get(normalized)!;
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?` +
        new URLSearchParams({
          q: address,
          format: "json",
          limit: "1",
          countrycodes: "sk",
        }),
      {
        headers: {
          "User-Agent": "RadarySK/1.0",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data: NominatimResult[] = await response.json();

    if (!data || data.length === 0) {
      return null;
    }

    const result: GeocodeResult = {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
      displayName: data[0].display_name,
    };

    geocodeCache.set(normalized, result);
    return result;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}

export async function geocodeAddressDebounced(
  address: string,
  delayMs: number = 500
): Promise<GeocodeResult | null> {
  return new Promise((resolve) => {
    if (geocodeDebounceTimer) {
      clearTimeout(geocodeDebounceTimer);
    }

    geocodeDebounceTimer = setTimeout(async () => {
      const result = await geocodeAddress(address);
      resolve(result);
    }, delayMs);
  });
}

export async function fetchRoute(
  start: Suradnice,
  end: Suradnice
): Promise<RouteResult | null> {
  try {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?` +
        new URLSearchParams({
          overview: "full",
          geometries: "geojson",
        })
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data: OSRMResponse = await response.json();

    if (data.code !== "Ok" || !data.routes || data.routes.length === 0) {
      return null;
    }

    const route = data.routes[0];
    return {
      coordinates: route.geometry.coordinates,
      distance: route.distance,
      duration: route.duration,
    };
  } catch (error) {
    console.error("Routing error:", error);
    return null;
  }
}

export function pointToLineDistance(
  point: Suradnice,
  lineCoords: [number, number][]
): number {
  let minDistance = Infinity;

  for (let i = 0; i < lineCoords.length - 1; i++) {
    const segmentStart: Suradnice = {
      lng: lineCoords[i][0],
      lat: lineCoords[i][1],
    };
    const segmentEnd: Suradnice = {
      lng: lineCoords[i + 1][0],
      lat: lineCoords[i + 1][1],
    };

    const distance = pointToSegmentDistance(point, segmentStart, segmentEnd);
    minDistance = Math.min(minDistance, distance);
  }

  return minDistance;
}

function pointToSegmentDistance(
  point: Suradnice,
  segStart: Suradnice,
  segEnd: Suradnice
): number {
  const A = point.lat - segStart.lat;
  const B = point.lng - segStart.lng;
  const C = segEnd.lat - segStart.lat;
  const D = segEnd.lng - segStart.lng;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;

  let param = -1;
  if (lenSq !== 0) {
    param = dot / lenSq;
  }

  let closestLat: number;
  let closestLng: number;

  if (param < 0) {
    closestLat = segStart.lat;
    closestLng = segStart.lng;
  } else if (param > 1) {
    closestLat = segEnd.lat;
    closestLng = segEnd.lng;
  } else {
    closestLat = segStart.lat + param * C;
    closestLng = segStart.lng + param * D;
  }

  return haversineDistance(point, { lat: closestLat, lng: closestLng });
}

function haversineDistance(coord1: Suradnice, coord2: Suradnice): number {
  const R = 6371000;
  const dLat = toRadians(coord2.lat - coord1.lat);
  const dLng = toRadians(coord2.lng - coord1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coord1.lat)) *
      Math.cos(toRadians(coord2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}
