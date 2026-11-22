import React, { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './Screenshot.module.css';

export default function Screenshot({ src, alt, caption, width, size = 'full' }) {
  if (typeof alt !== 'string' || !alt.trim()) {
    throw new Error('Screenshot requires a non-empty "alt" description.');
  }

  const resolvedSize = width ?? size;
  const resolvedSrc = useBaseUrl(src);
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const wasOpenRef = useRef(false);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      if (wasOpenRef.current) {
        wasOpenRef.current = false;
        triggerRef.current?.focus();
      }
      return undefined;
    }

    wasOpenRef.current = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, closeModal]);

  return (
    <figure
      className={clsx(
        styles.figure,
        resolvedSize === 'compact' ? styles.compact : styles.full,
      )}>
      <button
        type="button"
        ref={triggerRef}
        className={styles.trigger}
        onClick={() => setIsOpen(true)}
        aria-label={`Screenshot vergrößern: ${alt}`}>
        <img
          src={resolvedSrc}
          alt={alt}
          className={styles.image}
          loading="lazy"
          decoding="async"
        />
        <span className={styles.zoomHint} aria-hidden="true">
          Vergrößern
        </span>
      </button>
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}

      {isOpen ? (
        <div
          className={styles.modalBackdrop}
          role="dialog"
          aria-modal="true"
          aria-label={caption ? `Großansicht: ${caption}` : `Großansicht: ${alt}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}>
          <div className={styles.modalContent}>
            <button
              type="button"
              ref={closeButtonRef}
              className={styles.closeButton}
              onClick={closeModal}
              aria-label="Großansicht schließen">
              ×
            </button>
            <img src={resolvedSrc} alt={alt} className={styles.modalImage} />
            {caption ? <p className={styles.modalCaption}>{caption}</p> : null}
          </div>
        </div>
      ) : null}
    </figure>
  );
}
