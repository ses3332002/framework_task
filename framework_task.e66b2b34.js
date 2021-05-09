parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"yG4r":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.appVersion=exports.freshnessTime=exports.requestOptions=exports.url=exports.UIStrings=exports.topLevelFrameBlocks=void 0;const t=["header","main","footer"];exports.topLevelFrameBlocks=t;const r={ru:{invoiceString:"Введите номер квитанции",phoneString:"Введите номер телефона",searchButtonString:"Искать",clearButtonString:"Очистить",routeString:"Маршрут",weightString:"Вес, кг",placesString:"Мест",statusString:"Текущий статус",requestString:"Заказать",yesString:"да",noString:"нет",returnString:"Можно вернуть",redirectString:"Можно переслать",headerString:"Трекинг посылок Новой почты",footerString:"Версия",resultString:"Результат"},ua:{invoiceString:"Введіть номер квитанції",phoneString:"Введіть номер телефону",searchButtonString:"Шукати",clearButtonString:"Очистити",routeString:"Маршрут",weightString:"Вага, кг",placesString:"Місць",statusString:"Поточний статус",requestString:"Замовити",yesString:"так",noString:"ні",returnString:"Можна повернути",redirectString:"Можна переслати",headerString:"Трекінг посилок Нової пошти",footerString:"Версія",resultString:"Результат"}};exports.UIStrings=r;const e="https://api.novaposhta.ua/v2.0/json/";exports.url=e;const n={mode:"cors",cache:"no-cache",redirect:"follow",method:"POST"};exports.requestOptions=n;const o=18e6;exports.freshnessTime=18e6;const s="1.4";exports.appVersion="1.4";
},{}],"91zb":[function(require,module,exports) {
module.exports={lang_choose:"_lang_choose_11036",lang_choose__btn:"_lang_choose__btn_11036",tracking_form:"_tracking_form_11036",request_set:"_request_set_11036",request_remove_set:"_request_remove_set_11036",request_item:"_request_item_11036",request_submit:"_request_submit_11036",request_add_set:"_request_add_set_11036",request_action:"_request_action_11036",tracking_result:"_tracking_result_11036",tracking_result__wrapper:"_tracking_result__wrapper_11036",tracking_result__caption:"_tracking_result__caption_11036",tracking_result__text:"_tracking_result__text_11036"};
},{"./icons_sprite.svg":[["icons_sprite.36c42f04.svg","AHuP"],"AHuP"]}],"Focm":[function(require,module,exports) {
"use strict";var e=require("./variables.js"),t=n(require("./style"));function n(e){return e&&e.__esModule?e:{default:e}}function a(e){return`<${e}></${e}>`}function r(n=window.appState.lang){document.querySelector("header").innerHTML=`<h1>${e.UIStrings[n].headerString}</h1>\n  <div class=${t.default.lang_choose}>\n    <button class=${t.default.lang_choose__btn} data-lang="ru" onclick="changeLanguage(event)"></button>\n    <button class=${t.default.lang_choose__btn} data-lang="ua" onclick="changeLanguage(event)"></button>\n  </div>`}function i(e,n=window.appState.lang){n!=e.target.dataset.lang&&(window.appState.lang=e.target.dataset.lang,v(),document.querySelector(`.${t.default.lang_choose__btn}[data-lang=${window.appState.lang}]`).focus())}function u(t=window.appState.lang){document.querySelector("footer").innerHTML=`${e.UIStrings[t].footerString} ${e.appVersion}`}function o(t,n=window.appState.lang,a=window.appState.documentsForRender,r=window.appState.requestedDocuments){t.preventDefault(),a.length=0;const i={modelName:"TrackingDocument",calledMethod:"getStatusDocuments",methodProperties:{Language:n}},u=[];r.forEach(function(t,n){localStorage.getItem(t.DocumentNumber)&&JSON.parse(localStorage.getItem(t.DocumentNumber)).requestTime>new Date-e.freshnessTime?a[n]=JSON.parse(localStorage.getItem(t.DocumentNumber)):(u.push(t),a[n]="gotToBeDownloaded")}),0==u.length?l(a):(i.methodProperties.Documents=u,e.requestOptions.body=JSON.stringify(i),fetch(e.url,e.requestOptions).then(e=>e.json()).then(e=>{s(e.data,a)}).catch(e=>{console.error("there was some error:",e)}))}function s(e,t){t.forEach((n,a)=>{"gotToBeDownloaded"==n&&((n=e.shift()).requestTime=+new Date,localStorage.setItem(n.Number,JSON.stringify(n)),t[a]=n)}),l(t)}function l(n=window.appState.documentsForRender,a=window.appState.lang){const r=Array.from(document.querySelectorAll(`.${t.default.tracking_result}`));n.forEach((n,i)=>{r[i].innerHTML=function(n){return`<h2>${e.UIStrings[a].resultString}:</h2>\n  <div class=${t.default.tracking_result__wrapper}>\n    <div class=${t.default.tracking_result__caption}>${e.UIStrings[a].routeString}:</div>\n    <div class=${t.default.tracking_result__text}>${n.CitySender}-${n.CityRecipient}</div>\n    <div class=${t.default.tracking_result__caption}>${e.UIStrings[a].weightString}:</div>\n    <div class=${t.default.tracking_result__text}>${n.DocumentWeight}</div>\n    <div class=${t.default.tracking_result__caption}>${e.UIStrings[a].placesString}:</div>\n    <div class=${t.default.tracking_result__text}>${n.SeatsAmount}</div>\n    <div class=${t.default.tracking_result__caption}>${e.UIStrings[a].statusString}:</div>\n    <div class=${t.default.tracking_result__text}>${n.Status}</div>\n    <div class=${t.default.tracking_result__caption}>${e.UIStrings[a].returnString}:</div>\n    <div class=${t.default.tracking_result__text}>${n.PossibilityCreateReturn?e.UIStrings[a].yesString:e.UIStrings[a].noString}<input type="button" class=${t.default.request_action} disabled value="${e.UIStrings[a].requestString}"/></div>\n    <div class=${t.default.tracking_result__caption}>${e.UIStrings[a].redirectString}:</div>\n    <div class=${t.default.tracking_result__text}>${n.PossibilityCreateRedirecting?e.UIStrings[a].yesString:e.UIStrings[a].noString}<input type="button" class=${t.default.request_action} disabled value="${e.UIStrings[a].requestString}"/></div>\n  </div>`}(n)})}function c(e=window.appState.documentsForRender,n=window.appState.requestedDocuments){Array.from(document.querySelectorAll(`.${t.default.request_set}`)).forEach((e,n)=>{n>0?e.remove():(e.querySelector("input[name = invoice_number]").value="",e.querySelector("input[name = phone_number]").value="",e.querySelector(`.${t.default.tracking_result}`).innerHTML="")}),e.length=0,n.length=0}function d(n=window.appState.lang,a=window.appState.documentsForRender){document.querySelector("main").innerHTML=`\n  <div class=${t.default.tracking_form}>\n    <form name="request_form" autocomplete="off" onsubmit="getTrackingData(event)" oninput="updateFormState(event)">\n    ${p()}\n      <input type="submit" value="${e.UIStrings[n].searchButtonString}" class=${t.default.request_submit} />\n      <input type="button" value="${e.UIStrings[n].clearButtonString}" class=${t.default.request_submit} onclick="resetForm()" />\n    </form>\n  </div>`,0!=a.length&&l()}function g(e,n=window.appState.requestedDocuments){const a=Array.from(document.querySelectorAll(`.${t.default.request_set}`));n.length=0,a.forEach(function(e){n.push({DocumentNumber:e.querySelector("input[name = invoice_number]").value,Phone:e.querySelector("input[name = phone_number]").value})})}function p(e=window.appState.requestedDocuments){return 0==e.length?m():e.map(e=>m(e.DocumentNumber,e.Phone)).join("")}function m(n="",a="",r=window.appState.lang){return`<div class=${t.default.request_set}>\n            <div class=${t.default.request_item}>\n              <input type="text" name="invoice_number" value="${n}" placeholder=" " required/>\n              <label for="invoice_number">${e.UIStrings[r].invoiceString}</label>\n            </div>\n            <div class=${t.default.request_item}>\n              <input type="text" name="phone_number" value="${a}" pattern="[0-9]{0,10}" placeholder=" "/>\n              <label for="phone_number">${e.UIStrings[r].phoneString}</label>\n            </div>\n            <input type="button" class=${t.default.request_add_set} onclick="addRequestSet(event)" value="+"/>\n            <input type="button" class=${t.default.request_remove_set} onclick="removeRequestSet(event)" value="-"/>\n            <div class=${t.default.tracking_result}></div>\n          </div>`}function S(e){e.target.parentNode.insertAdjacentHTML("afterend",`${m()}`)}function f(){event.target.parentNode.remove()}window.appState={lang:"ru",documentsForRender:[],requestedDocuments:[]},window.addRequestSet=S,window.removeRequestSet=f,window.getTrackingData=o,window.resetForm=c,window.changeLanguage=i,window.updateFormState=g;let _=e.topLevelFrameBlocks.reduce((e,t)=>e+=a(t),"");function v(e=window.appState.lang){document.querySelector("HTML").setAttribute("lang",e),r(),d(),u()}document.body.insertAdjacentHTML("afterbegin",_),v();
},{"./variables.js":"yG4r","./style":"91zb"}]},{},["Focm"], null)
//# sourceMappingURL=framework_task.e66b2b34.js.map