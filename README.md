# AStA Guide

Der Guide des AStA Lüneburg ist die interne HowTo-Seite mit Anleitungen für die Webseite (https://asta-lueneburg.de) und mehr.
Sie ist mit [Docusaurus 3](https://docusaurus.io/) gebaut, einem modernen Static-Site-Generator.

## Lokale Entwicklung

Die Seite kann lokal gestartet werden, um Änderungen vor der Veröffentlichung anzusehen. Dafür müssen Node.js und NPM auf deinem PC installiert sein.

Dann kannst du folgende Befehle ausführen:
```sh
# Die Repository auf deinen PC klonen
$ git clone git@github.com:asta-lueneburg/asta-guide.git

# In den neuen Ordner wechseln
$ cd asta-guide/

# Abhängigkeiten installieren
$ npm install
```

Jetzt ist die Umgebung vorbereitet und der Entwicklungs-Server kann gestartet werden.

```sh
$ npm start
```

Nun kannst du Änderungen vornehmen, die automatisch in der Vorschau aktualisiert werden.

## Wo die Texte stehen

Jede Seite der Anleitung ist **eine** Datei. Wer einen Absatz ändern will, öffnet die
Datei, ändert den Text und committet — kein CMS dazwischen.

| Was | Datei |
|---|---|
| Kapitel — eine Datei pro Seite | `docs/<kapitel>.mdx` (z. B. `docs/beitraege-erstellen.mdx`) |
| Vorlagen für neue Kapitel & Dev-Log-Einträge | `templates/kapitel-vorlage.mdx`, `templates/devlog-vorlage.mdx` |
| Reihenfolge, Gruppen und Namen in der Seitenleiste | `sidebars.js` |
| Startseite mit „Letztes Update“ und Änderungstabelle | `docs/home.mdx` |
| Dev-Log-Einträge | `blog/JJJJ-MM-TT-titel.mdx`, Autor*innen in `blog/authors.yml` |
| Screenshots | `static/img/guide-gwyneth/` |
| Zoom-Komponente für Screenshots | `src/components/Screenshot.jsx` |
| Archiv: Kapitel, die es nicht mehr gibt | `docs/ticket-refund/`, `docs/bettenboerse/einrichtung.mdx`, `docs/bettenboerse/entwickler.mdx`, `docs/Seiten bearbeiten/seitenleisten-bearbeiten.mdx` |
| Farben, Schrift, Abstände | `src/css/custom.css` |
| Seitentitel, Navigation, Footer, Adresse | `docusaurus.config.js` |

### Bearbeiten mit Vorlagen oder direkt im Browser

1. **Kleine Änderungen direkt im Browser:** Auf jeder Guide-Seite unten auf **Diese Seite bearbeiten** klicken. GitHub öffnet direkt die passende Datei im Editor (`asta-lueneburg/asta-guide`). Änderung eintragen, einen neuen Branch anlegen und einen Pull Request starten.
2. **Neues Kapitel anlegen:** `templates/kapitel-vorlage.mdx` nach `docs/<kapitel>.mdx` kopieren, die Platzhalter ausfüllen, die Seite in `sidebars.js` eintragen und über `<Screenshot src="/img/guide-gwyneth/..." alt="..." caption="..." />` bebildern.
3. **Neuen Dev-Log-Eintrag anlegen:** `templates/devlog-vorlage.mdx` nach `blog/JJJJ-MM-TT-titel.mdx` kopieren.
4. **Pull Request prüfen:** Die Checkliste in `.github/PULL_REQUEST_TEMPLATE.md` abhaken. Nach dem Merge auf `main` baut die GitHub Action die Seite neu und lädt sie per FTP hoch.

## Screenshots

Die Bilder der Anleitung liegen in `static/img/guide-gwyneth/`. Sie zeigen die echte
Website (`asta-lueneburg.de`) bzw. deren lokalen Zwilling `dev-asta-gwyneth.local` —
keine Mockups. Die Screenshots werden automatisiert gegen `dev-asta-gwyneth.local` mit
`local-dev/tools/capture-guide-screenshots.mjs` erzeugt.

Beim Erneuern oder Ergänzen gilt:

- auf einer Gwyneth-Installation aufnehmen, nicht auf der Vorgänger-Website;
- deutsche Oberfläche (Admin-Sprache `de_DE`), damit die Bezeichnungen zu den Texten passen:
  **Textauszug**, **Vorlagen**, **Badge (Startseite)**, **Übersichtskarte (Referat)** und **AStA-Übersicht**;
- für manuelle Screenshots im Adminbereich ein temporäres Konto mit Administrator-Rechten
  anlegen und es nach dem Shooting wieder löschen;
- jedes Bild und jedes `<Screenshot>` braucht einen aussagekräftigen **Alternativtext** (`alt`).

## Tests und Veröffentlichung

Vor dem Commit oder Pull Request sollten die Vertragstests und der Production-Build lokal
durchlaufen:

```sh
$ npm test
$ npm run build
```

Um Änderungen zu veröffentlichen, reicht ein Push (bzw. der Merge eines Pull Requests) auf `main` in `asta-lueneburg/asta-guide`.
[Eine GitHub Action](.github/workflows/deploy.yml) führt dann automatisch `npm test` und `npm run build` aus **und lädt die gebaute Seite per FTP auf den AStA-Server.**
Auf der [Actions-Übersicht](https://github.com/asta-lueneburg/asta-guide/actions) kannst du nachsehen, ob die Veröffentlichung erfolgreich war.

```sh
# Änderungen hinzufügen
$ git add .

# Änderungen committen
$ git commit -m "Meine Änderungen"

# Änderungen pushen
$ git push

# ... die Seite wird nun automatisch deployed.
```

Falls du die Seite manuell hochladen möchtest, findest du das generierte statische HTML/CSS/JS nach `npm run build` im Ordner `build/`.