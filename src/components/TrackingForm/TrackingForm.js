/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';

import { UIStrings } from '../../data/variables';
import styles from './tracking_form';
import { RequestSet } from '../RequestSet/RequestSet';

export function TrackingForm({ lang = window.appState.lang }) {
  return (
    <div className={styles.tracking_form}>
      <form
        name="request_form"
        autocomplete="off"
        onSubmit={e => window.getTrackingData(e)}
        onInput={window.updateRequestedDocuments}
      >
        {renderRequestSets({})}
        <div className={styles.request_set_buttons}>
          <input
            type="button"
            className={styles.request_add_set}
            onClick={e => window.addRequestSet(e)}
            value="+"
          />
          <input
            type="button"
            className={styles.request_remove_set}
            onClick={e => window.removeRequestSet(e)}
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
          onClick={window.resetForm}
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
