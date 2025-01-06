import React, {useEffect} from 'react'
import {totalMileage, totalMileagePerDay, averageMileagePerRun, totalRuns} from "../../../utils/CalcFunctions"
import {LineChart} from '@mui/x-charts/LineChart';
import {useCalendar} from "../../../contexts/CalendarContext";

function WeekView() {
    const {week, calendarData, findWeekInCalendar} = useCalendar();


    useEffect(() => {
        findWeekInCalendar(week);
    }, [calendarData, findWeekInCalendar, week]);

    return (
        <div className="weekView">
            <p>Total Weekly Mileage: {totalMileage(week)} Miles</p>
            <p>Total Runs: {totalRuns(week)} Runs</p>
            <p>Average Mileage Per Run: {averageMileagePerRun(week)} Miles</p>
            <p>Daily Mileage: {totalMileagePerDay(week).join(", ")}</p>
            <LineChart
                xAxis={[{
                    scaleType: 'point',
                    data: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
                }]}

                series={[
                    {
                        curve: "linear",
                        data: totalMileagePerDay(week),
                        area: true,
                        baseline: 0
                    },
                ]}
                width={600}
                height={400}
                grid={{vertical: true, horizontal: true}}
                className='chart'
            />
        </div>
    )
}

export default WeekView