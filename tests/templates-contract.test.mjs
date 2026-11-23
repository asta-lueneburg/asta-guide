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
