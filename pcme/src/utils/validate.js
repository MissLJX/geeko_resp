import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
Vue.use(VeeValidate);

Validator.extend('phone', {
    getMessage: function () { return " Incorrect phone number format (numbers only, no formatting)" },
    validate: value => {
        return /^\d{1,20}$/.test(value)
    }
});
Validator.extend('phone_br', {
    getMessage: function () { return " Insira pelo menos 8-9 números." },
    validate: value => {
        return /^\d{8,9}$/.test(value)
    }
});
Validator.extend('phone_ae', {
    getMessage: function () { return "Phone numbers should start with 50/52/54/55/56/58/2/3/4/6/7/9, followed by any 7 digits." },
    validate: value => {
        return /^(50|52|54|55|56|58|2|3|4|6|7|9){1,2}\d{7}$/.test(value)
    }
});
Validator.extend('phone_sa', {
    getMessage: function () { return " Phone numbers should start with 50/53/55/51/58/59/54/56/57/11/12/13/14/16/17/811, followed by any 7 digits." },
    validate: value => {
        return /^(50|53|55|51|58|59|54|56|57|11|12|13|14|16|17|811){1,3}\d{7}$/.test(value)
    }
});

Validator.extend('zip_us', {
    getMessage: function () { return "Please enter 5 digits or 5 digits with a 4-digits number (E.g. 20001 or 20001-0000)" },
    validate: value => {
        return /^(([0-9]{5})|([0-9]{5}-[0-9]{4}))$/.test(value)
    }
});
Validator.extend('zip_uk', {
    getMessage: function () { return "Wrong ZIP CODE! Please offer us one or two-letter and one-two figures with a space end with one figure and two letters. (e.g. TN37 7HL,CW8 3AD)" },
    validate: value => {
        return /^([a-z]|[A-Z]){1,2}\w{1,2}\s{0,1}[0-9]{1}([a-z]|[A-Z]){2}$/.test(value)
    }
});
Validator.extend('zip_br', {
    getMessage: function () { return "O formato do endereço está incorreto, preencha o formulário de [01310-000]" },
    validate: value => {
        return /^[0-9]{5}-[0-9]{3}$/.test(value)
    }
});
Validator.extend('cpf', {
    getMessage: function () { return "CPF errado" },
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
