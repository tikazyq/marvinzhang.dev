import React from 'react';
import { Redirect } from '@docusaurus/router';
import { useLocaleDetection } from '../hooks/useLocaleDetection';

export default function Home(): React.JSX.Element {
  const { targetLocale } = useLocaleDetection();

  // Show loading while determining target locale
  if (targetLocale === null) {
    return null;
  }

  // Redirect based on determined locale
  if (targetLocale === 'zh') {
    return <Redirect to="/zh/blog" />;
  }
  return <Redirect to="/blog" />;
}