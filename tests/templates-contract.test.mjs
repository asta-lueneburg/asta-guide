import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('starter templates and PR template exist with Screenshot and German checklist', () => {
  const chapter = fs.readFileSync(new URL('../templates/kapitel-vorlage.mdx', import.meta.url), 'utf8');
  const devlog = fs.readFileSync(new URL('../templates/devlog-vorlage.mdx', import.meta.url), 'utf8');
  const pr = fs.readFileSync(new URL('../.github/PULL_REQUEST_TEMPLATE.md', import.meta.url), 'utf8');
  assert.match(chapter, /import Screenshot from '@site\/src\/components\/Screenshot'/);
  assert.match(chapter, /<Screenshot/);
  assert.match(devlog, /authors:\s*webmaster-2026/);
  assert.match(pr, /npm run build/);
  assert.match(pr, /Alternativtext/i);
});

test('README.md has no stale AStA-Luneburg links and documents template workflow', () => {
  const readme = fs.readFileSync(new URL('../README.md', import.meta.url), 'utf8');
  assert.doesNotMatch(readme, /AStA-Luneburg|AStA-Lueneburg/);
  assert.match(readme, /asta-lueneburg\/asta-guide/);
  assert.match(readme, /templates\/kapitel-vorlage\.mdx/);
});

test('English chapter template, PR template bilingual checklist, and README i18n workflow exist', () => {
  const enTemplate = fs.readFileSync(new URL('../templates/chapter-template.en.mdx', import.meta.url), 'utf8');
  const pr = fs.readFileSync(new URL('../.github/PULL_REQUEST_TEMPLATE.md', import.meta.url), 'utf8');
  const readme = fs.readFileSync(new URL('../README.md', import.meta.url), 'utf8');

  assert.match(enTemplate, /import Screenshot from '@site\/src\/components\/Screenshot'/);
  assert.match(enTemplate, /<Screenshot/);
  assert.match(enTemplate, /\/img\/guide-gwyneth-en\//);

  assert.match(pr, /i18n\/en\/docusaurus-plugin-content-docs\/current\//);
  assert.match(pr, /static\/img\/guide-gwyneth-en\//);

  assert.match(readme, /i18n\/en\//);
  assert.match(readme, /templates\/chapter-template\.en\.mdx/);
  assert.match(readme, /capture-guide-screenshots\.mjs --locale en/);
});
