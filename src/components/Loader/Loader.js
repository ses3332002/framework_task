import React from 'react';
import { UIStrings } from '../../data/variables';
import styles from './loader';

export function Loader({ lang, loadingState }) {
  if (!loadingState) {
    return <></>;
  } else {
    return (
      <div className={styles.loader_background}>
        <div className={styles.loader}>
          <p>{UIStrings[lang].loaderString}</p>
          <div className={styles.equalizer}>
            <div className={styles.equalizer__line}></div>
            <div className={styles.equalizer__line}></div>
            <div className={styles.equalizer__line}></div>
            <div className={styles.equalizer__line}></div>
            <div className={styles.equalizer__line}></div>
          </div>
        </div>
      </div>
    );
  }
}
