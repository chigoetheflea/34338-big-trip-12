import Abstract from "./abstract.js";

const createDayItemTemplate = () => {
  return (
    `<li class="trip-days__item  day"></li>`
  );
};

export default class DayItem extends Abstract {
  _getTemplate() {
    return createDayItemTemplate();
  }
}
