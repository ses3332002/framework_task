import React, { useEffect, useState } from 'react';
import { TrackingForm } from '../TrackingForm/TrackingForm';
import { Loader } from '../Loader/Loader';

export function Main({ lang }) {
  let [loadingState, setLoadingState] = useState(false);

  return (
    <main>
      <TrackingForm lang={lang} setLoadingState={setLoadingState} />
      <Loader lang={lang} loadingState={loadingState} />
    </main>
  );
}
