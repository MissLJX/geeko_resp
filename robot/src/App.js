import logo from './logo.svg'
import './App.css'
import { IntlProvider } from 'react-intl'
import Index from './pages/index.jsx'
import { lang, message } from './i18n'

function App() {
  return (
    <IntlProvider locale={lang} messages={message}>
      <Index/>
    </IntlProvider>
  )
}

export default App
