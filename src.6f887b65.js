parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"0g0Z":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.appVersion=exports.freshnessTime=exports.appState=exports.requestOptions=exports.url=exports.UIStrings=exports.topLevelFrameBlocks=void 0;const t=["header","main","footer"];exports.topLevelFrameBlocks=t;const r={ru:{invoiceString:"Введите номер квитанции",phoneString:"Введите номер телефона",searchButtonString:"Искать",clearButtonString:"Очистить",routeString:"Маршрут",weightString:"Вес, кг",placesString:"Мест",statusString:"Текущий статус",requestString:"Заказать",yesString:"да",noString:"нет",returnString:"Можно вернуть",redirectString:"Можно переслать",headerString:"Трекинг посылок Новой почты",footerString:"Версия",resultString:"Результат",ariaLabelRuString:"Русский язык",ariaLabelUaString:"Украинский язык"},ua:{invoiceString:"Введіть номер квитанції",phoneString:"Введіть номер телефону",searchButtonString:"Шукати",clearButtonString:"Очистити",routeString:"Маршрут",weightString:"Вага, кг",placesString:"Місць",statusString:"Поточний статус",requestString:"Замовити",yesString:"так",noString:"ні",returnString:"Можливо повернути",redirectString:"Можливо переслати",headerString:"Трекінг посилок Нової пошти",footerString:"Версія",resultString:"Результат",ariaLabelRuString:"Російська мова",ariaLabelUaString:"Українська мова"}};exports.UIStrings=r;const e="https://api.novaposhta.ua/v2.0/json/";exports.url=e;const n={mode:"cors",cache:"no-cache",redirect:"follow",method:"POST"};exports.requestOptions=n;const o={lang:"ru",requestedDocuments:[],documentsForDownload:[]};exports.appState=o;const i=18e6;exports.freshnessTime=18e6;const s="1.5";exports.appVersion="1.5";
},{}],"FPja":[function(require,module,exports) {
module.exports={tracking_result__wrapper:"_tracking_result__wrapper_034d9",tracking_result__caption:"_tracking_result__caption_034d9",tracking_result__text:"_tracking_result__text_034d9"};
},{}],"uOKr":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Result=r;var t=require("../../data/variables"),i=e(require("./result"));function e(t){return t&&t.__esModule?t:{default:t}}function r(e,r=window.appState.lang){return e?`<h2>${t.UIStrings[r].resultString}:</h2>\n    <div class=${i.default.tracking_result__wrapper}>\n    <div class=${i.default.tracking_result__caption}>${t.UIStrings[r].routeString}:</div>\n    <div class=${i.default.tracking_result__text}>${e.CitySender}-${e.CityRecipient}</div>\n    <div class=${i.default.tracking_result__caption}>${t.UIStrings[r].weightString}:</div>\n    <div class=${i.default.tracking_result__text}>${e.DocumentWeight}</div>\n    <div class=${i.default.tracking_result__caption}>${t.UIStrings[r].placesString}:</div>\n    <div class=${i.default.tracking_result__text}>${e.SeatsAmount}</div>\n    <div class=${i.default.tracking_result__caption}>${t.UIStrings[r].statusString}:</div>\n    <div class=${i.default.tracking_result__text}>${e.Status}</div>\n    <div class=${i.default.tracking_result__caption}>${t.UIStrings[r].returnString}:</div>\n    <div class=${i.default.tracking_result__text}>${e.PossibilityCreateReturn?t.UIStrings[r].yesString:t.UIStrings[r].noString}<input type="button" class=${i.default.request_action} disabled value="${t.UIStrings[r].requestString}"/></div>\n    <div class=${i.default.tracking_result__caption}>${t.UIStrings[r].redirectString}:</div>\n    <div class=${i.default.tracking_result__text}>${e.PossibilityCreateRedirecting?t.UIStrings[r].yesString:t.UIStrings[r].noString}<input type="button" class=${i.default.request_action} disabled value="${t.UIStrings[r].requestString}"/></div>\n    </div>`:""}
},{"../../data/variables":"0g0Z","./result":"FPja"}],"owi8":[function(require,module,exports) {
module.exports={request_set:"_request_set_5bbd3",request_remove_set:"_request_remove_set_5bbd3",request_set_buttons:"_request_set_buttons_5bbd3",request_item:"_request_item_5bbd3",request_add_set:"_request_add_set_5bbd3",tracking_result:"_tracking_result_5bbd3"};
},{}],"CN4N":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.RequestSet=r,Object.defineProperty(exports,"requestSetStyles",{enumerable:!0,get:function(){return n.default}});var e=require("../../data/variables"),t=require("../Result/Result"),n=u(require("./request_set"));function u(e){return e&&e.__esModule?e:{default:e}}function r(u="",r="",l=null,s=window.appState.lang){return`<div class=${n.default.request_set}>\n            <div class=${n.default.request_item}>\n              <input type="text" id="invoice_number" name="invoice_number" value="${u}" placeholder=" " required/>\n              <label for="invoice_number">${e.UIStrings[s].invoiceString}</label>\n            </div>\n            <div class=${n.default.request_item}>\n              <input type="text" id="phone_number" name="phone_number" value="${r}" pattern="[0-9]{0,10}" placeholder=" "/>\n              <label for="phone_number">${e.UIStrings[s].phoneString}</label>\n            </div>\n            <div class=${n.default.request_set_buttons}>\n              <input type="button" class=${n.default.request_add_set} onclick="addRequestSet(event)" value="+"/>\n              <input type="button" class=${n.default.request_remove_set} onclick="removeRequestSet(event)" value="-"/>\n            </div>\n            <div class=${n.default.tracking_result}>\n            ${(0,t.Result)(l)}\n            </div>\n          </div>`}
},{"../../data/variables":"0g0Z","../Result/Result":"uOKr","./request_set":"owi8"}],"O72R":[function(require,module,exports) {
module.exports={tracking_form:"_tracking_form_a4a38",request_submit:"_request_submit_a4a38",request_action:"_request_action_a4a38"};
},{}],"wJQf":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.TrackingForm=r;var e=require("../../data/variables"),t=n(require("./tracking_form")),u=require("../RequestSet/RequestSet");function n(e){return e&&e.__esModule?e:{default:e}}function r(n=window.appState.lang){return`<div class=${t.default.tracking_form}>\n    <form name="request_form" autocomplete="off" onsubmit="getTrackingData(event)" oninput="updateRequestedDocuments()">\n    ${function(e=window.appState.requestedDocuments){return 0==e.length?(0,u.RequestSet)():e.map(e=>(0,u.RequestSet)(e.DocumentNumber,e.Phone,e.result)).join("")}()}\n      <input type="submit" value="${e.UIStrings[n].searchButtonString}" class=${t.default.request_submit} />\n      <input type="button" value="${e.UIStrings[n].clearButtonString}" class=${t.default.request_submit} onclick="resetForm()" />\n    </form>\n  </div>`}
},{"../../data/variables":"0g0Z","./tracking_form":"O72R","../RequestSet/RequestSet":"CN4N"}],"CCFA":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Main=e;var r=require("../TrackingForm/TrackingForm");function e(e=window.appState.documentsForRender){return`${(0,r.TrackingForm)()}`}
},{"../TrackingForm/TrackingForm":"wJQf"}],"kcWV":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.changeLanguage=n,exports.resetForm=o,exports.addRequestSet=r,exports.removeRequestSet=a;var e=require("../components/RequestSet/RequestSet"),t=require("../components/Main/Main");function n(e,t=window.appState.lang){t!=e.target.dataset.lang&&(window.appState.lang=e.target.dataset.lang,document.querySelector("HTML").setAttribute("lang",window.appState.lang),window.renderApp(),document.querySelector(`button[data-lang=${window.appState.lang}]`).focus())}function o(e=window.appState.requestedDocuments){e.length=0,window.renderApp(document.querySelector("main"),t.Main)}function r(t){t.target.parentNode.parentNode.insertAdjacentHTML("afterend",`${(0,e.RequestSet)()}`),document.forms.request_form.oninput()}function a(e){e.target.parentNode.parentNode.remove(),document.forms.request_form.oninput()}
},{"../components/RequestSet/RequestSet":"CN4N","../components/Main/Main":"CCFA"}],"kFzu":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.updateRequestedDocuments=t;var e=require("../components/RequestSet/RequestSet");function t(t=window.appState.requestedDocuments){const u=Array.from(document.querySelectorAll(`.${e.requestSetStyles.request_set}`));t.length=0,u.forEach(function(e){t.push({DocumentNumber:e.querySelector("input[name = invoice_number]").value,Phone:e.querySelector("input[name = phone_number]").value})})}
},{"../components/RequestSet/RequestSet":"CN4N"}],"UcEM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.checkLocalStorage=t;var e=require("./variables");function t(t,o){let r=window.appState.documentsForDownload;r.length=0,localStorage.getItem(t.DocumentNumber)&&JSON.parse(localStorage.getItem(t.DocumentNumber)).requestTime>new Date-e.freshnessTime?t.result=JSON.parse(localStorage.getItem(t.DocumentNumber)):(r.push(t),t.result="gotToBeDownloaded")}
},{"./variables":"0g0Z"}],"lxJb":[function(require,module,exports) {
"use strict";function e(e,t){t.forEach((t,r)=>{"gotToBeDownloaded"==t.result&&(t.result=e.shift(),t.result.requestTime=+new Date,localStorage.setItem(t.result.Number,JSON.stringify(t.result)))}),window.renderApp()}Object.defineProperty(exports,"__esModule",{value:!0}),exports.manageResults=e;
},{}],"MtyZ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getTrackingData=r;var e=require("./checkLocalStorage"),t=require("./manageResults"),o=require("./variables");function r(r,a=window.appState.lang,n=window.appState.requestedDocuments,s=window.appState.documentsForDownload){r.preventDefault();const c={modelName:"TrackingDocument",calledMethod:"getStatusDocuments",methodProperties:{Language:a}};n.forEach(e.checkLocalStorage),0==s.length?window.renderApp():(c.methodProperties.Documents=s,o.requestOptions.body=JSON.stringify(c),fetch(o.url,o.requestOptions).then(e=>e.json()).then(e=>{(0,t.manageResults)(e.data,n)}).catch(e=>{console.error("there was some error:",e)}))}
},{"./checkLocalStorage":"UcEM","./manageResults":"lxJb","./variables":"0g0Z"}],"fAww":[function(require,module,exports) {
module.exports={lang_choose:"_lang_choose_42b73",lang_choose__btn:"_lang_choose__btn_42b73"};
},{"./language_icons_sprite.svg":[["language_icons_sprite.36c42f04.svg","uHIw"],"uHIw"]}],"DOF0":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.LangSelection=t;var a=require("../../data/variables"),e=n(require("./lang_selection"));function n(a){return a&&a.__esModule?a:{default:a}}function t(n=window.appState.lang){return`<div class=${e.default.lang_choose}>\n    <button class=${e.default.lang_choose__btn} aria-label="${a.UIStrings[n].ariaLabelRuString}" data-lang="ru" onclick="changeLanguage(event)"></button>\n    <button class=${e.default.lang_choose__btn} aria-label="${a.UIStrings[n].ariaLabelUaString}" data-lang="ua" onclick="changeLanguage(event)"></button>\n  </div>`}
},{"../../data/variables":"0g0Z","./lang_selection":"fAww"}],"lQSa":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Header=t;var e=require("../../data/variables"),r=require("../LangSelection/LangSelection");function t(t=window.appState.lang){return`<h1>${e.UIStrings[t].headerString}</h1>\n  ${(0,r.LangSelection)()}`}
},{"../../data/variables":"0g0Z","../LangSelection/LangSelection":"DOF0"}],"c5qM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Footer=r;var e=require("../../data/variables");function r(r=window.appState.lang){return`${e.UIStrings[r].footerString} ${e.appVersion}`}
},{"../../data/variables":"0g0Z"}],"l9bV":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.renderApp=t;var e=require("../components/Header/Header"),r=require("../components/Footer/Footer"),o=require("../components/Main/Main");function t(t=[document.querySelector("header"),document.querySelector("footer"),document.querySelector("main")],n=[e.Header,r.Footer,o.Main]){Array.isArray(t)||(t=Array.of(t),n=Array.of(n)),t.forEach((e,r)=>{e.innerHTML=n[r]()})}
},{"../components/Header/Header":"lQSa","../components/Footer/Footer":"c5qM","../components/Main/Main":"CCFA"}],"zbMG":[function(require,module,exports) {
"use strict";var e=require("../data/variables");function r(e){return`<${e}></${e}>`}let t=e.topLevelFrameBlocks.reduce((e,t)=>e+=r(t),"");document.body.insertAdjacentHTML("afterbegin",t);
},{"../data/variables":"0g0Z"}],"4A+K":[function(require,module,exports) {
module.exports={};
},{"./MontserratAlternates.woff2":[["MontserratAlternates.17bd50a6.woff2","BAE7"],"BAE7"]}],"Focm":[function(require,module,exports) {
"use strict";var e=require("./data/variables"),r=require("./data/changeAppState"),t=require("./data/updateRequestedDocuments"),a=require("./data/getTrackingData"),d=require("./framework/renderApp"),u=require("./framework/prepareStructure"),n=i(require("./style/style"));function i(e){return e&&e.__esModule?e:{default:e}}window.appState=e.appState,window.addRequestSet=r.addRequestSet,window.removeRequestSet=r.removeRequestSet,window.resetForm=r.resetForm,window.changeLanguage=r.changeLanguage,window.getTrackingData=a.getTrackingData,window.updateRequestedDocuments=t.updateRequestedDocuments,window.renderApp=d.renderApp,window.renderApp();
},{"./data/variables":"0g0Z","./data/changeAppState":"kcWV","./data/updateRequestedDocuments":"kFzu","./data/getTrackingData":"MtyZ","./framework/renderApp":"l9bV","./framework/prepareStructure":"zbMG","./style/style":"4A+K"}]},{},["Focm"], null)
//# sourceMappingURL=src.6f887b65.js.map