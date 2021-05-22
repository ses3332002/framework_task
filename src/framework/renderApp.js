/** @jsx createElement */
/** @jsxFrag createFragment */
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { Main } from '../components/Main/Main';

import { createElement } from './element';
export function renderApp(
  ComponentElement = [
    document.querySelector('header'),
    document.querySelector('footer'),
    document.querySelector('main'),
  ],
  ComponentFunction = [Header, Footer, Main],
) {
  if (!Array.isArray(ComponentElement)) {
    ComponentElement = Array.of(ComponentElement);
    ComponentFunction = Array.of(ComponentFunction);
  }
  ComponentElement.forEach((item, index) => {
    let Function = ComponentFunction[index];
    item.innerHTML = '';
    item.appendChild(<Function />);
  });
}
