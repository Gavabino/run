import {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import moment from "moment";
import {addWorkoutDoc, doesDocumentExist, getWorkoutDoc, unflatten} from "../utils/firestore";
import useCalendarFunctions from "../hooks/useCalendarFunctions";

const CalendarContext = createContext(undefined);

export const useCalendar = () => {
    return useContext(CalendarContext);
}

export const CalendarProvider = ({children}) => {
    const [date, setDate] = useState({month: moment().month() + 1, year: moment().year()});
    const [calendarData, setCalendarData] = useState([]);
    let [day, setDay] = useState({});
    let [week, setWeek] = useState([]);
    let [isShowing, setShowing] = useState(false);
    let [currentWorkout, setCurrentWorkout] = useState({});
    let [isCurrentWorkout, setIsCurrentWorkout] = useState(false);

    const {EmptyCalendar, setCalendarDates} = useCalendarFunctions()

    const increaseMonthDate = useCallback(() => {
        setDate((prevDate) => {
            if (prevDate.month === 12) {
                // Move to January of the next year
                return {month: 1, year: prevDate.year + 1};
            }
            // Increment the month
            return {...prevDate, month: prevDate.month + 1};
        });
        console.log("Date increased")
    }, []);

    const decreaseMonthDate = useCallback(() => {
        setDate((prevDate) => {
            if (prevDate.month === 1) {
                // Move to December of the previous year
                return {month: 12, year: prevDate.year - 1};
            }
            // Decrement the month
            return {...prevDate, month: prevDate.month - 1};
        });
        console.log("Date decreased")
    }, []);

    const month = date.month;
    const year = date.year;

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const key = `${year}-${month}`;
                let doc = await getWorkoutDoc(key);
                let data;

                if (await doesDocumentExist(key)) {
                    data = unflatten(doc.data);
                } else {
                    const newCalendar = setCalendarDates(EmptyCalendar, month, year);
                    await addWorkoutDoc(key, newCalendar);
                    doc = await getWorkoutDoc(key);
                    data = unflatten(doc.data);
                }

                if (isMounted) {
                    setCalendarData(data);
                }
            } catch (error) {
                console.error("Error fetching calendar data:", error);
            }
        };

        fetchData().catch((error) => {
            console.error("Error fetching calendar data:", error);
        });

        return () => {
            isMounted = false;
        };
    }, [month, year, EmptyCalendar, setCalendarDates]);

    const toggleShowing = (day, week) => {
        setShowing((prevShowing) => !prevShowing);
        setDay(day);
        setWeek(() => [...week]);
    }

    const setActiveWorkout = (workout) => {
        setCurrentWorkout(workout);
        setIsCurrentWorkout(true);
    };

    const removeWorkoutFromDay = (workout, date, currentDay) => {
        console.log("Remove workout", workout);
        return calendarData.map((week) =>
            week.map((day) =>
                currentDay.date === date
                    ? {...day, workouts: day.workouts.filter((w) => w !== workout)}
                    : {...day}
            )
        );
    };

    const removeItem = async (workout, currentDay) => {
        const updatedCalendarData = removeWorkoutFromDay(workout, day.date, currentDay);
        setCalendarData(updatedCalendarData); // Notify parent of the update
        await addWorkoutDoc(`${year}-${month}`, updatedCalendarData.flat());

        if (currentWorkout === workout) {
            setCurrentWorkout({});
            setIsCurrentWorkout(false);
        }
        console.log("Deleted workout:", workout);
    };

    const addWorkout = async (newWorkout) => {
        const updatedCalendarData = updateWorkoutsInDay(calendarData, day.date, newWorkout);
        setCalendarData(updatedCalendarData);
        await addWorkoutDoc(`${year}-${month}`, updatedCalendarData.flat());
    };

    const updateWorkoutsInDay = (calendarData, date, newWorkout) => {
        return calendarData.map((week) =>
            week.map((day) =>
                day.date === date
                    ? {...day, workouts: [...day.workouts, newWorkout]}
                    : day
            )
        );
    }

    const findWeekInCalendar = (targetWeek) => {
        return calendarData.find(
            (week) => JSON.stringify(week) === JSON.stringify(targetWeek)
        );
    };

    const value = useMemo(() => ({
        month,
        year,
        increaseMonthDate,
        decreaseMonthDate,
        calendarData,
        setCalendarData,
        day,
        setDay,
        week,
        setWeek,
        toggleShowing,
        isShowing,
        setShowing,
        currentWorkout,
        isCurrentWorkout,
        setIsCurrentWorkout,
        setActiveWorkout,
        removeItem,
        addWorkout,
        findWeekInCalendar,
    }), [month, year, calendarData, day, week, isShowing, currentWorkout, isCurrentWorkout, increaseMonthDate, decreaseMonthDate])
    return (
        <CalendarContext.Provider value={value}>
            {children}
        </CalendarContext.Provider>
    )
}