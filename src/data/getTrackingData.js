import { checkLocalStorage } from './checkLocalStorage';
// import { renderResults } from './changeAppState';
import { manageResults } from './manageResults';
import { requestOptions, url } from './variables';

export function getTrackingData(
  event,
  lang = window.appState.lang,
  requestedDocuments = window.appState.requestedDocuments,
  documentsForDownload = window.appState.documentsForDownload,
) {
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
    window.renderApp();
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
