import Abstract from "./abstract.js";
import {isItNeedsZero} from "../utils/events.js";
import {MONTHES} from "../const.js";

const MAX_EVENTS_TO_SHOW = 3;
const BIG_SEPARATOR = ` &mdash; `;
const SMALL_SEPARATOR = `&nbsp;`;
const SUBSTITUTE = `&hellip;`;
const NO_DESTINATION = `No available destination`;
const NO_DATES = ``;

const createRoutTemplate = (events) => {
  let rout = events[0].destination.name;

  if (events.length > MAX_EVENTS_TO_SHOW) {
    rout += BIG_SEPARATOR + SUBSTITUTE + BIG_SEPARATOR + events[events.length - 1].destination.name;
  } else {
    for (let i = 1; i < events.length; i++) {
      rout += BIG_SEPARATOR + events[i].destination.name;
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
  let routTemplate = NO_DESTINATION;
  let datesTemplate = NO_DATES;

  if (events.length) {
    routTemplate = createRoutTemplate(events);

    datesTemplate = createDatesTemplate(events[0].dateStart, events[events.length - 1].dateEnd);
  }

  return (
    `<div class="trip-info__main">
      ${routTemplate}

      ${datesTemplate}
    </div>`
  );
};

const createTripCostTemplate = (events) => {
  let totalPrice = 0;

  if (events.length) {
    totalPrice = events.map((event) => {
      const eventFullPrice = parseInt(event.price, 10);
      let eventOffersPrice = 0;

      if (event.offers.length) {
        eventOffersPrice = event.offers
          .map((offer) => parseInt(offer.price, 10))
          .reduce((left, right) => left + right);
      }

      return eventFullPrice + eventOffersPrice;
    }).reduce((left, right) => left + right);
  }

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>`
  );
};

const createTripInfoTemplate = (events) => {
  const tripRoutTemplate = createTripRoutTemplate(events);
  const tripCostTemplate = createTripCostTemplate(events);

  return (
    `<section class="trip-main__trip-info  trip-info">
      ${tripRoutTemplate}

      ${tripCostTemplate}
    </section>`
  );
};

export default class TripInfo extends Abstract {
  constructor(events) {
    super();

    this._events = events;
  }

  _getTemplate() {
    return createTripInfoTemplate(this._events);
  }
}
