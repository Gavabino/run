import "./Calendar.css"
import moment from "moment/moment";
import React from "react";
import {useCalendar} from "../../contexts/CalendarContext";

const DatePicker = () => {
    let {month, year, increaseMonthDate, decreaseMonthDate} = useCalendar()

    return (
        <caption>
            <div className="datePicker">
                <button onClick={() => decreaseMonthDate()}>&lt;</button>
                <div>
                    {moment()
                            .month(month - 1)
                            .format("MMMM") +
                        " " +
                        year}
                </div>
                <button onClick={() => increaseMonthDate()}>&gt;</button>
            </div>
        </caption>
    )
}

export default DatePicker;