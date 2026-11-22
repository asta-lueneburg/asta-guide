import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('referat-seite.mdx documents Badge (Startseite) and Übersichtskarte (Referat)', () => {
  const doc = fs.readFileSync(new URL('../docs/Seiten bearbeiten/referat-seite.mdx', import.meta.url), 'utf8');
  assert.match(doc, /Badge \(Startseite\)/);
  assert.match(doc, /Übersichtskarte \(Referat\)/);
  assert.match(doc, /Automatisch/);
  assert.match(doc, /Regelmäßig/);
  assert.match(doc, /Nach Ankündigung/);
  assert.match(doc, /Eigener Text/);
  assert.match(doc, /Kein Badge/);
  assert.match(doc, /Rolle\/Label/);
  assert.match(doc, /Mindestens 2 Felder|mindestens zwei Felder/i);
  assert.match(doc, /referat-badge-panel\.png/);
  assert.match(doc, /referat-overviewcard-panel\.png/);
});

test('bausteine.mdx omits hidden Referat Card and sidebars.js registers referat-seite', () => {
  const bausteine = fs.readFileSync(new URL('../docs/Seiten bearbeiten/bausteine.mdx', import.meta.url), 'utf8');
  const sidebars = fs.readFileSync(new URL('../sidebars.js', import.meta.url), 'utf8');
  assert.doesNotMatch(bausteine, /\|\s*\*\*Referat Card\*\*/);
  assert.match(bausteine, /Übersichtskarte \(Referat\)/);
  assert.match(sidebars, /Seiten bearbeiten\/referat-seite/);
});

test('hintergrund.mdx documents AStA-Übersicht and blog fixes panel count', () => {
  const hintergrund = fs.readFileSync(new URL('../docs/hintergrund.mdx', import.meta.url), 'utf8');
  const blogNov17 = fs.readFileSync(new URL('../blog/2026-11-17-gwyneth-guide.mdx', import.meta.url), 'utf8');
  assert.match(hintergrund, /AStA-Übersicht/);
  assert.match(hintergrund, /admin-overview\.png/);
  assert.doesNotMatch(blogNov17, /sechs Panels/);
  assert.match(blogNov17, /fünf Panels/);
});

test('locked theme.json controls, Nov 23 devlog, home.mdx, and Screenshot conversions are present', () => {
  const seitenAufbau = fs.readFileSync(new URL('../docs/Seiten bearbeiten/seiten-aufbau.mdx', import.meta.url), 'utf8');
  const home = fs.readFileSync(new URL('../docs/home.mdx', import.meta.url), 'utf8');
  const blogNov23 = fs.readFileSync(new URL('../blog/2026-11-23-docusaurus-3-und-referate.mdx', import.meta.url), 'utf8');
  assert.match(seitenAufbau, /deaktiviert|ausgeblendet|gesperrt/i);
  assert.match(home, /referat-seite/);
  assert.match(blogNov23, /authors:\s*webmaster-2026/);
  assert.match(blogNov23, /AStA-Übersicht/);
  assert.match(seitenAufbau, /import Screenshot from '@site\/src\/components\/Screenshot'/);
  assert.match(seitenAufbau, /<Screenshot/);
});
