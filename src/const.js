const EVENT_TYPES = {
  Transfer: [
    `Taxi`,
    `Bus`,
    `Train`,
    `Ship`,
    `Transport`,
    `Drive`,
    `Flight`
  ],
  Activity: [
    `Check-in`,
    `Sightseeing`,
    `Restaurant`
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

const OFFERS = {
  Taxi: [
    {
      title: `Silent driver`,
      price: `100`,
      slug: `silent-driver`
    },
    {
      title: `Smoking`,
      price: `20`,
      slug: `smoking`
    },
    {
      title: `Minivan`,
      price: `200`,
      slug: `minivan`
    },
    {
      title: `With animals`,
      price: `150`,
      slug: `with-animals`
    },
    {
      title: `Limousine`,
      price: `500`,
      slug: `limousine`
    }
  ],
  Flight: [
    {
      title: `First class`,
      price: `1000`,
      slug: `first-class`
    },
    {
      title: `Kosher food`,
      price: `50`,
      slug: `kosher-food`
    },
    {
      title: `Without children`,
      price: `350`,
      slug: `without-children`
    }
  ],
  Bus: [
    {
      title: `Conditioner`,
      price: `10`,
      slug: `conditioner`
    },
    {
      title: `Without stopping`,
      price: `100`,
      slug: `without-stopping`
    },
    {
      title: `Toilet`,
      price: `50`,
      slug: `toilet`
    }
  ],
  Train: [
    {
      title: `Restauraunt`,
      price: `80`,
      slug: `restauraunt`
    },
    {
      title: `Private railcar`,
      price: `1000`,
      slug: `private-railcar`
    }
  ],
  Ship: [
    {
      title: `No seasickness`,
      price: `500`,
      slug: `no-seasickness`
    }
  ],
  Transport: [
    {
      title: `Luggage`,
      price: `10`,
      slug: `luggage`
    }
  ],
  Drive: [
    {
      title: `Sportcar`,
      price: `500`,
      slug: `sportcar`
    },
    {
      title: `Bike`,
      price: `100`,
      slug: `bike`
    }
  ],
  Restaurant: [
    {
      title: `Vegan`,
      price: `666`,
      slug: `vegan`
    }
  ]
};

export {
  EVENT_TYPES,
  CITIES,
  OFFERS,
  MONTHES
};
