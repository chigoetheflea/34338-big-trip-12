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

import {render, sortEventsByDate, getDateData, getEventFullDays} from "./utils.js";

import {generateEvent} from "./mock/generate-event.js";

const EVENTS_COUNT = 20;

const events = new Array(EVENTS_COUNT).fill().map(generateEvent).sort(sortEventsByDate);

const tripMainSection = document.querySelector(`.trip-main`);
const tripControls = tripMainSection.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

render(tripMainSection, createTripInfoTemplate(), `afterbegin`);

const tripInfo = tripMainSection.querySelector(`.trip-info`);

render(tripInfo, createTripRoutTemplate(events), `beforeend`);
render(tripInfo, createTripCostTemplate(events), `beforeend`);

render(tripControls, createMenuTemplate(), `beforeend`);
render(tripControls, createFiltersTemplate(), `beforeend`);

render(tripEvents, createSortingTemplate(), `beforeend`);

render(tripEvents, createDaysTemplate(), `beforeend`);

const tripDays = tripEvents.querySelector(`.trip-days`);
const tripStartDate = events[0].dateStart;
let dayNumber = 1;
let isSameDay = true;

render(tripDays, createDayItemTemplate(), `beforeend`);

let days = tripDays.querySelectorAll(`.day`);

render(days[0], createDayInfoTemplate(dayNumber, tripStartDate), `beforeend`);
render(days[0], createEventsListTemplate(), `beforeend`);

for (let i = 0; i < events.length; i++) {
  let currentEvent = events[i];
  let nextEvent = events[i + 1];

  if (!isSameDay) {
    render(tripDays, createDayItemTemplate(), `beforeend`);

    days = tripDays.querySelectorAll(`.day`);

    render(days[days.length - 1], createDayInfoTemplate(dayNumber, currentEvent.dateStart), `beforeend`);
    render(days[days.length - 1], createEventsListTemplate(), `beforeend`);
  }

  let eventsList = days[days.length - 1].querySelector(`.trip-events__list`);

  render(eventsList, createEventWrapperTemplate(), `beforeend`);

  let eventWrappers = eventsList.querySelectorAll(`.trip-events__item`);

  let templateName = i === 0 ? createEventEditFormTemplate : createEventTemplate;

  render(eventWrappers[eventWrappers.length - 1], templateName(currentEvent), `beforeend`);

  if (nextEvent) {
    isSameDay = getDateData(currentEvent.dateStart) === getDateData(nextEvent.dateStart);

    dayNumber += getEventFullDays(currentEvent, nextEvent);
  }
}
