/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';

import { UIStrings } from '../../data/variables';
import styles from './result';

export function Result(resultItem) {
  let lang = window.appState.lang;
  if (resultItem) {
    return (
      <>
        <h2>{UIStrings[lang].resultString}:</h2>
        <div className={styles.tracking_result__wrapper}>
          <div className={styles.tracking_result__caption}>{UIStrings[lang].routeString}:</div>
          <div className={styles.tracking_result__text}>
            {resultItem.CitySender}-{resultItem.CityRecipient}
          </div>
          <div className={styles.tracking_result__caption}>{UIStrings[lang].weightString}:</div>
          <div className={styles.tracking_result__text}>{resultItem.DocumentWeight}</div>
          <div className={styles.tracking_result__caption}>{UIStrings[lang].placesString}:</div>
          <div className={styles.tracking_result__text}>{resultItem.SeatsAmount}</div>
          <div className={styles.tracking_result__caption}>{UIStrings[lang].statusString}:</div>
          <div className={styles.tracking_result__text}>{resultItem.Status}</div>
          <div className={styles.tracking_result__caption}>{UIStrings[lang].returnString}:</div>
          <div className={styles.tracking_result__text}>
            {resultItem.PossibilityCreateReturn
              ? UIStrings[lang].yesString
              : UIStrings[lang].noString}
            <input
              type="button"
              className={styles.request_action}
              disabled
              value={UIStrings[lang].requestString}
            />
          </div>
          <div className={styles.tracking_result__caption}>{UIStrings[lang].redirectString}:</div>
          <div className={styles.tracking_result__text}>
            {resultItem.PossibilityCreateRedirecting
              ? UIStrings[lang].yesString
              : UIStrings[lang].noString}
            <input
              type="button"
              className={styles.request_action}
              disabled
              value={UIStrings[lang].requestString}
            />
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}