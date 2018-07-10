<<<<<<< HEAD

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
=======
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
>>>>>>> 1ae9f48e7017f1990c5d9e9ea95096c8349f6ab8
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
