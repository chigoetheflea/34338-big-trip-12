import TripInfo from "../view/trip-info.js";
import TripRout from "../view/trip-rout.js";
import TripCost from "../view/trip-cost.js";
import Menu from "../view/menu.js";
import Filters from "../view/filters.js";

import {render, RenderPosition} from "../utils/render.js";

export default class Header {
  constructor(container, events) {
    this._headerContainer = container;
    this._events = events;

    this._menuComponent = new Menu();
    this._filtersComponent = new Filters();
    this._tripInfoComponent = new TripInfo();
  }

  _renderTripInfo() {
    render(this._headerContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);

    const tripInfo = this._headerContainer.querySelector(`.trip-info`);

    render(tripInfo, new TripRout(this._events), RenderPosition.BEFOREEND);
    render(tripInfo, new TripCost(this._events), RenderPosition.BEFOREEND);
  }

  _renderMenu(container) {
    render(container, new Menu(), RenderPosition.BEFOREEND);
  }

  _renderFilters(container) {
    render(container, new Filters(), RenderPosition.BEFOREEND);
  }

  init() {
    this._renderTripInfo();

    const tripControls = this._headerContainer.querySelector(`.trip-controls`);

    this._renderMenu(tripControls);
    this._renderFilters(tripControls);
  }
}
