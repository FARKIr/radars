"use client";

import { RadarZaznam, TypMerania } from "@/data/radary";
import { Badge } from "@/components/ui/badge";

interface TabulkaRadaryProps {
  data: RadarZaznam[];
  onRiadokClick: (radar: RadarZaznam) => void;
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
  [TypMerania.CERVENA]: "Červená",
};

export function TabulkaRadary({ data, onRiadokClick }: TabulkaRadaryProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Žiadne výsledky</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Mesto
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Trieda cesty
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Lokalita
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Typ merania
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Región
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((radar) => (
              <tr
                key={radar.id}
                className="border-t hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => onRiadokClick(radar)}
              >
                <td className="px-4 py-3 font-medium">{radar.mesto}</td>
                <td className="px-4 py-3 text-sm">{radar.triedaCesty}</td>
                <td className="px-4 py-3 text-sm max-w-md truncate">
                  {radar.lokalita}
                </td>
                <td className="px-4 py-3">
                  <Badge
                    className={`${TYP_COLORS[radar.typMerania]} text-white`}
                  >
                    {TYP_LABELS[radar.typMerania]}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm">
                  <Badge variant="outline">{radar.region}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
