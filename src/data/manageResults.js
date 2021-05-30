import { Main } from '../components/Main/Main';
import { renderApp } from '../framework/renderApp';

export function manageResults({ downloadedResults, requestedDocuments }) {
  requestedDocuments.forEach((item, index) => {
    if (item.result == 'gotToBeDownloaded') {
      item.result = downloadedResults.shift();
      item.result.requestTime = +new Date();
      localStorage.setItem(item.result.Number, JSON.stringify(item.result));
    }
  });
  window.appState.isLoading = false;
  window.appState.componentElementToRender = document.querySelector('main');
  window.appState.componentFunctionToRender = Main;
  window.appState.needToBeRendered = true;
}
