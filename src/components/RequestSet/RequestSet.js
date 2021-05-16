import { UIStrings } from '../../data/variables';
import { Result } from '../Result/Result';
import styles from './request_set';
export { styles as requestSetStyles };

export function RequestSet(
  invoiceNumber = '',
  phoneNumber = '',
  result = null,
  lang = window.appState.lang,
) {
  return `<div class=${styles.request_set}>
            <div class=${styles.request_item}>
              <input type="text" id="invoice_number" name="invoice_number" value="${invoiceNumber}" placeholder=" " required/>
              <label for="invoice_number">${UIStrings[lang].invoiceString}</label>
            </div>
            <div class=${styles.request_item}>
              <input type="text" id="phone_number" name="phone_number" value="${phoneNumber}" pattern="[0-9]{0,10}" placeholder=" "/>
              <label for="phone_number">${UIStrings[lang].phoneString}</label>
            </div>
            <div class=${styles.request_set_buttons}>
              <input type="button" class=${
                styles.request_add_set
              } onclick="addRequestSet(event)" value="+"/>
              <input type="button" class=${
                styles.request_remove_set
              } onclick="removeRequestSet(event)" value="-"/>
            </div>
            <div class=${styles.tracking_result}>
            ${Result(result)}
            </div>
          </div>`;
}
