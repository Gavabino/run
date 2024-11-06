import React from "react";
import "./Calender.css";
import calenderData from "../assets/calanderData";
import { useState } from "react";
import Workout from "./Workout";

function Calender() {
  let [seed, setSeed] = useState(1);
  return (
    <div className="container">
      <table>
        <tbody>
          {calenderData.map((week) => (
            <tr key={calenderData.indexOf(week)}>
              {week.map((day) => {
                if (day.workouts.length === 0) {
                  const handleClick = () => {
                    day.workouts.push({
                      display_type: "Easy Run",
                      distance: 4,
                      time: 35,
                      type: "easy",
                    });
                    setSeed((seed += 1));
                    console.log("Added Workout");
                  };
                  return (
                    <td key={day.id}>
                      <button onClick={handleClick} className="add">
                        Add Workout
                      </button>
                    </td>
                  );
                } else {
                  const handleClick = () => {
                    day.workouts.push({
                      display_type: "Recovery Run",
                      distance: 4,
                      time: 35,
                      type: "recovery",
                    });
                    setSeed((seed += 1));
                    console.log("Added Workout");
                  };
                  return (
                    <td key={day.id} className="entry">
                      {day.workouts.map((workout) => {
                        return (
                          <Workout
                            display_type={workout.display_type}
                            type={workout.type}
                            distance={workout.distance}
                            time={workout.time}
                          />
                        );
                      })}
                      <button onClick={handleClick} className="add">
                        Add Workout
                      </button>
                    </td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calender;
