import "../../Calendar.css";
import {useState} from "react";
import AddWorkout from "./AddWorkout";
import AddPreset from "./AddPreset";

function AddItemView() {
    const [selector, setSelector] = useState(true);

    const handleClick = (e) => {
        const buttonId = e.target.id;
        if (buttonId === "workout") {
            setSelector(true);
        } else if (buttonId === "preset") {
            setSelector(false);
        }
    }

    return (
        <>
            <div className="selectorContainer">
                <button className={selector ? "selectedButton" : "selectorButton"}
                        onClick={handleClick}
                        id="workout">
                    Add Workout
                </button>
                <button className={!selector ? "selectedButton" : "selectorButton"}
                        onClick={handleClick}
                        id="preset">
                    Add Preset
                </button>
            </div>
            {selector ? <AddWorkout/> : <AddPreset/>}
        </>
    )
}

export default AddItemView;
