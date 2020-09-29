import Trip from "./presenter/trip.js";
import Points from "./model/points.js";
import Places from "./model/places.js";
import Offers from "./model/offers.js";
import Filters from "./model/filters.js";
import Api from "./api.js";

import {UpdateType} from "./const.js";

const AUTORIZATION = `Basic er883jdzbdw`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip/`;

const headerSection = document.querySelector(`.trip-main`);
const contentSection = document.querySelector(`.page-main .page-body__container`);

const api = new Api(END_POINT, AUTORIZATION);
const pointsModel = new Points();
const destinationModel = new Places();
const offersModel = new Offers();
const filtersModel = new Filters();

const tripPresenter = new Trip(
    headerSection,
    contentSection,
    pointsModel,
    destinationModel,
    offersModel,
    filtersModel,
    api
);

tripPresenter.init();

api.getOffers()
  .then((offers) => {
    offersModel.setOffers(offers);

    api.getPlaces()
      .then((places) => {
        destinationModel.setPlaces(places);

        api.getEvents()
          .then((events) => {
            pointsModel.setPoints(UpdateType.INIT, events);
          })
          .catch(() => {
            pointsModel.setPoints(UpdateType.INIT, []);
          });
      });
  })
  .catch(() => {
    tripPresenter.showError();
  });

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();

  tripPresenter.createEvent();
});


