import React from 'react';
import clsx from 'clsx';
import useIsBrowser from '@docusaurus/useIsBrowser';

export default function ColorModeToggle({
  className,
  buttonClassName,
  value,
  onChange,
}) {
  const isBrowser = useIsBrowser();
  const isDark = value === 'dark';
  const label = isDark ? 'Light Mode' : 'Dark Mode';

  return (
    <div className={clsx('asta-dark-toggle', className)}>
      <button
        type="button"
        className={clsx('clean-btn', 'asta-dark-toggle__button', buttonClassName)}
        onClick={() => onChange(isDark ? 'light' : 'dark')}
        disabled={!isBrowser}
        aria-pressed={isDark}
        aria-label={label}
        title={label}>
        <span className="asta-dark-toggle__label">{label}</span>
      </button>
    </div>
  );
}
