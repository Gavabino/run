import React from "react";
import "./Dashboard.css"
import DashboardNav from "../../components/dashboard/DashboardNav";

function Dashboard() {
    return (
        <>
            <DashboardNav activeIndex={0}/>
        </>
    );
}

export default Dashboard;
