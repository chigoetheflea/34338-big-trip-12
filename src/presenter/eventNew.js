import EventEditForm from "../view/event-edit-form.js";
import {render, remove, RenderPosition} from "../utils/render.js";
import {UserAction, UpdateType, Key} from "../const.js";

export default class NewEventPresenter {
  constructor(eventWrapper, changeData, placesList, offersList) {
    this._container = eventWrapper;
    this._changeData = changeData;
    this._placesList = placesList;
    this._offersList = offersList;
    this._day = null;
    this._eventEdit = null;

    this._eventEditFormSubmitHandler = this._eventEditFormSubmitHandler.bind(this);
    this._eventEditFormEscKeyDownHandler = this._eventEditFormEscKeyDownHandler.bind(this);
    this._eventDeleteHandler = this._eventDeleteHandler.bind(this);
  }

  _eventDeleteHandler() {
    this.destroy();
  }

  _eventEditFormSubmitHandler(event) {
    this._changeData(
        UserAction.ADD_EVENT,
        UpdateType.MAJOR,
        event,
        this._day
    );

    document.removeEventListener(`keydown`, this._eventEditFormEscKeyDownHandler);
  }

  _eventEditFormEscKeyDownHandler(evt) {
    if (evt.key === Key.ESCAPE || evt.key === Key.ESC) {
      evt.preventDefault();

      this.destroy();
    }
  }

  setSavingState() {
    this._eventEdit.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAbortingState() {
    const resetFormState = () => {
      this._eventEdit.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._eventEdit.shake(resetFormState);
  }

  build() {
    if (this._eventEdit !== null) {
      return;
    }

    this._eventEdit = new EventEditForm(this._event, this._placesList, this._offersList, true);
    this._eventEdit.setFormSubmitHandler(this._eventEditFormSubmitHandler);
    this._eventEdit.setDeleteClickHandler(this._eventDeleteHandler);

    render(this._container, this._eventEdit, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._eventEditFormEscKeyDownHandler);
  }

  destroy() {
    if (this._eventEdit === null) {
      return;
    }

    remove(this._eventEdit);
    this._eventEdit = null;

    document.removeEventListener(`keydown`, this._eventEditFormEscKeyDownHandler);
  }
}
