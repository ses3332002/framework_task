import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { Main } from '../components/Main/Main';
export function renderApp(
  componentElement = [
    document.querySelector('header'),
    document.querySelector('footer'),
    document.querySelector('main'),
  ],
  componentFunction = [Header, Footer, Main],
) {
  if (!Array.isArray(componentElement)) {
    componentElement = Array.of(componentElement);
    componentFunction = Array.of(componentFunction);
  }
  componentElement.forEach((item, index) => {
    item.innerHTML = componentFunction[index]();
  });
}
