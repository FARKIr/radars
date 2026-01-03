export enum TypMerania {
  RYCHLOST = "rychlost",
  SEMAFOR = "semafor",
  SEMAFOR_RYCHLOST = "semafor_rychlost",
  CERVENA = "cervena",
}

export enum Region {
  ZAPAD = "Západ",
  STRED = "Stred",
  VYCHOD = "Východ",
}

export interface RadarZaznam {
  id: string;
  mesto: string;
  triedaCesty: string;
  cesta: string;
  lokalita: string;
  typMerania: TypMerania;
  region: Region;
  suradnice: null;
}

const CELKOVY_POCET_MIEST = 279;

const regionMapping: Record<string, Region> = {
  Bratislava: Region.ZAPAD,
  "Svätý Jur": Region.ZAPAD,
  Trenčín: Region.ZAPAD,
  "Trnovec nad Váhom": Region.ZAPAD,
  "Zlaté Moravce": Region.ZAPAD,
  Vráble: Region.ZAPAD,
  Šaľa: Region.ZAPAD,
  Komárno: Region.ZAPAD,
  Malacky: Region.ZAPAD,
  "Dunajská Streda": Region.ZAPAD,
  Galanta: Region.ZAPAD,
  Hlohovec: Region.ZAPAD,
  Piešťany: Region.ZAPAD,
  "Nové Zámky": Region.ZAPAD,
  Levice: Region.ZAPAD,
  Púchov: Region.ZAPAD,
  "Považská Bystrica": Region.ZAPAD,
  Žilina: Region.ZAPAD,
  "Banská Bystrica": Region.STRED,
  Lučenec: Region.STRED,
  "Rimavská Sobota": Region.STRED,
  Martin: Region.STRED,
  Ružomberok: Region.STRED,
  Zvolen: Region.STRED,
  Brezno: Region.STRED,
  "Dolný Kubín": Region.STRED,
  Prievidza: Region.STRED,
  "Žiar nad Hronom": Region.STRED,
  Prešov: Region.VYCHOD,
  Košice: Region.VYCHOD,
  Poprad: Region.VYCHOD,
  Kežmarok: Region.VYCHOD,
  Bardejov: Region.VYCHOD,
  "Vranov nad Topľou": Region.VYCHOD,
  Humenné: Region.VYCHOD,
  Michalovce: Region.VYCHOD,
  "Spišská Nová Ves": Region.VYCHOD,
  Trebišov: Region.VYCHOD,
};

function parseTypMerania(lokalita: string): TypMerania {
  const lower = lokalita.toLowerCase();
  if (
    lower.includes("semafor + rýchlosť") ||
    lower.includes("semafor+rýchlosť")
  ) {
    return TypMerania.SEMAFOR_RYCHLOST;
  }
  if (lower.includes("červená na semafore")) {
    return TypMerania.CERVENA;
  }
  if (lower.includes("semafor") && !lower.includes("rýchlosť")) {
    return TypMerania.SEMAFOR;
  }
  return TypMerania.RYCHLOST;
}

export const RADARY_DATA: RadarZaznam[] = [
  {
    id: "1",
    mesto: "Bratislava",
    triedaCesty: "I/61",
    cesta: "I/61",
    lokalita: "Bajkalská × Trnavská cesta (semafor + rýchlosť)",
    typMerania: TypMerania.SEMAFOR_RYCHLOST,
    region: regionMapping["Bratislava"],
    suradnice: null,
  },
  {
    id: "2",
    mesto: "Bratislava",
    triedaCesty: "I/61",
    cesta: "I/61",
    lokalita: "Stará senecká cesta, nadchod pre chodcov (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Bratislava"],
    suradnice: null,
  },
  {
    id: "3",
    mesto: "Svätý Jur",
    triedaCesty: "II/502",
    cesta: "II/502",
    lokalita: "Križovatka Kačačince, smer Bratislava (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Svätý Jur"],
    suradnice: null,
  },
  {
    id: "4",
    mesto: "Banská Bystrica",
    triedaCesty: "I/66",
    cesta: "I/66",
    lokalita: "Nábrežná komunikácia, oproti autobusovej stanici (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Banská Bystrica"],
    suradnice: null,
  },
  {
    id: "5",
    mesto: "Žilina",
    triedaCesty: "I/60",
    cesta: "I/60",
    lokalita: "Bernolákova ulica (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Žilina"],
    suradnice: null,
  },
  {
    id: "6",
    mesto: "Lučenec",
    triedaCesty: "I/75",
    cesta: "I/75",
    lokalita: "Časť Opatová, smer centrum (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Lučenec"],
    suradnice: null,
  },
  {
    id: "7",
    mesto: "Prešov",
    triedaCesty: "I/68",
    cesta: "I/68",
    lokalita: "Ulica Pod Kalváriou, pri priechode pre chodcov (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Prešov"],
    suradnice: null,
  },
  {
    id: "8",
    mesto: "Košice",
    triedaCesty: "II/547",
    cesta: "II/547",
    lokalita: "Križovatka Hlinkova – Národná trieda (červená na semafore)",
    typMerania: TypMerania.CERVENA,
    region: regionMapping["Košice"],
    suradnice: null,
  },
  {
    id: "9",
    mesto: "Trenčín",
    triedaCesty: "I/61",
    cesta: "I/61",
    lokalita: "Ul. gen. M. R. Štefánika, pri Merine (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Trenčín"],
    suradnice: null,
  },
  {
    id: "10",
    mesto: "Trnovec nad Váhom",
    triedaCesty: "I/75",
    cesta: "I/75",
    lokalita: "Hlavný úsek cez obec (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Trnovec nad Váhom"],
    suradnice: null,
  },
  {
    id: "11",
    mesto: "Zlaté Moravce",
    triedaCesty: "II/511",
    cesta: "II/511",
    lokalita: "Hlavný ťah cez mesto (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Zlaté Moravce"],
    suradnice: null,
  },
  {
    id: "12",
    mesto: "Vráble",
    triedaCesty: "I/51",
    cesta: "I/51",
    lokalita: "Levická ulica (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Vráble"],
    suradnice: null,
  },
  {
    id: "13",
    mesto: "Šaľa",
    triedaCesty: "I/75",
    cesta: "I/75",
    lokalita: "Nitrianska ulica (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Šaľa"],
    suradnice: null,
  },
  {
    id: "14",
    mesto: "Komárno",
    triedaCesty: "I/63",
    cesta: "I/63",
    lokalita: "Úsek pri 98,5 km (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Komárno"],
    suradnice: null,
  },
  {
    id: "15",
    mesto: "Rimavská Sobota",
    triedaCesty: "I/16",
    cesta: "I/16",
    lokalita: "Ožďany – Čierna Lúka (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Rimavská Sobota"],
    suradnice: null,
  },
  {
    id: "16",
    mesto: "Malacky",
    triedaCesty: "I/2",
    cesta: "I/2",
    lokalita: "Smer od diaľnice D2 (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Malacky"],
    suradnice: null,
  },
  {
    id: "17",
    mesto: "Dunajská Streda",
    triedaCesty: "I/63",
    cesta: "I/63",
    lokalita: "Hlavný ťah pri nákupnej zóne (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Dunajská Streda"],
    suradnice: null,
  },
  {
    id: "18",
    mesto: "Galanta",
    triedaCesty: "I/75",
    cesta: "I/75",
    lokalita: "Obchvat mesta, križovatka s II/507 (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Galanta"],
    suradnice: null,
  },
  {
    id: "19",
    mesto: "Hlohovec",
    triedaCesty: "II/513",
    cesta: "II/513",
    lokalita: "Smer od Trakovíc (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Hlohovec"],
    suradnice: null,
  },
  {
    id: "20",
    mesto: "Piešťany",
    triedaCesty: "I/61",
    cesta: "I/61",
    lokalita: "Žilinská cesta (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Piešťany"],
    suradnice: null,
  },
  {
    id: "21",
    mesto: "Nové Zámky",
    triedaCesty: "I/64",
    cesta: "I/64",
    lokalita: "Komárňanská cesta (semafor + rýchlosť)",
    typMerania: TypMerania.SEMAFOR_RYCHLOST,
    region: regionMapping["Nové Zámky"],
    suradnice: null,
  },
  {
    id: "22",
    mesto: "Levice",
    triedaCesty: "I/51",
    cesta: "I/51",
    lokalita: "Kalnická cesta (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Levice"],
    suradnice: null,
  },
  {
    id: "23",
    mesto: "Púchov",
    triedaCesty: "I/49",
    cesta: "I/49",
    lokalita: "Smer od Beluše (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Púchov"],
    suradnice: null,
  },
  {
    id: "24",
    mesto: "Považská Bystrica",
    triedaCesty: "I/61",
    cesta: "I/61",
    lokalita: "Centrum, pri hlavnej križovatke (semafor)",
    typMerania: TypMerania.SEMAFOR,
    region: regionMapping["Považská Bystrica"],
    suradnice: null,
  },
  {
    id: "25",
    mesto: "Martin",
    triedaCesty: "I/18",
    cesta: "I/18",
    lokalita: "Úsek pri vjazde od Vrútok (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Martin"],
    suradnice: null,
  },
  {
    id: "26",
    mesto: "Ružomberok",
    triedaCesty: "I/18",
    cesta: "I/18",
    lokalita: "Nábrežie M. R. Štefánika (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Ružomberok"],
    suradnice: null,
  },
  {
    id: "27",
    mesto: "Zvolen",
    triedaCesty: "I/16",
    cesta: "I/16",
    lokalita: "Lučenecká cesta, pri vjazde do mesta (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Zvolen"],
    suradnice: null,
  },
  {
    id: "28",
    mesto: "Brezno",
    triedaCesty: "I/66",
    cesta: "I/66",
    lokalita: "Smer od Banskej Bystrice (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Brezno"],
    suradnice: null,
  },
  {
    id: "29",
    mesto: "Dolný Kubín",
    triedaCesty: "I/70",
    cesta: "I/70",
    lokalita: "Hlavný úsek cez mesto (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Dolný Kubín"],
    suradnice: null,
  },
  {
    id: "30",
    mesto: "Prievidza",
    triedaCesty: "I/64",
    cesta: "I/64",
    lokalita: "Nábrežná ulica (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Prievidza"],
    suradnice: null,
  },
  {
    id: "31",
    mesto: "Žiar nad Hronom",
    triedaCesty: "I/65",
    cesta: "I/65",
    lokalita: "Hlavný ťah, smer Handlová (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Žiar nad Hronom"],
    suradnice: null,
  },
  {
    id: "32",
    mesto: "Poprad",
    triedaCesty: "I/18",
    cesta: "I/18",
    lokalita: "Alžbetina ulica (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Poprad"],
    suradnice: null,
  },
  {
    id: "33",
    mesto: "Kežmarok",
    triedaCesty: "I/66",
    cesta: "I/66",
    lokalita: "Smer od Popradu (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Kežmarok"],
    suradnice: null,
  },
  {
    id: "34",
    mesto: "Bardejov",
    triedaCesty: "I/77",
    cesta: "I/77",
    lokalita: "Smer od Prešova (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Bardejov"],
    suradnice: null,
  },
  {
    id: "35",
    mesto: "Vranov nad Topľou",
    triedaCesty: "I/18",
    cesta: "I/18",
    lokalita: "Duklianskych hrdinov (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Vranov nad Topľou"],
    suradnice: null,
  },
  {
    id: "36",
    mesto: "Humenné",
    triedaCesty: "I/74",
    cesta: "I/74",
    lokalita: "Štefánikova ulica (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Humenné"],
    suradnice: null,
  },
  {
    id: "37",
    mesto: "Michalovce",
    triedaCesty: "I/19",
    cesta: "I/19",
    lokalita: "Močarianska ulica (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Michalovce"],
    suradnice: null,
  },
  {
    id: "38",
    mesto: "Spišská Nová Ves",
    triedaCesty: "II/536",
    cesta: "II/536",
    lokalita: "Smer od Levoče (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Spišská Nová Ves"],
    suradnice: null,
  },
  {
    id: "39",
    mesto: "Trebišov",
    triedaCesty: "I/79",
    cesta: "I/79",
    lokalita: "Smer od Sečoviec (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Trebišov"],
    suradnice: null,
  },
];

export { CELKOVY_POCET_MIEST };

export function getUnikatneTriedyCiest(): string[] {
  const triedy = new Set(RADARY_DATA.map((r) => r.triedaCesty));
  return Array.from(triedy).sort();
}

export function getMestaPoRegionoch(): Record<Region, string[]> {
  const result: Record<Region, string[]> = {
    [Region.ZAPAD]: [],
    [Region.STRED]: [],
    [Region.VYCHOD]: [],
  };

  const mestaSets: Record<Region, Set<string>> = {
    [Region.ZAPAD]: new Set(),
    [Region.STRED]: new Set(),
    [Region.VYCHOD]: new Set(),
  };

  RADARY_DATA.forEach((r) => {
    mestaSets[r.region].add(r.mesto);
  });

  Object.keys(mestaSets).forEach((region) => {
    result[region as Region] = Array.from(mestaSets[region as Region]).sort();
  });

  return result;
}
