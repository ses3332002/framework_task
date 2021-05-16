import { topLevelFrameBlocks, appState } from './data/variables';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Main } from './components/Main/Main';
import { changeLanguage, resetForm, addRequestSet, removeRequestSet } from './data/changeAppState';
import { updateRequestedDocuments } from './data/updateRequestedDocuments';
import { getTrackingData } from './data/getTrackingData';
import { renderElement } from './framework/renderElement';
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

function renderApp() {
  renderElement(document.querySelector('header'), Header);
  renderElement(document.querySelector('footer'), Footer);
  renderElement(document.querySelector('main'), Main);
}
