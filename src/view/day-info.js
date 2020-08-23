import {getDateData, isItNeedsZero} from "../utils.js";
import {MONTHES} from "../const.js";

export const createDayInfoTemplate = (dayNumber, currentDate) => {

  const fullDate = getDateData(currentDate);

  const visibleDate = `${MONTHES[currentDate.getMonth()]} ${isItNeedsZero(currentDate.getDate())}`;

  return (
    `<div class="day__info">
      <span class="day__counter">${dayNumber}</span>
      <time class="day__date" datetime="${fullDate}">${visibleDate}</time>
    </div>`
  );
};
