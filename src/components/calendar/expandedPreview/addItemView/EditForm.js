import "../../Calendar.css";
import {useForm} from "react-hook-form";
import useWorkoutFunctions from "../../../../hooks/useWorkoutFunctions";
import {useCalendar} from "../../../../contexts/CalendarContext";
import {useEffect} from "react";

function EditForm({workout}) {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    const {updateWorkoutSubmit} = useWorkoutFunctions();

    const {editWorkout, setCurrentWorkout, setIsCurrentWorkout} = useCalendar();

    const onSubmit = async (data) => {
        try {
            if (!workout) {
                console.error("Workout data is missing. Cannot update.");
                return;
            }

            const newWorkout = updateWorkoutSubmit(data);
            await editWorkout(workout, newWorkout);
            reset();
            setCurrentWorkout(newWorkout);
            setIsCurrentWorkout(true);
        } catch (error) {
            console.error("Error updating workout:", error);
        }
    };

    useEffect(() => {
        if (workout && workout.distance !== undefined) {
            reset({
                display_type: workout.display_type || "default",
                distance: workout.distance || 0,
            });
        } else {
            reset({
                display_type: "default",
                distance: 0,
            });
        }
    }, [workout, reset]);

    useEffect(() => {
        console.log("Workout prop:", workout);
    }, [workout]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="addRunForm">
                <select
                    className="selectType"
                    {...register("display_type", {required: true})}
                >
                    <option disabled value={"default"}>
                        Select a workout type
                    </option>
                    <option value={"Walk"}>Walk</option>
                    <option value={"Recovery Run"}>Recovery Run</option>
                    <option value={"Easy Run"}>Easy Run</option>
                    <option value={"Long Run"}>Long Run</option>
                    <option value={"Workout"}>Workout</option>
                    <option value={"Race"}>Race</option>
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
