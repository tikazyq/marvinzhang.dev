import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export const useLanguage = () => {
  const router = useRouter()
  const [currentLang, setCurrentLang] = useState('zh')

  useEffect(() => {
    // Detect language from URL or post filename
    const path = router.asPath
    if (path.includes('-en')) {
      setCurrentLang('en')
    } else {
      setCurrentLang('zh')
    }
  }, [router.asPath])

  const switchLanguage = (targetLang) => {
    const currentPath = router.asPath
    
    if (currentPath.includes('/posts/')) {
      // Handle post language switching
      const pathParts = currentPath.split('/')
      const postSlug = pathParts[pathParts.length - 1]
      
      let newSlug
      if (targetLang === 'en') {
        newSlug = postSlug.endsWith('-en') ? postSlug : postSlug + '-en'
      } else {
        newSlug = postSlug.replace('-en', '')
      }
      
      const newPath = currentPath.replace(postSlug, newSlug)
      router.push(newPath)
    } else {
      // For home page, just update the language preference
      setCurrentLang(targetLang)
      // You could store this in localStorage for persistence
      localStorage.setItem('preferred-language', targetLang)
    }
  }

  return {
    currentLang,
    switchLanguage,
    isEnglish: currentLang === 'en',
    isChinese: currentLang === 'zh'
  }
}