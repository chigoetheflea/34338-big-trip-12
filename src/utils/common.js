const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (source) => {
  const randomIndex = getRandomInteger(0, source.length - 1);

  return source[randomIndex];
};

const setFirstLetterUpperCase = (source) => {
  if (!source) {
    return source;
  }

  return source[0].toUpperCase() + source.slice(1);
};

export {
  getRandomInteger,
  getRandomArrayElement,
  setFirstLetterUpperCase
};
