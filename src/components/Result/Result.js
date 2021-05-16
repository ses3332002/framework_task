import { UIStrings } from '../../data/variables';
import styles from './result';

export function Result(resultItem, lang = window.appState.lang) {
  if (resultItem.Status) {
    return `<h2>${UIStrings[lang].resultString}:</h2>
    <div class=${styles.tracking_result__wrapper}>
    <div class=${styles.tracking_result__caption}>${UIStrings[lang].routeString}:</div>
    <div class=${styles.tracking_result__text}>${resultItem.CitySender}-${
      resultItem.CityRecipient
    }</div>
    <div class=${styles.tracking_result__caption}>${UIStrings[lang].weightString}:</div>
    <div class=${styles.tracking_result__text}>${resultItem.DocumentWeight}</div>
    <div class=${styles.tracking_result__caption}>${UIStrings[lang].placesString}:</div>
    <div class=${styles.tracking_result__text}>${resultItem.SeatsAmount}</div>
    <div class=${styles.tracking_result__caption}>${UIStrings[lang].statusString}:</div>
    <div class=${styles.tracking_result__text}>${resultItem.Status}</div>
    <div class=${styles.tracking_result__caption}>${UIStrings[lang].returnString}:</div>
    <div class=${styles.tracking_result__text}>${
      resultItem.PossibilityCreateReturn ? UIStrings[lang].yesString : UIStrings[lang].noString
    }<input type="button" class=${styles.request_action} disabled value="${
      UIStrings[lang].requestString
    }"/></div>
    <div class=${styles.tracking_result__caption}>${UIStrings[lang].redirectString}:</div>
    <div class=${styles.tracking_result__text}>${
      resultItem.PossibilityCreateRedirecting ? UIStrings[lang].yesString : UIStrings[lang].noString
    }<input type="button" class=${styles.request_action} disabled value="${
      UIStrings[lang].requestString
    }"/></div>
    </div>`;
  } else {
    return '';
  }
}
