import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('landing page fixes Willkommen typo, sets logo alt, and renders HomepageFeatures', () => {
  const indexJs = fs.readFileSync(new URL('../src/pages/index.js', import.meta.url), 'utf8');
  assert.doesNotMatch(indexJs, /Wilkommen/);
  assert.match(indexJs, /title=\{?['"]Willkommen['"]\}?/);
  assert.match(indexJs, /alt=['"][^'"]+['"]/);
  assert.match(indexJs, /<HomepageFeatures\s*\/>/);
});

test('HomepageFeatures has German AStA task links instead of Docusaurus boilerplate', () => {
  const features = fs.readFileSync(new URL('../src/components/HomepageFeatures.js', import.meta.url), 'utf8');
  assert.doesNotMatch(features, /Easy to Use|Powered by React/);
  assert.match(features, /\/docs\/beitraege-erstellen/);
  assert.match(features, /\/docs\/Seiten(%20| )bearbeiten\/referat-seite|referat-seite/);
  assert.match(features, /\/docs\/uebersetzungen-bearbeiten/);
  assert.match(features, /\/docs\/checkliste/);
});

test('Screenshot component enforces alt and provides zoom modal', () => {
  const src = fs.readFileSync(new URL('../src/components/Screenshot.jsx', import.meta.url), 'utf8');
  assert.match(src, /export default function Screenshot\(/);
  assert.match(src, /<figure/);
  assert.match(src, /<figcaption/);
  assert.match(src, /Escape/);
  assert.match(src, /role="dialog"/);
  assert.match(src, /aria-modal="true"/);
  assert.match(src, /useBaseUrl/);
  assert.match(src, /throw new Error/);
});

test('custom.css preserves Gwyneth color tokens and hero contrast', () => {
  const css = fs.readFileSync(new URL('../src/css/custom.css', import.meta.url), 'utf8');
  assert.match(css, /#6d28d9/i);
  assert.match(css, /#f5f3ff/i);
  assert.match(css, /#1a1a2e/i);
  assert.match(css, /#0f0d1a/i);
  assert.match(css, /\.hero--primary\s+\.hero__title/);
});
