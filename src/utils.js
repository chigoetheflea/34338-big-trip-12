const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);

      break;

    case RenderPosition.BEFOREEND:
      container.append(element);

      break;

    default:
      container.append(element);
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const renderElement = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomBoolean = () => {
  return Boolean(getRandomInteger(0, 1));
};

const isItNeedsZero = (source) => {
  return source < 10 ? `0` + source : source;
};

const getDateData = (dateData, format = ``) => {
  let minutes = isItNeedsZero(dateData.getMinutes());
  let hours = isItNeedsZero(dateData.getHours());
  let day = isItNeedsZero(dateData.getDate());
  let month = isItNeedsZero(dateData.getMonth() + 1);
  let year = dateData.getFullYear();

  const time = `${hours}:${minutes}`;

  switch (format) {
    case `in-list`:
      const date = `${dateData.getFullYear()}-${month}-${day}T${time}`;

      return {
        time,
        date
      };

    case `in-form`:
      year = isItNeedsZero(year % 100);

      return `${day}/${month}/${year} ${time}`;

    default:
      return `${year}-${month}-${day}`;
  }
};

const getRandomArrayElement = (source) => {
  const randomIndex = getRandomInteger(0, source.length - 1);

  return source[randomIndex];
};

const getShuffledArray = (source) => {
  for (let i = source.length - 1; i > 0; i--) {
    let randomIndex = getRandomInteger(0, i);
    [source[i], source[randomIndex]] = [source[randomIndex], source[i]];
  }

  return source;
};

const sortEventsByDate = (left, right) => {
  if (left.dateStart < right.dateStart) {
    return -1;
  }

  if (left.dateStart > right.dateStart) {
    return 1;
  }

  return 0;
};

const getEventFullDays = (eventCurrent, eventNext) => {
  const eventCurrentMidnight = new Date(+eventCurrent.dateStart);
  eventCurrentMidnight.setHours(0, 0, 0, 0);

  const eventNextMidnight = new Date(+eventNext.dateStart);
  eventNextMidnight.setHours(0, 0, 0, 0);

  const diffInDays = Math.floor((eventNextMidnight - eventCurrentMidnight) / (1000 * 60 * 60 * 24));

  return diffInDays;
};

export {
  RenderPosition,
  renderElement,
  render,
  getRandomInteger,
  getRandomBoolean,
  getRandomArrayElement,
  getShuffledArray,
  getDateData,
  isItNeedsZero,
  sortEventsByDate,
  getEventFullDays
};
