export const totalMileage = (week) => {
    let mileage = 0;
    for (let i = 0; i < week.length; i++) {
        for (let j = 0; j < week[i].workouts.length; j++) {
            mileage += parseFloat(week[i].workouts[j].distance)

        }
    }
    return mileage;
}

export const totalRuns = (week) => {
    let runs = 0;
    for (let i = 0; i < week.length; i++) {
        for (let j = 0; j < week[i].workouts.length; j++) {
            runs += 1

        }
    }
    return runs;
}

export const averageMileagePerRun = (week) => {
    return totalMileage(week) / totalRuns(week);
}

export const totalMileagePerDay = (week) => {
    let mileageArray = [];
    for (let i = 0; i < week.length; i++) {
        let dayMileage = 0;
        for (let j = 0; j < week[i].workouts.length; j++) {
            dayMileage += parseFloat(week[i].workouts[j].distance);
        }
        mileageArray.push(dayMileage)
    }
    return mileageArray;
}

export const estimateTotalTime = (distance, type) => {
    let pace;
    switch (type) {
        case "walk":
            pace = 17.5;
            break
        case "easy":
            pace = 8.5;
            break;
        case "recovery":
            pace = 9;
            break;
        case "long":
            pace = 8.5;
            break;
        case "workout":
            pace = 7;
            break;
        case "race":
            pace = 6;
            break;
        default:
            break;
    }

    return distance * pace;
}