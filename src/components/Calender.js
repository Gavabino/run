import React from "react";
import "./Calender.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import EmptyCalander from "../assets/calanderData";
import Workout from "./Workout";
import Nav from "./Nav";

function Calender() {
  let [seed, setSeed] = useState(1);
  let [isShowing, setShowing] = useState(false);
  let [day, setDay] = useState({});
  let [calenderData] = useState(JSON.parse(localStorage.getItem("workouts")));

  return (
    <div>
      <Nav currentpage={"App"} />
      <div className="container">
        {isShowing && (
          <ExpandedPreview
            isShowing={isShowing}
            setShowing={setShowing}
            seed={seed}
            setSeed={setSeed}
            day={day}
            calenderData={calenderData}
          />
        )}
        <table>
          <tbody>
            {calenderData.map((week) => (
              <tr key={calenderData.indexOf(week)}>
                {week.map((day) => {
                  if (day.workouts.length === 0) {
                    const addItem = () => {
                      day.workouts.push({
                        display_type: "Easy Run",
                        distance: 4,
                        time: 35,
                        type: "easy",
                      });
                      setSeed((seed += 1));
                      localStorage.setItem(
                        "workouts",
                        JSON.stringify(calenderData)
                      );
                    };
                    const toggleShowing = () => {
                      setShowing(!isShowing);
                      setSeed((seed += 1));
                      setDay(day);
                    };

                    return (
                      <td key={day.id}>
                        <div className="entryContainer">
                          <button onClick={addItem} className="add">
                            Add Workout
                          </button>
                          <button className="expand" onClick={toggleShowing}>
                            {" "}
                            &#8600;
                          </button>
                        </div>
                      </td>
                    );
                  } else {
                    const addItem = () => {
                      day.workouts.push({
                        display_type: "Recovery Run",
                        distance: 4,
                        time: 35,
                        type: "recovery",
                      });
                      setSeed((seed += 1));
                      localStorage.setItem(
                        "workouts",
                        JSON.stringify(calenderData)
                      );
                    };

                    const toggleShowing = () => {
                      setShowing(!isShowing);
                      setSeed((seed += 1));
                      setDay(day);
                    };
                    return (
                      <td key={day.id} className="entry">
                        <div className="entryContainer">
                          {day.workouts.map((workout) => {
                            return (
                              <WorkoutPreview
                                display_type={workout.display_type}
                                type={workout.type}
                                distance={workout.distance}
                                key={day.workouts.indexOf(workout)}
                              />
                            );
                          })}
                          <button onClick={addItem} className="add">
                            Add Workout
                          </button>
                          <button className="expand" onClick={toggleShowing}>
                            {" "}
                            &#8600;
                          </button>
                        </div>
                      </td>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => {
          localStorage.setItem("workouts", JSON.stringify(EmptyCalander));
          console.log("Reset");
          setSeed((seed += 1));
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default Calender;

function WorkoutPreview({ display_type, type, distance }) {
  return (
    <div className={type + "preview"}>
      <p>{display_type}</p>
    </div>
  );
}

function ExpandedPreview({
  day,
  isShowing,
  setShowing,
  seed,
  setSeed,
  calenderData,
}) {
  let [currentWorkout, setCurrentWorkout] = useState({});
  let [isCurrentWorkout, setIsCurrentWorkout] = useState(false);
  const toggleShowing = () => {
    setShowing(!isShowing);
    setSeed((seed += 1));
    console.log(isShowing);
  };

  return (
    <div className="excontainer">
      <div className="workoutContainer">
        {day.workouts?.map((workout) => {
          const removeItem = () => {
            day.workouts.splice(day.workouts.indexOf(workout), 1);
            setSeed((seed += 1));
            localStorage.setItem("workouts", JSON.stringify(calenderData));
            if (currentWorkout === workout) {
              setCurrentWorkout({});
              setIsCurrentWorkout(false);
              console.log("deleted");
            }
          };
          const setActiveWorkout = () => {
            setCurrentWorkout(workout);
            setIsCurrentWorkout(true);
            console.log(currentWorkout);
            console.log(isCurrentWorkout);
            console.log("added Workout");
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
        <div className="largeAdd" onClick={() => {setIsCurrentWorkout(false)}}>Add Workout</div>
      </div>
      <div className="detailsContainer">
        {isCurrentWorkout ? (
          <DetailedView currentWorkout={currentWorkout} />
        ) : (
          <AddItemView day={day} seed={seed} setSeed={setSeed}></AddItemView>
        )}
      </div>
      <div className="weekView"></div>
      <button className="expand" onClick={toggleShowing}>
        {" "}
        &#8598;
      </button>
    </div>
  );
}

function DetailedView({ currentWorkout }) {
  return (
    <div>
      <p className="displaytype">{currentWorkout.display_type}</p>
      <p className="distanceinfo">{currentWorkout.distance} Miles</p>
    </div>
  );
}

function AddItemView({ day, seed, setSeed }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    let newData;
    switch (data.display_type) {
      case "Easy Run":
        newData = { ...data, type: "easy" };
        break;
      case "Recovery Run":
        newData = { ...data, type: "recovery" };
        break;
    }
    console.log(newData);
    day.workouts.push(newData);
    setSeed((seed += 1));
    reset();
  };

  return (
    <div className="container">
      <p className="instructions">
        Add a run or click on a existing one to view details
      </p>
      <form className="addRunForm" onSubmit={handleSubmit(onSubmit)}>
        <select
          className="selectType"
          placeholder="Select Type"
          {...register("display_type", { required: true })}
        >
          <option disabled selected>Select a run type</option>
          <option>Easy Run</option>
          <option>Recovery Run</option>
        </select>
        <input
          placeholder="Enter Time"
          type="number"
          className="timeSelect"
          {...register("time")}
        ></input>
        <input
          className="distanceSelect"
          type="number"
          min={0}
          max={1000}
          placeholder="Enter Distance"
          {...register("distance", { required: true })}
        ></input>
        <button type="submit" className="submit">
          Add Run
        </button>
      </form>
    </div>
  );
}
