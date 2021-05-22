/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';

import { UIStrings } from '../../data/variables';
import styles from './tracking_form';
import { RequestSet } from '../RequestSet/RequestSet';

export function TrackingForm() {
  let lang = window.appState.lang;
  return (
    <div className={styles.tracking_form}>
      <form
        name="request_form"
        autocomplete="off"
        onSubmit={e => window.getTrackingData(e)}
        onInput={window.updateRequestedDocuments}
      >
        {renderRequestSets()}
        <input
          type="submit"
          value={UIStrings[lang].searchButtonString}
          className={styles.request_submit}
        />
        <input
          type="button"
          value={UIStrings[lang].clearButtonString}
          className={styles.request_submit}
          onClick={window.resetForm}
        />
      </form>
    </div>
  );

  function renderRequestSets() {
    let requestedDocuments = window.appState.requestedDocuments;
    if (requestedDocuments.length == 0) {
      return RequestSet();
    } else {
      return requestedDocuments.map(item => {
        return RequestSet(null, item.DocumentNumber, item.Phone, item.result);
      });
    }
  }
}
