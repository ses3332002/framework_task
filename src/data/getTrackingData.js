import { manageResults } from './manageResults';
import { requestOptions, url, freshnessTime } from './variables';
import { Main } from '../components/Main/Main';
import { renderApp } from '../framework/renderApp';

export function getTrackingData({
  event,
  lang = window.appState.lang,
  requestedDocuments = window.appState.requestedDocuments,
  documentsForDownload = window.appState.documentsForDownload,
}) {
  // let lang = window.appState.lang;
  // let requestedDocuments = window.appState.requestedDocuments;
  // let documentsForDownload = window.appState.documentsForDownload;
  event.preventDefault();
  const requestTemplate = {
    modelName: 'TrackingDocument',
    calledMethod: 'getStatusDocuments',
    methodProperties: {
      Language: lang,
    },
  };

  requestedDocuments.forEach(checkLocalStorage);

  if (documentsForDownload.length == 0) {
    renderApp(document.querySelector('main'), Main);
  } else {
    window.appState.isLoading = true;
    renderApp(document.querySelector('main'), Main);
    requestTemplate.methodProperties.Documents = documentsForDownload;
    requestOptions.body = JSON.stringify(requestTemplate);

    fetch(url, requestOptions)
      .then(response => {
        return response.json();
      })
      .then(result => {
        manageResults({ downloadedResults: result.data, requestedDocuments });
      })
      .catch(err => {
        console.error('there was some error:', err);
      });
  }
}

function checkLocalStorage(requestedItem, index) {
  let documentsForDownload = window.appState.documentsForDownload;
  documentsForDownload.length = 0;
  if (
    localStorage.getItem(requestedItem.DocumentNumber) &&
    JSON.parse(localStorage.getItem(requestedItem.DocumentNumber)).requestTime >
      new Date() - freshnessTime
  ) {
    requestedItem.result = JSON.parse(localStorage.getItem(requestedItem.DocumentNumber));
  } else {
    documentsForDownload.push(requestedItem);
    requestedItem.result = 'gotToBeDownloaded';
  }
}
