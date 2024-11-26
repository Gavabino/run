import "./Calender.css";

import {useForm} from "react-hook-form";
import {estimateTotalTime} from "./CalcFunctions";

function AddItemView({day, week, seed, setSeed, calenderData, setCalenderData, year, month}) {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: {errors},
    } = useForm();

    const updateWorkoutsInDay = (calenderData, date, newWorkout) => {
        return calenderData.map((week) =>
            week.map((day) =>
                day.date === date
                    ? {...day, workouts: [...day.workouts, newWorkout]}
                    : day
            )
        );
    }

    const addWorkout = (newWorkout) => {
        const updatedCalenderData = updateWorkoutsInDay(calenderData, day.date, newWorkout);
        setCalenderData(updatedCalenderData);
        localStorage.setItem(`${year}-${month}`, JSON.stringify(updatedCalenderData));
        setSeed((prevSeed) => prevSeed + 1);
    };

    const onSubmit = (data) => {
        let newWorkout;
        switch (data.display_type) {
            case "Easy Run":
                newWorkout = {...data, type: "easy"};
                break;
            case "Recovery Run":
                newWorkout = {...data, type: "recovery"};
                break;
            case "Workout":
                newWorkout = {...data, type: "workout"};
                break;
            case "Race":
                newWorkout = {...data, type: "race"};
                break;
            default:
                break;
        }
        newWorkout = {...newWorkout, time: estimateTotalTime(newWorkout.distance, 8.5)};
        addWorkout(newWorkout);
        reset();
    };

    return (
        <div className="container">
            <p className="instructions">
                Add a run or click on a existing one to view details
            </p>
            <form className="addRunForm" onSubmit={handleSubmit(onSubmit)}>
                <select
                    className="selectType"
                    {...register("display_type", {required: true})}
                    defaultValue={"default"}
                >
                    <option disabled value={"default"}>
                        Select a run type
                    </option>
                    <option>Easy Run</option>
                    <option>Recovery Run</option>
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
                <button type="submit" className="submit">
                    Add Run
                </button>
            </form>
        </div>
    );
}

export default AddItemView;
