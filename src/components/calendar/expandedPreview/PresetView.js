import {usePreset} from "../../../contexts/PresetContext";
import Workout from "../Workout";
import {useCalendar} from "../../../contexts/CalendarContext";
import {v4 as uuid} from "uuid";

const PresetView = () => {
    const {presets, deletePreset} = usePreset()
    const {addWorkout} = useCalendar()

    const handleClick = (preset) => {
        const newPreset = {...preset, id: uuid()}; // Create a new object with the unique ID
        addWorkout(newPreset);
    };

    return (
        <div style={{width: '100%', height: '100%'}}>
            {presets?.map(preset => (
                <Workout
                    workout={preset}
                    key={presets.indexOf(preset)}
                    deleteFunction={() => {
                        deletePreset(preset)
                    }}
                    onClick={() => handleClick(preset)}
                />
            ))}
        </div>
    )
}
export default PresetView;