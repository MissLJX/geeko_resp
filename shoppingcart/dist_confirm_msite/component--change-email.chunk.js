(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{467:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=f(["\n\tposition: relative;\n\t\n"],["\n\tposition: relative;\n\t\n"]),i=f(["\n\theight: 50px;\n\tline-height: 50px;\n\tposition: absolute;\n\ttop: 0;\n\twidth: 100%;\n\tbackground-color: #fff;\n\tz-index: 10;\n"],["\n\theight: 50px;\n\tline-height: 50px;\n\tposition: absolute;\n\ttop: 0;\n\twidth: 100%;\n\tbackground-color: #fff;\n\tz-index: 10;\n"]),a=f(["\n\tfont-size: 18px;\n\tfont-weight: 400;\n\ttext-align: center;\n"],["\n\tfont-size: 18px;\n\tfont-weight: 400;\n\ttext-align: center;\n"]),l=f(["\n\tdisplay: inline-block;\n\tposition: absolute;\n\tright: 10px;\n\ttop: 0;\n\tcursor: pointer;\n"],["\n\tdisplay: inline-block;\n\tposition: absolute;\n\tright: 10px;\n\ttop: 0;\n\tcursor: pointer;\n"]),u=f(["\n\theight: 100vh;\n\toverflow: auto;\n\tpadding-top: 50px;\n\t-webkit-overflow-scrolling: touch;\n"],["\n\theight: 100vh;\n\toverflow: auto;\n\tpadding-top: 50px;\n\t-webkit-overflow-scrolling: touch;\n"]),c=p(n(2)),s=p(n(111)),d=p(n(471));function p(t){return t&&t.__esModule?t:{default:t}}function f(t,e){return Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}var _=s.default.div(o),b=s.default.div(i),h=s.default.h1(a),g=s.default.span(l),m=s.default.div(u),v=function(t){function e(t){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,c.default.Component),r(e,[{key:"componentWillMount",value:function(){document.body.style.overflow="hidden"}},{key:"componentWillUnmount",value:function(){document.body.style.overflow="auto"}},{key:"render",value:function(){var t=this.props;return c.default.createElement(_,null,c.default.createElement(b,null,c.default.createElement(h,null,t.title),c.default.createElement(g,{onClick:t.onClose},c.default.createElement(d.default,{style:{fontSize:25,cursor:"pointer"}},""))),c.default.createElement(m,null,t.children))}}]),e}();e.default=v},468:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Button=e.Select=e.Input=e.Form=void 0;var r,o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},i=(r=n(2))&&r.__esModule?r:{default:r},a=n(483);function l(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}e.Form=(0,a.form)(function(t){t.getValues,t.validate,t.validateAll,t.showError,t.hideError;var e=t.children,n=l(t,["getValues","validate","validateAll","showError","hideError","children"]);return i.default.createElement("form",n,e)}),e.Input=(0,a.control)(function(t){var e=t.error,n=t.isChanged,r=t.isUsed,a=t.divStyle,u=l(t,["error","isChanged","isUsed","divStyle"]);return i.default.createElement("div",{className:n&&r&&e?"error":"",style:a},i.default.createElement("input",o({},u,{className:"x-default-input"})),i.default.createElement("p",null,n&&r&&e))}),e.Select=(0,a.control)(function(t){var e=t.error,n=t.isChanged,r=t.isUsed,o=l(t,["error","isChanged","isUsed"]);return i.default.createElement("div",{className:n&&r&&e?"error":""},i.default.createElement("select",o),i.default.createElement("p",null,n&&r&&e))}),e.Button=(0,a.button)(function(t){var e=t.hasErrors,n=l(t,["hasErrors"]);return i.default.createElement("button",o({},n,{disabled:e&&!n.ingoredisable}))})},469:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getDNI=e.dni=e.phone=e.zip=e.cpf=e.email=e.number=e.required=e.cpfcheck=e.__reg_document_ur__=e.__reg_document_co__=e.__reg_document_cl__=e.__reg_document_ar__=e.__reg_phone_sa_=e.__reg_phone_ae_=e.__reg_phone_br__=e.__reg_phone_normal__=e.__reg_zip_br__=e.__reg_zip_uk__=e.__reg_zip_us__=void 0;var r=i(n(2)),o=i(n(484));function i(t){return t&&t.__esModule?t:{default:t}}var a=e.__reg_zip_us__=/^(([0-9]{5})|([0-9]{5}-[0-9]{4}))$/,l=e.__reg_zip_uk__=/^([a-z]|[A-Z]){1,2}\w{1,2}\s{0,1}[0-9]{1}([a-z]|[A-Z]){2}$/,u=e.__reg_zip_br__=/^[0-9]{5}-[0-9]{3}$/,c=e.__reg_phone_normal__=/^\d{1,20}$/,s=e.__reg_phone_br__=/^\d{8,9}$/,d=e.__reg_phone_ae_=/^(50|52|54|55|56|58|2|3|4|6|7|9){1,2}\d{7}$/,p=e.__reg_phone_sa_=/^(50|53|55|51|58|59|54|56|57|11|12|13|14|16|17|811){1,3}\d{7}$/,f=e.__reg_document_ar__=/^(\d{7,9}|\d{11})$/,_=e.__reg_document_cl__=/^\d{8,9}$/,b=e.__reg_document_co__=/^\d{6,10}$/,h=e.__reg_document_ur__=/^\d{6,8}$/,g=e.cpfcheck=function(t){var e=!0;t=(t=t.replace("-","")).replace(/\./g,"");for(var n=["11111111111","22222222222","33333333333","44444444444","55555555555","66666666666","77777777777","88888888888","99999999999","00000000000"],r=0;r<n.length;r++)n[r]==t&&(e=!1);t.length>11&&(e=!1);for(var o=0,i=0;i<9;i++)o+=parseInt(t.charAt(i),10)*(10-i);var a=11-o%11;10!=a&&11!=a||(a=0),a!=parseInt(t.charAt(9),10)&&(e=!1),o=0;for(var l=0;l<10;l++)o+=parseInt(t.charAt(l),10)*(11-l);return 10!=(a=11-o%11)&&11!=a||(a=0),a!=parseInt(t.charAt(10),10)&&(e=!1),e},m=(e.required=function(t){if(!t||!t.toString().trim().length)return"required"},e.number=function(t){if(t&&!o.default.isInt(t,{min:0,max:99}))return r.default.createElement("p",null)},e.email=function(t){if(!o.default.isEmail(t))return r.default.createElement("p",null,t," is not a valid email")},e.cpf=function(t){if(!g(t))return r.default.createElement("p",null,t," is not a valid cpf")},e.zip=function(t,e,n){var r=void 0,o=void 0;switch(n.country[0].value){case"US":r=a,o="Please enter 5 digits or 5 digits with a 4-digits number (E.g. 20001 or 20001-0000)";break;case"GB":r=l,o="Wrong ZIP CODE! Please offer us one or two-letter and one-two figures with a space end with one figure and two letters. (e.g. TN37 7HL,CW8 3AD)";break;case"BR":r=u,o="O formato do endereço está incorreto, preencha o formulário de [01310-000]"}if(r&&!r.test(t))return o},e.phone=function(t,e,n){var r=void 0,o=void 0;switch(n.country[0].value){case"BR":r=s,o="Insira pelo menos 8-9 números.";break;case"AE":r=d,o="Phone numbers should start with 50/52/54/55/56/58/2/3/4/6/7/9, followed by any 7 digits.";break;case"SA":r=p,o="Phone numbers should start with 50/53/55/51/58/59/54/56/57/11/12/13/14/16/17/811, followed by any 7 digits.";break;default:r=c,o="Incorrect phone number format (numbers only, no formatting)"}if(r&&!r.test(t))return o},e.dni=function(t){var e=void 0,n=void 0;switch(t){case"AR":e=f,n="DNI debe estar entre 7 a 9, u 11 dígitos";break;case"CL":e=_,n="CI/RUT debe tener entre 8 y 9 dígitos";break;case"CO":e=b,n="Cédula de ciudadanía debe tener entre 6 y 10 dígitos";break;case"UY":e=h,n="Cédula de identidad debe tener entre 6 y 8 dígitos";break;default:e=/\d/,n="Incorrect document"}return function(t){if(e&&!e.test(t))return n}});e.getDNI=function(t){switch(t){case"26":case"27":case"28":return m("AR");case"30":case"31":case"32":return m("CO");case"30":case"31":case"32":return m("CL");case"36":case"37":return m("UY");default:return m("US")}}},470:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.InlineStyledControl=e.StyledControl=void 0;var r,o=l(["\n\tlabel{\n\t\tfont-size: 12px;\n\t\tmargin-bottom: 5px;\n\t\tdisplay: block;\n\t}\n\n\tinput, select{\n\t\tborder: 1px solid #666;\n\t\toutline: none;\n\t\t-webkit-appearance: none;\n    \toutline: none;\n    \tbox-shadow: none;\n    \theight: 35px;\n    \twidth: 100%;\n    \tpadding-left: 10px;\n    \tbackground-color: ",";\n\t}\n\n\tinput[disabled], select[disabled]{\n\t\tborder-color: rgb(202,202,202);\n    color: rgb(202,202,202);\n\t}\n\n\n\t& .error{\n\t\tp{\n\t\t\tfont-size: 12px;\n\t\t\tmargin-top: 5px;\n\t\t\tcolor: #E64545;\n\t\t}\n\t\tinput, select{\n\t\t\tborder: 1px solid #E64545;\n    \t\tbox-shadow: inset 0 0 1px #E64545;\n\t\t}\n\t}\n"],["\n\tlabel{\n\t\tfont-size: 12px;\n\t\tmargin-bottom: 5px;\n\t\tdisplay: block;\n\t}\n\n\tinput, select{\n\t\tborder: 1px solid #666;\n\t\toutline: none;\n\t\t-webkit-appearance: none;\n    \toutline: none;\n    \tbox-shadow: none;\n    \theight: 35px;\n    \twidth: 100%;\n    \tpadding-left: 10px;\n    \tbackground-color: ",";\n\t}\n\n\tinput[disabled], select[disabled]{\n\t\tborder-color: rgb(202,202,202);\n    color: rgb(202,202,202);\n\t}\n\n\n\t& .error{\n\t\tp{\n\t\t\tfont-size: 12px;\n\t\t\tmargin-top: 5px;\n\t\t\tcolor: #E64545;\n\t\t}\n\t\tinput, select{\n\t\t\tborder: 1px solid #E64545;\n    \t\tbox-shadow: inset 0 0 1px #E64545;\n\t\t}\n\t}\n"]),i=l(["\n\tdisplay: inline-block;\n\tlabel{\n\t\tfont-size: 12px;\n\t\tmargin-right: 10px;\n\t}\n\n\tinput, select{\n\t\tborder: 1px solid #666;\n\t\toutline: none;\n\t\t-webkit-appearance: none;\n    \toutline: none;\n    \tbox-shadow: none;\n    \theight: 35px;\n    \twidth: 100%;\n    \tpadding-left: 10px;\n    \tbackground-color: ",";\n\t}\n\n\tinput[disabled], select[disabled]{\n\t\tborder-color: rgb(202,202,202);\n    color: rgb(202,202,202);\n\t}\n\n\n\t& .error{\n\t\tp{\n\t\t\tfont-size: 12px;\n\t\t\tmargin-top: 5px;\n\t\t\tcolor: #e5004f;\n\t\t}\n\t\tinput, select{\n\t\t\tborder: 1px solid #e5004f;\n    \t\tbox-shadow: inset 0 0 1px #e5004f;\n\t\t}\n\t}\n"],["\n\tdisplay: inline-block;\n\tlabel{\n\t\tfont-size: 12px;\n\t\tmargin-right: 10px;\n\t}\n\n\tinput, select{\n\t\tborder: 1px solid #666;\n\t\toutline: none;\n\t\t-webkit-appearance: none;\n    \toutline: none;\n    \tbox-shadow: none;\n    \theight: 35px;\n    \twidth: 100%;\n    \tpadding-left: 10px;\n    \tbackground-color: ",";\n\t}\n\n\tinput[disabled], select[disabled]{\n\t\tborder-color: rgb(202,202,202);\n    color: rgb(202,202,202);\n\t}\n\n\n\t& .error{\n\t\tp{\n\t\t\tfont-size: 12px;\n\t\t\tmargin-top: 5px;\n\t\t\tcolor: #e5004f;\n\t\t}\n\t\tinput, select{\n\t\t\tborder: 1px solid #e5004f;\n    \t\tbox-shadow: inset 0 0 1px #e5004f;\n\t\t}\n\t}\n"]),a=(r=n(111))&&r.__esModule?r:{default:r};function l(t,e){return Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}e.StyledControl=a.default.div(o,function(t){return t.inputColor||"transparent"}),e.InlineStyledControl=a.default.div(i,function(t){return t.inputColor||"transparent"})},622:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=b(n(2)),a=(b(n(111)),b(n(467))),l=n(112),u=n(173),c=(n(479),n(468)),s=n(477),d=n(469),p=n(470),f=n(172),_=n(114);function b(t){return t&&t.__esModule?t:{default:t}}var h=function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.close=n.close.bind(n),n.handleInputChange=n.handleInputChange.bind(n),n.state={email:"",updating:!1},n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,i.default.Component),o(e,[{key:"componentWillMount",value:function(){var t=this.props.me;t&&this.setState({email:t.communicationEmail})}},{key:"close",value:function(){this.props.history.replace((window.ctx||"")+"/order-confirm/"+this.props.transaction.transactionId)}},{key:"handleInputChange",value:function(t){var e=t.target,n="checkbox"===e.type?e.checked:e.value,r=e.name;this.setState(function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}({},r,n))}},{key:"handleSubmit",value:function(t){var e=this;t.preventDefault();var n=this.props,o=n.me,i=n.transaction;this.form.validateAll(),this.btn.context._errors&&this.btn.context._errors.length||(this.setState({updating:!0}),(0,f.changeCommunicationEmail)(i.transactionId,this.state.email).then(function(){e.setState({updating:!1}),e.close(),window.__is_login__?e.props.REFRESHME():e.props.REFRESHME(r({},o,{communicationEmail:e.state.email}))}).catch(function(t){t.result?alert(t.result):alert(t),e.setState({updating:!1})}))}},{key:"render",value:function(){var t=this,e=this.props,n=e.me,r=e.intl;return i.default.createElement(a.default,{onClose:this.close,title:r.formatMessage({id:"change_email"})},n&&i.default.createElement(c.Form,{style:{padding:20},ref:function(e){t.form=e},onSubmit:this.handleSubmit.bind(this)},i.default.createElement(s.FormLayout,null,i.default.createElement(p.StyledControl,null,i.default.createElement("div",null,i.default.createElement(c.Input,{name:"email",divStyle:{width:"100%",display:"inline-block",verticalAlign:"middle"},value:this.state.email,type:"email",onChange:this.handleInputChange,validations:[d.required,d.email]}))),i.default.createElement("div",{style:{marginTop:20}},i.default.createElement(c.Button,{className:"__submitbtn",ref:function(e){return t.btn=e},ingoredisable:"true",style:{display:"block",backgroundColor:"#222",color:"#fff",height:40,lineHeight:"40px",textAlign:"center",outline:"none",border:"none",width:"100%"}},r.formatMessage({id:"submit"}))))))}}]),e}();e.default=(0,u.connect)(function(t){return{me:t.me,transaction:t.transaction}},function(t){return{REFRESHME:function(e){t((0,_.fetchMe)(e))}}})((0,l.injectIntl)(h))}}]);
//# sourceMappingURL=component--change-email.chunk.js.map