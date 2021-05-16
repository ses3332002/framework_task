import { TrackingForm } from '../TrackingForm/TrackingForm';

export function Main(documentsForRender = window.appState.documentsForRender) {
  return `${TrackingForm()}`;
}
