import Observer from "../utils/observer.js";
import moment from "moment";

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  _notify(updateType, update, updateDay = null) {
    this._observers.forEach((observer) => observer(updateType, update, updateDay));
  }

  setPoints(updateType, points) {
    this._points = points.slice();

    this._notify(updateType);
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update, updateDay) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting event`);
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update, updateDay);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting event`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(sourceEvent) {
    const adaptedEvent = Object.assign(
        {},
        sourceEvent,
        {
          price: sourceEvent.base_price,
          dateStart: moment(sourceEvent.date_from).toDate(),
          dateEnd: moment(sourceEvent.date_to).toDate(),
          isFavorite: sourceEvent.is_favorite
        }
    );

    delete adaptedEvent.base_price;
    delete adaptedEvent.date_from;
    delete adaptedEvent.date_to;
    delete adaptedEvent.is_favorite;

    return adaptedEvent;
  }

  static adaptToServer(sourceEvent) {
    const adaptedEvent = Object.assign(
        {},
        sourceEvent,
        {
          "base_price": Number(sourceEvent.price),
          "date_from": sourceEvent.dateStart instanceof Date ? sourceEvent.dateStart.toISOString() : null,
          "date_to": sourceEvent.dateEnd instanceof Date ? sourceEvent.dateEnd.toISOString() : null,
          "is_favorite": sourceEvent.isFavorite,
          "type": sourceEvent.type.toLowerCase()
        }
    );

    delete adaptedEvent.price;
    delete adaptedEvent.dateStart;
    delete adaptedEvent.dateEnd;
    delete adaptedEvent.isFavorite;

    return adaptedEvent;
  }
}
