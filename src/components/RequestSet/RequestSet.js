import React from 'react';
import { Result } from '../Result/Result';
import { UIStrings } from '../../data/variables';
import styles from './request_set';

export function RequestSet({
  DocumentNumber,
  Phone,
  result,
  lang,
  requestSetIndex,
  setRequestedDocuments,
  requestedDocuments,
}) {
  return (
    <div className={styles.request_set}>
      <div className={styles.request_item}>
        <input
          type="text"
          id="invoice_number"
          name="invoice_number"
          value={DocumentNumber}
          placeholder=" "
          required
          onChange={event =>
            setRequestedDocuments(requestedDocuments => {
              return [
                ...requestedDocuments.slice(0, requestSetIndex),
                {
                  DocumentNumber: event.target.value,
                  Phone: Phone,
                  result: result,
                },
                ...requestedDocuments.slice(requestSetIndex + 1),
              ];
            })
          }
        />
        <label htmlFor="invoice_number">{UIStrings[lang].invoiceString}</label>
      </div>
      <div className={styles.request_item}>
        <input
          type="text"
          id="phone_number"
          name="phone_number"
          value={Phone}
          pattern="[0-9]{0,10}"
          placeholder=" "
          onChange={event =>
            setRequestedDocuments(requestedDocuments => {
              return [
                ...requestedDocuments.slice(0, requestSetIndex),
                {
                  DocumentNumber: DocumentNumber,
                  Phone: event.target.value,
                  result: result,
                },
                ...requestedDocuments.slice(requestSetIndex + 1),
              ];
            })
          }
        />
        <label htmlFor="phone_number">{UIStrings[lang].phoneString}</label>
      </div>
      <div className={styles.tracking_result}>
        <Result lang={lang} result={result} />
      </div>
    </div>
  );
}
