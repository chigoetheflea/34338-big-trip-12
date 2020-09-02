import Abstract from "./abstract.js";
import {getDateData, isItNeedsZero} from "../utils/events.js";

const HOUR_MS = 3600000;
const DAY_MS = HOUR_MS * 24;
const MAX_OFFERS_TO_DISPLAY = 3;

const getDateDiff = (dateDiff) => {
  const days = `${isItNeedsZero(Math.floor(dateDiff / (1000 * 60 * 60 * 24)))}D`;
  const hours = `${isItNeedsZero(Math.floor((dateDiff / (1000 * 60 * 60)) % 24))}H`;
  const minutes = `${isItNeedsZero(Math.floor((dateDiff / (1000 * 60)) % 60))}M`;

  if (dateDiff < HOUR_MS) {
    return minutes;
  }

  if (dateDiff < DAY_MS) {
    return `${hours} ${minutes}`;
  }

  return `${days} ${hours} ${minutes}`;
};

const createEventTimingTemplate = (dateStart, dateEnd) => {
  const dateStartData = getDateData(dateStart, `in-list`);
  const dateEndData = getDateData(dateEnd, `in-list`);
  const dateDiff = getDateDiff(dateEnd - dateStart);

  return (
    `<div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dateStartData.date}">${dateStartData.time}</time>
        &mdash;
        <time class="event__end-time" datetime="${dateEndData.date}">${dateEndData.time}</time>
      </p>
      <p class="event__duration">${dateDiff}</p>
    </div>`
  );
};

const createOffersListTemplate = (offers) => {
  if (offers) {
    const visibleOffers = offers.slice(0, MAX_OFFERS_TO_DISPLAY);

    return `<h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${visibleOffers.map((offer) => `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </li>`)
        .join(``)}
      </ul>`;
  }

  return ``;
};

const createEventTemplate = (event) => {

  const {eventType, destination, dateStart, dateEnd, price, offers} = event;

  const eventTimingTemplate = createEventTimingTemplate(dateStart, dateEnd);

  const offersListTemplate = createOffersListTemplate(offers);

  return (
    `<div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${eventType} to ${destination}</h3>
      ${eventTimingTemplate}
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      ${offersListTemplate}
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>`
  );
};

export default class Event extends Abstract {
  constructor(event) {
    super();

    this._event = event;
    this._clickHandler = this._clickHandler.bind(this);
  }

  _getTemplate() {
    return createEventTemplate(this._event);
  }

  _clickHandler(evt) {
    evt.preventDefault();

    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}
