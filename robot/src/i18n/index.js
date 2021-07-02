import {IntlProvider, FormattedMessage} from 'react-intl'

import en_L from './en'
import es_L from './es'
import de_L from './de'
import fr_L from './fr'
import pt_L from './pt'


const messages = {}
const lang = (window.lang || 'en').substring(0, 2)
messages['en'] = en_L
messages['es'] = es_L
messages['de'] = de_L
messages['fr'] = fr_L
messages['pt'] = pt_L
const message = messages[lang] || messages['en']

export {
    lang,
    message
}

