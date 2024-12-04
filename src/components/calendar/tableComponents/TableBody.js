import "../Calendar.css"
import EmptyCalendarSlot from "./EmptyCalendarSlot";
import FilledCalendarSlot from "./FilledCalendarSlot";
import WeekOverviewSlot from "./WeekOverviewSlot";
import React from "react";
import {useCalendar} from "../../../contexts/CalendarContext";

const TableBody = ({setShowing, isShowing}) => {
    const {calendarData, setDay, setWeek} = useCalendar();

    return (
        <tbody>
        {calendarData?.map((week) => (
            <tr key={calendarData.indexOf(week)}>
                {week.map((day) => {
                    if (day.workouts.length === 0) {
                        const toggleShowing = () => {
                            setShowing(!isShowing);
                            setDay(day);
                            setWeek(week);
                        };

                        return (
                            <EmptyCalendarSlot day={day} toggleShowing={toggleShowing}/>
                        );
                    } else {
                        const toggleShowing = () => {
                            setShowing(!isShowing);
                            setDay(day);
                            setWeek(week);
                        };
                        return (
                            <FilledCalendarSlot day={day} toggleShowing={toggleShowing}/>
                        );
                    }
                })}
                <WeekOverviewSlot week={week}/>
            </tr>
        ))}
        </tbody>
    )
}
export default TableBody