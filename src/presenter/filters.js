import Filters from "../view/filters.js";
import {remove, render, replace, RenderPosition} from "../utils/render.js";
import {UpdateType} from "../const.js";


export default class Filter {
  constructor(filtersContainer, filtersModel, eventsModel) {
    this._filtersContainer = filtersContainer;
    this._filtersModel = filtersModel;
    this._eventsModel = eventsModel;
    this._activeFilter = null;
    this._filterComponent = null;

    this._eventsChangeHandler = this._eventsChangeHandler.bind(this);
    this._filterChangeHandler = this._filterChangeHandler.bind(this);

    this._eventsModel.addObserver(this._eventsChangeHandler);
    this._filtersModel.addObserver(this._eventsChangeHandler);
  }

  _eventsChangeHandler() {
    this.init();
  }

  _filterChangeHandler(newFilter) {
    if (this._activeFilter === newFilter) {
      return;
    }

    this._filtersModel.setFilter(UpdateType.MAJOR, newFilter);
  }

  init() {
    this._activeFilter = this._filtersModel.getFilter();

    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new Filters(this._activeFilter);
    this._filterComponent.setFilterChangeHadler(this._filterChangeHandler);

    if (prevFilterComponent === null) {
      render(this._filtersContainer, this._filterComponent, RenderPosition.BEFOREEND);

      return;
    }

    replace(this._filterComponent, prevFilterComponent);

    remove(prevFilterComponent);
  }

  destroy() {
    remove(this._filterComponent);
  }
}
