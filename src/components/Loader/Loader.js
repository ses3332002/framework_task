/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';
import { UIStrings } from '../../data/variables';
import styles from './loader';

export function Loader({ lang = window.appState.lang }) {
  if (!window.appState.isLoading) {
    return <></>;
  } else {
    return (
      <div className={styles.loader_background}>
        <div class={styles.loader}>
          <p>{UIStrings[lang].loaderString}</p>
          <div class={styles.equalizer}>
            <div class={styles.equalizer__line}></div>
            <div class={styles.equalizer__line}></div>
            <div class={styles.equalizer__line}></div>
            <div class={styles.equalizer__line}></div>
            <div class={styles.equalizer__line}></div>
          </div>
        </div>
      </div>
    );
  }
}
