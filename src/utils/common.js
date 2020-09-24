const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomBoolean = () => {
  return Boolean(getRandomInteger(0, 1));
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

const setFirstLetterUpperCase = (source) => {
  if (!source) {
    return source;
  }

  return source[0].toUpperCase() + source.slice(1);
};

export {
  getRandomBoolean,
  getRandomInteger,
  getRandomArrayElement,
  getShuffledArray,
  setFirstLetterUpperCase
};
