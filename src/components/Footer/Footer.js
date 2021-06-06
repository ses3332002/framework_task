/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework/element';
import { UIStrings, appVersion } from '../../data/variables';

export function Footer({ lang }) {
  return (
    <footer>
      {UIStrings[lang].footerString} {appVersion}
    </footer>
  );
}
