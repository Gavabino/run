import {createContext, useContext, useEffect, useState} from "react";
import {addWorkoutDoc, doesDocumentExist, getWorkoutDoc, unflatten} from "../utils/firestore";
import useCalendarFunctions from "../hooks/useCalendarFunctions";
import moment from "moment";

const DashboardContext = createContext({});
export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({children}) => {
    const [calendarData, setCalendarData] = useState([]);

    const {setCalendarDates, EmptyCalendar} = useCalendarFunctions();

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const key = `${moment().year()}-${moment().month() + 1}`;
                let doc = await getWorkoutDoc(key);
                let data;

                if (await doesDocumentExist(key)) {
                    data = unflatten(doc.data);
                } else {
                    const newCalendar = setCalendarDates(EmptyCalendar, (moment().month() + 1), moment().year());
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
    }, []);

    const findDayInCalendar = () => {
        const date = `${moment().year()}-${moment().month() + 1}-${moment().date()}`;
        let currentDay;
        calendarData?.forEach((week) => {
            week.forEach(day => {
                if (day.date === date) {
                    currentDay = day;
                }
            })
        })
        return currentDay;
    }

    const value = {
        findDayInCalendar
    }
    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
};
