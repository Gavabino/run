import Workout from "../Workout";
import React from "react";
import {useCalendar} from "../../../contexts/CalendarContext";
import {usePreset} from "../../../contexts/PresetContext";

const WorkoutContainer = () => {
    const {
        setActiveWorkout,
        removeItem,
        setIsCurrentWorkout,
        calendarData,
        day
    } = useCalendar();

    const {setEditWorkout, setSelector} = usePreset()

    const currentDay = calendarData
        .flat()
        .find((d) => d.date === day.date) || {...day, workouts: []};

    const handleClick = (workout) => {
        setSelector("edit")
        setEditWorkout(workout)
        setIsCurrentWorkout(false)
    }

    return (
        <div className="workoutContainer">
            {currentDay.workouts?.map((workout) => {

                return (
                    <Workout
                        workout={workout}
                        deleteFunction={() => removeItem(workout, currentDay)}
                        onClick={() => setActiveWorkout(workout)}
                        key={day.workouts.indexOf(workout)}
                        editable={true}
                        editFunction={() => handleClick(workout)}
                    />
                );
            })}
            <div
                className="largeAdd"
                onClick={() => {
                    setIsCurrentWorkout(false);
                }}
            >
                Add Workout
            </div>
        </div>
    )
}

export default WorkoutContainer;
