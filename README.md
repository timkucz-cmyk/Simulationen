# Simulationen – LMG Uetersen

Sammlung interaktiver Simulationen und digitaler Lernzirkel für den Mathematik- und
Physikunterricht am Ludwig-Meyn-Gymnasium Uetersen.

**Für Schüler:innen:** https://timkucz-cmyk.github.io/simulationen/

## Neue Simulation veröffentlichen

1. Ordner anlegen: `sims/<fach>/<kurzname>/` (`<fach>` ist `mathe` oder `physik`) und die
   Simulation als `index.html` hineinlegen.
2. Vorschaubild erzeugen (Screenshot der Startansicht, 1200 × 750):
   ```
   powershell -ExecutionPolicy Bypass -File tools\vorschau.ps1 sims\physik\<kurzname>
   ```
   Alternativ ein eigenes Bild als `vorschau.png` in den Ordner legen. Ohne Bild zeigt die
   Karte das Fach-Symbol.
3. In `simulationen.js` einen Eintrag in `SIMULATIONEN` ergänzen (Vorlage: der vorhandene
   Eintrag). `stufen` ist eine Liste, eine Simulation kann in mehreren Stufen erscheinen.
   `datum` (JJJJ-MM-TT) sorgt drei Wochen lang für das Badge „NEU“.
4. In GitHub Desktop committen und „Push origin“. Nach ca. einer Minute ist die Seite online.

## Aufbau

| Pfad | Zweck |
|---|---|
| `index.html` | Startseite: Klassenstufe und Fach wählen |
| `katalog.html` | Vorschau-Karten für eine Stufe und ein Fach (`?stufe=10&fach=physik`) |
| `simulationen.js` | Konfiguration und Liste aller Simulationen |
| `assets/lmg.css` | LMG-Designsystem (Tokens + Komponenten) |
| `sims/` | die Simulationen selbst, je ein Ordner mit `index.html` und `vorschau.png` |
| `tools/vorschau.ps1` | erzeugt `vorschau.png` per Headless-Chrome |
| `AUSWAHLSEITE.md` | Vorgabe, um diese Auswahlseite auf andere Plattformen zu übertragen |

Direktlinks für QR-Codes: `…/simulationen/?stufe=10` (Stufe vorgewählt) oder
`…/simulationen/katalog.html?stufe=10&fach=physik`.
