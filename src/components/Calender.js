import React from "react";
import "./Calender.css";
import { useState } from "react";
import EmptyCalander from "../assets/calanderData";
import Workout from "./Workout";
import Nav from "./Nav";

function Calender() {
  let [seed, setSeed] = useState(1);
  let calenderData = JSON.parse(localStorage.getItem("workouts"));
  return (
    <div>
      <Nav currentpage={"App"} />
      <div className="container">
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
                      console.log("Added Workout");
                    };
                    return (
                      <td key={day.id}>
                        <div className="entryContainer">
                        <button onClick={addItem} className="add">
                          Add Workout
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
                      console.log("Added Workout");
                    };
                    const removeItem = () => {
                      day.workouts.pop();
                      setSeed((seed += 1));
                      localStorage.setItem(
                        "workouts",
                        JSON.stringify(calenderData)
                      );
                      console.log("Removed Workout");
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
                            />
                          );
                        })}
                        <button onClick={addItem} className="add">
                          Add Workout
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
    </div>
  );
}

export default Calender;

function WorkoutPreview({ display_type, type, distance }) {
  return (
    <div className={type + "preview"}>
      <p>
        {display_type}: {distance} Miles
      </p>
    </div>
  );
}