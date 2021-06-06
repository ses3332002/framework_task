import { render } from './framework/render';
import { App } from './components/App/App';
// import { appState } from './data/variables';

// console.log(process.env.API_KEY);
// window.appState = appState;

render(document.querySelector('#app'), App);
