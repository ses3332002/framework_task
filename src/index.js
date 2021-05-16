import { topLevelFrameBlocks, appState } from './data/variables';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Main } from './components/Main/Main';
import { changeLanguage, resetForm, addRequestSet, removeRequestSet } from './data/changeAppState';
import { updateRequestedDocuments } from './data/updateRequestedDocuments';
import { getTrackingData } from './data/getTrackingData';
import styles from './style/style';

// console.log(process.env.API_KEY);

function renderSemanticBlock(block) {
  return `<${block}></${block}>`;
}

window.appState = appState;

window.addRequestSet = addRequestSet;
window.removeRequestSet = removeRequestSet;
window.resetForm = resetForm;
window.changeLanguage = changeLanguage;

window.getTrackingData = getTrackingData;
window.updateRequestedDocuments = updateRequestedDocuments;

window.renderApp = renderApp;

let topLevelFrameString = topLevelFrameBlocks.reduce(
  (renderString, item) => (renderString += renderSemanticBlock(item)),
  '',
);
document.body.insertAdjacentHTML('afterbegin', topLevelFrameString);
renderApp();

function renderApp(lang = window.appState.lang) {
  document.querySelector('HTML').setAttribute('lang', lang);
  document.querySelector('header').innerHTML = Header();
  document.querySelector('footer').innerHTML = Footer();
  document.querySelector('main').innerHTML = Main();
}
