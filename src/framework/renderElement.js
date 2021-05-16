export function renderElement(componentElement, componentFunction) {
  componentElement.innerHTML = componentFunction();
}
