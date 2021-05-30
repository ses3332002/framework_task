import { appState } from './data/variables';
import { renderApp } from './framework/renderApp';
import { App } from './components/App/App';

// console.log(process.env.API_KEY);

window.appState = appState;
window.appState.componentElementToRender = document.querySelector('#app');
window.appState.componentFunctionToRender = App;

renderApp();
