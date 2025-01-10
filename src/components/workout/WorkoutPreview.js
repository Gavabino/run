import React from "react";

function WorkoutPreview({workout, clickFunction}) {
    const {type, display_type} = workout;
    return (
        <div className={type + "Preview"} onClick={clickFunction}>
            <p>{display_type}</p>
        </div>
    );
}

export default WorkoutPreview;