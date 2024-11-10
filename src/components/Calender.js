import React from "react";
import "./Calender.css";
import { useState } from "react";
import EmptyCalander from "../assets/calanderData";
import Workout from "./Workout";
import Nav from "./Nav";

function Calender() {
  let [seed, setSeed] = useState(1);
  let [isShowing, setShowing] = useState(true);
  let [day, setDay] = useState({});
  let [calenderData, setCalanderData] = useState(JSON.parse(localStorage.getItem("workouts")));

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

function ExpandedPreview({ day, isShowing, setShowing, seed, setSeed, calenderData }) {
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
            localStorage.setItem(
              "workouts",
              JSON.stringify(calenderData)
            );
          };

          return (
            <Workout
              display_type={workout.display_type}
              type={workout.type}
              distance={workout.distance}
              time={workout.time}
              deleteFunction={removeItem}
            />
          );
        })}
      </div>

      <button className="expand" onClick={toggleShowing}>
        {" "}
        &#8598;
      </button>
    </div>
  );
}
