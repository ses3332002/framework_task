import React, { useState } from 'react';
import TrackingForm from '../TrackingForm';
import Loader from '../Loader';

export default function Main({ lang }) {
  let [loadingState, setLoadingState] = useState(false);

  return (
    <main>
      <TrackingForm lang={lang} setLoadingState={setLoadingState} />
      <Loader lang={lang} loadingState={loadingState} />
    </main>
  );
}
