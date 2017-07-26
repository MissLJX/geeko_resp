/**
 * Created by shao_ on 2017/7/14.
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'

import ENMessage from './message_en'
import ZHMessage from './message_zh'

Vue.use(VueI18n)


const messages = {
    en: ENMessage,
    zh: ZHMessage
}


export default new VueI18n({
    locale: window.locale || 'zh', // set locale
    messages, // set locale messages
})
