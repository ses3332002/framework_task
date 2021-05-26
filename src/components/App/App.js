/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Main } from '../Main/Main';
import styles from './style/app';

export function App({}) {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
