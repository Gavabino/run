import "./Calender.css";
import React, {useState} from "react";
import Workout from "./Workout";
import AddItemView from "./AddItemView";
import {DetailedView} from "./Calender";
import Weekview from "./Weekview";

function ExpandedPreview({
    day,
    isShowing,
    setShowing,
    seed,
    setSeed,
    calenderData,
    week,
    year,
    month,
  }) {
    let [currentWorkout, setCurrentWorkout] = useState({});
    let [isCurrentWorkout, setIsCurrentWorkout] = useState(false);
    const toggleShowing = () => {
      setShowing(!isShowing);
      setSeed((seed += 1));
    };
  
    return (
      <div className="excontainer">
        <div className="workoutContainer">
          {day.workouts?.map((workout) => {
            const removeItem = (workout) => {
                day.workouts = day.workouts.filter((week) => week !== workout); // Avoid directly mutating `day.workouts`
              localStorage.setItem(
                `${year}-${month}`,
                JSON.stringify(calenderData)
              );
              setSeed((seed) => seed + 1);
              if (currentWorkout === workout) {
                setCurrentWorkout({});
                setIsCurrentWorkout(false);
              }
              console.log("deleted workout");
            };
            const setActiveWorkout = () => {
              setCurrentWorkout(workout);
              setIsCurrentWorkout(true);
              console.log(currentWorkout);
              console.log(isCurrentWorkout);
              setSeed((seed += 1));
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
            <DetailedView currentWorkout={currentWorkout} />
          ) : (
            <AddItemView
              day={day}
              week={week}
              seed={seed}
              setSeed={setSeed}
              calenderData={calenderData}
              year={year}
              month={month}
            ></AddItemView>
          )}
        </div>
        <div className="weekView">
          <Weekview week={week} />
        </div>
        <button className="collapse" onClick={toggleShowing}>
          X
        </button>
      </div>
    );
  }
  
  export default ExpandedPreview