(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{467:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),l=p(["\n\tposition: relative;\n\t\n"],["\n\tposition: relative;\n\t\n"]),r=p(["\n\theight: 50px;\n\tline-height: 50px;\n\tposition: absolute;\n\ttop: 0;\n\twidth: 100%;\n\tbackground-color: #fff;\n\tz-index: 10;\n"],["\n\theight: 50px;\n\tline-height: 50px;\n\tposition: absolute;\n\ttop: 0;\n\twidth: 100%;\n\tbackground-color: #fff;\n\tz-index: 10;\n"]),o=p(["\n\tfont-size: 18px;\n\tfont-weight: 400;\n\ttext-align: center;\n"],["\n\tfont-size: 18px;\n\tfont-weight: 400;\n\ttext-align: center;\n"]),i=p(["\n\tdisplay: inline-block;\n\tposition: absolute;\n\tright: 10px;\n\ttop: 0;\n\tcursor: pointer;\n"],["\n\tdisplay: inline-block;\n\tposition: absolute;\n\tright: 10px;\n\ttop: 0;\n\tcursor: pointer;\n"]),s=p(["\n\theight: 100vh;\n\toverflow: auto;\n\tpadding-top: 50px;\n\t-webkit-overflow-scrolling: touch;\n"],["\n\theight: 100vh;\n\toverflow: auto;\n\tpadding-top: 50px;\n\t-webkit-overflow-scrolling: touch;\n"]),u=f(n(2)),d=f(n(111)),c=f(n(471));function f(e){return e&&e.__esModule?e:{default:e}}function p(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var h=d.default.div(l),m=d.default.div(r),b=d.default.h1(o),g=d.default.span(i),v=d.default.div(s),y=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,u.default.Component),a(t,[{key:"componentWillMount",value:function(){document.body.style.overflow="hidden"}},{key:"componentWillUnmount",value:function(){document.body.style.overflow="auto"}},{key:"render",value:function(){var e=this.props;return u.default.createElement(h,null,u.default.createElement(m,null,u.default.createElement(b,null,e.title),u.default.createElement(g,{onClick:e.onClose},u.default.createElement(c.default,{style:{fontSize:25,cursor:"pointer"}},""))),u.default.createElement(v,null,e.children))}}]),t}();t.default=y},468:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Button=t.Select=t.Input=t.Form=void 0;var a,l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},r=(a=n(2))&&a.__esModule?a:{default:a},o=n(482);function i(e,t){var n={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}t.Form=(0,o.form)(function(e){e.getValues,e.validate,e.validateAll,e.showError,e.hideError;var t=e.children,n=i(e,["getValues","validate","validateAll","showError","hideError","children"]);return r.default.createElement("form",n,t)}),t.Input=(0,o.control)(function(e){var t=e.error,n=e.isChanged,a=e.isUsed,o=e.divStyle,s=i(e,["error","isChanged","isUsed","divStyle"]);return r.default.createElement("div",{className:n&&a&&t?"error":"",style:o},r.default.createElement("input",l({},s,{className:"x-default-input"})),r.default.createElement("p",null,n&&a&&t))}),t.Select=(0,o.control)(function(e){var t=e.error,n=e.isChanged,a=e.isUsed,l=i(e,["error","isChanged","isUsed"]);return r.default.createElement("div",{className:n&&a&&t?"error":""},r.default.createElement("select",l),r.default.createElement("p",null,n&&a&&t))}),t.Button=(0,o.button)(function(e){var t=e.hasErrors,n=i(e,["hasErrors"]);return r.default.createElement("button",l({},n,{disabled:t&&!n.ingoredisable}))})},469:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getDNI=t.dni=t.phone=t.zip=t.cpf=t.email=t.number=t.required=t.cpfcheck=t.__reg_document_ur__=t.__reg_document_co__=t.__reg_document_cl__=t.__reg_document_ar__=t.__reg_phone_sa_=t.__reg_phone_ae_=t.__reg_phone_br__=t.__reg_phone_normal__=t.__reg_zip_br__=t.__reg_zip_uk__=t.__reg_zip_us__=void 0;var a=r(n(2)),l=r(n(483));function r(e){return e&&e.__esModule?e:{default:e}}var o=t.__reg_zip_us__=/^(([0-9]{5})|([0-9]{5}-[0-9]{4}))$/,i=t.__reg_zip_uk__=/^([a-z]|[A-Z]){1,2}\w{1,2}\s{0,1}[0-9]{1}([a-z]|[A-Z]){2}$/,s=t.__reg_zip_br__=/^[0-9]{5}-[0-9]{3}$/,u=t.__reg_phone_normal__=/^\d{1,20}$/,d=t.__reg_phone_br__=/^\d{8,9}$/,c=t.__reg_phone_ae_=/^(50|52|54|55|56|58|2|3|4|6|7|9){1,2}\d{7}$/,f=t.__reg_phone_sa_=/^(50|53|55|51|58|59|54|56|57|11|12|13|14|16|17|811){1,3}\d{7}$/,p=t.__reg_document_ar__=/^(\d{7,9}|\d{11})$/,h=t.__reg_document_cl__=/^\d{8,9}$/,m=t.__reg_document_co__=/^\d{6,10}$/,b=t.__reg_document_ur__=/^\d{6,8}$/,g=t.cpfcheck=function(e){var t=!0;e=(e=e.replace("-","")).replace(/\./g,"");for(var n=["11111111111","22222222222","33333333333","44444444444","55555555555","66666666666","77777777777","88888888888","99999999999","00000000000"],a=0;a<n.length;a++)n[a]==e&&(t=!1);e.length>11&&(t=!1);for(var l=0,r=0;r<9;r++)l+=parseInt(e.charAt(r),10)*(10-r);var o=11-l%11;10!=o&&11!=o||(o=0),o!=parseInt(e.charAt(9),10)&&(t=!1),l=0;for(var i=0;i<10;i++)l+=parseInt(e.charAt(i),10)*(11-i);return 10!=(o=11-l%11)&&11!=o||(o=0),o!=parseInt(e.charAt(10),10)&&(t=!1),t},v=(t.required=function(e){if(!e||!e.toString().trim().length)return"required"},t.number=function(e){if(e&&!l.default.isInt(e,{min:0,max:99}))return a.default.createElement("p",null)},t.email=function(e){if(!l.default.isEmail(e))return a.default.createElement("p",null,e," is not a valid email")},t.cpf=function(e){if(!g(e))return a.default.createElement("p",null,e," is not a valid cpf")},t.zip=function(e,t,n){var a=void 0,l=void 0;switch(n.country[0].value){case"US":a=o,l="Please enter 5 digits or 5 digits with a 4-digits number (E.g. 20001 or 20001-0000)";break;case"GB":a=i,l="Wrong ZIP CODE! Please offer us one or two-letter and one-two figures with a space end with one figure and two letters. (e.g. TN37 7HL,CW8 3AD)";break;case"BR":a=s,l="O formato do endereço está incorreto, preencha o formulário de [01310-000]"}if(a&&!a.test(e))return l},t.phone=function(e,t,n){var a=void 0,l=void 0;switch(n.country[0].value){case"BR":a=d,l="Insira pelo menos 8-9 números.";break;case"AE":a=c,l="Phone numbers should start with 50/52/54/55/56/58/2/3/4/6/7/9, followed by any 7 digits.";break;case"SA":a=f,l="Phone numbers should start with 50/53/55/51/58/59/54/56/57/11/12/13/14/16/17/811, followed by any 7 digits.";break;default:a=u,l="Incorrect phone number format (numbers only, no formatting)"}if(a&&!a.test(e))return l},t.dni=function(e){var t=void 0,n=void 0;switch(e){case"AR":t=p,n="DNI debe estar entre 7 a 9, u 11 dígitos";break;case"CL":t=h,n="CI/RUT debe tener entre 8 y 9 dígitos";break;case"CO":t=m,n="Cédula de ciudadanía debe tener entre 6 y 10 dígitos";break;case"UY":t=b,n="Cédula de identidad debe tener entre 6 y 8 dígitos";break;default:t=/\d/,n="Incorrect document"}return function(e){if(t&&!t.test(e))return n}});t.getDNI=function(e){switch(e){case"26":case"27":case"28":return v("AR");case"30":case"31":case"32":return v("CO");case"30":case"31":case"32":return v("CL");case"36":case"37":return v("UY");default:return v("US")}}},470:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.InlineStyledControl=t.StyledControl=void 0;var a,l=i(["\n\tlabel{\n\t\tfont-size: 12px;\n\t\tmargin-bottom: 5px;\n\t\tdisplay: block;\n\t}\n\n\tinput, select{\n\t\tborder: 1px solid #666;\n\t\toutline: none;\n\t\t-webkit-appearance: none;\n    \toutline: none;\n    \tbox-shadow: none;\n    \theight: 35px;\n    \twidth: 100%;\n    \tpadding-left: 10px;\n    \tbackground-color: ",";\n\t}\n\n\tinput[disabled], select[disabled]{\n\t\tborder-color: rgb(202,202,202);\n    color: rgb(202,202,202);\n\t}\n\n\n\t& .error{\n\t\tp{\n\t\t\tfont-size: 12px;\n\t\t\tmargin-top: 5px;\n\t\t\tcolor: #E64545;\n\t\t}\n\t\tinput, select{\n\t\t\tborder: 1px solid #E64545;\n    \t\tbox-shadow: inset 0 0 1px #E64545;\n\t\t}\n\t}\n"],["\n\tlabel{\n\t\tfont-size: 12px;\n\t\tmargin-bottom: 5px;\n\t\tdisplay: block;\n\t}\n\n\tinput, select{\n\t\tborder: 1px solid #666;\n\t\toutline: none;\n\t\t-webkit-appearance: none;\n    \toutline: none;\n    \tbox-shadow: none;\n    \theight: 35px;\n    \twidth: 100%;\n    \tpadding-left: 10px;\n    \tbackground-color: ",";\n\t}\n\n\tinput[disabled], select[disabled]{\n\t\tborder-color: rgb(202,202,202);\n    color: rgb(202,202,202);\n\t}\n\n\n\t& .error{\n\t\tp{\n\t\t\tfont-size: 12px;\n\t\t\tmargin-top: 5px;\n\t\t\tcolor: #E64545;\n\t\t}\n\t\tinput, select{\n\t\t\tborder: 1px solid #E64545;\n    \t\tbox-shadow: inset 0 0 1px #E64545;\n\t\t}\n\t}\n"]),r=i(["\n\tdisplay: inline-block;\n\tlabel{\n\t\tfont-size: 12px;\n\t\tmargin-right: 10px;\n\t}\n\n\tinput, select{\n\t\tborder: 1px solid #666;\n\t\toutline: none;\n\t\t-webkit-appearance: none;\n    \toutline: none;\n    \tbox-shadow: none;\n    \theight: 35px;\n    \twidth: 100%;\n    \tpadding-left: 10px;\n    \tbackground-color: ",";\n\t}\n\n\tinput[disabled], select[disabled]{\n\t\tborder-color: rgb(202,202,202);\n    color: rgb(202,202,202);\n\t}\n\n\n\t& .error{\n\t\tp{\n\t\t\tfont-size: 12px;\n\t\t\tmargin-top: 5px;\n\t\t\tcolor: #e5004f;\n\t\t}\n\t\tinput, select{\n\t\t\tborder: 1px solid #e5004f;\n    \t\tbox-shadow: inset 0 0 1px #e5004f;\n\t\t}\n\t}\n"],["\n\tdisplay: inline-block;\n\tlabel{\n\t\tfont-size: 12px;\n\t\tmargin-right: 10px;\n\t}\n\n\tinput, select{\n\t\tborder: 1px solid #666;\n\t\toutline: none;\n\t\t-webkit-appearance: none;\n    \toutline: none;\n    \tbox-shadow: none;\n    \theight: 35px;\n    \twidth: 100%;\n    \tpadding-left: 10px;\n    \tbackground-color: ",";\n\t}\n\n\tinput[disabled], select[disabled]{\n\t\tborder-color: rgb(202,202,202);\n    color: rgb(202,202,202);\n\t}\n\n\n\t& .error{\n\t\tp{\n\t\t\tfont-size: 12px;\n\t\t\tmargin-top: 5px;\n\t\t\tcolor: #e5004f;\n\t\t}\n\t\tinput, select{\n\t\t\tborder: 1px solid #e5004f;\n    \t\tbox-shadow: inset 0 0 1px #e5004f;\n\t\t}\n\t}\n"]),o=(a=n(111))&&a.__esModule?a:{default:a};function i(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}t.StyledControl=o.default.div(l,function(e){return e.inputColor||"transparent"}),t.InlineStyledControl=o.default.div(r,function(e){return e.inputColor||"transparent"})},554:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,l,r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=(a=["\n    \tmax-width: 320px;\n    \twidth: 80%;\n    \tmargin-left: auto;\n    \tmargin-right: auto;\n      padding-bottom: 50px;\n\n    "],l=["\n    \tmax-width: 320px;\n    \twidth: 80%;\n    \tmargin-left: auto;\n    \tmargin-right: auto;\n      padding-bottom: 50px;\n\n    "],Object.freeze(Object.defineProperties(a,{raw:{value:Object.freeze(l)}}))),s=b(n(2)),u=b(n(111)),d=n(173),c=n(172),f=b(n(467)),p=b(n(555)),h=n(171),m=n(112);function b(e){return e&&e.__esModule?e:{default:e}}n(113);var g=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.close=n.close.bind(n),n.editAddress=n.editAddress.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,s.default.Component),o(t,[{key:"close",value:function(){this.props.history.replace((window.ctx||"")+"/order-confirm/"+this.props.transaction.transactionId)}},{key:"editAddress",value:function(e){var t=this,n=this.props.transaction.transactionId;(0,h.updateorderaddress)(r({},e,{id:this.props.address.id,transactionId:n})).then(function(){t.close(),t.props.REFRESHORDERCONFIRM(n)}).catch(function(e){var t=e.result;alert(t)})}},{key:"render",value:function(){var e=this.props,t=e.address,n=e.intl,a=u.default.div(i);return s.default.createElement(f.default,{onClose:this.close,title:n.formatMessage({id:"address"})},s.default.createElement(a,null,s.default.createElement("p",null,"* ",n.formatMessage({id:"required_tips"})),s.default.createElement(p.default,{editAddress:this.editAddress,style:{marginTop:15},address:t})))}}]),t}();t.default=(0,d.connect)(function(e){return{transaction:e.transaction,address:e.transaction?e.transaction.shippingDetail:null}},function(e){return{REFRESHORDERCONFIRM:function(t){e((0,c.fetchTransaction)(t))}}})((0,m.injectIntl)(g))},555:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=m(n(2)),o=n(468),i=n(469),s=n(470),u=n(477),d=n(171),c=n(112),f=m(n(617)),p=m(n(618)),h=m(n(619));function m(e){return e&&e.__esModule?e:{default:e}}var b=function(){return(window.lang?window.lang.split("_"):[])[1]||"US"},g=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={isEdit:!1,name:"",streetAddress1:"",unit:"",city:"",zipCode:"",state:"",country:"",phoneNumber:"",defaultAddress:!1,countries:null,states:null,phoneArea:"",cpf:"",hasValidated:!1,askMessage:"",showAsk:!1},n.handleInputChange=n.handleInputChange.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.default.Component),l(t,[{key:"handleInputChange",value:function(e){var t=e.target,n="checkbox"===t.type?t.checked:t.value,a=t.name;if("zipCode"===a&&"BR"===this.state.country&&n&&n.length>5){var l=n.replace(/-/gi,"").split("");l.splice(5,0,"-"),n=l.join("")}"phoneArea"===a&&n&&n.length>2&&(n=n.slice(0,2)),this.setState(function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}({},a,n))}},{key:"changeCountry",value:function(e){var t=e.target.value;this.getStates(t),this.setState({state:""})}},{key:"handleSubmit",value:function(e){e.preventDefault();var t=void 0,n=void 0;switch(this.state.country){case"BR":t=this.brForm,n=this.brAddressButtn;break;case"AE":case"SA":t=this.alForm,n=this.alAddressButtn;break;default:t=this.form,n=this.addressButtn}if(t.validateAll(),!n.context._errors||n.context._errors.length<1){var a=this.state,l=a.name,r=a.streetAddress1,o=a.unit,i=a.city,s=a.zipCode,u=a.state,d=a.country,c=a.phoneNumber,f=a.defaultAddress,p=a.phoneArea,h=a.cpf;this.props.editAddress({name:l,streetAddress1:r,unit:o,city:i,zipCode:s,state:u,country:d,phoneNumber:c,defaultAddress:f,phoneArea:p,cpf:h})}}},{key:"componentWillReceiveProps",value:function(e){var t=e.address;this.initAddress(t)}},{key:"componentWillMount",value:function(){var e=this.props.address;this.initAddress(e)}},{key:"initAddress",value:function(e){var t=this;if(e){var n=e.name,a=e.streetAddress1,l=e.unit,r=e.city,o=e.zipCode,i=e.phoneNumber,s=e.isDefaultAddress,u=e.country,c=e.state,f=e.phoneArea,p=e.cpf,h=u?u.value:"";this.setState({isEdit:!0,name:n,streetAddress1:a,unit:l,city:r,zipCode:o,phoneNumber:i,country:h,state:c?c.value:"",defaultAddress:s,phoneArea:f||"",cpf:p||""}),this.getStates(h)}else this.setState({country:b()}),this.getStates(b());(0,d.getCountries)().then(function(e){var n=e.result;t.setState({countries:n})})}},{key:"getStates",value:function(e){var t=this;(0,d.getStates)(e).then(function(e){var n=e.result;t.setState({states:n})})}},{key:"formRef",value:function(e,t){"BR"===t?this.brForm=e:this.form=e,this.props.needInitValidate&&!this.state.hasValidated&&(e.validateAll(),this.setState({hasValidated:!0}))}},{key:"cpfClickHandle",value:function(){this.setState({showAsk:!0,askMessage:"CPF (Cadastro de Pessoa Física), utilizado para tributação, é necessário para todos os produtos enviados ao Brasil, independentemente de encomendas expressas ou contêineres logísticos.Quando preenchemos o conhecimento de embarque e fatura, por favor, não esqueça de preencher o número de contribuinte do destinatário.Na maioria dos casos, sua forma é o número digital como abaixo, XXX.XXX.XXX-XX"})}},{key:"render",value:function(){var e=this,t=this.props.intl,n=["BR","AE","SA"].indexOf(this.state.country)<0;return r.default.createElement("div",null,r.default.createElement(o.Form,{style:a({},this.props.style,{display:n?"block":"none"}),ref:function(t){e.formRef(t)},onSubmit:this.handleSubmit.bind(this)},r.default.createElement(u.FormLayout,null,r.default.createElement(s.StyledControl,null,r.default.createElement("label",null,t.formatMessage({id:"full_name"}),"*"),r.default.createElement(o.Input,{name:"name",value:this.state.name,onChange:this.handleInputChange,validations:[i.required]})),r.default.createElement(s.StyledControl,null,r.default.createElement("label",null,t.formatMessage({id:"street_address"}),"*"),r.default.createElement(o.Input,{name:"streetAddress1",value:this.state.streetAddress1,onChange:this.handleInputChange,placeholder:t.formatMessage({id:"placeholder_street_address"}),validations:[i.required]})),r.default.createElement(s.StyledControl,null,r.default.createElement("label",null,t.formatMessage({id:"unit"})),r.default.createElement(o.Input,{name:"unit",value:this.state.unit,placeholder:t.formatMessage({id:"placeholder_unit"}),onChange:this.handleInputChange})),r.default.createElement(u.MultiControl,null,r.default.createElement(s.StyledControl,null,r.default.createElement("label",null,t.formatMessage({id:"country"}),"*"),r.default.createElement(o.Select,{className:"x-select",value:this.state.country,name:"country",disabled:this.props.disablecountry,onChange:function(t){e.handleInputChange(t),e.changeCountry(t)},validations:[i.required]},r.default.createElement("option",{value:""},"Country"),this.state.countries&&this.state.countries.map(function(e){return r.default.createElement("option",{key:e.value,value:e.value},e.label)}))),r.default.createElement(s.StyledControl,null,r.default.createElement("label",null,t.formatMessage({id:"state"})),this.state.states&&this.state.states.length?r.default.createElement(o.Select,{className:"x-select",name:"state",value:this.state.state,onChange:this.handleInputChange,validations:[i.required]},r.default.createElement("option",{value:""},"State"),this.state.states&&this.state.states.map(function(e){return r.default.createElement("option",{key:e.value,value:e.value},e.label)})):r.default.createElement(o.Input,{name:"state",value:this.state.state,onChange:this.handleInputChange}))),r.default.createElement(s.StyledControl,null,r.default.createElement("label",null,t.formatMessage({id:"city"})),r.default.createElement(o.Input,{name:"city",value:this.state.city,onChange:this.handleInputChange})),r.default.createElement(u.MultiControl,null,r.default.createElement(s.StyledControl,null,r.default.createElement("label",null,t.formatMessage({id:"zip_code"}),"*"),r.default.createElement(o.Input,{name:"zipCode",value:this.state.zipCode,onChange:this.handleInputChange,validations:[i.required,i.zip]})),r.default.createElement(s.StyledControl,null,r.default.createElement("label",null,t.formatMessage({id:"phone_number"}),"*"),r.default.createElement(o.Input,{name:"phoneNumber",value:this.state.phoneNumber,onChange:this.handleInputChange,validations:[i.required,i.phone]}))),r.default.createElement("div",null,r.default.createElement(o.Button,{className:"__submitbtn",ref:function(t){return e.addressButtn=t},ingoredisable:"true",style:{display:"block",backgroundColor:"#222",color:"#fff",height:40,lineHeight:"40px",textAlign:"center",outline:"none",border:"none",width:"100%"}},t.formatMessage({id:"submit"}))))),r.default.createElement(o.Form,{style:a({},this.props.style,{display:"BR"===this.state.country?"block":"none"}),ref:function(t){e.formRef(t,"BR")},onSubmit:this.handleSubmit.bind(this)},r.default.createElement(u.FormLayout,null,r.default.createElement(s.StyledControl,null,r.default.createElement("label",null,t.formatMessage({id:"full_name"}),"*"),r.default.createElement(o.Input,{name:"name",value:this.state.name,onChange:this.handleInputChange,validations:[i.required]})),r.default.createElement(s.StyledControl,null,r.default.createElement("label",null,t.formatMessage({id:"street_address"}),"*"),r.default.createElement(o.Input,{name:"streetAddress1",value:this.state.streetAddress1,onChange:this.handleInputChange,placeholder:t.formatMessage({id:"placeholder_street_address"}),validations:[i.required]})),r.default.createElement(s.StyledControl,null,r.default.createElement("label",null,t.formatMessage({id:"unit"})),r.default.createElement(o.Input,{name:"unit",value:this.state.unit,placeholder:t.formatMessage({id:"placeholder_unit"}),onChange:this.handleInputChange})),r.default.createElement(u.MultiControl,null,r.default.createElement(s.StyledControl,null,r.default.createElement("label",null,t.formatMessage({id:"country"}),"*"),r.default.createElement(o.Select,{className:"x-select",value:this.state.country,name:"country",disabled:this.props.disablecountry,onChange:function(t){e.handleInputChange(t),e.changeCountry(t)},validations:[i.required]},r.default.createElement("option",{value:""},"Country"),this.state.countries&&this.state.countries.map(function(e){return r.default.createElement("option",{key:e.value,value:e.value},e.label)}))),r.default.createElement(s.StyledControl,null,r.default.createElement("label",null,t.formatMessage({id:"state"})),this.state.states&&this.state.states.length?r.default.createElement(o.Select,{className:"x-select",name:"state",value:this.state.state,onChange:this.handleInputChange,validations:[i.required]},r.default.createElement("option",{value:""},"State"),this.state.states&&this.state.states.map(function(e){return r.default.createElement("option",{key:e.value,value:e.value},e.label)})):r.default.createElement(o.Input,{name:"state",value:this.state.state,onChange:this.handleInputChange}))),r.default.createElement(s.StyledControl,null,r.default.createElement("label",null,t.formatMessage({id:"city"})),r.default.createElement(o.Input,{name:"city",value:this.state.city,onChange:this.handleInputChange})),r.default.createElement(s.StyledControl,null,r.default.createElement("label",null,t.formatMessage({id:"zip_code"}),"*"),r.default.createElement(o.Input,{name:"zipCode",value:this.state.zipCode,onChange:this.handleInputChange,validations:[i.required,i.zip]})),r.default.createElement(s.StyledControl,null,r.default.createElement("label",null,t.formatMessage({id:"phone_number"}),"*"),r.default.createElement("div",null,r.default.createElement("span",{style:{width:59,display:"inline-block"}},"BR +55"),r.default.createElement(o.Input,{divStyle:{width:55,marginRight:10,display:"inline-block"},style:{paddingLeft:0,textAlign:"center"},name:"phoneArea",placeholder:"Código",type:"number",maxLength:2,value:this.state.phoneArea,onChange:this.handleInputChange,validations:[i.number]}),r.default.createElement(o.Input,{name:"phoneNumber",divStyle:{width:"calc(100% - 124px)",display:"inline-block",verticalAlign:"top"},value:this.state.phoneNumber,type:"number",onChange:this.handleInputChange,validations:[i.required,i.phone]}))),r.default.createElement(s.StyledControl,null,r.default.createElement("label",null,"CPF* ",r.default.createElement(f.default,{style:{marginLeft:4},onClick:this.cpfClickHandle.bind(this)})),r.default.createElement(o.Input,{name:"cpf",value:this.state.cpf,onChange:this.handleInputChange,validations:[i.required,i.cpf]})),r.default.createElement("div",null,r.default.createElement(o.Button,{className:"__submitbtn",ref:function(t){return e.brAddressButtn=t},ingoredisable:"true",style:{display:"block",backgroundColor:"#222",color:"#fff",height:40,lineHeight:"40px",textAlign:"center",outline:"none",border:"none",width:"100%"}},t.formatMessage({id:"submit"}))))),r.default.createElement(o.Form,{style:a({},this.props.style,{display:"AE"===this.state.country||"SA"===this.state.country?"block":"none"}),ref:function(t){e.alForm=t},onSubmit:this.handleSubmit.bind(this)},r.default.createElement(u.FormLayout,null,r.default.createElement(s.StyledControl,null,r.default.createElement("label",null,t.formatMessage({id:"full_name"}),"*"),r.default.createElement(o.Input,{name:"name",value:this.state.name,onChange:this.handleInputChange,validations:[i.required]})),r.default.createElement(s.StyledControl,null,r.default.createElement("label",null,t.formatMessage({id:"street_address"}),"*"),r.default.createElement(o.Input,{name:"streetAddress1",value:this.state.streetAddress1,onChange:this.handleInputChange,placeholder:t.formatMessage({id:"placeholder_street_address"}),validations:[i.required]})),r.default.createElement(s.StyledControl,null,r.default.createElement("label",null,t.formatMessage({id:"unit"})),r.default.createElement(o.Input,{name:"unit",value:this.state.unit,placeholder:t.formatMessage({id:"placeholder_unit"}),onChange:this.handleInputChange})),r.default.createElement(u.MultiControl,null,r.default.createElement(s.StyledControl,null,r.default.createElement("label",null,t.formatMessage({id:"country"}),"*"),r.default.createElement(o.Select,{className:"x-select",value:this.state.country,disabled:this.props.disablecountry,name:"country",onChange:function(t){e.handleInputChange(t),e.changeCountry(t)},validations:[i.required]},r.default.createElement("option",{value:""},"Country"),this.state.countries&&this.state.countries.map(function(e){return r.default.createElement("option",{key:e.value,value:e.value},e.label)}))),r.default.createElement(s.StyledControl,null,r.default.createElement("label",null,t.formatMessage({id:"state"})),this.state.states&&this.state.states.length?r.default.createElement(o.Select,{className:"x-select",name:"state",value:this.state.state,onChange:this.handleInputChange,validations:[i.required]},r.default.createElement("option",{value:""},"State"),this.state.states&&this.state.states.map(function(e){return r.default.createElement("option",{key:e.value,value:e.value},e.label)})):r.default.createElement(o.Input,{name:"state",value:this.state.state,onChange:this.handleInputChange}))),r.default.createElement(s.StyledControl,null,r.default.createElement("label",null,t.formatMessage({id:"city"})),r.default.createElement(o.Input,{name:"city",value:this.state.city,onChange:this.handleInputChange})),r.default.createElement(s.StyledControl,null,r.default.createElement("label",null,t.formatMessage({id:"zip_code"}),"*"),r.default.createElement(o.Input,{name:"zipCode",value:this.state.zipCode,onChange:this.handleInputChange,validations:[i.required,i.zip]})),r.default.createElement(s.StyledControl,null,r.default.createElement("label",null,t.formatMessage({id:"phone_number"}),"*"),r.default.createElement("div",null,"AE"===this.state.country&&r.default.createElement("span",{style:{width:69,display:"inline-block",paddingTop:10}},"UAE +971"),"SA"===this.state.country&&r.default.createElement("span",{style:{width:69,display:"inline-block",paddingTop:10}},"KSA +966"),r.default.createElement(o.Input,{name:"phoneNumber",divStyle:{width:"calc(100% - 79px)",display:"inline-block",verticalAlign:"top"},value:this.state.phoneNumber,type:"number",onChange:this.handleInputChange,validations:[i.required,i.phone]}))),r.default.createElement("div",null,r.default.createElement(o.Button,{className:"__submitbtn",ref:function(t){return e.alAddressButtn=t},ingoredisable:"true",style:{display:"block",backgroundColor:"#222",color:"#fff",height:40,lineHeight:"40px",textAlign:"center",outline:"none",border:"none",width:"100%"}},t.formatMessage({id:"submit"}))))),this.state.showAsk&&this.state.askMessage&&r.default.createElement(r.default.Fragment,null,r.default.createElement(h.default,null),r.default.createElement(p.default,{onClose:function(){e.setState({showAsk:!1,askMessage:null})}},r.default.createElement("p",{dangerouslySetInnerHTML:{__html:this.state.askMessage}}))))}}]),t}();t.default=(0,c.injectIntl)(g)},617:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,l,r=(a=["\n\twidth: ","px;\n\theight: ","px;\n\tborder-radius: 50%;\n\tborder: 1px solid #999;\n\tcursor: pointer;\n\tdisplay: inline-block;\n\tfont-size: 12px;\n\tline-height: ","px;\n\ttext-align: center;\n\tcolor: #999;\n\n"],l=["\n\twidth: ","px;\n\theight: ","px;\n\tborder-radius: 50%;\n\tborder: 1px solid #999;\n\tcursor: pointer;\n\tdisplay: inline-block;\n\tfont-size: 12px;\n\tline-height: ","px;\n\ttext-align: center;\n\tcolor: #999;\n\n"],Object.freeze(Object.defineProperties(a,{raw:{value:Object.freeze(l)}}))),o=i(n(2));function i(e){return e&&e.__esModule?e:{default:e}}var s=i(n(111)).default.span(r,function(e){return e.width||18},function(e){return e.width||18},function(e){return e.width-2||16});t.default=function(e){return o.default.createElement(s,e,"?")}},618:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=u(["\n\tposition: fixed;\n\twidth: 80%;\n\ttransform: translate(-50%, -50%);\n\ttop: 50%;\n\tleft: 50%;\n\tbackground-color: #fff;\n\tz-index: 10;\n"],["\n\tposition: fixed;\n\twidth: 80%;\n\ttransform: translate(-50%, -50%);\n\ttop: 50%;\n\tleft: 50%;\n\tbackground-color: #fff;\n\tz-index: 10;\n"]),l=u(["\n\tpadding: 40px 20px 20px 20px;\n\tline-height: 25px;\n"],["\n\tpadding: 40px 20px 20px 20px;\n\tline-height: 25px;\n"]),r=u(["\n\tfont-size: 25px !important;\n\tcursor: pointer;\n\tposition: absolute;\n\tright: 10px;\n\ttop: 10px;\n"],["\n\tfont-size: 25px !important;\n\tcursor: pointer;\n\tposition: absolute;\n\tright: 10px;\n\ttop: 10px;\n"]),o=s(n(2)),i=s(n(111));function s(e){return e&&e.__esModule?e:{default:e}}function u(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var d=i.default.div(a),c=i.default.div(l),f=i.default.span(r);t.default=function(e){return o.default.createElement(d,null,o.default.createElement(f,{onClick:e.onClose,className:"iconfont"},""),o.default.createElement(c,null,e.children))}},619:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},r=(a=n(2))&&a.__esModule?a:{default:a};t.default=function(e){return r.default.createElement("div",l({},e,{style:{width:"100%",height:"100%",zIndex:5,backgroundColor:"rgba(0, 0, 0, .4)",position:"fixed",top:0,left:0,cursor:"pointer"}}))}}}]);
//# sourceMappingURL=component--order-address.chunk.js.map