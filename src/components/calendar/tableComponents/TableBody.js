import "../Calendar.css"
import EmptyCalendarSlot from "./EmptyCalendarSlot";
import FilledCalendarSlot from "./FilledCalendarSlot";
import WeekOverviewSlot from "./WeekOverviewSlot";
import React from "react";
import {useCalendar} from "../../../contexts/CalendarContext";

const TableBody = () => {
    const {calendarData, checkCurrentDay} = useCalendar();

    return (
        <tbody>
        {calendarData?.map((week) => (
            <tr key={calendarData.indexOf(week)}>
                {week.map((day) =>
                    day.workouts.length === 0 ?
                        <EmptyCalendarSlot day={day} week={week} key={week.indexOf(day)}
                                           currentDay={checkCurrentDay(day)}/> :
                        <FilledCalendarSlot day={day} week={week} key={week.indexOf(day)}
                                            currentDay={checkCurrentDay(day)}/>
                )}
                <WeekOverviewSlot week={week}/>
            </tr>
        ))}
        </tbody>
    )
}
export default TableBody