import React from "react";
import "./Calendar.css";
import ExpandedPreview from "./expandedPreview/ExpandedPreview";
import Nav from "../Nav";
import DatePicker from "./DatePicker";
import TableHeader from "./tableComponents/TableHeader";
import TableBody from "./tableComponents/TableBody";
import {useCalendar} from "../../contexts/CalendarContext";

function Calendar() {
    const {isShowing} = useCalendar();
    return (
        <div>
            <Nav currentpage={"App"}/>
            <div className="container">
                {isShowing && (
                    <ExpandedPreview/>
                )}
                <table>
                    <DatePicker/>
                    <TableHeader/>
                    <TableBody/>
                </table>
            </div>
        </div>
    );
}

export default Calendar;