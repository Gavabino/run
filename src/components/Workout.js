import React from "react";
import "./Workout.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Workout({ display_type, type, distance, time, deleteFunction }) {
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
        <FontAwesomeIcon
                icon={faTrash}
                className="delete"
                onClick={deleteFunction}
            />
      </div>
    </div>
  );
}

export default Workout;
