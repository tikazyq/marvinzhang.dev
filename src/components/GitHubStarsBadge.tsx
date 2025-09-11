import React from 'react';
import clsx from 'clsx';
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
        <span className={styles.starIcon}>⭐</span>
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
    ? `GitHub 上有 ${displayStars.toLocaleString()} 个星标`
    : `${displayStars.toLocaleString()} stars on GitHub`;

  return (
    <span 
      className={clsx(
        styles.starsBadge, 
        compact && styles.compact,
        showLabel && styles.withLabel,
        loading && styles.updating,
        className
      )}
      title={tooltipText}
    >
      <span className={styles.starIcon}>⭐</span>
      <span className={styles.starsCount}>{formattedStars}</span>
      {showLabel && (
        <span className={styles.starsLabel}>
          <Translate id="components.githubStars.label" description="Label for GitHub stars">
            GitHub Stars
          </Translate>
        </span>
      )}
      {loading && stars && (
        <span className={styles.updateIndicator} title="Updating...">
          ↻
        </span>
      )}
    </span>
  );
}

export default GitHubStarsBadge;