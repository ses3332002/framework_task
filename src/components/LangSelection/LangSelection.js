/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework/element';
import { renderApp } from '../../framework/renderApp';
import { UIStrings } from '../../data/variables';
import { App } from '../App/App';

import styles from './lang_selection';

export function LangSelection({ lang = window.appState.lang }) {
  function setupLangButtons(langStrings) {
    return Object.keys(langStrings).map((item, index) => {
      let ariaLabelName = item + 'AriaLabelString';
      return (
        <button
          className={styles.lang_choose__btn}
          data-lang={item}
          aria-label={langStrings[lang][ariaLabelName]}
          onClick={event => changeLanguage({ event })}
        ></button>
      );
    });
  }

  return <div className={styles.lang_choose}>{setupLangButtons(UIStrings)}</div>;
}

function changeLanguage({ event, lang = window.appState.lang }) {
  if (lang == event.target.dataset.lang) {
    return;
  } else {
    window.appState.lang = event.target.dataset.lang;
    document.querySelector('HTML').setAttribute('lang', window.appState.lang);
    window.appState.componentElementToRender = document.querySelector('#app');
    window.appState.componentFunctionToRender = App;
    window.appState.needToBeRendered = true;
    // TODO: fix broken focusing
    // document.querySelector(`button[data-lang=${window.appState.lang}]`).focus();
  }
}
