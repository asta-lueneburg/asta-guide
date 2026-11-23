## Zusammenfassung

Kurz beschreiben, was inhaltlich oder technisch geändert wurde und warum.

## Betroffene Seiten

- [ ] Bestehende Kapitel unter `docs/` angepasst:
- [ ] Neues Kapitel angelegt (mit `templates/kapitel-vorlage.mdx`)
- [ ] Dev-Log-Eintrag unter `blog/` ergänzt (mit `templates/devlog-vorlage.mdx`)
- [ ] Screenshots in `static/img/guide-gwyneth/` erneuert oder ergänzt

## Checkliste

- [ ] Deutsche WordPress-Admin-Bezeichnungen (`de_DE`) verwendet: **Textauszug**, **Vorlagen**, **Badge (Startseite)**, **Übersichtskarte (Referat)**, **AStA-Übersicht** (keine veralteten Begriffe wie „Auszug“ oder „Muster“)
- [ ] Jedes `<Screenshot>` (und jedes eingebundene Bild) hat einen beschreibenden **Alternativtext** (`alt`)
- [ ] `sidebars.js` aktualisiert, falls ein neues Kapitel unter `docs/` hinzugekommen ist
- [ ] `npm test && npm run build` läuft lokal ohne Fehler und ohne defekte Links durch
