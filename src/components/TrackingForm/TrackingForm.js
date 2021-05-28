/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework/element';
import { renderApp } from '../../framework/renderApp';
import { RequestSet, requestSetStyles } from '../RequestSet/RequestSet';
import { UIStrings } from '../../data/variables';
import { getTrackingData } from '../../data/getTrackingData';
import { Main } from '../Main/Main';

import styles from './tracking_form';

export function TrackingForm({ lang = window.appState.lang }) {
  return (
    <div className={styles.tracking_form}>
      <form
        name="request_form"
        autocomplete="off"
        onSubmit={event => getTrackingData({ event })}
        onInput={updateRequestedDocuments}
      >
        {renderRequestSets({})}
        <div className={styles.request_set_buttons}>
          <input
            type="button"
            className={styles.request_add_set}
            onClick={event => addRequestSet(event)}
            value="+"
          />
          <input
            type="button"
            className={styles.request_remove_set}
            onClick={event => removeRequestSet(event)}
            value="-"
            disabled={!(window.appState.requestedDocuments.length > 1)}
          />
        </div>
        <input
          type="submit"
          value={UIStrings[lang].searchButtonString}
          className={styles.request_submit}
        />
        <input
          type="button"
          value={UIStrings[lang].clearButtonString}
          className={styles.request_submit}
          onClick={resetForm}
        />
      </form>
    </div>
  );

  function renderRequestSets({ requestedDocuments = window.appState.requestedDocuments }) {
    if (requestedDocuments.length == 0) {
      requestedDocuments.push({
        DocumentNumber: '',
        Phone: '',
      });
      return <RequestSet />;
    } else {
      return requestedDocuments.map(item => {
        return (
          <RequestSet
            DocumentNumber={item.DocumentNumber}
            Phone={item.Phone}
            result={item.result}
          />
        );
      });
    }
  }
}

function resetForm() {
  let requestedDocuments = window.appState.requestedDocuments;
  requestedDocuments.length = 0;
  renderApp(document.querySelector('main'), Main);
}

function addRequestSet(event) {
  window.appState.requestedDocuments.push({
    DocumentNumber: '',
    Phone: '',
  });
  renderApp(document.querySelector('main'), Main);
}

function removeRequestSet(event) {
  window.appState.requestedDocuments.pop();
  renderApp(document.querySelector('main'), Main);
}

function updateRequestedDocuments() {
  let requestedDocuments = window.appState.requestedDocuments;
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
