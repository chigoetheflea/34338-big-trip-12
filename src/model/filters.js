import Observer from "../utils/observer.js";
import {Filter} from "../const.js";

export default class Filters extends Observer {
  constructor() {
    super();

    this._activeFilter = Filter.EVERYTHING;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;

    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
