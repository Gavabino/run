import React from "react";

function WorkoutPreview({workout}) {
    const {type, display_type} = workout;
    return (
        <div className={type + "preview"}>
            <p>{display_type}</p>
        </div>
    );
}

export default WorkoutPreview;