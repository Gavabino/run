import React from 'react'

function WorkoutCreator({ day}) {
  const addItem = () => {
    day.workouts.push({
      display_type: "Recovery Run",
      distance: 4,
      time: 35,
      type: "recovery",
    });
    setSeed((seed += 1));
    localStorage.setItem(
      "workouts",
      JSON.stringify(calenderData)
    );
    console.log("Added Workout");
  }
  return (
    <div>
      <input type='text'></input>
      <input type=''></input>
    </div>
  )
}

export default WorkoutCreator