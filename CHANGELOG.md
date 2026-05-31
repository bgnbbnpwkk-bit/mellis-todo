# Changelog

Alle nennenswerten Änderungen an „Meine Schritte" (Mellis Aufgaben-App).
Format orientiert sich an [Keep a Changelog](https://keepachangelog.com/de/).

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
