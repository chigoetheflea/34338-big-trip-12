import {EVENT_TYPES, OFFERS, DESTINATION} from "../const.js";
import {getRandomInteger, getRandomArrayElement, getShuffledArray, getRandomBoolean} from "../utils.js";

const MAX_MINUTES_JITTER = 60 * 140;
const MIN_PRICE = 100;
const MAX_PRICE = 1000;
const MAX_OFFERS_COUNT = 5;

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

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
  const availableOffers = OFFERS.filter((offer) => offer.type === eventType);

  if (availableOffers.length) {
    const shuffledOffers = getShuffledArray(availableOffers[0].offers);

    return shuffledOffers.slice(0, getRandomInteger(0, MAX_OFFERS_COUNT));
  }

  return ``;
};

export const generateEvent = () => {
  const eventType = getRandomEventType(EVENT_TYPES);
  const eventDates = getRandomDates();
  const offers = getRandomOffers(eventType);
  const destination = getRandomArrayElement(DESTINATION);

  return {
    id: generateId(),
    eventType,
    destination,
    dateStart: eventDates.dateStart,
    dateEnd: eventDates.dateEnd,
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
    offers,
    isFavorite: getRandomBoolean()
  };
};
