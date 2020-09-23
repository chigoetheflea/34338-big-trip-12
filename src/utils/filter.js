import {Filter} from "../const.js";
import moment from "moment";

export const filterAlgorithm = {
  [Filter.EVERYTHING]: (events) => events,
  [Filter.FUTURE]: (events) => events.filter((event) => moment() < moment(event.dateStart)),
  [Filter.PAST]: (events) => events.filter((event) => moment() > moment(event.dateEnd)),
};
