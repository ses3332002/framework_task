export function manageResults(downloadedResults, requestedDocuments) {
  requestedDocuments.forEach((item, index) => {
    if (item.result == 'gotToBeDownloaded') {
      item.result = downloadedResults.shift();
      item.result.requestTime = +new Date();
      localStorage.setItem(item.result.Number, JSON.stringify(item.result));
    }
  });
  window.renderApp();
}
