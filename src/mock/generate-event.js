import {EVENT_TYPES, CITIES, OFFERS} from "../const.js";
import {getRandomInteger, getRandomArrayElement, getShuffledArray} from "../utils.js";

const DESCRIPTION_PHRASES = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const PHRASES_COUNT = 5;
const MAX_PHOTO_COUNT = 5;
const MAX_MINUTES_JITTER = 60 * 140;
const MIN_PRICE = 100;
const MAX_PRICE = 1000;
const MAX_OFFERS_COUNT = 5;

const getRandomDescription = () => {
  const shuffledPhrases = getShuffledArray(DESCRIPTION_PHRASES);

  return shuffledPhrases.slice(0, PHRASES_COUNT);
};

const getPhotoInfo = () => {
  const randomPhotoCount = getRandomInteger(0, MAX_PHOTO_COUNT);

  return new Array(randomPhotoCount).fill().map(() => `http://picsum.photos/248/152?r=${Math.random()}`);
};

const getRandomDates = () => {
  const currentDate = new Date();
  const dateStart = new Date();
  const dateEnd = new Date();

  let randomMinutes = getRandomInteger(0, MAX_MINUTES_JITTER);
  dateStart.setMinutes(currentDate.getMinutes() + randomMinutes);

  randomMinutes = randomMinutes + getRandomInteger(0, MAX_MINUTES_JITTER);
  dateEnd.setMinutes(currentDate.getMinutes() + randomMinutes);

  return {
    dateStart,
    dateEnd
  };
};

const getRandomEventType = (eventTypesData) => {
  const types = Object.values(eventTypesData);

  return getRandomArrayElement(types.flat());
};

const getRandomOffers = (eventType) => {
  const availableOffers = OFFERS[eventType];

  if (availableOffers) {
    const shuffledOffers = getShuffledArray(availableOffers);

    return shuffledOffers.slice(0, getRandomInteger(0, MAX_OFFERS_COUNT));
  }

  return ``;
};

export const generateEvent = () => {
  const eventType = getRandomEventType(EVENT_TYPES);
  const eventDates = getRandomDates();
  const offers = getRandomOffers(eventType);

  return {
    eventType,
    destination: getRandomArrayElement(CITIES),
    description: getRandomDescription(),
    photo: getPhotoInfo(),
    dateStart: eventDates.dateStart,
    dateEnd: eventDates.dateEnd,
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
    offers
  };
};
