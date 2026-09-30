# Auswahlseite „Klassenstufe → Fach → Inhalt“ – Vorgabe für alle LMG-Plattformen

Diese Datei beschreibt die Startseite der Plattform **Simulationen** so, dass ein anderer
Claude-Code-Agent sie auf die übrigen Plattformen übertragen kann (Spielesammlung,
Lerntheken, Trainer basale Kompetenzen, …). Ziel: Alle Plattformen der Fachschaft
Mathematik/Physik am Ludwig-Meyn-Gymnasium Uetersen sehen beim Einstieg gleich aus und
bedienen sich gleich.

**Referenz-Implementierung** (bei Unklarheiten gilt der Code, nicht diese Datei):

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: Schritt 1 Stufe, Schritt 2 Fach |
| `katalog.html` | Inhaltsseite mit Vorschau-Karten für eine Stufe + ein Fach |
| `assets/lmg.css` | Design-Tokens + alle Komponenten dieser Seiten |
| `simulationen.js` | Konfiguration (`PLATTFORM`) und Inhalte (`SIMULATIONEN`) |

- Lokal: `C:\Users\Anwender\OneDrive\Schule\Vorlagen\Simulationen\`
- Online: https://github.com/timkucz-cmyk/simulationen (Seite: https://timkucz-cmyk.github.io/simulationen/)

---

## 1. Grundidee

Schüler:innen kommen über einen Link oder QR-Code auf die Plattform und sollen **in zwei
Klicks** bei ihrem Material sein, ohne Dropdown-Menüs und ohne Suchfeld.

1. **Klassenstufe** als große Kacheln (5 bis 10, E, Q1, Q2).
2. **Fach** als zwei breite Kacheln (Mathematik rot, Physik blau).
3. Weiterleitung auf die Inhaltsseite der Plattform für genau diese Kombination.

Kacheln **ohne Inhalt bleiben sichtbar**, aber gedimmt, gestrichelt, nicht klickbar und mit
„noch leer“. So sieht man, dass die Plattform wächst, und niemand landet auf einer leeren Seite.

## 2. Design (LMG-Designsystem)

Quelle der Tokens: LMG-Designsystem auf claude.ai/design, lokal exportiert als
`colors_and_type.css` (z. B. `Schule\Claude_Code\polarisation_html\colors_and_type.css`).
`assets/lmg.css` übernimmt die Tokens 1:1. **Farben nur über diese Variablen**, keine
neuen Hex-Werte erfinden.

| Rolle | Token | Wert |
|---|---|---|
| Seitenhintergrund | `--surface-soft` | `#f6f6f4` |
| Kopf, Kacheln, Karten | `--surface-page` | `#ffffff` |
| Text | `--fg-1` / `--fg-2` / `--fg-3` / `--fg-4` | `#17181a` / `#3d4147` / `#646a72` / `#9097a0` |
| Linien | `--line-1` / `--line-2` / `--line-3` | `#e4e5e3` / `#cfd1cf` / `#a8acaa` |
| Mathematik | `--mathe`, `-soft`, `-line`, `-ink` | `#B61E33`, `#f5e1e3`, `#e8b8be`, `#6f0f1c` |
| Physik | `--physik`, `-soft`, `-line`, `-ink` | `#2C5282`, `#e8eef5`, `#b9c8da`, `#1d3a5c` |

- **Schrift:** Source Sans 3 (400/600/700) von Google Fonts, sonst keine externen Ressourcen.
- **Radien:** 6 px für Kacheln, 10 px für Vorschau-Karten, 999 px für Chips.
- **Schatten:** nur `--shadow-1` (ruhend) und `--shadow-3` (Hover). Keine farbigen Schatten.
- **Bewegung:** 180 ms, `cubic-bezier(0.22,0.61,0.36,1)`; Hover hebt um 2 bis 3 px an. Kein
  Bounce. `prefers-reduced-motion` schaltet alle Übergänge ab.
- **Fach-Akzent:** Die Klassen `.fach-mathe` / `.fach-physik` setzen `--accent*`. Komponenten
  benutzen nur `--accent`, `--accent-soft`, `--accent-line`, `--accent-ink`.
- **Markenlinie:** 4 px hoher Streifen ganz oben, links Mathe-Rot, rechts Physik-Blau
  (`.brandline`).
- Nur heller Modus (das Designsystem hat keine Dark-Tokens).

## 3. Aufbau der Startseite

```
┌────────────────────────────────────────────── (Markenlinie rot|blau)
│ LUDWIG-MEYN-GYMNASIUM UETERSEN        ← .kicker (Versalien, 0.12em)
│ Simulationen                          ← h1, 48 px, 700
│ Ein Satz, was es hier gibt.           ← .lead
├──────────────────────────────────────────────
│ ① In welcher Klassenstufe bist du?    ← .schritt-kopf mit .schritt-nr
│ SEKUNDARSTUFE I                        ← .gruppe
│ [5] [6] [7] [8] [9] [10]               ← .stufen: 6 Spalten (Handy: 3)
│ OBERSTUFE
│ [E] [Q1] [Q2]
│
│ ② Klasse 10: Welches Fach?            ← erscheint erst nach Wahl der Stufe
│ [▣ Mathematik  noch leer ] [▣ Physik  1 Simulation  →]
└──────────────────────────────────────────────
```

### Stufen-Kachel (`button.stufe`)

- Inhalt: große Zahl/Kürzel (44 px, 700), darunter „Klasse“ bzw. „Einführungsphase“,
  unten die Anzahl („1 Simulation“, „3 Spiele“, …) mit **farbigen Punkten**, einer pro
  Fach mit Inhalt.
- Zustände: normal (weiß, Hairline), Hover (angehoben, `--shadow-3`), gewählt
  (`aria-pressed="true"`: invertiert, Hintergrund `--fg-1`), leer
  (`aria-disabled="true"`: transparent, gestrichelt, `--fg-4`, keine Reaktion).
- Lange Wörter mit weichem Trennzeichen `\u00AD` in den Daten („Einführungs\u00ADphase“),
  nicht mit `hyphens:auto`, das bricht auf Android unschön.

### Fach-Kachel (`a.fach.fach-<id>`)

- Echter Link (`<a href>`), damit Zurück-Taste und „in neuem Tab öffnen“ funktionieren.
- Links 4 px Akzentbalken, Symbol-Feld 72 px mit `--accent-soft`, Fachname 26 px, Anzahl,
  rechts ein Pfeil, der beim Hover 4 px nach rechts rutscht.
- Leer: gestrichelt, grau, ohne `href`, `aria-disabled="true"`.
- Symbole als Inline-SVG mit `currentColor` (Mathe: Funktionsgraph im Koordinatensystem,
  Physik: Atom), stehen in der Konfiguration.

### Verhalten

- Klick auf Stufe → Schritt 2 wird eingeblendet und nur dann ins Bild gescrollt, wenn er
  unterhalb des sichtbaren Bereichs liegt.
- Die gewählte Stufe steht in der URL (`index.html?stufe=10`, per `history.replaceState`)
  und in `localStorage` (Schlüssel plattformspezifisch, z. B. `sim-letzte-stufe`), damit
  Schüler:innen beim nächsten Besuch ihre Stufe schon markiert vorfinden. Jeder
  `localStorage`-Zugriff in `try/catch`.
- Link-Ziel: `<zielseite>?stufe=<id>&fach=<id>`. Lehrkräfte können damit direkt verlinken
  oder einen QR-Code auf eine Kombination erzeugen.
- Alle Anzahlen werden aus den Daten **berechnet**, nie von Hand gepflegt.

## 4. Inhaltsseite (Katalog)

- Kopf: Brotkrumen („Simulationen › Klasse 10“, Link zurück auf `index.html?stufe=10`),
  h1 „Physik · Klasse 10“, darunter Chips zum Wechseln von Fach und Stufe (nur
  Kombinationen mit Inhalt, Chips nur ab zwei Optionen).
- Themen-Chips als Filter erst ab zwei verschiedenen Themen.
- Karten-Raster `repeat(auto-fill,minmax(290px,1fr))`. Jede Karte: Vorschaubild 16:10
  (`object-fit:cover; object-position:top`), Themen-Kicker in `--accent-ink`, Titel,
  Beschreibung (max. 3 Zeilen), Meta-Zeile mit Icons (Sozialform, Dauer).
- Fehlt das Vorschaubild, zeigt die Karte das Fach-Symbol auf `--accent-soft`.
- Badge „NEU“ für Einträge, deren `datum` höchstens 21 Tage zurückliegt. Sortierung:
  neueste zuerst.
- Ungültige oder fehlende Parameter → zurück auf `index.html`.

Bei Plattformen, deren Inhalt keine Kartenliste ist (Spiel, Trainer), ersetzt die
Plattform die Kartenliste durch ihren eigenen Inhalt. Kopf, Brotkrumen und Chips bleiben.

## 5. Datenmodell

Konfiguration und Inhalte in **einer `.js`-Datei** (nicht `.json`), damit die Seite auch
per Doppelklick von der Festplatte läuft (`fetch` ist bei `file://` gesperrt).

```js
window.PLATTFORM = {
  name: "Simulationen",                 // h1 und <title>
  untertitel: "…",                      // .lead
  schule: "Ludwig-Meyn-Gymnasium Uetersen",
  zielseite: "katalog.html",            // Ziel von Schritt 2
  stufen:  [{ id:"10", zahl:"10", name:"Klasse 10", gruppe:"Sekundarstufe I" }, …],
  faecher: [{ id:"physik", name:"Physik", symbol:'<svg …>' }, …]
};
window.SIMULATIONEN = [
  { id, titel, fach, stufen:["10"], thema, beschreibung, pfad, vorschau, sozialform, dauer, datum }
];
```

- `fach` muss eine `id` aus `faecher` sein; dieselbe `id` ist auch der CSS-Token-Name
  (`--physik`) und die Klasse (`.fach-physik`).
- `stufen` ist eine Liste: ein Inhalt kann in mehreren Stufen erscheinen.
- Für andere Plattformen die Liste passend umbenennen (z. B. `SPIELE`, `LERNTHEKEN`) und die
  Zählwörter („1 Spiel“ / „n Spiele“) anpassen.

## 6. Übertragung auf die anderen Plattformen

Vor dem Umbau die Plattform lesen (CLAUDE.md, vorhandene Datenstruktur), dann den passenden
Fall wählen. **Die bestehende Datenstruktur nicht umbauen**, sondern die Zählfunktionen
(`zaehle(stufe, fach)`) auf sie anpassen.

| Fall | Beispiel | Umsetzung |
|---|---|---|
| A: Stufen und Fächer vorhanden | Simulationen | wie beschrieben |
| B: rudimentäre Stufenauswahl vorhanden (Dropdown, Liste) | Spielesammlung (Fach → Stufe → Inhalt als `<select>`) | Dropdowns durch Schritt 1 und 2 ersetzen, Daten beibehalten. Danach die bisherige Inhaltsauswahl zeigen. |
| C: nur ein Fach | reiner Mathe-Trainer | Schritt 2 entfällt. Klick auf Stufe führt direkt zum Inhalt. Akzentfarbe des Fachs durchgehend. |
| D: noch ohne Stufen (ein Aufgabenkatalog) | Trainer basale Kompetenzen | Stufen trotzdem anlegen und den vorhandenen Katalog der passenden Stufe zuordnen (bei Unklarheit die Lehrkraft fragen). Die übrigen Kacheln zeigen „noch leer“. So ist die Plattform für neue Kataloge vorbereitet. |

Grundsatz: Eine Ebene fällt nur weg, wenn die Plattform auf ihr **grundsätzlich** nur eine
Option kennt (Fall C). Ist dagegen gerade nur eine Option befüllt, werden trotzdem alle
Kacheln gezeigt, die leeren gedimmt.

Wenn die Plattform eine einzige große `index.html` ist (Spielesammlung): Auswahl als
eigene Ansicht in derselben Datei umsetzen, CSS-Regeln aus `assets/lmg.css` übernehmen und
dort vorhandene gleichnamige Tokens nicht doppelt definieren. Die Plattform-Regel
„keine externen Libraries“ bleibt bestehen.

## 7. Barrierefreiheit und Technik

- Stufen als `<button aria-pressed>`, Fächer als `<a>`; leere als `aria-disabled="true"`.
- Sichtbarer Fokusring (`:focus-visible`, 2 px `--accent`, Abstand 3 px).
- `aria-label` der Stufen-Kachel nennt Stufe und Anzahl („Klasse 10, 1 Simulation“).
- DOM aus Daten mit `textContent` bauen; `innerHTML` nur für die festen SVG-Symbole.
- Handy (375 px): Stufen 3 Spalten, keine horizontale Scrollleiste, Tippflächen ≥ 44 px.
- Keine Build-Schritte, keine Frameworks; läuft auf GitHub Pages und lokal.

## 8. Abnahme

- [ ] Stufen- und Fach-Kacheln sehen aus wie in der Referenz (Screenshot vergleichen).
- [ ] Leere Kombinationen sind sichtbar, aber nicht klickbar.
- [ ] `?stufe=…` in der URL wählt die Stufe vor, Zurück-Taste führt zur Auswahl zurück.
- [ ] 375 px und 1280 px Breite ohne horizontales Scrollen.
- [ ] Keine Konsolenfehler, auch nicht bei gesperrtem `localStorage`.
- [ ] Anzahlen stimmen mit den Daten überein.
