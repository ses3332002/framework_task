import { checkLocalStorage } from './checkLocalStorage';
import { manageResults } from './manageResults';
import { requestOptions, url } from './variables';
import { Main } from '../components/Main/Main';
import { renderApp } from '../framework/renderApp';

export function getTrackingData(event) {
  let lang = window.appState.lang;
  let requestedDocuments = window.appState.requestedDocuments;
  let documentsForDownload = window.appState.documentsForDownload;
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
    requestTemplate.methodProperties.Documents = documentsForDownload;
    requestOptions.body = JSON.stringify(requestTemplate);

    fetch(url, requestOptions)
      .then(response => {
        return response.json();
      })
      .then(result => {
        manageResults(result.data, requestedDocuments);
      })
      .catch(err => {
        console.error('there was some error:', err);
      });
  }
}
