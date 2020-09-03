const isItNeedsZero = (source) => {
  return source < 10 ? `0` + source : source;
};

const getDateData = (dateData, format = ``) => {
  let minutes = isItNeedsZero(dateData.getMinutes());
  let hours = isItNeedsZero(dateData.getHours());
  let day = isItNeedsZero(dateData.getDate());
  let month = isItNeedsZero(dateData.getMonth() + 1);
  let year = dateData.getFullYear();

  const time = `${hours}:${minutes}`;

  switch (format) {
    case `in-list`:
      const date = `${dateData.getFullYear()}-${month}-${day}T${time}`;

      return {
        time,
        date
      };

    case `in-form`:
      year = isItNeedsZero(year % 100);

      return `${day}/${month}/${year} ${time}`;

    default:
      return `${year}-${month}-${day}`;
  }
};

const sortEventsByDate = (left, right) => {
  if (left.dateStart < right.dateStart) {
    return -1;
  }

  if (left.dateStart > right.dateStart) {
    return 1;
  }

  return 0;
};

const getEventFullDays = (eventCurrent, eventNext) => {
  const eventCurrentMidnight = new Date(+eventCurrent.dateStart);
  eventCurrentMidnight.setHours(0, 0, 0, 0);

  const eventNextMidnight = new Date(+eventNext.dateStart);
  eventNextMidnight.setHours(0, 0, 0, 0);

  const diffInDays = Math.floor((eventNextMidnight - eventCurrentMidnight) / (1000 * 60 * 60 * 24));

  return diffInDays;
};

export {
  getDateData,
  isItNeedsZero,
  sortEventsByDate,
  getEventFullDays
};
