## Zusammenfassung

Kurz beschreiben, was inhaltlich oder technisch geändert wurde und warum.

## Betroffene Seiten

- [ ] Bestehende Kapitel unter `docs/` angepasst:
- [ ] Neues Kapitel angelegt (mit `templates/kapitel-vorlage.mdx`)
- [ ] Englische Übersetzung unter `i18n/en/docusaurus-plugin-content-docs/current/` angepasst oder angelegt (mit `templates/chapter-template.en.mdx`)
- [ ] Dev-Log-Eintrag unter `blog/` ergänzt (mit `templates/devlog-vorlage.mdx`)
- [ ] Screenshots in `static/img/guide-gwyneth/` und (bei aktiven Kapiteln) `static/img/guide-gwyneth-en/` erneuert oder ergänzt

## Checkliste

- [ ] Deutsche WordPress-Admin-Bezeichnungen (`de_DE`) verwendet: **Textauszug**, **Vorlagen**, **Badge (Startseite)**, **Übersichtskarte (Referat)**, **AStA-Übersicht** (keine veralteten Begriffe wie „Auszug“ oder „Muster“)
- [ ] Bei Änderungen an aktiven Kapiteln unter `docs/`: entsprechende Datei unter `i18n/en/docusaurus-plugin-content-docs/current/` sowie zugehörige Screenshots unter `static/img/guide-gwyneth-en/` aktualisiert (Archiv-Kapitel und `blog/` bleiben einsprachig deutsch)
- [ ] Jedes `<Screenshot>` (und jedes eingebundene Bild) hat einen beschreibenden **Alternativtext** (`alt`)
- [ ] `sidebars.js` (und ggf. `i18n/en/docusaurus-plugin-content-docs/current.json`) aktualisiert, falls ein neues Kapitel unter `docs/` hinzugekommen ist
- [ ] `npm test && npm run build` läuft lokal ohne Fehler und ohne defekte Links durch
