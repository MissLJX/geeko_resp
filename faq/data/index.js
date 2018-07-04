import Data from './data.js'
import PtData from './data_pt.js'
import DeData from './data_de.js'
import EsData from './data_es.js'
import FrData from './data_fr.js'

const messages = {
    en: Data,
    pt: PtData,
    de: DeData,
    es: EsData,
    fr: FrData
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
