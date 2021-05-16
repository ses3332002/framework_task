import { UIStrings } from '../../data/variables';
import { LangSelection } from '../LangSelection/LangSelection';

export function Header(lang = window.appState.lang) {
  return `<h1>${UIStrings[lang].headerString}</h1>
  ${LangSelection()}`;
}
