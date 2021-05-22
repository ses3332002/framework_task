/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';
import { UIStrings } from '../../data/variables';
import { LangSelection } from '../LangSelection/LangSelection';

export function Header() {
  let lang = window.appState.lang;
  return (
    <>
      <h1>{UIStrings[lang].headerString}</h1>
      <LangSelection />
    </>
  );
}