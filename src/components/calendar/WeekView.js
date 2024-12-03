import React from 'react'
import "./Weekview.css"
import {totalMileage, totalMileagePerDay, averageMileagePerRun, totalRuns} from "../../utils/CalcFunctions"
import {LineChart} from '@mui/x-charts/LineChart';

function WeekView({week}) {
    return (
        <div>
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