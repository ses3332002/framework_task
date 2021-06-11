import React from 'react';
import { UIStrings } from '../../data/variables';
import styles from './return_order';

export function ReturnOrder({ returning, lang }) {
  if (!returning) {
    return null;
  } else {
    return (
      <div className={styles.return_order}>
        <span className={styles.return_order_info}>{returning.info}</span>
        <input
          type="button"
          className={styles.request_action}
          disabled={!returning.returnAbility}
          value={UIStrings[lang].returnOrderString}
        />
      </div>
    );
  }
}
