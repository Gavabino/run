import "./Calendar.css";

import {useForm} from "react-hook-form";
import {estimateTotalTime} from "../utils/CalcFunctions";
import {addWorkoutDoc} from "../utils/firestore";

function AddItemView({day, setSeed, calendarData, setCalendarData, year, month}) {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    const updateWorkoutsInDay = (calendarData, date, newWorkout) => {
        return calendarData.map((week) =>
            week.map((day) =>
                day.date === date
                    ? {...day, workouts: [...day.workouts, newWorkout]}
                    : day
            )
        );
    }

    const addWorkout = async (newWorkout) => {
        const updatedCalendarData = updateWorkoutsInDay(calendarData, day.date, newWorkout);
        setCalendarData(updatedCalendarData);
        await addWorkoutDoc(`${year}-${month}`, updatedCalendarData.flat());
        setSeed((prevSeed) => prevSeed + 1);
    };

    const onSubmit = async (data) => {
        let newWorkout;
        switch (data.display_type) {
            case "Walk":
                newWorkout = {...data, type: "walk"}
                break
            case "Easy Run":
                newWorkout = {...data, type: "easy"};
                break;
            case "Recovery Run":
                newWorkout = {...data, type: "recovery"};
                break;
            case "Long Run":
                newWorkout = {...data, type: "long"};
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
        await addWorkout(newWorkout);
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
                <button type="submit" className="submit">
                    Add Run
                </button>
            </form>
        </div>
    );
}

export default AddItemView;
