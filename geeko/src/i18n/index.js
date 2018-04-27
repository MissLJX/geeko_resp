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
    en_US: ENMessage,
    de_DE: DEMessage,
    es_ES: ESMessage,
    fr_FR: FRMessage,
    pt_BR: PTMessage
}

export default new VueI18n({
    locale: window.locale || 'de_DE', // set locale
    messages, // set locale messages
})
