import TripInfo from "../view/trip-info.js";
import Menu from "../view/menu.js";
import FilterPresenter from "./filters.js";
import {filterAlgorithm} from "../utils/filter.js";
import Sorting from "../view/sorting.js";
import Days from "../view/days.js";
import NoEvents from "../view/no-events.js";

import DayPresenter from "../presenter/day.js";
import EventNewPresenter from "../presenter/eventNew.js";

import {remove, render, RenderPosition} from "../utils/render.js";
import {getDateData, getEventFullDays, sortEventsByTime, sortEventsByPrice, sortEventsByDate} from "../utils/events.js";
import {SortType, UpdateType, UserAction, Filter} from "../const.js";

const FIRST_DAY_NUMBER = 1;
const DAYS_TITLE = `Day`;

export default class Trip {
  constructor(headerContainer, tripContainer, eventsModel, destinationModel, offersModel, filtersModel) {
    this._eventsModel = eventsModel;
    this._offersModel = offersModel;
    this._destinationModel = destinationModel;
    this._filtersModel = filtersModel;

    this._headerContainer = headerContainer;
    this._tripContainer = tripContainer;
    this._sort = SortType.DEFAULT;
    this._isSorted = false;

    this._dayPresenters = {};

    this._menuComponent = new Menu();
    this._filterComponent = null;
    this._tripInfoComponent = null;
    this._noEventsComponent = new NoEvents();
    this._sortingComponent = null;
    this._daysComponent = new Days();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._modeChangeHandler = this._modeChangeHandler.bind(this);
    this._userActionHandler = this._userActionHandler.bind(this);
    this._modelChangeHandler = this._modelChangeHandler.bind(this);

    this._eventsModel.addObserver(this._modelChangeHandler);
    this._filtersModel.addObserver(this._modelChangeHandler);

    this._eventNewPresenter = new EventNewPresenter(
        this._daysComponent,
        this._userActionHandler,
        this._destinationModel.getPlaces(),
        this._offersModel.getOffers()
    );
  }

  _getEvents() {
    let events = this._eventsModel.getPoints();
    const activeFilter = this._filtersModel.getFilter();
    const filteredEvents = filterAlgorithm[activeFilter](events);

    switch (this._sort) {
      case SortType.PRICE:
        events = filteredEvents.sort(sortEventsByPrice);
        this._isSorted = true;

        break;

      case SortType.TIME:
        events = filteredEvents.sort(sortEventsByTime);
        this._isSorted = true;

        break;

      default:
        events = filteredEvents.sort(sortEventsByDate);
        this._isSorted = false;
    }

    this._toggleDaysTitleVisibility();

    return events;
  }

  _modeChangeHandler() {
    this._eventNewPresenter.destroy();

    Object.values(this._dayPresenters).forEach((presenter) => presenter.resetEventsView());
  }

  _toggleDaysTitleVisibility() {
    if (this._sortingComponent !== null) {
      const daysTitle = this._sortingComponent.getElement().querySelector(`.trip-sort__item`);
      daysTitle.textContent = this._isSorted ? `` : DAYS_TITLE;
    }
  }

  _sortTypeChangeHandler(evt) {
    const sortType = evt.target.dataset.sort.toLowerCase();

    if (this._sort !== sortType) {
      this._sort = sortType;

      this._clearTrip();
      this._renderTrip();
    }
  }

  _renderTripInfo() {
    if (this._tripInfoComponent !== null) {
      this._tripInfoComponent = null;
    }

    this._tripInfoComponent = new TripInfo(this._getEvents());

    render(this._headerContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderMenu(container) {
    if (this._menuComponent !== null) {
      this._menuComponent = null;
    }

    this._menuComponent = new Menu();

    render(container, this._menuComponent, RenderPosition.BEFOREEND);
  }

  _renderNoEvents() {
    if (this._noEventsComponent !== null) {
      this._noEventsComponent = null;
    }

    this._noEventsComponent = new NoEvents();

    render(this._tripContainer, this._noEventsComponent, RenderPosition.BEFOREEND);
  }

  _renderSorting() {
    if (this._sortingComponent !== null) {
      this._sortingComponent = null;
    }

    this._sortingComponent = new Sorting(this._sort);
    this._sortingComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);

    render(this._tripContainer, this._sortingComponent, RenderPosition.BEFOREEND);
  }

  _renderDays() {
    render(this._tripContainer, this._daysComponent, RenderPosition.BEFOREEND);
  }

  _renderDay(container, number, startDate) {
    const dayPresenter = new DayPresenter(
        container,
        number,
        startDate,
        this._isSorted,
        this._userActionHandler,
        this._modeChangeHandler,
        this._destinationModel.getPlaces(),
        this._offersModel.getOffers()
    );

    dayPresenter.init();

    this._dayPresenters[`day-${number}`] = dayPresenter;

    return dayPresenter;
  }

  _renderEvents() {
    const tripDays = this._tripContainer.querySelector(`.trip-days`);
    const events = this._getEvents();
    const tripStartDate = events[0].dateStart;

    let dayNumber = FIRST_DAY_NUMBER;
    let isSameDay = true;

    let currentDay = this._renderDay(tripDays, dayNumber, tripStartDate);

    for (let i = 0; i < events.length; i++) {
      let currentEvent = events[i];

      if (!this._isSorted) {
        let nextEvent = events[i + 1];

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

  _clearTrip(isFullReset = false) {
    this._eventNewPresenter.destroy();

    Object.values(this._dayPresenters).forEach((presenter) => presenter.destroy());
    this._dayPresenters = {};

    remove(this._sortingComponent);
    remove(this._noEventsComponent);

    if (isFullReset) {
      remove(this._tripInfoComponent);
      remove(this._menuComponent);

      this._filterComponent.destroy();

      this._sort = SortType.DEFAULT;
    }
  }

  _renderTrip(isFullRender = false) {
    if (isFullRender) {
      this._renderTripInfo();

      const tripControls = this._headerContainer.querySelector(`.trip-controls`);

      this._renderMenu(tripControls);

      this._filterComponent = new FilterPresenter(tripControls, this._filtersModel, this._eventsModel);

      this._filterComponent.init();
    }

    if (this._getEvents().length === 0) {
      this._renderNoEvents();
    } else {
      this._renderSorting();

      this._renderDays();
      this._renderEvents();
    }
  }

  _modelChangeHandler(updateType, data, updatedDay) {
    switch (updateType) {
      case UpdateType.MAJOR:
        this._clearTrip(true);
        this._renderTrip(true);

        break;

      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();

        break;

      case UpdateType.PATCH:
        this._dayPresenters[`day-${updatedDay._dayNumber}`].updateEvent(data);

        break;
    }
  }

  _userActionHandler(actionType, updateType, update, updateDay = null) {
    switch (actionType) {
      case UserAction.ADD_EVENT:
        this._eventsModel.addPoint(updateType, update);

        break;

      case UserAction.DELETE_EVENT:
        this._eventsModel.deletePoint(updateType, update);

        break;

      case UserAction.UPDATE_EVENT:
        this._eventsModel.updatePoint(updateType, update, updateDay);

        break;
    }
  }

  createEvent() {
    this._sort = SortType.DEFAULT;
    this._filtersModel.setFilter(UpdateType.MAJOR, Filter.EVERYTHING);
    this._eventNewPresenter.build();
  }

  init() {
    this._renderTrip(true);
  }
}
