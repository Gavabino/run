import moment from "moment";

let EmptyCalender = [
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

export function setCalenderDates(calenderData, month, year) {
    const numberOfDays = moment(`${year}-${month}`, "YYYY-MM").daysInMonth();
    let startDate = moment(`${year}-${month}`);
    let startDay = startDate.day();
    if (startDay === 0) {
        startDay = 7;
    }
    let currentDay = 1;
    calenderData?.forEach((week) => {
        week.map(day => {
                if (calenderData.indexOf(week) === 0) {
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
    calenderData.forEach((week) => {
        let disabledCount = 0;
        week.forEach(day => {
            if (Object.values(day).includes(true)) {
                disabledCount++;
            }
        })
        if (disabledCount === 7) {
            console.log("delete week")
            calenderData = calenderData.filter((w) => w !== week)
        }
    })
    return calenderData;
}


export default EmptyCalender;