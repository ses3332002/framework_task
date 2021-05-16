import { freshnessTime } from './variables';

export function checkLocalStorage(requestedItem, index) {
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
