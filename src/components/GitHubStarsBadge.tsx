import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useGitHubStars } from '../hooks/useGitHubStars';
import styles from './GitHubStarsBadge.module.css';

interface GitHubStarsBadgeProps {
  githubUrl: string;
  className?: string;
  fallbackStars?: number;
  showLoading?: boolean;
  compact?: boolean;
  showLabel?: boolean;
}

export function GitHubStarsBadge({ 
  githubUrl, 
  className, 
  fallbackStars,
  showLoading = true,
  compact = false,
  showLabel = true
}: GitHubStarsBadgeProps) {
  const { i18n } = useDocusaurusContext();
  const { stars, loading, error } = useGitHubStars(githubUrl);

  // Use real-time stars if available, otherwise fallback to static count
  const displayStars = stars ?? fallbackStars;

  if (error && !fallbackStars) {
    return null; // Don't show anything if there's an error and no fallback
  }

  if (loading && showLoading && !fallbackStars) {
    return (
      <span className={clsx(styles.starsBadge, styles.loading, className)}>
        <span className={styles.starIcon}>
          <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0c4.42 0 8 3.58 8 8 0 3.54-2.29 6.53-5.47 7.59-.4-.07-.55-.17-.55-.38 0-.19.01-.82.01-1.49 2.01.37 2.53-.49 2.69-.94.09-.23.48-.94.82-1.13.28-.15.68-.52-.01-.53-.63-.01-1.08.58-1.23.82-.72 1.21-1.87.87-2.33.66-.07-.52-.28-.87-.51-1.07 1.78-.2 3.64-.89 3.64-3.95 0-.87-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.21-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.21.73.90.82 1.13.16.45.68.81 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.31-.55.38C2.29 14.53 0 11.54 0 8c0-4.42 3.58-8 8-8Z"/>
          </svg>
        </span>
        <span className={styles.loadingDots}>...</span>
        {showLabel && (
          <span className={styles.starsLabel}>
            <Translate id="components.githubStars.loading" description="Loading text for GitHub stars">Loading...</Translate>
          </span>
        )}
      </span>
    );
  }

  if (!displayStars) {
    return null;
  }

  const formattedStars = displayStars >= 1000 
    ? `${(displayStars / 1000).toFixed(1)}k`
    : displayStars.toLocaleString();

  const tooltipText = i18n.currentLocale === 'zh' 
    ? `点击查看 GitHub 仓库，${displayStars.toLocaleString()} 个星标`
    : `Click to view GitHub repository, ${displayStars.toLocaleString()} stars`;

  return (
    <Link
      to={githubUrl}
      className={clsx(
        styles.starsBadge, 
        compact && styles.compact,
        showLabel && styles.withLabel,
        loading && styles.updating,
        className
      )}
      title={tooltipText}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles.labelContainer}>
        <span className={styles.starIcon}>
          <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0c4.42 0 8 3.58 8 8 0 3.54-2.29 6.53-5.47 7.59-.4-.07-.55-.17-.55-.38 0-.19.01-.82.01-1.49 2.01.37 2.53-.49 2.69-.94.09-.23.48-.94.82-1.13.28-.15.68-.52-.01-.53-.63-.01-1.08.58-1.23.82-.72 1.21-1.87.87-2.33.66-.07-.52-.28-.87-.51-1.07 1.78-.2 3.64-.89 3.64-3.95 0-.87-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.21-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.21.73.90.82 1.13.16.45.68.81 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.31-.55.38C2.29 14.53 0 11.54 0 8c0-4.42 3.58-8 8-8Z"/>
          </svg>
        </span>
        <span className={styles.starsLabel}>Stars</span>
      </div>
      <span className={styles.starsCount}>{formattedStars}</span>
      {loading && stars && (
        <span className={styles.updateIndicator} title="Updating...">
          ↻
        </span>
      )}
    </Link>
  );
}

export default GitHubStarsBadge;