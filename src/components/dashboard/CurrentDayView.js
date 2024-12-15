import {useDashboard} from "../../contexts/DashboardContext";
import React from "react";
import Workout from "../calendar/Workout";
import {useCalendar} from "../../contexts/CalendarContext";

const CurrentDayView = () => {
    const {findDayInCalendar} = useDashboard();
    const {removeItem} = useCalendar();
    const currentDay = findDayInCalendar();

    return (
        <div className="currentDayContainer">
            <div className="currentDayWorkouts">
                {currentDay?.workouts.map((workout) => {
                    return (
                        <Workout
                            workout={workout}
                            deleteFunction={() => removeItem(workout, currentDay)}
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
