import React from "react";
import Calendar from "../components/calendar/Calendar";
import "./HomeScreen.css"
import {useAuth} from "../contexts/AuthContext";
import {CalendarProvider} from "../contexts/CalendarContext";

function HomeScreen() {
    const {currentUser} = useAuth()
    return (
        <CalendarProvider>
            <div className="container">
                <Calendar/>
                {currentUser != null ?
                    <h1>Hello, {currentUser.displayName ? currentUser.displayName : currentUser.email}</h1> :
                    <h1>Sign in to continue</h1>}
            </div>
        </CalendarProvider>
    );
}

export default HomeScreen;
