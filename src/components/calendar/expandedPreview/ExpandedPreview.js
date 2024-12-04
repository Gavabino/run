import "../Calendar.css";
import React, {useState} from "react";
import Workout from "../Workout";
import AddItemView from "./AddItemView";
import DetailedView from "./DetailedView";
import WeekView from "./WeekView";
import {addWorkoutDoc} from "../../../utils/firestore";
import {useCalendar} from "../../../contexts/CalendarContext";

function ExpandedPreview({
                             isShowing,
                             setShowing,
                         }) {
    let [currentWorkout, setCurrentWorkout] = useState({});
    let [isCurrentWorkout, setIsCurrentWorkout] = useState(false);

    let {day, week, month, year, calendarData, setCalendarData} = useCalendar();

    const currentDay = calendarData
        .flat()
        .find((d) => d.date === day.date) || {...day, workouts: []};

    return (
        <div className="excontainer">
            <div className="workoutContainer">
                {currentDay.workouts?.map((workout) => {
                    const removeWorkoutFromDay = (workout, date) => {
                        console.log("Remove workout", workout);
                        return calendarData.map((week) =>
                            week.map((day) =>
                                currentDay.date === date
                                    ? {...day, workouts: day.workouts.filter((w) => w !== workout)}
                                    : day
                            )
                        );
                    };
                    const removeItem = async () => {
                        const updatedCalendarData = removeWorkoutFromDay(workout, day.date);
                        setCalendarData(updatedCalendarData); // Notify parent of the update
                        await addWorkoutDoc(`${year}-${month}`, updatedCalendarData.flat());

                        if (currentWorkout === workout) {
                            setCurrentWorkout({});
                            setIsCurrentWorkout(false);
                        }
                        console.log("Deleted workout:", workout);
                    };
                    const setActiveWorkout = () => {
                        setCurrentWorkout(workout);
                        setIsCurrentWorkout(true);
                    };

                    return (
                        <Workout
                            workout={workout}
                            deleteFunction={removeItem}
                            onClick={setActiveWorkout}
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
                {isCurrentWorkout ? (
                    <DetailedView currentWorkout={currentWorkout}/>
                ) : (
                    <AddItemView
                        day={day}
                        week={week}
                    ></AddItemView>
                )}
            </div>
            <WeekView/>
            <button className="collapse" onClick={() => setShowing(!isShowing)}>
                X
            </button>
        </div>
    );
}

export default ExpandedPreview