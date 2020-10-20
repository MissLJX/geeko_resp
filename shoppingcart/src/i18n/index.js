import {addLocaleData} from 'react-intl'

import en from 'react-intl/locale-data/en'
import de from 'react-intl/locale-data/de'
import fr from 'react-intl/locale-data/fr'
import es from 'react-intl/locale-data/es'
import pt from 'react-intl/locale-data/pt'
import sv from 'react-intl/locale-data/sv'
import da from 'react-intl/locale-data/da'
import no from 'react-intl/locale-data/no'
import is from 'react-intl/locale-data/is'
import fi from 'react-intl/locale-data/fi'

import de_L from '../i18n/de'
import fr_L from '../i18n/fr'
import es_L from '../i18n/es'
import pt_L from '../i18n/pt'
import en_L from '../i18n/en'
import sv_L from '../i18n/sv'
import da_L from '../i18n/da'
import no_L from '../i18n/no'
import is_L from '../i18n/is'
import fi_L from '../i18n/fi'

addLocaleData([...en, ...fr, ...de, ...pt, ...es, ...sv, ...da, ...no, ...is, ...fi])

const _messages = {}

_messages['en'] = en_L

_messages['de'] = de_L
_messages['fr'] = fr_L

_messages['es'] = es_L
_messages['pt'] = pt_L

_messages['sv'] = sv_L
_messages['da'] = da_L
_messages['no'] = no_L
_messages['is'] = is_L
_messages['fi'] = fi_L

const __supports = [
  'en',
  'de',
  'fr',
  'es',
  'pt',
  'sv',
  'da',
  'no',
  'is',
  'fi'
]

const __lang = (window.lang || 'en').substring(0, 2)

export const lang = __supports.indexOf(__lang) >= 0 ? __lang : 'en'

export const messages = _messages[lang] || _messages['en']

export const getMessages = (lang) => _messages[lang] || _messages['en']
export const getLang = (lang) => {
  let _lang = (lang || 'en').substring(0, 2)
  return __supports.indexOf(_lang) >= 0 ? _lang : 'en'
}
