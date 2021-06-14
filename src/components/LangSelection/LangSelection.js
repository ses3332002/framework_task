import React from 'react';
import { UIStrings } from '../../data/variables';

import styles from './lang_selection';

export default function LangSelection({ lang, setLang }) {
  function setupLangButtons(langStrings) {
    return Object.keys(langStrings).map((item, index) => {
      let ariaLabelName = item + 'AriaLabelString';
      return (
        <button
          key={item}
          className={styles.lang_choose__btn}
          data-lang={item}
          aria-label={langStrings[lang][ariaLabelName]}
          onClick={event => changeLanguage(event)}
        ></button>
      );
    });
  }

  return <div className={styles.lang_choose}>{setupLangButtons(UIStrings)}</div>;

  function changeLanguage(event) {
    if (lang === event.target.dataset.lang) {
      return;
    } else {
      setLang(event.target.dataset.lang);
    }
  }
}
