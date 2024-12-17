import "../Calendar.css"
import WorkoutPreview from "../WorkoutPreview";
import React from "react";
import {useCalendar} from "../../../contexts/CalendarContext";

const FilledCalendarSlot = ({day, week}) => {
    const {toggleShowing} = useCalendar()
    return (
        <td key={day.date} className={day.disabled}>
            {"dayNum" in day && <p className="date">{day.dayNum}</p>}
            <div className="entryContainer">
                {day.workouts.map((workout) => {
                    return (
                        <WorkoutPreview
                            workout={workout}
                            key={day.workouts.indexOf(workout)}
                        />
                    );
                })}
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
export default FilledCalendarSlot