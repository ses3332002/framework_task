/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework/element';
import { UIStrings } from '../../data/variables';
import { LangSelection } from '../LangSelection/LangSelection';

export function Header({ lang = window.appState.lang }) {
  return (
    <header>
      <h1>{UIStrings[lang].headerString}</h1>
      <LangSelection />
    </header>
  );
}
