import {
  topLevelFrameBlocks,
  UIStrings,
  requestOptions,
  url,
  freshnessTime,
  appVersion,
} from './variables.js';

import styles from './style';

// console.log(process.env.API_KEY);

window.appState = {
  lang: 'ru',
  documentsForRender: [],
  requestedDocuments: [],
};

function renderSemanticBlock(block) {
  return `<${block}></${block}>`;
}

function renderHeader(lang = window.appState.lang) {
  document.querySelector('header').innerHTML = `<h1>${UIStrings[lang].headerString}</h1>
  <div class=${styles.lang_choose}>
    <button class=${styles.lang_choose__btn} data-lang="ru" onclick="changeLanguage(event)"></button>
    <button class=${styles.lang_choose__btn} data-lang="ua" onclick="changeLanguage(event)"></button>
  </div>`;
}
// TODO: try todo
function changeLanguage(event, lang = window.appState.lang) {
  if (lang == event.target.dataset.lang) {
    return;
  } else {
    window.appState.lang = event.target.dataset.lang;
    renderApp();
    document
      .querySelector(`.${styles.lang_choose__btn}[data-lang=${window.appState.lang}]`)
      .focus();
  }
}

function renderFooter(lang = window.appState.lang) {
  document.querySelector('footer').innerHTML = `${UIStrings[lang].footerString} ${appVersion}`;
}

function getTrackingData(
  event,
  lang = window.appState.lang,
  documentsForRender = window.appState.documentsForRender,
  requestedDocuments = window.appState.requestedDocuments,
) {
  event.preventDefault();
  documentsForRender.length = 0;

  const requestTemplate = {
    modelName: 'TrackingDocument',
    calledMethod: 'getStatusDocuments',
    methodProperties: {
      Language: lang,
    },
  };

  const documentsForDownload = [];
  requestedDocuments.forEach(checkLocalStorage);

  function checkLocalStorage(requestedItem, index) {
    if (
      localStorage.getItem(requestedItem.DocumentNumber) &&
      JSON.parse(localStorage.getItem(requestedItem.DocumentNumber)).requestTime >
        new Date() - freshnessTime
    ) {
      documentsForRender[index] = JSON.parse(localStorage.getItem(requestedItem.DocumentNumber));
    } else {
      documentsForDownload.push(requestedItem);
      documentsForRender[index] = 'gotToBeDownloaded';
    }
  }

  if (documentsForDownload.length == 0) {
    renderResults(documentsForRender);
  } else {
    requestTemplate.methodProperties.Documents = documentsForDownload;
    requestOptions.body = JSON.stringify(requestTemplate);

    fetch(url, requestOptions)
      .then(response => {
        return response.json();
      })
      .then(result => {
        manageResults(result.data, documentsForRender);
      })
      .catch(err => {
        console.error('there was some error:', err);
      });
  }
}

// storing downloaded data to local storage and preparing data for render results
function manageResults(downloadedResults, documentsForRender) {
  documentsForRender.forEach((result, index) => {
    if (result == 'gotToBeDownloaded') {
      result = downloadedResults.shift();
      result.requestTime = +new Date();
      localStorage.setItem(result.Number, JSON.stringify(result));
      documentsForRender[index] = result;
    }
  });
  renderResults(documentsForRender);
}

function renderResults(
  resultsData = window.appState.documentsForRender,
  lang = window.appState.lang,
) {
  const trackingResultFields = Array.from(document.querySelectorAll(`.${styles.tracking_result}`));
  resultsData.forEach((item, index) => {
    trackingResultFields[index].innerHTML = prepareResultString(item);
  });

  function prepareResultString(resultItem) {
    return `<h2>${UIStrings[lang].resultString}:</h2>
  <div class=${styles.tracking_result__wrapper}>
    <div class=${styles.tracking_result__caption}>${UIStrings[lang].routeString}:</div>
    <div class=${styles.tracking_result__text}>${resultItem.CitySender}-${
      resultItem.CityRecipient
    }</div>
    <div class=${styles.tracking_result__caption}>${UIStrings[lang].weightString}:</div>
    <div class=${styles.tracking_result__text}>${resultItem.DocumentWeight}</div>
    <div class=${styles.tracking_result__caption}>${UIStrings[lang].placesString}:</div>
    <div class=${styles.tracking_result__text}>${resultItem.SeatsAmount}</div>
    <div class=${styles.tracking_result__caption}>${UIStrings[lang].statusString}:</div>
    <div class=${styles.tracking_result__text}>${resultItem.Status}</div>
    <div class=${styles.tracking_result__caption}>${UIStrings[lang].returnString}:</div>
    <div class=${styles.tracking_result__text}>${
      resultItem.PossibilityCreateReturn ? UIStrings[lang].yesString : UIStrings[lang].noString
    }<input type="button" class=${styles.request_action} disabled value="${
      UIStrings[lang].requestString
    }"/></div>
    <div class=${styles.tracking_result__caption}>${UIStrings[lang].redirectString}:</div>
    <div class=${styles.tracking_result__text}>${
      resultItem.PossibilityCreateRedirecting ? UIStrings[lang].yesString : UIStrings[lang].noString
    }<input type="button" class=${styles.request_action} disabled value="${
      UIStrings[lang].requestString
    }"/></div>
  </div>`;
  }
}

function resetForm(
  documentsForRender = window.appState.documentsForRender,
  requestedDocuments = window.appState.requestedDocuments,
) {
  const requestSets = Array.from(document.querySelectorAll(`.${styles.request_set}`));
  requestSets.forEach((requestSet, index) => {
    if (index > 0) {
      requestSet.remove();
    } else {
      requestSet.querySelector('input[name = invoice_number]').value = '';
      requestSet.querySelector('input[name = phone_number]').value = '';
      requestSet.querySelector(`.${styles.tracking_result}`).innerHTML = '';
    }
  });
  documentsForRender.length = 0;
  requestedDocuments.length = 0;
}

function renderMain(
  lang = window.appState.lang,
  documentsForRender = window.appState.documentsForRender,
) {
  document.querySelector('main').innerHTML = `
  <div class=${styles.tracking_form}>
    <form name="request_form" autocomplete="off" onsubmit="getTrackingData(event)" oninput="updateFormState(event)">
    ${renderRequestSets()}
      <input type="submit" value="${UIStrings[lang].searchButtonString}" class=${
    styles.request_submit
  } />
      <input type="button" value="${UIStrings[lang].clearButtonString}" class=${
    styles.request_submit
  } onclick="resetForm()" />
    </form>
  </div>`;
  if (documentsForRender.length != 0) {
    renderResults();
  }
}

function updateFormState(event, requestedDocuments = window.appState.requestedDocuments) {
  const requestSets = Array.from(document.querySelectorAll(`.${styles.request_set}`));
  requestedDocuments.length = 0;
  requestSets.forEach(prepareDocuments);

  function prepareDocuments(requestItem) {
    requestedDocuments.push({
      DocumentNumber: requestItem.querySelector('input[name = invoice_number]').value,
      Phone: requestItem.querySelector('input[name = phone_number]').value,
    });
  }
}

function renderRequestSets(requestedDocuments = window.appState.requestedDocuments) {
  if (requestedDocuments.length == 0) {
    return renderRequestSet();
  } else {
    return requestedDocuments
      .map(item => {
        return renderRequestSet(item.DocumentNumber, item.Phone);
      })
      .join('');
  }
}

function renderRequestSet(invoiceNumber = '', phoneNumber = '', lang = window.appState.lang) {
  return `<div class=${styles.request_set}>
            <div class=${styles.request_item}>
              <input type="text" name="invoice_number" value="${invoiceNumber}" placeholder=" " required/>
              <label for="invoice_number">${UIStrings[lang].invoiceString}</label>
            </div>
            <div class=${styles.request_item}>
              <input type="text" name="phone_number" value="${phoneNumber}" pattern="[0-9]{0,10}" placeholder=" "/>
              <label for="phone_number">${UIStrings[lang].phoneString}</label>
            </div>
            <input type="button" class=${styles.request_add_set} onclick="addRequestSet(event)" value="+"/>
            <input type="button" class=${styles.request_remove_set} onclick="removeRequestSet(event)" value="-"/>
            <div class=${styles.tracking_result}></div>
          </div>`;
}

function addRequestSet(event) {
  event.target.parentNode.insertAdjacentHTML('afterend', `${renderRequestSet()}`);
}

function removeRequestSet() {
  event.target.parentNode.remove();
}

window.addRequestSet = addRequestSet;
window.removeRequestSet = removeRequestSet;
window.getTrackingData = getTrackingData;
window.resetForm = resetForm;
window.changeLanguage = changeLanguage;
window.updateFormState = updateFormState;

// preparing semantic HTML structure for app
let topLevelFrameString = topLevelFrameBlocks.reduce(
  (renderString, item) => (renderString += renderSemanticBlock(item)),
  '',
);
document.body.insertAdjacentHTML('afterbegin', topLevelFrameString);
renderApp();

function renderApp(lang = window.appState.lang) {
  document.querySelector('HTML').setAttribute('lang', lang);
  renderHeader();
  renderMain();
  renderFooter();
}
