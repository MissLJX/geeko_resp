(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{470:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Modal=e.MODAL=e.MASK=void 0;var r=s(["\n\twidth: 100%;\n\theight: 100%;\n\tposition: fixed;\n\ttop:0;\n\tleft:0;\n\tbackground-color:rgba(0,0,0,.6);\n\tz-index:100;\n\toverflow: auto;\n"],["\n\twidth: 100%;\n\theight: 100%;\n\tposition: fixed;\n\ttop:0;\n\tleft:0;\n\tbackground-color:rgba(0,0,0,.6);\n\tz-index:100;\n\toverflow: auto;\n"]),o=s(["\n\ttransform:translate(-50%,0);\n\tleft:50%;\n\ttop:60px;\n\tposition: absolute;\n\tmargin-bottom: 20px;\n"],["\n\ttransform:translate(-50%,0);\n\tleft:50%;\n\ttop:60px;\n\tposition: absolute;\n\tmargin-bottom: 20px;\n"]),a=s(["\n\tfont-family: iconfont;\n\tcursor: pointer;\n\ttop: 15px;\n\tright: 15px;\n\tfont-size: 25px;\n\tposition: absolute;\n\tz-index:2;\n\tcolor: #666;\n"],["\n\tfont-family: iconfont;\n\tcursor: pointer;\n\ttop: 15px;\n\tright: 15px;\n\tfont-size: 25px;\n\tposition: absolute;\n\tz-index:2;\n\tcolor: #666;\n"]),i=n(2),l=c(i),d=c(n(56));function c(t){return t&&t.__esModule?t:{default:t}}function s(t,e){return Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}var u=e.MASK=d.default.div(r),f=e.MODAL=d.default.div(o),p=d.default.span(a);e.Modal=function(t){return l.default.createElement(i.Fragment,null,l.default.createElement(u,null,l.default.createElement(f,null,l.default.createElement(p,{onClick:t.onClose},""),t.children)))}},471:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Button=e.Select=e.Input=e.Form=void 0;var r,o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},a=(r=n(2))&&r.__esModule?r:{default:r},i=n(485);function l(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}e.Form=(0,i.form)(function(t){t.getValues,t.validate,t.validateAll,t.showError,t.hideError;var e=t.children,n=l(t,["getValues","validate","validateAll","showError","hideError","children"]);return a.default.createElement("form",n,e)}),e.Input=(0,i.control)(function(t){var e=t.error,n=t.isChanged,r=t.isUsed,i=t.divStyle,d=l(t,["error","isChanged","isUsed","divStyle"]);return a.default.createElement("div",{style:i,className:n&&r&&e?"error":""},a.default.createElement("input",o({},d,{className:"x-default-input"})),a.default.createElement("div",{className:"__errortext"},n&&r&&e))}),e.Select=(0,i.control)(function(t){var e=t.error,n=t.isChanged,r=t.isUsed,o=l(t,["error","isChanged","isUsed"]);return a.default.createElement("div",{className:n&&r&&e?"error":""},a.default.createElement("select",o),a.default.createElement("div",{className:"__errortext"},n&&r&&e))}),e.Button=(0,i.button)(function(t){var e=t.hasErrors,n=l(t,["hasErrors"]);return a.default.createElement("button",o({},n,{disabled:e&&!n.ingoredisable}))})},472:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getDNI=e.dni=e.phone=e.zip=e.cpf=e.email=e.number=e.required=e.cpfcheck=e.__reg_document_pe__=e.__reg_document_mx__=e.__reg_document_ur__=e.__reg_document_co__=e.__reg_document_cl__=e.__reg_document_ar__=e.__reg_phone_sa_=e.__reg_phone_ae_=e.__reg_phone_br__=e.__reg_phone_normal__=e.__reg_zip_br__=e.__reg_zip_uk__=e.__reg_zip_us__=void 0;var r=a(n(2)),o=a(n(486));function a(t){return t&&t.__esModule?t:{default:t}}var i=e.__reg_zip_us__=/^(([0-9]{5})|([0-9]{5}-[0-9]{4}))$/,l=e.__reg_zip_uk__=/^([a-z]|[A-Z]){1,2}\w{1,2}\s{0,1}[0-9]{1}([a-z]|[A-Z]){2}$/,d=e.__reg_zip_br__=/^[0-9]{5}-[0-9]{3}$/,c=e.__reg_phone_normal__=/^\d{1,20}$/,s=e.__reg_phone_br__=/^\d{8,9}$/,u=e.__reg_phone_ae_=/^(50|52|54|55|56|58|2|3|4|6|7|9){1,2}\d{7}$/,f=e.__reg_phone_sa_=/^(50|53|55|51|58|59|54|56|57|11|12|13|14|16|17|811){1,3}\d{7}$/,p=e.__reg_document_ar__=/^(\d{7,9}|\d{11})$/,_=e.__reg_document_cl__=/^\d{8,9}$/,m=e.__reg_document_co__=/^\d{6,10}$/,b=e.__reg_document_ur__=/^\d{6,8}$/,g=e.__reg_document_mx__=/^\d{10,18}$/,h=e.__reg_document_pe__=/^\d{8,9}$/,v=e.cpfcheck=function(t){var e=!0;t=(t=t.replace("-","")).replace(/\./g,"");for(var n=["11111111111","22222222222","33333333333","44444444444","55555555555","66666666666","77777777777","88888888888","99999999999","00000000000"],r=0;r<n.length;r++)n[r]==t&&(e=!1);t.length>11&&(e=!1);for(var o=0,a=0;a<9;a++)o+=parseInt(t.charAt(a),10)*(10-a);var i=11-o%11;10!=i&&11!=i||(i=0),i!=parseInt(t.charAt(9),10)&&(e=!1),o=0;for(var l=0;l<10;l++)o+=parseInt(t.charAt(l),10)*(11-l);return 10!=(i=11-o%11)&&11!=i||(i=0),i!=parseInt(t.charAt(10),10)&&(e=!1),e},x=(e.required=function(t){if(!t||!t.toString().trim().length)return"required"},e.number=function(t){if(t&&!o.default.isInt(t,{min:0,max:99}))return r.default.createElement("p",null)},e.email=function(t){var e=t?t.trim():t;if(!o.default.isEmail(e))return r.default.createElement("p",null,t," is not a valid email")},e.cpf=function(t){if(!v(t))return r.default.createElement("p",null,t," is not a valid cpf")},e.zip=function(t,e,n){var r=void 0,o=void 0;switch(n.country[0].value){case"US":r=i,o="Please enter 5 digits or 5 digits with a 4-digits number (E.g. 20001 or 20001-0000)";break;case"GB":r=l,o="Wrong ZIP CODE! Please offer us one or two-letter and one-two figures with a space end with one figure and two letters. (e.g. TN37 7HL,CW8 3AD)";break;case"BR":r=d,o="O formato do endereço está incorreto, preencha o formulário de [01310-000]"}if(r&&!r.test(t))return o},e.phone=function(t,e,n){var r=void 0,o=void 0;switch(n.country[0].value){case"BR":r=s,o="Insira pelo menos 8-9 números.";break;case"AE":r=u,o="Phone numbers should start with 50/52/54/55/56/58/2/3/4/6/7/9, followed by any 7 digits.";break;case"SA":r=f,o="Phone numbers should start with 50/53/55/51/58/59/54/56/57/11/12/13/14/16/17/811, followed by any 7 digits.";break;default:r=c,o="Incorrect phone number format (numbers only, no formatting)"}if(r&&!r.test(t))return o},e.dni=function(t){var e=void 0,n=void 0;switch(t){case"AR":e=p,n="DNI debe estar entre 7 a 9, u 11 dígitos";break;case"CL":e=_,n="CI/RUT debe tener entre 8 y 9 dígitos";break;case"CO":e=m,n="Cédula de ciudadanía debe tener entre 6 y 10 dígitos";break;case"UY":e=b,n="Cédula de identidad debe tener entre 6 y 8 dígitos";break;case"MX":e=g,n="Cédula de identidad debe tener entre 10 y 18 dígitos";break;case"PE":e=h,n="Cédula de identidad debe tener entre 8 y 9 dígitos";break;default:e=/\d/,n="Incorrect document"}return function(t){if(e&&!e.test(t))return n}});e.getDNI=function(t){switch(t){case"26":case"27":case"28":return x("AR");case"30":case"31":case"32":return x("CO");case"33":case"34":case"35":return x("CL");case"36":case"37":return x("UY");case"39":case"40":case"41":return x("MX");case"42":case"43":case"44":return x("PE");default:return x("US")}}},473:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ELEMENTS=e.MutiElement=e.FormElement=void 0;var r=u(["\n\tposition: relative;\n"],["\n\tposition: relative;\n"]),o=u(["\n\tlabel{\n\t\tdisplay: block;\n\t\tcolor: #666;\n\t\tmargin-bottom: 4px;\n\t}\n\t&.__required > .__control{\n\t\t&::after{\n\t\t\tcontent: '*';\n\t    color: #E64545;\n\t    position: absolute;\n\t    right: -15px;\n\t    top: 0;\n\t    font-size: 20px;\n\t\t}\n\t}\n\n\t& .error{\n\t\t.__errortext{\n\t\t\tfont-size: 12px;\n\t\t\tmargin-top: 5px;\n\t\t\tcolor: #E64545;\n\t\t}\n\t\tinput, select{\n\t\t\tborder: solid 1px #E64545;\n\t\t}\n\t}\n\n\tinput, select{\n\t\tpadding-left: 15px;\n\t\tborder: solid 1px #cacaca;\n\t}\n\n\tinput[disabled], select[disabled]{\n\t\tborder-color: rgb(202,202,202);\n    color: rgb(202,202,202);\n\t}\n\n\n"],["\n\tlabel{\n\t\tdisplay: block;\n\t\tcolor: #666;\n\t\tmargin-bottom: 4px;\n\t}\n\t&.__required > .__control{\n\t\t&::after{\n\t\t\tcontent: '*';\n\t    color: #E64545;\n\t    position: absolute;\n\t    right: -15px;\n\t    top: 0;\n\t    font-size: 20px;\n\t\t}\n\t}\n\n\t& .error{\n\t\t.__errortext{\n\t\t\tfont-size: 12px;\n\t\t\tmargin-top: 5px;\n\t\t\tcolor: #E64545;\n\t\t}\n\t\tinput, select{\n\t\t\tborder: solid 1px #E64545;\n\t\t}\n\t}\n\n\tinput, select{\n\t\tpadding-left: 15px;\n\t\tborder: solid 1px #cacaca;\n\t}\n\n\tinput[disabled], select[disabled]{\n\t\tborder-color: rgb(202,202,202);\n    color: rgb(202,202,202);\n\t}\n\n\n"]),a=u(["\n\t&::after{\n\t\tcontent: '';\n\t\tdisplay: block;\n\t\tclear: both;\n\t}\n\t& > div{\n\t\twidth: calc( 50% - ","px );\n\t\t&:first-child{\n\t\t\tfloat: left;\n\t\t}\n\t\t&:last-child{\n\t\t\tfloat: right;\n\t\t}\n\t\t\n\t}\n"],["\n\t&::after{\n\t\tcontent: '';\n\t\tdisplay: block;\n\t\tclear: both;\n\t}\n\t& > div{\n\t\twidth: calc( 50% - ","px );\n\t\t&:first-child{\n\t\t\tfloat: left;\n\t\t}\n\t\t&:last-child{\n\t\t\tfloat: right;\n\t\t}\n\t\t\n\t}\n"]),i=u(["\n\t& > div{\n\t\tmargin-top: 15px;\n\t\t&:first-child{\n\t\t\tmargin-top: 0;\n\t\t}\n\t}\n"],["\n\t& > div{\n\t\tmargin-top: 15px;\n\t\t&:first-child{\n\t\t\tmargin-top: 0;\n\t\t}\n\t}\n"]),l=s(n(2)),d=s(n(56)),c=s(n(474));function s(t){return t&&t.__esModule?t:{default:t}}function u(t,e){return Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}var f=d.default.div(r),p=d.default.div(o);e.FormElement=function(t){return l.default.createElement(p,t,l.default.createElement("label",null,t.label," ",t.tipMessage&&l.default.createElement(c.default,{style:{marginLeft:2},message:t.tipMessage})),l.default.createElement(f,{className:"__control"},t.children))},e.MutiElement=d.default.div(a,function(t){return(t.gap||40)/2}),e.ELEMENTS=d.default.div(i)},474:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o,a=(r=["\n\twidth: 16px;\n\theight: 16px;\n\tborder: solid 1px #999;\n\topacity: 0.99;\n\tcursor: pointer;\n\ttext-align: center;\n\tline-height: 16px;\n\tcolor: #999;\n\tborder-radius: 50%;\n  display: inline-block;\n  font-size: 12px;\n  position: relative;\n  z-index: 1;\n\n  .__answer{\n  \tposition: absolute;\n  \ttop: 20px;\n  \tleft: -200px;\n  \tborder-radius: 4px;\n\t\tborder: solid 1px #e6e6e6;\n\t\tpadding: 15px;\n\t\tline-height: 20px;\n\t\twidth: 420px;\n    background-color: #fff;\n    display: none;\n    color: #222;\n    font-size: 14px;\n    text-align: left;\n    z-index: 100;\n  }\n\n\n  &:hover{\n  \t.__answer{\n  \t\tdisplay: block;\n  \t}\n    border-color: #cacaca;\n    color: #cacaca;\n  }\n"],o=["\n\twidth: 16px;\n\theight: 16px;\n\tborder: solid 1px #999;\n\topacity: 0.99;\n\tcursor: pointer;\n\ttext-align: center;\n\tline-height: 16px;\n\tcolor: #999;\n\tborder-radius: 50%;\n  display: inline-block;\n  font-size: 12px;\n  position: relative;\n  z-index: 1;\n\n  .__answer{\n  \tposition: absolute;\n  \ttop: 20px;\n  \tleft: -200px;\n  \tborder-radius: 4px;\n\t\tborder: solid 1px #e6e6e6;\n\t\tpadding: 15px;\n\t\tline-height: 20px;\n\t\twidth: 420px;\n    background-color: #fff;\n    display: none;\n    color: #222;\n    font-size: 14px;\n    text-align: left;\n    z-index: 100;\n  }\n\n\n  &:hover{\n  \t.__answer{\n  \t\tdisplay: block;\n  \t}\n    border-color: #cacaca;\n    color: #cacaca;\n  }\n"],Object.freeze(Object.defineProperties(r,{raw:{value:Object.freeze(o)}}))),i=l(n(2));function l(t){return t&&t.__esModule?t:{default:t}}var d=l(n(56)).default.div(a);e.default=function(t){return i.default.createElement(d,t,i.default.createElement("span",null,"?"),t.message&&i.default.createElement("div",{className:"__answer"},i.default.createElement("div",{dangerouslySetInnerHTML:{__html:t.message}})))}},620:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o,a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=(r=["\n    padding: 40px;\n    background-color: #fff;\n    width: 400px;\n\n  .__title{\n    font-family: HelveticaNeue-Medium;\n    font-size: 24px;\n    color: #222;\n  }\n"],o=["\n    padding: 40px;\n    background-color: #fff;\n    width: 400px;\n\n  .__title{\n    font-family: HelveticaNeue-Medium;\n    font-size: 24px;\n    color: #222;\n  }\n"],Object.freeze(Object.defineProperties(r,{raw:{value:Object.freeze(o)}}))),l=v(n(2)),d=v(n(56)),c=n(81),s=n(80),u=(n(115),n(470)),f=n(117),p=n(471),_=n(472),m=n(473),b=n(476),g=n(481),h=n(116);function v(t){return t&&t.__esModule?t:{default:t}}var x=d.default.div(i),E=function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.close=n.close.bind(n),n.handleInputChange=n.handleInputChange.bind(n),n.state={password:null,confirm:null,updating:!1},n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,l.default.Component),a(e,[{key:"close",value:function(t){t.preventDefault(),this.props.history.goBack()}},{key:"handleInputChange",value:function(t){var e=t.target,n="checkbox"===e.type?e.checked:e.value,r=e.name;this.setState(function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}({},r,n))}},{key:"handleSubmit",value:function(t){t.preventDefault(),this.form.validateAll(),this.passwordBtn.context._errors&&this.passwordBtn.context._errors.length||(0,c.changepassword)(this.state.password).then(function(){window.location.href=(window.ctx||"")+"/page/login?redirectUrl="+(window.ctx||"")+"/me/m/order&loginPage=1"})}},{key:"render",value:function(){var t=this,e=this.props,n=e.intl,r=e.me;return l.default.createElement(u.Modal,{onClose:this.close.bind(this)},l.default.createElement(x,null,l.default.createElement("div",{style:{paddingTop:10}},l.default.createElement("div",null,l.default.createElement("span",null,n.formatMessage({id:"account"}),": "),l.default.createElement(g.Red,null,r?r.communicationEmail:"")),l.default.createElement(p.Form,{style:{marginTop:10},ref:function(e){return t.form=e},onSubmit:this.handleSubmit.bind(this)},l.default.createElement(m.ELEMENTS,null,l.default.createElement(m.FormElement,{label:n.formatMessage({id:"set_password"})+":",className:"__required"},l.default.createElement(p.Input,{name:"password",type:"password",style:{width:"100%",height:40},value:this.state.password,onChange:this.handleInputChange,validations:[_.required]})),l.default.createElement(m.FormElement,null,this.state.updating?l.default.createElement(b.BigButton,{className:"__btn",height:40,bgColor:"#999"},n.formatMessage({id:"please_wait"}),"..."):l.default.createElement(p.Button,{className:"__submitbtn",ref:function(e){return t.passwordBtn=e},ingoredisable:"true",style:{display:"block",backgroundColor:"#e7004d",borderRadius:2,color:"#fff",height:40,lineHeight:"40px",textAlign:"center",outline:"none",border:"none",width:"100%",textTransform:"uppercase",cursor:"pointer",fontSize:16}},n.formatMessage({id:"save"}))))))))}}]),e}();e.default=(0,f.connect)(function(t){return{me:t.me}},function(t){return{REFRESHME:function(){t((0,h.fetchMe)())}}})((0,s.injectIntl)(E))}}]);
//# sourceMappingURL=component--set-password.chunk.js.map