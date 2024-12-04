import React, {useState} from "react";
import "./Calendar.css";
import ExpandedPreview from "./expandedPreview/ExpandedPreview";
import Nav from "../Nav";
import DatePicker from "./DatePicker";
import TableHeader from "./tableComponents/TableHeader";
import TableBody from "./tableComponents/TableBody";

function Calendar() {
    let [isShowing, setShowing] = useState(false);

    return (
        <div>
            <Nav currentpage={"App"}/>
            <div className="container">
                {isShowing && (
                    <ExpandedPreview
                        isShowing={isShowing}
                        setShowing={setShowing}
                    />
                )}
                <table>
                    <DatePicker/>
                    <TableHeader/>
                    <TableBody
                        setShowing={setShowing}
                        isShowing={isShowing}
                    />
                </table>
            </div>
        </div>
    );
}

export default Calendar;