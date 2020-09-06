import Abstract from "./abstract.js";
import {getDateData, isItNeedsZero} from "../utils/events.js";
import {MONTHES} from "../const.js";

const createDayInfoTemplate = (dayNumber, currentDate, isEmpty) => {

  const fullDate = getDateData(currentDate);

  const visibleDate = `${MONTHES[currentDate.getMonth()]} ${isItNeedsZero(currentDate.getDate())}`;

  return !isEmpty ? (
    `<div class="day__info">
      <span class="day__counter">${dayNumber}</span>
      <time class="day__date" datetime="${fullDate}">${visibleDate}</time>
    </div>`
  ) : (`<div class="day__info"></div>`);
};

export default class DayInfo extends Abstract {
  constructor(dayNumber, currentDate, isEmpty) {
    super();

    this._dayNumber = dayNumber;
    this._curretDate = currentDate;
    this._isEmpty = isEmpty;
  }

  _getTemplate() {
    return createDayInfoTemplate(this._dayNumber, this._curretDate, this._isEmpty);
  }
}
