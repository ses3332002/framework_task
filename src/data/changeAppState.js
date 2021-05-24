import { Main } from '../components/Main/Main';

export function changeLanguage(event, lang = window.appState.lang) {
  if (lang == event.target.dataset.lang) {
    return;
  } else {
    window.appState.lang = event.target.dataset.lang;
    document.querySelector('HTML').setAttribute('lang', window.appState.lang);
    window.renderApp();
    document.querySelector(`button[data-lang=${window.appState.lang}]`).focus();
  }
}

export function resetForm() {
  let requestedDocuments = window.appState.requestedDocuments;
  requestedDocuments.length = 0;
  window.renderApp(document.querySelector('main'), Main);
}

export function addRequestSet(event) {
  window.appState.requestedDocuments.push({
    DocumentNumber: '',
    Phone: '',
  });
  window.renderApp(document.querySelector('main'), Main);
}

export function removeRequestSet(event) {
  window.appState.requestedDocuments.pop();
  window.renderApp(document.querySelector('main'), Main);
}
