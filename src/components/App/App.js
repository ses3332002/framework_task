import React, { useState, useEffect } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Main } from '../Main/Main';

import styles from './style/app';

export function App() {
  let [lang, setLang] = useState('ru');

  useEffect(() => {
    document.querySelector('HTML').setAttribute('lang', lang);
  }, [lang]);

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <Main lang={lang} />
      <Footer lang={lang} />
    </>
  );
}
