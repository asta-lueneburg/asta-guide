import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_PNG_BYTES = 350 * 1024;
const root = fileURLToPath(new URL('..', import.meta.url));

function collectImageRefs(dirs, pattern) {
  const refs = new Set();

  const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
        const text = fs.readFileSync(full, 'utf8');
        for (const m of text.matchAll(pattern)) {
          refs.add(m[1]);
        }
      }
    }
  };

  for (const dir of dirs) {
    walk(dir);
  }
  return refs;
}

test('every guide-gwyneth image referenced in docs and blog exists on disk and is <= 350 KB', () => {
  const refs = collectImageRefs(
    [path.join(root, 'docs'), path.join(root, 'blog')],
    /\/img\/guide-gwyneth\/([a-z0-9-]+\.png)/g,
  );

  assert.ok(refs.size >= 30, `Expected at least 30 guide-gwyneth image references, found ${refs.size}`);
  for (const file of refs) {
    const p = path.join(root, 'static/img/guide-gwyneth', file);
    assert.ok(fs.existsSync(p), `Missing image ${file}`);
    const size = fs.statSync(p).size;
    assert.ok(size <= MAX_PNG_BYTES, `Image too large (${size} bytes > ${MAX_PNG_BYTES}): ${file}`);
  }
});

test('every guide-gwyneth-en image referenced in i18n/en exists on disk and is <= 350 KB', () => {
  const refs = collectImageRefs(
    [path.join(root, 'i18n/en')],
    /\/img\/guide-gwyneth-en\/([a-z0-9-]+\.png)/g,
  );

  assert.ok(refs.size >= 30, `Expected at least 30 guide-gwyneth-en image references, found ${refs.size}`);
  for (const file of refs) {
    const p = path.join(root, 'static/img/guide-gwyneth-en', file);
    assert.ok(fs.existsSync(p), `Missing English image ${file}`);
    const size = fs.statSync(p).size;
    assert.ok(size <= MAX_PNG_BYTES, `English image too large (${size} bytes > ${MAX_PNG_BYTES}): ${file}`);
  }
});

test('all PNG files in static/img/guide-gwyneth and static/img/guide-gwyneth-en are <= 350 KB', () => {
  for (const dirRel of ['static/img/guide-gwyneth', 'static/img/guide-gwyneth-en']) {
    const dir = path.join(root, dirRel);
    assert.ok(fs.existsSync(dir), `Missing screenshot directory ${dirRel}`);
    const pngs = fs.readdirSync(dir).filter((name) => name.endsWith('.png'));
    assert.ok(pngs.length >= 30, `Expected at least 30 PNGs in ${dirRel}, found ${pngs.length}`);
    for (const file of pngs) {
      const size = fs.statSync(path.join(dir, file)).size;
      assert.ok(size <= MAX_PNG_BYTES, `PNG too large (${size} bytes > ${MAX_PNG_BYTES}): ${dirRel}/${file}`);
    }
  }
});
