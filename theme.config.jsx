import { useRouter } from 'next/router'
import LanguageSwitcher from './components/LanguageSwitcher'

const YEAR = new Date().getFullYear()

export default {
  footer: (
    <div style={{ marginTop: '100px' }}>
      <hr />
      <p style={{ textAlign: 'center', fontSize: '14px', color: '#666' }}>
        © {YEAR} Marvin Zhang. All rights reserved.
      </p>
    </div>
  ),
  head: ({ title, meta }) => (
    <>
      {meta.description && (
        <meta name="description" content={meta.description} />
      )}
      {meta.tag && <meta name="keywords" content={meta.tag} />}
      {meta.author && <meta name="author" content={meta.author} />}
    </>
  ),
  readMore: 'Read More →',
  postFooter: null,
  darkMode: true,
  navs: [
    {
      url: 'https://github.com/tikazyq',
      name: 'GitHub'
    },
    {
      component: <LanguageSwitcher />,
      key: 'language-switcher'
    }
  ]
}