/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';

import { UIStrings } from '../../data/variables';
import { Result } from '../Result/Result';
import styles from './request_set';
export { styles as requestSetStyles };

export function RequestSet(event, invoiceNumber = '', phoneNumber = '', result = null) {
  let lang = window.appState.lang;
  return (
    <div className={styles.request_set}>
      <div className={styles.request_item}>
        <input
          type="text"
          id="invoice_number"
          name="invoice_number"
          value={invoiceNumber}
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
          value={phoneNumber}
          pattern="[0-9]{0,10}"
          placeholder=" "
        />
        <label For="phone_number">{UIStrings[lang].phoneString}</label>
      </div>
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
        />
      </div>
      <div className={styles.tracking_result}>{Result(result)}</div>
    </div>
  );
}
