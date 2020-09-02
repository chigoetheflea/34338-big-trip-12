import Abstract from "./abstract.js";

const createTripCostTemplate = (events) => {
  const totalPrice = events.map((event) => {
    let eventFullPrice = parseInt(event.price, 10);
    let eventOffersPrice = 0;

    if (event.offers.length) {
      eventOffersPrice = event.offers
        .map((offer) => parseInt(offer.price, 10))
        .reduce((left, right) => left + right);
    }

    return eventFullPrice + eventOffersPrice;
  }).reduce((left, right) => left + right);

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>`
  );
};

export default class TripCost extends Abstract {
  constructor(events) {
    super();

    this._events = events;
  }

  _getTemplate() {
    return createTripCostTemplate(this._events);
  }
}
