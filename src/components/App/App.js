import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Main from '../Main';

import styles from './style/app';

export default function App() {
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
