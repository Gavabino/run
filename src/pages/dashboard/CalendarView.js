import DashboardNav from "../../components/dashboard/DashboardNav";
import {CalendarProvider} from "../../contexts/CalendarContext";
import Calendar from "../../components/calendar/Calendar";
import React from "react";

const CalendarView = () => {
    return (
        <>
            <DashboardNav activeIndex={1}/>
            <CalendarProvider>
                <Calendar/>
            </CalendarProvider>
        </>
    )
}
export default CalendarView;