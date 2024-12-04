import "../Calendar.css"
import React from "react";

const EmptyCalendarSlot = ({toggleShowing, day}) => {
    return (
        <td key={day.date} className={"" + day.disabled}>
            <div className="entryContainer">
                {"dayNum" in day && <p className="date">{day.dayNum}</p>}
                <button onClick={toggleShowing} className="add">
                    Add Workout
                </button>
                <button className="expand" onClick={toggleShowing}>
                    {" "}
                    &#8600;
                </button>
            </div>
        </td>
    )
}
export default EmptyCalendarSlot