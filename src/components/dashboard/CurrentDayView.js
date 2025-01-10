import {useDashboard} from "../../contexts/DashboardContext";
import React from "react";
import Workout from "../workout/Workout";

const CurrentDayView = () => {
    const {findDayInCalendar} = useDashboard();
    const currentDay = findDayInCalendar();

    return (
        <div className="currentDayContainer">
            <p className="currentDayViewHeader">Today's Workouts:</p>
            <div className="currentDayWorkouts">
                {currentDay?.workouts.map((workout) => {
                    return (
                        <Workout
                            workout={workout}
                            key={currentDay.workouts.indexOf(workout)}
                            disableDelete={true}
                        />
                    );
                })}
            </div>
        </div>
    )
}
export default CurrentDayView
