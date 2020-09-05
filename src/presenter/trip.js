import Sorting from "../view/sorting.js";
import Days from "../view/days.js";
import DayItem from "../view/day-item.js";
import DayInfo from "../view/day-info.js";
import EventsList from "../view/events-list.js";
import EventWrapper from "../view/event-wrapper.js";
import Event from "../view/event.js";
import EventEditForm from "../view/event-edit-form.js";
import NoEvents from "../view/no-events.js";

import {render, replace, RenderPosition} from "../utils/render.js";
import {getDateData, getEventFullDays, sortEventsByTime, sortEventsByPrice} from "../utils/events.js";
import {SortType} from "../const.js";

const FIRST_DAY_NUMBER = 1;
const DAYS_TITLE = `Day`;

export default class Trip {
  constructor(container, events) {
    this._tripContainer = container;
    this._events = events;
    this._sort = SortType.DEFAULT;

    this._noEventsComponent = new NoEvents();
    this._sortingComponent = new Sorting();
    this._daysComponent = new Days();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  _toggleDaysTitleVisibility() {
    const daysTitle = this._sortingComponent.getElement().querySelector(`.trip-sort__item`);
    daysTitle.textContent = this._isSorted ? `` : DAYS_TITLE;
  }

  _sortEventsByType(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this._events.sort(sortEventsByPrice);
        this._isSorted = true;

        break;

      case SortType.TIME:
        this._events.sort(sortEventsByTime);
        this._isSorted = true;

        break;

      default:
        this._events = this._defaultEventsList.slice();
        this._isSorted = false;
    }

    this._sort = sortType;
    this._toggleDaysTitleVisibility();
  }

  _sortTypeChangeHandler(evt) {
    const sortType = evt.target.dataset.sort.toLowerCase();

    if (this._sort !== sortType) {
      this._sortEventsByType(sortType);
      this._clearEventsList();
      this._renderEvents();
    }
  }

  _clearEventsList() {
    this._daysComponent.getElement().innerHTML = ``;
  }

  _renderNoEvents() {
    render(this._tripContainer, this._noEventsComponent, RenderPosition.BEFOREEND);
  }

  _renderSorting() {
    render(this._tripContainer, this._sortingComponent, RenderPosition.BEFOREEND);

    this._sortingComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
  }

  _renderDays() {
    render(this._tripContainer, this._daysComponent, RenderPosition.BEFOREEND);
  }

  _renderDay(container, number, startDate) {
    render(container, new DayItem(), RenderPosition.BEFOREEND);

    this._days = container.querySelectorAll(`.day`);

    this._renderDayInfo(this._days[this._days.length - 1], number, startDate, this._isSorted);

    this._renderEventsList(this._days[this._days.length - 1]);
  }

  _renderDayInfo(container, number, startDate, isEmpty) {
    render(container, new DayInfo(number, startDate, isEmpty), RenderPosition.BEFOREEND);
  }

  _renderEventsList(container) {
    render(container, new EventsList(), RenderPosition.BEFOREEND);
  }

  _renderEventWrapper(container) {
    render(container, new EventWrapper(), RenderPosition.BEFOREEND);
  }

  _renderEvent(eventWrapper, event) {
    const eventRegular = new Event(event);
    const eventEdit = new EventEditForm(event);

    const replaceEventToForm = () => {
      replace(eventEdit, eventRegular);

      eventEdit.setFormSubmitHandler(onEventEditFormSubmit);

      document.addEventListener(`keydown`, onEventEditFormEscKeyDown);
    };

    const replaceFormToEvent = () => {
      replace(eventRegular, eventEdit);
    };

    const onEventEditFormSubmit = () => {
      replaceFormToEvent();

      eventEdit.removeFormSubmitHandler();
      document.removeEventListener(`keydown`, onEventEditFormEscKeyDown);
    };

    const onEventEditFormEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();

        replaceFormToEvent();
      }
    };

    eventRegular.setClickHandler(() => {
      replaceEventToForm();
    });

    render(eventWrapper, eventRegular, RenderPosition.BEFOREEND);
  }

  _renderEvents() {
    const tripDays = this._tripContainer.querySelector(`.trip-days`);
    const tripStartDate = this._events[0].dateStart;

    let dayNumber = FIRST_DAY_NUMBER;
    let isSameDay = true;

    this._renderDay(tripDays, dayNumber, tripStartDate);

    for (let i = 0; i < this._events.length; i++) {
      let currentEvent = this._events[i];

      if (!this._isSorted) {
        let nextEvent = this._events[i + 1];

        if (!isSameDay) {
          this._renderDay(tripDays, dayNumber, currentEvent.dateStart);
        }

        if (nextEvent) {
          isSameDay = getDateData(currentEvent.dateStart) === getDateData(nextEvent.dateStart);

          dayNumber += getEventFullDays(currentEvent, nextEvent);
        }
      }

      const eventsList = this._days[this._days.length - 1].querySelector(`.trip-events__list`);
      this._renderEventWrapper(eventsList);

      const eventWrappers = eventsList.querySelectorAll(`.trip-events__item`);
      this._renderEvent(eventWrappers[eventWrappers.length - 1], currentEvent);
    }
  }

  init() {
    if (this._events.length === 0) {
      this._renderNoEvents();
    } else {
      this._defaultEventsList = this._events.slice();

      this._renderSorting();
      this._renderDays();
      this._renderEvents();
    }
  }
}
