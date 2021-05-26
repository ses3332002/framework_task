/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework/element';

import { UIStrings } from '../../data/variables';
import { Result } from '../Result/Result';
import styles from './request_set';
export { styles as requestSetStyles };

export function RequestSet({
  DocumentNumber = '',
  Phone = '',
  result = null,
  lang = window.appState.lang,
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
        />
        <label For="invoice_number">{UIStrings[lang].invoiceString}</label>
      </div>
      <div className={styles.request_item}>
        <input
          type="text"
          id="phone_number"
          name="phone_number"
          value={Phone}
          pattern="[0-9]{0,10}"
          placeholder=" "
        />
        <label For="phone_number">{UIStrings[lang].phoneString}</label>
      </div>
      <div className={styles.tracking_result}>
        <Result result={result} />
      </div>
    </div>
  );
}
