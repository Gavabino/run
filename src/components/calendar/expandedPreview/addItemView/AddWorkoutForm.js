const AddWorkoutForm = ({register}) => {

    return (
        <>
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
        </>
    )
}

export default AddWorkoutForm