import React from "react";
import Calendar from "../components/calendar/Calendar";
import "./HomeScreen.css"
import {CalendarProvider} from "../contexts/CalendarContext";

function HomeScreen() {
    return (
        <>
            <CalendarProvider>
                <Calendar/>
            </CalendarProvider>
        </>
    );
}

export default HomeScreen;
