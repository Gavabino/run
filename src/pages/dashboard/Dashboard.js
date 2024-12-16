import React from "react";
import "./Dashboard.css"
import DashboardNav from "../../components/dashboard/Navbar/DashboardNav";
import CurrentDayView from "../../components/dashboard/CurrentDayView";
import {DashboardProvider} from "../../contexts/DashboardContext";
import {CalendarProvider} from "../../contexts/CalendarContext";

function Dashboard() {
    return (
        <DashboardProvider>
            <CalendarProvider>
                <DashboardNav activeIndex={0}/>
                <CurrentDayView/>
            </CalendarProvider>
        </DashboardProvider>
    );
}

export default Dashboard;
