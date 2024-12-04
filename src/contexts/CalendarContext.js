import {createContext, useCallback, useContext, useEffect, useState} from "react";
import moment from "moment";
import {addWorkoutDoc, doesDocumentExist, getWorkoutDoc, unflatten} from "../utils/firestore";
import EmptyCalendar, {setCalendarDates} from "../utils/calendarFunctions";

const CalendarContext = createContext();

export const useCalendar = () => {
    return useContext(CalendarContext);
}
export const CalendarProvider = ({children}) => {
    const [date, setDate] = useState({month: moment().month() + 1, year: moment().year()});
    const [calendarData, setCalendarData] = useState([]);
    let [day, setDay] = useState({});
    let [week, setWeek] = useState([]);

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

    const fetchCalendarData = async () => {
        const key = `${year}-${month}`;
        let doc = await getWorkoutDoc(key);
        let data;

        if (await doesDocumentExist(key)) {
            data = unflatten(doc.data);
            console.log("Entry retrieved");
        } else {
            let newCalendar = setCalendarDates(EmptyCalendar, month, year)
            await addWorkoutDoc(key, newCalendar);
            doc = await getWorkoutDoc(key);
            data = unflatten(doc.data);
            console.log("Entry created");
        }
        setCalendarData(data);
        console.log(calendarData)
    };

    useEffect(() => {
        fetchCalendarData().catch((error) => {
            console.error(error);
        });
    }, [month, year]);
    const value = {
        month,
        year,
        increaseMonthDate,
        decreaseMonthDate,
        fetchCalendarData,
        calendarData,
        setCalendarData,
        day,
        setDay,
        week,
        setWeek
    }
    return (
        <CalendarContext.Provider value={value}>
            {children}
        </CalendarContext.Provider>
    )
}