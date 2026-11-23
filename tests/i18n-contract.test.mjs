import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const docsDir = path.join(root, 'docs');
const enDocsDir = path.join(root, 'i18n/en/docusaurus-plugin-content-docs/current');
const enBlogDir = path.join(root, 'i18n/en/docusaurus-plugin-content-blog');

const ARCHIVED_DOCS = new Set([
  'Seiten bearbeiten/seitenleisten-bearbeiten.mdx',
  'bettenboerse/einrichtung.mdx',
  'bettenboerse/entwickler.mdx',
  'ticket-refund/admin-dashboard.mdx',
  'ticket-refund/berechtigte-studierende.mdx',
  'ticket-refund/rueckerstattungen.mdx',
  'ticket-refund/rueckerstattungen-exportieren.mdx',
]);

function walkMarkdownFiles(dir, baseDir = dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkMarkdownFiles(full, baseDir));
    } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
      results.push(path.relative(baseDir, full).split(path.sep).join('/'));
    }
  }
  return results.sort();
}

test('all active German docs have 1:1 parity in i18n/en without archived or blog duplicates', () => {
  const allDeDocs = walkMarkdownFiles(docsDir);
  const activeDeDocs = allDeDocs.filter((rel) => !ARCHIVED_DOCS.has(rel));
  const enDocs = walkMarkdownFiles(enDocsDir);

  assert.ok(activeDeDocs.length >= 21, `Expected at least 21 active German docs, found ${activeDeDocs.length}`);

  for (const rel of activeDeDocs) {
    assert.ok(
      fs.existsSync(path.join(enDocsDir, rel)),
      `Missing English translation for active doc: ${rel}`,
    );
  }

  for (const rel of ARCHIVED_DOCS) {
    assert.ok(
      !fs.existsSync(path.join(enDocsDir, rel)),
      `Archived doc must not be translated in i18n/en: ${rel}`,
    );
  }

  assert.deepEqual(enDocs, activeDeDocs);

  const enBlogPosts = walkMarkdownFiles(enBlogDir);
  assert.deepEqual(enBlogPosts, [], `Blog posts must not be duplicated in i18n/en: ${enBlogPosts.join(', ')}`);
});

test('no English doc references German /img/guide-gwyneth/ screenshots', () => {
  const enDocs = walkMarkdownFiles(enDocsDir);
  for (const rel of enDocs) {
    const content = fs.readFileSync(path.join(enDocsDir, rel), 'utf8');
    assert.doesNotMatch(
      content,
      /\/img\/guide-gwyneth\//,
      `English doc ${rel} must use /img/guide-gwyneth-en/ instead of /img/guide-gwyneth/`,
    );
  }
});

test('required i18n/en JSON translation catalogs exist and parse cleanly', () => {
  const catalogs = [
    'i18n/en/code.json',
    'i18n/en/docusaurus-theme-classic/navbar.json',
    'i18n/en/docusaurus-theme-classic/footer.json',
    'i18n/en/docusaurus-plugin-content-docs/current.json',
  ];

  for (const rel of catalogs) {
    const full = path.join(root, rel);
    assert.ok(fs.existsSync(full), `Missing translation catalog: ${rel}`);
    const parsed = JSON.parse(fs.readFileSync(full, 'utf8'));
    assert.equal(typeof parsed, 'object', `Invalid JSON object in ${rel}`);
    assert.ok(parsed !== null && !Array.isArray(parsed), `Expected JSON map in ${rel}`);
  }
});

test('archived German-only docs avoid relative .mdx links that break en fallback builds', () => {
  for (const rel of ARCHIVED_DOCS) {
    const content = fs.readFileSync(path.join(docsDir, rel), 'utf8');
    assert.doesNotMatch(
      content,
      /\]\([^)]+\.mdx?\)/,
      `Archived doc ${rel} must use extensionless doc route links so fallback en build resolves them`,
    );
  }
});

