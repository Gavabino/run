import "../Calendar.css"
import React from "react";
import {useCalendar} from "../../../contexts/CalendarContext";

const EmptyCalendarSlot = ({day, week}) => {
    const {toggleShowing} = useCalendar();
    return (
        <td key={day.date} className={"" + day.disabled}>
            <div className="entryContainer">
                {"dayNum" in day && <p className="date">{day.dayNum}</p>}
                <button onClick={() => toggleShowing(day, week)} className="add">
                    Add Workout
                </button>
                <button className="expand" onClick={() => toggleShowing(day, week)}>
                    {" "}
                    &#8600;
                </button>
            </div>
        </td>
    )
}
export default EmptyCalendarSlot