/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from './element';

let timer;

export function renderApp() {
  function workLoop() {
    if (window.appState.needToBeRendered) {
      let oldNode = window.appState.componentElementToRender;
      let newNode = <window.appState.componentFunctionToRender />;
      oldNode.replaceWith(newNode);
      window.appState.needToBeRendered = false;
    }
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(workLoop);
  }
  timer = requestAnimationFrame(workLoop);
}
