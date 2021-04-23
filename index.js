import {
  topLevelFrameBlocks,
  UIStrings,
  topLevelStrings,
  requestOptions,
  // apiKey,
  url,
} from './variables.js';

const DOMFrameBlocks = [];

function renderSemanticBlock(block) {
  return `<${block}></${block}>`;
}

function renderHeader() {
  DOMFrameBlocks[0].innerHTML = `<h1>${topLevelStrings.headerString}</h1>`;
}

function renderFooter() {
  DOMFrameBlocks[DOMFrameBlocks.length - 1].innerHTML = `${topLevelStrings.footerString}`;
}

function getTrackingData(event) {
  event.preventDefault();
  const requests = Array.from(document.querySelectorAll('.request_set'));
  const requestDocuments = [];
  requests.forEach(prepareDocument);

  function prepareDocument(requestItem) {
    requestDocuments.push({
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
  requestTemplate.methodProperties.Documents = requestDocuments;
  requestOptions.body = JSON.stringify(requestTemplate);

  fetch(url, requestOptions)
    .then(response => {
      return response.json();
    })
    .then(result => {
      renderResult(result.data);
    });
}

function renderResult(resultData) {
  const trackingResultFields = Array.from(document.querySelectorAll('.tracking_result'));
  resultData.forEach((item, index) => {
    trackingResultFields[index].innerHTML = `<h2>${topLevelStrings.resultString}:</h2>
  <div class="tracking_result__wrapper">
    <div class="tracking-result__caption">${UIStrings.routeString}:</div>
    <div class="tracking-result__text tracking-result__text-route">${item.CitySender}-${
      item.CityRecipient
    }</div>
    <div class="tracking-result__caption">${UIStrings.weightString}:</div>
    <div class="tracking-result__text tracking-result__text-weight">${item.DocumentWeight}</div>
    <div class="tracking-result__caption">${UIStrings.placesString}:</div>
    <div class="tracking-result__text tracking-result__text-weight">${item.SeatsAmount}</div>
    <div class="tracking-result__caption">${UIStrings.statusString}:</div>
    <div class="tracking-result__text tracking-result__text-status">${item.Status}</div>
    <div class="tracking-result__caption">${UIStrings.returnString}:</div>
    <div class="tracking-result__text tracking-result__text-status">${
      item.PossibilityCreateReturn ? UIStrings.yesString : UIStrings.noString
    }<input type="button" class="request_action" disabled value="${UIStrings.requestString}"/></div>
    <div class="tracking-result__caption">${UIStrings.redirectString}:</div>
    <div class="tracking-result__text tracking-result__text-status">${
      item.PossibilityCreateRedirecting ? UIStrings.yesString : UIStrings.noString
    }<input type="button" class="request_action" disabled value="${UIStrings.requestString}"/></div>
  </div>`;
  });
}

window.getTrackingData = getTrackingData;
window.addRequestSet = addRequestSet;
window.removeRequestSet = removeRequestSet;

function renderMain() {
  DOMFrameBlocks[1].innerHTML = `
    <div class="tracking_form">
      <form name="request_form" autocomplete="off" onsubmit="getTrackingData(event)">
        ${renderRequestSet()}
        <input type="submit" value="${UIStrings.buttonString}" class="request_submit" />
      </form>
    </div>`;
}

function renderStaticBlocks() {
  renderHeader();
  renderFooter();
}

function renderDynamicBlocks() {
  renderMain();
}

function renderRequestSet() {
  return `<div class="request_set">
            <div class="request_item">
              <input type="text" name="invoice_number" value="" placeholder="" required/>
              <label for="invoice_number">${UIStrings.invoiceString}</label>
            </div>
            <div class="request_item">
              <input type="text" name="phone_number" value="" pattern="[0-9]{0,10}" placeholder=""/>
              <label for="phone_number">${UIStrings.phoneString}</label>
            </div>
            <input type="button" class="request_add_set" onclick="addRequestSet(event)" value="+"/>
            <input type="button" class="request_remove_set" onclick="removeRequestSet(event)" value="-"/>
             <div class="tracking_result"></div>
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
  renderStaticBlocks();
  renderDynamicBlocks();
}

renderApp();
