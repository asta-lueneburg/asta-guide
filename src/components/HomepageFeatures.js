import React from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import styles from './HomepageFeatures.module.css';

function getTaskCards() {
  return [
    {
      step: translate({
        id: 'homepage.features.news.step',
        message: '01 · Neuigkeiten',
      }),
      title: translate({
        id: 'homepage.features.news.title',
        message: 'Beitrag schreiben',
      }),
      to: '/docs/beitraege-erstellen',
      description: translate({
        id: 'homepage.features.news.description',
        message:
          'Meldungen, Termine oder Aufrufe im Block-Editor verfassen, mit Beitragsbild und Textauszug versehen und veröffentlichen.',
      }),
    },
    {
      step: translate({
        id: 'homepage.features.department.step',
        message: '02 · Referate & Bereiche',
      }),
      title: translate({
        id: 'homepage.features.department.title',
        message: 'Referatsseite pflegen',
      }),
      to: '/docs/Seiten%20bearbeiten/referat-seite',
      description: translate({
        id: 'homepage.features.department.description',
        message:
          'Beitragsbild, Startseiten-Badge und Übersichtskarte auf der eigenen Referatsseite aktuell halten.',
      }),
    },
    {
      step: translate({
        id: 'homepage.features.bilingual.step',
        message: '03 · Zweisprachig',
      }),
      title: translate({
        id: 'homepage.features.bilingual.title',
        message: 'Übersetzen (DE / EN)',
      }),
      to: '/docs/uebersetzungen-bearbeiten',
      description: translate({
        id: 'homepage.features.bilingual.description',
        message:
          'Deutsche und englische Fassungen mit Polylang sauber verknüpfen und Inhalte parallel pflegen.',
      }),
    },
    {
      step: translate({
        id: 'homepage.features.qa.step',
        message: '04 · Qualitätssicherung',
      }),
      title: translate({
        id: 'homepage.features.qa.title',
        message: 'Checkliste vor dem Veröffentlichen',
      }),
      to: '/docs/checkliste',
      description: translate({
        id: 'homepage.features.qa.description',
        message:
          'Alternativtexte, Textauszug, Links und die Darstellung im Hell- und Dunkelmodus kurz gegenprüfen.',
      }),
    },
  ];
}

function TaskCard({ step, title, to, description }) {
  return (
    <Link className={styles.card} to={to}>
      <span className={styles.cardStep}>{step}</span>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
      <span className={styles.cardAction}>
        <Translate id="homepage.features.cardAction" description="Action link label on task cards">
          Zur Anleitung →
        </Translate>
      </span>
    </Link>
  );
}

export default function HomepageFeatures() {
  const taskCards = getTaskCards();
  return (
    <section
      className={styles.features}
      aria-label={translate({
        id: 'homepage.features.ariaLabel',
        message: 'Häufige Aufgaben im AStA-Guide',
      })}>
      <div className="container">
        <h2 className={styles.sectionTitle}>
          <Translate id="homepage.features.sectionTitle" description="Heading above the homepage task cards">
            Womit möchtest du starten?
          </Translate>
        </h2>
        <div className={styles.grid}>
          {taskCards.map((card) => (
            <TaskCard key={card.to} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
