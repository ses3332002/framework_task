/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from './element';
import { current } from './hooks';
let timer;

export function render(componentElementToRender, ComponentFunctionToRender) {
  function workLoop() {
    if (current.shouldReRender) {
      current.shouldReRender = false;
      componentElementToRender.replaceChildren(<ComponentFunctionToRender />);
      console.log('render');
    }
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(workLoop);
  }
  timer = requestAnimationFrame(workLoop);
}
