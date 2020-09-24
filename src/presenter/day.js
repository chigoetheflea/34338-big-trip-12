import DayItem from "../view/day-item.js";
import EventPresenter from "../presenter/event.js";
import {render, remove, RenderPosition} from "../utils/render.js";

export default class DayPresenter {
  constructor(container, number, startDate, isEmpty, changeData, changeMode, placesList, offersList) {
    this._container = container;
    this._number = number;
    this._date = startDate;
    this._isEmpty = isEmpty;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._placesList = placesList;
    this._offersList = offersList;

    this._eventPresenters = {};
  }

  init() {
    this._day = new DayItem(this._number, this._date, this._isEmpty);
    this._eventContainer = this._day.getElement().querySelector(`.trip-events__list`);

    render(this._container, this._day, RenderPosition.BEFOREEND);
  }

  addEvent(event) {
    const eventPresenter = new EventPresenter(
        this._eventContainer,
        this._day,
        this._changeData,
        this._changeMode,
        this._placesList,
        this._offersList
    );

    eventPresenter.build(event);

    this._eventPresenters[event.id] = eventPresenter;
  }

  updateEvent(event) {
    this._eventPresenters[event.id].build(event);
  }

  resetEventsView() {
    Object.values(this._eventPresenters).forEach((presenter) => presenter.resetView());
  }

  destroy() {
    Object.values(this._eventPresenters).forEach((presenter) => presenter.destroy());
    this._eventPresenters = {};

    remove(this._day);
  }
}
