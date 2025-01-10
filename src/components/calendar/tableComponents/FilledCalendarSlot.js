import "../Calendar.css"
import WorkoutPreview from "../../workout/WorkoutPreview";
import React from "react";
import {useCalendar} from "../../../contexts/CalendarContext";

const FilledCalendarSlot = ({day, week, currentDay}) => {
    const {toggleShowing, setActiveWorkout} = useCalendar()

    return (
        <td key={day.date} className={day.disabled}>
            {"dayNum" in day && <p className={currentDay ? "currentDay" : "date"}>{day.dayNum}</p>}
            <div className="entryContainer">
                {day.workouts.map((workout) => {
                    return (
                        <WorkoutPreview
                            workout={workout}
                            key={day.workouts.indexOf(workout)}
                            clickFunction={() => {
                                toggleShowing(day, week)
                                setActiveWorkout(workout)
                            }}
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