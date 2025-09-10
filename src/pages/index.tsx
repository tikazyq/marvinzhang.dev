import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Redirect } from '@docusaurus/router';

export default function Home(): React.JSX.Element {
  const {i18n} = useDocusaurusContext();
  const currentLocale = i18n.currentLocale as 'en' | 'zh';
  if (currentLocale === 'zh') {
    return <Redirect to="/zh/blog" />;
  }
  return <Redirect to="/blog" />;
}