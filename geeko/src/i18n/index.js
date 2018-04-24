/**
 * Created by shao_ on 2017/7/14.
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'

import ENMessage from './message_en'
import ZHMessage from './message_zh'
import DEMessage from './message_de'
import ESMessage from './message_es'
import FRMessage from './message_fr'
import PTMessage from './message_pt'

Vue.use(VueI18n)


const messages = {
    en: ENMessage,
    zh: ZHMessage,
    de: DEMessage,
    es: ESMessage,//翻译不全
    fr: FRMessage,
    pt: PTMessage
}

export default new VueI18n({
    locale: window.locale || 'pt', // set locale
    messages, // set locale messages
})
