import { RadarZaznam, TypMerania, Region } from "@/data/radary";

export interface FiltreStav {
  vyhladavanie: string;
  region: Region | "all";
  triedaCesty: string | "all";
  typyMerania: TypMerania[];
  triedenie: "mesto" | "triedaCesty" | "typ";
}

export const INIT_FILTRE: FiltreStav = {
  vyhladavanie: "",
  region: "all",
  triedaCesty: "all",
  typyMerania: [],
  triedenie: "mesto",
};

export function filtrovatRadary(
  data: RadarZaznam[],
  filtre: FiltreStav
): RadarZaznam[] {
  let vysledok = [...data];

  if (filtre.vyhladavanie.trim()) {
    const query = filtre.vyhladavanie.toLowerCase().trim();
    vysledok = vysledok.filter(
      (r) =>
        r.mesto.toLowerCase().includes(query) ||
        r.cesta.toLowerCase().includes(query) ||
        r.lokalita.toLowerCase().includes(query) ||
        r.typMerania.toLowerCase().includes(query)
    );
  }

  if (filtre.region !== "all") {
    vysledok = vysledok.filter((r) => r.region === filtre.region);
  }

  if (filtre.triedaCesty !== "all") {
    vysledok = vysledok.filter((r) => r.triedaCesty === filtre.triedaCesty);
  }

  if (filtre.typyMerania.length > 0) {
    vysledok = vysledok.filter((r) =>
      filtre.typyMerania.includes(r.typMerania)
    );
  }

  return vysledok;
}

export function trieditRadary(
  data: RadarZaznam[],
  triedenie: FiltreStav["triedenie"]
): RadarZaznam[] {
  const sorted = [...data];

  switch (triedenie) {
    case "mesto":
      return sorted.sort((a, b) => a.mesto.localeCompare(b.mesto, "sk"));
    case "triedaCesty":
      return sorted.sort((a, b) => a.triedaCesty.localeCompare(b.triedaCesty));
    case "typ":
      return sorted.sort((a, b) => a.typMerania.localeCompare(b.typMerania));
    default:
      return sorted;
  }
}

export function aplikovatFiltreATriedenie(
  data: RadarZaznam[],
  filtre: FiltreStav
): RadarZaznam[] {
  const filtrovaneDat = filtrovatRadary(data, filtre);
  return trieditRadary(filtrovaneDat, filtre.triedenie);
}

export function getPocetPodlaTypu(
  data: RadarZaznam[]
): Record<TypMerania, number> {
  const pocty: Record<TypMerania, number> = {
    [TypMerania.RYCHLOST]: 0,
    [TypMerania.SEMAFOR]: 0,
    [TypMerania.SEMAFOR_RYCHLOST]: 0,
    [TypMerania.CERVENA]: 0,
  };

  data.forEach((r) => {
    pocty[r.typMerania]++;
  });

  return pocty;
}

export function getPocetPodlaRegionu(
  data: RadarZaznam[]
): Record<Region, number> {
  const pocty: Record<Region, number> = {
    [Region.ZAPAD]: 0,
    [Region.STRED]: 0,
    [Region.VYCHOD]: 0,
  };

  data.forEach((r) => {
    pocty[r.region]++;
  });

  return pocty;
}

export function exportToCSV(data: RadarZaznam[]): string {
  const headers = [
    "ID",
    "Mesto",
    "Trieda cesty",
    "Cesta",
    "Lokalita",
    "Typ merania",
    "Región",
    "Súradnice",
  ];
  const rows = data.map((r) => [
    r.id,
    r.mesto,
    r.triedaCesty,
    r.cesta,
    r.lokalita,
    r.typMerania,
    r.region,
    r.suradnice || "N/A",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  return csvContent;
}

export function exportToJSON(data: RadarZaznam[]): string {
  return JSON.stringify(data, null, 2);
}

export function downloadFile(
  content: string,
  filename: string,
  mimeType: string
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
