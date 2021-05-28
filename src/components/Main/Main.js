/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework/element';
import { TrackingForm } from '../TrackingForm/TrackingForm';
import { Loader } from '../Loader/Loader';

export function Main() {
  return (
    <main>
      <TrackingForm />
      <Loader />
    </main>
  );
}
