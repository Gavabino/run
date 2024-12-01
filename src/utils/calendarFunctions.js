import moment from "moment";

let EmptyCalendar = [
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

export function setCalendarDates(calendarData, month, year) {
    const numberOfDays = moment(`${year}-${month}`, "YYYY-MM").daysInMonth();
    let startDate = moment(`${year}-${month}`);
    let startDay = startDate.day();
    if (startDay === 0) {
        startDay = 7;
    }
    let currentDay = 1;
    calendarData?.forEach((week) => {
        week.map(day => {
                if (calendarData.indexOf(week) === 0) {
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
    calendarData.forEach((week) => {
        let disabledCount = 0;
        week.forEach(day => {
            if (Object.values(day).includes(true)) {
                disabledCount++;
            }
        })
        if (disabledCount === 7) {
            console.log("delete week")
            calendarData = calendarData.filter((w) => w !== week)
        }
    })
    return calendarData;
}


export default EmptyCalendar;