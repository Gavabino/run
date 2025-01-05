import {estimateTotalTime} from "../utils/CalcFunctions";
import {v4 as uuid} from "uuid";

const useWorkoutFunctions = () => {

    const updateWorkoutSubmit = (data) => {
        let workout;
        switch (data.display_type) {
            case "Walk":
                workout = {...data, type: "walk"}
                break
            case "Easy Run":
                workout = {...data, type: "easy"};
                break;
            case "Recovery Run":
                workout = {...data, type: "recovery"};
                break;
            case "Long Run":
                workout = {...data, type: "long"};
                break;
            case "Workout":
                workout = {...data, type: "workout"};
                break;
            case "Race":
                workout = {...data, type: "race"};
                break;
            default:
                break;
        }
        return {...workout, time: estimateTotalTime(workout.distance, workout.type), id: uuid()};
    }

    return {
        updateWorkoutSubmit
    }
}
export default useWorkoutFunctions;