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

- Lokal: `C:\Users\Anwender\OneDrive\Schule\Vorlagen\KI_Tools\Simulationen\`
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
| Seite, Kacheln, Karten (Startseite) | `--surface-page` | `#ffffff` |
| Hover, Seitenhintergrund Katalog | `--surface-soft` | `#f6f6f4` |
| Kopf-Verlauf Mitte, gewählte Kachel | `--surface-ink` | `#1a1c1f` |
| Text | `--fg-1` / `--fg-2` / `--fg-3` / `--fg-4` / `--fg-5` | `#17181a` / `#3d4147` / `#646a72` / `#9097a0` / `#c2c7cd` |
| Linien | `--line-1` / `--line-2` / `--line-3` | `#e4e5e3` / `#cfd1cf` / `#a8acaa` |
| Mathematik | `--mathe`, `-soft`, `-line`, `-ink` | `#B61E33`, `#f5e1e3`, `#e8b8be`, `#6f0f1c` |
| Physik | `--physik`, `-soft`, `-line`, `-ink` | `#2C5282`, `#e8eef5`, `#b9c8da`, `#1d3a5c` |

- **Schrift:** Source Sans 3 (400/600/700), Fachzeichen in `--font-math` (Cambria Math).
- **Radien:** 6 px für Kacheln, 10 px für Vorschau-Karten, 999 px für Chips und Schrittnummern.
- **Schatten:** `--shadow-1` (Stufen ruhend), `--shadow-2` (Fächer ruhend), `--shadow-3` (Hover).
- **Bewegung:** 180 ms, `cubic-bezier(0.22,0.61,0.36,1)`. Kein Anheben, kein Bounce; Hover
  ändert nur Hintergrund, Rahmen und Schatten, der Pfeil rutscht 4 px.
  `prefers-reduced-motion` schaltet alle Übergänge ab.
- **Fach-Akzent:** Die Klassen `.fach-mathe` / `.fach-physik` setzen `--accent*`. Komponenten
  benutzen nur `--accent`, `--accent-soft`, `--accent-line`, `--accent-ink`.
- Die Startseite ist hell; einzig der Kopf ist dunkel. Plattformen mit Dunkelmodus (Lerntheke)
  bilden die Tokens auf ihre eigenen ab und lassen den Kopf dunkel.

## 3. Aufbau der Startseite

Alle Klassen der Startseite beginnen mit `st-` und stehen im Block „Startseite“ von
`assets/lmg.css`. **Diesen Block 1:1 übernehmen**, nur fehlende Tokens ergänzen (so gemacht
in der Spielesammlung und der Lerntheke). Vorlage war der Entwurf
„Startseite_layouted.html“, Variante F „Verlauf dunkel“.

```
┌──────────────────────────────────────────────── .st-marke: 3 px rot | blau
│ LMG │ Ludwig-Meyn-Gymnasium Uetersen      [opt. Knopf]  ← .st-leiste, 56 px
├──────────────────────────────────────────────── Haarlinie weiß 14 %
│ FACHSCHAFT MATHEMATIK UND PHYSIK          ← .st-kicker
│ Simulationen                              ← .st-titel, 56 px, 700, weiß
│ Ein, zwei Sätze, was es hier gibt.        ← .st-lead, --fg-5
└──── Kopf .st-kopf: Verlauf 115° --mathe-ink → --surface-ink → --physik-ink
  ① In welcher Klassenstufe bist du?       ← .st-schritt.aktiv, .st-nr gefüllt
  │ SEKUNDARSTUFE I ─────────────────        ← .st-gruppe mit Linie
  │ [5] [6] [7] [8] [9] [10]                 ← .st-stufen (auto-fill, min 128 px)
  │ SEKUNDARSTUFE II ────────────────
  │ [E] [Q1] [Q2]
  │                                          ← .st-linie verbindet die Nummern
  ② Klasse 10: Welches Fach?               ← grau mit Ring-Nummer, bis eine Stufe gewählt ist
    [∫ Mathematik  noch leer  →] [λ Physik  1 Simulation  →]
─────────────────────────────────────────────
  Ludwig-Meyn-Gymnasium Uetersen        …   ← .st-fuss
```

- Schritt 2 ist **immer sichtbar**. Vor der Stufenwahl: graue Überschrift, Ring-Nummer und
  der gestrichelte Platzhalter „Wähle zuerst deine Klassenstufe.“ (`.st-platzhalter`).
- Braucht die Plattform einen dritten Schritt (Lerntheke: Thema, Spielesammlung: Spiel),
  bekommt Schritt 2 ebenfalls eine `.st-linie`, und die Fächer werden zu `<button aria-pressed>`
  (gewählt: Akzentrahmen, Pfeil zeigt nach unten). Einträge in Schritt 3 als `.st-eintrag`
  in einer `.st-liste` oder mit plattformeigenen Kacheln.

### Stufen-Kachel (`button.st-stufe`)

- Inhalt von oben nach unten: kleine Versalzeile (`.name`: „Klasse“, „Einführung“,
  „Qualifikation“, aus `kurz` in den Daten), große Zahl/Kürzel (`.zahl`, 38 px, 700), unten
  **farbige Punkte** (einer pro Fach mit Inhalt) und die Kurzanzahl („1 Sim.“, „3 Spiele“).
- Zustände: normal (weiß, Haarlinie `--line-1`, `--shadow-1`), Hover (`--surface-soft`,
  Rahmen `--line-3`), gewählt (`aria-pressed="true"`: `--surface-ink`, weiße Schrift, Nebenzeilen
  `--fg-5`), leer (`aria-disabled="true"`: transparent, gestrichelt, `--fg-4`, keine Reaktion).
- Handy (≤ 560 px): drei Spalten, Punkte ausgeblendet.
- Lange Wörter in `name` mit weichem Trennzeichen `­` („Einführungs­phase“), das
  vor `aria-label` und Überschrift entfernt wird.

### Fach-Kachel (`a.st-fach.fach-<id>`)

- Echter Link (`<a href>`), damit Zurück-Taste und „in neuem Tab öffnen“ funktionieren
  (bei drei Schritten `<button aria-pressed>`, s. o.).
- Raster `64px 1fr 24px`: Zeichenfeld 64 px mit `--accent-soft` und dem Fachzeichen
  (`zeichen` in den Daten: Mathe „∫“, Physik „λ“, Schrift `--font-math`), Fachname 22 px/600
  mit Anzahl darunter, rechts der Pfeil in `--accent`.
- Hover: Rahmen `--accent`, `--shadow-3`, Pfeil 4 px nach rechts.
- Leer: Deckkraft 50 %, ohne `href`, `aria-disabled="true"`.

### Verhalten

- Klick auf Stufe → Schritt 2 wird aktiv und nur dann ins Bild gescrollt, wenn er
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
  stufen:  [{ id:"10", zahl:"10", name:"Klasse 10", gruppe:"Sekundarstufe I" },
            { id:"E", zahl:"E", name:"Einführungs­phase", kurz:"Einführung", gruppe:"Sekundarstufe II" }, …],
  faecher: [{ id:"physik", name:"Physik", zeichen:"λ", symbol:'<svg …>' }, …]
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

**Stand der Umsetzung (30.09.2026):**

| Plattform | Umsetzung |
|---|---|
| Simulationen | Referenz: Stufe → Fach → `katalog.html` |
| Spielesammlung (`timkucz-cmyk/jeopardy`) | Fall B als eigene Startansicht in `index.html`: Stufe → Fach → Spielkacheln mit Anzahl der passenden Sätze; ein Klick wählt im Spiel den ersten passenden Satz vor, die Dropdowns bleiben. `body.start` blendet dort die Kopfzeile aus. |
| Lerntheke (`timkucz-cmyk/lerntheke`) | Startansicht in `app/app.js` (`ansichtStart`): Stufe → Fach → Thema; „Zuletzt geöffnet“ über Schritt 1. Tokens in `app/style.css` auf die Lerntheke-Farben abgebildet (Dunkelmodus). |

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
