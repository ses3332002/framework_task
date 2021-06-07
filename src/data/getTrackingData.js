import { freshnessTime } from '../data/variables';

export function getTrackingData({
  event,
  requestedDocuments,
  setRequestedDocuments,
  documentsForDownload,
  setDocumentsForDownload,
  setRequestCompleted,
}) {
  event.preventDefault();
  requestedDocuments.forEach(checkLocalStorage);
  console.log('done preparing data');

  function checkLocalStorage(requestedItem, index) {
    console.log('checking LS');
    if (
      localStorage.getItem(requestedItem.DocumentNumber) &&
      JSON.parse(localStorage.getItem(requestedItem.DocumentNumber)).requestTime >
        new Date() - freshnessTime
    ) {
      setRequestedDocuments(requestedDocuments => [
        ...requestedDocuments.slice(0, index),
        {
          DocumentNumber: requestedItem.DocumentNumber,
          Phone: requestedItem.Phone,
          result: JSON.parse(localStorage.getItem(requestedItem.DocumentNumber)),
        },
        ...requestedDocuments.slice(index + 1),
      ]);
    } else {
      setDocumentsForDownload(documentsForDownload => [...documentsForDownload, requestedItem]);
      setRequestedDocuments(requestedDocuments => [
        ...requestedDocuments.slice(0, index),
        {
          DocumentNumber: requestedItem.DocumentNumber,
          Phone: requestedItem.Phone,
          result: 'gotToBeDownloaded',
        },
        ...requestedDocuments.slice(index + 1),
      ]);
      console.log('setRequestCompleted(false)');
      setRequestCompleted(false);
    }
  }
}
