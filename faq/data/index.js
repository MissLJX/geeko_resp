import Data from './data.js'

const messages = {
  en_US: Data
}

const languages = [
  'en_US',
  'de_DE',
  'es_ES',
  'fr_FR',
  'pt_BR'
]

const lang = languages.find(l => l == window.locale) || 'en_US'

const {questions, secondaries} = messages[lang]

export {questions, secondaries}
