import Header from "./presenter/header.js";
import Trip from "./presenter/trip.js";

import {sortEventsByDate} from "./utils/events.js";
import {generateEvent} from "./mock/generate-event.js";

const EVENTS_COUNT = 20;

const eventsData = new Array(EVENTS_COUNT).fill().map(generateEvent).sort(sortEventsByDate);

const tripMainSection = document.querySelector(`.trip-main`);
const tripEvents = document.querySelector(`.trip-events`);

const headerPresenter = new Header(tripMainSection, eventsData);
headerPresenter.init();

const tripPresenter = new Trip(tripEvents, eventsData);
tripPresenter.init();


