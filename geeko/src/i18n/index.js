/**
 * Created by shao_ on 2017/7/14.
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'

import ENMessage from './message_en'
import DEMessage from './message_de'
import ESMessage from './message_es'
import FRMessage from './message_fr'
import PTMessage from './message_pt'

Vue.use(VueI18n)


const messages = {
    en: ENMessage,
    de: DEMessage,
    es: ESMessage,
    fr: FRMessage,
    pt: PTMessage
}

const languages = [
    'en',
    'de',
    'es',
    'fr',
    'pt'
]

export default new VueI18n({
    locale: languages.find(language => language === window.locale) || 'en', // set locale
    messages, // set locale messages
})
