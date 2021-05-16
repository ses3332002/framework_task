import { UIStrings, appVersion } from '../../data/variables';

export function Footer(lang = window.appState.lang) {
  return `${UIStrings[lang].footerString} ${appVersion}`;
}
