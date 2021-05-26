import { Main } from '../components/Main/Main';
import { renderApp } from '../framework/renderApp';

export function manageResults(downloadedResults, requestedDocuments) {
  requestedDocuments.forEach((item, index) => {
    if (item.result == 'gotToBeDownloaded') {
      item.result = downloadedResults.shift();
      item.result.requestTime = +new Date();
      localStorage.setItem(item.result.Number, JSON.stringify(item.result));
    }
  });
  renderApp(document.querySelector('main'), Main);
}
