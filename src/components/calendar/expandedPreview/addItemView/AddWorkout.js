import {useForm} from "react-hook-form";
import {useCalendar} from "../../../../contexts/CalendarContext";
import AddWorkoutForm from "./AddWorkoutForm";
import useWorkoutFunctions from "../../../../hooks/useWorkoutFunctions";

const AddWorkout = () => {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    const {addWorkout} = useCalendar();

    const {updateWorkoutSubmit} = useWorkoutFunctions();

    const onSubmit = async (data) => {
        await addWorkout(updateWorkoutSubmit(data));
        reset()
    };

    return (
        <>
            <form className="addRunForm" onSubmit={handleSubmit(onSubmit)}>
                <AddWorkoutForm register={register}/>
                <button type="submit" className="submit">
                    Add Run
                </button>
            </form>
        </>
    );
}

export default AddWorkout
