import Sorting from "../view/sorting.js";
import Days from "../view/days.js";
import NoEvents from "../view/no-events.js";

import DayPresenter from "../presenter/day.js";

import {render, RenderPosition} from "../utils/render.js";
import {getDateData, getEventFullDays, sortEventsByTime, sortEventsByPrice} from "../utils/events.js";
import {updateItem} from "../utils/common.js";
import {SortType} from "../const.js";

const FIRST_DAY_NUMBER = 1;
const DAYS_TITLE = `Day`;

export default class Trip {
  constructor(container, events) {
    this._tripContainer = container;
    this._events = events;
    this._sort = SortType.DEFAULT;
    this._isSorted = false;

    this._dayPresenters = {};

    this._noEventsComponent = new NoEvents();
    this._sortingComponent = new Sorting();
    this._daysComponent = new Days();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._eventChangeHandler = this._eventChangeHandler.bind(this);
    this._modeChangeHandler = this._modeChangeHandler.bind(this);
  }

  _modeChangeHandler() {
    Object.values(this._dayPresenters).forEach((presenter) => presenter.resetEventsView());
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
        this._events = this._defaultEvents.slice();
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
    Object.values(this._dayPresenters).forEach((presenter) => presenter.destroy());
    this._dayPresenters = {};
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
    const dayPresenter = new DayPresenter(container, number, startDate, this._isSorted, this._eventChangeHandler, this._modeChangeHandler);
    dayPresenter.init();

    this._dayPresenters[`day-${number}`] = dayPresenter;

    return dayPresenter;
  }

  _renderEvents() {
    const tripDays = this._tripContainer.querySelector(`.trip-days`);
    const tripStartDate = this._events[0].dateStart;

    let dayNumber = FIRST_DAY_NUMBER;
    let isSameDay = true;

    let currentDay = this._renderDay(tripDays, dayNumber, tripStartDate);

    for (let i = 0; i < this._events.length; i++) {
      let currentEvent = this._events[i];

      if (!this._isSorted) {
        let nextEvent = this._events[i + 1];

        if (!isSameDay) {
          currentDay = this._renderDay(tripDays, dayNumber, currentEvent.dateStart);
        }

        if (nextEvent) {
          isSameDay = getDateData(currentEvent.dateStart) === getDateData(nextEvent.dateStart);

          dayNumber += getEventFullDays(currentEvent, nextEvent);
        }
      }

      currentDay.addEvent(currentEvent);
    }
  }

  _eventChangeHandler(updatedDay, updatedEvent) {
    this._events = updateItem(this._events, updatedEvent);
    this._defaultEvents = updateItem(this._defaultEvents, updatedEvent);

    this._dayPresenters[`day-${updatedDay._dayNumber}`].updateEvent(updatedEvent);
  }

  init() {
    if (this._events.length === 0) {
      this._renderNoEvents();
    } else {
      this._defaultEvents = this._events.slice();

      this._renderSorting();
      this._renderDays();
      this._renderEvents();
    }
  }
}
