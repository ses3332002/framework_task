/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';
import { UIStrings, appVersion } from '../../data/variables';

export function Footer() {
  let lang = window.appState.lang;
  return (
    <>
      {UIStrings[lang].footerString} {appVersion}
    </>
  );
}
