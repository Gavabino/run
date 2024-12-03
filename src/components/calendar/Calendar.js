import React, {useEffect, useState} from "react";
import "./Calendar.css";
import ExpandedPreview from "./ExpandedPreview";
import Nav from "../Nav";
import EmptyCalendar, {setCalendarDates} from "../../utils/calendarFunctions";
import {estimateTotalTime, totalMileage, totalRuns} from "../../utils/CalcFunctions";
import {addWorkoutDoc, doesDocumentExist, getWorkoutDoc, unflatten} from "../../utils/firestore";
import WorkoutPreview from "./WorkoutPreview";
import DatePicker from "./DatePicker";
import useCalendar from "../../hooks/useCalendar";
import TableHeader from "./TableHeader";
import EmptyCalendarSlot from "./EmptyCalendarSlot";

function Calendar() {
    let [seed, setSeed] = useState(1);
    let [isShowing, setShowing] = useState(false);
    let [day, setDay] = useState({});
    let [week, setWeek] = useState([]);
    let [calendarData, setCalendarData] = useState([]);

    let {month, year} = useCalendar();

    const fetchCalendarData = async () => {
        const key = `${year}-${month}`;
        let doc = await getWorkoutDoc(key);
        let data;

        if (await doesDocumentExist(key)) {
            data = unflatten(doc.data);
            console.log("Entry retrieved");
        } else {
            let newCalendar = setCalendarDates(EmptyCalendar, month, year)
            await addWorkoutDoc(key, newCalendar);
            doc = await getWorkoutDoc(key);
            data = unflatten(doc.data);
            console.log("Entry created");
        }

        setCalendarData(data);
    };

    useEffect(() => {
        fetchCalendarData().catch((err) => {
            console.log(err);
        });
    }, [month, year]);

    return (
        <div>
            <Nav currentpage={"App"}/>
            <div className="container">
                {isShowing && (
                    <ExpandedPreview
                        isShowing={isShowing}
                        setShowing={setShowing}
                        seed={seed}
                        setSeed={setSeed}
                        day={day}
                        calendarData={calendarData}
                        setCalendarData={setCalendarData}
                        week={week}
                    />
                )}
                <table>
                    <DatePicker/>
                    <TableHeader/>
                    <tbody>
                    {calendarData?.map((week) => (
                        <tr key={calendarData.indexOf(week)}>
                            {week.map((day) => {
                                if (day.workouts.length === 0) {
                                    const toggleShowing = () => {
                                        setShowing(!isShowing);
                                        setSeed((seed += 1));
                                        setDay(day);
                                        setWeek(week);
                                    };

                                    return (
                                        <EmptyCalendarSlot day={day} toggleShowing={toggleShowing}/>
                                    );
                                } else {
                                    const toggleShowing = () => {
                                        setShowing(!isShowing);
                                        setSeed((seed += 1));
                                        setDay(day);
                                        setWeek(week);
                                    };
                                    return (
                                        <td key={day.date} className={day.disabled}>
                                            {"dayNum" in day && <p className="date">{day.dayNum}</p>}
                                            <div className="entryContainer">
                                                {day.workouts.map((workout) => {
                                                    return (
                                                        <WorkoutPreview
                                                            display_type={workout.display_type}
                                                            type={workout.type}
                                                            distance={workout.distance}
                                                            key={workout.id}
                                                        />
                                                    );
                                                })}
                                                <button onClick={toggleShowing} className="add">
                                                    Add Workout
                                                </button>
                                                <button className="expand" onClick={toggleShowing}>
                                                    {" "}
                                                    &#8600;
                                                </button>
                                            </div>
                                        </td>
                                    );
                                }
                            })}
                            <td className="weekOverview">
                                <div className="weekOverviewContainer">
                                    <p>Total Mileage: {totalMileage(week)}</p>
                                    <p>Total Runs: {totalRuns(week)}</p>
                                    <p>Estimated Time: {estimateTotalTime(totalMileage(week), 8.5)} Min</p>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button onClick={async () => {
                    await addWorkoutDoc(`${year}-${month}`)
                    let data = await getWorkoutDoc(`${year}-${month}`)
                    console.log(data.data)
                    console.log(unflatten(data.data));
                    console.log(calendarData)

                }}>Add month to file
                </button>
            </div>
        </div>
    );
}

export default Calendar;