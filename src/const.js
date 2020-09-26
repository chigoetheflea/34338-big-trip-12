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

const DESTINATION = [
  {
    name: `Amsterdam`,
    description: `Amsterdam - Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. `,
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=1`,
        description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit`
      }
    ]
  },
  {
    name: `Geneva`,
    description: `Geneva - Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.`,
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=2`,
        description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit`
      }
    ]
  },
  {
    name: `Chamonix`,
    description: `Chamonix - Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.`,
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=3`,
        description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit`
      }
    ]
  },
  {
    name: `Saint Petersburg`,
    description: `Saint Petersburg - Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.`,
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=4`,
        description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit`
      }
    ]
  },
  {
    name: `Antananarivo`,
    description: `Antananarivo - Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec.`,
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=5`,
        description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit`
      }
    ]
  },
  {
    name: `Reykjavik`,
    description: `Reykjavik - Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.`,
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=6`,
        description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit`
      }
    ]
  },
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

const OFFERS = [
  {
    type: `taxi`,
    offers: [
      {
        title: `Silent driver`,
        price: `100`
      },
      {
        title: `Smoking`,
        price: `20`
      },
      {
        title: `Minivan`,
        price: `200`
      },
      {
        title: `With animals`,
        price: `150`
      },
      {
        title: `Limousine`,
        price: `500`
      }
    ]
  },
  {
    type: `flight`,
    offers: [
      {
        title: `First class`,
        price: `1000`
      },
      {
        title: `Kosher food`,
        price: `50`
      },
      {
        title: `Without children`,
        price: `350`
      }
    ]
  },
  {
    type: `bus`,
    offers: [
      {
        title: `Conditioner`,
        price: `10`
      },
      {
        title: `Without stopping`,
        price: `100`
      },
      {
        title: `Toilet`,
        price: `50`
      }
    ]
  },
  {
    type: `train`,
    offers: [
      {
        title: `Restauraunt`,
        price: `80`
      },
      {
        title: `Private railcar`,
        price: `1000`
      }
    ]
  },
  {
    type: `ship`,
    offers: [
      {
        title: `No seasickness`,
        price: `500`
      }
    ]
  },
  {
    type: `transport`,
    offers: [
      {
        title: `Luggage`,
        price: `10`
      }
    ]
  },
  {
    type: `drive`,
    offers: [
      {
        title: `Sportcar`,
        price: `500`
      },
      {
        title: `Bike`,
        price: `100`
      }
    ]
  },
  {
    type: `restaurant`,
    offers: [
      {
        title: `Vegan`,
        price: `666`,
        slug: `vegan`
      }
    ]
  }
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
  MAJOR: `MAJOR`
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
  DESTINATION,
  OFFERS,
  MONTHES,
  SortType,
  UserAction,
  UpdateType,
  Filter,
  Key,
  MenuItem
};
