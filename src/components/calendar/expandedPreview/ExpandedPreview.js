import "../Calendar.css";
import React from "react";
import Workout from "../Workout";
import AddItemView from "./AddItemView";
import DetailedView from "./DetailedView";
import WeekView from "./WeekView";
import {useCalendar} from "../../../contexts/CalendarContext";

function ExpandedPreview() {

    const {
        day, calendarData, isShowing, setShowing, currentWorkout,
        setActiveWorkout,
        removeItem,
        setIsCurrentWorkout,
        isCurrentWorkout
    } = useCalendar();

    const currentDay = calendarData
        .flat()
        .find((d) => d.date === day.date) || {...day, workouts: []};

    return (
        <div className="excontainer">
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
            <div className="detailsContainer">
                {isCurrentWorkout ?
                    <DetailedView currentWorkout={currentWorkout}/>
                    :
                    <AddItemView/>
                }
            </div>
            <WeekView/>
            <button className="collapse" onClick={() => setShowing(!isShowing)}>
                X
            </button>
        </div>
    );
}

export default ExpandedPreview