import Abstract from "./abstract.js";
import {getDateData, isItNeedsZero} from "../utils/events.js";
import {MONTHES} from "../const.js";

const createDayItemTemplate = (dayNumber, currentDate, isEmpty) => {
  const fullDate = getDateData(currentDate);
  const visibleDate = `${MONTHES[currentDate.getMonth()]} ${isItNeedsZero(currentDate.getDate())}`;

  return (
    `<li class="trip-days__item  day">
      ${
    !isEmpty ? (
      `<div class="day__info">
        <span class="day__counter">${dayNumber}</span>
        <time class="day__date" datetime="${fullDate}">${visibleDate}</time>
      </div>`
    ) : (`<div class="day__info"></div>`)
    }
      <ul class="trip-events__list"></ul>
    </li>`
  );
};

export default class DayItem extends Abstract {
  constructor(dayNumber, currentDate, isEmpty) {
    super();

    this._dayNumber = dayNumber;
    this._curretDate = currentDate;
    this._isEmpty = isEmpty;
  }

  _getTemplate() {
    return createDayItemTemplate(this._dayNumber, this._curretDate, this._isEmpty);
  }

  getNumber() {
    return this._dayNumber;
  }
}
