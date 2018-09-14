import {addLocaleData} from 'react-intl'

import en from 'react-intl/locale-data/en'
import de from 'react-intl/locale-data/de'
import fr from 'react-intl/locale-data/fr'
import es from 'react-intl/locale-data/es'
import pt from 'react-intl/locale-data/pt'

import de_L from '../i18n/de'
import fr_L from '../i18n/fr'
import es_L from '../i18n/es'
import pt_L from '../i18n/pt'
import en_L from '../i18n/en'

addLocaleData([...en, ...fr, ...de, ...pt, ...es])

const _messages = {}

_messages['en'] = en_L

_messages['de'] = de_L
_messages['fr'] = fr_L

_messages['es'] = es_L
_messages['pt'] = pt_L

const __supports = [
  'en',
  'de',
  'fr',
  'es',
  'pt'
]

const __lang = (window.lang || 'en').substring(0, 2)

export const lang = __supports.indexOf(__lang) >= 0 ? __lang : 'en'

export const messages = _messages[lang] || _messages['en']
