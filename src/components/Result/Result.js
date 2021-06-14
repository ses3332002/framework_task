import React, { useState, useEffect } from 'react';
import ReturningOrder from '../ReturningOrder';
import { UIStrings, requestOptions, url } from '../../data/variables';
import styles from './result';

export default function Result({ result, lang }) {
  let [returning, setReturning] = useState(null);
  useEffect(() => {
    setReturning(null);
  }, [result]);

  const returnCheckingTemplate = {
    apiKey: process.env.API_KEY,
    modelName: 'AdditionalService',
    calledMethod: 'CheckPossibilityCreateReturn',
    methodProperties: {},
  };

  function checkReturning(Number) {
    returnCheckingTemplate.methodProperties.Number = Number;
    requestOptions.body = JSON.stringify(returnCheckingTemplate);
    fetch(url, requestOptions)
      .then(response => {
        return response.json();
      })
      .then(result => {
        if (!result.success) {
          setReturning({ info: result.errors[0], returnAbility: false });
        } else {
          setReturning({ info: result.data.Ref, returnAbility: true });
        }
      })
      .catch(err => {
        console.error('there was some error:', err);
      });
  }

  if (result) {
    if (result.StatusCode === '3') {
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
          </div>
          <div className={styles.tracking_result__wrapper}>
            <div className={styles.tracking_result__caption}>{UIStrings[lang].weightString}:</div>
            <div className={styles.tracking_result__text}>{result.DocumentWeight}</div>
          </div>
          <div className={styles.tracking_result__wrapper}>
            <div className={styles.tracking_result__caption}>{UIStrings[lang].placesString}:</div>
            <div className={styles.tracking_result__text}>{result.SeatsAmount}</div>
          </div>
          <div className={styles.tracking_result__wrapper}>
            <div className={styles.tracking_result__caption}>{UIStrings[lang].statusString}:</div>
            <div className={styles.tracking_result__text}>{result.Status}</div>
          </div>
          <div className={styles.tracking_result__wrapper}>
            <div className={styles.tracking_result__caption}>{UIStrings[lang].returnString}:</div>
            <div className={styles.tracking_result__text}>
              {result.PossibilityCreateReturn
                ? UIStrings[lang].yesString
                : UIStrings[lang].noString}
              <input
                type="button"
                className={styles.request_action}
                disabled={!result.PossibilityCreateReturn}
                onClick={event => checkReturning(result.Number)}
                value={UIStrings[lang].requestString}
              />
            </div>
          </div>
          <ReturningOrder returning={returning} lang={lang} number={result.Number} />
          <div className={styles.tracking_result__wrapper}>
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
    return null;
  }
}
