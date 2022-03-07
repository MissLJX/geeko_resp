import Data from './data.js'
import PtData from './data_pt.js'
import DeData from './data_de.js'
import EsData from './data_es.js'
import FrData from './data_fr.js'

// import Data from './ivrose/data.js'
// import PtData from './ivrose/data_pt.js'
// import DeData from './ivrose/data_de.js'
// import EsData from './ivrose/data_es.js'
// import FrData from './ivrose/data_fr.js'

// import Data from './boutiquefeel/data.js'
// import PtData from './boutiquefeel/data_pt.js'
// import DeData from './boutiquefeel/data_de.js'
// import EsData from './boutiquefeel/data_es.js'
// import FrData from './boutiquefeel/data_fr.js'


// import Data from './chiquedoll/data.js'
// import PtData from './chiquedoll/data_pt.js'
// import DeData from './chiquedoll/data_de.js'
// import EsData from './chiquedoll/data_es.js'
// import FrData from './chiquedoll/data_fr.js'


const messages = {
  en: Data,
  pt: PtData,
  de: DeData,
  es: EsData,
  fr: FrData,
  'sv': Data,
  'da': Data,
  'nb': Data,
  'is': Data,
  'fi': Data
}

const languages = [
  'en',
  'de',
  'es',
  'fr',
  'pt',
  'sv',
  'da',
  'nb',
  'is',
  'fi'
]
// window.lang = 'en'
const localelang = (window.locale || 'en').substring(0, 2)

const lang = languages.find(l => l == localelang)
console.log(lang)
const {questions, secondaries} = messages[lang] || messages['en']
console.log( {questions, secondaries})
export {questions, secondaries}
