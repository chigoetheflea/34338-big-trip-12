import Abstract from "./abstract.js";

const createAppErrorTemplate = () => {
  return `<p class="trip-events__msg">
    Application error
  </p>`;
};

export default class AppError extends Abstract {
  _getTemplate() {
    return createAppErrorTemplate();
  }
}
