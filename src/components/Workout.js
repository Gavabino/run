import React from "react";
import "./Workout.css"

function Workout({ display_type, type, distance, time }) {
  return (
    <div>
      <div className={type}>
        <p className="distance">
          {display_type}:<br /> {distance} Miles
        </p>
        <p className="time">
          Estimated Time: <br />
          {time}
        </p>
      </div>
    </div>
  );
}

export default Workout;
