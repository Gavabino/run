import "../Calendar.css";
import React from "react";
import AddItemView from "./AddItemView";
import DetailedView from "./DetailedView";
import WeekView from "./WeekView";
import {useCalendar} from "../../../contexts/CalendarContext";
import WorkoutContainer from "./WorkoutContainer";

function ExpandedPreview() {
    const {
        isShowing,
        setShowing,
        currentWorkout,
        isCurrentWorkout
    } = useCalendar();

    return (
        <div className="excontainer">
            <WorkoutContainer/>
            <div className="detailsContainer">
                {isCurrentWorkout ?
                    <DetailedView currentWorkout={currentWorkout}/>
                    :
                    <AddItemView/>
                }
            </div>
            <WeekView/>
            <button className="collapse" onClick={() => setShowing(!isShowing)}>
                X
            </button>
        </div>
    );
}

export default ExpandedPreview