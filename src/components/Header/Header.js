import React from 'react';
import { UIStrings } from '../../data/variables';
import { LangSelection } from '../LangSelection/LangSelection';

export function Header({ lang, setLang }) {
  return (
    <header>
      <h1>{UIStrings[lang].headerString}</h1>
      <LangSelection lang={lang} setLang={setLang} />
    </header>
  );
}
