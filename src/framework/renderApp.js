/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from './element';
import { App } from '../components/App/App';

export function renderApp(
  componentElement = document.getElementById('app'),
  ComponentFunction = App,
) {
  componentElement.innerHTML = '';
  componentElement.appendChild(<ComponentFunction />);
}
