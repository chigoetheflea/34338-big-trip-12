import Abstract from "./abstract.js";

const createEventWrapperTemplate = () => {
  return (
    `<li class="trip-events__item"></li>`
  );
};

export default class EventWrapper extends Abstract {
  _getTemplate() {
    return createEventWrapperTemplate();
  }
}
