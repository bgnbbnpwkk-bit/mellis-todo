# Changelog

Alle nennenswerten Änderungen an „Meine Schritte" (Mellis Aufgaben-App).
Format orientiert sich an [Keep a Changelog](https://keepachangelog.com/de/).

## [1.2] – 2026-06-02

### Hinzugefügt
- **Google-Login (Firebase Authentication):** Die App ist nur nach Anmeldung
  zugänglich. Login-Screen mit „Mit Google anmelden"-Button.
- **Zugangsbeschränkung:** Nur die freigeschalteten Konten von Marc & Melli
  dürfen die App nutzen; andere Konten werden nach dem Login sofort wieder
  abgemeldet (freundliche Meldung auf Deutsch).
- **Abmelden** im i-Panel, inkl. Anzeige des angemeldeten Kontos.
- **i-Panel erweitert:** Features, Tech-Stack und Changelog im App-Code.
- **Auto-Update:** Service Worker übernimmt neue Versionen automatisch
  (`skipWaiting`/`clients.claim` + Reload bei `controllerchange`) – kein
  manuelles Neu-Installieren mehr.
- **GitHub Actions Deploy** auf GitHub Pages (Source = GitHub Actions).
- `manifest.json` (ersetzt `manifest.webmanifest`).

### Geändert
- Viewport gegen versehentliches Zoomen/Verschieben gesperrt
  (`maximum-scale=1, user-scalable=no`); optimiert für iPhone 16e & S24 Ultra.

## [1.1] – 2026-05-31

### Hinzugefügt
- **Installierbar als App (PWA):** Web-App-Manifest, Service Worker und
  eigenes Kirschblüten-Icon (192/512/180 px). Chrome/Safari bieten jetzt
  „Zum Startbildschirm hinzufügen / App installieren" an.
- App-Name **„Meine Schritte"** (statt „Mellis Aufgaben").
- In-App-Abschnitt „Was ist neu" im Über-Dialog.

### Behoben
- **Eingabezeile bleibt über der Tastatur** (iOS via `visualViewport`,
  Android via fixierter Leiste). Kein Verschwinden hinter der Tastatur mehr.
- **Kein iOS-Auto-Zoom** mehr beim Antippen des Eingabefelds – dadurch wird
  der „+"-Button nicht mehr abgeschnitten und es bleibt keine Lücke zur
  Tastatur (Eingabe-Schriftgröße auf 16 px gesetzt).
- **Scrollen/Viewport** auf Android korrigiert (`100dvh` statt `100vh`,
  `min-height: 0`), Inhalt nicht mehr abgeschnitten.
- visualViewport-Versatz auf ganze Pixel gerundet und mehrfach nachgezogen,
  da iOS die Tastaturhöhe teils verzögert meldet.

## [1.0] – 2026-05-31

### Hinzugefügt
- Erste Version: sanfte To-Do-App ohne Druck, ohne Streaks.
- „Guter Tag / Schwerer Tag"-Modus, ermutigende Sprüche, Erledigt-Bereich.
