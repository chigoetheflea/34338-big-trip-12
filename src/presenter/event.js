import Event from "../view/event.js";
import EventEditForm from "../view/event-edit-form.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class EventPresenter {
  constructor(eventWrapper, eventDay, changeData, changeMode) {
    this._container = eventWrapper;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._day = eventDay;

    this._eventRegular = null;
    this._eventEdit = null;
    this._mode = Mode.DEFAULT;

    this._eventRegularClickHandler = this._eventRegularClickHandler.bind(this);
    this._eventEditFormSubmitHandler = this._eventEditFormSubmitHandler.bind(this);
    this._eventEditFormEscKeyDownHandler = this._eventEditFormEscKeyDownHandler.bind(this);
    this._eventFavoritesClickHandler = this._eventFavoritesClickHandler.bind(this);
  }

  _replaceEventToForm() {
    replace(this._eventEdit, this._eventRegular);

    document.addEventListener(`keydown`, this._eventEditFormEscKeyDownHandler);


    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToEvent() {
    replace(this._eventRegular, this._eventEdit);

    this._mode = Mode.DEFAULT;
  }

  _eventEditFormSubmitHandler(event) {
    this._changeData(this._day, event);
    this._replaceFormToEvent();

    document.removeEventListener(`keydown`, this._eventEditFormEscKeyDownHandler);
  }

  _eventEditFormEscKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();

      this._replaceFormToEvent();
    }
  }

  _eventRegularClickHandler() {
    this._replaceEventToForm();
  }

  _eventFavoritesClickHandler() {
    this._changeData(this._day, Object.assign({}, this._event, {isFavorite: !this._event.isFavorite}));
  }

  build(event) {
    this._event = event;

    const eventRegularPrev = this._eventRegular;
    const eventEditPrev = this._eventEdit;

    this._eventRegular = new Event(this._event);
    this._eventEdit = new EventEditForm(this._event);

    this._eventRegular.setClickHandler(this._eventRegularClickHandler);
    this._eventEdit.setFavoriteClickHandler(this._eventFavoritesClickHandler);
    this._eventEdit.setFormSubmitHandler(this._eventEditFormSubmitHandler);

    if (eventEditPrev === null || eventRegularPrev === null) {
      render(this._container, this._eventRegular, RenderPosition.BEFOREEND);

      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventRegular, eventRegularPrev);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._eventEdit, eventEditPrev);
    }
  }

  destroy() {
    remove(this._eventRegular);
    remove(this._eventEdit);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToEvent();
    }
  }
}
