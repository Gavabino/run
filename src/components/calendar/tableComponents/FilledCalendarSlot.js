import "../Calendar.css"
import WorkoutPreview from "../WorkoutPreview";
import React from "react";

const FilledCalendarSlot = ({toggleShowing, day}) => {
    return (
        <td key={day.date} className={day.disabled}>
            {"dayNum" in day && <p className="date">{day.dayNum}</p>}
            <div className="entryContainer">
                {day.workouts.map((workout) => {
                    return (
                        <WorkoutPreview
                            workout={workout}
                        />
                    );
                })}
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
export default FilledCalendarSlot