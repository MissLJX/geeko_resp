(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{470:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Modal=t.MODAL=t.MASK=void 0;var a=u(["\n\twidth: 100%;\n\theight: 100%;\n\tposition: fixed;\n\ttop:0;\n\tleft:0;\n\tbackground-color:rgba(0,0,0,.6);\n\tz-index:100;\n\toverflow: auto;\n"],["\n\twidth: 100%;\n\theight: 100%;\n\tposition: fixed;\n\ttop:0;\n\tleft:0;\n\tbackground-color:rgba(0,0,0,.6);\n\tz-index:100;\n\toverflow: auto;\n"]),r=u(["\n\ttransform:translate(-50%,0);\n\tleft:50%;\n\ttop:60px;\n\tposition: absolute;\n\tmargin-bottom: 20px;\n"],["\n\ttransform:translate(-50%,0);\n\tleft:50%;\n\ttop:60px;\n\tposition: absolute;\n\tmargin-bottom: 20px;\n"]),i=u(["\n\tfont-family: iconfont;\n\tcursor: pointer;\n\ttop: 15px;\n\tright: 15px;\n\tfont-size: 25px;\n\tposition: absolute;\n\tz-index:2;\n\tcolor: #666;\n"],["\n\tfont-family: iconfont;\n\tcursor: pointer;\n\ttop: 15px;\n\tright: 15px;\n\tfont-size: 25px;\n\tposition: absolute;\n\tz-index:2;\n\tcolor: #666;\n"]),l=n(2),o=d(l),s=d(n(56));function d(e){return e&&e.__esModule?e:{default:e}}function u(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var c=t.MASK=s.default.div(a),f=t.MODAL=s.default.div(r),p=s.default.span(i);t.Modal=function(e){return o.default.createElement(l.Fragment,null,o.default.createElement(c,null,o.default.createElement(f,null,o.default.createElement(p,{onClick:e.onClose},""),e.children)))}},471:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Button=t.Select=t.Input=t.Form=void 0;var a,r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},i=(a=n(2))&&a.__esModule?a:{default:a},l=n(485);function o(e,t){var n={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}t.Form=(0,l.form)(function(e){e.getValues,e.validate,e.validateAll,e.showError,e.hideError;var t=e.children,n=o(e,["getValues","validate","validateAll","showError","hideError","children"]);return i.default.createElement("form",n,t)}),t.Input=(0,l.control)(function(e){var t=e.error,n=e.isChanged,a=e.isUsed,l=e.divStyle,s=o(e,["error","isChanged","isUsed","divStyle"]);return i.default.createElement("div",{style:l,className:n&&a&&t?"error":""},i.default.createElement("input",r({},s,{className:"x-default-input"})),i.default.createElement("div",{className:"__errortext"},n&&a&&t))}),t.Select=(0,l.control)(function(e){var t=e.error,n=e.isChanged,a=e.isUsed,r=o(e,["error","isChanged","isUsed"]);return i.default.createElement("div",{className:n&&a&&t?"error":""},i.default.createElement("select",r),i.default.createElement("div",{className:"__errortext"},n&&a&&t))}),t.Button=(0,l.button)(function(e){var t=e.hasErrors,n=o(e,["hasErrors"]);return i.default.createElement("button",r({},n,{disabled:t&&!n.ingoredisable}))})},472:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getDNI=t.dni=t.phone=t.zip=t.cpf=t.email=t.number=t.required=t.cpfcheck=t.__reg_document_ur__=t.__reg_document_co__=t.__reg_document_cl__=t.__reg_document_ar__=t.__reg_phone_sa_=t.__reg_phone_ae_=t.__reg_phone_br__=t.__reg_phone_normal__=t.__reg_zip_br__=t.__reg_zip_uk__=t.__reg_zip_us__=void 0;var a=i(n(2)),r=i(n(486));function i(e){return e&&e.__esModule?e:{default:e}}var l=t.__reg_zip_us__=/^(([0-9]{5})|([0-9]{5}-[0-9]{4}))$/,o=t.__reg_zip_uk__=/^([a-z]|[A-Z]){1,2}\w{1,2}\s{0,1}[0-9]{1}([a-z]|[A-Z]){2}$/,s=t.__reg_zip_br__=/^[0-9]{5}-[0-9]{3}$/,d=t.__reg_phone_normal__=/^\d{1,20}$/,u=t.__reg_phone_br__=/^\d{8,9}$/,c=t.__reg_phone_ae_=/^(50|52|54|55|56|58|2|3|4|6|7|9){1,2}\d{7}$/,f=t.__reg_phone_sa_=/^(50|53|55|51|58|59|54|56|57|11|12|13|14|16|17|811){1,3}\d{7}$/,p=t.__reg_document_ar__=/^(\d{7,9}|\d{11})$/,h=t.__reg_document_cl__=/^\d{8,9}$/,m=t.__reg_document_co__=/^\d{6,10}$/,g=t.__reg_document_ur__=/^\d{6,8}$/,_=t.cpfcheck=function(e){var t=!0;e=(e=e.replace("-","")).replace(/\./g,"");for(var n=["11111111111","22222222222","33333333333","44444444444","55555555555","66666666666","77777777777","88888888888","99999999999","00000000000"],a=0;a<n.length;a++)n[a]==e&&(t=!1);e.length>11&&(t=!1);for(var r=0,i=0;i<9;i++)r+=parseInt(e.charAt(i),10)*(10-i);var l=11-r%11;10!=l&&11!=l||(l=0),l!=parseInt(e.charAt(9),10)&&(t=!1),r=0;for(var o=0;o<10;o++)r+=parseInt(e.charAt(o),10)*(11-o);return 10!=(l=11-r%11)&&11!=l||(l=0),l!=parseInt(e.charAt(10),10)&&(t=!1),t},b=(t.required=function(e){if(!e||!e.toString().trim().length)return"required"},t.number=function(e){if(e&&!r.default.isInt(e,{min:0,max:99}))return a.default.createElement("p",null)},t.email=function(e){if(!r.default.isEmail(e))return a.default.createElement("p",null,e," is not a valid email")},t.cpf=function(e){if(!_(e))return a.default.createElement("p",null,e," is not a valid cpf")},t.zip=function(e,t,n){var a=void 0,r=void 0;switch(n.country[0].value){case"US":a=l,r="Please enter 5 digits or 5 digits with a 4-digits number (E.g. 20001 or 20001-0000)";break;case"GB":a=o,r="Wrong ZIP CODE! Please offer us one or two-letter and one-two figures with a space end with one figure and two letters. (e.g. TN37 7HL,CW8 3AD)";break;case"BR":a=s,r="O formato do endereço está incorreto, preencha o formulário de [01310-000]"}if(a&&!a.test(e))return r},t.phone=function(e,t,n){var a=void 0,r=void 0;switch(n.country[0].value){case"BR":a=u,r="Insira pelo menos 8-9 números.";break;case"AE":a=c,r="Phone numbers should start with 50/52/54/55/56/58/2/3/4/6/7/9, followed by any 7 digits.";break;case"SA":a=f,r="Phone numbers should start with 50/53/55/51/58/59/54/56/57/11/12/13/14/16/17/811, followed by any 7 digits.";break;default:a=d,r="Incorrect phone number format (numbers only, no formatting)"}if(a&&!a.test(e))return r},t.dni=function(e){var t=void 0,n=void 0;switch(e){case"AR":t=p,n="DNI debe estar entre 7 a 9, u 11 dígitos";break;case"CL":t=h,n="CI/RUT debe tener entre 8 y 9 dígitos";break;case"CO":t=m,n="Cédula de ciudadanía debe tener entre 6 y 10 dígitos";break;case"UY":t=g,n="Cédula de identidad debe tener entre 6 y 8 dígitos";break;default:t=/\d/,n="Incorrect document"}return function(e){if(t&&!t.test(e))return n}});t.getDNI=function(e){switch(e){case"26":case"27":case"28":return b("AR");case"30":case"31":case"32":return b("CO");case"30":case"31":case"32":return b("CL");case"36":case"37":return b("UY");default:return b("US")}}},473:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ELEMENTS=t.MutiElement=t.FormElement=void 0;var a=c(["\n\tposition: relative;\n"],["\n\tposition: relative;\n"]),r=c(["\n\tlabel{\n\t\tdisplay: block;\n\t\tcolor: #666;\n\t\tmargin-bottom: 4px;\n\t}\n\t&.__required > .__control{\n\t\t&::after{\n\t\t\tcontent: '*';\n\t    color: #E64545;\n\t    position: absolute;\n\t    right: -15px;\n\t    top: 0;\n\t    font-size: 20px;\n\t\t}\n\t}\n\n\t& .error{\n\t\t.__errortext{\n\t\t\tfont-size: 12px;\n\t\t\tmargin-top: 5px;\n\t\t\tcolor: #E64545;\n\t\t}\n\t\tinput, select{\n\t\t\tborder: solid 1px #E64545;\n\t\t}\n\t}\n\n\tinput, select{\n\t\tpadding-left: 15px;\n\t\tborder: solid 1px #cacaca;\n\t}\n\n\tinput[disabled], select[disabled]{\n\t\tborder-color: rgb(202,202,202);\n    color: rgb(202,202,202);\n\t}\n\n\n"],["\n\tlabel{\n\t\tdisplay: block;\n\t\tcolor: #666;\n\t\tmargin-bottom: 4px;\n\t}\n\t&.__required > .__control{\n\t\t&::after{\n\t\t\tcontent: '*';\n\t    color: #E64545;\n\t    position: absolute;\n\t    right: -15px;\n\t    top: 0;\n\t    font-size: 20px;\n\t\t}\n\t}\n\n\t& .error{\n\t\t.__errortext{\n\t\t\tfont-size: 12px;\n\t\t\tmargin-top: 5px;\n\t\t\tcolor: #E64545;\n\t\t}\n\t\tinput, select{\n\t\t\tborder: solid 1px #E64545;\n\t\t}\n\t}\n\n\tinput, select{\n\t\tpadding-left: 15px;\n\t\tborder: solid 1px #cacaca;\n\t}\n\n\tinput[disabled], select[disabled]{\n\t\tborder-color: rgb(202,202,202);\n    color: rgb(202,202,202);\n\t}\n\n\n"]),i=c(["\n\t&::after{\n\t\tcontent: '';\n\t\tdisplay: block;\n\t\tclear: both;\n\t}\n\t& > div{\n\t\twidth: calc( 50% - ","px );\n\t\t&:first-child{\n\t\t\tfloat: left;\n\t\t}\n\t\t&:last-child{\n\t\t\tfloat: right;\n\t\t}\n\t\t\n\t}\n"],["\n\t&::after{\n\t\tcontent: '';\n\t\tdisplay: block;\n\t\tclear: both;\n\t}\n\t& > div{\n\t\twidth: calc( 50% - ","px );\n\t\t&:first-child{\n\t\t\tfloat: left;\n\t\t}\n\t\t&:last-child{\n\t\t\tfloat: right;\n\t\t}\n\t\t\n\t}\n"]),l=c(["\n\t& > div{\n\t\tmargin-top: 15px;\n\t\t&:first-child{\n\t\t\tmargin-top: 0;\n\t\t}\n\t}\n"],["\n\t& > div{\n\t\tmargin-top: 15px;\n\t\t&:first-child{\n\t\t\tmargin-top: 0;\n\t\t}\n\t}\n"]),o=u(n(2)),s=u(n(56)),d=u(n(474));function u(e){return e&&e.__esModule?e:{default:e}}function c(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var f=s.default.div(a),p=s.default.div(r);t.FormElement=function(e){return o.default.createElement(p,e,o.default.createElement("label",null,e.label," ",e.tipMessage&&o.default.createElement(d.default,{style:{marginLeft:2},message:e.tipMessage})),o.default.createElement(f,{className:"__control"},e.children))},t.MutiElement=s.default.div(i,function(e){return(e.gap||40)/2}),t.ELEMENTS=s.default.div(l)},474:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,r,i=(a=["\n\twidth: 16px;\n\theight: 16px;\n\tborder: solid 1px #999;\n\topacity: 0.99;\n\tcursor: pointer;\n\ttext-align: center;\n\tline-height: 16px;\n\tcolor: #999;\n\tborder-radius: 50%;\n  display: inline-block;\n  font-size: 12px;\n  position: relative;\n  z-index: 1;\n\n  .__answer{\n  \tposition: absolute;\n  \ttop: 20px;\n  \tleft: -200px;\n  \tborder-radius: 4px;\n\t\tborder: solid 1px #e6e6e6;\n\t\tpadding: 15px;\n\t\tline-height: 20px;\n\t\twidth: 420px;\n    background-color: #fff;\n    display: none;\n    color: #222;\n    font-size: 14px;\n    text-align: left;\n    z-index: 100;\n  }\n\n\n  &:hover{\n  \t.__answer{\n  \t\tdisplay: block;\n  \t}\n    border-color: #cacaca;\n    color: #cacaca;\n  }\n"],r=["\n\twidth: 16px;\n\theight: 16px;\n\tborder: solid 1px #999;\n\topacity: 0.99;\n\tcursor: pointer;\n\ttext-align: center;\n\tline-height: 16px;\n\tcolor: #999;\n\tborder-radius: 50%;\n  display: inline-block;\n  font-size: 12px;\n  position: relative;\n  z-index: 1;\n\n  .__answer{\n  \tposition: absolute;\n  \ttop: 20px;\n  \tleft: -200px;\n  \tborder-radius: 4px;\n\t\tborder: solid 1px #e6e6e6;\n\t\tpadding: 15px;\n\t\tline-height: 20px;\n\t\twidth: 420px;\n    background-color: #fff;\n    display: none;\n    color: #222;\n    font-size: 14px;\n    text-align: left;\n    z-index: 100;\n  }\n\n\n  &:hover{\n  \t.__answer{\n  \t\tdisplay: block;\n  \t}\n    border-color: #cacaca;\n    color: #cacaca;\n  }\n"],Object.freeze(Object.defineProperties(a,{raw:{value:Object.freeze(r)}}))),l=o(n(2));function o(e){return e&&e.__esModule?e:{default:e}}var s=o(n(56)).default.div(i);t.default=function(e){return l.default.createElement(s,e,l.default.createElement("span",null,"?"),e.message&&l.default.createElement("div",{className:"__answer"},l.default.createElement("div",{dangerouslySetInnerHTML:{__html:e.message}})))}},556:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=_(["\n  padding: 56px;\n  background-color: #fff;\n  width: 696px;\n"],["\n  padding: 56px;\n  background-color: #fff;\n  width: 696px;\n"]),l=_(["\n  font-family: HelveticaNeue-Medium;\n  font-size: 24px;\n  color: #222;\n"],["\n  font-family: HelveticaNeue-Medium;\n  font-size: 24px;\n  color: #222;\n"]),o=_(["\n    \tmax-width: 320px;\n    \twidth: 80%;\n    \tmargin-left: auto;\n    \tmargin-right: auto;\n      padding-bottom: 50px;\n\n    "],["\n    \tmax-width: 320px;\n    \twidth: 80%;\n    \tmargin-left: auto;\n    \tmargin-right: auto;\n      padding-bottom: 50px;\n\n    "]),s=g(n(2)),d=g(n(56)),u=n(117),c=n(116),f=n(470),p=g(n(557)),h=n(81),m=n(80);function g(e){return e&&e.__esModule?e:{default:e}}function _(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}n(115);var b=d.default.div(i),v=d.default.div(l),y=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.close=n.close.bind(n),n.editAddress=n.editAddress.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,s.default.Component),r(t,[{key:"close",value:function(e){e.preventDefault(),this.props.history.goBack()}},{key:"editAddress",value:function(e){var t=this,n=this.props.transaction.transactionId;this.props.UPDATINGADDRESS(!0),(0,h.updateorderaddress)(a({},e,{id:this.props.address.id,transactionId:n})).then(function(){t.props.UPDATINGADDRESS(!1),t.props.history.goBack(),t.props.REFRESHORDERCONFIRM(n)}).catch(function(e){var n=e.result;alert(n),t.props.UPDATINGADDRESS(!1)})}},{key:"render",value:function(){var e=this.props,t=e.address,n=e.intl;return d.default.div(o),s.default.createElement(f.Modal,{onClose:this.close.bind(this)},s.default.createElement(b,null,s.default.createElement(v,null,n.formatMessage({id:"shipping_address"})),s.default.createElement("div",{style:{marginTop:25}},s.default.createElement(p.default,{updating:this.props.addressUpdating,address:t,editAddress:this.editAddress,showCancel:!0,onCancel:this.close.bind(this)}))))}}]),t}();t.default=(0,u.connect)(function(e){return{transaction:e.transaction,address:e.transaction?e.transaction.shippingDetail:null,addressUpdating:e.addressUpdating}},function(e){return{REFRESHORDERCONFIRM:function(t){e((0,c.fetchTransaction)(t))},UPDATINGADDRESS:function(t){e((0,c.updateAddress)(t))}}})((0,m.injectIntl)(y))},557:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=c(n(2)),i=(c(n(56)),n(471)),l=n(472),o=n(473),s=n(80),d=n(81),u=(c(n(619)),n(476));function c(e){return e&&e.__esModule?e:{default:e}}var f=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={isEdit:!1,name:"",streetAddress1:"",unit:"",city:"",zipCode:"",state:"",country:"",phoneNumber:"",defaultAddress:!1,countries:null,states:null,phoneArea:"",cpf:"",hasValidated:!1},n.handleInputChange=n.handleInputChange.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.default.Component),a(t,[{key:"handleInputChange",value:function(e){var t=e.target,n="checkbox"===t.type?t.checked:t.value,a=t.name;if("zipCode"===a&&"BR"===this.state.country&&n&&n.length>5){var r=n.replace(/-/gi,"").split("");r.splice(5,0,"-"),n=r.join("")}"phoneArea"===a&&n&&n.length>2&&(n=n.slice(0,2)),this.setState(function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}({},a,n))}},{key:"changeCountry",value:function(e){var t=e.target.value;this.getStates(t),this.setState({state:""})}},{key:"handleSubmit",value:function(e){e.preventDefault();var t="BR"===this.state.country?this.brForm:this.form,n="BR"===this.state.country?this.brAddressButtn:this.addressButtn;if(t.validateAll(),!n.context._errors||n.context._errors.length<1){var a=this.state,r=a.name,i=a.streetAddress1,l=a.unit,o=a.city,s=a.zipCode,d=a.state,u=a.country,c=a.phoneNumber,f=a.defaultAddress,p=a.phoneArea,h=a.cpf;this.props.editAddress({name:r,streetAddress1:i,unit:l,city:o,zipCode:s,state:d,country:u,phoneNumber:c,defaultAddress:f,phoneArea:p,cpf:h})}}},{key:"componentWillReceiveProps",value:function(e){var t=e.address,n=this.props.address;null!=n&&t.id==n.id||this.initAddress(t)}},{key:"componentWillMount",value:function(){var e=this.props.address;this.initAddress(e)}},{key:"initAddress",value:function(e){var t=this;if(e){var n=e.name,a=e.streetAddress1,r=e.unit,i=e.city,l=e.zipCode,o=e.phoneNumber,s=e.isDefaultAddress,u=e.country,c=e.state,f=e.phoneArea,p=e.cpf,h=u?u.value:"";this.setState({isEdit:!0,name:n,streetAddress1:a,unit:r,city:i,zipCode:l,phoneNumber:o,country:h,state:c?c.value:"",defaultAddress:s,phoneArea:f||"",cpf:p||""}),this.getStates(h)}else{var m=this.state.country||(window.lang?window.lang.split("_"):[])[1]||"US";this.setState({country:m,defaultAddress:!0}),this.getStates(m)}(0,d.getCountries)().then(function(e){var n=e.result;t.setState({countries:n})})}},{key:"getStates",value:function(e){var t=this;(0,d.getStates)(e).then(function(e){var n=e.result;t.setState({states:n})})}},{key:"formRef",value:function(e,t){"BR"===t?this.brForm=e:this.form=e,this.props.needInitValidate&&!this.state.hasValidated&&(e.validateAll(),this.setState({hasValidated:!0}))}},{key:"render",value:function(){var e=this,t=this.props,n=t.intl,a=(t.isNew,t.isConfirm),s="AE"===this.state.country||"SA"===this.state.country?{width:"calc(100% - 79px)",marginLeft:10,display:"inline-block",verticalAlign:"middle"}:{};return r.default.createElement("div",null,r.default.createElement(i.Form,{ref:function(t){e.formRef(t)},style:{display:"BR"!==this.state.country?"block":"none"},onSubmit:this.handleSubmit.bind(this)},r.default.createElement(o.ELEMENTS,null,r.default.createElement(o.FormElement,{label:n.formatMessage({id:"full_name"})+":",className:"__required"},r.default.createElement(i.Input,{name:"name",style:{width:"100%",height:40},value:this.state.name,onChange:this.handleInputChange,validations:[l.required]})),r.default.createElement(o.FormElement,{label:n.formatMessage({id:"street_address"})+":",className:"__required"},r.default.createElement(i.Input,{name:"streetAddress1",style:{width:"100%",height:40},value:this.state.streetAddress1,onChange:this.handleInputChange,placeholder:n.formatMessage({id:"placeholder_street_address"}),validations:[l.required]})),r.default.createElement(o.FormElement,{label:n.formatMessage({id:"unit"})+":"},r.default.createElement(i.Input,{name:"unit",style:{width:"100%",height:40},value:this.state.unit,placeholder:n.formatMessage({id:"placeholder_unit"}),onChange:this.handleInputChange})),r.default.createElement(o.FormElement,{label:n.formatMessage({id:"city"})+":",className:"__required"},r.default.createElement(i.Input,{name:"city",style:{width:"100%",height:40},value:this.state.city,onChange:this.handleInputChange,validations:[l.required]})),r.default.createElement(o.MutiElement,null,r.default.createElement(o.FormElement,{label:n.formatMessage({id:"country"})+":",className:"__required"},r.default.createElement(i.Select,{className:"x-select",value:this.state.country,name:"country",disabled:this.props.disablecountry,style:{width:"100%",height:40},onChange:function(t){e.handleInputChange(t),e.changeCountry(t)},validations:[l.required]},r.default.createElement("option",{value:""},"Country"),this.state.countries&&this.state.countries.map(function(e){return r.default.createElement("option",{key:e.value,value:e.value},e.label)}))),r.default.createElement(o.FormElement,{label:n.formatMessage({id:"state"})+":",className:this.state.states&&this.state.states.length?"__required":""},this.state.states&&this.state.states.length?r.default.createElement(i.Select,{className:"x-select",name:"state",style:{width:"100%",height:40},value:this.state.state,onChange:this.handleInputChange,validations:[l.required]},r.default.createElement("option",{value:""},"State"),this.state.states&&this.state.states.map(function(e){return r.default.createElement("option",{key:e.value,value:e.value},e.label)})):r.default.createElement(i.Input,{name:"state",style:{width:"100%",height:40},value:this.state.state,onChange:this.handleInputChange}))),r.default.createElement(o.MutiElement,null,r.default.createElement(o.FormElement,{label:n.formatMessage({id:"zip_code"})+":",className:"__required"},r.default.createElement(i.Input,{name:"zipCode",style:{width:"100%",height:40},value:this.state.zipCode,onChange:this.handleInputChange,validations:[l.required,l.zip]})),r.default.createElement(o.FormElement,{label:n.formatMessage({id:"phone_number"})+":",className:"__required"},"AE"===this.state.country&&r.default.createElement("span",{style:{width:69,display:"inline-block"}},"UAE +971"),"SA"===this.state.country&&r.default.createElement("span",{style:{width:69,display:"inline-block"}},"KSA +966"),r.default.createElement(i.Input,{name:"phoneNumber",style:{width:"100%",height:40},divStyle:s,value:this.state.phoneNumber,onChange:this.handleInputChange,validations:[l.required,l.phone]}))),r.default.createElement(o.MutiElement,{style:{marginTop:24}},r.default.createElement("div",null,this.props.updating?r.default.createElement(u.BigButton,{className:"__btn",height:40,bgColor:"#999"},n.formatMessage({id:"please_wait"}),"..."):r.default.createElement(i.Button,{className:"__submitbtn",ref:function(t){return e.addressButtn=t},ingoredisable:"true",style:{display:"block",backgroundColor:"#222",borderRadius:2,color:"#fff",height:40,lineHeight:"40px",textAlign:"center",outline:"none",border:"none",width:"100%",textTransform:"uppercase",cursor:"pointer",fontSize:16}},a?n.formatMessage({id:"confirm"}):n.formatMessage({id:"save"}))),r.default.createElement("div",null,this.props.showCancel&&r.default.createElement("div",{className:"__submitbtn",style:{display:"block",backgroundColor:"#cacaca",borderRadius:2,color:"#fff",height:40,lineHeight:"40px",textAlign:"center",outline:"none",border:"none",width:"100%",textTransform:"uppercase",fontSize:16,cursor:"pointer"},onClick:this.props.onCancel},n.formatMessage({id:"cancel"})))))),r.default.createElement(i.Form,{style:{display:"BR"===this.state.country?"block":"none"},ref:function(t){e.formRef(t,"BR")},onSubmit:this.handleSubmit.bind(this)},r.default.createElement(o.ELEMENTS,null,r.default.createElement(o.FormElement,{label:n.formatMessage({id:"full_name"})+":",className:"__required"},r.default.createElement(i.Input,{name:"name",style:{width:"100%",height:40},value:this.state.name,onChange:this.handleInputChange,validations:[l.required]})),r.default.createElement(o.FormElement,{label:n.formatMessage({id:"street_address"})+":",className:"__required"},r.default.createElement(i.Input,{name:"streetAddress1",style:{width:"100%",height:40},value:this.state.streetAddress1,onChange:this.handleInputChange,placeholder:n.formatMessage({id:"placeholder_street_address"}),validations:[l.required]})),r.default.createElement(o.FormElement,{label:n.formatMessage({id:"unit"})+":"},r.default.createElement(i.Input,{name:"unit",style:{width:"100%",height:40},value:this.state.unit,placeholder:n.formatMessage({id:"placeholder_unit"}),onChange:this.handleInputChange})),r.default.createElement(o.FormElement,{label:n.formatMessage({id:"city"})+":",className:"__required"},r.default.createElement(i.Input,{name:"city",style:{width:"100%",height:40},value:this.state.city,onChange:this.handleInputChange,validations:[l.required]})),r.default.createElement(o.MutiElement,null,r.default.createElement(o.FormElement,{label:n.formatMessage({id:"country"})+":",className:"__required"},r.default.createElement(i.Select,{className:"x-select",value:this.state.country,name:"country",style:{width:"100%",height:40},disabled:this.props.disablecountry,onChange:function(t){e.handleInputChange(t),e.changeCountry(t)},validations:[l.required]},r.default.createElement("option",{value:""},"Country"),this.state.countries&&this.state.countries.map(function(e){return r.default.createElement("option",{key:e.value,value:e.value},e.label)}))),r.default.createElement(o.FormElement,{label:n.formatMessage({id:"state"})+":",className:this.state.states&&this.state.states.length?"__required":""},this.state.states&&this.state.states.length?r.default.createElement(i.Select,{className:"x-select",name:"state",style:{width:"100%",height:40},value:this.state.state,onChange:this.handleInputChange,validations:[l.required]},r.default.createElement("option",{value:""},"State"),this.state.states&&this.state.states.map(function(e){return r.default.createElement("option",{key:e.value,value:e.value},e.label)})):r.default.createElement(i.Input,{name:"state",style:{width:"100%",height:40},value:this.state.state,onChange:this.handleInputChange}))),r.default.createElement(o.MutiElement,null,r.default.createElement(o.FormElement,{label:n.formatMessage({id:"zip_code"})+":",className:"__required"},r.default.createElement(i.Input,{name:"zipCode",style:{width:"100%",height:40},value:this.state.zipCode,onChange:this.handleInputChange,validations:[l.required,l.zip]})),r.default.createElement(o.FormElement,{label:n.formatMessage({id:"phone_number"})+":",className:"__required"},r.default.createElement("span",{style:{width:59,display:"inline-block"}},"BR +55"),r.default.createElement(i.Input,{name:"phoneArea",type:"number",placeholder:"Código",value:this.state.phoneArea,onChange:this.handleInputChange,validations:[l.number],style:{width:"100%",height:40,paddingLeft:0,textAlign:"center"},divStyle:{width:55,marginRight:10,display:"inline-block"}}),r.default.createElement(i.Input,{name:"phoneNumber",divStyle:{width:"calc(100% - 124px)",display:"inline-block",verticalAlign:"middle"},style:{width:"100%",height:40},value:this.state.phoneNumber,onChange:this.handleInputChange,validations:[l.required,l.phone]}))),r.default.createElement(o.FormElement,{label:"CPF",className:"__required",tipMessage:"CPF (Cadastro de Pessoa Física), utilizado para tributação, é necessário para todos os produtos enviados ao Brasil, independentemente de encomendas expressas ou contêineres logísticos.Quando preenchemos o conhecimento de embarque e fatura, por favor, não esqueça de preencher o número de contribuinte do destinatário.Na maioria dos casos, sua forma é o número digital como abaixo, XXX.XXX.XXX-XX"},r.default.createElement(i.Input,{name:"cpf",value:this.state.cpf,onChange:this.handleInputChange,style:{width:"100%",height:40},validations:[l.required,l.cpf]})),r.default.createElement(o.MutiElement,{style:{marginTop:24}},r.default.createElement("div",null,this.props.updating?r.default.createElement(u.BigButton,{className:"__btn",height:40,bgColor:"#999"},n.formatMessage({id:"please_wait"}),"..."):r.default.createElement(i.Button,{className:"__submitbtn",ref:function(t){return e.brAddressButtn=t},ingoredisable:"true",style:{display:"block",backgroundColor:"#222",borderRadius:2,color:"#fff",height:40,lineHeight:"40px",textAlign:"center",outline:"none",border:"none",width:"100%",textTransform:"uppercase",cursor:"pointer",fontSize:16}},a?n.formatMessage({id:"confirm"}):n.formatMessage({id:"save"}))),r.default.createElement("div",null,this.props.showCancel&&r.default.createElement("div",{className:"__submitbtn",style:{display:"block",backgroundColor:"#cacaca",borderRadius:2,color:"#fff",height:40,lineHeight:"40px",textAlign:"center",outline:"none",border:"none",width:"100%",textTransform:"uppercase",fontSize:16,cursor:"pointer"},onClick:this.props.onCancel},n.formatMessage({id:"cancel"})))))))}}]),t}();t.default=(0,s.injectIntl)(f)},619:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,r,i=(a=["\n\tdisplay: inline-block;\n\t&::after{\n\t\tcontent: '\\e65a';\n\t\tdisplay: inline-block;\n\t\tcursor: pointer;\n\t\tfont-size: "," ;\n\t\tfont-family: iconfont;\n\t\tcolor: #cacaca;\n\t}\n\n\t&.selected{\n\t\t&::after{\n\t\t\tcontent: '\\e658';\n\t\t\tcolor: ",";\n\t\t}\n\t}\n"],r=["\n\tdisplay: inline-block;\n\t&::after{\n\t\tcontent: '\\\\e65a';\n\t\tdisplay: inline-block;\n\t\tcursor: pointer;\n\t\tfont-size: "," ;\n\t\tfont-family: iconfont;\n\t\tcolor: #cacaca;\n\t}\n\n\t&.selected{\n\t\t&::after{\n\t\t\tcontent: '\\\\e658';\n\t\t\tcolor: ",";\n\t\t}\n\t}\n"],Object.freeze(Object.defineProperties(a,{raw:{value:Object.freeze(r)}}))),l=(o(n(2)),o(n(56)));function o(e){return e&&e.__esModule?e:{default:e}}t.default=l.default.span(i,function(e){return e.fontSize||"20px"},function(e){return e.disabled?"#999":"#222222"})}}]);
//# sourceMappingURL=component--order-address.chunk.js.map