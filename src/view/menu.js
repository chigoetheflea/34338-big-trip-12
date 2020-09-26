import Abstract from "./abstract.js";
import {MenuItem} from "../const.js";

const MENU_ITEM_ACTIVE_CLASS = `trip-tabs__btn--active`;

const createMenuTemplate = () => {
  return (
    `<div class="trip-controls__wrapper">
      <h2 class="visually-hidden">Switch trip view</h2>
      <nav class="trip-controls__trip-tabs  trip-tabs">
        <a class="trip-tabs__btn  trip-tabs__btn--active" data-menu="${MenuItem.TABLE}" href="#">Table</a>
        <a class="trip-tabs__btn" data-menu="${MenuItem.STATS}" href="#">Stats</a>
      </nav>
    </div>`
  );
};

export default class Menu extends Abstract {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  _getTemplate() {
    return createMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();

    this._callback.menuClick(evt.target.dataset.menu);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;

    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const items = this.getElement().querySelectorAll(`.trip-tabs__btn`);

    for (let item of items) {
      item.classList.remove(MENU_ITEM_ACTIVE_CLASS);
    }

    this.getElement().querySelector(`[data-menu=${menuItem}]`).classList.add(MENU_ITEM_ACTIVE_CLASS);
  }
}
