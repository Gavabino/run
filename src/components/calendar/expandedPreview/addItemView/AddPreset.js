import {useForm} from "react-hook-form";
import AddWorkoutForm from "./AddWorkoutForm";
import {usePreset} from "../../../../contexts/PresetContext";
import useWorkoutFunctions from "../../../../hooks/useWorkoutFunctions";

const AddPreset = () => {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    const {updateWorkoutSubmit} = useWorkoutFunctions()

    const {addPreset} = usePreset();

    const onSubmit = async (data) => {
        await addPreset(updateWorkoutSubmit(data));
        reset();
    };

    return (
        <>
            <form className="addRunForm" onSubmit={handleSubmit(onSubmit)}>
                <AddWorkoutForm register={register}/>
                <button type="submit" className="submit">
                    Add to presets
                </button>
            </form>
        </>
    );
}

export default AddPreset