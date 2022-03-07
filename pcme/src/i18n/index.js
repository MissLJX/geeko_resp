import Vue from 'vue'
import VueI18n from 'vue-i18n'

import ENMessage from './message_en'
import DEMessage from './message_de'
import ESMessage from './message_es'
import FRMessage from './message_fr'
import PTMessage from './message_pt'

import SVMessage from './message_sv'
import DAMessage from './message_da'
import NBMessage from './message_nb'
import ISMessage from './message_is'
import FIMessage from './message_fi'

import VeeValidate from 'vee-validate'
import validationMessagesEN from 'vee-validate/dist/locale/en';
import validationMessagesDE from 'vee-validate/dist/locale/de';
import validationMessagesFR from 'vee-validate/dist/locale/fr';
import validationMessagesES from 'vee-validate/dist/locale/es';
import validationMessagesPT from 'vee-validate/dist/locale/pt_BR';

Vue.use(VueI18n)


const messages = {
    en: ENMessage,
    de: DEMessage,
    es: ESMessage,
    fr: FRMessage,
    pt: PTMessage,
    sv: SVMessage,
    da: DAMessage,
    nb: NBMessage,
    is: ISMessage,
    fi: FIMessage
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

//  适配邮箱验证规则国际化 vee-validate
const dictionary = {
    en:validationMessagesEN,
    de:validationMessagesDE,
    fr:validationMessagesFR,
    es:validationMessagesES,
    pt:validationMessagesPT,
    da:validationMessagesEN,
    fi:validationMessagesEN,
    sv:validationMessagesEN,
    nb:validationMessagesEN,
    is:validationMessagesEN
};

const getLang = lang => {
    return lang ? lang.split('_')[0]:'en'
}

const i18n = new VueI18n({
    locale: languages.find(language => language === getLang(window.locale)) || 'en', // set locale
    messages, // set locale messages
})

Vue.use(VeeValidate, {
    i18nRootKey: 'validations', // customize the root path for validation messages.
    i18n:i18n,
    dictionary: dictionary
 });

export default i18n;


// export default new VueI18n({
//     locale: languages.find(language => language === getLang(window.locale)) || 'en', // set locale 
//     messages, // set locale messages
// })
