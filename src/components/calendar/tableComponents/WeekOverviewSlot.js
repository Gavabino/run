import "../Calendar.css"
import {estimateTotalTime, totalMileage, totalRuns} from "../../../utils/CalcFunctions";
import React from "react";

const WeekOverviewSlot = ({week}) => {
    return (
        <td className="weekOverview">
            <p>Total Mileage: {totalMileage(week)} Miles
                <br></br>
                Total Runs: {totalRuns(week)}
                <br></br>
                Estimated Time: {estimateTotalTime(totalMileage(week), 8.5)} Min</p>
        </td>
    )
}
export default WeekOverviewSlot