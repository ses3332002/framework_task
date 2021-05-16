import { requestSetStyles } from '../components/RequestSet/RequestSet';
export function updateRequestedDocuments(requestedDocuments = window.appState.requestedDocuments) {
  const requestSets = Array.from(document.querySelectorAll(`.${requestSetStyles.request_set}`));
  requestedDocuments.length = 0;
  requestSets.forEach(prepareDocuments);

  function prepareDocuments(requestItem) {
    requestedDocuments.push({
      DocumentNumber: requestItem.querySelector('input[name = invoice_number]').value,
      Phone: requestItem.querySelector('input[name = phone_number]').value,
    });
  }
}
