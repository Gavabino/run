import React from "react";
import "./Calendar.css";
import ExpandedPreview from "./expandedPreview/ExpandedPreview";
import DatePicker from "./tableComponents/DatePicker";
import TableHeader from "./tableComponents/TableHeader";
import TableBody from "./tableComponents/TableBody";
import {useCalendar} from "../../contexts/CalendarContext";

function Calendar() {
    const {isShowing} = useCalendar();
    return (
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
    );
}

export default Calendar;