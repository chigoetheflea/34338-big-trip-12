import Smart from "./smart.js";
import {EventType, Key} from "../const.js";
import {getDateData} from "../utils/events.js";
import {getRandomInteger, setFirstLetterUpperCase, getRandomArrayElement} from "../utils/common.js";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const BLANK_EVENT = {
  type: null,
  destination: ``,
  dateStart: null,
  dateEnd: null,
  price: 0,
  description: ``,
  photo: ``,
  offers: [],
  id: null,
  isFavorite: false,
  isDisabled: false,
  isSaving: false,
  isDeleting: false
};

const RemoveButton = {
  CANCEL: `Cancel`,
  DELETE: `Delete`
};

const ID_MAX_JITTER = 100;
const DATE_FORMAT = `d/m/Y H:i`;
const PRICE_ERROR_MESSAGE = `Invalid price`;
const SAVE_IN_PROGRESS_TEXT = `Saving...`;
const SAVE_TEXT = `Save`;
const DELETE_IN_PROGRESS_TEXT = `Deleting...`;

const createEventTypesTemplate = (type, id) => {
  const categoryCloseTemplate = `</fieldset>`;

  return `<div class="event__type-list">${Object.entries(EventType).map(([eventCategory, eventTypes]) => {
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

const createCitiesTemplate = (id, placesList) => {
  return `<datalist id="destination-list-${id}">${placesList.map((city) => `<option value="${city.name}"></option>`).join(``)}</datalist>`;
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

const createOffersListTemplate = (offers, offersList, slug, id) => {
  const checkedOffers = [];

  offers.map((offer) => {
    checkedOffers.push(offer.title);
  });

  if (offersList) {
    return `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offersList.map((offer) => {
    const typeId = id + getRandomInteger(0, ID_MAX_JITTER);

    return `<div class="event__offer-selector">
            <input
              class="event__offer-checkbox  visually-hidden"
              id="event-offer-${slug}-${typeId}"
              type="checkbox"
              name="event-offer-${slug}"
              data-offer-title="${offer.title}"
              data-offer-price="${offer.price}"
              ${checkedOffers.includes(offer.title) ? `checked` : ``}>
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

const createEventEditFormTemplate = (event, isNewEventForm, offersList, placesList) => {
  const {
    type,
    destination,
    dateStart,
    dateEnd,
    price,
    offers,
    isFavorite,
    id,
    city,
    isDisabled,
    isSaving,
    isDeleting
  } = event;

  const eventSlug = type.toLowerCase();

  const eventTypesTemplate = createEventTypesTemplate(type, id);

  const citiesListTemplate = createCitiesTemplate(id, placesList);

  const destinationTemplate = createDestinationTemplate(destination);

  const offersListTemplate = createOffersListTemplate(offers, offersList, eventSlug, id);

  const actualDeleteText = isNewEventForm ? RemoveButton.CANCEL : RemoveButton.DELETE;

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
              ${setFirstLetterUpperCase(type)} to
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${city}" list="destination-list-${id}" >
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

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? `disabled` : ``}>
          ${isSaving ? SAVE_IN_PROGRESS_TEXT : SAVE_TEXT}
          </button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? `disabled` : ``}>
          ${isDeleting ? DELETE_IN_PROGRESS_TEXT : actualDeleteText}
          </button>

          <input id="event-favorite-${id}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
          <label class="event__favorite-btn ${isNewEventForm ? `visually-hidden` : ``}" for="event-favorite-${id}">
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
  constructor(event = BLANK_EVENT, placesList, offersList, isNewEventForm = false) {
    super();

    this._data = event;
    this._placesList = placesList;
    this._offersList = offersList;
    this._isNewEventForm = isNewEventForm;

    this._datePickerStart = null;
    this._datePickerEnd = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);
    this._dateStartChangeHandler = this._dateStartChangeHandler.bind(this);
    this._dateEndChangeHandler = this._dateEndChangeHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);

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

  _formDeleteClickHandler(evt) {
    evt.preventDefault();

    this._callback.delete(this._data);
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();

    const newType = evt.target.control.value;

    this.updateData({
      type: setFirstLetterUpperCase(newType),
      offers: []
    });
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();

    const newDestinationValue = evt.target.value;
    const newDestination = this._placesList.filter((point) => point.name === newDestinationValue);

    if (newDestination.length) {
      this.updateData({
        destination: newDestination[0],
        city: newDestinationValue
      });
    }
  }

  _destinationInputHandler(evt) {
    const isValidKey = Object.values(Key).some((key) => key === evt.key);

    if (!isValidKey) {
      evt.target.value = ``;
    }
  }

  _testPriceValidity(priceValue) {
    const validPriceRegExp = /\D/;

    if (validPriceRegExp.test(priceValue)) {
      return PRICE_ERROR_MESSAGE;
    }

    return ``;
  }

  _priceChangeHandler(evt) {
    evt.preventDefault();

    const priceValue = evt.target.value;

    this._priceField.setCustomValidity(this._testPriceValidity(priceValue));

    if (this._priceField.reportValidity()) {
      this.updateData({
        price: priceValue
      });
    }
  }

  _offersChangeHandler(evt) {
    const isCheckbox = evt.target.type === `checkbox`;
    const choosenOffers = [];

    if (isCheckbox) {
      const offersOptions = this.getElement().querySelectorAll(`.event__offer-checkbox`);

      for (let option of offersOptions) {
        if (option.checked) {
          choosenOffers.push({
            title: option.dataset.offerTitle,
            price: Number(option.dataset.offerPrice)
          });
        }
      }

      this.updateData({
        offers: choosenOffers
      });
    }
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.event__type-list`).addEventListener(`click`, this._typeChangeHandler);

    this._destinationField = this.getElement().querySelector(`.event__input--destination`);
    this._destinationField.addEventListener(`input`, this._destinationChangeHandler);
    this._destinationField.addEventListener(`keyup`, this._destinationInputHandler);

    this._priceField = this.getElement().querySelector(`.event__input--price`);
    this._priceField.addEventListener(`change`, this._priceChangeHandler);

    this._offersContainer = this.getElement().querySelector(`.event__available-offers`);
    this._offersContainer.addEventListener(`click`, this._offersChangeHandler);
  }

  _setDefaultData(data) {
    if (data.type !== null) {
      return data;
    }

    const defaultEventType = EventType.TRANSFER[0];
    const defaultDestination = getRandomArrayElement(this._placesList);
    const defaultCity = defaultDestination.name;
    const defaultDateStart = new Date();
    const defaultDateEnd = new Date();

    defaultDateEnd.setDate(defaultDateEnd.getDate() + 1);

    return Object.assign(
        data,
        {
          type: defaultEventType,
          dateStart: defaultDateStart,
          dateEnd: defaultDateEnd,
          destination: defaultDestination,
          city: defaultCity
        }
    );
  }

  _getTemplate() {
    return createEventEditFormTemplate(
        this._setDefaultData(this._data),
        this._isNewEventForm,
        this._offersList.filter((offer) => offer.type === this._data.type.toLowerCase())[0].offers,
        this._placesList
    );
  }

  _setDatePickers() {
    if (this._datePickerStart) {
      this._datePickerStart.destroy();
      this._datePickerStart = null;
    }

    this._dateStartField = this.getElement().querySelector(`[name="event-start-time"]`);
    this._dateEndField = this.getElement().querySelector(`[name="event-end-time"]`);

    this._datePickerStart = flatpickr(
        this._dateStartField,
        {
          dateFormat: DATE_FORMAT,
          defaultDate: this._data.dateStart || new Date(),
          enableTime: true,
          onClose: this._dateStartChangeHandler
        }
    );

    if (this._datePickerEnd) {
      this._datePickerEnd.destroy();
      this._datePickerEnd = null;
    }

    this._datePickerEnd = flatpickr(
        this._dateEndField,
        {
          dateFormat: DATE_FORMAT,
          defaultDate: this._data.dateEnd || new Date(),
          enableTime: true,
          minDate: this._data.dateStart,
          onClose: this._dateEndChangeHandler
        }
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatePickers();

    this.setFormSubmitHandler(this._callback.submit);
    this.setDeleteClickHandler(this._callback.delete);
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

  setDeleteClickHandler(callback) {
    this._callback.delete = callback;

    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  removeElement() {
    super.removeElement();

    if (this._datePickerStart) {
      this._datePickerStart.destroy();
      this._datePickerStart = null;
    }

    if (this._datePickerEnd) {
      this._datePickerEnd.destroy();
      this._datePickerEnd = null;
    }
  }
}
