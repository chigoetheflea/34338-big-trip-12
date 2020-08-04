import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripRoutTemplate} from "./view/trip-rout.js";
import {createTripCostTemplate} from "./view/trip-cost.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFiltersTemplate} from "./view/filters.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createDaysTemplate} from "./view/days.js";
import {createDayItemTemplate} from "./view/day-item.js";
import {createDayInfoTemplate} from "./view/day-info.js";
import {createEventsListTemplate} from "./view/events-list.js";
import {createEventWrapperTemplate} from "./view/event-wrapper.js";
import {createEventTemplate} from "./view/event.js";
import {createEventEditFormTemplate} from "./view/event-edit-form.js";
import {render} from "./view/render.js";

const EVENTS_COUNT = 4;

const tripMainSection = document.querySelector(`.trip-main`);
const tripControls = tripMainSection.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

render(tripMainSection, createTripInfoTemplate(), `afterbegin`);

const tripInfo = tripMainSection.querySelector(`.trip-info`);

render(tripInfo, createTripRoutTemplate(), `beforeend`);
render(tripInfo, createTripCostTemplate(), `beforeend`);

render(tripControls, createMenuTemplate(), `beforeend`);
render(tripControls, createFiltersTemplate(), `beforeend`);

render(tripEvents, createSortingTemplate(), `beforeend`);

render(tripEvents, createDaysTemplate(), `beforeend`);

const tripDays = tripEvents.querySelector(`.trip-days`);

render(tripDays, createDayItemTemplate(), `beforeend`);

const day = tripDays.querySelector(`.day`);

render(day, createDayInfoTemplate(), `beforeend`);
render(day, createEventsListTemplate(), `beforeend`);

const eventsList = day.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENTS_COUNT; i++) {
  render(eventsList, createEventWrapperTemplate(), `beforeend`);

  let eventWrappers = eventsList.querySelectorAll(`.trip-events__item`);

  let templateName = i === 0 ? createEventEditFormTemplate : createEventTemplate;

  render(eventWrappers[eventWrappers.length - 1], templateName(), `beforeend`);
}
