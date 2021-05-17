import { appState } from './data/variables';
import { changeLanguage, resetForm, addRequestSet, removeRequestSet } from './data/changeAppState';
import { updateRequestedDocuments } from './data/updateRequestedDocuments';
import { getTrackingData } from './data/getTrackingData';
import { renderApp } from './framework/renderApp';
import { prepareStructure } from './framework/prepareStructure';
import styles from './style/style';

// console.log(process.env.API_KEY);

window.appState = appState;

window.addRequestSet = addRequestSet;
window.removeRequestSet = removeRequestSet;
window.resetForm = resetForm;
window.changeLanguage = changeLanguage;

window.getTrackingData = getTrackingData;
window.updateRequestedDocuments = updateRequestedDocuments;

window.renderApp = renderApp;

window.renderApp();
