import "../Calendar.css";
import React from "react";
import AddItemView from "./addItemView/AddItemView";
import DetailedView from "./DetailedView";
import WeekView from "./WeekView";
import {useCalendar} from "../../../contexts/CalendarContext";
import WorkoutContainer from "./WorkoutContainer";
import PresetView from "./PresetView";
import {PresetProvider} from "../../../contexts/PresetContext";

function ExpandedPreview() {
    const {
        isShowing,
        setShowing,
        currentWorkout,
        isCurrentWorkout
    } = useCalendar();

    return (
        <div className="excontainer">
            <PresetProvider>
                <WorkoutContainer/>
                <div className="detailsContainer">
                    {isCurrentWorkout ?
                        <DetailedView currentWorkout={currentWorkout}/>
                        :
                        <>
                            <AddItemView/>
                            <PresetView/>
                        </>
                    }
                </div>
            </PresetProvider>
            <WeekView/>
            <button className="collapse" onClick={() => setShowing(!isShowing)}>
                X
            </button>
        </div>
    );
}

export default ExpandedPreview