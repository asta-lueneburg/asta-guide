import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('every guide-gwyneth image referenced in docs and blog exists on disk and is <= 350 KB', () => {
  const root = path.resolve(new URL('..', import.meta.url).pathname);
  const refs = new Set();

  const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
        const text = fs.readFileSync(full, 'utf8');
        for (const m of text.matchAll(/\/img\/guide-gwyneth\/([a-z0-9-]+\.png)/g)) {
          refs.add(m[1]);
        }
      }
    }
  };

  walk(path.join(root, 'docs'));
  walk(path.join(root, 'blog'));

  assert.ok(refs.size >= 30, `Expected at least 30 guide-gwyneth image references, found ${refs.size}`);
  for (const file of refs) {
    const p = path.join(root, 'static/img/guide-gwyneth', file);
    assert.ok(fs.existsSync(p), `Missing image ${file}`);
    const size = fs.statSync(p).size;
    assert.ok(size <= 350 * 1024, `Image too large (${size} bytes > 358400): ${file}`);
  }
});
