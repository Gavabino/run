import React from "react";
import "./Workout.css"

import Dropdown from "./Dropdown";

function Workout({workout, deleteFunction, onClick, disableDelete, editFunction}) {
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
                {!disableDelete && <Dropdown editFunction={editFunction} deleteFunction={deleteFunction}/>}
            </div>
        </>
    );
}

export default Workout;
