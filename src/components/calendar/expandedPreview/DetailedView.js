function DetailedView({currentWorkout}) {
    return (
        <>
            <p className="displaytype">{currentWorkout.display_type}</p>
            <p className="distanceinfo">{currentWorkout.distance} Miles</p>
        </>
    );
}

export default DetailedView;