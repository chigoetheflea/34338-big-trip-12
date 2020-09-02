import Abstract from "./abstract.js";
import {getDateData, isItNeedsZero} from "../utils/events.js";
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

export default class DayInfo extends Abstract {
  constructor(dayNumber, currentDate) {
    super();

    this._dayNumber = dayNumber;
    this._curretDate = currentDate;
  }

  _getTemplate() {
    return createDayInfoTemplate(this._dayNumber, this._curretDate);
  }
}
