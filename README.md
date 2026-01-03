# Radary - Evidencia a vyhľadávanie miest s radarmi

Moderná, responzívna Next.js aplikácia pre evidenciu a vyhľadávanie miest s radarmi na Slovensku.

## Technológie

- **Next.js 14** (App Router)
- **React 18** + **TypeScript**
- **Tailwind CSS** - styling
- **shadcn/ui** - UI komponenty
- **@antv/x6** - interaktívna grafová vizualizácia
- **Lucide React** - ikony
- **Sonner** - toast notifikácie

## Funkcie

- ✅ Interaktívna mapová vizualizácia (graf s uzlami)
- ✅ Rýchle vyhľadávanie (fulltext)
- ✅ Filtrovanie podľa regiónu, triedy cesty, typu merania
- ✅ Triedenie výsledkov
- ✅ Prepínanie zobrazenia (karty / tabuľka)
- ✅ Detailný pohľad s kopírovaním údajov
- ✅ Export do CSV a JSON
- ✅ Štatistiky a súhrny
- ✅ Plne responzívny dizajn
- ✅ Lokálne dáta (bez databázy)

## Inštalácia

```bash
# Nainštalovať závislosti
npm install

# Spustiť vývojový server
npm run dev

# Build pre produkciu
npm run build

# Spustiť produkčnú verziu
npm start
```

Aplikácia bude dostupná na `http://localhost:3000`

## Štruktúra projektu

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Hlavná stránka
│   └── globals.css        # Globálne štýly
├── components/
│   ├── ui/                # shadcn/ui komponenty
│   └── radary/            # Aplikačné komponenty
│       ├── InteraktivnaHlavaX6.tsx
│       ├── PanelFiltrov.tsx
│       ├── ZoznamKariet.tsx
│       ├── TabulkaRadary.tsx
│       ├── DetailRadaru.tsx
│       ├── SummaryStatistiky.tsx
│       └── ExportTlacidla.tsx
├── data/
│   └── radary.ts          # Dátový model a dáta
└── lib/
    ├── filtre.ts          # Filtrovacie funkcie
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

1. **Interaktívna mapa**: Kliknite na uzol mesta pre automatické filtrovanie
2. **Vyhľadávanie**: Zadajte mesto, cestu alebo lokalitu
3. **Filtre**: Použite dropdown menu pre filtrovanie
4. **Zobrazenie**: Prepnite medzi kartami a tabuľkou
5. **Detail**: Kliknite na záznam pre zobrazenie detailu
6. **Export**: Exportujte filtrované výsledky do CSV alebo JSON

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
