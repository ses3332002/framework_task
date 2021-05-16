// import { renderResults } from './changeAppState';

export function manageResults(downloadedResults, requestedDocuments) {
  // let requestedDocuments = window.appState.requestedDocuments;
  requestedDocuments.forEach((item, index) => {
    if (item.result == 'gotToBeDownloaded') {
      item.result = downloadedResults.shift();
      item.result.requestTime = +new Date();
      localStorage.setItem(item.result.Number, JSON.stringify(item.result));
      // requestedDocuments[index] = item.result;
    }
  });
  // renderResults(documentsForRender);
  window.renderApp();
}
