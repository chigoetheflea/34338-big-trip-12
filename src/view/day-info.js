import {getDateData, isItNeedsZero, createElement} from "../utils.js";
import {MONTHES} from "../const.js";

const createDayInfoTemplate = (dayNumber, currentDate) => {

  const fullDate = getDateData(currentDate);

  const visibleDate = `${MONTHES[currentDate.getMonth()]} ${isItNeedsZero(currentDate.getDate())}`;

  return (
    `<div class="day__info">
      <span class="day__counter">${dayNumber}</span>
      <time class="day__date" datetime="${fullDate}">${visibleDate}</time>
    </div>`
  );
};

export default class DayInfo {
  constructor(dayNumber, currentDate) {
    this._element = null;
    this._dayNumber = dayNumber;
    this._curretDate = currentDate;
  }

  _getTemplate() {
    return createDayInfoTemplate(this._dayNumber, this._curretDate);
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
