import {useState} from "react";
import moment from "moment/moment";

const useCalendar = () => {
    let [month, setMonth] = useState(moment().month() + 1);
    let [year, setYear] = useState(moment().year());

    const increaseMonthDate = () => {
        if (month++ === 12) {
            setMonth(1);
            setYear((year += 1));
        } else {
            setMonth(month++);
        }
    };

    const decreaseMonthDate = () => {
        if (month-- === 1) {
            setMonth(12);
            setYear((year -= 1));
        } else {
            setMonth(month--);
        }
    };

    return {
        month,
        year,
        increaseMonthDate,
        decreaseMonthDate
    }
}

export default useCalendar;