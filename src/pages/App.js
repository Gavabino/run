import React from 'react'
import Nav from '../components/Nav'
import {CalendarProvider} from "../contexts/CalendarContext";
import Calendar from "../components/calendar/Calendar";

function App() {
    return (
        <CalendarProvider>
            <Nav activeIndex={3}/>
            <Calendar/>
        </CalendarProvider>
    )
}

export default App