import { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Key for localStorage to track locale preference
const LOCALE_PREFERENCE_KEY = 'docusaurus.locale.preference';

type SupportedLocale = 'en' | 'zh';

/**
 * Detects the user's preferred locale based on browser settings
 * @returns The detected locale ('en' or 'zh')
 */
function detectBrowserLocale(): SupportedLocale {
  // Check if running in browser
  if (typeof window === 'undefined') {
    return 'en'; // Default for SSR
  }

  // Get user's language preferences from browser
  const languages = navigator.languages || [navigator.language];
  
  // Check if any of the user's preferred languages match Chinese
  for (const lang of languages) {
    const normalizedLang = lang.toLowerCase();
    if (normalizedLang.startsWith('zh')) {
      return 'zh';
    }
  }
  
  // Default to English for all other languages
  return 'en';
}

/**
 * Hook for detecting and managing user locale preferences
 * Automatically detects locale on first visit, then respects user's manual choices
 * 
 * @returns Object containing:
 * - targetLocale: The locale the user should be redirected to (null while loading)
 * - isFirstVisit: Whether this is the user's first visit
 * - detectedLocale: The locale detected from browser (only set on first visit)
 */
export function useLocaleDetection() {
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale as SupportedLocale;
  
  const [targetLocale, setTargetLocale] = useState<SupportedLocale | null>(null);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [detectedLocale, setDetectedLocale] = useState<SupportedLocale | null>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setTargetLocale(currentLocale);
      return;
    }

    // Check if user has visited before
    const storedPreference = localStorage.getItem(LOCALE_PREFERENCE_KEY);
    
    if (!storedPreference) {
      // First visit - detect browser locale
      const detected = detectBrowserLocale();
      setDetectedLocale(detected);
      setIsFirstVisit(true);
      
      // Save the preference to avoid future auto-redirects
      localStorage.setItem(LOCALE_PREFERENCE_KEY, detected);
      
      setTargetLocale(detected);
    } else {
      // User has visited before - use current locale (respects manual language switching)
      setIsFirstVisit(false);
      setTargetLocale(currentLocale);
    }
  }, [currentLocale]);

  return {
    targetLocale,
    isFirstVisit,
    detectedLocale,
  };
}

export default useLocaleDetection;