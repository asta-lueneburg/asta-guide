// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes: prismThemes } = require('prism-react-renderer');
const lightCodeTheme = prismThemes.github;
const darkCodeTheme = prismThemes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'AStA Guide',
  tagline: 'Website-Guide für asta-lueneburg.de',
  url: 'https://guide.asta-lg.de',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  favicon: 'img/asta-mark.svg',
  organizationName: 'asta-lueneburg', // Usually your GitHub org/user name.
  projectName: 'asta-guide', // Usually your repo name.

  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    localeConfigs: {
      de: {
        label: 'DE',
        htmlLang: 'de-DE',
      },
      en: {
        label: 'EN',
        htmlLang: 'en-US',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/asta-lueneburg/asta-guide/edit/main/',
          editLocalizedFiles: true,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: 'all',
          },
          editUrl: 'https://github.com/asta-lueneburg/asta-guide/edit/main/',
          editLocalizedFiles: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['de', 'en'],
        indexBlog: true,
        forceIgnoreNoIndex: true,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [{name: 'robots', content: 'noindex'}],
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: '',
        logo: {
          alt: 'AStA Logo',
          src: 'img/logo-white.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'home',
            position: 'left',
            label: 'Anleitungen',
          },
          { to: 'blog', label: 'Dev Log', position: 'left' },
          {
            href: 'https://asta-lueneburg.de',
            label: 'AStA Homepage',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        logo: {
          alt: 'AStA Logo',
          src: 'img/logo-white.png',
          href: 'https://asta-lueneburg.de',
        },
        links: [
          {
            title: 'AStA Services',
            items: [
              {
                label: 'Webmailer',
                href: 'https://webmail.all-inkl.com/',
              },
            ],
          },
          {
            title: 'AStA Lüneburg',
            items: [
              {
                label: 'Homepage',
                href: 'https://asta-lueneburg.de',
              },
              {
                label: 'Homepage Login',
                href: 'https://asta-lueneburg.de/login',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/asta-lueneburg/asta-guide',
              },
            ],
          },
        ],
        copyright: `Betrieben durch den Allgemeinen Student*innenausschuss der Universität Lüneburg.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
