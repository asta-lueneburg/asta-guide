import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('package.json uses Docusaurus 3 and React 18 without Playwright', () => {
  const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  assert.match(pkg.dependencies['@docusaurus/core'], /^\^?3\./);
  assert.match(pkg.dependencies['@docusaurus/preset-classic'], /^\^?3\./);
  assert.match(pkg.dependencies.react, /^\^?18\./);
  assert.ok(pkg.dependencies['@easyops-cn/docusaurus-search-local']);
  assert.equal(pkg.dependencies.playwright, undefined);
});

test('docusaurus.config.js points editUrl and org links to asta-lueneburg/asta-guide', async () => {
  const mod = await import('../docusaurus.config.js');
  const config = mod.default || mod;
  assert.equal(config.organizationName, 'asta-lueneburg');
  assert.equal(config.projectName, 'asta-guide');
  const classic = config.presets[0][1];
  assert.equal(classic.docs.editUrl, 'https://github.com/asta-lueneburg/asta-guide/edit/main/');
  assert.equal(classic.blog.editUrl, 'https://github.com/asta-lueneburg/asta-guide/edit/main/');
  assert.equal(config.onBrokenLinks, 'throw');
  const searchTheme = config.themes.find(
    (entry) => Array.isArray(entry) && String(entry[0]).includes('docusaurus-search-local'),
  );
  assert.ok(searchTheme, 'Expected docusaurus-search-local theme configuration');
  assert.equal(searchTheme[1].forceIgnoreNoIndex, true);
});

test('deploy.yml uses Node 20 or 22 LTS', () => {
  const yml = fs.readFileSync(new URL('../.github/workflows/deploy.yml', import.meta.url), 'utf8');
  assert.match(yml, /node-version:\s*(20|22)/);
});

test('deploy.yml serializes FTP deploys and uses safe lftp FTPS mirror', () => {
  const yml = fs.readFileSync(new URL('../.github/workflows/deploy.yml', import.meta.url), 'utf8');
  assert.match(yml, /workflow_dispatch:/);
  assert.match(yml, /concurrency:\s*\n\s*group:\s*deploy-ftp-\$\{\{\s*github\.ref\s*\}\}\s*\n\s*cancel-in-progress:\s*false/);
  assert.doesNotMatch(yml, /genietim\/ftp-action/);
  assert.match(yml, /set ftp:ssl-force true/);
  assert.match(yml, /--parallel=2/);
  assert.match(yml, /--no-perms/);
  assert.match(yml, /--no-umask/);
  assert.match(yml, /--delete/);
  assert.match(yml, /\\\.htaccess\$/);
  assert.match(yml, /\\\.well-known\//);
  assert.match(yml, /\\\.ftpquota\$/);
  assert.match(yml, /\^cgi-bin\//);
  assert.match(yml, /\\\.git\//);
});

test('docusaurus.config.js enables de/en i18n, localeDropdown, and editLocalizedFiles', async () => {
  const mod = await import('../docusaurus.config.js');
  const config = mod.default || mod;
  assert.equal(config.i18n.defaultLocale, 'de');
  assert.deepEqual(config.i18n.locales, ['de', 'en']);
  assert.equal(config.i18n.localeConfigs.de.label, 'DE');
  assert.equal(config.i18n.localeConfigs.en.label, 'EN');
  assert.equal(config.presets[0][1].docs.editLocalizedFiles, true);
  assert.equal(config.presets[0][1].blog.editLocalizedFiles, true);
  assert.ok(config.themeConfig.navbar.items.some((item) => item.type === 'localeDropdown'));
  assert.equal(config.themeConfig.colorMode.disableSwitch, false);
  assert.equal(config.themeConfig.colorMode.respectPrefersColorScheme, false);
});
