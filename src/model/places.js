import Observer from "../utils/observer.js";

export default class Places extends Observer {
  constructor() {
    super();

    this._places = [];
  }

  setPlaces(places) {
    this._places = places.slice();
  }

  getPlaces() {
    return this._places;
  }
}
