import {usePreset} from "../../../contexts/PresetContext";
import Workout from "../Workout";
import {useCalendar} from "../../../contexts/CalendarContext";

const PresetView = () => {
    const {presets, deletePreset} = usePreset()
    const {addWorkout} = useCalendar()

    return (
        <div style={{width: '100%', height: '100%'}}>
            {presets?.map(preset => (
                <Workout
                    workout={preset}
                    key={presets.indexOf(preset)}
                    deleteFunction={() => {
                        deletePreset(preset)
                    }}
                    onClick={() => addWorkout(preset)}
                />
            ))}
        </div>
    )
}
export default PresetView;