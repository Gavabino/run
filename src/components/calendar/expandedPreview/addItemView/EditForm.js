import "../../Calendar.css";
import {useForm} from "react-hook-form";
import useWorkoutFunctions from "../../../../hooks/useWorkoutFunctions";
import {useCalendar} from "../../../../contexts/CalendarContext";

function EditForm({workout}) {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    const {updateWorkoutSubmit} = useWorkoutFunctions();

    const {editWorkout} = useCalendar();

    const onSubmit = async (data) => {
        const newWorkout = updateWorkoutSubmit(data)
        editWorkout(workout, newWorkout)
        reset()
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="addRunForm">
                <select
                    className="selectType"
                    {...register("display_type", {required: true})}
                    defaultValue={"default"}
                >
                    <option disabled value={"default"}>
                        Select a workout type
                    </option>
                    <option>Walk</option>
                    <option>Recovery Run</option>
                    <option>Easy Run</option>
                    <option>Long Run</option>
                    <option>Workout</option>
                    <option>Race</option>
                </select>
                <input
                    className="distanceSelect"
                    type="number"
                    min={0}
                    max={1000}
                    placeholder="Enter Distance"
                    step="0.01"
                    {...register("distance", {required: true})}
                ></input>
                <button className="submit" type="submit">
                    Save Changes
                </button>
            </form>
        </>
    )
}

export default EditForm;
