import "./Calender.css";

import { useForm } from "react-hook-form";

function AddItemView({ day, week, seed, setSeed, calenderData, year, month }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  function updateWorkoutsInDay(calenderData, date, newWorkout) {
    return calenderData.map((week) =>
        week.map((day) =>
            day.date === date
                ? { ...day, workouts: [...day.workouts, newWorkout] }
                : day
        )
    );
  }

  const addWorkout = (newWorkout) => {
    calenderData = updateWorkoutsInDay(calenderData, day.date, newWorkout);
    console.log(calenderData);
    localStorage.setItem(`${year}-${month}`, JSON.stringify(calenderData));
    setSeed(seed + 1);
  };

  const onSubmit = (data) => {
    let newWorkout;
    switch (data.display_type) {
      case "Easy Run":
        newWorkout = { ...data, type: "easy" };
        break;
      case "Recovery Run":
        newWorkout = { ...data, type: "recovery" };
        break;
      case "Workout":
        newWorkout = { ...data, type: "workout" };
        break;
      case "Race":
        newWorkout = { ...data, type: "race" };
        break;
      default:
        break;
    }
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
          placeholder="Select Type"
          {...register("display_type", { required: true })}
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
          placeholder="Enter Time"
          type="number"
          className="timeSelect"
          {...register("time")}
        ></input>
        <input
          className="distanceSelect"
          type="number"
          min={0}
          max={1000}
          placeholder="Enter Distance"
          {...register("distance", { required: true })}
        ></input>
        <button type="submit" className="submit">
          Add Run
        </button>
      </form>
    </div>
  );
}

export default AddItemView;
