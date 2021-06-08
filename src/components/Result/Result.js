import React from 'react';

import { UIStrings } from '../../data/variables';
import styles from './result';

export function Result({ result, lang }) {
  if (result) {
    if (result.StatusCode == '3') {
      return (
        <>
          <h2>{UIStrings[lang].resultString}:</h2>
          <div className={styles.tracking_result__wrapper}>
            <div className={styles.tracking_result__caption}>{UIStrings[lang].statusString}:</div>
            <div className={styles.tracking_result__text}>{result.Status}</div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <h2>{UIStrings[lang].resultString}:</h2>
          <div className={styles.tracking_result__wrapper}>
            <div className={styles.tracking_result__caption}>{UIStrings[lang].routeString}:</div>
            <div className={styles.tracking_result__text}>
              {result.CitySender}-{result.CityRecipient}
            </div>
            <div className={styles.tracking_result__caption}>{UIStrings[lang].weightString}:</div>
            <div className={styles.tracking_result__text}>{result.DocumentWeight}</div>
            <div className={styles.tracking_result__caption}>{UIStrings[lang].placesString}:</div>
            <div className={styles.tracking_result__text}>{result.SeatsAmount}</div>
            <div className={styles.tracking_result__caption}>{UIStrings[lang].statusString}:</div>
            <div className={styles.tracking_result__text}>{result.Status}</div>
            <div className={styles.tracking_result__caption}>{UIStrings[lang].returnString}:</div>
            <div className={styles.tracking_result__text}>
              {result.PossibilityCreateReturn
                ? UIStrings[lang].yesString
                : UIStrings[lang].noString}
              <input
                type="button"
                className={styles.request_action}
                disabled={!result.PossibilityCreateReturn}
                value={UIStrings[lang].requestString}
              />
            </div>
            <div className={styles.tracking_result__caption}>{UIStrings[lang].redirectString}:</div>
            <div className={styles.tracking_result__text}>
              {result.PossibilityCreateRedirecting
                ? UIStrings[lang].yesString
                : UIStrings[lang].noString}
              <input
                type="button"
                className={styles.request_action}
                disabled={!result.PossibilityCreateRedirecting}
                value={UIStrings[lang].requestString}
              />
            </div>
          </div>
        </>
      );
    }
  } else {
    return <></>;
  }
}
