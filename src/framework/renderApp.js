/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from './element';
import { App } from '../components/App/App';

export function renderApp(
  componentElement = document.getElementById('app'),
  ComponentFunction = App,
) {
  let oldNode = componentElement;
  let newNode = <ComponentFunction />;
  oldNode.replaceWith(newNode);
}
