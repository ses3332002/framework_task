import { TrackingForm } from '../TrackingForm/TrackingForm';
import { renderResults } from '../../data/changeAppState';

export function Main(documentsForRender = window.appState.documentsForRender) {
  return `${TrackingForm()}`;
}
