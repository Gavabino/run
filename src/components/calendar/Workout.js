import React from "react";
import "./Workout.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

function Workout({workout, deleteFunction, onClick, disableDelete}) {
    const {display_type, distance, type} = workout
    return (
        <>
            <div className={type}>
                <div onClick={onClick} className="click">
                    <p className="distance">
                        {display_type}:<br/> {distance} Miles
                    </p>
                    <p className="time">
                        Estimated Time: <br/>
                        {workout.time} Minutes
                    </p>
                </div>
                {!disableDelete && <FontAwesomeIcon
                    icon={faTrash}
                    className="delete"
                    onClick={deleteFunction}
                />}
            </div>
        </>
    );
}

export default Workout;
