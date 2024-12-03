import "./Calendar.css"
import React from "react";

const TableHeader = () => {
    return (
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
    )
}

export default TableHeader