
import Data from './ivrose/data.js'
import PtData from './ivrose/data_pt.js'
import DeData from './ivrose/data_de.js'
import FrData from './ivrose/data_fr.js'
import EsData from './ivrose/data_es.js'

const messages = {
  en: Data,
  pt: PtData,
  de: DeData,
  fr: FrData,
  es: EsData
}

const languages = [
  'en',
  'de',
  'es',
  'fr',
  'pt'
]

const localelang = (window.lang || 'en').substring(0, 2)

const lang = languages.find(l => l == localelang)

const {questions, secondaries} = messages[lang] || messages['en']

export {questions, secondaries}
