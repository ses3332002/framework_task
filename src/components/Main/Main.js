/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework/element';
import { TrackingForm } from '../TrackingForm/TrackingForm';
import { Loader } from '../Loader/Loader';
import { useEffect, useState } from '../../framework/hooks.js';

export function Main({ lang }) {
  let [loadingState, setLoadingState] = useState(false);

  return (
    <main>
      <TrackingForm lang={lang} setLoadingState={setLoadingState} />
      <Loader lang={lang} loadingState={loadingState} />
    </main>
  );
}
