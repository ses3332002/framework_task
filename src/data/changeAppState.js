import { RequestSet } from '../components/RequestSet/RequestSet';
import { requestSetStyles } from '../components/RequestSet/RequestSet';
import { Result } from '../components/Result/Result';

export function changeLanguage(event, lang = window.appState.lang) {
  if (lang == event.target.dataset.lang) {
    return;
  } else {
    window.appState.lang = event.target.dataset.lang;
    window.renderApp();
    document.querySelector(`button[data-lang=${window.appState.lang}]`).focus();
  }
}

export function resetForm(requestedDocuments = window.appState.requestedDocuments) {
  // TODO: change on simple rerender of search form
  const requestSets = Array.from(document.querySelectorAll(`.${requestSetStyles.request_set}`));
  requestSets.forEach((requestSet, index) => {
    if (index > 0) {
      requestSet.remove();
    } else {
      requestSet.querySelector('input[name = invoice_number]').value = '';
      requestSet.querySelector('input[name = phone_number]').value = '';
      requestSet.querySelector(`.${requestSetStyles.tracking_result}`).innerHTML = '';
    }
  });
  requestedDocuments.length = 0;
}

export function addRequestSet(event) {
  event.target.parentNode.parentNode.insertAdjacentHTML('afterend', `${RequestSet()}`);
  document.forms.request_form.oninput();
}

export function removeRequestSet(event) {
  event.target.parentNode.parentNode.remove();
  document.forms.request_form.oninput();
}

// export function renderResults(resultsData = window.appState.documentsForRender) {
//   const trackingResultFields = Array.from(
//     document.querySelectorAll(`.${requestSetStyles.tracking_result}`),
//   );
//   resultsData.forEach((item, index) => {
//     trackingResultFields[index].innerHTML = Result(item);
//   });
// }
