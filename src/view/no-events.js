import Abstract from "./abstract.js";

const createNoEvetsTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

export default class NoEvents extends Abstract {
  _getTemplate() {
    return createNoEvetsTemplate();
  }
}
