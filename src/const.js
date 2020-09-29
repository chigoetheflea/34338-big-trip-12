const EventType = {
  TRANSFER: [
    `taxi`,
    `bus`,
    `train`,
    `ship`,
    `transport`,
    `drive`,
    `flight`
  ],
  ACTIVITY: [
    `check-in`,
    `sightseeing`,
    `restaurant`
  ]
};

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
  DELETE_EVENT: `DELETE_EVENT`,
  UPDATE_FAVORITES: `UPDATE_FAVORITES`
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
  MONTHES,
  EventType,
  SortType,
  UserAction,
  UpdateType,
  Filter,
  Key,
  MenuItem
};
