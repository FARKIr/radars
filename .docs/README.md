# Radary SK - Plánovanie trás s radarmi

Moderná Next.js aplikácia s OpenStreetMap pre plánovanie trás a zobrazenie radarov na Slovensku.

## Technológie

- **Next.js 14** (App Router)
- **React 18** + **TypeScript**
- **Tailwind CSS** - styling
- **shadcn/ui** - moderné UI komponenty
- **OpenStreetMap + Leaflet** (react-leaflet) - interaktívna mapa
- **OSRM** - routing bez API kľúča
- **Nominatim** - geokódovanie bez API kľúča
- **Lucide React** - ikony
- **Sonner** - notifikácie

## Funkcie

- ✅ **OpenStreetMap integrácia** - plnohodnotná mapa s GPS súradnicami (bez API kľúča)
- ✅ **Route planning** - plánovanie trás medzi mestami pomocou OSRM (default: Košice → Bratislava)
- ✅ **Zvýraznenie radarov na trase** - radary v blízkosti trasy (200m) sú zvýraznené
- ✅ **Info o trase** - vzdialenosť, čas jazdy, počet radarov na trase
- ✅ **Filtrovanie** - podľa regiónu, triedy cesty, typu merania
- ✅ **Vyhľadávanie** - fulltext vyhľadávanie miest a lokalít
- ✅ **Detailný pohľad** - GPS súradnice, kopírovanie údajov
- ✅ **Moderný header** - prehľad zobrazených radarov
- ✅ **Responzívny dizajn** - funguje na mobile aj desktop
- ✅ 39 radarov s GPS súradnicami

## Inštalácia a spustenie

```bash
# 1. Nainštalovať závislosti
npm install

# 2. Spustiť vývojový server
npm run dev

# Build pre produkciu
npm run build

# Spustiť produkčnú verziu
npm start
```

Aplikácia bude dostupná na `http://localhost:3000`

### Mapové služby (100% bezplatné)

Aplikácia využíva nasledujúce bezplatné služby **bez potreby API kľúčov**:

- **Mapy**: [OpenStreetMap](https://www.openstreetmap.org/) - dlaždice máp
- **Routing**: [OSRM](https://project-osrm.org/) - výpočet trás (public endpoint)
- **Geokódovanie**: [Nominatim](https://nominatim.openstreetmap.org/) - konverzia adries na GPS súradnice

## Štruktúra projektu

```
src/
├── app/
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Hlavná stránka s mapou
│   └── globals.css        # Globálne štýly
├── components/
│   ├── ui/                # shadcn/ui komponenty
│   └── radary/
│       ├── MapaRadary.tsx           # Leaflet/OSM mapa
│       ├── HeaderNavigation.tsx     # Header s prehľadom
│       ├── RoutePanel.tsx           # Plánovanie trás
│       ├── FilterSidebar.tsx        # Bočný panel filtrov
│       ├── ZoznamKariet.tsx         # Zoznam radarov
│       └── DetailRadaru.tsx         # Detail radaru
├── data/
│   └── radary.ts          # 39 radarov s GPS súradnicami
└── lib/
    ├── filtre.ts          # Filtrovacie funkcie
    ├── mapa.ts            # Geokódovanie, routing, vzdialenosti
    └── utils.ts           # Utility funkcie
```

## Dáta

Aplikácia obsahuje **39 záznamov** radarov zo všetkých regiónov Slovenska:

- **Západ**: 18 lokalít
- **Stred**: 10 lokalít
- **Východ**: 11 lokalít

Typy meraní:

- Rýchlosť
- Semafor
- Semafor + Rýchlosť
- Červená na semafore

## Použitie

### Plánovanie trasy

1. **Zadajte začiatočný bod** (napr. Košice) - default už nastavený
2. **Zadajte cieľový bod** (napr. Bratislava) - default už nastavený
3. **Kliknite "Plánovať trasu"** - mapa zobrazí trasu a zvýrazní radary v blízkosti
4. **Radary na trase** - sú zvýraznené väčšími markermi s bielym obrysom

### Navigácia na mape

- **Zoom**: Koliesko myši alebo +/- tlačidlá
- **Posúvanie**: Ťahajte mapu myšou
- **Klik na marker**: Zobrazí detail radaru
- **Marker farby**:
  - 🔵 Modrá = Rýchlosť
  - 🟠 Oranžová = Semafor
  - 🟣 Fialová = Semafor + Rýchlosť
  - 🔴 Červená = Červená na semafore

### Filtrovanie

1. **Vyhľadávanie**: Zadajte názov mesta alebo cesty v ľavom paneli
2. **Región**: Kliknite na región (Západ/Stred/Východ)
3. **Typ merania**: Vyberte typy, ktoré chcete vidieť
4. **Trieda cesty**: Filtrujte podľa I/XX alebo II/XXX

## Rozšírenie dát

Pre pridanie nových záznamov upravte súbor `src/data/radary.ts`:

```typescript
{
  id: "40",
  mesto: "Nové Mesto",
  triedaCesty: "I/XX",
  cesta: "I/XX",
  lokalita: "Popis lokality",
  typMerania: TypMerania.RYCHLOST,
  region: Region.ZAPAD,
  suradnice: null
}
```

## Licencia

MIT
