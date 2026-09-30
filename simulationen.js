/* =========================================================
   Katalog der Simulationen
   Neue Simulation veröffentlichen = Ordner unter sims/<fach>/<id>/
   anlegen und hier unten einen Eintrag in SIMULATIONEN ergänzen.
   (Als .js statt .json, damit die Seite auch per Doppelklick
   lokal funktioniert – fetch() ist bei file:// gesperrt.)
   ========================================================= */

window.PLATTFORM = {
  name: "Simulationen",
  untertitel: "Interaktive Simulationen und digitale Lernzirkel für Mathematik und Physik.",
  schule: "Ludwig-Meyn-Gymnasium Uetersen",
  zielseite: "katalog.html",

  // Reihenfolge = Reihenfolge der Kacheln. "gruppe" steuert die Zwischenüberschrift.
  // \u00AD = weiches Trennzeichen, damit lange Wörter auf dem Handy sauber umbrechen.
  stufen: [
    { id: "5",  zahl: "5",  name: "Klasse 5",  gruppe: "Sekundarstufe I" },
    { id: "6",  zahl: "6",  name: "Klasse 6",  gruppe: "Sekundarstufe I" },
    { id: "7",  zahl: "7",  name: "Klasse 7",  gruppe: "Sekundarstufe I" },
    { id: "8",  zahl: "8",  name: "Klasse 8",  gruppe: "Sekundarstufe I" },
    { id: "9",  zahl: "9",  name: "Klasse 9",  gruppe: "Sekundarstufe I" },
    { id: "10", zahl: "10", name: "Klasse 10", gruppe: "Sekundarstufe I" },
    { id: "E",  zahl: "E",  name: "Einführungs\u00ADphase",      gruppe: "Oberstufe" },
    { id: "Q1", zahl: "Q1", name: "Qualifikations\u00ADphase 1", gruppe: "Oberstufe" },
    { id: "Q2", zahl: "Q2", name: "Qualifikations\u00ADphase 2", gruppe: "Oberstufe" }
  ],

  faecher: [
    { id: "mathe",  name: "Mathematik",
      symbol: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 40h36M10 44V6"/><path d="M4 11l6-5 6 5" stroke-width="2.2"/><path d="M14 36c6-2 9-24 16-24s6 14 12 14"/></svg>' },
    { id: "physik", name: "Physik",
      symbol: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><ellipse cx="24" cy="24" rx="20" ry="8"/><ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(120 24 24)"/><circle cx="24" cy="24" r="3" fill="currentColor" stroke="none"/></svg>' }
  ]
};

/* ---------------------------------------------------------
   Pflichtfelder: id, titel, fach, stufen, pfad
   Optional:      thema, beschreibung, vorschau, sozialform, dauer, datum (JJJJ-MM-TT)
   "stufen" ist eine Liste – eine Simulation darf in mehreren Stufen auftauchen.
   "datum" steuert das Badge „Neu“ (21 Tage) und die Sortierung (neueste zuerst).
   --------------------------------------------------------- */
window.SIMULATIONEN = [
  {
    id: "reihe-parallel",
    titel: "Lernzirkel: Reihen- und Parallelschaltung",
    fach: "physik",
    stufen: ["10"],
    thema: "Elektrizitätslehre",
    beschreibung: "Acht Stationen mit der PhET-Simulation „Stromkreise schalten“: Spannung, Stromstärke und Widerstand in Reihen- und Parallelschaltungen messen, auswerten und selbst prüfen.",
    pfad: "sims/physik/reihe-parallel/",
    vorschau: "sims/physik/reihe-parallel/vorschau.png",
    sozialform: "Partnerarbeit",
    dauer: "ca. 2 Doppelstunden",
    datum: "2026-09-30"
  }
];
