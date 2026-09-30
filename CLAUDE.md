# CLAUDE.md – Simulationen

Statische Website (GitHub Pages, Repo `timkucz-cmyk/simulationen`) für Simulationen im
Mathe-/Physikunterricht am LMG Uetersen. Kein Build, keine Frameworks.

- Neue Simulation: Ablauf in `README.md` („Neue Simulation veröffentlichen“). Nur
  `simulationen.js` ergänzen, `index.html`/`katalog.html` nicht anfassen.
- Design: ausschließlich Tokens aus `assets/lmg.css` (LMG-Designsystem). Keine neuen Farben.
- Auswahlseite und ihre Regeln: `AUSWAHLSEITE.md`. Änderungen an Startseite oder Katalog
  dort nachtragen, weil andere Plattformen danach gebaut werden.
- Daten bleiben `.js` (nicht `.json`), damit die Seiten auch per `file://` laufen.
- Lokale Vorschau: `.claude/launch.json` → `python -m http.server 8123`.
- Simulationen in `sims/` sind eigenständige HTML-Dateien; nicht an das Portal-CSS koppeln.
- Texte auf Deutsch mit korrekten Umlauten und „deutschen Anführungszeichen“.
