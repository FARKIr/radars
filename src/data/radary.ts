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

export interface Suradnice {
  lat: number;
  lng: number;
}

export interface RadarZaznam {
  id: string;
  mesto: string;
  triedaCesty: string;
  cesta: string;
  lokalita: string;
  typMerania: TypMerania;
  region: Region;
  suradnice: Suradnice;
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
  Rozhanovce: Region.VYCHOD,
  "Spišské Vlachy": Region.VYCHOD,
  Letanovce: Region.VYCHOD,
  Oľšavka: Region.VYCHOD,
  "Veľký Blh": Region.STRED,
  Lúčky: Region.STRED,
  "Dobrá Niva": Region.STRED,
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
    lokalita: "Bajkalská × Trnavská cesta (červená na semafore)",
    typMerania: TypMerania.CERVENA,
    region: regionMapping["Bratislava"],
    suradnice: { lat: 48.1623986806, lng: 17.1413830026 },
  },
  {
    id: "2",
    mesto: "Bratislava",
    triedaCesty: "I/61",
    cesta: "I/61",
    lokalita: "Stará senecká cesta, nadchod pre chodcov (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Bratislava"],
    suradnice: { lat: 48.1851853, lng: 17.1778479 },
  },
  {
    id: "3",
    mesto: "Svätý Jur",
    triedaCesty: "II/502",
    cesta: "II/502",
    lokalita: "Križovatka Kačačince, smer Bratislava (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Svätý Jur"],
    suradnice: { lat: 48.2541666667, lng: 17.2213888889 },
  },
  {
    id: "4",
    mesto: "Banská Bystrica",
    triedaCesty: "I/66",
    cesta: "I/66",
    lokalita: "Nábrežná komunikácia, oproti autobusovej stanici (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Banská Bystrica"],
    suradnice: { lat: 48.7348507, lng: 19.1590073 },
  },
  {
    id: "5",
    mesto: "Žilina",
    triedaCesty: "I/60",
    cesta: "I/60",
    lokalita: "Bernolákova ulica (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Žilina"],
    suradnice: { lat: 49.2182035, lng: 18.7409503 },
  },
  {
    id: "6",
    mesto: "Lučenec",
    triedaCesty: "I/75",
    cesta: "I/75",
    lokalita: "Časť Opatová, smer centrum (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Lučenec"],
    suradnice: { lat: 48.3376964, lng: 19.6818018 },
  },
  {
    id: "7",
    mesto: "Prešov",
    triedaCesty: "I/68",
    cesta: "I/68",
    lokalita: "Ulica Pod Kalváriou, pri priechode pre chodcov (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Prešov"],
    suradnice: { lat: 48.987596, lng: 21.22901 },
  },
  {
    id: "8",
    mesto: "Košice",
    triedaCesty: "II/547",
    cesta: "II/547",
    lokalita: "Križovatka Hlinkova – Národná trieda (červená na semafore)",
    typMerania: TypMerania.CERVENA,
    region: regionMapping["Košice"],
    suradnice: { lat: 48.7376823, lng: 21.2528833 },
  },
  {
    id: "9",
    mesto: "Trenčín",
    triedaCesty: "I/61",
    cesta: "I/61",
    lokalita: "Ul. gen. M. R. Štefánika, pri Merine (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Trenčín"],
    suradnice: { lat: 48.8919444444, lng: 18.0575 },
  },
  {
    id: "10",
    mesto: "Trnovec nad Váhom",
    triedaCesty: "I/75",
    cesta: "I/75",
    lokalita: "Hlavný úsek cez obec (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Trnovec nad Váhom"],
    suradnice: { lat: 48.1510531265, lng: 17.9255013983 },
  },
  {
    id: "11",
    mesto: "Zlaté Moravce",
    triedaCesty: "II/511",
    cesta: "II/511",
    lokalita: "Hlavný ťah cez mesto (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Zlaté Moravce"],
    suradnice: { lat: 48.3612350591, lng: 18.414872401 },
  },
  {
    id: "12",
    mesto: "Vráble",
    triedaCesty: "I/51",
    cesta: "I/51",
    lokalita: "Levická ulica (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Vráble"],
    suradnice: { lat: 48.3050789854, lng: 18.3083838447 },
  },
  {
    id: "13",
    mesto: "Šaľa",
    triedaCesty: "I/75",
    cesta: "I/75",
    lokalita: "Nitrianska ulica (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Šaľa"],
    suradnice: { lat: 48.1522648067, lng: 17.878850547 },
  },
  {
    id: "14",
    mesto: "Komárno",
    triedaCesty: "I/63",
    cesta: "I/63",
    lokalita: "Úsek pri 98,5 km (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Komárno"],
    suradnice: { lat: 47.76493, lng: 18.08977 },
  },
  {
    id: "15",
    mesto: "Rimavská Sobota",
    triedaCesty: "I/16",
    cesta: "I/16",
    lokalita: "Ožďany – Čierna Lúka (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Rimavská Sobota"],
    suradnice: { lat: 48.3833, lng: 20.0167 },
  },
  {
    id: "16",
    mesto: "Malacky",
    triedaCesty: "I/2",
    cesta: "I/2",
    lokalita: "Smer od diaľnice D2 (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Malacky"],
    suradnice: { lat: 48.4304015, lng: 17.0425571 },
  },
  {
    id: "17",
    mesto: "Dunajská Streda",
    triedaCesty: "I/63",
    cesta: "I/63",
    lokalita: "Hlavný ťah pri nákupnej zóne (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Dunajská Streda"],
    suradnice: { lat: 47.9931, lng: 17.6169 },
  },
  {
    id: "18",
    mesto: "Galanta",
    triedaCesty: "I/75",
    cesta: "I/75",
    lokalita: "Obchvat mesta, križovatka s II/507 (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Galanta"],
    suradnice: { lat: 48.1897, lng: 17.7283 },
  },
  {
    id: "19",
    mesto: "Hlohovec",
    triedaCesty: "II/513",
    cesta: "II/513",
    lokalita: "Smer od Trakovíc (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Hlohovec"],
    suradnice: { lat: 48.4308, lng: 17.8047 },
  },
  {
    id: "20",
    mesto: "Piešťany",
    triedaCesty: "I/61",
    cesta: "I/61",
    lokalita: "Žilinská cesta (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Piešťany"],
    suradnice: { lat: 48.5968559341, lng: 17.8379255596 },
  },
  {
    id: "21",
    mesto: "Nové Zámky",
    triedaCesty: "I/64",
    cesta: "I/64",
    lokalita: "Komárňanská cesta (semafor + rýchlosť)",
    typMerania: TypMerania.SEMAFOR_RYCHLOST,
    region: regionMapping["Nové Zámky"],
    suradnice: { lat: 47.9699661558, lng: 18.1829462078 },
  },
  {
    id: "22",
    mesto: "Levice",
    triedaCesty: "I/51",
    cesta: "I/51",
    lokalita: "Kalnická cesta (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Levice"],
    suradnice: { lat: 48.227285, lng: 18.591276 },
  },
  {
    id: "23",
    mesto: "Púchov",
    triedaCesty: "I/49",
    cesta: "I/49",
    lokalita: "Smer od Beluše (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Púchov"],
    suradnice: { lat: 49.1242, lng: 18.3258 },
  },
  {
    id: "24",
    mesto: "Považská Bystrica",
    triedaCesty: "I/61",
    cesta: "I/61",
    lokalita: "Centrum, pri hlavnej križovatke (semafor)",
    typMerania: TypMerania.SEMAFOR,
    region: regionMapping["Považská Bystrica"],
    suradnice: { lat: 49.1208, lng: 18.4464 },
  },
  {
    id: "25",
    mesto: "Martin",
    triedaCesty: "I/18",
    cesta: "I/18",
    lokalita: "Úsek pri vjazde od Vrútok (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Martin"],
    suradnice: { lat: 49.0639, lng: 18.9214 },
  },
  {
    id: "26",
    mesto: "Ružomberok",
    triedaCesty: "I/18",
    cesta: "I/18",
    lokalita: "Nábrežie M. R. Štefánika (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Ružomberok"],
    suradnice: { lat: 49.0817309952, lng: 19.3084357758 },
  },
  {
    id: "27",
    mesto: "Zvolen",
    triedaCesty: "I/16",
    cesta: "I/16",
    lokalita: "Lučenecká cesta, pri vjazde do mesta (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Zvolen"],
    suradnice: { lat: 48.5704383479, lng: 19.1924276867 },
  },
  {
    id: "28",
    mesto: "Brezno",
    triedaCesty: "I/66",
    cesta: "I/66",
    lokalita: "Smer od Banskej Bystrice (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Brezno"],
    suradnice: { lat: 48.8044, lng: 19.6369 },
  },
  {
    id: "29",
    mesto: "Dolný Kubín",
    triedaCesty: "I/70",
    cesta: "I/70",
    lokalita: "Hlavný úsek cez mesto (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Dolný Kubín"],
    suradnice: { lat: 49.2103, lng: 19.3014 },
  },
  {
    id: "30",
    mesto: "Prievidza",
    triedaCesty: "I/64",
    cesta: "I/64",
    lokalita: "Nábrežná ulica (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Prievidza"],
    suradnice: { lat: 48.779490104, lng: 18.6104765484 },
  },
  {
    id: "31",
    mesto: "Žiar nad Hronom",
    triedaCesty: "I/65",
    cesta: "I/65",
    lokalita: "Hlavný ťah, smer Handlová (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Žiar nad Hronom"],
    suradnice: { lat: 48.59, lng: 18.8567 },
  },
  {
    id: "32",
    mesto: "Poprad",
    triedaCesty: "I/18",
    cesta: "I/18",
    lokalita: "Alžbetina ulica (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Poprad"],
    suradnice: { lat: 49.0593329356, lng: 20.293885852 },
  },
  {
    id: "33",
    mesto: "Kežmarok",
    triedaCesty: "I/66",
    cesta: "I/66",
    lokalita: "Smer od Popradu (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Kežmarok"],
    suradnice: { lat: 49.1353, lng: 20.4333 },
  },
  {
    id: "34",
    mesto: "Bardejov",
    triedaCesty: "I/77",
    cesta: "I/77",
    lokalita: "Smer od Prešova (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Bardejov"],
    suradnice: { lat: 49.2942, lng: 21.2747 },
  },
  {
    id: "35",
    mesto: "Vranov nad Topľou",
    triedaCesty: "I/18",
    cesta: "I/18",
    lokalita: "Duklianskych hrdinov (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Vranov nad Topľou"],
    suradnice: { lat: 48.8888559, lng: 21.6798655 },
  },
  {
    id: "36",
    mesto: "Humenné",
    triedaCesty: "I/74",
    cesta: "I/74",
    lokalita: "Štefánikova ulica (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Humenné"],
    suradnice: { lat: 48.9361186021, lng: 21.9048400077 },
  },
  {
    id: "37",
    mesto: "Michalovce",
    triedaCesty: "I/19",
    cesta: "I/19",
    lokalita: "Močarianska ulica (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Michalovce"],
    suradnice: { lat: 48.7376334125, lng: 21.8892243745 },
  },
  {
    id: "38",
    mesto: "Spišská Nová Ves",
    triedaCesty: "II/536",
    cesta: "II/536",
    lokalita: "Smer od Levoče (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Spišská Nová Ves"],
    suradnice: { lat: 48.9433, lng: 20.5647 },
  },
  {
    id: "39",
    mesto: "Trebišov",
    triedaCesty: "I/79",
    cesta: "I/79",
    lokalita: "Smer od Sečoviec (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Trebišov"],
    suradnice: { lat: 48.6256, lng: 21.7194 },
  },
  {
    id: "40",
    mesto: "Rozhanovce",
    triedaCesty: "I/68",
    cesta: "I/68",
    lokalita: "Úsek v obci (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Rozhanovce"],
    suradnice: { lat: 48.7546731999, lng: 21.3456314821 },
  },
  {
    id: "41",
    mesto: "Spišské Vlachy",
    triedaCesty: "I/18",
    cesta: "I/18",
    lokalita: "Úsek v obci (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Spišské Vlachy"],
    suradnice: { lat: 48.9457455172, lng: 20.8012161964 },
  },
  {
    id: "42",
    mesto: "Letanovce",
    triedaCesty: "II/536",
    cesta: "II/536",
    lokalita: "Úsek v obci (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Letanovce"],
    suradnice: { lat: 48.983554578, lng: 20.4676376773 },
  },
  {
    id: "43",
    mesto: "Oľšavka",
    triedaCesty: "II/536",
    cesta: "II/536",
    lokalita: "Okres SN, úsek v obci (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Oľšavka"],
    suradnice: { lat: 48.9630119793, lng: 20.8234726161 },
  },
  {
    id: "44",
    mesto: "Veľký Blh",
    triedaCesty: "I/16",
    cesta: "I/16",
    lokalita: "Úsek v obci (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Veľký Blh"],
    suradnice: { lat: 48.4443241, lng: 20.1144379 },
  },
  {
    id: "45",
    mesto: "Lúčky",
    triedaCesty: "II/584",
    cesta: "II/584",
    lokalita: "Okres RK, úsek v obci (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Lúčky"],
    suradnice: { lat: 49.1200439801, lng: 19.4108124474 },
  },
  {
    id: "46",
    mesto: "Dobrá Niva",
    triedaCesty: "I/66",
    cesta: "I/66",
    lokalita: "Úsek v obci (rýchlosť)",
    typMerania: TypMerania.RYCHLOST,
    region: regionMapping["Dobrá Niva"],
    suradnice: { lat: 48.4807411, lng: 19.1019929 },
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
