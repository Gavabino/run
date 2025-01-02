function DetailedView({currentWorkout}) {
    const {display_type, distance} = currentWorkout;

    return (
        <>
            <p className="displaytype">{display_type}</p>
            <p className="distanceinfo">{distance} Miles</p>
        </>
    );
}

export default DetailedView;