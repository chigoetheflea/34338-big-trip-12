const EVENT_TYPES = {
  Transfer: [
    `taxi`,
    `bus`,
    `train`,
    `ship`,
    `transport`,
    `drive`,
    `flight`
  ],
  Activity: [
    `check-in`,
    `sightseeing`,
    `restaurant`
  ]
};

const CITIES = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
  `Saint Petersburg`,
  `Antananarivo`,
  `Reykjavik`
];

const MONTHES = [
  `JAN`,
  `FEB`,
  `MAR`,
  `APR`,
  `MAY`,
  `JUN`,
  `JUL`,
  `AUG`,
  `SEP`,
  `OCT`,
  `NOV`,
  `DEC`
];

const SortType = {
  DEFAULT: `default`,
  PRICE: `price`,
  TIME: `time`
};

const UserAction = {
  UPDATE_EVENT: `UPDATE_EVENT`,
  ADD_EVENT: `ADD_EVENT`,
  DELETE_EVENT: `DELETE_EVENT`
};

const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

const Filter = {
  EVERYTHING: `Everything`,
  FUTURE: `Future`,
  PAST: `Past`
};

const Key = {
  ESC: `Esc`,
  ESCAPE: `Escape`,
  DELETE: `Delete`,
  ENTER: `Enter`,
  BACKSPACE: `Backspace`
};

const MenuItem = {
  TABLE: `table`,
  STATS: `stats`
};

export {
  EVENT_TYPES,
  CITIES,
  MONTHES,
  SortType,
  UserAction,
  UpdateType,
  Filter,
  Key,
  MenuItem
};
