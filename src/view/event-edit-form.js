import Smart from "./smart.js";
import {EVENT_TYPES, CITIES, DESTINATION, OFFERS} from "../const.js";
import {getDateData} from "../utils/events.js";
import {getRandomBoolean, getRandomInteger, setFirstLetterUpperCase} from "../utils/common.js";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const BLANK_EVENT = {
  eventType: null,
  destination: ``,
  dateStart: null,
  dateEnd: null,
  price: 0,
  description: ``,
  photo: ``,
  offers: null
};

const ID_MAX_JITTER = 100;
const DATE_FORMAT = `d/m/Y H:i`;

const createEventTypesTemplate = (type, id) => {
  const categoryCloseTemplate = `</fieldset>`;

  return `<div class="event__type-list">${Object.entries(EVENT_TYPES).map(([eventCategory, eventTypes]) => {
    const categoryOpenTemplate = `<fieldset class="event__type-group">
    <legend class="visually-hidden">${eventCategory}</legend>`;

    const typesControlsTemplate = eventTypes.map((typeName) => {
      const typeSlug = typeName.toLowerCase();
      const typeId = id + getRandomInteger(0, ID_MAX_JITTER);

      return `<div class="event__type-item">
        <input
          id="event-type-${typeSlug}-${typeId}"
          class="event__type-input  visually-hidden"
          type="radio"
          name="event-type"
          value="${typeSlug}"
          ${type === typeName ? `checked` : ``}>
        <label
          class="event__type-label  event__type-label--${typeSlug}"
          for="event-type-${typeSlug}-${typeId}">
          ${setFirstLetterUpperCase(typeName)}
        </label>
      </div>`;
    }).join(``);

    return categoryOpenTemplate + typesControlsTemplate + categoryCloseTemplate;
  }).join(``)}</div>`;
};

const createCitiesTemplate = (id) => {
  return `<datalist id="destination-list-${id}">${CITIES.map((city) => `<option value="${city}"></option>`).join(``)}</datalist>`;
};

const createPhotoTemplate = (pictures) => {
  return `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join(``)}
    </div>
  </div>`;
};

const createDescriptionTemplate = (description) => {
  return `<p class="event__destination-description">${description}</p>`;
};

const createDestinationTemplate = ({description, pictures}) => {
  const photoListTemplate = pictures ? createPhotoTemplate(pictures) : ``;
  const descriptionTemplate = description ? createDescriptionTemplate(description) : ``;

  if (photoListTemplate === descriptionTemplate) {
    return ``;
  }

  return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${descriptionTemplate}</p>
    ${photoListTemplate}
  </section>`;
};

const createOffersListTemplate = (offers, slug, id) => {
  if (offers) {
    return `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offers.map((offer) => {
    const typeId = id + getRandomInteger(0, ID_MAX_JITTER);

    return `<div class="event__offer-selector">
            <input
              class="event__offer-checkbox  visually-hidden"
              id="event-offer-${slug}-${typeId}"
              type="checkbox"
              name="event-offer-${slug}"
              ${getRandomBoolean() ? `checked` : ``}>
            <label
              class="event__offer-label"
              for="event-offer-${slug}-${typeId}">
            <span class="event__offer-title">${offer.title}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
            </label>
          </div>`;
  }).join(``)}
        </div>
      </section>`;
  }

  return ``;
};

const createEventEditFormTemplate = (event) => {
  const {eventType, destination, dateStart, dateEnd, price, offers, isFavorite, id} = event;

  const eventSlug = eventType.toLowerCase();

  const eventTypesTemplate = createEventTypesTemplate(eventType, id);

  const citiesListTemplate = createCitiesTemplate(id);

  const destinationTemplate = createDestinationTemplate(destination);

  const offersListTemplate = createOffersListTemplate(offers, eventSlug, id);

  return (
    `<li class="trip-events__item">
      <form class="trip-events__item  event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${eventSlug}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">
            ${eventTypesTemplate}
        </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${id}">
              ${setFirstLetterUpperCase(eventType)} to
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${id}">
            ${citiesListTemplate}
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${getDateData(dateStart, `in-form`)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${getDateData(dateEnd, `in-form`)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>

          <input id="event-favorite-${id}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
          <label class="event__favorite-btn" for="event-favorite-${id}">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>
        </header>
        <section class="event__details">
          ${offersListTemplate}

          ${destinationTemplate}
        </section>
      </form>
    </div>`
  );
};

export default class EventEditForm extends Smart {
  constructor(event = BLANK_EVENT) {
    super();

    this._data = event;
    this._datePickerStart = null;
    this._datePickerEnd = null;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._dateStartChangeHandler = this._dateStartChangeHandler.bind(this);
    this._dateEndChangeHandler = this._dateEndChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatePickers();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();

    this._callback.submit(this._data);
  }

  _favoriteClickHandler() {
    this._callback.favorite();
  }

  _dateStartChangeHandler([date]) {
    this.updateData({
      dateStart: date
    });
  }

  _dateEndChangeHandler([date]) {
    this.updateData({
      dateEnd: date
    });
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();

    const newType = evt.target.control.value;
    const availableOffers = OFFERS.filter((offer) => offer.type.toLowerCase() === newType);

    this.updateData({
      eventType: setFirstLetterUpperCase(newType),
      offers: availableOffers.length ? availableOffers[0].offers : null
    });
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();

    const newDestinationValue = evt.target.value;
    const newDestination = DESTINATION.filter((point) => point.name === newDestinationValue);

    if (newDestination.length) {
      this.updateData({
        destination: newDestination[0]
      });
    }
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.event__type-list`).addEventListener(`click`, this._typeChangeHandler);
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._destinationChangeHandler);
  }

  _getTemplate() {
    return createEventEditFormTemplate(this._data);
  }

  _setDatePickers() {
    if (this._datePickerStart) {
      this._datePickerStart.destroy();
      this._datePickerStart = null;
    }

    this._datePickerStart = flatpickr(
        this.getElement().querySelector(`[name="event-start-time"]`),
        {
          dateFormat: DATE_FORMAT,
          defaultDate: this._data.dateStart,
          enableTime: true,
          onClose: this._dateStartChangeHandler
        }
    );

    if (this._datePickerEnd) {
      this._datePickerEnd.destroy();
      this._datePickerEnd = null;
    }

    this._datePickerEnd = flatpickr(
        this.getElement().querySelector(`[name="event-end-time"]`),
        {
          dateFormat: DATE_FORMAT,
          defaultDate: this._data.dateEnd,
          enableTime: true,
          onClose: this._dateEndChangeHandler
        }
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatePickers();

    this.setFormSubmitHandler(this._callback.submit);
    this.setFavoriteClickHandler(this._callback.favorite);
  }

  setFormSubmitHandler(callback) {
    this._callback.submit = callback;

    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favorite = callback;

    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`click`, this._favoriteClickHandler);
  }
}
