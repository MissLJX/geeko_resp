import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import $t from '../i18n'
Vue.use(VeeValidate);

//zip reg
const __reg_zip_us__ = /^(([0-9]{5})|([0-9]{5}-[0-9]{4}))$/ // 美国
const __reg_zip_uk__ = /^([a-z]|[A-Z]){1,2}\w{1,2}\s{0,1}[0-9]{1}([a-z]|[A-Z]){2}$/ //英国
const __reg_zip_br__ = /^[0-9]{5}-[0-9]{3}$/ // 巴西
const __reg_zip_mx__ = /^[0-9]{5}$/ // 墨西哥
const __reg_zip_de__ = /^((0[1-9])|([1-9][0-9]))[0-9]{3}$/ //德意志
const __reg_zip_fr__ = /^[0-9]{5}$/ // 法兰西
const __reg_zip_es__ = /^(0[1-9]|[1-4][0-9]|5[0-2])[0-9]{3}$/ //西班牙
const __reg_zip_it__ = /^[0-9]{5}$/ // 意大利
const __reg_zip_at__ = /^[1-9][0-9]{3}$/ // 奥地利
const __reg_zip_be__ = /^[1-9][0-9]{3}$/ // 比利时
const __reg_zip_au__ = /^[0-9]{4}$/ // 澳大利亚
const __reg_zip_bg__ = /^[0-9]{4}$/ // 保加利亚
const __reg_zip_ca__ = /^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z][\s-]?[0-9][ABCEGHJ-NPRSTV-Z][0-9]$/i //加拿大
const __reg_zip_ch__ = /^[1-9][0-9]{3}$/ // 瑞士
const __reg_zip_cy__ = /^[0-9]{4}$/ // 塞浦路斯
const __reg_zip_cz__ = /^[0-9]{3}\s?[0-9]{2}$/ // 捷克
const __reg_zip_ee__ = /^[0-9]{5}$/ // 爱沙尼亚
const __reg_zip_fi__ = /^[0-9]{5}$/ // 芬兰
const __reg_zip_gr__ = /^[0-9]{3}\s?[0-9]{2}$/ //希腊
const __reg_zip_hr__ = /^[0-9]{5}$/ // 克罗地亚
const __reg_zip_ie__ = /^([AC-FHKNPRTV-Y][0-9]{2}|D6W)\s?[0-9AC-FHKNPRTV-Y]{4}$/i // 爱尔兰
const __reg_zip_lt__ = /^([Ll][Tt][-\s]?)?[0-9]{5}$/ // 立陶宛
const __reg_zip_lu__ = /^[0-9]{4}$/ // 卢森堡
const __reg_zip_lv__ = /^[Ll][Vv][-\s]?[0-9]{4}$/ // 拉脱维亚
const __reg_zip_nl__ = /^[1-9][0-9]{3}\s?((?!SS$|SD$|SA$)[A-Z]{2})$/i // 荷兰
const __reg_zip_no__ = /^[0-9]{4}$/ // 挪威
const __reg_zip_nz__ = /^[0-9]{4}$/ // 新西兰
const __reg_zip_pl__ = /^([0-9]{2}[-\s]?[0-9]{3})$/ // 波兰
const __reg_zip_pt__ = /^([0-9]{4}[-\s]?[0-9]{3})$/ // 葡萄牙
const __reg_zip_ro__ = /^[0-9]{6}$/ // 罗马尼亚
const __reg_zip_se__ = /^[0-9]{3}\s?[0-9]{2}$/ // 瑞典
const __reg_zip_dk__ = /(^([1-9][0-9]{3})$)|(^(0[8-9][0-9]{2})$)/ // 丹麦

const countryRegObj = {
    "US": __reg_zip_us__,
    "GB": __reg_zip_uk__,
    "UK": __reg_zip_uk__,
    "BR": __reg_zip_br__,
    "MX": __reg_zip_mx__,
    "DE": __reg_zip_de__,
    "FR": __reg_zip_fr__,
    "ES": __reg_zip_es__,
    "IT": __reg_zip_it__,
    "AT": __reg_zip_at__,
    "CH": __reg_zip_ch__,
    "BE": __reg_zip_be__,
    "AU": __reg_zip_au__,
    "BG": __reg_zip_bg__,
    "CA": __reg_zip_ca__,
    "CH": __reg_zip_ch__,
    "CY": __reg_zip_cy__,
    "CZ": __reg_zip_cz__,
    "EE": __reg_zip_ee__,
    "FI": __reg_zip_fi__,
    "GR": __reg_zip_gr__,
    "HR": __reg_zip_hr__,
    "IE": __reg_zip_ie__,
    "LT": __reg_zip_lt__,
    "LU": __reg_zip_lu__,
    "LV": __reg_zip_lv__,
    "NL": __reg_zip_nl__,
    "NO": __reg_zip_no__,
    "NZ": __reg_zip_nz__,
    "PL": __reg_zip_pl__,
    "PT": __reg_zip_pt__,
    "RO": __reg_zip_ro__,
    "SE": __reg_zip_se__,
    "DK": __reg_zip_dk__,
}

const countryErrorTipObj = {
    // "US": $t.messages[$t.locale].wrong_zip_code_us,
    // "GB": $t.messages[$t.locale].wrong_zip_code_uk,
    // "UK": $t.messages[$t.locale].wrong_zip_code_uk,
    "BR": $t.messages[$t.locale].wrong_zip_code_br,
    "MX": $t.messages[$t.locale].wrong_zip_code_mx,
    "DE": $t.messages[$t.locale].wrong_zip_code_de,
    "FR": $t.messages[$t.locale].wrong_zip_code_fr,
    "ES": $t.messages[$t.locale].wrong_zip_code_es,
    "IT": $t.messages[$t.locale].wrong_zip_code_it,
    "AT": $t.messages[$t.locale].wrong_zip_code_at,
    "BE": $t.messages[$t.locale].wrong_zip_code_be,
    "AU": $t.messages[$t.locale].wrong_zip_code_au,
    "BG": $t.messages[$t.locale].wrong_zip_code_bg,
    "CA": $t.messages[$t.locale].wrong_zip_code_ca,
    "CH": $t.messages[$t.locale].wrong_zip_code_ch,
    "CY": $t.messages[$t.locale].wrong_zip_code_cy,
    "CZ": $t.messages[$t.locale].wrong_zip_code_cz,
    "EE": $t.messages[$t.locale].wrong_zip_code_ee,
    "FI": $t.messages[$t.locale].wrong_zip_code_fi,
    "GR": $t.messages[$t.locale].wrong_zip_code_gr,
    "HR": $t.messages[$t.locale].wrong_zip_code_hr,
    "IE": $t.messages[$t.locale].wrong_zip_code_ie,
    "LT": $t.messages[$t.locale].wrong_zip_code_lt,
    "LU": $t.messages[$t.locale].wrong_zip_code_lu,
    "LV": $t.messages[$t.locale].wrong_zip_code_lv,
    "NL": $t.messages[$t.locale].wrong_zip_code_nl,
    "NO": $t.messages[$t.locale].wrong_zip_code_no,
    "NZ": $t.messages[$t.locale].wrong_zip_code_nz,
    "PL": $t.messages[$t.locale].wrong_zip_code_pl,
    "PT": $t.messages[$t.locale].wrong_zip_code_pt,
    "RO": $t.messages[$t.locale].wrong_zip_code_ro,
    "SE": $t.messages[$t.locale].wrong_zip_code_se,
    "DK": $t.messages[$t.locale].wrong_zip_code_dk,
}

Validator.extend('phone', {
    getMessage: function () { 
        if($t.locale && $t.messages){
            return $t.messages[$t.locale].phone_enter_rule
        }
        return " Incorrect phone number format (numbers only, no formatting)" 
    },
    validate: value => {
        return /^\d{1,20}$/.test(value)
    }
});
Validator.extend('phone_br', {
    getMessage: function () { 
        // if($t.locale && $t.messages){
        //     return $t.messages[$t.locale].phone_enter_rule_br
        // }
        return "Insira pelo menos 10-11 números." 
    },
    validate: value => {
        return /^\d{10,11}$/.test(value)
    }
});
Validator.extend('phone_ae', {
    getMessage: function () { 
        if($t.locale && $t.messages){
            return $t.messages[$t.locale].phone_enter_rule_ae
        }
        return "Phone numbers should start with 50/52/54/55/56/58/2/3/4/6/7/9, followed by any 7 digits." 
    },
    validate: value => {
        return /^(50|52|54|55|56|58|2|3|4|6|7|9){1,2}\d{7}$/.test(value)
    }
});
Validator.extend('phone_sa', {
    getMessage: function () { 
        if($t.locale && $t.messages){
            return $t.messages[$t.locale].phone_enter_rule_sa
        }
        return " Phone numbers should start with 50/53/55/51/58/59/54/56/57/11/12/13/14/16/17/811, followed by any 7 digits." 
    },
    validate: value => {
        return /^(50|53|55|51|58|59|54|56|57|11|12|13|14|16|17|811){1,3}\d{7}$/.test(value)
    }
});

Validator.extend('zip_us', {
    getMessage: function () { 
        if($t.locale && $t.messages){
            return $t.messages[$t.locale].wrong_zip_code_us
        }
        return "ZIP/Postal code should be 5 digits or 5 digits with a 4-digit number, e.g. 20001 or 20001-0000" 
    },
    validate: value => {
        return /^(([0-9]{5})|([0-9]{5}-[0-9]{4}))$/.test(value)
    }
});
Validator.extend('zip_uk', {
    getMessage: function () { 
        if($t.locale && $t.messages){
            return $t.messages[$t.locale].wrong_zip_code_uk
        }
        return "ZIP/Postal code should contain 6-8 letters, digits and spaces in the format M2 5BQ, CW8 3AD, TN37 7HL." 
    },
    validate: value => {
        return /^([a-z]|[A-Z]){1,2}\w{1,2}\s{0,1}[0-9]{1}([a-z]|[A-Z]){2}$/.test(value)
    }
});

Validator.extend('zip_br', {
    getMessage: function () {
        return countryErrorTipObj['BR']
    },
    validate: value => {
        return countryRegObj['BR'].test(value)
    }
});
Validator.extend('zip_mx', {
    getMessage: function () {
        return countryErrorTipObj['MX']
    },
    validate: value => {
        return countryRegObj['MX'].test(value)
    }
});
Validator.extend('zip_de', {
    getMessage: function () {
        return countryErrorTipObj['DE']
    },
    validate: value => {
        return countryRegObj['DE'].test(value)
    }
});
Validator.extend('zip_fr', {
    getMessage: function () {
        return countryErrorTipObj['FR']
    },
    validate: value => {
        return countryRegObj['FR'].test(value)
    }
});
Validator.extend('zip_es', {
    getMessage: function () {
        return countryErrorTipObj['ES']
    },
    validate: value => {
        return countryRegObj['ES'].test(value)
    }
});
Validator.extend('zip_it', {
    getMessage: function () {
        return countryErrorTipObj['IT']
    },
    validate: value => {
        return countryRegObj['IT'].test(value)
    }
});
Validator.extend('zip_at', {
    getMessage: function () {
        return countryErrorTipObj['AT']
    },
    validate: value => {
        return countryRegObj['AT'].test(value)
    }
});
Validator.extend('zip_be', {
    getMessage: function () {
        return countryErrorTipObj['BE']
    },
    validate: value => {
        return countryRegObj['BE'].test(value)
    }
});
Validator.extend('zip_au', {
    getMessage: function () {
        return countryErrorTipObj['AU']
    },
    validate: value => {
        return countryRegObj['AU'].test(value)
    }
});
Validator.extend('zip_bg', {
    getMessage: function () {
        return countryErrorTipObj['BG']
    },
    validate: value => {
        return countryRegObj['BG'].test(value)
    }
});
Validator.extend('zip_ca', {
    getMessage: function () {
        return countryErrorTipObj['CA']
    },
    validate: value => {
        return countryRegObj['CA'].test(value)
    }
});
Validator.extend('zip_ch', {
    getMessage: function () {
        return countryErrorTipObj['CH']
    },
    validate: value => {
        return countryRegObj['CH'].test(value)
    }
});
Validator.extend('zip_cy', {
    getMessage: function () {
        return countryErrorTipObj['CY']
    },
    validate: value => {
        return countryRegObj['CY'].test(value)
    }
});
Validator.extend('zip_cz', {
    getMessage: function () {
        return countryErrorTipObj['CZ']
    },
    validate: value => {
        return countryRegObj['CZ'].test(value)
    }
});
Validator.extend('zip_ee', {
    getMessage: function () {
        return countryErrorTipObj['EE']
    },
    validate: value => {
        return countryRegObj['EE'].test(value)
    }
});
Validator.extend('zip_fi', {
    getMessage: function () {
        return countryErrorTipObj['FI']
    },
    validate: value => {
        return countryRegObj['FI'].test(value)
    }
});
Validator.extend('zip_gr', {
    getMessage: function () {
        return countryErrorTipObj['GR']
    },
    validate: value => {
        return countryRegObj['GR'].test(value)
    }
});
Validator.extend('zip_hr', {
    getMessage: function () {
        return countryErrorTipObj['HR']
    },
    validate: value => {
        return countryRegObj['HR'].test(value)
    }
});
Validator.extend('zip_ie', {
    getMessage: function () {
        return countryErrorTipObj['IE']
    },
    validate: value => {
        return countryRegObj['IE'].test(value)
    }
});
Validator.extend('zip_lt', {
    getMessage: function () {
        return countryErrorTipObj['LT']
    },
    validate: value => {
        return countryRegObj['LT'].test(value)
    }
});
Validator.extend('zip_lu', {
    getMessage: function () {
        return countryErrorTipObj['LU']
    },
    validate: value => {
        return countryRegObj['LU'].test(value)
    }
});
Validator.extend('zip_lv', {
    getMessage: function () {
        return countryErrorTipObj['LV']
    },
    validate: value => {
        return countryRegObj['LV'].test(value)
    }
});
Validator.extend('zip_nl', {
    getMessage: function () {
        return countryErrorTipObj['NL']
    },
    validate: value => {
        return countryRegObj['NL'].test(value)
    }
});
Validator.extend('zip_no', {
    getMessage: function () {
        return countryErrorTipObj['NO']
    },
    validate: value => {
        return countryRegObj['NO'].test(value)
    }
});
Validator.extend('zip_nz', {
    getMessage: function () {
        return countryErrorTipObj['NZ']
    },
    validate: value => {
        return countryRegObj['NZ'].test(value)
    }
});
Validator.extend('zip_pl', {
    getMessage: function () {
        return countryErrorTipObj['PL']
    },
    validate: value => {
        return countryRegObj['PL'].test(value)
    }
});
Validator.extend('zip_pt', {
    getMessage: function () {
        return countryErrorTipObj['PT']
    },
    validate: value => {
        return countryRegObj['PT'].test(value)
    }
});
Validator.extend('zip_ro', {
    getMessage: function () {
        return countryErrorTipObj['RO']
    },
    validate: value => {
        return countryRegObj['RO'].test(value)
    }
});
Validator.extend('zip_se', {
    getMessage: function () {
        return countryErrorTipObj['SE']
    },
    validate: value => {
        return countryRegObj['SE'].test(value)
    }
});
Validator.extend('zip_dk', {
    getMessage: function () {
        return countryErrorTipObj['DK']
    },
    validate: value => {
        return countryRegObj['DK'].test(value)
    }
});
Validator.extend('cpf', {
    getMessage: function () { 
        if($t.locale && $t.messages){
            return $t.messages[$t.locale].cpf_enter_rule
        }
        return "CPF errado" 
    },
    validate: value => {
        var result = true

        value = value.replace('-', '')
        value = value.replace(/\./g, '')

        // this is mostly not needed
        var invalidos = [ '11111111111', '22222222222', '33333333333',
            '44444444444', '55555555555', '66666666666',
            '77777777777', '88888888888', '99999999999',
            '00000000000' ]

        for (let i = 0; i < invalidos.length; i++) {
            if (invalidos[i] == value) {
                result = false
            }
        }

        if (value.length > 11) {
            result = false
        }

        // validando primeiro digito
        let add = 0
        for (let i = 0; i < 9; i++) {
            add += parseInt(value.charAt(i), 10) * (10 - i)
        }
        let rev = 11 - (add % 11)
        if (rev == 10 || rev == 11) {
            rev = 0
        }
        if (rev != parseInt(value.charAt(9), 10)) {
            result = false
        }

        // validando segundo digito
        add = 0
        for (let i = 0; i < 10; i++) {
            add += parseInt(value.charAt(i), 10) * (11 - i)
        }
        rev = 11 - (add % 11)
        if (rev == 10 || rev == 11) {
            rev = 0
        }
        if (rev != parseInt(value.charAt(10), 10)) {
            result = false
        }

        return result
    }
});
