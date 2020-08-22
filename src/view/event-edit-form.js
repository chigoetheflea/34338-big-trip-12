import {EVENT_TYPES, CITIES} from "../const.js";
import {getDateData, getRandomBoolean} from "../utils.js";

const createEventTypesTemplate = (type) => {
  const categoryCloseTemplate = `</fieldset>`;

  return `<div class="event__type-list">${Object.entries(EVENT_TYPES).map(([eventCategory, eventTypes]) => {
    const categoryOpenTemplate = `<fieldset class="event__type-group">
    <legend class="visually-hidden">${eventCategory}</legend>`;

    const typesControlsTemplate = eventTypes.map((typeName) => {
      const typeSlug = typeName.toLowerCase();

      return `<div class="event__type-item">
        <input
          id="event-type-${typeSlug}-1"
          class="event__type-input  visually-hidden"
          type="radio"
          name="event-type"
          value="${typeSlug}"
          ${type === typeName ? `checked` : ``}>
        <label
          class="event__type-label  event__type-label--${typeSlug}"
          for="event-type-${typeSlug}-1">
          ${typeName}
        </label>
      </div>`;
    }).join(``);

    return categoryOpenTemplate + typesControlsTemplate + categoryCloseTemplate;
  }).join(``)}</div>`;
};

const createCitiesTemplate = () => {
  return `<datalist id="destination-list-1">${CITIES.map((city) => `<option value="${city}"></option>`).join(``)}</datalist>`;
};

const createPhotoTemplate = (photo, altText) => {
  return `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${photo.map((path) => `<img class="event__photo" src="${path}" alt="${altText}">`).join(``)}
    </div>
  </div>`;
};

const createDescriptionTemplate = (description) => {
  return `<p class="event__destination-description">${description}</p>`;
};

const createDestinationTemplate = (description, photo, altText) => {
  const photoListTemplate = photo ? createPhotoTemplate(photo, altText) : ``;
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

const createOffersListTemplate = (offers) => {
  if (offers) {
    return `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offers.map((offer) => `<div class="event__offer-selector">
            <input
              class="event__offer-checkbox  visually-hidden"
              id="event-offer-${offer.slug}-1"
              type="checkbox"
              name="event-offer-${offer.slug}"
              ${getRandomBoolean() ? `checked` : ``}>
            <label
              class="event__offer-label"
              for="event-offer-${offer.slug}-1">
            <span class="event__offer-title">${offer.title}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
            </label>
          </div>`).join(``)}
        </div>
      </section>`;
  }

  return ``;
};

export const createEventEditFormTemplate = (event = {}) => {
  const {
    eventType = null,
    destination = ``,
    dateStart = null,
    dateEnd = null,
    price = 0,
    description = ``,
    photo = ``,
    offers = null
  } = event;

  const eventTypesTemplate = createEventTypesTemplate(eventType);

  const citiesListTemplate = createCitiesTemplate();

  const destinationTemplate = createDestinationTemplate(description, photo, destination);

  const offersListTemplate = createOffersListTemplate(offers);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          ${eventTypesTemplate}
       </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${eventType} to
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
          ${citiesListTemplate}
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDateData(dateStart, `in-form`)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDateData(dateEnd, `in-form`)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        ${offersListTemplate}

        ${destinationTemplate}
      </section>
    </form>`
  );
};
