import "./Calender.css";
import React, {useState} from "react";
import Workout from "./Workout";
import AddItemView from "./AddItemView";
import {DetailedView} from "./Calender";
import WeekView from "./WeekView";

function ExpandedPreview({
                             day,
                             isShowing,
                             setShowing,
                             seed,
                             setSeed,
                             calenderData,
                             setCalenderData,
                             week,
                             year,
                             month,
                         }) {
    let [currentWorkout, setCurrentWorkout] = useState({});
    let [isCurrentWorkout, setIsCurrentWorkout] = useState(false);

    const currentDay = calenderData
        .flat()
        .find((d) => d.date === day.date) || {...day, workouts: []};

    const toggleShowing = () => {
        setShowing(!isShowing);
        setSeed((prevSeed) => prevSeed + 1);
    };

    return (
        <div className="excontainer">
            <div className="workoutContainer">
                {currentDay.workouts?.map((workout) => {
                    const removeWorkoutFromDay = (workout, date) => {
                        console.log("Remove workout", workout);
                        return calenderData.map((week) =>
                            week.map((day) =>
                                currentDay.date === date
                                    ? {...day, workouts: day.workouts.filter((w) => w !== workout)}
                                    : day
                            )
                        );
                    };
                    const removeItem = () => {
                        const updatedCalenderData = removeWorkoutFromDay(workout, day.date);
                        setCalenderData(updatedCalenderData); // Notify parent of the update
                        localStorage.setItem(`${year}-${month}`, JSON.stringify(updatedCalenderData));
                        setSeed((prevSeed) => prevSeed + 1);

                        if (currentWorkout === workout) {
                            setCurrentWorkout({});
                            setIsCurrentWorkout(false);
                        }
                        console.log("Deleted workout:", workout);
                    };
                    const setActiveWorkout = () => {
                        setCurrentWorkout(workout);
                        setIsCurrentWorkout(true);
                        setSeed((prevSeed) => prevSeed + 1);
                    };

                    return (
                        <Workout
                            display_type={workout.display_type}
                            type={workout.type}
                            distance={workout.distance}
                            time={workout.time}
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
                        seed={seed}
                        setSeed={setSeed}
                        calenderData={calenderData}
                        setCalenderData={setCalenderData}
                        year={year}
                        month={month}
                    ></AddItemView>
                )}
            </div>
            <div className="weekView">
                <WeekView week={week}/>
            </div>
            <button className="collapse" onClick={toggleShowing}>
                X
            </button>
        </div>
    );
}

export default ExpandedPreview