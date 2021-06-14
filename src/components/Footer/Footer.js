import React from 'react';
import { UIStrings, appVersion } from '../../data/variables';

export default function Footer({ lang }) {
  return (
    <footer>
      {UIStrings[lang].footerString} {appVersion}
    </footer>
  );
}
