import Abstract from "../view/abstract.js";

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const render = (container, element, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);

      break;

    case RenderPosition.BEFOREEND:
      container.append(element);

      break;

    default:
      container.append(element);
  }
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const renderElement = (container, template, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  container.insertAdjacentHTML(place, template);
};

const replace = (newChild, oldChild) => {
  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexsisting element.`);
  }

  parent.replaceChild(newChild, oldChild);
};

const remove = (element) => {
  if (!(element instanceof Abstract)) {
    throw new Error(`Can remove only components.`);
  }

  element.getElement().removeElement();
  element.removeElement();
};

export {
  RenderPosition,
  replace,
  remove,
  render,
  renderElement,
  createElement
};
