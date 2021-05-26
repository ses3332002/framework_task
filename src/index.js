import { appState } from './data/variables';
import { renderApp } from './framework/renderApp';

// console.log(process.env.API_KEY);

window.appState = appState;

renderApp();
