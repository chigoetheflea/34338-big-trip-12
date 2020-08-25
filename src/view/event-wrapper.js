import {createElement} from "../utils.js";

const createEventWrapperTemplate = () => {
  return (
    `<li class="trip-events__item"></li>`
  );
};

export default class EventWrapper {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createEventWrapperTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
