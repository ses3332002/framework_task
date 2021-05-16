import { UIStrings } from '../../data/variables';
import styles from './tracking_form';
import { RequestSet } from '../RequestSet/RequestSet';

export function TrackingForm(lang = window.appState.lang) {
  return `<div class=${styles.tracking_form}>
    <form name="request_form" autocomplete="off" onsubmit="getTrackingData(event)" oninput="updateRequestedDocuments()">
    ${renderRequestSets()}
      <input type="submit" value="${UIStrings[lang].searchButtonString}" class=${
    styles.request_submit
  } />
      <input type="button" value="${UIStrings[lang].clearButtonString}" class=${
    styles.request_submit
  } onclick="resetForm()" />
    </form>
  </div>`;

  function renderRequestSets(requestedDocuments = window.appState.requestedDocuments) {
    if (requestedDocuments.length == 0) {
      return RequestSet();
    } else {
      return requestedDocuments
        .map(item => {
          return RequestSet(item.DocumentNumber, item.Phone, item.result);
        })
        .join('');
    }
  }
}
