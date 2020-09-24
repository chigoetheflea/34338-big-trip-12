import Trip from "./presenter/trip.js";
import Points from "./model/points.js";
import Places from "./model/places.js";
import Offers from "./model/offers.js";
import Filters from "./model/filters.js";

import {sortEventsByDate} from "./utils/events.js";
import {generateEvent} from "./mock/generate-event.js";
import {DESTINATION, OFFERS} from "./const.js";

const EVENTS_COUNT = 5;

const eventsData = new Array(EVENTS_COUNT).fill().map(generateEvent).sort(sortEventsByDate);

const tripMainSection = document.querySelector(`.trip-main`);
const tripEventsSection = document.querySelector(`.trip-events`);

const pointsModel = new Points();
pointsModel.setPoints(eventsData);

const destinationModel = new Places();
destinationModel.setPlaces(DESTINATION);

const offersModel = new Offers();
offersModel.setOffers(OFFERS);

const filtersModel = new Filters();

const tripPresenter = new Trip(tripMainSection, tripEventsSection, pointsModel, destinationModel, offersModel, filtersModel);
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();

  tripPresenter.createEvent();
});


