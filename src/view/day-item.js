import {createElement} from "../utils.js";

const createDayItemTemplate = () => {
  return (
    `<li class="trip-days__item  day"></li>`
  );
};

export default class DayItem {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createDayItemTemplate();
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
