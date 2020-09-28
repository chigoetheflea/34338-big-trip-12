import Points from "./model/points.js";

const Method = {
  GET: `GET`,
  PUT: `PUT`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getEvents() {
    return this._load({url: `points`})
      .then(Api.toJSON)
      .then((events) => events.map(Points.adaptToClient));
  }

  getOffers() {
    return this._load({url: `offers`})
      .then(Api.toJSON);
  }

  getPlaces() {
    return this._load({url: `destinations`})
      .then(Api.toJSON);
  }

  updateEvent(eventToUpdate) {
    return this._load({
      url: `points/${eventToUpdate.id}`,
      method: Method.PUT,
      body: JSON.stringify(Points.adaptToServer(eventToUpdate)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(Points.adaptToClient);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(
        `${this._endPoint}/${url}`,
        {method, body, headers}
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    const isError = response.status < SuccessHTTPStatusRange.MIN && response.status > SuccessHTTPStatusRange.MAX;

    if (isError) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
