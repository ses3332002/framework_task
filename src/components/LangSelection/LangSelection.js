import { UIStrings } from '../../data/variables';
import styles from './lang_selection';

export function LangSelection(lang = window.appState.lang) {
  return `<div class=${styles.lang_choose}>
    <button class=${styles.lang_choose__btn} aria-label="${UIStrings[lang].ariaLabelRuString}" data-lang="ru" onclick="changeLanguage(event)"></button>
    <button class=${styles.lang_choose__btn} aria-label="${UIStrings[lang].ariaLabelUaString}" data-lang="uk" onclick="changeLanguage(event)"></button>
  </div>`;
}
