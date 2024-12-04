function DetailedView({currentWorkout}) {
    return (
        <div>
            <p className="displaytype">{currentWorkout.sdisplay_type}</p>
            <p className="distanceinfo">{currentWorkout.distance} Miles</p>
        </div>
    );
}

export default DetailedView;