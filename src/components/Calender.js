import React from "react";
import "./Calender.css";
import { useState } from "react";
import { setCalanderDates } from "../assets/calanderFunctions";
import Workout from "./Workout";
import AddItemView from "./AddItemView";
import ExpandedPreview from "./ExpandedPreview";
import Nav from "./Nav";
import Weekview from "./Weekview";
import EmptyCalander from "../assets/calanderFunctions";
import moment from "moment";

function Calender() {
  let [seed, setSeed] = useState(1);
  let [isShowing, setShowing] = useState(false);
  let [day, setDay] = useState({});
  let [week, setWeek] = useState([]);
  let [month, setMonth] = useState(1);
  let [year, setYear] = useState(2024);

  const getOrCreateCalendarData = (month, year) => {
    const key = `${year}-${month}`;
    let data = localStorage.getItem(key);

    if (!data) {
      data = setCalanderDates(EmptyCalander, month, year);
      localStorage.setItem(key, JSON.stringify(data));
      console.log("Entry created");
    } else {
      data = JSON.parse(data);
      console.log("Entry retrieved");
    }

    return data;
  };
  let calenderData = getOrCreateCalendarData(month, year);
  console.log(calenderData);
  
  const increaseMonthDate = () => {
    if (month++ === 12) {
      setMonth(1);
      setYear((year += 1));
    } else {
      setMonth(month++);
    }
  };

  const decreaseMonthDate = () => {
    if (month-- === 1) {
      setMonth(12);
      setYear((year -= 1));
    } else {
      setMonth(month--);
    }
  };

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
            week={week}
            year={year}
            month={month}
          />
        )}
        <table>
          <caption>
            <div className="datePicker">
              <button onClick={decreaseMonthDate}>&lt;</button>
              <div>
                {moment()
                  .month(month - 1)
                  .format("MMMM") +
                  " " +
                  year}
              </div>
              <button onClick={increaseMonthDate}>&gt;</button>
            </div>
          </caption>
          <tbody>
            {calenderData?.map((week) => (
              <tr key={calenderData.indexOf(week)}>
                {week.map((day) => {
                  if (day.workouts.length === 0) {
                    const toggleShowing = () => {
                      setShowing(!isShowing);
                      setSeed((seed += 1));
                      setDay(day);
                      setWeek(week);
                    };

                    return (
                      <td key={day.id} className={"" + day.disabled}>
                        <div className="entryContainer">
                          {"dayNum" in day && <p className="date">{day.dayNum}</p>}
                          <button onClick={toggleShowing} className="add">
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
                    const toggleShowing = () => {
                      setShowing(!isShowing);
                      setSeed((seed += 1));
                      setDay(day);
                      setWeek(week);
                    };
                    return (
                      <td key={day.id} className={day.disabled}>
                        {"dayNum" in day && <p className="date">{day.dayNum}</p>}
                        <div className="entryContainer">
                          {day.workouts.map((workout) => {
                            return (
                              <WorkoutPreview
                                display_type={workout.display_type}
                                type={workout.type}
                                distance={workout.distance}
                                key={workout.id}
                              />
                            );
                          })}
                          <button onClick={toggleShowing} className="add">
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
          calenderData = setCalanderDates(calenderData, month, year);
          localStorage.setItem(
            `${year}-${month}`,
            JSON.stringify(calenderData)
          );
          setSeed(seed + 1);
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default Calender;

export function WorkoutPreview({ display_type, type, distance }) {
  return (
    <div className={type + "preview"}>
      <p>{display_type}</p>
    </div>
  );
}

export function DetailedView({ currentWorkout }) {
  return (
    <div>
      <p className="displaytype">{currentWorkout.display_type}</p>
      <p className="distanceinfo">{currentWorkout.distance} Miles</p>
    </div>
  );
}