import Workout from "../Workout";
import React from "react";
import {useCalendar} from "../../../contexts/CalendarContext";

const WorkoutContainer = () => {
    const {
        setActiveWorkout,
        removeItem,
        setIsCurrentWorkout,
        calendarData,
        day
    } = useCalendar();

    const currentDay = calendarData
        .flat()
        .find((d) => d.date === day.date) || {...day, workouts: []};

    return (
        <div className="workoutContainer">
            {currentDay.workouts?.map((workout) => {

                return (
                    <Workout
                        workout={workout}
                        deleteFunction={() => removeItem(workout, currentDay)}
                        onClick={() => setActiveWorkout(workout)}
                        key={day.workouts.indexOf(workout)}
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
