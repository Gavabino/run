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