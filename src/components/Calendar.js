import React, {useEffect, useState} from "react";
import "./Calendar.css";
import ExpandedPreview from "./ExpandedPreview";
import Nav from "./Nav";
import EmptyCalendar, {setCalendarDates} from "../utils/calendarFunctions";
import moment from "moment";
import {estimateTotalTime, totalMileage, totalRuns} from "../utils/CalcFunctions";
import {addWorkoutDoc, getWorkoutDoc, unflatten} from "../utils/firestore";

function Calendar() {
    let [seed, setSeed] = useState(1);
    let [isShowing, setShowing] = useState(false);
    let [day, setDay] = useState({});
    let [week, setWeek] = useState([]);
    let [month, setMonth] = useState(moment().month() + 1);
    let [year, setYear] = useState(moment().year());
    let [calendarData, setCalendarData] = useState([]);

    useEffect(() => {
        const fetchCalendarData = () => {
            const key = `${year}-${month}`;
            let data = localStorage.getItem(key);

            if (!data) {
                data = setCalendarDates(EmptyCalendar, month, year);
                localStorage.setItem(key, JSON.stringify(data));
                console.log("Entry created");
            } else {
                data = JSON.parse(data);
                console.log("Entry retrieved");
            }

            setCalendarData(data);
        };

        fetchCalendarData();
    }, [month, year]);

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
                        year={year}
                        month={month}
                    />
                )}
                <table>
                    <caption>
                        <div className="datePicker">
                            <button onClick={decreaseMonthDate}>&lt;</button>
                            <div>
                                {moment()
                                        .month(month - 1)
                                        .format("MMMM") +
                                    " " +
                                    year}
                            </div>
                            <button onClick={increaseMonthDate}>&gt;</button>
                        </div>
                    </caption>
                    <thead>
                    <tr className="tableHeader">
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                        <th>Sunday</th>
                        <th></th>
                    </tr>
                    </thead>
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
                                        <td key={day.date} className={"" + day.disabled}>
                                            <div className="entryContainer">
                                                {"dayNum" in day && <p className="date">{day.dayNum}</p>}
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

                }}>Add month to file
                </button>
            </div>
        </div>
    );
}

export default Calendar;

export function WorkoutPreview({display_type, type, distance}) {
    return (
        <div className={type + "preview"}>
            <p>{display_type}</p>
        </div>
    );
}

export function DetailedView({currentWorkout}) {
    return (
        <div>
            <p className="displaytype">{currentWorkout.display_type}</p>
            <p className="distanceinfo">{currentWorkout.distance} Miles</p>
        </div>
    );
}