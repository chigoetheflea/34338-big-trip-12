import TripInfo from "./view/trip-info.js";
import TripRout from "./view/trip-rout.js";
import TripCost from "./view/trip-cost.js";
import Menu from "./view/menu.js";
import Filters from "./view/filters.js";
import Sorting from "./view/sorting.js";
import Days from "./view/days.js";
import DayItem from "./view/day-item.js";
import DayInfo from "./view/day-info.js";
import EventsList from "./view/events-list.js";
import EventWrapper from "./view/event-wrapper.js";
import Event from "./view/event.js";
import EventEditForm from "./view/event-edit-form.js";
import NoEvents from "./view/no-events.js";

import {render, sortEventsByDate, getDateData, getEventFullDays, RenderPosition} from "./utils.js";

import {generateEvent} from "./mock/generate-event.js";

const EVENTS_COUNT = 20;

const eventsData = new Array(EVENTS_COUNT).fill().map(generateEvent).sort(sortEventsByDate);

const tripMainSection = document.querySelector(`.trip-main`);
const tripEvents = document.querySelector(`.trip-events`);

const renderHeader = (mainElement, events) => {
  const tripControls = mainElement.querySelector(`.trip-controls`);

  render(mainElement, new TripInfo().getElement(), RenderPosition.AFTERBEGIN);

  const tripInfo = mainElement.querySelector(`.trip-info`);

  render(tripInfo, new TripRout(events).getElement(), RenderPosition.BEFOREEND);
  render(tripInfo, new TripCost(events).getElement(), RenderPosition.BEFOREEND);

  render(tripControls, new Menu().getElement(), RenderPosition.BEFOREEND);
  render(tripControls, new Filters().getElement(), RenderPosition.BEFOREEND);
};

const renderEvents = (eventsElement, events) => {
  if (events.length === 0) {
    render(eventsElement, new NoEvents().getElement(), RenderPosition.BEFOREEND);
  } else {


    render(eventsElement, new Sorting().getElement(), RenderPosition.BEFOREEND);

    render(eventsElement, new Days().getElement(), RenderPosition.BEFOREEND);

    const tripDays = eventsElement.querySelector(`.trip-days`);
    const tripStartDate = events[0].dateStart;
    let dayNumber = 1;
    let isSameDay = true;

    render(tripDays, new DayItem().getElement(), RenderPosition.BEFOREEND);

    let days = tripDays.querySelectorAll(`.day`);

    render(days[0], new DayInfo(dayNumber, tripStartDate).getElement(), RenderPosition.BEFOREEND);
    render(days[0], new EventsList().getElement(), RenderPosition.BEFOREEND);

    const renderEvent = (eventWrapper, event) => {
      const eventRegular = new Event(event);
      const eventEdit = new EventEditForm(event);

      const replaceEventToForm = () => {
        eventWrapper.replaceChild(eventEdit.getElement(), eventRegular.getElement());

        eventEdit.getElement().addEventListener(`submit`, onEventEditFormSubmit);

        document.addEventListener(`keydown`, onEventEditFormEscKeyDown);
      };

      const replaceFormToEvent = () => {
        eventWrapper.replaceChild(eventRegular.getElement(), eventEdit.getElement());

        eventEdit.getElement().removeEventListener(`submit`, onEventEditFormSubmit);
        document.removeEventListener(`keydown`, onEventEditFormEscKeyDown);
      };

      const onEventEditFormSubmit = (evt) => {
        evt.preventDefault();

        replaceFormToEvent();
      };

      const onEventEditFormEscKeyDown = (evt) => {
        if (evt.key === `Escape` || evt.key === `Esc`) {
          evt.preventDefault();

          replaceFormToEvent();
        }
      };

      eventRegular.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
        replaceEventToForm();
      });

      render(eventWrapper, eventRegular.getElement(), RenderPosition.BEFOREEND);
    };

    for (let i = 0; i < events.length; i++) {
      let currentEvent = events[i];
      let nextEvent = events[i + 1];

      if (!isSameDay) {
        render(tripDays, new DayItem().getElement(), RenderPosition.BEFOREEND);

        days = tripDays.querySelectorAll(`.day`);

        render(days[days.length - 1], new DayInfo(dayNumber, currentEvent.dateStart).getElement(), RenderPosition.BEFOREEND);
        render(days[days.length - 1], new EventsList().getElement(), RenderPosition.BEFOREEND);
      }

      const eventsList = days[days.length - 1].querySelector(`.trip-events__list`);

      render(eventsList, new EventWrapper().getElement(), RenderPosition.BEFOREEND);

      const eventWrappers = eventsList.querySelectorAll(`.trip-events__item`);

      renderEvent(eventWrappers[eventWrappers.length - 1], currentEvent);

      if (nextEvent) {
        isSameDay = getDateData(currentEvent.dateStart) === getDateData(nextEvent.dateStart);

        dayNumber += getEventFullDays(currentEvent, nextEvent);
      }
    }
  }
};

renderHeader(tripMainSection, eventsData);
renderEvents(tripEvents, eventsData);
