import moment from "moment";

let EmptyCalander = [
  [
    {
      id: 1,
      workouts: [],
    },
    {
      id: 2,
      workouts: [],
    },
    {
      id: 3,
      workouts: [],
    },
    {
      id: 4,
      workouts: [],
    },
    {
      id: 5,
      workouts: [],
    },
    {
      id: 6,
      workouts: [],
    },
    {
      id: 7,
      workouts: [],
    },
  ],
  [
    {
      id: 1,
      workouts: [],
    },
    {
      id: 2,
      workouts: [],
    },
    {
      id: 3,
      workouts: [],
    },
    {
      id: 4,
      workouts: [],
    },
    {
      id: 5,
      workouts: [],
    },
    {
      id: 6,
      workouts: [],
    },
    {
      id: 7,
      workouts: [],
    },
  ],
  [
    {
      id: 1,
      workouts: [],
    },
    {
      id: 2,
      workouts: [],
    },
    {
      id: 3,
      workouts: [],
    },
    {
      id: 4,
      workouts: [],
    },
    {
      id: 5,
      workouts: [],
    },
    {
      id: 6,
      workouts: [],
    },
    {
      id: 7,
      workouts: [],
    },
  ],
  [
    {
      id: 1,
      workouts: [],
    },
    {
      id: 2,
      workouts: [],
    },
    {
      id: 3,
      workouts: [],
    },
    {
      id: 4,
      workouts: [],
    },
    {
      id: 5,
      workouts: [],
    },
    {
      id: 6,
      workouts: [],
    },
    {
      id: 7,
      workouts: [],
    },
  ],
  [
    {
      id: 1,
      workouts: [],
    },
    {
      id: 2,
      workouts: [],
    },
    {
      id: 3,
      workouts: [],
    },
    {
      id: 4,
      workouts: [],
    },
    {
      id: 5,
      workouts: [],
    },
    {
      id: 6,
      workouts: [],
    },
    {
      id: 7,
      workouts: [],
    },
  ],
  [
    {
      id: 1,
      workouts: [],
    },
    {
      id: 2,
      workouts: [],
    },
    {
      id: 3,
      workouts: [],
    },
    {
      id: 4,
      workouts: [],
    },
    {
      id: 5,
      workouts: [],
    },
    {
      id: 6,
      workouts: [],
    },
    {
      id: 7,
      workouts: [],
    },
  ]
];

export function setCalanderDates(calanderData, month, year) {
  const numberOfDays = moment(`${year}-${month}`, "YYYY-MM").daysInMonth();
  let startDate = moment(`${year}-${month}`);
  let startDay = startDate.day();
  if (startDay === 0) {
    startDay = 7;
  }
  let currentDay = 1;
  calanderData?.forEach((week) => {
    week.map(day => {
      if (calanderData.indexOf(week) === 0) {
        if (day.id >= startDay) {
          day.date = `${year}-${month}-${currentDay}`
          day.dayNum = currentDay
          currentDay++;
          delete day.disabled
        } else {
          day.disabled = true;
        }
      } else {
        if (currentDay <= numberOfDays) {
          day.date = `${year}-${month}-${currentDay}`
          day.dayNum = currentDay
          currentDay++;
          delete day.disabled
        } else {
          day.disabled = true;
          delete day.date
        }
      }
    }
  )
  });
  return calanderData;
}


export default EmptyCalander;