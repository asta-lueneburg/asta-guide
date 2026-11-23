import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useAlternatePageUtils} from '@docusaurus/theme-common/internal';
import {mergeSearchStrings, useHistorySelector} from '@docusaurus/theme-common';
import {translate} from '@docusaurus/Translate';

function useLocaleLinks(queryString) {
  const {
    siteConfig,
    i18n: {currentLocale, locales, localeConfigs},
  } = useDocusaurusContext();
  const alternatePageUtils = useAlternatePageUtils();
  const search = useHistorySelector((history) => history.location.search);
  const hash = useHistorySelector((history) => history.location.hash);

  return locales.map((locale) => {
    const localeConfig = localeConfigs[locale];
    if (!localeConfig) {
      throw new Error(`Missing localeConfig for locale=${locale}`);
    }
    const isSameDomain = localeConfig.url === siteConfig.url;
    const baseUrl = isSameDomain
      ? `pathname://${alternatePageUtils.createUrl({locale, fullyQualified: false})}`
      : alternatePageUtils.createUrl({locale, fullyQualified: true});
    const finalSearch = mergeSearchStrings([search, queryString], 'append');

    return {
      locale,
      label: localeConfig.label,
      lang: localeConfig.htmlLang,
      to: `${baseUrl}${finalSearch}${hash}`,
      active: locale === currentLocale,
    };
  });
}

export default function LocaleDropdownNavbarItem({
  mobile,
  dropdownItemsBefore,
  dropdownItemsAfter,
  queryString,
  className,
}) {
  const items = useLocaleLinks(queryString);
  const ariaLabel = translate({
    id: 'theme.navbar.languageSwitcher.ariaLabel',
    message: 'Sprache wechseln',
    description: 'Accessible label for the segmented DE/EN language switcher',
  });

  const switcher = (
    <nav
      className={clsx(
        'asta-language-switcher',
        'asta-header-language-switcher',
        className,
      )}
      aria-label={ariaLabel}>
      <ul>
        {items.map((item) => (
          <li
            key={item.locale}
            className={clsx(
              'lang-item',
              `lang-item-${item.locale}`,
              item.active && 'current-lang',
            )}>
            <Link
              to={item.to}
              target="_self"
              autoAddBaseUrl={false}
              lang={item.lang}
              hrefLang={item.lang}
              aria-current={item.active ? 'page' : undefined}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  if (mobile) {
    return <div className="menu__list-item asta-mobile-language-item">{switcher}</div>;
  }

  return (
    <div className="navbar__item asta-language-switcher-wrap">
      {switcher}
    </div>
  );
}
