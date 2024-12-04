import "../Calendar.css"
import {estimateTotalTime, totalMileage, totalRuns} from "../../../utils/CalcFunctions";
import React from "react";

const WeekOverviewSlot = ({week}) => {
    return (
        <td className="weekOverview">
            <div className="weekOverviewContainer">
                <p>Total Mileage: {totalMileage(week)}</p>
                <p>Total Runs: {totalRuns(week)}</p>
                <p>Estimated Time: {estimateTotalTime(totalMileage(week), 8.5)} Min</p>
            </div>
        </td>
    )
}
export default WeekOverviewSlot