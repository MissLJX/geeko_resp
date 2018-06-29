import en from 'react-intl/locale-data/en'
import {addLocaleData} from 'react-intl'
import en_L from './en.js'

addLocaleData([...en])

const _messages = {}

_messages['en'] = en_L

export const lang = (window.lang || 'en').substring(0, 2)

export const messages = _messages[lang]
