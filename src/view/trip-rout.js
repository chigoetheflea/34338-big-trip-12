import {isItNeedsZero, createElement} from "../utils.js";
import {MONTHES} from "../const.js";

const MAX_EVENTS_TO_SHOW = 3;
const BIG_SEPARATOR = ` &mdash; `;
const SMALL_SEPARATOR = `&nbsp;`;
const SUBSTITUTE = `&hellip;`;

const createRoutTemplate = (events) => {
  let rout = events[0].destination;

  if (events.length > MAX_EVENTS_TO_SHOW) {
    rout += BIG_SEPARATOR + SUBSTITUTE + BIG_SEPARATOR + events[events.length - 1].destination;
  } else {
    for (let i = 1; i < events.length; i++) {
      rout += BIG_SEPARATOR + events[i].destination;
    }
  }

  return `<h1 class="trip-info__title">${rout}</h1>`;
};

const createDatesTemplate = (dateStart, dateEnd) => {
  const firstEventDate = {
    year: dateStart.getFullYear(),
    month: MONTHES[dateStart.getMonth()],
    day: isItNeedsZero(dateStart.getDate())
  };

  const lastEventDate = {
    year: dateEnd.getFullYear(),
    month: MONTHES[dateEnd.getMonth()],
    day: isItNeedsZero(dateEnd.getDate())
  };

  let dates = firstEventDate.month + SMALL_SEPARATOR + firstEventDate.day;

  const isSameYear = firstEventDate.year === lastEventDate.year;

  if (!isSameYear) {
    dates +=
      SMALL_SEPARATOR + firstEventDate.year + BIG_SEPARATOR +
      lastEventDate.month + SMALL_SEPARATOR + lastEventDate.day +
      SMALL_SEPARATOR + lastEventDate.year;
  } else {
    const isSameMonth = firstEventDate.month === lastEventDate.month;

    if (!isSameMonth) {
      dates +=
        BIG_SEPARATOR + lastEventDate.month +
        SMALL_SEPARATOR + lastEventDate.day + SMALL_SEPARATOR + firstEventDate.year;
    } else {
      const isSameDay = firstEventDate.day === lastEventDate.day;

      if (!isSameDay) {
        dates += BIG_SEPARATOR + lastEventDate.day;
      }
    }
  }

  return `<p class="trip-info__dates">${dates}</p>`;
};

const createTripRoutTemplate = (events) => {
  const routTemplate = createRoutTemplate(events);

  const datesTemplate = createDatesTemplate(events[0].dateStart, events[events.length - 1].dateEnd);

  return (
    `<div class="trip-info__main">
      ${routTemplate}

      ${datesTemplate}
    </div>`
  );
};

export default class TripRout {
  constructor(events) {
    this._element = null;
    this._events = events;
  }

  _getTemplate() {
    return createTripRoutTemplate(this._events);
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
