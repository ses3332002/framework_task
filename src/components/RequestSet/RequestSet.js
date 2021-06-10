/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework/element';
// import { updateRequestedDocuments } from '../TrackingForm/TrackingForm';
import { useEffect, useState } from '../../framework/hooks.js';

import { UIStrings } from '../../data/variables';
import { Result } from '../Result/Result';
import styles from './request_set';
export { styles as requestSetStyles };

export function RequestSet({
  DocumentNumber,
  Phone,
  result,
  lang,
  requestSetIndex,
  setRequestedDocuments,
  requestedDocuments,
}) {
  let [request, setRequest] = useState({ DocumentNumber, Phone, result });

  useEffect(() => {
    setRequestedDocuments(requestedDocuments => {
      return [
        ...requestedDocuments.slice(0, requestSetIndex),
        {
          DocumentNumber: request.DocumentNumber,
          Phone: request.Phone,
          result: request.result,
        },
        ...requestedDocuments.slice(requestSetIndex + 1),
      ];
    });
  }, [request]);

  return (
    <div className={styles.request_set}>
      <div className={styles.request_item}>
        <input
          type="text"
          id="invoice_number"
          name="invoice_number"
          value={request.DocumentNumber}
          placeholder=" "
          required
          onChange={event =>
            setRequest(request => ({ ...request, DocumentNumber: event.target.value }))
          }
        />
        <label For="invoice_number">{UIStrings[lang].invoiceString}</label>
      </div>
      <div className={styles.request_item}>
        <input
          type="text"
          id="phone_number"
          name="phone_number"
          value={request.Phone}
          pattern="[0-9]{0,10}"
          placeholder=" "
          onChange={event => setRequest(request => ({ ...request, Phone: event.target.value }))}
        />
        <label For="phone_number">{UIStrings[lang].phoneString}</label>
      </div>
      <div className={styles.tracking_result}>
        <Result lang={lang} result={result} />
      </div>
    </div>
  );
}
