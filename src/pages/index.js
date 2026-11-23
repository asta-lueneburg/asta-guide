import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img
          src="img/asta-logo.svg"
          alt={translate({
            id: 'homepage.hero.logoAlt',
            message: 'AStA Universität Lüneburg',
            description: 'Alt text for the AStA logo in the homepage hero',
          })}
          className={styles.heroLogo}
        />
        <h1 className="hero__title">
          <Translate id="homepage.hero.title" description="Homepage hero heading">
            Interner AStA-Guide
          </Translate>
        </h1>
        <p className="hero__subtitle">
          <Translate id="homepage.tagline" description="Homepage hero subtitle">
            Website-Guide für asta-lueneburg.de
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/home">
            <Translate id="homepage.hero.cta" description="Primary CTA button on the homepage hero">
              Zur Anleitung
            </Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title={translate({
        id: 'homepage.title',
        message: 'Willkommen',
        description: 'Homepage HTML title',
      })}
      description={translate({
        id: 'homepage.tagline',
        message: 'Website-Guide für asta-lueneburg.de',
        description: 'Homepage meta description',
      })}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
