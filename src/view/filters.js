import Abstract from "./abstract.js";
import {Filter} from "../const.js";
import {setFirstLetterUpperCase} from "../utils/common.js";

const createFiltersTemplate = (activeFilter) => {
  return (
    `<div class="trip-controls__wrapper">
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        <div class="trip-filters__filter">
          <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${(activeFilter === Filter.EVERYTHING) ? `checked` : ``}>
          <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${(activeFilter === Filter.FUTURE) ? `checked` : ``}>
          <label class="trip-filters__filter-label" for="filter-future">Future</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${(activeFilter === Filter.PAST) ? `checked` : ``}>
          <label class="trip-filters__filter-label" for="filter-past">Past</label>
        </div>

        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    </div>`
  );
};

export default class Filters extends Abstract {
  constructor(activeFilter) {
    super();

    this._activeFilter = activeFilter;
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
  }

  _getTemplate() {
    return createFiltersTemplate(this._activeFilter);
  }

  _filterChangeHandler(evt) {
    evt.preventDefault();

    this._callback.filterChange(setFirstLetterUpperCase(evt.target.value));
  }

  setFilterChangeHadler(callback) {
    this._callback.filterChange = callback;

    this.getElement().addEventListener(`change`, this._filterChangeHandler);
  }
}
