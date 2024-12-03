import React from "react";

function WorkoutPreview({display_type, type}) {
    return (
        <div className={type + "preview"}>
            <p>{display_type}</p>
        </div>
    );
}

export default WorkoutPreview;