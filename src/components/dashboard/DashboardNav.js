import {Link} from "react-router-dom";
import "../welcome/Nav.css"
import WelcomeTitle from "./WelcomeTitle";

const DashboardNav = ({activeIndex}) => {
    return (
        <div className="navbar" style={{display: "flex", justifyContent: "space-between"}}>
            <WelcomeTitle/>
            <div className="buttons">
                <Link className={activeIndex === 0 ? "activeLink" : "link"} to="/dashboard">Dashboard</Link>
                <Link className={activeIndex === 1 ? "activeLink" : "link"} to="/calendar">Calendar</Link>
                <Link className={activeIndex === 2 ? "activeLink" : "link"} to="/analytics">Analytics</Link>
            </div>
        </div>
    )
}

export default DashboardNav;
