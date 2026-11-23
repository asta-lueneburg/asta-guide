import React from 'react';
import Link from '@docusaurus/Link';
import styles from './HomepageFeatures.module.css';

const TaskCards = [
  {
    step: '01 · Neuigkeiten',
    title: 'Beitrag schreiben',
    to: '/docs/beitraege-erstellen',
    description:
      'Meldungen, Termine oder Aufrufe im Block-Editor verfassen, mit Beitragsbild und Textauszug versehen und veröffentlichen.',
  },
  {
    step: '02 · Referate & Bereiche',
    title: 'Referatsseite pflegen',
    to: '/docs/Seiten%20bearbeiten/referat-seite',
    description:
      'Beitragsbild, Startseiten-Badge und Übersichtskarte auf der eigenen Referatsseite aktuell halten.',
  },
  {
    step: '03 · Zweisprachig',
    title: 'Übersetzen (DE / EN)',
    to: '/docs/uebersetzungen-bearbeiten',
    description:
      'Deutsche und englische Fassungen mit Polylang sauber verknüpfen und Inhalte parallel pflegen.',
  },
  {
    step: '04 · Qualitätssicherung',
    title: 'Checkliste vor dem Veröffentlichen',
    to: '/docs/checkliste',
    description:
      'Alternativtexte, Textauszug, Links und die Darstellung im Hell- und Dunkelmodus kurz gegenprüfen.',
  },
];

function TaskCard({ step, title, to, description }) {
  return (
    <Link className={styles.card} to={to}>
      <span className={styles.cardStep}>{step}</span>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
      <span className={styles.cardAction}>Zur Anleitung →</span>
    </Link>
  );
}

export default function HomepageFeatures() {
  return (
    <section
      className={styles.features}
      aria-label="Häufige Aufgaben im AStA-Guide">
      <div className="container">
        <h2 className={styles.sectionTitle}>Womit möchtest du starten?</h2>
        <div className={styles.grid}>
          {TaskCards.map((card) => (
            <TaskCard key={card.to} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
