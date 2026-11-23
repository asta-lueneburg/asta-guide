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
| Kapitel (Deutsch) — eine Datei pro Seite | `docs/<kapitel>.mdx` (z. B. `docs/beitraege-erstellen.mdx`) |
| Kapitel (Englisch, 1:1 zu den 21 aktiven Kapiteln) | `i18n/en/docusaurus-plugin-content-docs/current/<kapitel>.mdx` |
| UI-, Seitenleisten-, Navigations- und Footer-Übersetzungen | `i18n/en/code.json`, `i18n/en/docusaurus-plugin-content-docs/current.json`, `i18n/en/docusaurus-theme-classic/` |
| Vorlagen für neue Kapitel & Dev-Log-Einträge | `templates/kapitel-vorlage.mdx`, `templates/chapter-template.en.mdx`, `templates/devlog-vorlage.mdx` |
| Reihenfolge, Gruppen und Namen in der Seitenleiste | `sidebars.js` |
| Startseite mit „Letztes Update“ und Änderungstabelle | `docs/home.mdx`, `i18n/en/docusaurus-plugin-content-docs/current/home.mdx` |
| Dev-Log-Einträge (nur Deutsch) | `blog/JJJJ-MM-TT-titel.mdx`, Autor*innen in `blog/authors.yml` |
| Screenshots (Deutsch / Englisch) | `static/img/guide-gwyneth/`, `static/img/guide-gwyneth-en/` |
| Zoom-Komponente für Screenshots | `src/components/Screenshot.jsx` |
| Archiv (nur Deutsch): Kapitel, die es nicht mehr gibt | `docs/ticket-refund/`, `docs/bettenboerse/einrichtung.mdx`, `docs/bettenboerse/entwickler.mdx`, `docs/Seiten bearbeiten/seitenleisten-bearbeiten.mdx` |
| Farben, Schrift, Abstände | `src/css/custom.css` |
| Seitentitel, Navigation, Footer, Adresse | `docusaurus.config.js` |

### Bearbeiten mit Vorlagen oder direkt im Browser

1. **Kleine Änderungen direkt im Browser:** Auf jeder Guide-Seite unten auf **Diese Seite bearbeiten** (bzw. **Edit this page** auf `/en/`) klicken. GitHub öffnet direkt die passende lokalisierte Datei im Editor (`asta-lueneburg/asta-guide`). Änderung eintragen, einen neuen Branch anlegen und einen Pull Request starten.
2. **Neues Kapitel anlegen (zweisprachig):** `templates/kapitel-vorlage.mdx` nach `docs/<kapitel>.mdx` und `templates/chapter-template.en.mdx` nach `i18n/en/docusaurus-plugin-content-docs/current/<kapitel>.mdx` kopieren, die Platzhalter ausfüllen, die Seite in `sidebars.js` (und die englische Überschrift ggf. in `i18n/en/docusaurus-plugin-content-docs/current.json`) eintragen und über `<Screenshot src="/img/guide-gwyneth/..." ... />` bzw. `<Screenshot src="/img/guide-gwyneth-en/..." ... />` bebildern. Archiv-Kapitel und `blog/` werden nicht übersetzt.
3. **Neuen Dev-Log-Eintrag anlegen:** `templates/devlog-vorlage.mdx` nach `blog/JJJJ-MM-TT-titel.mdx` kopieren.
4. **Pull Request prüfen:** Die Checkliste in `.github/PULL_REQUEST_TEMPLATE.md` abhaken. Nach dem Merge auf `main` baut die GitHub Action die Seite neu und lädt sie per FTP hoch.

## Screenshots

Die Bilder der Anleitung liegen für Deutsch in `static/img/guide-gwyneth/` und für
Englisch in `static/img/guide-gwyneth-en/`. Sie zeigen die echte Website (`asta-lueneburg.de`)
bzw. deren lokalen Zwilling `dev-asta-gwyneth.local` — keine Mockups. Die Screenshots
werden automatisiert aus dem Ordner `local-dev/` gegen `dev-asta-gwyneth.local` erzeugt:

```sh
# Deutsche Screenshots (static/img/guide-gwyneth/)
$ node tools/capture-guide-screenshots.mjs

# Englische Screenshots (static/img/guide-gwyneth-en/)
$ node tools/capture-guide-screenshots.mjs --locale en
```

Beim Erneuern oder Ergänzen gilt:

- auf einer Gwyneth-Installation aufnehmen, nicht auf der Vorgänger-Website;
- für die deutsche Fassung die deutsche Oberfläche (`de_DE`) verwenden (**Textauszug**, **Vorlagen**, **Badge (Startseite)**, **Übersichtskarte (Referat)**, **AStA-Übersicht**); für die englische Fassung `--locale en` bzw. ein Profil mit `en_US` verwenden (die benutzerdefinierten Referat-Panels bleiben auch dort deutsch beschriftet);
- für manuelle Screenshots im Adminbereich ein temporäres Konto mit Administrator-Rechten
  anlegen und es nach dem Shooting wieder löschen;
- jedes Bild (`<= 350 KiB`) und jedes `<Screenshot>` braucht einen aussagekräftigen **Alternativtext** (`alt`).

## Tests und Veröffentlichung

Vor dem Commit oder Pull Request sollten die Vertragstests (inklusive `i18n`-Parität und
Asset-Prüfung) und der zweisprachige Production-Build (`de` + `en`) lokal durchlaufen:

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