import {IntlProvider, FormattedMessage} from 'react-intl'

import en_L from './en'


const messages = {}
const lang = (window.lang || 'en').substring(0, 2)
messages['en'] = en_L
const message = messages[lang] || messages['en']

export {
    lang,
    message
}

