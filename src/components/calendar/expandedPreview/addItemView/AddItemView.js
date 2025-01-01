import "../../Calendar.css";
import AddWorkout from "./AddWorkout";
import AddPreset from "./AddPreset";
import EditForm from "./EditForm";
import {usePreset} from "../../../../contexts/PresetContext";

function AddItemView() {
    const {selector, setSelector, editWorkout} = usePreset()

    const handleClick = (e) => {
        const buttonId = e.target.id;
        if (buttonId === "workout") {
            setSelector("workout");
        } else if (buttonId === "preset") {
            setSelector("preset");
        }
    }

    const renderSwitch = () => {
        switch (selector) {
            case "workout":
                return <AddWorkout/>
            case "preset":
                return <AddPreset/>
            case "edit":
                return <EditForm workout={editWorkout}/>
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
            {renderSwitch()}
        </>
    )
}

export default AddItemView;
