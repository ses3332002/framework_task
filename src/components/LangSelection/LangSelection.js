/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';
import { UIStrings } from '../../data/variables';
import styles from './lang_selection';

export function LangSelection() {
  let lang = window.appState.lang;

  function setupLangButtons(langStrings) {
    return Object.keys(langStrings).map((item, index) => {
      let ariaLabelName = item + 'AriaLabelString';
      return (
        <button
          className={styles.lang_choose__btn}
          data-lang={item}
          aria-label={langStrings[lang][ariaLabelName]}
          onClick={e => window.changeLanguage(e)}
        ></button>
      );
    });
  }

  return <div className={styles.lang_choose}>{setupLangButtons(UIStrings)}</div>;
}
