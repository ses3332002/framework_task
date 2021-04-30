import {
  topLevelFrameBlocks,
  UIStrings,
  requestOptions,
  // apiKey,
  url,
  freshnessTime,
} from './variables.js';

import styles from './style';
const DOMFrameBlocks = [];

function renderSemanticBlock(block) {
  return `<${block}></${block}>`;
}

function renderHeader() {
  DOMFrameBlocks[0].innerHTML = `<h1>${UIStrings.headerString}</h1>`;
}

function renderFooter() {
  DOMFrameBlocks[DOMFrameBlocks.length - 1].innerHTML = `${UIStrings.footerString}`;
}

function getTrackingData(event) {
  event.preventDefault();
  const requestSets = Array.from(document.querySelectorAll(`.${styles.request_set}`));
  const requestedDocuments = [];
  requestSets.forEach(prepareDocuments);

  function prepareDocuments(requestItem) {
    requestedDocuments.push({
      DocumentNumber: requestItem.querySelector('input[name = invoice_number]').value,
      Phone: requestItem.querySelector('input[name = phone_number]').value,
    });
  }

  const requestTemplate = {
    modelName: 'TrackingDocument',
    calledMethod: 'getStatusDocuments',
    methodProperties: {
      Language: 'RU',
    },
  };

  const documentsForRender = [];
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
    renderResult(documentsForRender);
  } else {
    requestTemplate.methodProperties.Documents = documentsForDownload;
    requestOptions.body = JSON.stringify(requestTemplate);

    fetch(url, requestOptions)
      .then(response => {
        return response.json();
      })
      .then(result => {
        manageResults(result.data);
      })
      .catch(err => {
        console.error('there was some error:', err);
      });
  }

  function manageResults(downloadedResults) {
    documentsForRender.forEach((result, index) => {
      if (result == 'gotToBeDownloaded') {
        result = downloadedResults.shift();
        result.requestTime = +new Date();
        localStorage.setItem(result.Number, JSON.stringify(result));
        documentsForRender[index] = result;
      }
    });
    renderResult(documentsForRender);
  }
}

function renderResult(resultsData) {
  const trackingResultFields = Array.from(document.querySelectorAll(`.${styles.tracking_result}`));
  resultsData.forEach((item, index) => {
    trackingResultFields[index].innerHTML = `<h2>${UIStrings.resultString}:</h2>
  <div class=${styles.tracking_result__wrapper}>
    <div class=${styles.tracking_result__caption}>${UIStrings.routeString}:</div>
    <div class=${styles.tracking_result__text}>${item.CitySender}-${item.CityRecipient}</div>
    <div class=${styles.tracking_result__caption}>${UIStrings.weightString}:</div>
    <div class=${styles.tracking_result__text}>${item.DocumentWeight}</div>
    <div class=${styles.tracking_result__caption}>${UIStrings.placesString}:</div>
    <div class=${styles.tracking_result__text}>${item.SeatsAmount}</div>
    <div class=${styles.tracking_result__caption}>${UIStrings.statusString}:</div>
    <div class=${styles.tracking_result__text}>${item.Status}</div>
    <div class=${styles.tracking_result__caption}>${UIStrings.returnString}:</div>
    <div class=${styles.tracking_result__text}>${
      item.PossibilityCreateReturn ? UIStrings.yesString : UIStrings.noString
    }<input type="button" class=${styles.request_action} disabled value="${
      UIStrings.requestString
    }"/></div>
    <div class=${styles.tracking_result__caption}>${UIStrings.redirectString}:</div>
    <div class="${styles.tracking_result__text} ${styles.tracking_result__text - status}">${
      item.PossibilityCreateRedirecting ? UIStrings.yesString : UIStrings.noString
    }<input type="button" class=${styles.request_action} disabled value="${
      UIStrings.requestString
    }"/></div>
  </div>`;
  });
}

window.getTrackingData = getTrackingData;
window.addRequestSet = addRequestSet;
window.removeRequestSet = removeRequestSet;
window.resetApp = resetApp;

function resetApp() {
  const requestSets = Array.from(document.querySelectorAll(`.${styles.request_set}`));
  requestSets.forEach((requestSet, index) => {
    if (index > 0) {
      requestSet.remove();
    }
  });
  if (document.querySelector(`.${styles.tracking_result}`)) {
    document.querySelector(`.${styles.tracking_result}`).innerHTML = '';
  }
  document.forms.request_form.reset();
}

function renderMain() {
  DOMFrameBlocks[1].innerHTML = `
       <div class=${styles.tracking_form}>
      <form name="request_form" autocomplete="off" onsubmit="getTrackingData(event)">
        ${renderRequestSet()}
        <input type="submit" value="${UIStrings.searchButtonString}" class=${
    styles.request_submit
  } />
        <input type="button" value="${UIStrings.clearButtonString}" class=${
    styles.request_submit
  } onclick="resetApp()" />
      </form>
    </div>`;
}

function renderDynamicBlocks() {
  renderHeader();
  renderFooter();
  renderMain();
}

function renderRequestSet() {
  return `<div class=${styles.request_set}>
            <div class=${styles.request_item}>
              <input type="text" name="invoice_number" value="" placeholder=" " required/>
              <label for="invoice_number">${UIStrings.invoiceString}</label>
            </div>
            <div class=${styles.request_item}>
              <input type="text" name="phone_number" value="" pattern="[0-9]{0,10}" placeholder=" "/>
              <label for="phone_number">${UIStrings.phoneString}</label>
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

let topLevelFrameString = topLevelFrameBlocks.reduce(
  (renderString, item) => (renderString += renderSemanticBlock(item)),
  '',
);

function renderApp() {
  document.body.insertAdjacentHTML('afterbegin', topLevelFrameString);
  topLevelFrameBlocks.forEach(item => DOMFrameBlocks.push(document.querySelector(`${item}`)));
  renderDynamicBlocks();
}

renderApp();
