import React from 'react';
import clsx from 'clsx';
import { useGitHubStars } from '../hooks/useGitHubStars';
import styles from './GitHubStarsBadge.module.css';

interface GitHubStarsBadgeProps {
  githubUrl: string;
  className?: string;
  fallbackStars?: number;
  showLoading?: boolean;
  compact?: boolean;
}

export function GitHubStarsBadge({ 
  githubUrl, 
  className, 
  fallbackStars,
  showLoading = true,
  compact = false
}: GitHubStarsBadgeProps) {
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
      </span>
    );
  }

  if (!displayStars) {
    return null;
  }

  const formattedStars = displayStars >= 1000 
    ? `${(displayStars / 1000).toFixed(1)}k`
    : displayStars.toLocaleString();

  return (
    <span 
      className={clsx(
        styles.starsBadge, 
        compact && styles.compact,
        loading && styles.updating,
        className
      )}
      title={`${displayStars.toLocaleString()} stars on GitHub`}
    >
      <span className={styles.starIcon}>⭐</span>
      <span className={styles.starsCount}>{formattedStars}</span>
      {loading && stars && (
        <span className={styles.updateIndicator} title="Updating...">
          ↻
        </span>
      )}
    </span>
  );
}

export default GitHubStarsBadge;