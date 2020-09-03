import Abstract from "./abstract.js";

const createEventsListTemplate = () => {
  return (
    `<ul class="trip-events__list"></ul>`
  );
};

export default class EventsList extends Abstract {
  _getTemplate() {
    return createEventsListTemplate();
  }
}
