import { freshnessTime } from '../data/variables';

export function getTrackingData({
  event,
  requestedDocuments,
  setRequestedDocuments,
  setDocumentsForDownload,
}) {
  event.preventDefault();
  checkLocalStorage(requestedDocuments);

  function checkLocalStorage(requestedItem) {
    if (
      localStorage.getItem(requestedItem.DocumentNumber) &&
      JSON.parse(localStorage.getItem(requestedItem.DocumentNumber)).requestTime >
        new Date() - freshnessTime
    ) {
      setRequestedDocuments(requestedDocuments => ({
        ...requestedDocuments,
        result: JSON.parse(localStorage.getItem(requestedItem.DocumentNumber)),
      }));
    } else {
      setDocumentsForDownload(requestedItem);
      setRequestedDocuments(requestedDocuments => ({
        ...requestedDocuments,
        result: 'gotToBeDownloaded',
      }));
    }
  }
}
