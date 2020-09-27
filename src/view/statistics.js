import Abstract from "./smart.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {EVENT_TYPES} from "../const.js";
import moment from "moment";

const BAR_HEIGHT = 55;

const CtxHeight = {
  MONEY: BAR_HEIGHT * 10,
  TRANSPORT: BAR_HEIGHT * 7,
  TIME: BAR_HEIGHT * 10
};

const EventTypesIcons = {
  taxi: `🚕`,
  bus: `🚍`,
  train: `🚅`,
  ship: `🚢`,
  transport: `🚗`,
  drive: `🚲`,
  flight: `✈️`,
  [`check-in`]: `🏨`,
  sightseeing: `🗽`,
  restaurant: `🍕`
};

const getFilteredEvents = (events, type) => {
  return events.filter((event) => event.type === type);
};

const getSpendedMoneyByType = (events, type) => {
  let totalPrice = 0;

  const eventsByType = getFilteredEvents(events, type);

  eventsByType.map((event) => {
    totalPrice += Number(event.price);
  });

  return totalPrice;
};

const getSpendedMoney = (events, types) => {
  return types.map((type) => getSpendedMoneyByType(events, type));
};

const getEventTypesWithIcons = (eventTypes) => {
  return eventTypes.map((type) => `${EventTypesIcons[type]} ${type.toUpperCase()}`);
};

const renderMoneyChart = (moneyCtx, events) => {
  moneyCtx.height = CtxHeight.MONEY;

  const eventTypes = Object.values(EVENT_TYPES).flat();

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: getEventTypesWithIcons(eventTypes),
      datasets: [{
        data: getSpendedMoney(events, eventTypes),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const getTransferUsesNumber = (events, types) => {
  return types.map((type) => getFilteredEvents(events, type).length);
};

const renderTransportChart = (transportCtx, events) => {
  transportCtx.height = CtxHeight.TRANSPORT;

  const eventTypes = Object.values(EVENT_TYPES.Transfer);

  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: getEventTypesWithIcons(eventTypes),
      datasets: [{
        data: getTransferUsesNumber(events, eventTypes),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const getEventTypesFullTime = (events, eventTypes) => {
  const eventsFullTime = eventTypes.map((type) => {
    const eventsByType = getFilteredEvents(events, type);

    let eventsDuration = eventsByType.map((event) => {
      const duration = moment.duration(event.dateEnd - event.dateStart);

      return duration.days();
    });

    return eventsDuration.length ? eventsDuration.reduce((accumulator, item) => accumulator + item) : 0;
  });

  return eventsFullTime;
};

const renderTimeChart = (transportCtx, events) => {
  transportCtx.height = CtxHeight.TIME;

  const eventTypes = Object.values(EVENT_TYPES).flat();

  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: getEventTypesWithIcons(eventTypes),
      datasets: [{
        data: getEventTypesFullTime(events, eventTypes),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val} D`
        }
      },
      title: {
        display: true,
        text: `TIME SPEND`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const createStatisticTemplate = () => {
  return `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`;
};

export default class Statistics extends Abstract {
  constructor(events) {
    super();

    this._events = events;
    this._moneyChart = null;
    this._transportChart = null;
    this._timeChart = null;

    this._setCharts();
  }

  _getTemplate() {
    return createStatisticTemplate();
  }

  _setCharts() {
    if (this._moneyChart !== null || this._transportChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._transportChart = null;
      this._timeChart = null;
    }

    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const transportCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeCtx = this.getElement().querySelector(`.statistics__chart--time`);

    this._moneyChart = renderMoneyChart(moneyCtx, this._events);
    this._transportChart = renderTransportChart(transportCtx, this._events);
    this._timeChart = renderTimeChart(timeCtx, this._events);
  }

  removeElement() {
    super.removeElement();

    if (this._moneyChart !== null || this._transportChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._transportChart = null;
      this._timeChart = null;
    }
  }
}
